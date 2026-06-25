import type { BlogPost } from "@/lib/types";

/**
 * Batch 2 of SEO articles — fresh streamer searches (growth, seasonal, gear,
 * aesthetics, mistakes). Each gives a real answer and funnels to the shop +
 * Etsy. Concatenated into BLOG_POSTS in blog.ts.
 */

const SHOP = "/shop";
const ETSY = "https://cozyjsstudio.etsy.com";
const OBS = "https://obsproject.com/";
const CAT = SHOP + "?category=cat";
const ROOM = SHOP + "?category=room";
const WITCHY = SHOP + "?category=witchy";
const SEASONAL = SHOP + "?category=seasonal";

const IMG_CAT =
  "https://i.etsystatic.com/61635066/r/il/316113/7805031188/il_fullxfull.7805031188_mn58.jpg";
const IMG_DRAGON =
  "https://i.etsystatic.com/61635066/r/il/be4ff6/7769904430/il_fullxfull.7769904430_keij.jpg";
const IMG_WOLF =
  "https://i.etsystatic.com/61635066/r/il/f04082/8010234087/il_fullxfull.8010234087_3v2u.jpg";
const IMG_GOTHIC =
  "https://i.etsystatic.com/61635066/r/il/f3bb2b/7580540193/il_fullxfull.7580540193_qr8u.jpg";

const shopCta = (heading: string, text: string) => ({
  heading,
  text,
  href: SHOP,
  label: "Browse the packs",
});

const baseResources = [
  { label: "Browse all overlay packs", href: SHOP },
  { label: "Shop on Etsy (CozyJsStudio)", href: ETSY },
  { label: "Set up your overlay in OBS (5-min guide)", href: "/blog/set-up-stream-overlay-obs-5-minutes" },
];

export const EXTRA_POSTS_2: BlogPost[] = [
  {
    slug: "how-to-get-your-first-10-followers-on-twitch",
    title: "How to Get Your First 10 Followers on Twitch",
    excerpt:
      "The hardest followers are the first ones. Here's a practical plan to earn them — and why your channel's look matters more than you think.",
    date: "May 18, 2026",
    isoDate: "2026-05-18",
    readingTime: "6 min read",
    tag: "Growth",
    keywords: ["get first followers Twitch", "how to grow on Twitch", "first 10 followers", "new streamer growth"],
    heroImage: IMG_CAT,
    body: [
      { paragraphs: ["Your first ten followers are the hardest because nobody knows you exist yet. The fix is a mix of being discoverable, being consistent, and looking like you belong. Here's the plan."] },
      { heading: "Look established from day one", paragraphs: ["A new viewer decides in seconds. A cohesive, [animated overlay]("+SHOP+") with matching panels and alerts signals 'this person is serious,' which makes people more likely to follow."] },
      { heading: "Network in your niche", paragraphs: ["Hang out in similar small streams, support others genuinely, and they'll check you out back. Cozy and aesthetic communities are especially welcoming."] },
      { heading: "Be consistent and easy to find", paragraphs: ["Stream a set schedule, use clear titles and tags, and keep one recognizable theme so people remember you. Pick yours in the [shop]("+SHOP+")."] },
    ],
    cta: shopCta("Look worth following", "A polished, cohesive overlay makes new viewers more likely to hit follow. Browse 125+ packs and download instantly from Etsy."),
    resources: baseResources,
  },
  {
    slug: "best-obs-settings-for-a-smooth-stream",
    title: "Best OBS Settings for a Smooth Stream (Beginner Guide)",
    excerpt:
      "Choppy stream? The right OBS settings fix it. Here's a beginner-friendly starting point for clean video and audio.",
    date: "May 17, 2026",
    isoDate: "2026-05-17",
    readingTime: "6 min read",
    tag: "Tutorial",
    keywords: ["best OBS settings", "OBS settings for streaming", "smooth stream OBS", "OBS bitrate beginner"],
    heroImage: IMG_WOLF,
    body: [
      { paragraphs: ["You don't need to be a tech wizard to get a clean stream out of [OBS]("+OBS+"). These starting settings work for most people."] },
      { heading: "Resolution and FPS", paragraphs: ["Output at 1080p and 30 or 60 FPS depending on your upload speed. Design your scene on a 1920×1080 canvas — every [CozyOverlays pack]("+SHOP+") is full HD, so it fits perfectly."] },
      { heading: "Bitrate and encoder", paragraphs: ["Use hardware encoding (NVENC/AMD) if you have it to spare your CPU. Pick a bitrate your connection can sustain — smoother beats sharper."] },
      { heading: "Smooth overlays", paragraphs: ["Enable hardware decoding on Media Sources so animated screens never stutter. More on that in our [OBS lag fixes](/blog/why-is-my-obs-overlay-lagging)."] },
    ],
    cta: shopCta("Overlays that play clean in OBS", "Lightweight, full-HD animated packs built to run smooth. Browse 125+ on Etsy and download instantly."),
    resources: baseResources,
  },
  {
    slug: "how-often-should-you-stream",
    title: "How Often Should You Stream? A Schedule That Actually Grows You",
    excerpt:
      "Consistency beats marathon sessions. Here's how to build a streaming schedule you can keep — and that helps you grow.",
    date: "May 16, 2026",
    isoDate: "2026-05-16",
    readingTime: "5 min read",
    tag: "Growth",
    keywords: ["how often should I stream", "streaming schedule", "best stream schedule for growth", "consistency streaming"],
    heroImage: IMG_DRAGON,
    body: [
      { paragraphs: ["The algorithm and your audience both reward consistency. Three predictable streams a week beat seven random ones you can't sustain. Here's how to set a schedule that lasts."] },
      { heading: "Pick a cadence you can keep", paragraphs: ["Start with 3 fixed days at a fixed time. Show it on a Schedule panel so viewers know when to come back — every [pack]("+SHOP+") includes one."] },
      { heading: "Protect your energy", paragraphs: ["Burnout kills more channels than the algorithm. Shorter, regular streams keep you fresh and your content consistent."] },
      { heading: "Make every stream look the part", paragraphs: ["A cohesive [overlay]("+SHOP+") makes even a quiet stream feel intentional, so first-time visitors take you seriously."] },
    ],
    cta: shopCta("Show up looking consistent", "Matching schedule panels, screens and alerts in one pack. Browse and download instantly from Etsy."),
    resources: baseResources,
  },
  {
    slug: "kick-vs-twitch-where-to-stream",
    title: "Kick vs Twitch: Where Should You Stream in 2026?",
    excerpt:
      "Both platforms have pros and cons. Here's a quick, honest comparison — and the good news about your overlay either way.",
    date: "May 15, 2026",
    isoDate: "2026-05-15",
    readingTime: "5 min read",
    tag: "Guide",
    keywords: ["Kick vs Twitch", "should I stream on Kick", "best streaming platform 2026", "Kick streaming"],
    heroImage: IMG_WOLF,
    body: [
      { paragraphs: ["Kick offers better revenue splits and looser rules; Twitch has the bigger audience and discovery. Many creators now do both. Here's how to think about it."] },
      { heading: "Audience vs payout", paragraphs: ["Twitch is where most viewers already are; Kick pays creators more per dollar. If you're starting out, discovery usually matters more — but multistreaming hedges your bets."] },
      { heading: "Your overlay works on both", paragraphs: ["Because overlays are just layers in [OBS]("+OBS+"), one [pack]("+SHOP+") covers Twitch, Kick, YouTube and TikTok. No need to redesign per platform."] },
      { heading: "Keep one brand everywhere", paragraphs: ["Use the same theme across platforms so people recognize you. Pick your world in the [shop]("+SHOP+")."] },
    ],
    cta: shopCta("One overlay for every platform", "Animated packs that work on Twitch, Kick, YouTube and TikTok. Browse 125+ and download from Etsy."),
    resources: baseResources,
  },
  {
    slug: "how-to-grow-a-cozy-stream-community",
    title: "How to Grow a Cozy, Welcoming Stream Community",
    excerpt:
      "Cozy channels grow through warmth, not hype. Here's how to build a community that sticks around for hours.",
    date: "May 14, 2026",
    isoDate: "2026-05-14",
    readingTime: "5 min read",
    tag: "Growth",
    keywords: ["grow cozy stream community", "chill stream community", "welcoming Twitch channel", "wholesome streaming"],
    heroImage: IMG_CAT,
    body: [
      { paragraphs: ["Cozy communities are built on consistency, warmth, and a space that feels safe to hang out in. Your channel's vibe does a lot of that work before you say a word."] },
      { heading: "Set the mood with your space", paragraphs: ["A warm, gentle [overlay]("+ROOM+") tells people 'this is a calm place to be.' The [cozy rooms]("+ROOM+") and [cat]("+CAT+") collections are made for it."] },
      { heading: "Greet everyone and remember regulars", paragraphs: ["Naming returning viewers turns a stream into a hangout. Cozy thrives on familiarity."] },
      { heading: "Give chat a shared language", paragraphs: ["Themed emotes from your [pack]("+SHOP+") give your community inside jokes and a sense of belonging."] },
    ],
    cta: shopCta("Build a space people want to stay in", "Warm, cozy overlay packs with matching emotes. Browse 125+ on Etsy and download instantly."),
    resources: baseResources,
  },
  {
    slug: "stream-overlay-color-palette",
    title: "Choosing a Stream Overlay Color Palette for Your Brand",
    excerpt:
      "Color sets the mood before anything else. Here's how to pick a palette that fits your channel and stays readable.",
    date: "May 13, 2026",
    isoDate: "2026-05-13",
    readingTime: "5 min read",
    tag: "Guide",
    keywords: ["stream overlay colors", "Twitch brand colors", "overlay color palette", "stream aesthetic colors"],
    heroImage: IMG_GOTHIC,
    body: [
      { paragraphs: ["Your palette is the fastest way to set a mood and stay recognizable. You don't have to design it from scratch — pick a pack whose colors already say what you want."] },
      { heading: "Warm vs cool", paragraphs: ["Warm tones (amber, pink, lavender) read cozy and inviting; cool tones (teal, deep purple) read calm or mysterious. Browse the [shop]("+SHOP+") by feeling."] },
      { heading: "Keep it readable", paragraphs: ["High-contrast text over busy color is hard to read. Our packs balance atmosphere with legibility so your alerts and labels stay clear."] },
      { heading: "Match it everywhere", paragraphs: ["Carry the palette into panels, emotes and your offline banner. A single [pack]("+SHOP+") keeps it all consistent."] },
    ],
    cta: shopCta("A palette that's already perfected", "Cohesive color across screens, alerts, panels and emotes. Browse 125+ packs on Etsy."),
    resources: baseResources,
  },
  {
    slug: "starting-soon-screen-that-keeps-viewers",
    title: "How to Make a Starting Soon Screen That Keeps Viewers",
    excerpt:
      "Your Starting Soon screen is the most-watched part of your stream. Here's how to make people wait instead of leave.",
    date: "May 12, 2026",
    isoDate: "2026-05-12",
    readingTime: "5 min read",
    tag: "Guide",
    keywords: ["starting soon screen", "Twitch starting soon overlay", "stream waiting screen", "best starting soon screen"],
    heroImage: IMG_DRAGON,
    body: [
      { paragraphs: ["Early viewers often land on your Starting Soon screen — and decide whether to wait. A great one keeps them around until you go live."] },
      { heading: "Give them something to watch", paragraphs: ["A static image is dead air. An animated Starting Soon screen with gentle motion holds attention. Every [pack]("+SHOP+") includes one — see the [Dragon Sakura set](/shop/dragon-sakura-animated-stream-package)."] },
      { heading: "Add music and a countdown", paragraphs: ["Lofi and a timer make waiting feel intentional, not awkward. Pair it with a cozy animated scene for the full effect."] },
      { heading: "Tease what's coming", paragraphs: ["A line about today's stream gives people a reason to stay. Keep your visuals on-brand with a matching [overlay]("+SHOP+")."] },
    ],
    cta: shopCta("Turn waiting into watching", "Animated Starting Soon, BRB and Ending screens in every pack. Browse 125+ on Etsy and download instantly."),
    resources: baseResources,
  },
  {
    slug: "halloween-stream-overlay-ideas",
    title: "Halloween Stream Overlay Ideas (Spooky but Cozy)",
    excerpt:
      "Want a seasonal refresh for October? Here are witchy, spooky-cute overlay ideas to get your channel in the Halloween spirit.",
    date: "May 11, 2026",
    isoDate: "2026-05-11",
    readingTime: "5 min read",
    tag: "Seasonal",
    keywords: ["Halloween stream overlay", "spooky Twitch overlay", "witchy stream setup", "October stream theme"],
    heroImage: IMG_GOTHIC,
    body: [
      { paragraphs: ["Halloween is the perfect excuse for a seasonal refresh — and a spooky-cute look pulls viewers in. Here's how to do it without going full horror."] },
      { heading: "Go witchy, not scary", paragraphs: ["Candlelight, moody purples, a black cat by a spellbook. The [witchy collection]("+WITCHY+") nails cozy-spooky."] },
      { heading: "Swap just for the season", paragraphs: ["You don't need to rebrand — load a Halloween [pack]("+SHOP+") into [OBS]("+OBS+") for October, then switch back. Our [refresh guide](/blog/refresh-your-stream-look) shows how fast it is."] },
      { heading: "Match alerts and emotes", paragraphs: ["Themed alerts and emotes complete the spell. Grab a coordinated set on [Etsy]("+ETSY+")."] },
    ],
    cta: shopCta("Get spooky-cozy for October", "Witchy and gothic animated overlay packs — candlelight, black cats and moody magic. Browse on Etsy."),
    resources: baseResources,
  },
  {
    slug: "christmas-winter-stream-overlay-ideas",
    title: "Christmas & Winter Stream Overlay Ideas",
    excerpt:
      "Cozy up your channel for the holidays. Here are warm, wintery overlay ideas that feel festive without the clutter.",
    date: "May 10, 2026",
    isoDate: "2026-05-10",
    readingTime: "5 min read",
    tag: "Seasonal",
    keywords: ["Christmas stream overlay", "winter Twitch overlay", "holiday stream theme", "festive stream setup"],
    heroImage: IMG_CAT,
    body: [
      { paragraphs: ["Nothing says cozy like a wintery stream — soft snow, warm light, a fireplace glow. A seasonal overlay makes your channel feel festive and inviting."] },
      { heading: "Warm light, gentle snow", paragraphs: ["Look for falling snow and warm interior scenes. The [seasonal]("+SEASONAL+") and [cozy rooms]("+ROOM+") collections are built for it."] },
      { heading: "Seasonal, then back to normal", paragraphs: ["Run a holiday [pack]("+SHOP+") through December, then switch back in January. Swapping in [OBS]("+OBS+") takes minutes."] },
      { heading: "Festive alerts and emotes", paragraphs: ["Holiday-themed emotes give chat a seasonal mood. Pick a coordinated set on [Etsy]("+ETSY+")."] },
    ],
    cta: shopCta("Cozy up for the holidays", "Warm, wintery animated overlay packs. Browse the seasonal collection on Etsy and download instantly."),
    resources: baseResources,
  },
  {
    slug: "make-a-brb-screen-people-dont-leave-on",
    title: "How to Make a BRB Screen People Don't Leave On",
    excerpt:
      "A good Be Right Back screen keeps your audience parked while you step away. Here's how to design one that holds attention.",
    date: "May 9, 2026",
    isoDate: "2026-05-09",
    readingTime: "4 min read",
    tag: "Guide",
    keywords: ["BRB screen", "be right back overlay", "stream break screen", "BRB screen ideas"],
    heroImage: IMG_WOLF,
    body: [
      { paragraphs: ["Breaks are inevitable — dead air during them isn't. A warm, animated BRB screen keeps your stream feeling alive while you grab water."] },
      { heading: "Keep it animated and on-brand", paragraphs: ["A looping scene with gentle motion beats a frozen image. Every [pack]("+SHOP+") includes a matching BRB screen so your break still looks intentional."] },
      { heading: "Add music and a timer", paragraphs: ["Lofi plus a 'back in 5' note tells viewers it's worth waiting."] },
      { heading: "Match it to your whole look", paragraphs: ["Your BRB should feel like the same world as your main overlay. Grab the full set on [Etsy]("+ETSY+")."] },
    ],
    cta: shopCta("Never show dead air again", "Animated BRB, Starting Soon and Ending screens in every pack. Browse 125+ on Etsy."),
    resources: baseResources,
  },
  {
    slug: "webcam-frame-ideas-for-streamers",
    title: "Webcam Frame Ideas for Streamers",
    excerpt:
      "A themed webcam frame turns a plain face-cam into part of your set. Here's how to choose one that fits your channel.",
    date: "May 8, 2026",
    isoDate: "2026-05-08",
    readingTime: "4 min read",
    tag: "Guide",
    keywords: ["webcam frame", "Twitch cam border", "stream webcam overlay", "facecam frame ideas"],
    heroImage: IMG_DRAGON,
    body: [
      { paragraphs: ["Your face-cam is where viewers connect with you — framing it makes the whole scene feel finished."] },
      { heading: "Match the frame to your theme", paragraphs: ["A cozy cabin frame, a blossom border, a witchy arch. Pick one that matches your [overlay]("+SHOP+") so everything reads as one set."] },
      { heading: "Keep it subtle", paragraphs: ["The frame should enhance, not distract. Our packs keep cam borders gentle so your expressions stay the star."] },
      { heading: "Get it as part of a pack", paragraphs: ["Cam framing works best alongside matching screens and panels — grab the whole world on [Etsy]("+ETSY+")."] },
    ],
    cta: shopCta("Frame your face-cam in style", "Cohesive overlay packs that tie your camera into the whole scene. Browse 125+ on Etsy."),
    resources: baseResources,
  },
  {
    slug: "make-your-offline-twitch-page-look-good",
    title: "How to Make Your Offline Twitch Page Look Good",
    excerpt:
      "Most visitors arrive when you're offline. Here's how to turn that page into a follow-magnet.",
    date: "May 7, 2026",
    isoDate: "2026-05-07",
    readingTime: "5 min read",
    tag: "Guide",
    keywords: ["offline Twitch page", "Twitch offline banner", "channel about page", "Twitch panels design"],
    heroImage: IMG_CAT,
    body: [
      { paragraphs: ["When you're not live, your channel page is still working for you. A polished offline page convinces visitors to follow before they've even seen you stream."] },
      { heading: "Add an offline banner", paragraphs: ["A themed offline screen says 'come back soon' with style instead of a plain 'offline' card. Many [packs]("+SHOP+") include one."] },
      { heading: "Fill out matching panels", paragraphs: ["About, Schedule, Socials, Donate — all in one look. Correctly-sized panels come in every [pack]("+SHOP+"); see our [panel setup guide](/blog/how-to-add-panels-to-twitch)."] },
      { heading: "Point people somewhere", paragraphs: ["Link panels to your socials and content so visitors have a next step. Grab a coordinated set on [Etsy]("+ETSY+")."] },
    ],
    cta: shopCta("Turn your offline page into a follow-magnet", "Matching offline banners and panels in cozy animated packs. Browse 125+ on Etsy."),
    resources: baseResources,
  },
  {
    slug: "lofi-stream-aesthetic-guide",
    title: "The Lo-Fi Stream Aesthetic: A Complete Guide",
    excerpt:
      "Lo-fi streaming is cozy, calm, and incredibly sticky. Here's how to build the full lo-fi look and feel.",
    date: "May 6, 2026",
    isoDate: "2026-05-06",
    readingTime: "6 min read",
    tag: "Inspiration",
    keywords: ["lofi stream aesthetic", "lofi Twitch overlay", "chill stream setup", "lofi stream theme"],
    heroImage: IMG_WOLF,
    body: [
      { paragraphs: ["Lo-fi is the king of cozy streaming: muted colors, soft motion, mellow music, and a space that feels like a rainy afternoon. Here's the recipe."] },
      { heading: "The overlay", paragraphs: ["Warm rooms, sunset trains, gentle particles. The [Wolf Train Lofi pack](/shop/wolf-train-lofi-animated-stream-pack) and [cozy rooms]("+ROOM+") collection are pure lo-fi."] },
      { heading: "The sound and light", paragraphs: ["Lo-fi beats and warm lamp lighting in your cam shot complete the vibe. The visuals and audio should feel like one mood."] },
      { heading: "Keep everything gentle", paragraphs: ["Soft alerts, slow animation, muted palette. Browse the cozy [shop]("+SHOP+") to find your lo-fi world."] },
    ],
    cta: shopCta("Build the perfect lo-fi vibe", "Warm, slow-drift animated overlays made for chill streams. Browse 125+ on Etsy and download instantly."),
    resources: baseResources,
  },
  {
    slug: "choose-stream-emotes-that-fit-your-channel",
    title: "How to Choose Stream Emotes That Fit Your Channel",
    excerpt:
      "Emotes are your community's language. Here's how to pick ones that match your brand and your viewers will actually spam.",
    date: "May 5, 2026",
    isoDate: "2026-05-05",
    readingTime: "5 min read",
    tag: "Guide",
    keywords: ["stream emotes", "Twitch emote ideas", "custom emotes", "emotes that match overlay"],
    heroImage: IMG_CAT,
    body: [
      { paragraphs: ["Great emotes turn passive viewers into a chatty community. The trick is matching them to your channel's character so they feel native."] },
      { heading: "Match the theme", paragraphs: ["A forest cat channel wants cat emotes; a dragon channel wants dragon ones. Every [pack]("+SHOP+") includes emotes styled to its world."] },
      { heading: "Cover the everyday reactions", paragraphs: ["Love, laugh, hype, cozy — the feelings chat uses most. Themed versions of these get spammed the most."] },
      { heading: "Upload at the right sizes", paragraphs: ["Packs include the correct emote sizes so uploading is painless. Grab a set on [Etsy]("+ETSY+")."] },
    ],
    cta: shopCta("Give chat a language", "Themed emotes in every animated pack, sized and ready to upload. Browse 125+ on Etsy."),
    resources: baseResources,
  },
  {
    slug: "animated-vs-static-overlays",
    title: "Animated vs Static Overlays: Which Should You Use?",
    excerpt:
      "Static overlays are simple; animated ones feel alive. Here's how to decide — and how to get both in one pack.",
    date: "May 4, 2026",
    isoDate: "2026-05-04",
    readingTime: "5 min read",
    tag: "Guide",
    keywords: ["animated vs static overlay", "animated stream overlay", "should I use animated overlay", "moving overlay Twitch"],
    heroImage: IMG_DRAGON,
    body: [
      { paragraphs: ["Static overlays load anywhere and never lag; animated ones feel premium and hold attention. The good news: you don't have to choose."] },
      { heading: "When static makes sense", paragraphs: ["Very low-end PCs or simple setups. Every [CozyOverlays pack]("+SHOP+") includes static **.PNG** versions for exactly this."] },
      { heading: "Why animated wins for most", paragraphs: ["Gentle motion reads as 'alive' and keeps viewers watching during quiet moments — without distracting. See the difference on the [shop]("+SHOP+")."] },
      { heading: "Get both in one download", paragraphs: ["Our packs ship animated .WEBM and static .PNG together, so you're covered on any tool or PC. Grab one on [Etsy]("+ETSY+")."] },
    ],
    cta: shopCta("Animated and static, in one pack", "Every pack includes .WEBM and .PNG versions. Browse 125+ on Etsy and download instantly."),
    resources: baseResources,
  },
  {
    slug: "stream-on-a-low-end-pc",
    title: "How to Stream on a Low-End PC (and Still Look Good)",
    excerpt:
      "Modest hardware doesn't mean a bad-looking stream. Here's how to keep things smooth and still look polished.",
    date: "May 3, 2026",
    isoDate: "2026-05-03",
    readingTime: "5 min read",
    tag: "Tutorial",
    keywords: ["stream on low-end PC", "low spec streaming", "stream without lag", "lightweight stream overlay"],
    heroImage: IMG_WOLF,
    body: [
      { paragraphs: ["You can run a clean, good-looking stream on modest hardware — you just have to be smart about what you load."] },
      { heading: "Keep overlays lightweight", paragraphs: ["Use one animated screen, not five. The lightweight .WEBM files in every [pack]("+SHOP+") are far kinder to your CPU than heavy MP4s — and PNG versions are included for the lightest setups."] },
      { heading: "Tune OBS", paragraphs: ["Hardware encoding, a sensible bitrate, and hardware decoding on Media Sources. Our [OBS lag fixes](/blog/why-is-my-obs-overlay-lagging) cover it."] },
      { heading: "Look good without the cost", paragraphs: ["A cohesive theme makes even a simple setup look intentional. Browse the [shop]("+SHOP+") or [Etsy]("+ETSY+")."] },
    ],
    cta: shopCta("Polished, even on modest hardware", "Lightweight animated packs with PNG fallbacks. Browse 125+ on Etsy and download instantly."),
    resources: baseResources,
  },
  {
    slug: "stream-overlay-mistakes-that-make-you-look-new",
    title: "7 Stream Overlay Mistakes That Make You Look New",
    excerpt:
      "Little overlay slip-ups quietly signal 'beginner.' Here are the common ones — and how to fix them fast.",
    date: "May 2, 2026",
    isoDate: "2026-05-02",
    readingTime: "5 min read",
    tag: "Guide",
    keywords: ["stream overlay mistakes", "common Twitch mistakes", "overlay tips", "look professional streaming"],
    heroImage: IMG_GOTHIC,
    body: [
      { paragraphs: ["You can fix most 'this person is new' signals in an afternoon. Here are the overlay mistakes viewers notice most."] },
      { heading: "Mismatched assets", paragraphs: ["A free overlay, random alerts, and stock panels don't go together. One coordinated [pack]("+SHOP+") solves it instantly."] },
      { heading: "Blurry or wrong-sized images", paragraphs: ["Panels and emotes uploaded at the wrong size look amateur. Our packs are pre-sized — see the [dimensions guide](/blog/stream-overlay-dimensions-sizes-guide)."] },
      { heading: "Empty offline page and no BRB screen", paragraphs: ["Blank panels and dead air during breaks read as unfinished. Every [pack]("+SHOP+") fixes both. Grab one on [Etsy]("+ETSY+")."] },
    ],
    cta: shopCta("Fix the 'beginner' look fast", "A coordinated, correctly-sized pack solves the most common mistakes at once. Browse 125+ on Etsy."),
    resources: baseResources,
  },
  {
    slug: "match-your-overlay-to-your-game",
    title: "How to Match Your Overlay to the Games You Play",
    excerpt:
      "Your overlay and your games should feel like they belong together. Here's how to choose a look that complements your content.",
    date: "May 1, 2026",
    isoDate: "2026-05-01",
    readingTime: "5 min read",
    tag: "Guide",
    keywords: ["overlay for cozy games", "match overlay to game", "stream overlay by genre", "cozy game overlay"],
    heroImage: IMG_CAT,
    body: [
      { paragraphs: ["The best setups feel intentional — the overlay's mood matches the kind of games you stream. Here's how to line them up."] },
      { heading: "Cozy and farming games", paragraphs: ["Stardew, Animal Crossing, Palia — pair them with warm, gentle overlays like the [cat]("+CAT+") and [cozy rooms]("+ROOM+") themes for a perfect match."] },
      { heading: "Fantasy and RPGs", paragraphs: ["Sweeping, atmospheric games suit the dragon and Japanese themes — see the bestselling [Dragon Sakura pack](/shop/dragon-sakura-animated-stream-package)."] },
      { heading: "Keep it readable over gameplay", paragraphs: ["Whatever you play, a calm overlay keeps the screen legible. Browse by vibe in the [shop]("+SHOP+")."] },
    ],
    cta: shopCta("Match your vibe to your games", "Cozy, fantasy, lofi and more — find an overlay that fits your content. Browse 125+ on Etsy."),
    resources: baseResources,
  },
  {
    slug: "build-a-stream-brand-kit",
    title: "How to Build a Complete Stream Brand Kit",
    excerpt:
      "A brand kit keeps everything you make consistent. Here's what goes in one — and how to get it without a designer.",
    date: "Apr 30, 2026",
    isoDate: "2026-04-30",
    readingTime: "5 min read",
    tag: "Guide",
    keywords: ["stream brand kit", "Twitch branding kit", "streamer brand assets", "consistent stream branding"],
    heroImage: IMG_DRAGON,
    body: [
      { paragraphs: ["A brand kit is just your reusable look in one place: colors, theme, and a matching set of assets. It keeps everything you post recognizably you."] },
      { heading: "Start with one theme", paragraphs: ["Pick a single world from the [shop]("+SHOP+") and let it define your colors and mood."] },
      { heading: "Gather the matching assets", paragraphs: ["Overlay, alerts, panels, emotes, offline banner — all coordinated. A complete [pack]("+SHOP+") is an instant brand kit."] },
      { heading: "Use it everywhere", paragraphs: ["Stream, socials, thumbnails — same look across the board. Grab your kit on [Etsy]("+ETSY+") and stay consistent."] },
    ],
    cta: shopCta("Your instant brand kit", "A complete animated pack is a brand kit in one download — screens, alerts, panels, emotes. Browse 125+ on Etsy."),
    resources: baseResources,
  },
];
