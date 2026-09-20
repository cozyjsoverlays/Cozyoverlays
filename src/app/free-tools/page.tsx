import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { AuroraBackground } from "@/components/ui/AuroraBackground";
import { JsonLd } from "@/components/seo/JsonLd";
import { ToolCTA } from "@/components/tools/ToolCTA";
import { TOOLS, TOOL_CTA } from "@/lib/tools-config";
import { SITE } from "@/data/site";

export const metadata: Metadata = {
  title: "Free Tools for Streamers - Emote Previewer, Resizer & More",
  description:
    "Free, no-login browser tools for streamers: preview Twitch emotes & badges at every size, resize emotes, and more. Everything runs on your device - files never leave your browser.",
  alternates: { canonical: "/free-tools" },
  openGraph: {
    type: "website",
    title: "Free Tools for Streamers · CozyOverlays",
    description:
      "Cozy, free browser tools for streamers - emote previewer, resizer and more. No login, nothing uploaded.",
    url: `${SITE.url}/free-tools`,
  },
};

export default function FreeToolsPage() {
  const collectionLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Free Tools for Streamers",
    url: `${SITE.url}/free-tools`,
    description:
      "Free, no-login browser tools for streamers by CozyJsStudio - emote & badge previewer, resizer and more.",
  };

  return (
    <>
      <JsonLd data={collectionLd} />
      <Nav />
      <main>
        <section className="relative isolate overflow-hidden pb-8 pt-32 md:pt-40">
          <AuroraBackground />
          <div className="container-page max-w-3xl text-center">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-lavender">
              Free for streamers
            </span>
            <h1 className="mt-4 text-[clamp(2.2rem,6vw,3.75rem)] font-extrabold leading-tight text-heading">
              Free Tools for{" "}
              <span className="gradient-text">Streamers</span>
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-lg text-body">
              A cozy little toolbox for Twitch, YouTube & Kick creators - preview
              and resize emotes, check sizes, and more. No login, no sign-up, and
              your files never leave your device.
            </p>
            <p className="mx-auto mt-4 inline-flex items-center gap-1.5 text-sm text-cyan">
              <ShieldCheck size={15} /> 100% in your browser. Nothing uploaded, ever.
            </p>
          </div>
        </section>

        <section className="section-pad pt-4">
          <div className="container-page">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {TOOLS.map((tool) => {
                const Icon = tool.icon;
                const card = (
                  <div
                    className={`glass group relative flex h-full flex-col rounded-2xl p-6 transition-all ${
                      tool.live ? "hover:-translate-y-1.5 hover:shadow-card-hover" : "opacity-70"
                    }`}
                  >
                    <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-lavender/15 text-lavender">
                      <Icon size={22} />
                    </span>
                    <h2 className="mt-4 text-lg font-extrabold text-heading">
                      {tool.name}
                    </h2>
                    <p className="mt-1.5 flex-1 text-sm text-body">{tool.blurb}</p>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-lavender">
                      {tool.live ? (
                        <>
                          Open tool <ArrowRight size={15} />
                        </>
                      ) : (
                        <span className="text-muted">Coming soon</span>
                      )}
                    </span>
                  </div>
                );
                return tool.live ? (
                  <Link key={tool.slug} href={`/free-tools/${tool.slug}`}>
                    {card}
                  </Link>
                ) : (
                  <div key={tool.slug}>{card}</div>
                );
              })}
            </div>

            <div className="mx-auto mt-12 max-w-3xl">
              <ToolCTA
                heading="Skip the work - get a matching pack"
                text="Our overlay packs already include emotes, badges, panels and alerts at every correct size, themed to one cozy world. Browse 125+ and download instantly from Etsy."
                href={TOOL_CTA.shop}
                label="Browse the packs"
              />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
