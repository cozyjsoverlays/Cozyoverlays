import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/seo/JsonLd";
import { ToolLayout } from "@/components/tools/ToolLayout";
import { ToolCTA } from "@/components/tools/ToolCTA";
import { ToolFaq, faqLd, type Faq } from "@/components/tools/ToolFaq";
import { BitrateCalculator } from "@/components/tools/BitrateCalculator";
import { TOOL_CTA } from "@/lib/tools-config";
import { SITE } from "@/data/site";

export const metadata: Metadata = {
  title: "Twitch Bitrate Calculator - Best OBS Settings for Your Upload (Free)",
  description:
    "Free stream bitrate calculator: pick your resolution, framerate and upload speed to get the recommended OBS video bitrate, keyframe and encoder settings - with a plain-language verdict.",
  keywords: [
    "twitch bitrate calculator",
    "best obs bitrate",
    "stream bitrate calculator",
    "obs settings calculator",
    "1080p60 bitrate",
  ],
  alternates: { canonical: "/free-tools/bitrate-calculator" },
  openGraph: {
    type: "website",
    title: "Stream Bitrate Calculator (Free) · CozyOverlays",
    description: "Find the right OBS bitrate for your upload speed and resolution.",
    url: `${SITE.url}/free-tools/bitrate-calculator`,
  },
};

const FAQS: Faq[] = [
  {
    q: "What bitrate should I stream at on Twitch?",
    a: "For 1080p60 most streamers use around 6000 kbps; 1080p30 about 4500; 720p60 about 4500; 720p30 about 3000. Fast-paced games benefit from the higher end of the range, while cozy/chatting streams can go a little lower.",
  },
  {
    q: "How much upload speed do I need to stream?",
    a: "As a rule of thumb you want your upload speed (in kbps) to be at least 1.5× your video bitrate so there's headroom for audio and network overhead. This calculator checks that for you and gives a verdict.",
  },
  {
    q: "What keyframe interval should I use?",
    a: "Set the keyframe interval to 2 seconds - both Twitch and YouTube recommend it. Use a hardware encoder (NVENC, AMD, or Apple) if you have one to spare your CPU.",
  },
  {
    q: "Is there a max bitrate on Twitch?",
    a: "Twitch generally recommends staying around 6000 kbps for stable delivery to most viewers. YouTube allows higher bitrates, especially at 1440p and 4K.",
  },
];

export default function BitrateCalculatorPage() {
  const appLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Stream Bitrate & Settings Calculator",
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Any (web browser)",
    url: `${SITE.url}/free-tools/bitrate-calculator`,
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    description:
      "Free calculator for the recommended OBS video bitrate and settings based on resolution, framerate and upload speed.",
  };

  return (
    <>
      <JsonLd data={appLd} />
      <JsonLd data={faqLd(FAQS)} />
      <ToolLayout
        eyebrow="Free Tool"
        title={
          <>
            Bitrate &amp; Settings{" "}
            <span className="gradient-text">Calculator</span>
          </>
        }
        subtitle="Pick your resolution, framerate and upload speed to get the right OBS video bitrate, keyframe and encoder settings - plus a plain-language verdict on whether your connection can handle it."
      >
        <BitrateCalculator />

        <ToolCTA
          heading="Dialed in your settings? Now make it look cozy."
          text="Animated Starting Soon, BRB and Ending screens make even your pauses look polished. Browse 125+ overlay packs and download instantly from Etsy."
          href={TOOL_CTA.screens}
          label="Browse screen packs"
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
