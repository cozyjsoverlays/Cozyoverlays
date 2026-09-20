import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/seo/JsonLd";
import { ToolLayout } from "@/components/tools/ToolLayout";
import { ToolCTA } from "@/components/tools/ToolCTA";
import { ToolFaq, faqLd, type Faq } from "@/components/tools/ToolFaq";
import { EmoteResizer } from "@/components/tools/EmoteResizer";
import { TOOL_CTA } from "@/lib/tools-config";
import { SITE } from "@/data/site";

export const metadata: Metadata = {
  title: "Twitch Emote Resizer - Make 112/56/28px Emotes Free (No Upload)",
  description:
    "Free Twitch emote & badge resizer: drop one image and download every required size (112/56/28, badges 72/36/18, Discord 128, YouTube) as PNGs or a .zip. Runs in your browser - nothing uploaded.",
  keywords: [
    "twitch emote resizer",
    "emote size converter",
    "resize emote 112x112",
    "discord emoji resizer",
    "twitch badge resizer",
  ],
  alternates: { canonical: "/free-tools/emote-resizer" },
  openGraph: {
    type: "website",
    title: "Twitch Emote Resizer (Free) · CozyOverlays",
    description:
      "Drop one image, download every emote/badge size as a tidy .zip. No login, nothing uploaded.",
    url: `${SITE.url}/free-tools/emote-resizer`,
  },
};

const FAQS: Faq[] = [
  {
    q: "What sizes do I need for a Twitch emote?",
    a: "Twitch needs 112×112, 56×56 and 28×28 pixel PNGs with transparent backgrounds. This tool generates all three from a single high-resolution image so you can upload them straight to the dashboard.",
  },
  {
    q: "How big can a Discord emoji be?",
    a: "Discord emojis are 128×128 and must be under 256 KB. This resizer outputs a 128×128 PNG and flags it if the file goes over the limit so you can simplify the art.",
  },
  {
    q: "Are my images uploaded anywhere?",
    a: "No. All resizing happens locally in your browser with the Canvas API. Your image never touches a server, and everything clears when you refresh.",
  },
  {
    q: "What if my image isn't square?",
    a: "The tool centers it on a transparent square and warns you, but emotes look best when you start from a square canvas so nothing gets padded or cut.",
  },
];

export default function EmoteResizerPage() {
  const appLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Twitch Emote & Badge Resizer",
    applicationCategory: "MultimediaApplication",
    operatingSystem: "Any (web browser)",
    url: `${SITE.url}/free-tools/emote-resizer`,
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    description:
      "Free browser tool that resizes one image into every Twitch, Discord and YouTube emote/badge size, downloadable as a .zip.",
  };

  return (
    <>
      <JsonLd data={appLd} />
      <JsonLd data={faqLd(FAQS)} />
      <ToolLayout
        eyebrow="Free Tool"
        title={
          <>
            Emote &amp; Badge{" "}
            <span className="gradient-text">Resizer</span>
          </>
        }
        subtitle="Drop one high-res image and download every required size - Twitch emotes & badges, Discord and YouTube emojis - as PNGs or a single .zip. All done in your browser; your files never leave your device."
      >
        <EmoteResizer />

        <ToolCTA
          heading="Want emotes done for you?"
          text="Every CozyOverlays pack includes emotes and sub badges pre-made at all the correct sizes, themed to match your overlay. Browse 125+ and download instantly from Etsy."
          href={TOOL_CTA.emotes}
          label="Browse our packs"
        />

        <ToolFaq faqs={FAQS} />

        <p className="mt-10 text-sm text-muted">
          Want to preview before you export?{" "}
          <Link href="/free-tools/emote-previewer" className="font-bold text-lavender hover:text-pink">
            Try the Emote Previewer
          </Link>{" "}
          ·{" "}
          <Link href="/free-tools" className="font-bold text-lavender hover:text-pink">
            all free tools
          </Link>
        </p>
      </ToolLayout>
    </>
  );
}
