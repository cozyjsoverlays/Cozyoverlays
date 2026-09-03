"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Play, Maximize2 } from "lucide-react";
import type { ProductDTO } from "@/lib/products";
import { formatCents } from "@/lib/money";
import { AddToCartButtons } from "@/components/commerce/AddToCartButtons";
import { WishlistButton } from "@/components/commerce/WishlistButton";
import { packImageAlt } from "@/lib/seo";

interface ProductCardProps {
  product: ProductDTO;
  onOpenMedia: (product: ProductDTO) => void;
}

export function ProductCard({ product, onOpenMedia }: ProductCardProps) {
  const [hover, setHover] = useState(false);
  const [frame, setFrame] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  const photos = product.images.length ? product.images : [product.image];
  const canFlip = !product.video && photos.length > 1;

  const saleOff =
    product.compareAtCents && product.compareAtCents > product.priceCents
      ? Math.round(100 - (product.priceCents / product.compareAtCents) * 100)
      : null;

  // Hovering plays the pack's own listing photos as a slideshow — a real
  // preview of what's inside, without needing a video file.
  useEffect(() => {
    if (!hover || !canFlip) return;
    const id = setInterval(() => setFrame((f) => (f + 1) % photos.length), 900);
    return () => clearInterval(id);
  }, [hover, canFlip, photos.length]);

  const handleEnter = () => {
    setHover(true);
    if (product.video && videoRef.current) {
      videoRef.current.currentTime = 0;
      void videoRef.current.play().catch(() => {});
    }
  };
  const handleLeave = () => {
    setHover(false);
    setFrame(0);
    if (product.video && videoRef.current) videoRef.current.pause();
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
      {/* The whole card is one link to the pack page. Interactive controls
          below sit above it with a higher z-index so they still work. */}
      <Link
        href={`/shop/${product.slug}`}
        aria-label={`View ${product.name} — animated stream overlay pack`}
        className="absolute inset-0 z-10"
      >
        <span className="sr-only">View {product.name}</span>
      </Link>

      <div className="relative aspect-[4/3] w-full overflow-hidden bg-black/40">
        {photos.map((src, i) => (
          <Image
            key={src}
            src={src}
            alt={
              i === 0
                ? packImageAlt(product.name, product.category)
                : `${product.name} — preview photo ${i + 1}`
            }
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className={`object-cover transition-opacity duration-500 ${
              i === (hover && canFlip ? frame : 0) ? "opacity-100" : "opacity-0"
            } ${hover && !canFlip && !product.video ? "scale-110" : "scale-100"} transition-transform`}
            priority={false}
          />
        ))}

        {product.video && (
          <video
            ref={videoRef}
            src={product.video}
            muted
            loop
            playsInline
            preload="none"
            aria-label={`Animated preview of the ${product.name} stream overlay pack`}
            title={`${product.name} — animated stream overlay preview`}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
              hover ? "opacity-100" : "opacity-0"
            }`}
          />
        )}

        <span className="absolute left-3 top-3 z-20 flex flex-wrap gap-1.5">
          {product.bestseller && (
            <span className="rounded-full bg-accent-gradient px-2.5 py-1 text-[11px] font-bold text-base shadow-glow">
              ★ Bestseller
            </span>
          )}
          {product.isNew && (
            <span className="rounded-full bg-pink px-2.5 py-1 text-[11px] font-bold text-base">
              ✦ New
            </span>
          )}
          {saleOff !== null && (
            <span className="rounded-full bg-warm px-2.5 py-1 text-[11px] font-bold text-base">
              -{saleOff}%
            </span>
          )}
        </span>

        {/* Expand opens the lightbox without leaving the page */}
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onOpenMedia(product);
          }}
          aria-label={`Open larger preview of ${product.name}`}
          className="absolute bottom-3 right-3 z-20 inline-flex items-center gap-1 rounded-full bg-base/70 px-2.5 py-1 text-[11px] font-bold text-heading opacity-0 backdrop-blur transition-opacity group-hover:opacity-100"
        >
          {product.video ? <Play size={12} /> : <Maximize2 size={12} />}
          {product.video ? "Preview" : "Expand"}
        </button>

        {/* Photo counter, so people know there's more to see */}
        {canFlip && (
          <span className="absolute bottom-3 left-3 z-20 rounded-full bg-base/70 px-2.5 py-1 text-[11px] font-bold text-heading backdrop-blur">
            {hover ? `${frame + 1}/${photos.length}` : `${photos.length} photos`}
          </span>
        )}

        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-base/70 via-transparent to-transparent"
        />
      </div>

      <span className="absolute right-3 top-3 z-20">
        <WishlistButton slug={product.slug} name={product.name} />
      </span>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-base font-bold leading-snug text-heading transition-colors group-hover:text-lavender">
            {product.name}
          </h3>
          <span className="flex shrink-0 flex-col items-end">
            <span className="rounded-full border border-subtle bg-white/5 px-2.5 py-1 text-sm font-bold text-lavender">
              {formatCents(product.priceCents, product.currency)}
            </span>
            {product.compareAtCents && (
              <span className="mt-1 pr-1 text-xs text-muted line-through">
                {formatCents(product.compareAtCents, product.currency)}
              </span>
            )}
          </span>
        </div>

        <p className="mt-2 line-clamp-3 text-sm text-body">{product.description}</p>

        <ul className="mt-4 flex flex-wrap gap-1.5">
          {product.features.map((f) => (
            <li
              key={f}
              className="rounded-full border border-subtle bg-surface-2/60 px-2.5 py-1 text-[11px] font-medium text-muted"
            >
              {f}
            </li>
          ))}
        </ul>

        <div className="relative z-20 mt-5">
          <AddToCartButtons
            item={{
              slug: product.slug,
              name: product.name,
              priceCents: product.priceCents,
              image: product.image,
              currency: product.currency,
            }}
            etsyUrl={product.etsyUrl}
          />
        </div>
      </div>
    </motion.article>
  );
}
