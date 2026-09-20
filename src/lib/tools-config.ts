/**
 * Single source of truth for the Free Tools section.
 * Platforms change their sizes/limits over time - edit them HERE only.
 */

import { LucideIcon } from "lucide-react";
import { Sparkles, Crop, Palette, Wand2, Gauge } from "lucide-react";

export const ETSY_SHOP_URL = "https://cozyjsstudio.etsy.com";

/** Native render sizes / platform limits. */
export const PLATFORM = {
  twitchEmote: { sizes: [112, 56, 28], label: "Twitch emote" },
  twitchBadge: { sizes: [72, 36, 18], label: "Twitch sub badge" },
  discordEmoji: { size: 128, maxKB: 256, label: "Discord emoji" },
  youtubeEmoji: { size: 48, label: "YouTube custom emoji" },
  twitchPanelMaxWidth: 320,
  // Recommended ceilings (kbps) - editable as platforms change.
  bitrate: {
    twitchMaxVideoKbps: 6000,
    youtubeMaxVideoKbps: 9000,
  },
} as const;

/** Where each tool's CTA should send people. */
export const TOOL_CTA = {
  shop: "/shop",
  etsy: ETSY_SHOP_URL,
  emotes: "/shop",
  panels: "/shop",
  screens: "/shop",
} as const;

export interface ToolDef {
  slug: string;
  name: string;
  blurb: string;
  icon: LucideIcon;
  /** false = "coming soon" card, not yet linkable. */
  live: boolean;
}

export const TOOLS: ToolDef[] = [
  {
    slug: "emote-previewer",
    name: "Emote & Badge Previewer",
    blurb: "See your emote at every Twitch size, live in real chat mockups.",
    icon: Sparkles,
    live: true,
  },
  {
    slug: "emote-resizer",
    name: "Emote & Badge Resizer",
    blurb: "Drop one image, download every required size as a tidy .zip.",
    icon: Crop,
    live: true,
  },
  {
    slug: "palette-generator",
    name: "Cozy Color Palette Generator",
    blurb: "Generate cottagecore, kawaii, witchy and lofi color palettes.",
    icon: Palette,
    live: true,
  },
  {
    slug: "overlay-brief",
    name: "Overlay Brief Generator",
    blurb: "Turn a few answers into a ready-to-use custom overlay brief.",
    icon: Wand2,
    live: true,
  },
  {
    slug: "bitrate-calculator",
    name: "Bitrate & Settings Calculator",
    blurb: "Find the right OBS bitrate for your upload speed and resolution.",
    icon: Gauge,
    live: true,
  },
];

export function getTool(slug: string): ToolDef | undefined {
  return TOOLS.find((t) => t.slug === slug);
}
