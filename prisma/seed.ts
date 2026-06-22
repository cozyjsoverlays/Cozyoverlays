import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

type SeedProduct = {
  slug: string;
  name: string;
  category: string;
  priceCents: number;
  description: string;
  image: string;
  video?: string;
  features: string[];
  bestseller?: boolean;
};

const PRODUCTS: SeedProduct[] = [
  {
    slug: "cat-forest",
    name: "Cat Forest Animated Stream Package",
    category: "cat",
    priceCents: 2400,
    description:
      "Dreamy glowing forest cats, soft light, magical woodland atmosphere.",
    image:
      "https://i.etsystatic.com/61635066/r/il/316113/7805031188/il_794xN.7805031188_mn58.jpg",
    video:
      "https://v.etsystatic.com/video/upload/ac_none,du_15,q_auto:good/rdr4j94wjoeummxxprj3.mp4",
    features: ["Animated Screens", "Alerts", "Panels", "Emotes"],
  },
  {
    slug: "dragon-sakura",
    name: "Dragon Sakura Animated Stream Package",
    category: "dragon",
    priceCents: 2539,
    description:
      "Majestic lofi dragon amid cherry blossoms — fantasy at its finest.",
    image:
      "https://i.etsystatic.com/61635066/r/il/be4ff6/7769904430/il_794xN.7769904430_keij.jpg",
    video:
      "https://v.etsystatic.com/video/upload/ac_none,du_15,q_auto:good/zr0vvvwensivtpsaie0i.mp4",
    features: ["Animated Screens", "Alerts", "Panels", "Emotes", "Sub Badges"],
    bestseller: true,
  },
  {
    slug: "sakura-panda",
    name: "Sakura Panda Animated Stream Package",
    category: "bear",
    priceCents: 2400,
    description:
      "Soft pink blossom world with a gentle panda — pure kawaii energy.",
    image:
      "https://i.etsystatic.com/61635066/r/il/52ef5f/7803817421/il_794xN.7803817421_5b3q.jpg",
    video:
      "https://v.etsystatic.com/video/upload/ac_none,du_15,q_auto:good/wpuzrfa9bomqur4qrhlw.mp4",
    features: ["Animated Screens", "Alerts", "Panels", "Emotes"],
  },
  {
    slug: "fox-forest",
    name: "Fox Forest Magic Animated Package",
    category: "fox",
    priceCents: 2400,
    description:
      "A magical lofi fox in a glowing woodland — warm and enchanting.",
    image:
      "https://i.etsystatic.com/61635066/r/il/5fc1ac/7822491494/il_794xN.7822491494_cm0u.jpg",
    features: ["Animated Screens", "Alerts", "Panels"],
  },
  {
    slug: "frog-forest",
    name: "Frog Forest Magic Animated Package",
    category: "frog",
    priceCents: 2300,
    description:
      "A cheerful frog in a lush magical forest — unique and charming.",
    image:
      "https://i.etsystatic.com/61635066/r/il/f1e940/7907499425/il_794xN.7907499425_l3np.jpg",
    features: ["Animated Screens", "Alerts", "Emotes"],
  },
  {
    slug: "moonlit-samurai",
    name: "Moonlit Samurai Animated Package",
    category: "japanese",
    priceCents: 2400,
    description:
      "A cinematic Japanese samurai night scene — bold, dramatic, timeless.",
    image:
      "https://i.etsystatic.com/61635066/r/il/15bcaa/7553109646/il_794xN.7553109646_i5lk.jpg",
    features: ["Animated Screens", "Alerts", "Panels", "Sub Badges"],
  },
  {
    slug: "matcha-dragon",
    name: "Matcha Dragon Animated Package",
    category: "dragon",
    priceCents: 2400,
    description:
      "Soft green matcha vibes with a cute dragon — cozy meets fantasy.",
    image:
      "https://i.etsystatic.com/61635066/r/il/283dce/7971118785/il_794xN.7971118785_iw6c.jpg",
    features: ["Animated Screens", "Alerts", "Panels", "Emotes"],
  },
  {
    slug: "sakura-cat",
    name: "Sakura Cat Animated Stream Package",
    category: "cat",
    priceCents: 2400,
    description:
      "Cherry blossom themed cat overlay — romantic, soft, and cozy.",
    image:
      "https://i.etsystatic.com/61635066/r/il/893484/7609041778/il_794xN.7609041778_oo5u.jpg",
    features: ["Animated Screens", "Alerts", "Panels"],
  },
  {
    slug: "wolf-train-lofi",
    name: "Wolf Train Lofi Animated Pack",
    category: "japanese",
    priceCents: 2400,
    description: "Sunset coffee train lofi wolf — cozy, warm, cinematic vibes.",
    image:
      "https://i.etsystatic.com/61635066/r/il/f04082/8010234087/il_794xN.8010234087_3v2u.jpg",
    features: ["Animated Screens", "Alerts", "Panels", "Emotes"],
  },
  {
    slug: "otter-forest",
    name: "Otter Forest Magic Animated Package",
    category: "frog",
    priceCents: 2400,
    description:
      "Adorable otter in a magical forest — playful and full of charm.",
    image:
      "https://i.etsystatic.com/61635066/r/il/b58b2c/7863397025/il_794xN.7863397025_b0kv.jpg",
    features: ["Animated Screens", "Alerts", "Emotes"],
  },
  {
    slug: "dream-sakura",
    name: "Dream Sakura Animated Stream Package",
    category: "japanese",
    priceCents: 2400,
    description:
      "Iconic falling sakura petals, warm pink tones — beautiful Japanese theme.",
    image:
      "https://i.etsystatic.com/61635066/r/il/9c4fac/7563052034/il_794xN.7563052034_p6la.jpg",
    features: ["Animated Screens", "Alerts", "Panels", "Sub Badges"],
  },
  {
    slug: "midnight-cozy-cat",
    name: "Midnight Cozy Cat Animated Pack",
    category: "cat",
    priceCents: 2400,
    description:
      "Gothic dark cat aesthetic — moody, mysterious, and totally cozy.",
    image:
      "https://i.etsystatic.com/61635066/r/il/f3bb2b/7580540193/il_794xN.7580540193_qr8u.jpg",
    features: ["Animated Screens", "Alerts", "Panels", "Emotes"],
  },
];

const REVIEWS = [
  {
    name: "Theresa",
    date: "Jun 4, 2026",
    stars: 5,
    quote:
      "Absolutely adorable and comes with literally everything you need to get started.",
    pack: "Dragon Sakura Package",
  },
  {
    name: "Obvskur",
    date: "May 31, 2026",
    stars: 5,
    quote:
      "It is very cute! I have 2 cats, one black and one white and it fits perfectly!",
    pack: "Cat Forest Package",
  },
  {
    name: "Courtney",
    date: "Jun 5, 2026",
    stars: 5,
    quote: "Got this for the panels and they are stunning!",
    pack: "Starry Forest Bear Package",
  },
  {
    name: "Stephen",
    date: "May 28, 2026",
    stars: 5,
    quote: "Absolutely perfect. Just what I needed.",
    pack: "Red Panda Sakura Package",
  },
  {
    name: "Kerry",
    date: "May 24, 2026",
    stars: 5,
    quote: "Just what I wanted 😁",
    pack: "Otter Forest Magic Package",
  },
  {
    name: "Danny",
    date: "May 22, 2026",
    stars: 5,
    quote:
      "Love it and I like dragons — it was such a fun theme, perfect for my stream!",
    pack: "Dragon Sakura Package",
  },
  {
    name: "Tonton",
    date: "Jun 2, 2026",
    stars: 5,
    quote:
      "A very cool and good quality Twitch Overlay. Thank you for the great work!",
    pack: "Lofi Sunset Panda Package",
  },
  {
    name: "Mrs.",
    date: "Jun 8, 2026",
    stars: 5,
    quote: "Thank you very much :)",
    pack: "Cat Forest Package",
  },
];

async function main() {
  console.log("🌱 Seeding products…");
  for (let i = 0; i < PRODUCTS.length; i++) {
    const p = PRODUCTS[i];
    await prisma.product.upsert({
      where: { slug: p.slug },
      update: {
        name: p.name,
        category: p.category,
        description: p.description,
        priceCents: p.priceCents,
        image: p.image,
        video: p.video ?? null,
        features: JSON.stringify(p.features),
        fileKey: `packs/${p.slug}.zip`,
        bestseller: p.bestseller ?? false,
        active: true,
        source: "manual",
        needsFile: false,
        sortOrder: i,
      },
      create: {
        slug: p.slug,
        name: p.name,
        category: p.category,
        description: p.description,
        priceCents: p.priceCents,
        currency: "USD",
        image: p.image,
        video: p.video ?? null,
        features: JSON.stringify(p.features),
        fileKey: `packs/${p.slug}.zip`,
        bestseller: p.bestseller ?? false,
        source: "manual",
        needsFile: false,
        sortOrder: i,
      },
    });
  }
  console.log(`   ${PRODUCTS.length} products upserted.`);

  console.log("🌱 Seeding reviews…");
  await prisma.review.deleteMany();
  await prisma.review.createMany({
    data: REVIEWS.map((r, i) => ({ ...r, sortOrder: i })),
  });
  console.log(`   ${REVIEWS.length} reviews created.`);

  console.log("✅ Seed complete.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
