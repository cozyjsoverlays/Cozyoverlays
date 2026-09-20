/**
 * Centralized, typed environment access.
 *
 * We deliberately do NOT throw at module-import time for missing secrets - that
 * would break `next build` and local dev when, say, PayPal isn't configured yet.
 * Instead each feature exposes a `config`/`isConfigured` pair and only throws
 * when the feature is actually invoked without the keys it needs.
 *
 * Anything not prefixed NEXT_PUBLIC_ is server-only and must never be imported
 * into a client component.
 */

const optional = (v: string | undefined): string | undefined =>
  v && v.length > 0 ? v : undefined;

export const env = {
  // Public (safe in the browser bundle)
  paypalClientId: optional(process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID),
  siteUrl:
    optional(process.env.NEXT_PUBLIC_SITE_URL) ?? "http://localhost:3000",

  // PayPal (server)
  paypalSecret: optional(process.env.PAYPAL_CLIENT_SECRET),
  paypalEnv: (optional(process.env.PAYPAL_ENV) ?? "sandbox") as
    | "sandbox"
    | "live",

  // Email
  resendApiKey: optional(process.env.RESEND_API_KEY),
  emailFrom: optional(process.env.EMAIL_FROM) ?? "CozyOverlays <onboarding@resend.dev>",

  // Storage
  storageEndpoint: optional(process.env.STORAGE_ENDPOINT),
  storageBucket: optional(process.env.STORAGE_BUCKET),
  storageAccessKeyId: optional(process.env.STORAGE_ACCESS_KEY_ID),
  storageSecretAccessKey: optional(process.env.STORAGE_SECRET_ACCESS_KEY),
  storageRegion: optional(process.env.STORAGE_REGION) ?? "auto",

  // Security
  downloadTokenSecret:
    optional(process.env.DOWNLOAD_TOKEN_SECRET) ??
    "dev-insecure-download-secret-change-me",
  adminPassword: optional(process.env.ADMIN_PASSWORD),
  sessionSecret: optional(process.env.SESSION_SECRET),
  cronSecret: optional(process.env.CRON_SECRET),

  // Etsy (optional - only used when isEtsyConfigured is true)
  etsyClientId: optional(process.env.ETSY_CLIENT_ID),
  etsyClientSecret: optional(process.env.ETSY_CLIENT_SECRET),
  etsyShopId: optional(process.env.ETSY_SHOP_ID),
  etsyRedirectUri: optional(process.env.ETSY_REDIRECT_URI),
  etsyOauthScopes: optional(process.env.ETSY_OAUTH_SCOPES) ?? "listings_r",
};

export const isPayPalConfigured = Boolean(env.paypalClientId && env.paypalSecret);
export const isResendConfigured = Boolean(env.resendApiKey);
export const isStorageConfigured = Boolean(
  env.storageEndpoint &&
    env.storageBucket &&
    env.storageAccessKeyId &&
    env.storageSecretAccessKey,
);
export const isEtsyConfigured = Boolean(
  env.etsyClientId && env.etsyClientSecret && env.etsyShopId,
);

/** Throw a clear error when a required server feature is used unconfigured. */
export function assertConfigured(
  ok: boolean,
  feature: string,
  keys: string[],
): void {
  if (!ok) {
    throw new Error(
      `${feature} is not configured. Set the following env var(s): ${keys.join(", ")}.`,
    );
  }
}
