import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/seo/JsonLd";
import { ToolLayout } from "@/components/tools/ToolLayout";
import { ToolCTA } from "@/components/tools/ToolCTA";
import { ToolFaq, faqLd, type Faq } from "@/components/tools/ToolFaq";
import { BriefGenerator } from "@/components/tools/BriefGenerator";
import { TOOL_CTA } from "@/lib/tools-config";
import { SITE } from "@/data/site";

export const metadata: Metadata = {
  title: "Stream Overlay Brief Generator - Plan Your Custom Cozy Pack (Free)",
  description:
    "Free overlay brief generator: answer a few cozy questions and get a ready-to-use brief for commissioning or generating a custom stream-overlay pack. Runs in your browser.",
  keywords: [
    "stream overlay brief",
    "overlay commission brief",
    "custom twitch overlay generator",
    "overlay design brief",
    "stream overlay prompt",
  ],
  alternates: { canonical: "/free-tools/overlay-brief" },
  openGraph: {
    type: "website",
    title: "Overlay Brief Generator (Free) · CozyOverlays",
    description:
      "Answer a few questions and get a ready-to-use brief for a custom cozy overlay pack.",
    url: `${SITE.url}/free-tools/overlay-brief`,
  },
};

const FAQS: Faq[] = [
  {
    q: "What is a stream overlay brief?",
    a: "It's a clear, structured description of the overlay pack you want - your channel, vibe, aesthetic, the assets you need (Starting Soon, BRB, alerts, panels, emotes, badges) and the production specs. A good brief gets you a more accurate result whether you commission a designer or use an AI image generator.",
  },
  {
    q: "How do I use the generated brief?",
    a: "Copy it and either paste it into your image generator to create the pack, or send it to a designer as your commission brief. It already includes the right sizes and OBS-ready delivery notes.",
  },
  {
    q: "Is this free and private?",
    a: "Yes - it's completely free, no login, and everything runs in your browser. Nothing you type is uploaded or stored on a server.",
  },
  {
    q: "Can you make the pack for me?",
    a: "Yes! CozyJsStudio designs cozy custom overlay packs. Generate your brief here, then browse the shop or reach out for a custom commission and we'll bring it to life.",
  },
];

export default function OverlayBriefPage() {
  const appLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Stream Overlay Brief Generator",
    applicationCategory: "DesignApplication",
    operatingSystem: "Any (web browser)",
    url: `${SITE.url}/free-tools/overlay-brief`,
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    description:
      "Free tool that turns a few questions into a ready-to-use brief for a custom cozy stream-overlay pack.",
  };

  return (
    <>
      <JsonLd data={appLd} />
      <JsonLd data={faqLd(FAQS)} />
      <ToolLayout
        eyebrow="Free Tool"
        title={
          <>
            Overlay Brief{" "}
            <span className="gradient-text">Generator</span>
          </>
        }
        subtitle="Answer a few cozy questions about your channel and get a ready-to-use brief - perfect for commissioning a custom pack or generating one yourself. Everything runs in your browser; nothing is stored."
      >
        <BriefGenerator />

        <ToolCTA
          heading="Want us to bring your brief to life?"
          text="CozyJsStudio designs cozy custom overlay packs - or grab a ready-made one from 125+ in the shop. Browse and download instantly from Etsy."
          href={TOOL_CTA.shop}
          label="Browse the packs"
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
