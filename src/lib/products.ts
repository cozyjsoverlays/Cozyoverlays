import { PACKS } from "@/data/packs";
import rssPacks from "@/data/rss-packs.json";
import type { Pack } from "@/lib/types";
import { packTags } from "@/lib/seo";

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

  /**
   * Combine two records of the same product. Neither source is complete: the
   * store sync carries the exact listing link, while the CSV export carries the
   * real title, description, tags and full photo gallery. Take the best of each
   * rather than discarding a copy.
   */
  const combine = (a: Pack, b: Pack): Pack => ({
    ...a,
    ...b,
    // Keep whichever actually deep-links to the listing.
    etsy: listingId(a.etsy) ? a.etsy : b.etsy,
    // Prefer richer content wherever one side has it.
    title: a.title ?? b.title,
    details: a.details ?? b.details,
    tags: a.tags?.length ? a.tags : b.tags,
    images: (a.images?.length ?? 0) >= (b.images?.length ?? 0) ? a.images : b.images,
    compareAt: a.compareAt ?? b.compareAt,
    isNew: a.isNew || b.isNew,
    bestseller: a.bestseller || b.bestseller,
  });

  for (const pack of merged) {
    const id = listingId(pack.etsy);
    const img = imageKey(pack.image);
    const rivalSlug =
      (id && byId.get(id)) || (img && byImg.get(img)) || (bySlug.has(pack.slug) ? pack.slug : null);

    if (rivalSlug) {
      const rival = bySlug.get(rivalSlug);
      if (rival) {
        // Same product seen twice — fold the two records together under the
        // incumbent's slug (it was first, so links to it already exist).
        bySlug.set(rivalSlug, { ...combine(rival, pack), slug: rival.slug });
        if (id) byId.set(id, rivalSlug);
        if (img) byImg.set(img, rivalSlug);
        continue;
      }
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
  /** Full Etsy listing title (keyword-rich) for SEO metadata. */
  title: string;
  category: string;
  description: string;
  /** Full listing description from Etsy. */
  details: string | null;
  /** Seller's own Etsy tags. */
  tags: string[];
  priceCents: number;
  /** Original price in cents when the pack is on sale (strikethrough framing). */
  compareAtCents: number | null;
  currency: string;
  image: string;
  /** All listing photos, first is the cover. */
  images: string[];
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

/**
 * Packs synced from the RSS feed arrive with only a name, price and cover
 * photo — the feed carries nothing else. Rather than leaving those pages thin,
 * fall back to what is genuinely true of every pack in this shop: the delivery
 * method and the file formats. No pack-specific claims are invented.
 */
function standardDetails(p: Pack): string {
  const assets = p.features.length
    ? p.features.join(", ")
    : "animated screens, alerts and panels";
  return [
    `${p.name} — a cozy animated set for Twitch, YouTube, Kick and TikTok.`,
    "",
    "INSTANT DIGITAL DOWNLOAD",
    "This is a digital product — nothing physical will be shipped.",
    "When you purchase, you receive a PDF containing a direct link to a Google Drive folder with the complete package.",
    "",
    "Package includes",
    `✅ ${assets}`,
    "✅ Animated files as transparent .WEBM (loop-ready)",
    "✅ Static .PNG versions included",
    "✅ Sized for Twitch, YouTube, Kick and TikTok",
    "✅ Works with OBS Studio, Streamlabs and StreamElements",
    "",
    "Licensed for personal use on your own channels. Resale or redistribution is not permitted.",
  ].join("\n");
}

function packToDTO(p: Pack): ProductDTO {
  return {
    id: p.slug,
    slug: p.slug,
    name: p.name,
    title: p.title ?? p.name,
    category: p.category,
    description: p.description,
    details: p.details ?? standardDetails(p),
    tags: p.tags?.length ? p.tags : packTags(p.name, p.category),
    priceCents: priceToCents(p.price),
    compareAtCents: p.compareAt ? priceToCents(p.compareAt) : null,
    currency: "USD",
    image: p.image,
    images: p.images?.length ? p.images : [p.image],
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
