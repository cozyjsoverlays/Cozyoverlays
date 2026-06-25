import type { BlogPost } from "@/lib/types";

/**
 * Additional SEO articles targeting real problems/questions streamers search.
 * Each one diagnoses a problem, gives a genuine solution, and links to the
 * shop + Etsy as the fix. Kept in a separate file so the library can grow in
 * quality batches. Concatenated into BLOG_POSTS in blog.ts.
 */

const SHOP = "/shop";
const ETSY = "https://cozyjsstudio.etsy.com";
const OBS = "https://obsproject.com/";
const CAT = SHOP + "?category=cat";
const ROOM = SHOP + "?category=room";

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

export const EXTRA_POSTS: BlogPost[] = [
  {
    slug: "why-is-my-obs-overlay-lagging",
    title: "Why Is My OBS Overlay Lagging? 7 Fixes That Actually Work",
    excerpt:
      "Stuttering animated overlays in OBS usually come down to a handful of settings. Here's how to get smooth playback without upgrading your PC.",
    date: "Jun 18, 2026",
    isoDate: "2026-06-18",
    readingTime: "6 min read",
    tag: "Troubleshooting",
    keywords: ["OBS overlay lagging", "animated overlay stuttering", "OBS dropped frames overlay", "smooth webm OBS"],
    heroImage: IMG_WOLF,
    body: [
      { paragraphs: ["A laggy overlay makes a great design look cheap. The good news: 9 times out of 10 it's a settings issue, not your hardware. Run through these fixes in order and your animated screens will play buttery-smooth."] },
      { heading: "1. Turn on hardware decoding", paragraphs: ["Open your Media Source properties in [OBS]("+OBS+") and enable **hardware decoding**. This single toggle fixes most stutter because it offloads video playback to your GPU."] },
      { heading: "2. Use the .WEBM, not a screen-recorded MP4", paragraphs: ["Every [CozyOverlays pack]("+SHOP+") ships proper looping **.WEBM** files with built-in transparency. They're far lighter than re-encoded MP4s, so OBS plays them without breaking a sweat."] },
      { heading: "3. Cap your overlay's footprint", paragraphs: ["Don't stack five full-screen animations on one scene. Use one animated screen plus lighter elements. Our packs are designed so the main overlay carries the motion and the rest stays calm — see the [Wolf Train Lofi pack](/shop/wolf-train-lofi-animated-stream-pack) for that balance."] },
      { heading: "4. Match your canvas and output", paragraphs: ["Run a 1920×1080 canvas and 1080p output. The packs are exported at full HD, so there's no costly rescaling for OBS to do."] },
    ],
    cta: shopCta("Want overlays built to run smooth?", "Our animated packs use lightweight, transparent .WEBM files made to play cleanly even on modest PCs. Browse 125+ and download instantly from Etsy."),
    resources: baseResources,
  },
  {
    slug: "make-your-stream-look-professional-on-a-budget",
    title: "How to Make Your Stream Look Professional on a Budget",
    excerpt:
      "You don't need a designer or expensive software to look pro. Here's the cheapest path to a polished, cohesive stream.",
    date: "Jun 17, 2026",
    isoDate: "2026-06-17",
    readingTime: "6 min read",
    tag: "Guide",
    keywords: ["professional stream on a budget", "cheap stream overlay", "make stream look professional", "affordable Twitch overlay"],
    heroImage: IMG_CAT,
    body: [
      { paragraphs: ["'Professional' really means 'consistent.' A viewer reads a channel as pro when the overlay, alerts, panels, and emotes all share one look. The fastest, cheapest way to get there is a ready-made pack — far less than hiring a designer."] },
      { heading: "Buy one coordinated pack instead of free bits", paragraphs: ["Free assets from five sources clash. A single [animated overlay pack]("+SHOP+") gives you a matching set for the price of a couple of coffees, and it's yours forever."] },
      { heading: "Fix audio before graphics", paragraphs: ["A noise-suppression filter in [OBS]("+OBS+") and a basic USB mic do more for retention than any visual upgrade. Do this first."] },
      { heading: "Fill out your offline page", paragraphs: ["Matching [panels]("+SHOP+") (about, schedule, socials) make a brand-new channel look established. It's the highest-impact 10 minutes you'll spend."] },
    ],
    cta: shopCta("Look pro for the price of a coffee", "Coordinated animated overlay packs — screens, alerts, panels and emotes that match. Instant download on Etsy."),
    resources: baseResources,
  },
  {
    slug: "best-stream-overlays-for-small-streamers",
    title: "Best Stream Overlays for Small Streamers in 2026",
    excerpt:
      "Growing a small channel? The right overlay makes you look established and keeps new viewers in the room. Here's what to look for.",
    date: "Jun 16, 2026",
    isoDate: "2026-06-16",
    readingTime: "6 min read",
    tag: "Guide",
    keywords: ["best overlays for small streamers", "stream overlay for new streamers", "Twitch overlay 2026", "affiliate streamer overlay"],
    heroImage: IMG_DRAGON,
    body: [
      { paragraphs: ["When you're small, every first impression counts. A warm, cohesive overlay tells a brand-new viewer 'this person is serious' before you say a word — and welcoming visuals keep them watching longer."] },
      { heading: "Pick a memorable motif", paragraphs: ["A single recurring character or theme makes you recognizable on a crowded directory. Browse by vibe — [cats]("+CAT+"), dragons, [cozy rooms]("+ROOM+") — and commit to one world."] },
      { heading: "Cozy beats flashy for retention", paragraphs: ["Warm, gentle overlays read as inviting; harsh RGB reads as noisy. The whole [CozyOverlays shop]("+SHOP+") leans into the comfort aesthetic that keeps chill viewers around."] },
      { heading: "Get the full set, not just a banner", paragraphs: ["Screens, alerts, panels and emotes from one pack means consistency everywhere. Grab a complete set on [Etsy]("+ETSY+") and you're done in an afternoon."] },
    ],
    cta: shopCta("Punch above your size", "A cohesive cozy overlay makes a small channel look established. Find your theme and download instantly from Etsy."),
    resources: baseResources,
  },
  {
    slug: "twitch-panels-not-showing-fix",
    title: "Twitch Panels Not Showing? Here's How to Fix It",
    excerpt:
      "Uploaded your panels but they're not appearing? Run through these quick checks to get a tidy, branded offline page.",
    date: "Jun 15, 2026",
    isoDate: "2026-06-15",
    readingTime: "5 min read",
    tag: "Troubleshooting",
    keywords: ["Twitch panels not showing", "how to add Twitch panels", "Twitch panel size", "stream profile panels"],
    heroImage: IMG_GOTHIC,
    body: [
      { paragraphs: ["Panels are your channel's storefront, so it's worth getting them right. If yours aren't showing, it's almost always one of these."] },
      { heading: "Turn on 'Edit Panels'", paragraphs: ["On your channel's About page, toggle **Edit Panels** on, then 'Add a panel' for each image. Panels only appear once added here — uploading the file isn't enough."] },
      { heading: "Use the right width", paragraphs: ["Twitch panels display at 320px wide. The panels in every [CozyOverlays pack]("+SHOP+") are already sized correctly, so they look crisp instead of blurry or cropped."] },
      { heading: "Add a link to each panel", paragraphs: ["Point panels at your schedule, socials, or [shop]("+SHOP+") so visitors have somewhere to go. A complete, linked panel row makes a channel feel intentional."] },
    ],
    cta: shopCta("Want panels that just work?", "Every pack includes correctly-sized, matching profile panels — plus screens, alerts and emotes. Instant download on Etsy."),
    resources: baseResources,
  },
  {
    slug: "stream-overlay-dimensions-sizes-guide",
    title: "Stream Overlay Dimensions & Sizes: The Complete Guide",
    excerpt:
      "Overlays, panels, alerts and emotes all have ideal sizes. Here's the cheat sheet so nothing ends up blurry or cropped.",
    date: "Jun 14, 2026",
    isoDate: "2026-06-14",
    readingTime: "5 min read",
    tag: "Reference",
    keywords: ["stream overlay size", "Twitch overlay dimensions", "Twitch panel size", "emote sizes Twitch", "1920x1080 overlay"],
    heroImage: IMG_CAT,
    body: [
      { paragraphs: ["Sizing trips up a lot of new streamers. Here are the numbers that matter — and the easy way to skip the math entirely."] },
      { heading: "Overlays & full-screen scenes", paragraphs: ["Design for a **1920×1080** canvas. Every [CozyOverlays pack]("+SHOP+") is exported at full HD so it snaps to a 1080p scene in [OBS]("+OBS+") without going soft."] },
      { heading: "Panels and emotes", paragraphs: ["Panels display at **320px** wide; Twitch emotes upload at **112×112** (with 56 and 28 versions). Our packs include each asset at the correct size, so uploading is painless."] },
      { heading: "The shortcut", paragraphs: ["Buy a coordinated pack and the sizing is solved for you across screens, panels, alerts and emotes. Browse the [full library]("+SHOP+") or [shop on Etsy]("+ETSY+")."] },
    ],
    cta: shopCta("Skip the sizing headaches", "Pre-sized screens, panels, alerts and emotes in one pack. Browse 125+ and download instantly."),
    resources: baseResources,
  },
  {
    slug: "how-to-brand-your-twitch-channel",
    title: "How to Brand Your Twitch Channel (Without a Designer)",
    excerpt:
      "Branding is just consistency. Here's how to give your channel one recognizable look across every screen and platform.",
    date: "Jun 13, 2026",
    isoDate: "2026-06-13",
    readingTime: "6 min read",
    tag: "Guide",
    keywords: ["how to brand Twitch channel", "Twitch branding", "consistent stream look", "channel theme ideas"],
    heroImage: IMG_DRAGON,
    body: [
      { paragraphs: ["A brand isn't a logo — it's a feeling people recognize instantly. The simplest way to build one is to commit to a single theme and repeat it everywhere."] },
      { heading: "Choose one world", paragraphs: ["A cozy cat forest, a dragon-and-blossom fantasy, a lofi room. Pick a motif from the [shop]("+SHOP+") that feels like you and let it lead every decision."] },
      { heading: "Repeat it across every surface", paragraphs: ["Overlay, alerts, panels, emotes, offline banner — all one look. A single [animated pack]("+SHOP+") gives you that coherence out of the box."] },
      { heading: "Carry it to YouTube, Kick and TikTok", paragraphs: ["Use the same theme on every platform so people know it's you. The packs work everywhere — see our [TikTok Live guide](/blog/use-stream-overlays-on-tiktok-live)."] },
    ],
    cta: shopCta("Build a brand in one afternoon", "One cohesive theme across screens, alerts, panels and emotes. Find your world and download instantly from Etsy."),
    resources: baseResources,
  },
  {
    slug: "obs-overlay-transparency-not-working",
    title: "OBS Overlay Transparency Not Working? Do This",
    excerpt:
      "If your overlay shows up with an ugly black box behind it, you're using the wrong file type. Here's the fix.",
    date: "Jun 12, 2026",
    isoDate: "2026-06-12",
    readingTime: "4 min read",
    tag: "Troubleshooting",
    keywords: ["OBS overlay transparency", "overlay black background OBS", "transparent webm overlay", "animated overlay no transparency"],
    heroImage: IMG_WOLF,
    body: [
      { paragraphs: ["A black rectangle behind your animated overlay almost always means the file doesn't carry an alpha channel. Here's how to get true transparency."] },
      { heading: "Use a .WEBM with alpha", paragraphs: ["MP4 and GIF handle transparency poorly. Animated **.WEBM** files do it right — and every [CozyOverlays pack]("+SHOP+") ships them, so the transparency just works in [OBS]("+OBS+")."] },
      { heading: "Add it as a Media Source", paragraphs: ["Load the .WEBM as a **Media Source** with Loop enabled. It'll layer cleanly over your camera and game capture, no green screen needed."] },
      { heading: "Still stuck on a PNG-only tool?", paragraphs: ["Packs also include static **.PNG** versions for tools that don't support video — so you're covered either way. Browse the [shop]("+SHOP+")."] },
    ],
    cta: shopCta("Overlays with real transparency", "Animated .WEBM files with built-in alpha, plus PNG fallbacks. Browse 125+ packs on Etsy."),
    resources: baseResources,
  },
  {
    slug: "how-much-do-stream-overlays-cost",
    title: "How Much Should You Spend on a Stream Overlay?",
    excerpt:
      "Overlays range from free to hundreds of dollars. Here's what you actually need to pay for a great one — and what you don't.",
    date: "Jun 11, 2026",
    isoDate: "2026-06-11",
    readingTime: "5 min read",
    tag: "Guide",
    keywords: ["how much do stream overlays cost", "stream overlay price", "cheap animated overlay", "custom overlay cost"],
    heroImage: IMG_CAT,
    body: [
      { paragraphs: ["Custom overlay commissions can run $100–$500+. The truth: most streamers don't need a custom job — a high-quality ready-made pack looks just as polished for a fraction of the price."] },
      { heading: "What you're paying for", paragraphs: ["A good pack bundles animated screens, matching alerts, panels and emotes — all coordinated. Buying those separately costs more and rarely matches. A single [pack]("+SHOP+") solves it cheaply."] },
      { heading: "When custom is worth it", paragraphs: ["Only if you need a totally bespoke character or brand. Otherwise, a themed pack from the [shop]("+SHOP+") gives you 95% of the result for a tiny slice of the cost."] },
      { heading: "The sweet spot", paragraphs: ["A complete animated pack on [Etsy]("+ETSY+") is the best value in streaming — premium look, instant download, yours forever."] },
    ],
    cta: shopCta("Premium look, tiny price", "Complete animated overlay packs for the cost of a coffee or two. Browse and download instantly from Etsy."),
    resources: baseResources,
  },
  {
    slug: "free-vs-paid-stream-overlays",
    title: "Free vs Paid Stream Overlays: Which Is Right for You?",
    excerpt:
      "Free overlays are tempting, but they come with trade-offs. Here's an honest comparison to help you decide.",
    date: "Jun 9, 2026",
    isoDate: "2026-06-09",
    readingTime: "5 min read",
    tag: "Guide",
    keywords: ["free vs paid stream overlay", "free Twitch overlay", "are paid overlays worth it", "best overlay value"],
    heroImage: IMG_DRAGON,
    body: [
      { paragraphs: ["Free overlays can get you live — but thousands of other channels use the exact same ones, and they're rarely a coordinated set. Here's how to choose."] },
      { heading: "The cost of 'free'", paragraphs: ["Free packs mean you look like everyone else, with mismatched alerts and panels. For a brand, that sameness is the real price."] },
      { heading: "What paid gets you", paragraphs: ["A unique, cohesive world — animated screens, matching alerts, panels and emotes — that makes your channel recognizable. Browse the [shop]("+SHOP+") to see the difference."] },
      { heading: "You don't have to spend much", paragraphs: ["Paid doesn't mean expensive. A complete [animated pack on Etsy]("+ETSY+") costs less than a takeout meal and lasts forever."] },
    ],
    cta: shopCta("Stand out, not blend in", "A unique cozy overlay for the price of lunch. Browse 125+ packs and download instantly from Etsy."),
    resources: baseResources,
  },
  {
    slug: "cozy-stream-setup-ideas",
    title: "Cozy Stream Setup Ideas for Chill Creators",
    excerpt:
      "Building a warm, comfy channel? Here are overlay, lighting and vibe ideas to make your stream feel like home.",
    date: "Jun 7, 2026",
    isoDate: "2026-06-07",
    readingTime: "6 min read",
    tag: "Inspiration",
    keywords: ["cozy stream setup", "chill stream aesthetic", "lofi stream overlay", "comfy Twitch setup ideas"],
    heroImage: IMG_WOLF,
    body: [
      { paragraphs: ["Cozy streams are having a moment — and for good reason. A warm, low-key vibe keeps viewers around for hours. Here's how to build one."] },
      { heading: "Start with a warm overlay", paragraphs: ["Soft light, gentle motion, muted palette. The [cozy rooms]("+ROOM+") and [cat]("+CAT+") collections are built for exactly this feeling."] },
      { heading: "Add ambient details", paragraphs: ["Lofi music, warm lamp lighting in your camera shot, and an overlay with drifting particles complete the mood. Pair it with the [Wolf Train Lofi pack](/shop/wolf-train-lofi-animated-stream-pack) for a sunset-train vibe."] },
      { heading: "Keep alerts gentle", paragraphs: ["Loud alerts break the calm. Themed, soft alerts from a cozy [pack]("+SHOP+") keep the whole experience consistent."] },
    ],
    cta: shopCta("Make your stream feel like home", "Warm, cozy animated overlay packs — cats, lofi rooms, cottagecore and more. Browse and download from Etsy."),
    resources: baseResources,
  },
  {
    slug: "twitch-alerts-that-match-your-overlay",
    title: "How to Set Up Twitch Alerts That Match Your Overlay",
    excerpt:
      "Mismatched alerts ruin an otherwise great look. Here's how to get follow, sub and donation alerts that fit your theme.",
    date: "Jun 5, 2026",
    isoDate: "2026-06-05",
    readingTime: "5 min read",
    tag: "Tutorial",
    keywords: ["Twitch alerts setup", "custom stream alerts", "alerts that match overlay", "StreamElements alert overlay"],
    heroImage: IMG_CAT,
    body: [
      { paragraphs: ["Alerts are little celebrations — but generic stock alerts on a themed overlay feel off. Matching them is easy."] },
      { heading: "Use themed alerts from your pack", paragraphs: ["Every [CozyOverlays pack]("+SHOP+") includes follow, sub and donation alerts styled to the same world as your screens, so everything feels intentional."] },
      { heading: "Add them as a browser/media source", paragraphs: ["Drop the alert files into your alert tool (StreamElements, Streamlabs) or layer them in [OBS]("+OBS+"). Our [OBS setup guide](/blog/set-up-stream-overlay-obs-5-minutes) covers the basics."] },
      { heading: "Keep volume and motion in check", paragraphs: ["Subtle beats loud. Gentle alerts keep your cozy vibe intact while still giving chat a dopamine hit."] },
    ],
    cta: shopCta("Alerts that match — out of the box", "Themed follow, sub and donation alerts in every pack. Browse 125+ on Etsy and download instantly."),
    resources: baseResources,
  },
  {
    slug: "best-overlays-for-just-chatting",
    title: "Best Overlays for Just Chatting Streams",
    excerpt:
      "Just Chatting lives and dies on vibe. Here's how to pick an overlay that makes your camera-and-chat setup feel cozy and pro.",
    date: "Jun 3, 2026",
    isoDate: "2026-06-03",
    readingTime: "5 min read",
    tag: "Guide",
    keywords: ["best Just Chatting overlay", "IRL stream overlay", "camera overlay Twitch", "cozy just chatting setup"],
    heroImage: IMG_GOTHIC,
    body: [
      { paragraphs: ["Just Chatting puts your overlay center stage — there's no game to hide behind. That makes the right design matter even more."] },
      { heading: "Lean into atmosphere", paragraphs: ["With no gameplay competing for attention, you can afford a richer, more atmospheric scene. Browse the [cozy rooms]("+ROOM+") and [cat]("+CAT+") collections for full-room vibes."] },
      { heading: "Frame your camera", paragraphs: ["A themed webcam frame and matching panels turn a plain face-cam into a set. Every [pack]("+SHOP+") gives you coordinated pieces to build that."] },
      { heading: "Match the energy to your content", paragraphs: ["Chill chat? Go warm and gentle. The whole [shop]("+SHOP+") is built around that comfortable, welcoming feeling."] },
    ],
    cta: shopCta("Set the scene for Just Chatting", "Atmospheric, cozy overlays that shine when your camera is the star. Browse and download from Etsy."),
    resources: baseResources,
  },
  {
    slug: "make-your-stream-stand-out",
    title: "How to Make Your Stream Stand Out in a Crowded Directory",
    excerpt:
      "Hundreds of channels, one thumbnail each. Here's how a distinctive overlay helps new viewers pick you.",
    date: "Jun 1, 2026",
    isoDate: "2026-06-01",
    readingTime: "5 min read",
    tag: "Guide",
    keywords: ["stand out on Twitch", "Twitch directory thumbnail", "get noticed streaming", "distinctive stream overlay"],
    heroImage: IMG_DRAGON,
    body: [
      { paragraphs: ["On a busy directory page, viewers scan thumbnails in a fraction of a second. A distinctive, well-themed overlay is one of the few things that makes someone stop and click."] },
      { heading: "Pick a look nobody else has", paragraphs: ["Generic free overlays blend in. A characterful theme from the [shop]("+SHOP+") — a dragon under blossoms, a forest cat — reads instantly even at thumbnail size."] },
      { heading: "Keep it readable small", paragraphs: ["Busy designs turn to mush in a tiny preview. Our cozy, clean style stays legible — see the bestselling [Dragon Sakura pack](/shop/dragon-sakura-animated-stream-package)."] },
      { heading: "Be consistent so people remember you", paragraphs: ["The same theme every stream builds recognition. Grab a complete set on [Etsy]("+ETSY+") and stick with it."] },
    ],
    cta: shopCta("Be the thumbnail people click", "Distinctive, cozy animated overlays that pop in a crowded directory. Browse 125+ on Etsy."),
    resources: baseResources,
  },
  {
    slug: "stream-overlay-ideas-for-vtubers",
    title: "Stream Overlay Ideas for VTubers",
    excerpt:
      "Your model is the star — your overlay should frame it, not fight it. Here's how to pick a VTuber-friendly look.",
    date: "May 30, 2026",
    isoDate: "2026-05-30",
    readingTime: "5 min read",
    tag: "Guide",
    keywords: ["VTuber overlay", "VTuber stream setup", "overlay for VTuber model", "cute VTuber overlay"],
    heroImage: IMG_CAT,
    body: [
      { paragraphs: ["VTubing is all about your model's personality. The overlay's job is to support it with a complementary world — not to compete for attention."] },
      { heading: "Match the overlay to your model's vibe", paragraphs: ["A soft, kawaii model pairs beautifully with the [cat]("+CAT+") and cozy-room themes; a fantasy model with dragons and sakura. Browse by mood in the [shop]("+SHOP+")."] },
      { heading: "Keep motion gentle", paragraphs: ["Busy animation distracts from your model's expressions. Our slow-drift style keeps the focus where it belongs."] },
      { heading: "Use matching emotes for chat", paragraphs: ["Themed emotes extend your character into chat. Every [pack]("+SHOP+") includes them, sized and ready to upload."] },
    ],
    cta: shopCta("Frame your model, don't fight it", "Cozy, gentle overlays that complement any VTuber model. Browse 125+ packs and download from Etsy."),
    resources: baseResources,
  },
  {
    slug: "how-to-add-panels-to-twitch",
    title: "How to Add Profile Panels to Your Twitch Channel",
    excerpt:
      "Panels are the easiest way to make your channel look established. Here's the step-by-step.",
    date: "May 27, 2026",
    isoDate: "2026-05-27",
    readingTime: "4 min read",
    tag: "Tutorial",
    keywords: ["how to add Twitch panels", "Twitch profile panels", "stream panel setup", "Twitch about page"],
    heroImage: IMG_WOLF,
    body: [
      { paragraphs: ["Panels live under your stream on the About page. They're where viewers learn who you are, when you go live, and where to follow you. Here's how to set them up."] },
      { heading: "Toggle Edit Panels and add each one", paragraphs: ["On your About page, switch **Edit Panels** on and click 'Add a panel' for every image (About, Schedule, Socials, Donate)."] },
      { heading: "Use correctly-sized, matching images", paragraphs: ["Panels show at 320px wide. The panels in every [CozyOverlays pack]("+SHOP+") are pre-sized and themed to your overlay so your page looks coordinated."] },
      { heading: "Link them somewhere useful", paragraphs: ["Point panels at your socials, schedule, or [shop]("+SHOP+"). A linked, tidy panel row signals you're serious."] },
    ],
    cta: shopCta("Get matching panels in seconds", "Pre-sized, themed panels come in every pack — with screens, alerts and emotes too. Download instantly from Etsy."),
    resources: baseResources,
  },
  {
    slug: "best-aesthetic-stream-overlays",
    title: "Best Aesthetic Stream Overlays: Cottagecore, Kawaii & Gothic",
    excerpt:
      "Aesthetic streaming is booming. Here's a tour of the cozy aesthetics that are winning viewers — and where to get the look.",
    date: "May 25, 2026",
    isoDate: "2026-05-25",
    readingTime: "6 min read",
    tag: "Inspiration",
    keywords: ["aesthetic stream overlay", "cottagecore overlay", "kawaii Twitch overlay", "gothic stream overlay"],
    heroImage: IMG_GOTHIC,
    body: [
      { paragraphs: ["'Aesthetic' channels — cottagecore, kawaii, witchy — are some of the fastest-growing on Twitch. The overlay is the heart of the look. Here's a quick tour."] },
      { heading: "Cottagecore & cozy", paragraphs: ["Warm light, forests, soft animals. The [cat]("+CAT+") and [cozy rooms]("+ROOM+") collections nail this gentle, homey feeling."] },
      { heading: "Kawaii & pastel", paragraphs: ["Soft pinks, blossoms, cute characters. Themes like Sakura Panda and Sakura Cat live in the [shop]("+SHOP+")."] },
      { heading: "Witchy & gothic", paragraphs: ["Candlelight, moody purples, a little mystery — perfect for late-night streams. See the [witchy collection]("+SHOP+"?category=witchy) and the gothic [Midnight Cozy Cat]("+SHOP+"?category=cat)."] },
    ],
    cta: shopCta("Find your aesthetic", "Cottagecore, kawaii, witchy, lofi and more — 125+ animated overlay packs. Browse and download from Etsy."),
    resources: baseResources,
  },
  {
    slug: "refresh-your-stream-look",
    title: "How to Refresh Your Stream Look Without Starting Over",
    excerpt:
      "Channel feeling stale? You don't need a full rebrand. A new overlay pack is the fastest way to feel new again.",
    date: "May 23, 2026",
    isoDate: "2026-05-23",
    readingTime: "4 min read",
    tag: "Guide",
    keywords: ["refresh stream look", "rebrand Twitch channel", "new stream overlay", "update stream design"],
    heroImage: IMG_DRAGON,
    body: [
      { paragraphs: ["Every streamer hits a point where their setup feels tired. The good news: swapping your overlay is a 30-minute refresh that feels like a whole new channel."] },
      { heading: "Pick a new world", paragraphs: ["Choose a fresh theme from the [shop]("+SHOP+") — maybe a seasonal or witchy look to mark the change."] },
      { heading: "Swap the files in OBS", paragraphs: ["Replace your screens, alerts and panels with the new pack. Our [OBS guide](/blog/set-up-stream-overlay-obs-5-minutes) makes it quick."] },
      { heading: "Announce the new look", paragraphs: ["Tease the refresh to your community — a visible upgrade is great content. Grab the new pack on [Etsy]("+ETSY+") and go."] },
    ],
    cta: shopCta("Feel new in 30 minutes", "A fresh animated overlay pack is the fastest channel glow-up. Browse 125+ and download instantly from Etsy."),
    resources: baseResources,
  },
  {
    slug: "stream-overlays-for-youtube-and-kick",
    title: "Stream Overlays for YouTube and Kick (Not Just Twitch)",
    excerpt:
      "Streaming beyond Twitch? Your overlay works everywhere. Here's how to use one cohesive look across every platform.",
    date: "May 21, 2026",
    isoDate: "2026-05-21",
    readingTime: "5 min read",
    tag: "Tutorial",
    keywords: ["YouTube stream overlay", "Kick overlay", "multistream overlay", "overlay for YouTube live"],
    heroImage: IMG_CAT,
    body: [
      { paragraphs: ["Overlays aren't Twitch-only. Because they're just animated layers in [OBS]("+OBS+"), the same pack works on YouTube Live, Kick, and even TikTok Live."] },
      { heading: "One pack, every platform", paragraphs: ["Set up your scene once in OBS and stream it anywhere. Every [CozyOverlays pack]("+SHOP+") is platform-agnostic — screens, alerts and panels all carry over."] },
      { heading: "Keep your brand consistent", paragraphs: ["Use the same theme on every platform so your audience recognizes you instantly. Browse the [shop]("+SHOP+") and pick one world."] },
      { heading: "Multistreaming", paragraphs: ["Going live on several platforms at once? One overlay keeps everything unified. Grab a complete set on [Etsy]("+ETSY+")."] },
    ],
    cta: shopCta("One look, every platform", "Animated overlay packs that work on Twitch, YouTube, Kick and TikTok. Browse 125+ and download from Etsy."),
    resources: baseResources,
  },
  {
    slug: "what-to-include-in-a-stream-overlay-pack",
    title: "What to Include in a Complete Stream Overlay Pack",
    excerpt:
      "Not sure what a 'full' overlay pack should contain? Here's the checklist — and how to get all of it in one download.",
    date: "May 19, 2026",
    isoDate: "2026-05-19",
    readingTime: "5 min read",
    tag: "Guide",
    keywords: ["what's in a stream overlay pack", "complete overlay pack", "stream overlay bundle", "overlay pack checklist"],
    heroImage: IMG_WOLF,
    body: [
      { paragraphs: ["A real overlay pack is more than a single background. Here's everything a complete set should include so your whole channel matches."] },
      { heading: "Animated screens", paragraphs: ["Starting Soon, BRB, Ending, and a main in-stream overlay — all looping and transparent. Every [CozyOverlays pack]("+SHOP+") includes the full set."] },
      { heading: "Alerts, panels & emotes", paragraphs: ["Themed follow/sub/donation alerts, correctly-sized profile panels, and chat emotes round out the look. That coordination is what makes a channel feel pro."] },
      { heading: "Both .WEBM and .PNG", paragraphs: ["Animated files for video-capable tools and static versions for everything else. Browse the [shop]("+SHOP+") or [Etsy]("+ETSY+") and you'll see it all listed per pack."] },
    ],
    cta: shopCta("Everything your channel needs", "Screens, alerts, panels and emotes in one coordinated download. Browse 125+ packs on Etsy."),
    resources: baseResources,
  },
];
