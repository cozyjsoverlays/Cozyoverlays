/**
 * Generate `src/data/packs.ts` from an Etsy "Download Data → Currently for sale
 * listings" CSV export.
 *
 *   npx tsx scripts/csv-to-packs.ts "C:/path/EtsyListingsDownload.csv"
 *
 * The export has no per-listing URLs or live sale prices, so OVERRIDES below
 * carries known listing IDs + current sale pricing (price/compareAt), keyed by
 * a distinctive slug fragment (first match wins — order specific → generic).
 * EXTRA_PACKS appends listings newer than the CSV so regeneration never drops
 * them. Everything unmatched falls back to the shop home / CSV price.
 */

import { readFileSync, writeFileSync } from "fs";
import { resolve } from "path";
import { parseCsvToObjects } from "./lib/csv";

const SHOP_URL = "https://cozyjsstudio.etsy.com";

interface Override {
  id?: string; // etsy listing id
  price?: number; // current sale price (USD)
  compareAt?: number; // original price (sale framing)
}

// Order matters: specific fragments BEFORE generic ones they contain.
const OVERRIDES: Array<[string, Override]> = [
  // — specific-first collision guards —
  ["sakura-cats-moon", { id: "4435002769", price: 3.89, compareAt: 15.55 }],
  ["sakura-cat-animated-stream-overlay", { id: "4452517237", price: 4.14, compareAt: 16.55 }],
  ["cat-sakura-moon", { id: "4492271882" }],
  ["sakura-cat", { id: "4443095417" }],
  ["purple-clouds-animated-tiktok", { id: "4396354259", price: 2.22, compareAt: 8.89 }],
  ["purple-clouds", { id: "4424184954", price: 3.89, compareAt: 15.55 }],
  // — bundles / custom —
  ["custom-animated-twitch-stream-overlay", { id: "4500763545", price: 99.87, compareAt: 399.5 }],
  // — cats —
  ["cat-forest", { id: "4471959754", price: 3.89, compareAt: 15.55 }],
  ["midnight-cozy-cat", { id: "4440435657", price: 3.89, compareAt: 15.55 }],
  ["galaxy-eyes-cat", { id: "4497648024", price: 3.89, compareAt: 15.55 }],
  ["green-anime-girl", { id: "4460474353", price: 4.14, compareAt: 16.55 }],
  ["cozy-cats-jars", { id: "4533092634" }],
  // — dragons —
  ["dragon-sakura", { id: "4466565669", price: 4.23, compareAt: 16.94 }],
  ["matcha-dragon", { id: "4490240905" }],
  ["matcha-panda", { id: "4489068202" }],
  ["dragon-magical", { id: "4467654101" }],
  ["starry-forest-dragon", { id: "4472823464" }],
  // — pandas / bears —
  ["sakura-panda", { id: "4464457983" }],
  ["panda-sakura", { id: "4464973290", price: 3.64, compareAt: 14.55 }],
  ["blossom-panda", { id: "4439308189", price: 3.89, compareAt: 15.55 }],
  ["lofi-sunset-panda", { id: "4499647421", price: 4.14, compareAt: 16.55 }],
  ["train-sunset-panda", { id: "4501921068", price: 3.26, compareAt: 13.05 }],
  // — wolves / foxes / otters / frogs / birds —
  ["forest-wolf", { id: "4429185127", price: 3.89, compareAt: 15.55 }],
  ["sakura-wolf", { id: "4496346074" }],
  ["wolf-train", { id: "4500984671" }],
  ["fox-forest", { id: "4474605659" }],
  ["frog-forest", { id: "4480209391" }],
  ["otter-under-sea", { id: "4485236580", price: 3.89, compareAt: 15.55 }],
  ["otter-forest", { id: "4480782954", price: 3.89, compareAt: 15.55 }],
  ["swan-forest", { id: "4478228909" }],
  // — japanese / sakura —
  ["moonlit-samurai", { id: "4433133162", price: 3.89, compareAt: 15.55 }],
  ["dream-sakura", { id: "4438531426" }],
  ["cherry-blossom", { id: "4448676932", price: 3.89, compareAt: 15.55 }],
  ["purple-moon-sakura", { id: "4424215981", price: 4.14, compareAt: 16.55 }],
  ["sakura-moon-animated", { id: "4467216339" }],
  // — dark / witchy —
  ["moonlit-raven", { id: "4472851841", price: 3.89, compareAt: 15.55 }],
  ["royal-purple-night", { id: "4424177557", price: 3.89, compareAt: 15.55 }],
  // — rooms / scenes —
  ["animated-neon-bedroom", { id: "4504935404", price: 4.26, compareAt: 17.04 }],
  ["magical-celestial-bedroom", { id: "4518341550", price: 4.13, compareAt: 16.54 }],
  ["magical-night-garden", { id: "4507296377", price: 3.88, compareAt: 15.54 }],
  ["cozy-midnight-garden", { id: "4503610815", price: 3.88, compareAt: 15.54 }],
  ["cozy-night-animated", { id: "4462927898", price: 3.89, compareAt: 15.55 }],
  ["cozy-garden", { id: "4532079977" }],
  // — seasonal / misc —
  // NOTE: christmas fragments must stay specific-first — "christmas-animated-tiktok"
  // and the red-gold/cozy-cat variants all contain "christmas-animated".
  ["red-gold-christmas", { id: "4414848255" }],
  ["christmas-animated-tiktok", { id: "4398825435" }],
  ["christmas-animated-stream", { id: "4424174225" }],
  ["lofi-sunset-raccoon", { id: "4499654979" }],
  ["lofi-sunset-dog-shiba", { id: "4499641740" }],
  ["raccoon-forest-magic", { id: "4477602825" }],
  ["starry-forest-reaper", { id: "4472843786" }],
  ["matcha-cat", { id: "4489078417" }],
];

function findOverride(slug: string): Override | null {
  for (const [fragment, o] of OVERRIDES) {
    if (slug.includes(fragment)) return o;
  }
  return null;
}

/** Listings newer than the CSV export (sourced from the shop's official RSS
 *  feed). Appended on every regeneration so they're never lost. */
const EXTRA_PACKS = [
  {
    slug: "cozy-cats-jars-twitch-sub-badges",
    name: "Cozy Cats Jars Twitch Sub Badges",
    category: "cat",
    price: "$1.22",
    compareAt: "$4.90",
    description:
      "Kawaii cats in jars under a pastel night sky — loyalty badges your subs will actually show off.",
    image:
      "https://i.etsystatic.com/61635066/r/il/0e9933/8215805950/il_570xN.8215805950_109n.jpg",
    etsy: `${SHOP_URL}/listing/4533092634`,
    features: ["Sub Badges"],
    isNew: true,
  },
  {
    slug: "cozy-garden-animated-overlay-bundle",
    name: "Cozy Garden Animated Overlay Bundle",
    category: "room",
    price: "$3.88",
    compareAt: "$15.54",
    description:
      "A lo-fi flower garden in gentle motion — a full bundle of screens, alerts and panels.",
    image:
      "https://i.etsystatic.com/61635066/r/il/fe88d6/8256317065/il_570xN.8256317065_ckqp.jpg",
    etsy: `${SHOP_URL}/listing/4532079977`,
    features: ["Animated Screens", "Alerts", "Panels"],
    isNew: true,
  },
  {
    slug: "spooky-frog-raven-animated-stream-package",
    name: "Spooky Frog Raven Animated Stream Package",
    category: "witchy",
    price: "$23.25",
    description:
      "A moody night-forest of frogs and ravens — spooky, candle-lit overlays for cozy-gothic streams.",
    image:
      "https://i.etsystatic.com/61635066/r/il/76a232/8303653614/il_570xN.8303653614_ktat.jpg",
    etsy: `${SHOP_URL}/listing/4544858985`,
    features: ["Animated Screens", "Alerts", "Panels", "Emotes"],
    isNew: true,
  },
  {
    slug: "spooky-raven-twitch-animated-stream-package",
    name: "Spooky Raven Twitch Animated Stream Package",
    category: "witchy",
    price: "$23.25",
    description:
      "Crows drifting through a dark magic forest — a spooky animated overlay set for Twitch, YouTube & Kick.",
    image:
      "https://i.etsystatic.com/61635066/r/il/b88bf3/8303387848/il_570xN.8303387848_g0e2.jpg",
    etsy: `${SHOP_URL}/listing/4544831639`,
    features: ["Animated Screens", "Alerts", "Panels", "Emotes"],
    isNew: true,
  },
  {
    slug: "spooky-raccoon-raven-animated-stream-package",
    name: "Spooky Raccoon Raven Animated Stream Package",
    category: "witchy",
    price: "$23.25",
    description:
      "A mischievous raccoon among the ravens — spooky night-forest overlays for Twitch, YouTube & Kick.",
    image:
      "https://i.etsystatic.com/61635066/r/il/bfde8e/8347616583/il_1080xN.8347616583_27a9.jpg",
    etsy: `${SHOP_URL}/listing/4544278053`,
    features: ["Animated Screens", "Alerts", "Panels", "Emotes"],
    isNew: true,
  },
  {
    slug: "spooky-raven-wolf-animated-stream-package",
    name: "Spooky Raven Wolf Animated Stream Package",
    category: "witchy",
    price: "$23.25",
    description:
      "A lone wolf under circling crows — moody night-forest overlays for Twitch, YouTube & Kick.",
    image:
      "https://i.etsystatic.com/61635066/r/il/5b5af5/8347172703/il_1080xN.8347172703_2l50.jpg",
    etsy: `${SHOP_URL}/listing/4544272556`,
    features: ["Animated Screens", "Alerts", "Panels", "Emotes"],
    isNew: true,
  },
  {
    slug: "spooky-raven-fox-animated-stream-package",
    name: "Spooky Raven Fox Animated Stream Package",
    category: "witchy",
    price: "$23.25",
    description:
      "A sly fox in a crow-haunted wood — spooky-cozy overlays for Twitch, YouTube & Kick.",
    image:
      "https://i.etsystatic.com/61635066/r/il/5aa05c/8297369046/il_1080xN.8297369046_7ipa.jpg",
    etsy: `${SHOP_URL}/listing/4543889700`,
    features: ["Animated Screens", "Alerts", "Panels", "Emotes"],
    isNew: true,
  },
  {
    slug: "spooky-raven-dragon-animated-stream-package",
    name: "Spooky Raven Dragon Animated Stream Package",
    category: "witchy",
    price: "$23.25",
    description:
      "A dragon roosting with the ravens — dark-fantasy night overlays for Twitch, YouTube & Kick.",
    image:
      "https://i.etsystatic.com/61635066/r/il/a29eed/8343512239/il_1080xN.8343512239_29vl.jpg",
    etsy: `${SHOP_URL}/listing/4543737543`,
    features: ["Animated Screens", "Alerts", "Panels", "Emotes"],
    isNew: true,
  },
  {
    slug: "spooky-raven-cat-animated-stream-package",
    name: "Spooky Raven & Cat Animated Stream Package",
    category: "witchy",
    price: "$23.25",
    description:
      "A black cat and its raven familiar — spooky night-forest overlays for Twitch, YouTube & Kick.",
    image:
      "https://i.etsystatic.com/61635066/r/il/dcc994/8341337659/il_1080xN.8341337659_kpov.jpg",
    etsy: `${SHOP_URL}/listing/4543341419`,
    features: ["Animated Screens", "Alerts", "Panels", "Emotes"],
    isNew: true,
  },
  {
    slug: "custom-twitch-emotes-chibi-commission",
    name: "Custom Twitch Emotes — Chibi Emote Commission",
    category: "frog",
    price: "$48.79",
    description:
      "Custom static chibi emotes drawn for you — for Twitch, Discord, Kick & YouTube. Perfect for VTubers and streamers who want a matching set.",
    image:
      "https://i.etsystatic.com/61635066/r/il/c2da0c/8353129255/il_570xN.8353129255_9nhd.jpg",
    etsy: `${SHOP_URL}/listing/4537273533`,
    features: ["Emotes"],
    isNew: true,
  },
];

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

function money(n: number): string {
  return `$${n.toFixed(2)}`;
}

function priceStr(raw: string): string {
  const n = parseFloat((raw || "").replace(/[^0-9.]/g, ""));
  return Number.isFinite(n) && n > 0 ? money(n) : "$0.00";
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

interface Entry {
  slug: string;
  name: string;
  category: string;
  price: string;
  compareAt?: string;
  description: string;
  image: string;
  etsy: string;
  features: string[];
  isNew?: boolean;
}

function emit(e: Entry): string {
  const lines = [
    `    slug: ${JSON.stringify(e.slug)},`,
    `    name: ${JSON.stringify(e.name)},`,
    `    category: ${JSON.stringify(e.category)},`,
    `    price: ${JSON.stringify(e.price)},`,
  ];
  if (e.compareAt) lines.push(`    compareAt: ${JSON.stringify(e.compareAt)},`);
  lines.push(
    `    description: ${JSON.stringify(e.description)},`,
    `    image: ${JSON.stringify(e.image)},`,
    `    etsy: ${JSON.stringify(e.etsy)},`,
    `    features: ${JSON.stringify(e.features)},`,
  );
  if (e.isNew) lines.push(`    isNew: true,`);
  return `  {\n${lines.join("\n")}\n  }`;
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
  let deepLinked = 0;
  let salePriced = 0;
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

    const o = findOverride(slug);
    if (o?.id) deepLinked++;
    if (o?.price) salePriced++;

    packs.push(
      emit({
        slug,
        name,
        category: mapCategory(`${title} ${r.tags || ""}`),
        price: o?.price ? money(o.price) : priceStr(r.price),
        compareAt: o?.compareAt ? money(o.compareAt) : undefined,
        description: describe(name),
        image,
        etsy: o?.id ? `${SHOP_URL}/listing/${o.id}` : SHOP_URL,
        features: features(`${title} ${r.description || ""} ${r.tags || ""}`),
      }),
    );
  }

  // Newest listings not present in the CSV yet.
  for (const extra of EXTRA_PACKS) {
    if (!seen.has(extra.slug)) {
      seen.add(extra.slug);
      packs.unshift(emit(extra as Entry));
    }
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

  const counts: Record<string, number> = {};
  for (const p of packs) {
    const m = p.match(/category: "(\w+)"/);
    if (m) counts[m[1]] = (counts[m[1]] || 0) + 1;
  }
  console.log(
    `✅ Wrote ${packs.length} packs (${deepLinked} deep-linked, ${salePriced} sale-priced, ${skipped} skipped).`,
  );
  console.log("   Categories:", counts);
}

main();
