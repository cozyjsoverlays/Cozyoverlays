"use client";

import { useState } from "react";
import Image from "next/image";
import { Play, Maximize2 } from "lucide-react";
import type { ProductDTO } from "@/lib/products";
import { ProductLightbox } from "@/components/commerce/ProductLightbox";
import { packImageAlt } from "@/lib/seo";

export function ProductGallery({ product }: { product: ProductDTO }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={`Open larger preview of the ${product.name} animated stream overlay pack`}
        className="group relative block aspect-[4/3] w-full overflow-hidden rounded-2xl border border-subtle bg-black/40"
      >
        {product.video ? (
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
            src={product.image}
            alt={packImageAlt(product.name, product.category)}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        )}
        <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-base/70 px-3 py-1.5 text-xs font-bold text-heading backdrop-blur">
          {product.video ? <Play size={13} /> : <Maximize2 size={13} />}
          {product.video ? "Play preview" : "Expand"}
        </span>
      </button>

      <ProductLightbox
        product={open ? product : null}
        onClose={() => setOpen(false)}
      />
    </>
  );
}
