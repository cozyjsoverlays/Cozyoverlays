"use client";

import { useState } from "react";
import Image from "next/image";
import { Play, Maximize2 } from "lucide-react";
import type { ProductDTO } from "@/lib/products";
import { ProductLightbox } from "@/components/commerce/ProductLightbox";
import { packImageAlt } from "@/lib/seo";
import { clsx } from "@/lib/clsx";

export function ProductGallery({ product }: { product: ProductDTO }) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);

  const photos = product.images.length ? product.images : [product.image];
  const current = photos[Math.min(active, photos.length - 1)];

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={`Open larger preview of the ${product.name} animated stream overlay pack`}
        className="group relative block aspect-[4/3] w-full overflow-hidden rounded-2xl border border-subtle bg-black/40"
      >
        {product.video && active === 0 ? (
          <video
            src={product.video}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-label={`Animated preview of the ${product.name} stream overlay pack`}
            title={`${product.name} — animated stream overlay preview`}
            className="h-full w-full object-cover"
          />
        ) : (
          <Image
            src={current}
            alt={packImageAlt(product.name, product.category)}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        )}
        <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-base/70 px-3 py-1.5 text-xs font-bold text-heading backdrop-blur">
          {product.video && active === 0 ? <Play size={13} /> : <Maximize2 size={13} />}
          {product.video && active === 0 ? "Play preview" : "Expand"}
        </span>
      </button>

      {/* Thumbnail strip — every photo from the Etsy listing */}
      {photos.length > 1 && (
        <ul className="mt-3 grid grid-cols-5 gap-2 sm:grid-cols-6">
          {photos.map((src, i) => (
            <li key={src}>
              <button
                type="button"
                onClick={() => setActive(i)}
                aria-label={`Show photo ${i + 1} of ${photos.length} for ${product.name}`}
                aria-current={i === active}
                className={clsx(
                  "relative block aspect-square w-full overflow-hidden rounded-lg border transition-all",
                  i === active
                    ? "border-lavender/70 ring-2 ring-lavender/30"
                    : "border-subtle opacity-70 hover:opacity-100",
                )}
              >
                <Image
                  src={src}
                  alt={`${product.name} — preview photo ${i + 1}`}
                  fill
                  sizes="120px"
                  className="object-cover"
                />
              </button>
            </li>
          ))}
        </ul>
      )}

      <ProductLightbox
        product={open ? product : null}
        onClose={() => setOpen(false)}
      />
    </>
  );
}
