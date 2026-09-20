/**
 * Core Etsy sync logic - runs a full paginated upsert from the shop's active listings.
 * Called by both /api/etsy/sync (admin-triggered) and /api/cron/etsy-sync (Vercel Cron).
 */

import { prisma } from "@/lib/db";
import { decrypt, encrypt } from "@/lib/encrypt";
import {
  getShopListings,
  refreshEtsyTokens,
  mapEtsyCategory,
  slugFromTitle,
  etsyPriceToCents,
  type EtsyListing,
} from "@/lib/etsy";
import { revalidatePath } from "next/cache";

async function getValidAccessToken(): Promise<string> {
  const auth = await prisma.etsyAuth.findFirst();
  if (!auth) throw new Error("No Etsy credentials. Connect Etsy first (/admin/etsy).");

  if (auth.accessTokenExpiresAt.getTime() - Date.now() < 5 * 60 * 1000) {
    const tokens = await refreshEtsyTokens(decrypt(auth.refreshToken));
    const expiresAt = new Date(Date.now() + tokens.expires_in * 1000);
    await prisma.etsyAuth.update({
      where: { id: auth.id },
      data: {
        accessToken: encrypt(tokens.access_token),
        refreshToken: encrypt(tokens.refresh_token),
        accessTokenExpiresAt: expiresAt,
      },
    });
    return tokens.access_token;
  }

  return decrypt(auth.accessToken);
}

async function upsertListing(listing: EtsyListing) {
  const etsyId = String(listing.listing_id);
  const name = listing.title.trim();
  const slug = slugFromTitle(name);
  const category = mapEtsyCategory(listing.tags, listing.taxonomy_path ?? []);
  const priceCents = etsyPriceToCents(listing.price);
  const image =
    listing.images?.[0]?.url_570xN ?? listing.images?.[0]?.url_fullxfull ?? "";
  const description = listing.description?.slice(0, 2000) ?? "";

  const existing = await prisma.product.findFirst({
    where: { OR: [{ etsyListingId: etsyId }, { slug }] },
  });

  if (existing) {
    await prisma.product.update({
      where: { id: existing.id },
      data: {
        name,
        category,
        priceCents,
        image: image || existing.image,
        description: description || existing.description,
        etsyListingId: etsyId,
        etsyUrl: listing.url,
        source: "etsy",
        needsFile: !existing.fileKey,
      },
    });
  } else {
    const slugTaken = await prisma.product.findUnique({ where: { slug } });
    const finalSlug = slugTaken ? `${slug}-${etsyId.slice(-4)}` : slug;

    await prisma.product.create({
      data: {
        name,
        slug: finalSlug,
        category,
        description,
        priceCents,
        currency: listing.price.currency_code ?? "USD",
        image,
        features: "[]",
        fileKey: "",
        source: "etsy",
        etsyListingId: etsyId,
        etsyUrl: listing.url,
        needsFile: true,
        active: false, // hidden until the owner attaches the .zip
      },
    });
  }
}

export interface SyncResult {
  upserted: number;
  errors: number;
  logId: string;
}

export async function runEtsySync(): Promise<SyncResult> {
  const log = await prisma.etsySyncLog.create({ data: {} });
  let upserted = 0;
  let errors = 0;

  try {
    const accessToken = await getValidAccessToken();
    const auth = await prisma.etsyAuth.findFirst();
    const shopId = auth!.shopId;

    let offset = 0;
    while (true) {
      const page = await getShopListings(shopId, accessToken, offset);
      for (const listing of page.results) {
        try {
          await upsertListing(listing);
          upserted++;
        } catch (e) {
          console.error("Etsy upsert error listing", listing.listing_id, e);
          errors++;
        }
      }
      if (page.results.length < 100) break;
      offset += 100;
    }

    await prisma.etsySyncLog.update({
      where: { id: log.id },
      data: { status: "success", finishedAt: new Date(), upserted, errors },
    });
    revalidatePath("/shop");
    revalidatePath("/");
  } catch (e) {
    const message = e instanceof Error ? e.message : String(e);
    await prisma.etsySyncLog.update({
      where: { id: log.id },
      data: { status: "error", finishedAt: new Date(), message },
    });
    throw e;
  }

  return { upserted, errors, logId: log.id };
}
