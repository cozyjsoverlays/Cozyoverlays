"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, LayoutGroup } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { PACKS, PACK_FILTERS } from "@/data/packs";
import type { Pack, PackCategory } from "@/lib/types";
import { LINKS } from "@/data/site";
import { PackCard } from "@/components/PackCard";
import { Lightbox } from "@/components/Lightbox";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { clsx } from "@/lib/clsx";

type FilterId = PackCategory | "all";

export function PackGrid() {
  const [filter, setFilter] = useState<FilterId>("all");
  const [active, setActive] = useState<Pack | null>(null);

  const visible = useMemo(
    () =>
      filter === "all"
        ? PACKS
        : PACKS.filter((p) => p.category === filter),
    [filter],
  );

  return (
    <section id="bestsellers" className="section-pad">
      <div className="container-page">
        <SectionHeading
          eyebrow="Bestsellers"
          title={
            <>
              Cozy packs your <span className="gradient-text">chat will love</span>
            </>
          }
          subtitle="Every pack is fully animated and includes screens, alerts, panels, and emotes - ready for OBS, Streamlabs, and StreamElements."
        />

        {/* Filter tabs */}
        <div className="mt-10 flex flex-wrap justify-center gap-2">
          {PACK_FILTERS.map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => setFilter(f.id)}
              aria-pressed={filter === f.id}
              className={clsx(
                "rounded-full border px-4 py-2 text-sm font-medium transition-all",
                filter === f.id
                  ? "border-transparent bg-accent-gradient text-base shadow-glow"
                  : "border-subtle bg-white/5 text-body hover:border-lavender/40 hover:text-heading",
              )}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        <LayoutGroup>
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {visible.map((pack) => (
                <PackCard key={pack.slug} pack={pack} onOpen={setActive} />
              ))}
            </AnimatePresence>
          </div>
        </LayoutGroup>

        <div className="mt-12 text-center">
          <a
            href={LINKS.etsy}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-base font-bold text-lavender transition-colors hover:text-pink"
          >
            View All 122 Packs on Etsy
            <ExternalLink size={16} />
          </a>
        </div>
      </div>

      <Lightbox pack={active} onClose={() => setActive(null)} />
    </section>
  );
}
