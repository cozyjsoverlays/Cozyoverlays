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
  { id: "witchy", label: "Witchy" },
  { id: "room", label: "Cozy Rooms" },
  { id: "seasonal", label: "Seasonal" },
  { id: "frog", label: "Frogs & More" },
];

interface ProductGridProps {
  products: ProductDTO[];
  initialCategory?: string;
  /** Sync the active filter to the URL query (used on the /shop page). */
  syncUrl?: boolean;
  /** Show the category filter tabs (off for curated homepage sets). */
  showFilters?: boolean;
  /** If set, show this many packs at first and reveal more via a "Load more"
   *  button (used on the homepage to show the whole shop progressively). */
  pageSize?: number;
}

export function ProductGrid({
  products,
  initialCategory = "all",
  syncUrl = false,
  showFilters = true,
  pageSize,
}: ProductGridProps) {
  const validInitial = PRODUCT_FILTERS.some((f) => f.id === initialCategory)
    ? initialCategory
    : "all";
  const [filter, setFilter] = useState(validInitial);
  const [active, setActive] = useState<ProductDTO | null>(null);
  const [count, setCount] = useState(pageSize ?? Infinity);

  // On the static /shop page, read the ?category= deep-link from the URL on
  // mount (the server can't read searchParams in a static export).
  useEffect(() => {
    if (!syncUrl) return;
    const param = new URLSearchParams(window.location.search).get("category");
    if (param && PRODUCT_FILTERS.some((f) => f.id === param)) setFilter(param);
  }, [syncUrl]);

  useEffect(() => {
    if (!syncUrl) return;
    const url = new URL(window.location.href);
    if (filter === "all") url.searchParams.delete("category");
    else url.searchParams.set("category", filter);
    window.history.replaceState(null, "", url.toString());
  }, [filter, syncUrl]);

  // Reset the visible count whenever the filter changes.
  useEffect(() => {
    setCount(pageSize ?? Infinity);
  }, [filter, pageSize]);

  const matching = useMemo(
    () =>
      filter === "all"
        ? products
        : products.filter((p) => p.category === filter),
    [filter, products],
  );

  const visible = pageSize ? matching.slice(0, count) : matching;
  const hasMore = pageSize ? count < matching.length : false;

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
          No packs in this category yet - check back soon!
        </p>
      )}

      {hasMore && (
        <div className="mt-12 flex flex-col items-center gap-3">
          <button
            type="button"
            onClick={() => setCount((c) => c + (pageSize ?? 12))}
            className="inline-flex items-center gap-2 rounded-full border border-subtle bg-white/5 px-7 py-3 text-sm font-bold text-heading transition-all hover:border-lavender/50 hover:bg-white/10 hover:-translate-y-0.5"
          >
            Load more packs
          </button>
          <span className="text-xs text-muted">
            Showing {visible.length} of {matching.length}
          </span>
        </div>
      )}

      <ProductLightbox product={active} onClose={() => setActive(null)} />
    </>
  );
}
