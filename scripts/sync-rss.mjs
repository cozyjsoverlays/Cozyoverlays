/**
 * Weekly auto-sync: pull the newest listings from the shop's official Etsy RSS
 * feed and append any that aren't on the site yet into src/data/rss-packs.json.
 *
 *   node scripts/sync-rss.mjs
 *
 * Runs unattended in CI (see .github/workflows/etsy-sync.yml). It only ADDS
 * new listings — it never edits the CSV-generated src/data/packs.ts. The site
 * merges both sources at runtime (src/lib/products.ts), CSV packs winning on
 * any duplicate. Etsy RSS only exposes the ~10 newest listings, so this catches
 * recent drops; a full re-sync still comes from a fresh CSV export.
 *
 * Dependency-free: uses Node's built-in fetch (Node 18+). No scraping of Etsy
 * HTML — RSS is an official syndication feed meant to be consumed this way.
 */

import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const RSS_URL = "https://www.etsy.com/shop/CozyJsStudio/rss";
const SHOP_URL = "https://cozyjsstudio.etsy.com";
const PACKS_TS = resolve("src/data/packs.ts");
const RSS_JSON = resolve("src/data/rss-packs.json");

// Category mapping — kept in sync with scripts/csv-to-packs.ts (first match wins).
const CATEGORY_RULES = [
  [/\b(christmas|new year|halloween|valentine|easter|holiday|festive|festival)\b/i, "seasonal"],
  [/\b(witch|witchy|ghost|reaper|raven|skull|spooky|grim|haunted|gothic)\b/i, "witchy"],
  [/\b(cat|kitty|kitten|neko)\b/i, "cat"],
  [/\bdragon\b/i, "dragon"],
  [/\b(fox|kitsune)\b/i, "fox"],
  [/\b(bear|panda)\b/i, "bear"],
  [/\b(samurai|ninja|japan(ese)?|sakura|cherry blossom|wolf|koi|geisha|kimono|torii|lantern|temple|oni|swan)\b/i, "japanese"],
  [/\b(room|bedroom|garden|balcony|terrace|cityscape|library|under sea|cafe|caf[eé]|kitchen|studio|apartment|house)\b/i, "room"],
];

function mapCategory(text) {
  for (const [re, cat] of CATEGORY_RULES) if (re.test(text)) return cat;
  return "frog";
}

function slugify(name) {
  const s = name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
  if (s.length <= 60) return s;
  // Cut on a word boundary, never mid-word and never leaving a trailing dash
  // ("...chat-emotes-for-" reads like a broken link).
  return s.slice(0, 60).replace(/-[^-]*$/, "").replace(/-+$/, "");
}

/**
 * Display name = the first segment of the Etsy title.
 *
 * Etsy titles are keyword lists. Older listings separate with " | ", newer ones
 * with commas ("10 Cute Panda Twitch Emotes, Text Emotes, Panda Chat Emotes for
 * Discord, Twitch Badges, Chibi Panda Emote Bundle"), so splitting on the pipe
 * alone left the whole list as the on-page heading. The full title is kept
 * separately and still rendered for search - it just isn't the visible name.
 */
function cleanName(title) {
  const head = title.split("|")[0].replace(/\s+by CozyJsStudio\s*$/i, "").trim();
  const first = head.split(",")[0].trim();
  // Only take the first comma segment when it stands on its own as a name.
  const short = first.length >= 12 ? first : head;
  return short.replace(/\s+/g, " ").trim();
}

/** True for badge/emote-only products (no screens/alerts/panels in them). */
function isAssetOnly(text) {
  if (!/\b(badges?|bits|icons?|emotes?|panels?|stickers?|clipart|wallpapers?)\b/i.test(text)) {
    return false;
  }
  // Excluding on "bundle" alone misread "Chibi Panda Emote Bundle" as a full
  // stream pack, so an emote set advertised screens and alerts it doesn't have.
  // A real package names what makes it one: screens, alerts, or "overlay pack".
  return !/\b(screens?|alerts?|starting soon|overlay pack(age)?|stream pack(age)?)\b/i.test(text);
}

function features(text) {
  if (isAssetOnly(text)) {
    const f = [];
    if (/badge|bits|icon/i.test(text)) f.push("Sub Badges");
    if (/emote|sticker/i.test(text)) f.push("Emotes");
    if (/panel/i.test(text)) f.push("Panels");
    return f.length ? f : ["Sub Badges"];
  }
  const f = ["Animated Screens", "Alerts", "Panels"];
  if (/emote/i.test(text)) f.push("Emotes");
  if (/badge|bits/i.test(text)) f.push("Sub Badges");
  return f;
}

function describe(name) {
  const theme = name
    .replace(/\b(animated|stream|package|overlay|overlays|twitch|pack|for|setup)\b/gi, "")
    .replace(/\s+/g, " ")
    .trim();
  if (isAssetOnly(name)) {
    // Decide by the word the title leads with. A listing names several asset
    // types ("... Twitch Emotes, ..., Twitch Badges, ... Emote Bundle"), and a
    // fixed order described every emote set as a badge set.
    const kinds = [
      [/\bpanels?\b/i, "profile panels for your channel"],
      [/\bemotes?\b|\bstickers?\b/i, "Twitch emotes in every size chat needs"],
      [/\bbadges?\b|\bbits\b|\bicons?\b/i, "Twitch sub badges, bit badges and channel-point icons"],
    ];
    let kind = "Twitch sub badges, bit badges and channel-point icons";
    let at = Infinity;
    for (const [re, label] of kinds) {
      const i = name.search(re);
      if (i !== -1 && i < at) {
        at = i;
        kind = label;
      }
    }
    return theme ? `${theme} - a cozy set of ${kind}.` : `A cozy set of ${kind}.`;
  }
  return theme
    ? `${theme} - cozy animated overlays for Twitch, YouTube, Kick & TikTok: screens, alerts, panels & emotes.`
    : "Cozy animated stream overlays: screens, alerts, panels & emotes.";
}

/** Decode the handful of XML entities that appear in RSS titles. */
function decode(s) {
  return s
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&quot;/g, '"');
}

async function main() {
  const res = await fetch(RSS_URL, {
    headers: { "User-Agent": "cozyoverlays-sync/1.0 (+https://cozyoverlays.com)" },
  });
  if (!res.ok) {
    console.error(`RSS fetch failed: HTTP ${res.status}`);
    process.exit(1);
  }
  const xml = await res.text();

  // What's already on the site: listing IDs AND slugs (CSV-generated packs +
  // previously synced). A pack counts as "known" if EITHER matches — so a pack
  // that exists by slug but lacks a deep-link isn't re-added as a duplicate.
  const packsSrc = readFileSync(PACKS_TS, "utf8");
  const existing = new Set([...packsSrc.matchAll(/\/listing\/(\d+)/g)].map((m) => m[1]));
  const knownSlugs = new Set([...packsSrc.matchAll(/slug: "([^"]+)"/g)].map((m) => m[1]));
  const current = JSON.parse(readFileSync(RSS_JSON, "utf8"));
  for (const p of current) {
    const m = String(p.etsy || "").match(/\/listing\/(\d+)/);
    if (m) existing.add(m[1]);
    knownSlugs.add(p.slug);
  }

  const items = [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)].map((m) => m[1]);
  let added = 0;

  for (const item of items) {
    const link = (item.match(/<link>\s*([^<]+?)\s*<\/link>/) || [])[1] || "";
    const id = (link.match(/\/listing\/(\d+)/) || [])[1];
    if (!id || existing.has(id)) continue;

    const rawTitle = (item.match(/<title>([\s\S]*?)<\/title>/) || [])[1] || "";
    const title = decode(rawTitle.replace(/<!\[CDATA\[|\]\]>/g, "").trim());
    if (!title) continue;

    const image = (item.match(/https:\/\/i\.etsystatic\.com\/[^\s"'<>]+?\.jpg/) || [])[0] || "";
    const priceMatch = item.match(/(\d+\.\d{2})\s*USD/i) || item.match(/\$(\d+\.\d{2})/);
    const price = priceMatch ? `$${parseFloat(priceMatch[1]).toFixed(2)}` : "$0.00";

    const name = cleanName(title);
    const slug = slugify(name);
    if (!slug || knownSlugs.has(slug)) continue; // already on the site
    knownSlugs.add(slug);
    existing.add(id);

    const category = mapCategory(title);
    current.unshift({
      slug,
      name,
      // Full Etsy title, kept so the product page can carry it for search even
      // when the visible heading is the short name.
      title: title.replace(/\s+by CozyJsStudio\s*$/i, "").trim(),
      category,
      price,
      description: describe(name),
      image,
      etsy: `${SHOP_URL}/listing/${id}`,
      features: features(title),
      isNew: true,
    });
    added++;
    console.log(`+ ${name} (${id})`);
  }

  if (added > 0) {
    writeFileSync(RSS_JSON, JSON.stringify(current, null, 2) + "\n", "utf8");
  }
  console.log(`\nDone: ${added} new pack(s) added. Total synced: ${current.length}.`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
