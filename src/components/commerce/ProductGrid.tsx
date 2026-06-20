"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, LayoutGroup } from "framer-motion";
import type { ProductDTO } from "@/lib/products";
import { ProductCard } from "@/components/commerce/ProductCard";
import { ProductLightbox } from "@/components/commerce/ProductLightbox";
import { clsx } from "@/lib/clsx";

export const PRODUCT_FILTERS: { id: string; label: string }[] = [
  { id: "all", label: "All" },
  { id: "cat", label: "Cats" },
  { id: "dragon", label: "Dragons" },
  { id: "fox", label: "Foxes" },
  { id: "bear", label: "Bears & Pandas" },
  { id: "japanese", label: "Japanese" },
  { id: "frog", label: "Frogs & More" },
];

interface ProductGridProps {
  products: ProductDTO[];
  initialCategory?: string;
  /** Sync the active filter to the URL query (used on the /shop page). */
  syncUrl?: boolean;
  /** Show the category filter tabs (off for curated homepage sets). */
  showFilters?: boolean;
}

export function ProductGrid({
  products,
  initialCategory = "all",
  syncUrl = false,
  showFilters = true,
}: ProductGridProps) {
  const validInitial = PRODUCT_FILTERS.some((f) => f.id === initialCategory)
    ? initialCategory
    : "all";
  const [filter, setFilter] = useState(validInitial);
  const [active, setActive] = useState<ProductDTO | null>(null);

  useEffect(() => {
    if (!syncUrl) return;
    const url = new URL(window.location.href);
    if (filter === "all") url.searchParams.delete("category");
    else url.searchParams.set("category", filter);
    window.history.replaceState(null, "", url.toString());
  }, [filter, syncUrl]);

  const visible = useMemo(
    () =>
      filter === "all"
        ? products
        : products.filter((p) => p.category === filter),
    [filter, products],
  );

  return (
    <>
      {showFilters && (
        <div className="flex flex-wrap justify-center gap-2">
          {PRODUCT_FILTERS.map((f) => (
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
      )}

      <LayoutGroup>
        <div
          className={clsx(
            "grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3",
            showFilters && "mt-10",
          )}
        >
          <AnimatePresence mode="popLayout">
            {visible.map((product) => (
              <ProductCard
                key={product.slug}
                product={product}
                onOpenMedia={setActive}
              />
            ))}
          </AnimatePresence>
        </div>
      </LayoutGroup>

      {visible.length === 0 && (
        <p className="mt-10 text-center text-body">
          No packs in this category yet — check back soon!
        </p>
      )}

      <ProductLightbox product={active} onClose={() => setActive(null)} />
    </>
  );
}
