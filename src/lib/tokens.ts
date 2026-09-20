import { createHmac, randomBytes, timingSafeEqual } from "crypto";
import { env } from "@/lib/env";

/**
 * Download tokens are opaque, HMAC-signed strings of the form `<id>.<sig>`.
 *
 * - `id` is high-entropy random (so tokens are unguessable).
 * - `sig` is HMAC-SHA256(id) using DOWNLOAD_TOKEN_SECRET, so a token that
 *   wasn't minted by us is rejected before we ever touch the database.
 *
 * The DB row (DownloadToken) holds the authoritative expiry, download cap, and
 * order linkage - the signature is just a cheap first gate.
 */

function sign(id: string): string {
  return createHmac("sha256", env.downloadTokenSecret)
    .update(id)
    .digest("base64url");
}

export function createDownloadToken(): { token: string; id: string } {
  const id = randomBytes(24).toString("base64url");
  const sig = sign(id);
  return { token: `${id}.${sig}`, id };
}

/** Verify signature only (not expiry/limits - those are DB-enforced). */
export function verifyTokenSignature(token: string): boolean {
  const dot = token.lastIndexOf(".");
  if (dot <= 0) return false;
  const id = token.slice(0, dot);
  const sig = token.slice(dot + 1);
  const expected = sign(id);
  const a = Buffer.from(sig);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}
