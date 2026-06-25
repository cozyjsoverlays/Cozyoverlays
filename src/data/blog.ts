import type { BlogPost } from "@/lib/types";
import { EXTRA_POSTS } from "@/data/blog-extra";
import { EXTRA_POSTS_2 } from "@/data/blog-extra-2";

// Reusable destinations so every article funnels readers to the shop + Etsy.
const SHOP = "/shop";
const ETSY = "https://cozyjsstudio.etsy.com";
const CAT_FOREST = "/shop/cat-forest-animated-stream-package";
const DRAGON_SAKURA = "/shop/dragon-sakura-animated-stream-package";
const WOLF_TRAIN = "/shop/wolf-train-lofi-animated-stream-pack";
const OBS = "https://obsproject.com/";

const CORE_POSTS: BlogPost[] = [
  {
    slug: "set-up-stream-overlay-obs-5-minutes",
    title: "How to Set Up Your Stream Overlay in OBS in Under 5 Minutes",
    excerpt:
      "A no-fluff walkthrough for adding animated stream overlays to OBS Studio — browser sources, sizing, transparency, and the one toggle most streamers miss.",
    date: "Jun 10, 2026",
    isoDate: "2026-06-10",
    readingTime: "6 min read",
    tag: "Tutorial",
    keywords: [
      "how to add overlay to OBS",
      "animated stream overlay setup",
      "OBS media source webm",
      "Twitch overlay tutorial",
      "cozy stream overlay",
    ],
    heroImage:
      "https://i.etsystatic.com/61635066/r/il/316113/7805031188/il_fullxfull.7805031188_mn58.jpg",
    body: [
      {
        paragraphs: [
          "You just grabbed a cozy new animated overlay and you want it live before your next stream. Good news: getting animated overlays into **OBS Studio** is genuinely a five-minute job once you know the steps. This guide walks you through it from download to going live — no design skills required.",
          "Every [CozyOverlays pack]("+SHOP+") is built to drop straight into OBS, so you can follow along with whichever pack you own (or [grab one from the shop]("+SHOP+") first).",
        ],
      },
      {
        heading: "What you'll need before you start",
        paragraphs: [
          "Two things: a copy of [OBS Studio]("+OBS+") (it's free), and your overlay files. Each pack ships as a single download containing animated **.WEBM** files with transparency baked in, plus matching **.PNG** versions for tools that prefer static images. If you don't have a pack yet, the [Cat Forest pack]("+CAT_FOREST+") is a great, gentle starting point.",
        ],
      },
      {
        heading: "1. Unzip everything first",
        paragraphs: [
          "Extract your download to a folder you'll remember — a dedicated 'Stream' folder in Documents works great. Keeping all your scenes, alerts, and panels in one place saves you a lot of clicking later.",
        ],
      },
      {
        heading: "2. Add an animated screen as a Media Source",
        paragraphs: [
          "In OBS, click the **+** under Sources and choose **Media Source**. Point it at the .WEBM screen you want — your Starting Soon, BRB, or main overlay. Tick **Loop** so it plays continuously, and you're done. The transparency is built in, so it layers cleanly over your camera and game capture.",
          "Prefer browser sources for alert tools? Those work too, but for local .WEBM files a Media Source is the simplest, lowest-overhead option.",
        ],
      },
      {
        heading: "3. Size it to the canvas",
        paragraphs: [
          "Drag the corner handles to fill your canvas (hold **Alt** to crop instead of stretch). Every pack is exported at full HD, so it snaps to a 1920×1080 scene without going soft.",
        ],
      },
      {
        heading: "4. The toggle most people miss",
        paragraphs: [
          "If your animation looks like it's stuttering, open the Media Source properties and enable **hardware decoding**. It smooths playback dramatically on most machines and costs almost nothing in performance.",
          "That's the whole trick: loop on, sized to canvas, hardware decode on. Go live.",
        ],
      },
      {
        heading: "Build a matching scene in 10 more minutes",
        paragraphs: [
          "Once one screen looks right, repeat for your BRB and Ending scenes, then add themed alerts and panels from the same pack. Because everything shares one art style, your channel instantly reads as a brand instead of a default layout. Browse the full set of [animated overlay packs]("+SHOP+") to find a world that fits your vibe.",
        ],
      },
    ],
    cta: {
      heading: "Ready to give your stream a cozy glow-up?",
      text: "Browse 125+ animated overlay packs — cats, dragons, lofi rooms, witchy and seasonal themes. Buy securely on Etsy and download instantly.",
      href: SHOP,
      label: "Browse all packs",
    },
    resources: [
      { label: "Download OBS Studio (free)", href: OBS },
      { label: "Shop animated overlay packs", href: SHOP },
      { label: "See the Cat Forest pack", href: CAT_FOREST },
      { label: "Visit the CozyJsStudio Etsy shop", href: ETSY },
    ],
  },
  {
    slug: "pick-the-right-stream-overlay-for-your-personality",
    title: "How to Pick the Right Stream Overlay for Your Personality",
    excerpt:
      "Your overlay is the first thing a new viewer feels before they hear a word. Here's how to choose a cozy stream overlay that actually matches your channel's vibe.",
    date: "Jun 6, 2026",
    isoDate: "2026-06-06",
    readingTime: "6 min read",
    tag: "Guide",
    keywords: [
      "best stream overlay for my channel",
      "Twitch overlay ideas",
      "cozy aesthetic stream setup",
      "how to choose a stream overlay",
      "cottagecore Twitch overlay",
    ],
    heroImage:
      "https://i.etsystatic.com/61635066/r/il/be4ff6/7769904430/il_fullxfull.7769904430_keij.jpg",
    body: [
      {
        paragraphs: [
          "An overlay isn't just decoration — it's the mood of your channel. Before a viewer hears your voice or sees your gameplay, they've already absorbed a feeling from your screen. So the question isn't 'what looks cool,' it's 'what feels like me.' Here's how to choose with confidence.",
        ],
      },
      {
        heading: "Start with your energy, not your game",
        paragraphs: [
          "Cozy, late-night, lofi streamers gravitate toward warm palettes and slow, drifting animation — think the [Cat Forest]("+CAT_FOREST+") or [Wolf Train Lofi]("+WOLF_TRAIN+") packs. High-energy variety streamers can carry bolder, more dramatic scenes. Match the tempo of your animation to the tempo of your stream and it'll feel effortless.",
        ],
      },
      {
        heading: "Let one motif do the talking",
        paragraphs: [
          "The strongest channel brands lean on a single recurring character or theme — a blossom-and-dragon world, a cozy cat in the woods. When your overlay, emotes, and panels all share one motif, your channel becomes instantly recognizable on a busy directory page. Browse by theme in the [shop]("+SHOP+") to find your signature look.",
        ],
      },
      {
        heading: "Match the theme to your community",
        paragraphs: [
          "Witchy and dark-fantasy streamers love a moody, candlelit world; cottagecore and chill creators lean pastel and floral. We group packs into [Cats]("+SHOP+"?category=cat), [Dragons]("+SHOP+"?category=dragon), [Japanese]("+SHOP+"?category=japanese), [Witchy]("+SHOP+"?category=witchy), [Cozy Rooms]("+SHOP+"?category=room) and more so you can jump straight to your vibe.",
        ],
      },
      {
        heading: "Think about what's around it",
        paragraphs: [
          "Your facecam, alerts, and chat box all sit on top of the overlay. Busy backgrounds fight with busy gameplay. If you play visually loud games, a softer overlay keeps the screen readable; if you do Just Chatting or lofi, you can afford more atmosphere.",
        ],
      },
      {
        heading: "When in doubt, go cozy",
        paragraphs: [
          "Cozy reads as welcoming, and welcoming keeps viewers in the room. That's the whole idea behind every pack: warm enough to feel like home, polished enough to look pro. Still unsure? You can always [message the studio on Etsy]("+ETSY+") and ask which pack fits your channel.",
        ],
      },
    ],
    cta: {
      heading: "Find the pack that feels like you",
      text: "Every theme, one click away — filter by cats, dragons, witchy, cozy rooms, seasonal and more, then buy on Etsy with instant download.",
      href: SHOP,
      label: "Explore the shop",
    },
    resources: [
      { label: "Browse all overlay packs", href: SHOP },
      { label: "Shop on Etsy (CozyJsStudio)", href: ETSY },
      { label: "Read: set up your overlay in OBS", href: "/blog/set-up-stream-overlay-obs-5-minutes" },
    ],
  },
  {
    slug: "inside-the-cat-forest-pack",
    title: "Inside the Cat Forest Pack — Every Asset Explained",
    excerpt:
      "A guided tour of one of our most-loved animated Twitch overlay packs: every screen, alert, panel, and emote, and how to use each one on your stream.",
    date: "Jun 2, 2026",
    isoDate: "2026-06-02",
    readingTime: "7 min read",
    tag: "Pack Deep-Dive",
    keywords: [
      "Cat Forest stream overlay",
      "animated cat Twitch overlay",
      "cozy cat stream package",
      "Twitch overlay with emotes and panels",
    ],
    heroImage:
      "https://i.etsystatic.com/61635066/r/il/316113/7805031188/il_fullxfull.7805031188_mn58.jpg",
    body: [
      {
        paragraphs: [
          "The [Cat Forest pack]("+CAT_FOREST+") is one of those designs people buy and then message us about weeks later, still happy. Let's open it up and look at exactly what's inside and how each piece earns its place on your stream. You can follow along on the [product page]("+CAT_FOREST+") or [grab it on Etsy]("+ETSY+"/listing/4471959754).",
        ],
      },
      {
        heading: "The animated screens",
        paragraphs: [
          "You get a full set of full-screen scenes: **Starting Soon**, **Be Right Back**, **Stream Ending**, and an in-stream main overlay. Each is a looping .WEBM with soft glowing light filtering through the trees and forest cats drifting gently in the frame. They set the tone before you've said a word.",
        ],
      },
      {
        heading: "Alerts that match the world",
        paragraphs: [
          "Follow, sub, and donation alerts are themed to the pack — quick, readable, and never so loud they pull focus from your content. Drop them into your alert tool of choice and they slot right into the forest.",
        ],
      },
      {
        heading: "Panels for a tidy offline page",
        paragraphs: [
          "A matching set of profile panels (About, Schedule, Socials, Donate, and more) makes your offline page look as intentional as your live one. This is the detail reviewers keep calling out — a tidy panel row makes a channel feel established.",
        ],
      },
      {
        heading: "Emotes your chat will actually use",
        paragraphs: [
          "Custom forest-cat emotes give your chat a way to speak in your channel's language, exported at the sizes Twitch expects so uploading is painless. (New to emote slots? Twitch's [emote guidelines]("+"https://help.twitch.tv/s/article/emotes"+") explain the sizes and tiers.)",
        ],
      },
      {
        heading: "Putting it together",
        paragraphs: [
          "Start with the main overlay and one screen, get those looking right in [OBS]("+OBS+"), then layer in alerts and panels — our [5-minute OBS guide](/blog/set-up-stream-overlay-obs-5-minutes) walks through it. Within an afternoon you'll have a channel that feels like a single, cohesive cozy world.",
          "Love cats but want a different mood? Compare it with the rest of the [cat collection]("+SHOP+"?category=cat) or the bestselling [Dragon Sakura pack]("+DRAGON_SAKURA+").",
        ],
      },
    ],
    cta: {
      heading: "Make Cat Forest your channel's home",
      text: "Animated screens, alerts, panels and emotes in one cozy set — instant download on Etsy.",
      href: ETSY + "/listing/4471959754",
      label: "Get Cat Forest on Etsy",
    },
    resources: [
      { label: "Cat Forest product page", href: CAT_FOREST },
      { label: "Browse all cat packs", href: SHOP + "?category=cat" },
      { label: "How to set it up in OBS", href: "/blog/set-up-stream-overlay-obs-5-minutes" },
      { label: "Shop on Etsy", href: ETSY },
    ],
  },
  {
    slug: "5-things-every-new-streamer-should-set-up",
    title: "5 Things Every New Streamer Should Set Up Before Going Live",
    excerpt:
      "Before you hit that button for the first time, these five basics will make your stream look and feel like you've done it for years — overlays, audio, alerts and more.",
    date: "May 29, 2026",
    isoDate: "2026-05-29",
    readingTime: "6 min read",
    tag: "Guide",
    keywords: [
      "new streamer setup checklist",
      "what to set up before streaming",
      "first Twitch stream guide",
      "starting soon and BRB screens",
    ],
    heroImage:
      "https://i.etsystatic.com/61635066/r/il/f04082/8010234087/il_fullxfull.8010234087_3v2u.jpg",
    body: [
      {
        paragraphs: [
          "Going live for the first time is exciting and a little terrifying. The good news: a handful of setup choices separate a stream that feels amateur from one that feels intentional. Here are the five we'd prioritize — and how to get each one done fast.",
        ],
      },
      {
        heading: "1. A cohesive overlay set",
        paragraphs: [
          "Mismatched free assets read as exactly that. A single coordinated pack — overlay, alerts, panels, and emotes that share one look — instantly makes your channel feel like a brand. You don't need a designer; a ready-made [animated overlay pack]("+SHOP+") does it for the price of a coffee or two.",
        ],
      },
      {
        heading: "2. Clean audio",
        paragraphs: [
          "Viewers forgive mediocre video far more than bad audio. A basic noise-suppression filter in [OBS]("+OBS+") and a mic that isn't your laptop's built-in will do more for retention than any graphics upgrade.",
        ],
      },
      {
        heading: "3. Starting Soon and BRB screens",
        paragraphs: [
          "These give you a buffer to fix things, greet early viewers, and step away without dead air. Every pack includes animated versions so even your pauses look polished — see how they come together in the [Cat Forest deep-dive](/blog/inside-the-cat-forest-pack).",
        ],
      },
      {
        heading: "4. Alerts that match",
        paragraphs: [
          "Follow and sub alerts are little dopamine hits for you and your chat. Themed alerts that match your overlay keep the whole experience consistent instead of a patchwork of stock sounds and styles.",
        ],
      },
      {
        heading: "5. Filled-out panels",
        paragraphs: [
          "Your offline page is your storefront. A row of matching panels — schedule, socials, about — tells visitors you're serious and gives them a reason to follow before you're even live. Pick a theme you'll want to keep for a while; browse the [full shop]("+SHOP+") or the [bestsellers on Etsy]("+ETSY+").",
        ],
      },
    ],
    cta: {
      heading: "Knock out #1 in five minutes",
      text: "A cohesive, animated overlay set is the single biggest upgrade for a new channel. Find yours and download instantly from Etsy.",
      href: SHOP,
      label: "Find your overlay pack",
    },
    resources: [
      { label: "Browse overlay packs", href: SHOP },
      { label: "Download OBS Studio", href: OBS },
      { label: "Read: pick the right overlay for you", href: "/blog/pick-the-right-stream-overlay-for-your-personality" },
      { label: "Shop on Etsy", href: ETSY },
    ],
  },
  {
    slug: "story-behind-the-dragon-sakura-pack",
    title: "The Story Behind the Dragon Sakura Pack",
    excerpt:
      "Our bestselling animated overlay started as a single sketch of a lofi dragon under falling cherry blossoms. Here's how it became a fan-favorite Twitch overlay.",
    date: "May 24, 2026",
    isoDate: "2026-05-24",
    readingTime: "5 min read",
    tag: "Behind the Scenes",
    keywords: [
      "Dragon Sakura overlay",
      "lofi dragon Twitch overlay",
      "cherry blossom stream overlay",
      "fantasy animated overlay",
    ],
    heroImage:
      "https://i.etsystatic.com/61635066/r/il/be4ff6/7769904430/il_fullxfull.7769904430_keij.jpg",
    body: [
      {
        paragraphs: [
          "Some packs are designed; others arrive almost fully formed. [Dragon Sakura]("+DRAGON_SAKURA+") was the second kind. It began as one quiet sketch — a lofi dragon curled beneath cherry blossoms — and that single image carried the whole pack to bestseller status.",
        ],
      },
      {
        heading: "The mood came first",
        paragraphs: [
          "We wanted something majestic without being intimidating. Dragons usually read as fierce; pairing one with the softness of falling sakura flipped the expectation into something calm and cozy. That contrast is the entire personality of the pack — and why it sits in our [Japanese-themed collection]("+SHOP+"?category=japanese).",
        ],
      },
      {
        heading: "Making it move",
        paragraphs: [
          "The animation is deliberately slow — drifting petals, a gentle ambient glow, the smallest motion in the scene. On a live stream, subtle movement reads as 'alive' without ever distracting from the streamer. Getting that balance right took the most iteration of any pack we've made.",
        ],
      },
      {
        heading: "Why it resonates",
        paragraphs: [
          "It turned out a lot of streamers were looking for exactly that mix of fantasy and warmth. Reviewers keep using the same words — 'adorable,' 'fun theme,' 'everything you need.' It's become our bestseller, and honestly, it's still one of our favorites to look at. You can [see it in motion on the product page]("+DRAGON_SAKURA+") or [pick it up on Etsy]("+ETSY+"/listing/4466565669).",
        ],
      },
    ],
    cta: {
      heading: "Bring the dragon home",
      text: "Dragon Sakura comes with animated screens, alerts, panels, emotes and sub badges. Instant download on Etsy.",
      href: ETSY + "/listing/4466565669",
      label: "Get Dragon Sakura on Etsy",
    },
    resources: [
      { label: "Dragon Sakura product page", href: DRAGON_SAKURA },
      { label: "Browse all dragon packs", href: SHOP + "?category=dragon" },
      { label: "Browse Japanese-themed packs", href: SHOP + "?category=japanese" },
      { label: "Shop on Etsy", href: ETSY },
    ],
  },
  {
    slug: "use-stream-overlays-on-tiktok-live",
    title: "How to Use Stream Overlays on TikTok Live",
    excerpt:
      "TikTok Live plays by different rules than Twitch. Here's how to make a cozy animated overlay look great in a vertical, mobile-first world.",
    date: "May 20, 2026",
    isoDate: "2026-05-20",
    readingTime: "6 min read",
    tag: "Tutorial",
    keywords: [
      "TikTok Live overlay",
      "vertical stream overlay",
      "TikTok LIVE Studio OBS",
      "mobile stream overlay setup",
    ],
    heroImage:
      "https://i.etsystatic.com/61635066/r/il/f3bb2b/7580540193/il_fullxfull.7580540193_qr8u.jpg",
    body: [
      {
        paragraphs: [
          "TikTok Live is a different animal from Twitch or YouTube. It's vertical, it's mobile-first, and the interface eats into your screen in ways desktop platforms don't. A little planning makes your overlay shine instead of getting buried.",
        ],
      },
      {
        heading: "Go live from a computer with OBS",
        paragraphs: [
          "To use custom overlays on TikTok Live, you'll generally stream from a desktop using [OBS]("+OBS+") and TikTok's LIVE Studio or a stream key. That's what lets you composite your animated screens, camera, and game capture into one scene — exactly like you would on Twitch. Our [5-minute OBS setup guide](/blog/set-up-stream-overlay-obs-5-minutes) applies here too.",
        ],
      },
      {
        heading: "Mind the vertical safe zone",
        paragraphs: [
          "TikTok's vertical layout places comments, gifts, and UI along the bottom and right edges. Keep your key visuals and any text in the upper-center of the frame so the app's interface doesn't cover them.",
        ],
      },
      {
        heading: "Keep motion gentle",
        paragraphs: [
          "On a small phone screen, busy animation turns to noise fast. The cozy, slow-drift style of our packs actually works in your favor here — it stays readable at thumbnail size and on a moving feed. The moody [Midnight Cozy Cat]("+SHOP+"?category=cat) and lofi [Wolf Train]("+WOLF_TRAIN+") looks are great low-distraction picks.",
        ],
      },
      {
        heading: "Test before you go live",
        paragraphs: [
          "Do a private test stream and watch it back on your phone. What looks balanced on a 27-inch monitor can feel cramped on mobile. Adjust, then go live with confidence. When you're ready for a fresh look, the [full pack library]("+SHOP+") and the [Etsy shop]("+ETSY+") have a vibe for every channel.",
        ],
      },
    ],
    cta: {
      heading: "A cozy look that works on every platform",
      text: "Twitch, YouTube, Kick or TikTok — our animated packs are built to read clearly anywhere. Browse and download instantly from Etsy.",
      href: SHOP,
      label: "Browse the packs",
    },
    resources: [
      { label: "Download OBS Studio", href: OBS },
      { label: "Browse all overlay packs", href: SHOP },
      { label: "Read: set up your overlay in OBS", href: "/blog/set-up-stream-overlay-obs-5-minutes" },
      { label: "Shop on Etsy", href: ETSY },
    ],
  },
];

// Core how-to/story posts first, then the broader problem-solving library.
export const BLOG_POSTS: BlogPost[] = [
  ...CORE_POSTS,
  ...EXTRA_POSTS,
  ...EXTRA_POSTS_2,
];

export function getPost(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}
