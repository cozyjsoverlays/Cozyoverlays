import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/seo/JsonLd";
import { ToolLayout } from "@/components/tools/ToolLayout";
import { ToolCTA } from "@/components/tools/ToolCTA";
import { ToolFaq, faqLd, type Faq } from "@/components/tools/ToolFaq";
import { PaletteGenerator } from "@/components/tools/PaletteGenerator";
import { TOOL_CTA } from "@/lib/tools-config";
import { SITE } from "@/data/site";

export const metadata: Metadata = {
  title: "Cozy Color Palette Generator - Cottagecore, Kawaii, Witchy & Lofi",
  description:
    "Free cozy color palette generator for streamers: make harmonious cottagecore, kawaii pastel, witchy and lofi palettes. Lock colors, reshuffle, copy HEX, export PNG or CSS variables.",
  keywords: [
    "cozy color palette",
    "cottagecore color palette",
    "pastel color palette generator",
    "stream color palette",
    "aesthetic color scheme",
  ],
  alternates: { canonical: "/free-tools/palette-generator" },
  openGraph: {
    type: "website",
    title: "Cozy Color Palette Generator (Free) · CozyOverlays",
    description: "Cottagecore, kawaii, witchy and lofi palettes - copy HEX, export PNG or CSS.",
    url: `${SITE.url}/free-tools/palette-generator`,
  },
};

const FAQS: Faq[] = [
  {
    q: "What colors are 'cozy' or cottagecore?",
    a: "Cozy palettes lean on warm, muted, earthy tones - sage greens, cream, soft terracotta and dusty rose for cottagecore; soft pinks, lilacs and mint for kawaii pastel; deep purples, candlelit gold and near-black for witchy; and muted lavender, peach and plum for lofi bedroom vibes.",
  },
  {
    q: "How do I use these colors for my stream?",
    a: "Pick a palette that matches your channel's mood and use it consistently across your overlay, panels, alerts and emotes. Copy the HEX codes or export CSS variables to reuse them in any design tool.",
  },
  {
    q: "Can I lock a color I like and reshuffle the rest?",
    a: "Yes - lock any swatches you want to keep, then hit Reshuffle to generate new options for the unlocked ones until the whole palette feels right.",
  },
];

export default function PaletteGeneratorPage() {
  const appLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Cozy Color Palette Generator",
    applicationCategory: "DesignApplication",
    operatingSystem: "Any (web browser)",
    url: `${SITE.url}/free-tools/palette-generator`,
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    description:
      "Free generator for cozy stream color palettes - cottagecore, kawaii, witchy and lofi - with HEX, PNG and CSS export.",
  };

  return (
    <>
      <JsonLd data={appLd} />
      <JsonLd data={faqLd(FAQS)} />
      <ToolLayout
        eyebrow="Free Tool"
        title={
          <>
            Cozy Color{" "}
            <span className="gradient-text">Palette Generator</span>
          </>
        }
        subtitle="Generate harmonious cozy palettes by vibe - cottagecore, kawaii pastel, witchy and lofi. Lock the colors you love, reshuffle the rest, then copy the HEX or export a swatch."
      >
        <PaletteGenerator />

        <ToolCTA
          heading="Love this palette? We have packs built around it."
          text="Our overlay packs come in cottagecore, kawaii, witchy and lofi aesthetics - a whole matching world in your colors. Browse 125+ and download instantly from Etsy."
          href={TOOL_CTA.shop}
          label="Find your aesthetic"
        />

        <ToolFaq faqs={FAQS} />

        <p className="mt-10 text-sm text-muted">
          More:{" "}
          <Link href="/free-tools" className="font-bold text-lavender hover:text-pink">
            all free tools
          </Link>
        </p>
      </ToolLayout>
    </>
  );
}
