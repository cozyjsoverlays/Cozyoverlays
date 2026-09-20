/**
 * Etsy Open API v3 client.
 *
 * Status (as of mid-2025): Etsy v3 is generally available but new app
 * approvals are selective - apply at https://www.etsy.com/developers/register.
 * Rate limits: 10,000 req/day, 10 req/sec. Paginate with offset+limit.
 * This module is entirely optional; all callers check isEtsyConfigured first.
 */

import { env } from "@/lib/env";

const BASE = "https://openapi.etsy.com/v3";

export interface EtsyListingImage {
  listing_image_id: number;
  url_fullxfull: string;
  url_570xN: string;
  rank: number;
}

export interface EtsyListing {
  listing_id: number;
  title: string;
  description: string;
  price: { amount: number; divisor: number; currency_code: string };
  url: string;
  state: string;
  images: EtsyListingImage[];
  tags: string[];
  taxonomy_path: string[];
}

export interface EtsyTokenResponse {
  access_token: string;
  refresh_token: string;
  expires_in: number; // seconds
  token_type: string;
}

async function etsyFetch(
  path: string,
  accessToken: string,
  options: RequestInit = {},
): Promise<Response> {
  return fetch(`${BASE}${path}`, {
    ...options,
    headers: {
      "x-api-key": env.etsyClientId ?? "",
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
      ...(options.headers ?? {}),
    },
  });
}

export async function getShopListings(
  shopId: string,
  accessToken: string,
  offset = 0,
): Promise<{ results: EtsyListing[]; count: number }> {
  const res = await etsyFetch(
    `/application/shops/${shopId}/listings/active?limit=100&offset=${offset}&includes[]=Images`,
    accessToken,
  );

  if (res.status === 429) {
    const retryAfter = parseInt(res.headers.get("retry-after") ?? "60", 10);
    throw Object.assign(new Error("Etsy rate limited"), { retryAfter });
  }
  if (!res.ok) {
    throw new Error(`Etsy API ${res.status}: ${await res.text()}`);
  }
  return res.json() as Promise<{ results: EtsyListing[]; count: number }>;
}

export async function refreshEtsyTokens(refreshToken: string): Promise<EtsyTokenResponse> {
  const res = await fetch("https://api.etsy.com/v3/public/oauth/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      client_id: env.etsyClientId ?? "",
      refresh_token: refreshToken,
    }),
  });
  if (!res.ok) throw new Error(`Etsy token refresh ${res.status}: ${await res.text()}`);
  return res.json() as Promise<EtsyTokenResponse>;
}

// ── Category mapping ─────────────────────────────────────────────────────────

const CATEGORY_KEYWORDS: Array<[string[], string]> = [
  [["cat", "kitty", "kitten", "neko"], "cat"],
  [["dragon"], "dragon"],
  [["fox", "kitsune"], "fox"],
  [["bear", "panda"], "bear"],
  [["japanese", "japan", "anime", "kawaii", "sakura"], "japanese"],
  [["frog", "toad"], "frog"],
];

export function mapEtsyCategory(tags: string[], taxonomyPath: string[]): string {
  const haystack = [...tags, ...taxonomyPath].join(" ").toLowerCase();
  for (const [keywords, cat] of CATEGORY_KEYWORDS) {
    if (keywords.some((k) => haystack.includes(k))) return cat;
  }
  return "other";
}

export function slugFromTitle(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 60);
}

export function etsyPriceToCents(price: EtsyListing["price"]): number {
  return Math.round((price.amount / price.divisor) * 100);
}
