"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ExternalLink, Play, Maximize2 } from "lucide-react";
import type { Pack } from "@/lib/types";
import { packImageAlt } from "@/lib/seo";

interface PackCardProps {
  pack: Pack;
  onOpen: (pack: Pack) => void;
}

export function PackCard({ pack, onOpen }: PackCardProps) {
  const [hover, setHover] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleEnter = () => {
    setHover(true);
    if (pack.video && videoRef.current) {
      videoRef.current.currentTime = 0;
      void videoRef.current.play().catch(() => {});
    }
  };
  const handleLeave = () => {
    setHover(false);
    if (pack.video && videoRef.current) videoRef.current.pause();
  };

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      className="glass group relative flex flex-col overflow-hidden rounded-2xl transition-all duration-300 hover:-translate-y-1.5 hover:shadow-card-hover"
    >
      {/* Media */}
      <button
        type="button"
        onClick={() => onOpen(pack)}
        aria-label={`Open ${pack.name} preview`}
        className="relative block aspect-[4/3] w-full overflow-hidden bg-black/40"
      >
        <Image
          src={pack.image}
          alt={packImageAlt(pack.name, pack.category)}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className={`object-cover transition-all duration-500 ${
            pack.video
              ? hover
                ? "opacity-0"
                : "opacity-100"
              : hover
                ? "scale-110"
                : "scale-100"
          }`}
        />
        {pack.video && (
          <video
            ref={videoRef}
            src={pack.video}
            muted
            loop
            playsInline
            preload="none"
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
              hover ? "opacity-100" : "opacity-0"
            }`}
          />
        )}

        {/* Badges */}
        {pack.bestseller && (
          <span className="absolute left-3 top-3 z-10 rounded-full bg-accent-gradient px-2.5 py-1 text-[11px] font-bold text-base shadow-glow">
            ★ Bestseller
          </span>
        )}
        <span className="absolute right-3 top-3 z-10 inline-flex items-center gap-1 rounded-full bg-base/70 px-2.5 py-1 text-[11px] font-bold text-heading opacity-0 backdrop-blur transition-opacity group-hover:opacity-100">
          {pack.video ? <Play size={12} /> : <Maximize2 size={12} />}
          {pack.video ? "Preview" : "View"}
        </span>

        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-base/70 via-transparent to-transparent"
        />
      </button>

      {/* Body */}
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-base font-bold leading-snug text-heading">
            {pack.name}
          </h3>
          <span className="shrink-0 rounded-full border border-subtle bg-white/5 px-2.5 py-1 text-sm font-bold text-lavender">
            {pack.price}
          </span>
        </div>

        <p className="mt-2 text-sm text-body">{pack.description}</p>

        <ul className="mt-4 flex flex-wrap gap-1.5">
          {pack.features.map((f) => (
            <li
              key={f}
              className="rounded-full border border-subtle bg-surface-2/60 px-2.5 py-1 text-[11px] font-medium text-muted"
            >
              {f}
            </li>
          ))}
        </ul>

        <a
          href={pack.etsy}
          target="_blank"
          rel="noopener noreferrer"
          className="group/btn mt-5 inline-flex items-center justify-center gap-2 rounded-full border border-lavender/30 bg-lavender/10 px-5 py-2.5 text-sm font-bold text-heading transition-all hover:border-lavender/60 hover:bg-lavender/20 hover:shadow-glow"
        >
          Get Pack
          <ExternalLink
            size={15}
            className="transition-transform group-hover/btn:translate-x-0.5"
          />
        </a>
      </div>
    </motion.article>
  );
}
