/**
 * AES-256-GCM symmetric encryption for sensitive values stored in the database
 * (Etsy OAuth tokens). Requires TOKEN_ENCRYPTION_KEY env var: 64 hex chars (32 bytes).
 * Falls back to a deterministic dev key - insecure, only for local testing.
 */
import crypto from "crypto";

const ALGO = "aes-256-gcm" as const;

function getKey(): Buffer {
  const hex = process.env.TOKEN_ENCRYPTION_KEY ?? "";
  if (hex.length === 64) return Buffer.from(hex, "hex");
  // Dev fallback - not secure; warns loudly in logs
  if (process.env.NODE_ENV === "production") {
    throw new Error("TOKEN_ENCRYPTION_KEY must be set in production (64 hex chars).");
  }
  return crypto.createHash("sha256").update("dev-insecure-encryption-key").digest();
}

/** Encrypt `plaintext`. Returns a compact `iv.ciphertext.tag` base64url string. */
export function encrypt(plaintext: string): string {
  const key = getKey();
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv(ALGO, key, iv);
  const encrypted = Buffer.concat([cipher.update(plaintext, "utf8"), cipher.final()]);
  const tag = cipher.getAuthTag();
  return [iv, encrypted, tag].map((b) => b.toString("base64url")).join(".");
}

/** Decrypt a value produced by `encrypt`. Throws on tamper/bad key. */
export function decrypt(ciphertext: string): string {
  const key = getKey();
  const parts = ciphertext.split(".");
  if (parts.length !== 3) throw new Error("Invalid encrypted value");
  const [ivB64, encB64, tagB64] = parts;
  const iv = Buffer.from(ivB64, "base64url");
  const enc = Buffer.from(encB64, "base64url");
  const tag = Buffer.from(tagB64, "base64url");
  const decipher = crypto.createDecipheriv(ALGO, key, iv);
  decipher.setAuthTag(tag);
  return decipher.update(enc).toString("utf8") + decipher.final("utf8");
}
