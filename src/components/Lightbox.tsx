"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { X, ExternalLink } from "lucide-react";
import type { Pack } from "@/lib/types";
import { packImageAlt } from "@/lib/seo";

interface LightboxProps {
  pack: Pack | null;
  onClose: () => void;
}

export function Lightbox({ pack, onClose }: LightboxProps) {
  useEffect(() => {
    if (!pack) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [pack, onClose]);

  if (typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {pack && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="dialog"
          aria-modal="true"
          aria-label={`${pack.name} preview`}
          onClick={onClose}
        >
          <div className="absolute inset-0 bg-base/85 backdrop-blur-md" />

          <motion.div
            className="relative z-10 w-full max-w-3xl overflow-hidden rounded-2xl border border-subtle bg-surface shadow-card"
            initial={{ scale: 0.94, y: 16 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.94, y: 16 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Close preview"
              className="absolute right-3 top-3 z-20 inline-flex h-10 w-10 items-center justify-center rounded-full bg-base/60 text-heading backdrop-blur transition-colors hover:bg-base"
            >
              <X size={20} />
            </button>

            <div className="relative aspect-video w-full bg-black">
              {pack.video ? (
                <video
                  src={pack.video}
                  className="h-full w-full object-cover"
                  autoPlay
                  muted
                  loop
                  playsInline
                  controls
                />
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={pack.image}
                  alt={packImageAlt(pack.name, pack.category)}
                  className="h-full w-full object-cover"
                />
              )}
            </div>

            <div className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="text-lg font-extrabold text-heading">
                  {pack.name}
                </h3>
                <p className="mt-1 text-sm text-body">{pack.description}</p>
              </div>
              <a
                href={pack.etsy}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex shrink-0 items-center gap-2 rounded-full bg-accent-gradient px-5 py-2.5 text-sm font-bold text-base shadow-glow transition-transform hover:-translate-y-0.5"
              >
                Get Pack · {pack.price} <ExternalLink size={15} />
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
