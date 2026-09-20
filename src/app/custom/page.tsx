import type { Metadata } from "next";
import { Check, ExternalLink, Sparkles } from "lucide-react";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { AuroraBackground } from "@/components/ui/AuroraBackground";
import { BriefGenerator } from "@/components/tools/BriefGenerator";
import { ToolFaq, faqLd, type Faq } from "@/components/tools/ToolFaq";
import { JsonLd } from "@/components/seo/JsonLd";
import { LINKS, SITE } from "@/data/site";

export const metadata: Metadata = {
  title: "Custom Animated Stream Overlay Commission - Your Channel, Bespoke",
  description:
    "Commission a fully custom animated overlay pack - screens, alerts, emotes and badges built around your character and vibe. Full pack bundle now $99.87 (was $399.50).",
  alternates: { canonical: "/custom" },
  openGraph: {
    type: "website",
    title: "Custom Overlay Commission · CozyOverlays",
    description:
      "A fully bespoke animated overlay pack for your channel - $99.87 (was $399.50).",
    url: `${SITE.url}/custom`,
  },
};

const INCLUDED = [
  "Your character or mascot, drawn for you",
  "Custom color palette matched to your brand",
  "Starting Soon / BRB / Ending / Offline screens",
  "Animated alerts (follow, sub, gift, donation)",
  "Custom emotes + sub badge set",
  "Panels, webcam frame & stinger transition",
];

const FAQS: Faq[] = [
  {
    q: "How long does a custom pack take?",
    a: "Most commissions are delivered within 1–2 weeks depending on scope. You'll see previews along the way and we iterate together until it feels right.",
  },
  {
    q: "How many revisions do I get?",
    a: "Reasonable revisions are included - small tweaks are always free. We keep going until the pack feels like your channel.",
  },
  {
    q: "What formats do I receive?",
    a: "OBS-ready files: transparent looping .WEBM for animated pieces, .PNG stills, emotes at 112/56/28 and badges at 72/36/18 - everything sized for Twitch, Kick, YouTube and TikTok.",
  },
  {
    q: "How do I start?",
    a: "Fill the brief below (it writes itself), then order the Custom Full Pack Bundle on Etsy and send us the brief - or message us on Etsy first if you have questions.",
  },
];

export default function CustomPage() {
  return (
    <>
      <JsonLd data={faqLd(FAQS)} />
      <Nav />
      <main>
        <section className="relative isolate overflow-hidden pb-10 pt-32 md:pt-40">
          <AuroraBackground intense />
          <div className="container-page max-w-4xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-subtle bg-white/5 px-4 py-1.5 text-xs font-bold text-lavender">
              <Sparkles size={14} /> Custom Commission
            </span>
            <h1 className="mt-5 text-[clamp(2.2rem,6vw,3.75rem)] font-extrabold leading-tight text-heading">
              A cozy world built{" "}
              <span className="gradient-text">just for your channel</span>
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-lg text-body">
              Your character, your palette, your vibe - a complete animated pack
              designed from scratch so no other stream looks like yours.
            </p>
            <div className="mt-6 flex items-baseline justify-center gap-3">
              <span className="text-xl font-semibold text-muted line-through">
                $399.50
              </span>
              <span className="text-5xl font-extrabold text-warm">$99.87</span>
              <span className="rounded-full bg-pink/15 px-3 py-1 text-sm font-bold text-pink">
                -75%
              </span>
            </div>
            <a
              href={LINKS.etsyCustom}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-7 inline-flex items-center gap-2 rounded-full bg-accent-gradient px-8 py-3.5 text-sm font-bold text-base shadow-glow transition-transform hover:-translate-y-0.5"
            >
              Order the Custom Full Pack on Etsy <ExternalLink size={15} />
            </a>
          </div>
        </section>

        <section className="container-page max-w-4xl pb-4">
          <div className="glass rounded-2xl p-6">
            <h2 className="text-sm font-bold uppercase tracking-wide text-heading">
              Everything a commission includes
            </h2>
            <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
              {INCLUDED.map((f) => (
                <li key={f} className="flex items-center gap-2 text-sm text-body">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-lavender/15 text-lavender">
                    <Check size={12} />
                  </span>
                  {f}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="section-pad pt-10">
          <div className="container-page max-w-4xl">
            <h2 className="text-2xl font-extrabold text-heading">
              Start your brief
            </h2>
            <p className="mt-2 max-w-2xl text-body">
              Answer a few questions and get a ready-to-send commission brief -
              copy it into your Etsy order message and we&apos;ll take it from
              there.
            </p>
            <div className="mt-8">
              <BriefGenerator />
            </div>

            <ToolFaq faqs={FAQS} />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
