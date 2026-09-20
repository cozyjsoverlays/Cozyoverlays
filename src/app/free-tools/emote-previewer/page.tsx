import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/seo/JsonLd";
import { ToolLayout } from "@/components/tools/ToolLayout";
import { ToolCTA } from "@/components/tools/ToolCTA";
import { ToolFaq, faqLd, type Faq } from "@/components/tools/ToolFaq";
import { EmotePreviewer } from "@/components/tools/EmotePreviewer";
import { TOOL_CTA } from "@/lib/tools-config";
import { SITE } from "@/data/site";

export const metadata: Metadata = {
  title: "Twitch Emote & Badge Previewer - See Every Size in Real Chat (Free)",
  description:
    "Free Twitch emote tester: drop in your emote or sub badge and preview it at 112, 56 and 28px in real Twitch, Discord and YouTube chat mockups (light & dark). Runs in your browser - nothing uploaded.",
  keywords: [
    "twitch emote previewer",
    "emote tester",
    "twitch emote size",
    "twitch badge preview",
    "emote size checker",
  ],
  alternates: { canonical: "/free-tools/emote-previewer" },
  openGraph: {
    type: "website",
    title: "Twitch Emote & Badge Previewer (Free) · CozyOverlays",
    description:
      "Preview your emote at every Twitch size in real chat mockups. No login, nothing uploaded.",
    url: `${SITE.url}/free-tools/emote-previewer`,
  },
};

const FAQS: Faq[] = [
  {
    q: "What size should a Twitch emote be?",
    a: "Twitch emotes are uploaded as a single high-resolution image and displayed at three sizes: 112×112, 56×56 and 28×28 pixels. Design at 112×112 (or larger and scale down) with a transparent background, and make sure the artwork still reads clearly at 28×28 - that's the size used in chat.",
  },
  {
    q: "What size is a Twitch sub badge?",
    a: "Twitch sub badges render at 72×72, 36×36 and 18×18 pixels. Because 18px is tiny, keep badge designs to one bold, simple shape with high contrast so they stay recognizable next to a username.",
  },
  {
    q: "Is this emote previewer free, and are my files uploaded?",
    a: "It's completely free with no login. Everything runs locally in your browser using your device - your image is never uploaded to a server. You can refresh the page and it's gone.",
  },
  {
    q: "Does it support animated emotes (GIF)?",
    a: "Yes. Drop in a GIF and the previews animate just like they would in chat, at each native size, so you can check that your animation still reads when it's shrunk down.",
  },
  {
    q: "Why does my emote look bad at the small size?",
    a: "Fine details and thin lines disappear when an image is scaled to 28px. The fix is a bolder, simpler silhouette, fewer colors, and strong contrast. Preview at the smallest size first and design for that.",
  },
];

export default function EmotePreviewerPage() {
  const appLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Twitch Emote & Badge Previewer",
    applicationCategory: "MultimediaApplication",
    operatingSystem: "Any (web browser)",
    url: `${SITE.url}/free-tools/emote-previewer`,
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    description:
      "Free browser tool to preview Twitch emotes and sub badges at every native size in real chat mockups.",
  };

  return (
    <>
      <JsonLd data={appLd} />
      <JsonLd data={faqLd(FAQS)} />
      <ToolLayout
        eyebrow="Free Tool"
        title={
          <>
            Twitch Emote &amp; Badge{" "}
            <span className="gradient-text">Previewer</span>
          </>
        }
        subtitle="Drop in your emote or sub badge and see it at every native size - live in Twitch, Discord and YouTube chat. Everything runs in your browser; your files never leave your device."
      >
        <EmotePreviewer />

        <ToolCTA
          heading="Need emotes that read clean at every size?"
          text="Our packs include emotes, sub badges, panels and alerts designed to stay crisp from 112px all the way down to 28px - themed to one cozy world. Browse 125+ and download instantly from Etsy."
          href={TOOL_CTA.emotes}
          label="Browse our packs"
        />

        <ToolFaq faqs={FAQS} />

        <p className="mt-10 text-sm text-muted">
          More free tools:{" "}
          <Link href="/free-tools" className="font-bold text-lavender hover:text-pink">
            see the full toolbox
          </Link>
          .
        </p>
      </ToolLayout>
    </>
  );
}
