import { prisma } from "@/lib/db";
import type { Product as PrismaProduct } from "@prisma/client";

/** UI-facing product shape (features deserialized, price kept as cents). */
export interface ProductDTO {
  id: string;
  slug: string;
  name: string;
  category: string;
  description: string;
  priceCents: number;
  currency: string;
  image: string;
  video: string | null;
  features: string[];
  bestseller: boolean;
}

export function toProductDTO(p: PrismaProduct): ProductDTO {
  let features: string[] = [];
  try {
    const parsed = JSON.parse(p.features);
    if (Array.isArray(parsed)) features = parsed.map(String);
  } catch {
    features = [];
  }
  return {
    id: p.id,
    slug: p.slug,
    name: p.name,
    category: p.category,
    description: p.description,
    priceCents: p.priceCents,
    currency: p.currency,
    image: p.image,
    video: p.video,
    features,
    bestseller: p.bestseller,
  };
}

export async function getAllProducts(): Promise<ProductDTO[]> {
  const products = await prisma.product.findMany({
    // Only active packs that have a deliverable file attached are buyable.
    where: { active: true, needsFile: false },
    orderBy: [
      { sortOrder: "asc" },
      { featured: "desc" },
      { bestseller: "desc" },
      { createdAt: "asc" },
    ],
  });
  return products.map(toProductDTO);
}

/** A limited set for the homepage featured section (prefers featured/bestseller). */
export async function getFeaturedProducts(limit = 8): Promise<ProductDTO[]> {
  const products = await prisma.product.findMany({
    where: { active: true, needsFile: false },
    orderBy: [
      { featured: "desc" },
      { bestseller: "desc" },
      { sortOrder: "asc" },
      { createdAt: "asc" },
    ],
    take: limit,
  });
  return products.map(toProductDTO);
}

export async function getProductBySlug(
  slug: string,
): Promise<ProductDTO | null> {
  const p = await prisma.product.findUnique({ where: { slug } });
  return p ? toProductDTO(p) : null;
}

/** Fetch products for a set of slugs, returned in DB order (used by checkout).
 *  Only buyable packs (active + file attached) are returned. */
export async function getProductsBySlugs(slugs: string[]) {
  return prisma.product.findMany({
    where: { slug: { in: slugs }, active: true, needsFile: false },
  });
}
