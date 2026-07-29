"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import type { ProductDTO } from "@/lib/products";
import { formatCents } from "@/lib/money";
import { AddToCartButtons } from "@/components/commerce/AddToCartButtons";
import { packImageAlt } from "@/lib/seo";

interface ProductLightboxProps {
  product: ProductDTO | null;
  onClose: () => void;
}

export function ProductLightbox({ product, onClose }: ProductLightboxProps) {
  useEffect(() => {
    if (!product) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [product, onClose]);

  if (typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {product && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="dialog"
          aria-modal="true"
          aria-label={`${product.name} preview`}
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
              {product.video ? (
                <video
                  src={product.video}
                  className="h-full w-full object-cover"
                  autoPlay
                  muted
                  loop
                  playsInline
                  controls
                  aria-label={`Animated preview of the ${product.name} stream overlay pack`}
                  title={`${product.name} — animated stream overlay preview`}
                />
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={product.image}
                  alt={packImageAlt(product.name, product.category)}
                  className="h-full w-full object-cover"
                />
              )}
            </div>

            <div className="flex flex-col gap-4 p-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <Link
                    href={`/shop/${product.slug}`}
                    onClick={onClose}
                    className="text-lg font-extrabold text-heading hover:text-lavender"
                  >
                    {product.name}
                  </Link>
                  <p className="mt-1 text-sm text-body">{product.description}</p>
                </div>
                <span className="shrink-0 text-lg font-extrabold text-lavender">
                  {formatCents(product.priceCents, product.currency)}
                </span>
              </div>
              <AddToCartButtons
                item={{
                  slug: product.slug,
                  name: product.name,
                  priceCents: product.priceCents,
                  image: product.image,
                  currency: product.currency,
                }}
                variant="detail"
                etsyUrl={product.etsyUrl}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
