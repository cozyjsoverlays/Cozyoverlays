import type { FaqEntry } from "@/lib/types";

export const SITE = {
  name: "CozyOverlays",
  shop: "CozyJsStudio",
  url: "https://cozyoverlays.com",
  tagline:
    "Animated stream overlay packs that feel alive & cozy — for Twitch, YouTube, Kick & TikTok.",
  avatar:
    "https://i.etsystatic.com/61635066/r/isla/962937/85081868/isla_180x180.85081868_iwuxhcgu.jpg",
} as const;

/**
 * Buy model. When true, every pack's buy button links out to its Etsy listing
 * (Etsy handles payment + delivery) instead of the on-site PayPal checkout.
 * Flip to false to re-enable the built-in cart/PayPal flow.
 */
export const BUY_ON_ETSY = true;

/** Etsy shop home — fallback target when a pack has no specific listing URL. */
export const ETSY_SHOP_URL = "https://cozyjsstudio.etsy.com";

/**
 * Direct on-site purchase via PayPal Smart Buttons (runs fully in the browser —
 * static-site friendly). Paste your LIVE PayPal **Client ID** (a public value,
 * safe to commit) from https://developer.paypal.com/dashboard/ → Apps & Credentials.
 * Leave empty to hide the "Buy on Site" button (Etsy stays the only option).
 * Fulfillment is manual: PayPal emails you each sale; send the pack to the
 * buyer's PayPal email.
 */
export const PAYPAL_CLIENT_ID = "";

/**
 * Email lead-magnet (Cozy Starter Pack popup). Static site = no server, so the
 * popup posts the email straight to your provider's PUBLIC form endpoint (no
 * secret key). Paste your Kit/ConvertKit/MailerLite/Beehiiv form POST URL here.
 *   Kit example: https://app.kit.com/forms/0000000/subscriptions
 * Leave empty to keep the popup in demo mode (it shows success but won't capture).
 */
export const NEWSLETTER_FORM_ACTION =
  "https://app.kit.com/forms/9623698/subscriptions";

export const LINKS = {
  etsy: "https://cozyjsstudio.etsy.com",
  etsyCats:
    "https://www.etsy.com/shop/CozyJsStudio?section_id=56165083",
  etsyContact: "https://www.etsy.com/messages/new?with_id=1121232907",
  etsyCustom:
    "https://www.etsy.com/listing/4500763545/custom-animated-twitch-stream-overlay",
  youtube: "https://www.youtube.com/@cozyjsstudio",
  telegram: "https://t.me/Cozyjsstudio",
  pinterest: "https://www.pinterest.com/cozyjsstudio/",
  instagram: "https://www.instagram.com/cozyjsstudio/",
  twitter: "https://twitter.com/Cozyjsstudio",
} as const;

export const NAV_LINKS = [
  { label: "Shop", href: "/shop" },
  { label: "Free Tools", href: "/free-tools" },
  { label: "Reviews", href: "/#reviews" },
  { label: "Tutorials", href: "/#tutorials" },
  { label: "Blog", href: "/blog" },
  { label: "FAQ", href: "/#faq" },
] as const;

export const HERO_STATS = [
  "686 happy streamers",
  "⚡ Instant download",
  "4.9★ from 91 reviews",
  "🎮 OBS & Streamlabs ready",
  "🌍 122 unique packs",
] as const;

export const TRUST_ITEMS = [
  "⭐ Star Seller",
  "91 Reviews · 4.9 avg",
  "⚡ Instant secure download",
  "OBS & Streamlabs",
  ".WEBM + .PNG included",
] as const;

export const COMPATIBILITY = [
  "Twitch",
  "YouTube",
  "Kick",
  "TikTok",
  "OBS Studio",
  "Streamlabs",
  "StreamElements",
] as const;

export const ABOUT_CHIPS = [
  "122 Unique Packs",
  "4.9★ Star Seller",
  "686 Sales",
  "Instant Delivery",
  "Custom Commissions",
  "Worldwide",
] as const;

export const HOW_IT_WORKS = [
  {
    title: "Pick a Pack",
    desc: "Browse the shop and add your favorite cozy worlds to your cart.",
  },
  {
    title: "Pay with PayPal",
    desc: "Check out securely in seconds — no account or Etsy detour required.",
  },
  {
    title: "Instant Secure Download",
    desc: "Get private, time-limited download links on-screen and by email.",
  },
  {
    title: "Add to OBS & Go Live",
    desc: "Drop the .WEBM screens into OBS or Streamlabs and glow up your stream.",
  },
] as const;

export const TUTORIALS = [
  {
    title: "OBS Setup in Under 5 Minutes",
    desc: "Add animated .WEBM overlays as browser sources the right way.",
    tag: "Setup",
  },
  {
    title: "Full Pack Showcase",
    desc: "A walkthrough of every screen, alert, and panel in a cozy pack.",
    tag: "Showcase",
  },
  {
    title: "Stream Tips for New Creators",
    desc: "Small touches that make your stream feel polished from day one.",
    tag: "Tips",
  },
] as const;

export const FAQ: FaqEntry[] = [
  {
    question: "Will these work with OBS and Streamlabs?",
    answer:
      "Yes. Every animated screen ships as a transparent .WEBM you can drop into OBS Studio, Streamlabs, or StreamElements as a browser/media source. Static .PNG versions are included too for tools that need them.",
  },
  {
    question: "Which platforms and sizes are supported?",
    answer:
      "All four major platforms: Twitch, YouTube, Kick, and TikTok. The assets are sized and exported so they look crisp on each platform's layout.",
  },
  {
    question: "Can I request changes to a pack?",
    answer:
      "Small tweaks can often be arranged — reach out and ask. For full personalization (your own character, palette, and emotes), grab a custom commission.",
  },
  {
    question: "What's your refund policy?",
    answer:
      "Because these are instant-download digital goods, all sales are final once the files have been downloaded. If you hit a technical problem, contact us and we'll fix it or make it right.",
  },
  {
    question: "Do you take custom commissions?",
    answer:
      "Yes! Custom packs start at $601 and include your own character or mascot, a custom palette, every screen and alert, custom emotes, a sub badge set, and matching panels and overlays.",
  },
  {
    question: "I lost my download link — what now?",
    answer:
      "No problem. Your links are in the confirmation email we sent at purchase. If they've expired, just contact us with your order email and we'll happily re-issue them.",
  },
];
