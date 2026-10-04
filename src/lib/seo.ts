/**
 * Central SEO helpers - descriptive alt text and keyword tags.
 *
 * Alt text is written to be genuinely descriptive first (screen readers) and
 * keyword-bearing second: a readable sentence naming the pack, its theme and
 * the platforms it's for. No keyword stuffing - Google demotes that.
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
 * e.g. "Cat Forest - animated cat stream overlay pack for Twitch, YouTube,
 *       Kick and TikTok, showing screens, alerts and panels"
 */
export function packImageAlt(name: string, category?: string | null): string {
  const theme = category ? CATEGORY_THEME[category] : undefined;
  const themed = theme ? `${theme} ` : "cozy ";
  const kind = packNoun(name);
  // Describe what the pack actually contains. A badge or panel set has no
  // Starting Soon screen, so claiming one is wrong for shoppers and for search.
  const contains =
    kind === "badges"
      ? "sub badges, bit badges and channel point icons"
      : kind === "emotes"
        ? "Twitch emotes in every required size"
        : kind === "panels"
          ? "matching profile panels for your channel page"
          : "Starting Soon, BRB and Ending screens, alerts and panels";
  const thing = kind === "overlay" ? "stream overlay pack" : `Twitch ${kind} set`;
  return `${name} - animated ${themed}${thing} for ${PLATFORMS}, with ${contains}`;
}

/**
 * Alt text for photo 2, 3, 4... of a listing. Each one names the pack, its
 * subject and what that photo is likely showing, so every image can be found
 * in Google Images instead of all sharing one generic caption.
 */
const GALLERY_ASPECTS: Record<string, string[]> = {
  overlay: [
    "full pack preview",
    "animated Starting Soon screen",
    "Be Right Back screen",
    "Stream Ending screen",
    "webcam and facecam frame",
    "animated alerts for follows, subs and donations",
    "matching profile panels",
    "emotes and sub badges",
    "colour palette and style detail",
    "what is included in the pack",
  ],
  badges: [
    "full badge set preview",
    "sub badge tiers shown close up",
    "badges at real size in Twitch chat",
    "bit badge designs",
    "channel point reward icons",
    "every badge in the set",
    "sizes included (18px, 36px, 72px)",
    "colour and style detail",
  ],
  emotes: [
    "full emote set preview",
    "emotes shown at real size in Twitch chat",
    "every emote in the set",
    "sizes included (28px, 56px, 112px)",
    "expressions and reactions included",
    "colour and style detail",
  ],
  panels: [
    "full panel set preview",
    "panels shown on a Twitch channel page",
    "About, Schedule and Socials panel designs",
    "every panel in the set",
    "colour and style detail",
  ],
};

/**
 * Alt text for photo 2, 3, 4... of a listing, describing what that photo is
 * likely showing. The aspects depend on what the pack actually is - a badge
 * set has no "Be Right Back screen", and claiming otherwise is both wrong for
 * shoppers and a quality signal Google holds against the page.
 */
export function packGalleryAlt(
  name: string,
  category: string | null | undefined,
  index: number,
): string {
  if (index === 0) return packImageAlt(name, category);
  const kind = packNoun(name);
  const aspects = GALLERY_ASPECTS[kind] ?? GALLERY_ASPECTS.overlay;
  const aspect = aspects[index % aspects.length];
  const theme = category ? CATEGORY_THEME[category] : undefined;
  const thing =
    kind === "overlay"
      ? `animated ${theme ? `${theme} ` : "cozy "}stream overlay pack`
      : `cozy ${theme ? `${theme} ` : ""}Twitch ${kind} set`;
  return `${name} - ${aspect} from this ${thing} for Twitch, YouTube, Kick and TikTok`;
}

/** Shorter alt for small thumbnails (cart rows, galleries). */
export function packThumbAlt(name: string, category?: string | null): string {
  const theme = category ? CATEGORY_THEME[category] : undefined;
  return `${name} - animated ${theme ? `${theme} ` : "cozy "}stream overlay pack preview`;
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
 * Keyword tags for a pack - theme + category + platform terms.
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

/**
 * The subject a pack is actually about, plus words shoppers use for the same
 * thing. A Raven pack should also be findable as "crow"; a frog pack must not
 * inherit raven words. Longest first so "red panda" beats "panda".
 */
const SUBJECTS: Array<[RegExp, string[]]> = [
  [/\bred panda\b/i, ["red panda", "panda"]],
  [/\bpolar bear\b/i, ["polar bear", "bear"]],
  [/\b(raven|crow)\b/i, ["raven", "crow"]],
  [/\b(cat|kitty|kitten|neko|tabby)\b/i, ["cat", "kitty"]],
  [/\b(frog|toad)\b/i, ["frog"]],
  [/\b(wolf|wolves)\b/i, ["wolf", "wolves"]],
  [/\b(fox|kitsune)\b/i, ["fox"]],
  [/\bdragon\b/i, ["dragon"]],
  [/\b(panda)\b/i, ["panda"]],
  [/\b(bear)\b/i, ["bear"]],
  [/\botter\b/i, ["otter"]],
  [/\b(bunny|rabbit)\b/i, ["bunny", "rabbit"]],
  [/\bcapybara\b/i, ["capybara"]],
  [/\braccoon\b/i, ["raccoon"]],
  [/\bturtle\b/i, ["turtle"]],
  [/\bkoala\b/i, ["koala"]],
  [/\baxolotl\b/i, ["axolotl"]],
  [/\b(dog|shiba|akita|corgi)\b/i, ["dog"]],
  [/\b(swan|bird)\b/i, ["bird"]],
  [/\bsnake\b/i, ["snake"]],
  [/\bbat\b/i, ["bat"]],
  [/\b(witch|witchy)\b/i, ["witch", "witchy"]],
  [/\b(ghost|spooky)\b/i, ["ghost", "spooky"]],
  [/\b(sakura|cherry blossom)\b/i, ["sakura", "cherry blossom"]],
  [/\b(halloween)\b/i, ["halloween"]],
  [/\b(christmas|winter)\b/i, ["christmas"]],
];

/** The subject words for a pack, e.g. ["raven","crow"] - [] when none matches. */
export function packSubjects(name: string): string[] {
  for (const [re, words] of SUBJECTS) if (re.test(name)) return words;
  return [];
}

/** What the pack actually is, used to build natural phrase variations. */
function packNoun(name: string): "badges" | "emotes" | "panels" | "overlay" {
  if (/\bpanels?\b/i.test(name)) return "panels";
  if (/\bbadges?\b|\bbits\b|channel[ -]?point/i.test(name)) return "badges";
  if (/\bemotes?\b/i.test(name)) return "emotes";
  return "overlay";
}

/**
 * Search phrases people actually type for this pack, in both word orders -
 * "raven twitch overlay", "twitch overlay raven", "stream overlay raven",
 * "crow overlay"... Subject-specific, so a frog pack never inherits raven
 * terms. Used for meta keywords, not pasted visibly into the copy: real
 * sentences rank, repeated keyword lists get demoted.
 */
export function packSearchPhrases(name: string, category?: string | null): string[] {
  const subjects = packSubjects(name);
  const noun = packNoun(name);
  const out: string[] = [];

  const nounPlural = noun === "overlay" ? "overlays" : noun;
  for (const s of subjects) {
    out.push(
      `${s} twitch ${noun}`,
      `twitch ${noun} ${s}`,
      `${s} ${noun}`,
      `${noun} ${s}`,
      `${s} stream ${noun}`,
      `stream ${nounPlural} ${s}`,
      `${s} twitch`,
      `${s} twitch pack`,
    );
  }

  // Generic terms that are true for every pack here.
  out.push(
    `twitch ${noun}`,
    `twitch ${nounPlural}`,
    `stream ${noun}`,
    `stream ${nounPlural}`,
    `animated twitch ${noun}`,
    `cozy twitch ${noun}`,
  );

  if (category && CATEGORY_THEME[category]) {
    out.push(`${CATEGORY_THEME[category]} twitch ${noun}`);
  }

  return [...new Set(out.map((p) => p.toLowerCase().replace(/\s+/g, " ").trim()))];
}

/** Full metadata keyword list for a pack's product page. */
export function packKeywords(name: string, category?: string | null): string[] {
  return [
    ...packSearchPhrases(name, category),
    ...packTags(name, category),
    "youtube overlay",
    "kick overlay",
    "streamlabs overlay",
    "obs overlay",
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
