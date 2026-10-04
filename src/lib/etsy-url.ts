/**
 * Every Etsy link on the site must go through the shop's own subdomain
 * (cozyjsstudio.etsy.com) rather than www.etsy.com, so the visit is credited
 * to the shop. The destination is identical - only the host changes:
 *
 *   https://www.etsy.com/listing/123/slug  ->  https://cozyjsstudio.etsy.com/listing/123/slug
 *
 * This runs over every product link, so a www.etsy.com URL can never reach the
 * page even if one slips into the data later.
 */

export const ETSY_SHOP_HOST = "cozyjsstudio.etsy.com";

export function affiliateEtsyUrl(url: string | null | undefined): string | null {
  if (!url) return null;
  const trimmed = url.trim();
  if (!trimmed) return null;

  // Already on the shop subdomain.
  if (trimmed.includes(`${ETSY_SHOP_HOST}`)) return trimmed;

  // www.etsy.com / etsy.com -> the shop subdomain, path and query untouched.
  // A /shop/CozyJsStudio prefix is dropped because the subdomain IS the shop.
  return trimmed.replace(
    /^https?:\/\/(?:www\.)?etsy\.com(?:\/shop\/CozyJsStudio)?/i,
    `https://${ETSY_SHOP_HOST}`,
  );
}
