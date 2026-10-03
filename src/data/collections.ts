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
