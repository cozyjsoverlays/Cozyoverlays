/**
 * Central SEO helpers — descriptive alt text and keyword tags.
 *
 * Alt text is written to be genuinely descriptive first (screen readers) and
 * keyword-bearing second: a readable sentence naming the pack, its theme and
 * the platforms it's for. No keyword stuffing — Google demotes that.
 */

/** Human-readable theme per catalog category, used in alt text + tags. */
export const CATEGORY_THEME: Record<string, string> = {
  cat: "cat",
  dragon: "dragon",
  bear: "bear and panda",
  fox: "fox",
  frog: "frog and woodland animal",
  japanese: "sakura and Japanese",
  witchy: "witchy and gothic",
  room: "cozy lofi bedroom",
  seasonal: "seasonal",
};

const PLATFORMS = "Twitch, YouTube, Kick and TikTok";

/**
 * Alt text for a pack's preview image.
 * e.g. "Cat Forest — animated cat stream overlay pack for Twitch, YouTube,
 *       Kick and TikTok, showing screens, alerts and panels"
 */
export function packImageAlt(name: string, category?: string | null): string {
  const theme = category ? CATEGORY_THEME[category] : undefined;
  const themed = theme ? `${theme} ` : "cozy ";
  return `${name} — animated ${themed}stream overlay pack for ${PLATFORMS}, with Starting Soon, BRB and Ending screens, alerts and panels`;
}

/** Shorter alt for small thumbnails (cart rows, galleries). */
export function packThumbAlt(name: string, category?: string | null): string {
  const theme = category ? CATEGORY_THEME[category] : undefined;
  return `${name} — animated ${theme ? `${theme} ` : "cozy "}stream overlay pack preview`;
}

/** Theme keywords derived from a pack's title. First match order matters little. */
const TAG_RULES: Array<[RegExp, string[]]> = [
  [/sakura|cherry blossom|blossom/i, ["sakura overlay", "cherry blossom"]],
  [/lofi|lo-fi|chill/i, ["lofi overlay"]],
  [/kawaii|cute|pastel/i, ["kawaii overlay", "pastel"]],
  [/witch|spooky|halloween|goth|raven|skull/i, ["witchy overlay", "gothic"]],
  [/christmas|winter|snow|new year/i, ["christmas overlay", "winter"]],
  [/neon|cyber|y2k|crt/i, ["neon overlay", "cyberpunk"]],
  [/forest|garden|nature|woodland/i, ["forest overlay", "cottagecore"]],
  [/night|moon|star|celestial|galaxy/i, ["night sky overlay", "celestial"]],
  [/vtuber/i, ["vtuber overlay"]],
  [/badge|bits/i, ["twitch sub badges", "bit badges"]],
  [/emote/i, ["twitch emotes"]],
  [/panel/i, ["twitch panels"]],
  [/bedroom|room|cafe|library/i, ["cozy room overlay"]],
  [/tiktok/i, ["tiktok overlay", "vertical overlay"]],
];

/**
 * Keyword tags for a pack — theme + category + platform terms.
 * Used for meta keywords and the visible tag chips on product pages.
 */
export function packTags(name: string, category?: string | null): string[] {
  const tags = new Set<string>();

  if (category && CATEGORY_THEME[category]) {
    tags.add(`${CATEGORY_THEME[category]} overlay`.toLowerCase());
  }
  for (const [re, values] of TAG_RULES) {
    if (re.test(name)) values.forEach((v) => tags.add(v));
  }

  // Always-true descriptors for this catalog.
  tags.add("animated stream overlay");
  tags.add("twitch overlay");
  tags.add("obs overlay");

  return [...tags].slice(0, 10);
}

/** Full metadata keyword list for a pack's product page. */
export function packKeywords(name: string, category?: string | null): string[] {
  return [
    ...packTags(name, category),
    "stream overlay pack",
    "youtube overlay",
    "kick overlay",
    "streamlabs overlay",
    "cozy stream overlay",
    "instant download",
  ];
}

/** Site-wide fallback keywords for pages without their own topic. */
export const SITE_KEYWORDS = [
  "animated stream overlays",
  "twitch overlays",
  "cozy stream overlay",
  "obs overlays",
  "youtube overlays",
  "kick overlays",
  "tiktok live overlays",
  "twitch emotes",
  "twitch sub badges",
  "stream panels",
  "vtuber overlays",
  "CozyJsStudio",
];
