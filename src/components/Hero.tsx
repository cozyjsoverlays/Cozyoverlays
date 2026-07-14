"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Star, ArrowRight, MoveDown } from "lucide-react";
import { AuroraBackground } from "@/components/ui/AuroraBackground";
import { Particles } from "@/components/ui/Particles";
import { Button } from "@/components/ui/Button";
import { HERO_STATS } from "@/data/site";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};
const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export function Hero() {
  const reduce = useReducedMotion();
  const variants = reduce ? undefined : container;

  return (
    <section
      id="top"
      className="relative isolate overflow-hidden pb-16 pt-32 md:pb-24 md:pt-40"
    >
      <AuroraBackground intense />
      <Particles count={30} />

      <div className="container-page">
        <motion.div
          className="mx-auto max-w-4xl text-center"
          variants={variants}
          initial={reduce ? undefined : "hidden"}
          animate={reduce ? undefined : "show"}
        >
          <motion.div variants={reduce ? undefined : item}>
            <span className="inline-flex items-center gap-2 rounded-full border border-subtle bg-white/5 px-4 py-1.5 text-xs font-medium text-body backdrop-blur">
              <Star size={14} className="fill-pink text-pink" />
              ⭐ 4.9 (108 reviews) · 807+ streamers · Etsy Star Seller
            </span>
          </motion.div>

          <motion.h1
            variants={reduce ? undefined : item}
            className="mt-6 font-display text-balance text-[clamp(2.6rem,7vw,5rem)] font-semibold leading-[1.05] text-heading"
          >
            Cozy overlays that make your stream{" "}
            <span className="gradient-text animate-gradient-pan">
              feel like home.
            </span>
          </motion.h1>

          <motion.p
            variants={reduce ? undefined : item}
            className="mx-auto mt-6 max-w-2xl text-pretty text-lg text-body md:text-xl"
          >
            Animated stream packs for Twitch, Kick, TikTok &amp; YouTube —
            clean, cute, clutter-free. Screens, alerts, panels &amp; emotes
            ready to drop into OBS in minutes.
          </motion.p>

          <motion.div
            variants={reduce ? undefined : item}
            className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row"
          >
            <Button href="/shop">
              Browse Overlays <ArrowRight size={16} />
            </Button>
            <Button href="/free-pack" variant="secondary">
              Get Free Pack <MoveDown size={16} />
            </Button>
          </motion.div>

          <motion.ul
            variants={reduce ? undefined : item}
            className="mx-auto mt-10 flex max-w-3xl flex-wrap items-center justify-center gap-2.5"
          >
            {HERO_STATS.map((stat) => (
              <li
                key={stat}
                className="rounded-full border border-subtle bg-surface/50 px-4 py-2 text-sm font-medium text-body backdrop-blur"
              >
                {stat}
              </li>
            ))}
          </motion.ul>
        </motion.div>
      </div>
    </section>
  );
}
