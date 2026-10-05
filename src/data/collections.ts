import type { Pack } from "@/lib/types";

/**
 * Collections mirror the real Etsy shop sections. Each maps onto the static
 * catalog via keyword/category predicates, so a fresh CSV regen automatically
 * refreshes every collection page.
 */
export interface Collection {
  slug: string;
  name: string;
  blurb: string;
  /** Regex tested against the pack name. */
  pattern?: string;
  /** Internal catalog categories that belong to this collection. */
  categories?: string[];
}

export const COLLECTIONS: Collection[] = [
  {
    slug: "twitch-bundles",
    name: "Twitch Overlay Bundles",
    blurb: "Complete animated bundles - screens, alerts, panels and more in one cozy set.",
    pattern: "package|bundle",
  },
  {
    slug: "cat-overlays",
    name: "Cat Twitch Overlays",
    blurb: "Forest cats, sakura cats, gothic cats - a whole clowder of cozy.",
    categories: ["cat"],
  },
  {
    slug: "cute-animals",
    name: "Cute Animal Overlays",
    blurb: "Otters, frogs, pandas, turtles and friends - the softest corner of the shop.",
    categories: ["bear", "frog"],
  },
  {
    slug: "wolf-overlays",
    name: "Wolf Twitch Overlays",
    blurb: "Lofi wolves, forest wolves and sakura wolves for moodier streams.",
    pattern: "wolf",
  },
  {
    slug: "vtuber",
    name: "Cozy VTuber Overlays",
    blurb: "Scenes and frames that flatter a model instead of fighting it.",
    pattern: "vtuber",
  },
  {
    slug: "bear-overlays",
    name: "Bear Twitch Overlays",
    blurb: "Pandas, bears and koalas in warm, blossom-soft worlds.",
    pattern: "bear|panda|koala",
  },
  {
    slug: "tiktok-bundles",
    name: "TikTok Overlay Bundles",
    blurb: "Vertical 9:16 packs built for TikTok Live's mobile-first stage.",
    pattern: "tiktok",
  },
  {
    slug: "fox-overlays",
    name: "Fox Twitch Overlays",
    blurb: "Glowing woodland foxes with warm, lofi light.",
    categories: ["fox"],
  },
  {
    slug: "otter-overlays",
    name: "Otter Twitch Overlays",
    blurb: "Playful otters - under the sea and deep in the forest.",
    pattern: "otter",
  },
  {
    slug: "dragon-overlays",
    name: "Dragon Twitch Overlays",
    blurb: "Sakura dragons and starry-forest fantasy, kept cozy.",
    categories: ["dragon"],
  },
  {
    slug: "seasonal",
    name: "Seasonal Overlays",
    blurb: "Halloween, Christmas and New Year refreshes for your channel.",
    categories: ["seasonal"],
  },
  {
    slug: "badges-bits-icons",
    name: "Badges, Bits & Icons",
    blurb: "Sub badges, bit badges and channel-point icons your chat will collect.",
    pattern: "badge|bits\\b|icon",
  },
  {
    slug: "channel-points",
    name: "Channel Point Icons",
    blurb:
      "Custom channel-point reward icons so your redeem menu looks like the rest of your channel, not Twitch's defaults.",
    pattern: "channel[ -]?point",
  },

  // Theme collections. Each one is a landing page for how shoppers actually
  // search ("raven twitch overlay", "sakura stream overlay"). Only themes with
  // enough packs to fill a page are listed - a thin page helps nobody.
  {
    slug: "sakura-overlays",
    name: "Sakura & Cherry Blossom Overlays",
    blurb:
      "Falling petals, blossom branches and soft pink light. The biggest family in the shop, from gentle pastel sets to moodier night-time sakura.",
    pattern: "sakura|cherry blossom|blossom",
  },
  {
    slug: "kawaii-overlays",
    name: "Kawaii & Pastel Overlays",
    blurb:
      "Cute, soft and pastel: rounded art, gentle colours and friendly mascots for channels that want to feel welcoming.",
    pattern: "kawaii|pastel|cute|chibi",
  },
  {
    slug: "witchy-gothic-overlays",
    name: "Witchy & Gothic Overlays",
    blurb:
      "Candlelight, spellbooks, black cats and drifting embers. Dark but warm, for cozy-gothic channels.",
    // "witch" needs word boundaries - without them it matches "twitch".
    pattern: "\\bwitch(y|es)?\\b|gothic|spooky",
  },
  {
    slug: "halloween-overlays",
    name: "Halloween Overlays",
    blurb:
      "Pumpkins, bats, ghosts and purple gothic rooms. Spooky-season packs ready to drop in for October.",
    pattern: "halloween",
  },
  {
    slug: "christmas-overlays",
    name: "Christmas & Winter Overlays",
    blurb:
      "Snow, fairy lights and warm windows. Festive packs to refresh your channel for December.",
    pattern: "christmas|winter|snow",
  },
  {
    slug: "night-sky-overlays",
    name: "Night Sky & Celestial Overlays",
    blurb:
      "Moons, stars, galaxies and deep night skies for late-night streams.",
    pattern: "night|moon|\\bstars?\\b|starry|celestial|galaxy",
  },
  {
    slug: "forest-overlays",
    name: "Forest & Nature Overlays",
    blurb:
      "Woodland scenes, gardens and glowing forest nights, full of cozy cottagecore detail.",
    pattern: "forest|garden|nature|woodland",
  },
  {
    slug: "cozy-room-overlays",
    name: "Cozy Room & Bedroom Overlays",
    blurb:
      "Lofi bedrooms, coffee corners, balconies and reading nooks. Scene-based packs that give your stream a place to live.",
    // "\\broom\\b" so "mushroom" doesn't land here.
    pattern: "\\broom\\b|bedroom|balcony|terrace|cafe|coffee|library",
  },
  {
    slug: "lofi-overlays",
    name: "Lofi Overlays",
    blurb:
      "Slow, warm and rainy. Lofi packs built for chill streams, study sessions and music channels.",
    pattern: "lofi|lo-fi",
  },
  {
    slug: "neon-overlays",
    name: "Neon & Cyber Overlays",
    blurb:
      "Neon signage, CRT glow and rainy cyber nights for a bolder, electric channel.",
    pattern: "neon|cyber|y2k|\\bcrt\\b",
  },
  {
    slug: "japanese-overlays",
    name: "Japanese & Samurai Overlays",
    blurb:
      "Samurai nights, sakura streets and lantern light. Japanese-inspired packs with a cozy finish.",
    pattern: "samurai|japan",
  },
  {
    slug: "sunset-overlays",
    name: "Sunset & Train Overlays",
    blurb:
      "Golden-hour windows and slow train rides. Warm, wistful packs with gentle motion.",
    pattern: "sunset|\\btrain\\b|golden hour",
  },
  {
    slug: "raven-crow-overlays",
    name: "Raven & Crow Overlays",
    blurb:
      "Crows circling a dark forest, ravens on spellbooks. Moody night-time packs for a gothic channel.",
    pattern: "raven|crow",
  },
  {
    slug: "panda-overlays",
    name: "Panda Overlays",
    blurb:
      "Pandas and red pandas napping in blossom and matcha-green scenes.",
    pattern: "panda",
  },
  {
    slug: "frog-overlays",
    name: "Frog Overlays",
    blurb:
      "Frogs in jars, ponds and forest nights. Quietly the most-requested little guy in the shop.",
    pattern: "frog|toad",
  },
  {
    slug: "bunny-overlays",
    name: "Bunny & Rabbit Overlays",
    blurb:
      "Soft bunnies in spring gardens and sakura jars.",
    pattern: "bunny|rabbit",
  },
  {
    slug: "raccoon-overlays",
    name: "Raccoon Overlays",
    blurb:
      "Mischievous raccoons in cozy rooms, forests and spooky night scenes.",
    pattern: "raccoon",
  },
  {
    slug: "dog-overlays",
    name: "Dog & Shiba Overlays",
    blurb:
      "Shibas, corgis and akitas in warm lofi and sakura settings.",
    pattern: "\\bdog\\b|shiba|akita|corgi",
  },
  {
    slug: "jar-overlays",
    name: "Cozy Jar Overlays & Badges",
    blurb:
      "Little worlds in a glass jar: animals, blossoms and fireflies sealed in. One of the shop's most-loved series.",
    pattern: "\\bjars?\\b",
  },
  {
    slug: "matcha-overlays",
    name: "Matcha & Green Tea Overlays",
    blurb:
      "Soft matcha greens, tea cups and cafe calm for a gentle, slow-paced channel.",
    pattern: "matcha|green tea",
  },
  {
    slug: "emote-packs",
    name: "Twitch Emotes",
    blurb:
      "Emote sets in every size Twitch needs (112, 56 and 28 px), ready to upload.",
    pattern: "\\bemotes?\\b",
  },
  {
    slug: "panel-packs",
    name: "Twitch Panels",
    blurb:
      "Matching profile panels so your channel page looks designed, not assembled.",
    pattern: "\\bpanels?\\b",
  },
  {
    slug: "custom",
    name: "Custom Overlays",
    blurb: "A fully bespoke animated pack, built around your channel.",
    pattern: "custom",
  },
];

export function getCollection(slug: string): Collection | undefined {
  return COLLECTIONS.find((c) => c.slug === slug);
}

/**
 * Splits a collection name for the page heading: everything up to the last
 * word, then the word to highlight. Collections whose name already ends in
 * "Overlays" keep it instead of having a second "overlays" appended.
 */
export function collectionHeading(name: string): [string, string] {
  const words = name.trim().split(/\s+/);
  const last = words.pop() ?? name;
  return [words.join(" "), last];
}

/**
 * Search phrases for a collection page, built from the theme words in its own
 * pattern. "sakura twitch overlay", "twitch overlay sakura", "sakura stream
 * overlay"... - the orders shoppers actually type.
 */
export function collectionKeywords(c: Collection): string[] {
  const words = (c.pattern ?? "")
    .split("|")
    .map((w) => w.replace(/\\b|\[ -\]\?|\\/g, " ").replace(/[^a-z0-9 ]/gi, " "))
    .map((w) => w.replace(/\s+/g, " ").trim())
    .filter(Boolean);

  const out = new Set<string>();
  for (const w of [...words, ...(c.categories ?? [])]) {
    out.add(`${w} twitch overlay`);
    out.add(`twitch overlay ${w}`);
    out.add(`${w} stream overlay`);
    out.add(`stream overlays ${w}`);
    out.add(`${w} overlay`);
    out.add(`${w} twitch`);
    out.add(`animated ${w} overlay`);
  }
  out.add(c.name.toLowerCase());
  out.add("animated twitch overlays");
  out.add("stream overlay pack");
  return [...out];
}

export function packsInCollection(packs: readonly Pack[], c: Collection): Pack[] {
  const re = c.pattern ? new RegExp(c.pattern, "i") : null;
  return packs.filter((p) => {
    if (c.categories?.includes(p.category)) return true;
    if (!re) return false;
    // Match the name, then the pack's own Etsy tags. A pack called "Cozy Cats
    // Jars Twitch Badges" never says "channel points" in its title even though
    // the set includes them, so a name-only match hid most of the catalog.
    // Tags are the seller's own keywords and stay precise; the full description
    // is far too noisy (nearly every listing says "package" and "icons").
    if (re.test(p.name)) return true;
    return p.tags?.some((t) => re.test(t)) ?? false;
  });
}
