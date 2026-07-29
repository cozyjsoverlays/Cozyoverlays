import Image from "next/image";
import { Star } from "lucide-react";
import { SITE, ABOUT_CHIPS } from "@/data/site";
import { Reveal } from "@/components/ui/Reveal";

export function About() {
  return (
    <section id="about" className="section-pad">
      <div className="container-page">
        <div className="grid gap-12 lg:grid-cols-[auto_1fr] lg:items-center lg:gap-16">
          <Reveal className="flex flex-col items-center text-center lg:items-start lg:text-left">
            <div className="relative">
              <div
                aria-hidden
                className="glow-blob absolute inset-0 -z-10 scale-125 bg-lavender opacity-40"
              />
              <Image
                src={SITE.avatar}
                alt="CozyJsStudio — Etsy Star Seller shop making animated cozy stream overlays for Twitch, YouTube, Kick and TikTok"
                width={180}
                height={180}
                className="rounded-3xl border border-subtle shadow-card"
              />
            </div>
            <div className="mt-5 flex items-center gap-2">
              <span className="rounded-full border border-subtle bg-white/5 px-3 py-1 text-xs font-bold text-body">
                Est. 2025
              </span>
              <span className="inline-flex items-center gap-1 rounded-full border border-pink/30 bg-pink/10 px-3 py-1 text-xs font-bold text-pink">
                <Star size={12} className="fill-pink" /> Star Seller
              </span>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-lavender">
              About the Studio
            </span>
            <h2 className="mt-3 text-[clamp(1.9rem,4vw,3rem)] font-extrabold leading-tight text-heading">
              Cozy, clean &amp;{" "}
              <span className="gradient-text">stream-ready</span> by design
            </h2>
            <div className="mt-5 space-y-4 text-base text-body">
              <p>
                CozyJsStudio is a tiny independent studio obsessed with one
                thing: making streams feel warm. Every pack starts as a hand-drawn
                world and becomes a living, animated overlay that looks like it
                belongs to you.
              </p>
              <p>
                Since 2025 we&apos;ve shipped 122 unique packs to streamers in
                every corner of the world — earning Etsy Star Seller status and a
                4.9-star average from real creators. No bloated templates, no
                stock clip-art. Just cozy, clean, stream-ready design.
              </p>
              <p>
                Whether you grab a ready-made pack or commission something built
                around your own mascot, you&apos;ll get files that drop straight
                into OBS and a studio that actually answers your messages.
              </p>
            </div>

            <ul className="mt-7 flex flex-wrap gap-2">
              {ABOUT_CHIPS.map((chip) => (
                <li
                  key={chip}
                  className="rounded-full border border-subtle bg-surface/60 px-3.5 py-1.5 text-sm font-medium text-body"
                >
                  {chip}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
