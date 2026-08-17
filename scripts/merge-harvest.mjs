/**
 * One-off merge: fold scripts/store-harvest.json (a manual capture of the
 * shop's own listing pages) into src/data/rss-packs.json, skipping anything
 * already on the site by listing id OR slug.
 *
 *   node scripts/merge-harvest.mjs
 *
 * Prices on the store page are shown in the viewer's local currency (MAD
 * here) at the current sale price; MAD_PER_USD converts them back to USD.
 * Rate calibrated against a listing whose USD price the RSS feed reported.
 */

import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const MAD_PER_USD = 9.98;
const SHOP_URL = "https://cozyjsstudio.etsy.com";

const CATEGORY_RULES = [
  [/\b(christmas|new year|halloween|valentine|easter|holiday|festive|festival)\b/i, "seasonal"],
  [/\b(witch|witchy|ghost|reaper|raven|skull|spooky|grim|haunted|gothic)\b/i, "witchy"],
  [/\b(cat|kitty|kitten|neko)\b/i, "cat"],
  [/\bdragon\b/i, "dragon"],
  [/\b(fox|kitsune)\b/i, "fox"],
  [/\b(bear|panda|koala)\b/i, "bear"],
  [/\b(samurai|ninja|japan(ese)?|sakura|cherry blossom|wolf|koi|geisha|kimono|torii|lantern|temple|oni|swan|snake)\b/i, "japanese"],
  [/\b(room|bedroom|garden|balcony|terrace|cityscape|library|under sea|cafe|caf[eé]|kitchen|studio|apartment|house)\b/i, "room"],
];

const mapCategory = (t) => (CATEGORY_RULES.find(([re]) => re.test(t)) || [, "frog"])[1];

const slugify = (n) =>
  n.toLowerCase().replace(/[^a-z0-9\s-]/g, "").trim().replace(/\s+/g, "-").replace(/-+/g, "-").slice(0, 60);

/** Distinctive subjects — used to keep sibling listings apart when the first
 *  title segment is generic (e.g. every Halloween pack starts the same way and
 *  only differs after the "|"). */
const SUBJECTS = [
  "red panda", "polar bear", "axolotl", "raccoon", "capybara", "corgi", "shiba", "akita",
  "bunny", "rabbit", "monkey", "turtle", "koala", "snake", "swan", "raven", "dragon",
  "panda", "otter", "wolf", "frog", "cat", "fox", "bear", "dog", "witch", "samurai",
];

function cleanName(t) {
  const first = t.split("|")[0].split(":")[0].replace(/\s+/g, " ").trim();
  // If the leading segment is generic, qualify it with the subject named later
  // in the title so siblings don't collapse onto one slug.
  const generic = /^(animated\s+)?(spooky\s+)?(halloween\s+)?(twitch\s+)?(animated\s+)?(stream|overlay)?\s*(pack|package|overlay pack)?$/i.test(
    first.replace(/animated halloween twitch (stream )?overlay pack/i, "").trim() || first,
  );
  const hay = t.toLowerCase();
  const subject = SUBJECTS.find((s) => hay.includes(s));
  if (subject && !first.toLowerCase().includes(subject)) {
    const Cap = subject.replace(/\b\w/g, (c) => c.toUpperCase());
    if (generic || /halloween|spooky|animated stream pack/i.test(first)) {
      return `${first} — ${Cap}`;
    }
  }
  return first;
}

const isAssetOnly = (t) =>
  /\b(badges?|bits|icons?|emotes?|stickers?|clipart|kit)\b/i.test(t) && !/\b(package|bundle|overlay pack|stream pack)\b/i.test(t);

function features(t) {
  if (isAssetOnly(t)) {
    const f = [];
    if (/badge|bits|icon|clipart/i.test(t)) f.push("Sub Badges");
    if (/emote|sticker/i.test(t)) f.push("Emotes");
    return f.length ? f : ["Sub Badges"];
  }
  const f = ["Animated Screens", "Alerts", "Panels"];
  if (/emote/i.test(t)) f.push("Emotes");
  if (/badge|bits/i.test(t)) f.push("Sub Badges");
  return f;
}

function describe(name, title) {
  const theme = cleanName(name)
    .replace(/\b(animated|stream|package|overlay|overlays|twitch|pack|for|setup)\b/gi, "")
    .replace(/\s+/g, " ")
    .trim();
  if (isAssetOnly(title)) {
    return theme
      ? `${theme} — a cozy set of Twitch sub badges, bit badges and channel-point icons.`
      : "A cozy set of Twitch sub badges, bit badges and channel-point icons.";
  }
  return theme
    ? `${theme} — cozy animated overlays for Twitch, YouTube, Kick & TikTok: screens, alerts, panels & emotes.`
    : "Cozy animated stream overlays: screens, alerts, panels & emotes.";
}

const packsSrc = readFileSync(resolve("src/data/packs.ts"), "utf8");
const rssPath = resolve("src/data/rss-packs.json");
const current = JSON.parse(readFileSync(rssPath, "utf8"));

const knownIds = new Set([...packsSrc.matchAll(/\/listing\/(\d+)/g)].map((m) => m[1]));
const knownSlugs = new Set([...packsSrc.matchAll(/slug: "([^"]+)"/g)].map((m) => m[1]));
for (const p of current) {
  const m = String(p.etsy || "").match(/\/listing\/(\d+)/);
  if (m) knownIds.add(m[1]);
  knownSlugs.add(p.slug);
}

const harvest = JSON.parse(readFileSync(resolve("scripts/store-harvest.json"), "utf8"));
let added = 0;

for (const item of harvest) {
  if (!item.t || !item.img || !item.mad) continue;
  if (knownIds.has(item.id)) continue;
  const name = cleanName(item.t);
  const slug = slugify(name);
  if (!slug || knownSlugs.has(slug)) continue;
  knownIds.add(item.id);
  knownSlugs.add(slug);

  current.push({
    slug,
    name,
    category: mapCategory(item.t),
    price: `$${(parseFloat(item.mad) / MAD_PER_USD).toFixed(2)}`,
    description: describe(name, item.t),
    image: item.img,
    etsy: `${SHOP_URL}/listing/${item.id}`,
    features: features(item.t),
    isNew: true,
  });
  added++;
  console.log(`+ ${name}`);
}

writeFileSync(rssPath, JSON.stringify(current, null, 2) + "\n", "utf8");
console.log(`\nAdded ${added}. rss-packs.json now holds ${current.length}.`);
