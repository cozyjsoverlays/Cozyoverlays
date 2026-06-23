/**
 * Generate `src/data/packs.ts` from an Etsy "Download Data → Currently for sale
 * listings" CSV export.
 *
 *   npx tsx scripts/csv-to-packs.ts "C:/path/EtsyListingsDownload.csv"
 *
 * The export has no per-listing URL, so every pack's buy button points to the
 * shop home (https://www.etsy.com/shop/CozyJsStudio). Images come from IMAGE1.
 */

import { readFileSync, writeFileSync } from "fs";
import { resolve } from "path";
import { parseCsvToObjects } from "./lib/csv";

const SHOP_URL = "https://cozyjsstudio.etsy.com";

// Known per-listing IDs (keyed by a distinctive slug fragment). The Etsy CSV
// export has no listing URLs, so only these — carried over from the original
// site — can deep-link to their exact listing. Everything else falls back to
// the shop home. Add more here (fragment -> listing id) as you collect them.
const KNOWN_LISTINGS: Array<[string, string]> = [
  ["cat-forest", "4471959754"],
  ["dragon-sakura", "4466565669"],
  ["sakura-panda", "4464457983"],
  ["fox-forest", "4474605659"],
  ["frog-forest", "4480209391"],
  ["moonlit-samurai", "4433133162"],
  ["matcha-dragon", "4490240905"],
  ["sakura-cat", "4443095417"],
  ["wolf-train", "4500984671"],
  ["otter-forest", "4480782954"],
  ["dream-sakura", "4438531426"],
  ["midnight-cozy-cat", "4440435657"],
];

function etsyUrlFor(slug: string): string {
  for (const [fragment, id] of KNOWN_LISTINGS) {
    if (slug.includes(fragment)) return `${SHOP_URL}/listing/${id}`;
  }
  return SHOP_URL;
}

type Category =
  | "cat"
  | "dragon"
  | "bear"
  | "fox"
  | "frog"
  | "japanese"
  | "witchy"
  | "room"
  | "seasonal";

// First match wins. Seasonal/witchy themes win over animals; named animals win
// over the generic "Japanese" theme; room/scene themes catch the abstract sets;
// everything else falls into "frog" (the Frogs & More catch-all).
const CATEGORY_RULES: Array<[RegExp, Category]> = [
  [/\b(christmas|new year|halloween|valentine|easter|holiday|festive|festival)\b/i, "seasonal"],
  [/\b(witch|witchy|ghost|reaper|raven|skull|spooky|grim|haunted|gothic)\b/i, "witchy"],
  [/\b(cat|kitty|kitten|neko)\b/i, "cat"],
  [/\bdragon\b/i, "dragon"],
  [/\b(fox|kitsune)\b/i, "fox"],
  [/\b(bear|panda)\b/i, "bear"],
  [
    /\b(samurai|ninja|japan(ese)?|sakura|cherry blossom|wolf|koi|geisha|kimono|torii|lantern|temple|oni)\b/i,
    "japanese",
  ],
  [
    /\b(room|bedroom|garden|balcony|terrace|cityscape|library|under sea|cafe|caf[eé]|kitchen|studio|apartment|house)\b/i,
    "room",
  ],
];

function mapCategory(text: string): Category {
  for (const [re, cat] of CATEGORY_RULES) if (re.test(text)) return cat;
  return "frog";
}

function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 60);
}

function cleanName(title: string): string {
  // The display name is the first segment before the first " | ".
  return title.split("|")[0].replace(/\s+/g, " ").trim();
}

function priceStr(raw: string): string {
  const n = parseFloat((raw || "").replace(/[^0-9.]/g, ""));
  return Number.isFinite(n) && n > 0 ? `$${n.toFixed(2)}` : "$0.00";
}

function describe(name: string): string {
  const theme = name
    .replace(/\b(animated|stream|package|overlay|overlays|twitch|pack|for)\b/gi, "")
    .replace(/\s+/g, " ")
    .trim();
  return theme
    ? `${theme} — cozy animated overlays: screens, alerts, panels & emotes.`
    : "Cozy animated stream overlays — screens, alerts, panels & emotes.";
}

function features(haystack: string): string[] {
  const f = ["Animated Screens", "Alerts", "Panels", "Emotes"];
  if (/\bbadge/i.test(haystack)) f.push("Sub Badges");
  return f;
}

function main() {
  const file = process.argv[2];
  if (!file) {
    console.error('Usage: npx tsx scripts/csv-to-packs.ts "<path-to-csv>"');
    process.exit(1);
  }

  const rows = parseCsvToObjects(readFileSync(resolve(file), "utf8"));
  const seen = new Set<string>();
  const packs: string[] = [];
  let skipped = 0;

  for (const r of rows) {
    const title = (r.title || "").trim();
    const image = (r.image1 || "").trim();
    if (!title || !image) {
      skipped++;
      continue;
    }

    const name = cleanName(title);
    let slug = slugify(name);
    if (!slug) {
      skipped++;
      continue;
    }
    while (seen.has(slug)) slug = `${slug}-${seen.size}`;
    seen.add(slug);

    const category = mapCategory(`${title} ${r.tags || ""}`);
    const entry = {
      slug,
      name,
      category,
      price: priceStr(r.price),
      description: describe(name),
      image,
      etsy: etsyUrlFor(slug),
      features: features(`${title} ${r.description || ""} ${r.tags || ""}`),
    };

    const body = [
      `    slug: ${JSON.stringify(entry.slug)},`,
      `    name: ${JSON.stringify(entry.name)},`,
      `    category: ${JSON.stringify(entry.category)},`,
      `    price: ${JSON.stringify(entry.price)},`,
      `    description: ${JSON.stringify(entry.description)},`,
      `    image: ${JSON.stringify(entry.image)},`,
      `    etsy: ${JSON.stringify(entry.etsy)},`,
      `    features: ${JSON.stringify(entry.features)},`,
    ].join("\n");
    packs.push(`  {\n${body}\n  }`);
  }

  const out = `import type { Pack, PackCategory } from "@/lib/types";

// AUTO-GENERATED from the Etsy listings CSV export by scripts/csv-to-packs.ts.
// Re-run that script to regenerate. ${packs.length} packs.

export const PACKS: Pack[] = [
${packs.join(",\n")},
];

export interface PackFilter {
  id: PackCategory | "all";
  label: string;
}

export const PACK_FILTERS: PackFilter[] = [
  { id: "all", label: "All" },
  { id: "cat", label: "Cats" },
  { id: "dragon", label: "Dragons" },
  { id: "fox", label: "Foxes" },
  { id: "bear", label: "Bears & Pandas" },
  { id: "japanese", label: "Japanese" },
  { id: "witchy", label: "Witchy" },
  { id: "room", label: "Cozy Rooms" },
  { id: "seasonal", label: "Seasonal" },
  { id: "frog", label: "Frogs & More" },
];
`;

  writeFileSync(resolve("src/data/packs.ts"), out, "utf8");

  // Category breakdown for a quick sanity check.
  const counts: Record<string, number> = {};
  for (const p of packs) {
    const m = p.match(/category: "(\w+)"/);
    if (m) counts[m[1]] = (counts[m[1]] || 0) + 1;
  }
  console.log(`✅ Wrote ${packs.length} packs to src/data/packs.ts (${skipped} skipped).`);
  console.log("   Categories:", counts);
}

main();
