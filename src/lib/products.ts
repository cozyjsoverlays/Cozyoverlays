import { PACKS } from "@/data/packs";
import rssPacks from "@/data/rss-packs.json";
import type { Pack } from "@/lib/types";

/** Etsy listing id from a pack's buy URL (null when it falls back to the shop). */
function listingId(etsy?: string): string | null {
  const m = (etsy || "").match(/\/listing\/(\d+)/);
  return m ? m[1] : null;
}

/**
 * Full catalog = the CSV-generated PACKS plus newest listings auto-synced from
 * the Etsy RSS feed (src/data/rss-packs.json, updated monthly by
 * scripts/sync-rss.mjs). CSV packs win on any duplicate slug or listing id;
 * new RSS packs are shown first.
 */
/** Etsy image fingerprint — the numeric asset id identifies the same artwork
 *  even when the URL size/hash segments differ. */
function imageKey(image?: string): string | null {
  const m = (image || "").match(/\/(\d{9,})\//);
  return m ? m[1] : null;
}

const ALL_PACKS: Pack[] = (() => {
  // Merge CSV + RSS-synced packs, then collapse entries that are really the
  // same product. The same pack can arrive twice — once from the CSV export
  // (long truncated slug, often no deep-link) and once from the store sync
  // (clean slug + exact listing URL) — so dedupe on slug, listing id AND
  // artwork, keeping whichever entry actually deep-links to its listing.
  const merged = [...(rssPacks as Pack[]), ...PACKS];
  const bySlug = new Map<string, Pack>();
  const byId = new Map<string, string>(); // listing id -> winning slug
  const byImg = new Map<string, string>(); // artwork  -> winning slug

  for (const pack of merged) {
    const id = listingId(pack.etsy);
    const img = imageKey(pack.image);
    const rivalSlug =
      (id && byId.get(id)) || (img && byImg.get(img)) || (bySlug.has(pack.slug) ? pack.slug : null);

    if (rivalSlug) {
      const rival = bySlug.get(rivalSlug);
      // Prefer the entry that deep-links; otherwise keep the incumbent.
      if (!rival || listingId(rival.etsy) || !id) continue;
      bySlug.delete(rivalSlug);
    }

    bySlug.set(pack.slug, pack);
    if (id) byId.set(id, pack.slug);
    if (img) byImg.set(img, pack.slug);
  }

  return [...bySlug.values()];
})();

/** UI-facing product shape (features deserialized, price kept as cents). */
export interface ProductDTO {
  id: string;
  slug: string;
  name: string;
  category: string;
  description: string;
  priceCents: number;
  /** Original price in cents when the pack is on sale (strikethrough framing). */
  compareAtCents: number | null;
  currency: string;
  image: string;
  video: string | null;
  features: string[];
  bestseller: boolean;
  isNew: boolean;
  etsyUrl: string | null;
}

/**
 * The storefront reads from the STATIC catalog in `src/data/packs.ts`. The site
 * is a static export that sells on Etsy, so there's no database or server — it
 * deploys as plain files on any host.
 */

/** Parse a display price like "$24.00" / "24" into integer cents. */
function priceToCents(price: string): number {
  const n = parseFloat(price.replace(/[^0-9.]/g, ""));
  return Number.isFinite(n) ? Math.round(n * 100) : 0;
}

function packToDTO(p: Pack): ProductDTO {
  return {
    id: p.slug,
    slug: p.slug,
    name: p.name,
    category: p.category,
    description: p.description,
    priceCents: priceToCents(p.price),
    compareAtCents: p.compareAt ? priceToCents(p.compareAt) : null,
    currency: "USD",
    image: p.image,
    video: p.video ?? null,
    features: p.features,
    bestseller: p.bestseller ?? false,
    isNew: p.isNew ?? false,
    etsyUrl: p.etsy ?? null,
  };
}

/** The full merged catalog as raw Pack objects (CSV + RSS-synced). */
export function getCatalogPacks(): Pack[] {
  return ALL_PACKS;
}

export async function getAllProducts(): Promise<ProductDTO[]> {
  return ALL_PACKS.map(packToDTO);
}

/** Synchronous variant for client components (wishlist page etc.). */
export function getAllProductsSync(): ProductDTO[] {
  return ALL_PACKS.map(packToDTO);
}

/** A limited set for the homepage featured section (prefers bestsellers). */
export async function getFeaturedProducts(limit = 8): Promise<ProductDTO[]> {
  const sorted = [...ALL_PACKS].sort(
    (a, b) => Number(Boolean(b.bestseller)) - Number(Boolean(a.bestseller)),
  );
  return sorted.slice(0, limit).map(packToDTO);
}

export async function getProductBySlug(
  slug: string,
): Promise<ProductDTO | null> {
  const p = ALL_PACKS.find((x) => x.slug === slug);
  return p ? packToDTO(p) : null;
}
