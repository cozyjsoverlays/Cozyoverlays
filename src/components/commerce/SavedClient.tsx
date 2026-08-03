"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Heart, Share2, Check, ArrowRight } from "lucide-react";
import { getAllProductsSync, getCatalogPacks } from "@/lib/products";
import { useWishlist } from "@/lib/wishlist";
import { useHydrated } from "@/lib/use-hydrated";
import { ProductGrid } from "@/components/commerce/ProductGrid";

export function SavedClient() {
  const { slugs } = useWishlist();
  const hydrated = useHydrated();
  const [sharedSlugs, setSharedSlugs] = useState<string[] | null>(null);
  const [copied, setCopied] = useState(false);

  // A shared wishlist link (?items=slug1,slug2) shows that list on any device.
  useEffect(() => {
    const items = new URLSearchParams(window.location.search).get("items");
    if (items) {
      const valid = items
        .split(",")
        .map((s) => s.trim())
        .filter((s) => getCatalogPacks().some((p) => p.slug === s));
      if (valid.length) setSharedSlugs(valid);
    }
  }, []);

  const activeSlugs = sharedSlugs ?? slugs;
  const products = useMemo(() => {
    const all = getAllProductsSync();
    return activeSlugs
      .map((s) => all.find((p) => p.slug === s))
      .filter((p): p is NonNullable<typeof p> => Boolean(p));
  }, [activeSlugs]);

  function shareWishlist() {
    const url = `${window.location.origin}/saved/?items=${slugs.join(",")}`;
    if (navigator.share) {
      navigator.share({ title: "My cozy wishlist", url }).catch(() => {
        navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
      });
    } else {
      navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  }

  if (!hydrated) return <div className="py-24" aria-hidden />;

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center gap-5 py-20 text-center">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-pink/15 text-pink">
          <Heart size={30} />
        </span>
        <h1 className="text-2xl font-extrabold text-heading">
          {sharedSlugs ? "This shared list is empty" : "No saved packs yet"}
        </h1>
        <p className="max-w-md text-body">
          Tap the ♡ on any pack to keep it here — no account needed, it lives in
          your browser.
        </p>
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 rounded-full bg-accent-gradient px-6 py-3 text-sm font-bold text-base shadow-glow"
        >
          Browse the shop <ArrowRight size={16} />
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-heading">
            {sharedSlugs ? "A shared cozy wishlist" : "Your saved packs"}
          </h1>
          <p className="mt-1 text-sm text-muted">
            {products.length} pack{products.length === 1 ? "" : "s"}
            {sharedSlugs ? " · shared with you" : " · saved in this browser"}
          </p>
        </div>
        {!sharedSlugs && (
          <button
            type="button"
            onClick={shareWishlist}
            className="inline-flex items-center gap-2 rounded-full border border-subtle bg-white/5 px-5 py-2.5 text-sm font-bold text-heading hover:border-lavender/50"
          >
            {copied ? <Check size={15} className="text-warm" /> : <Share2 size={15} />}
            {copied ? "Link copied!" : "Share my wishlist"}
          </button>
        )}
      </div>

      <div className="mt-8">
        <ProductGrid products={products} showFilters={false} />
      </div>
    </div>
  );
}
