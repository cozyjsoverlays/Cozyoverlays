import { S3Client, GetObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { env, isStorageConfigured } from "@/lib/env";

/**
 * Storage abstraction. Swap the implementation (S3/R2 → GCS, Backblaze, etc.)
 * without touching the rest of the app. We only ever hand out short-lived
 * signed URLs - permanent public file URLs are never exposed.
 */
export interface StorageProvider {
  /** Mint a presigned GET URL for `key`, valid for `expiresInSeconds`. */
  getSignedDownloadUrl(key: string, expiresInSeconds?: number): Promise<string>;
  /** Mint a presigned PUT URL for direct browser-to-storage uploads. */
  getSignedUploadUrl(
    key: string,
    contentType: string,
    expiresInSeconds?: number,
  ): Promise<string>;
  readonly isReal: boolean;
}

const DEFAULT_TTL = 60; // seconds - deliberately short; minted per download request.

class S3StorageProvider implements StorageProvider {
  readonly isReal = true;
  private client: S3Client;

  constructor() {
    this.client = new S3Client({
      region: env.storageRegion,
      endpoint: env.storageEndpoint,
      // R2 and most S3-compatible providers require path-style addressing.
      forcePathStyle: true,
      credentials: {
        accessKeyId: env.storageAccessKeyId!,
        secretAccessKey: env.storageSecretAccessKey!,
      },
    });
  }

  async getSignedDownloadUrl(
    key: string,
    expiresInSeconds = DEFAULT_TTL,
  ): Promise<string> {
    const command = new GetObjectCommand({ Bucket: env.storageBucket!, Key: key });
    return getSignedUrl(this.client, command, { expiresIn: expiresInSeconds });
  }

  async getSignedUploadUrl(
    key: string,
    contentType: string,
    expiresInSeconds = 300,
  ): Promise<string> {
    const command = new PutObjectCommand({
      Bucket: env.storageBucket!,
      Key: key,
      ContentType: contentType,
    });
    return getSignedUrl(this.client, command, { expiresIn: expiresInSeconds });
  }
}

/**
 * Dev/stub provider used when storage env vars are absent. It returns a clearly
 * fake placeholder URL so the rest of the flow (orders, tokens, emails) can be
 * exercised locally without real cloud storage.
 */
class StubStorageProvider implements StorageProvider {
  readonly isReal = false;
  async getSignedDownloadUrl(key: string): Promise<string> {
    return `${env.siteUrl}/api/download/stub?key=${encodeURIComponent(key)}`;
  }
  async getSignedUploadUrl(key: string): Promise<string> {
    return `${env.siteUrl}/api/admin/upload/stub?key=${encodeURIComponent(key)}`;
  }
}

let provider: StorageProvider | null = null;

export function getStorage(): StorageProvider {
  if (!provider) {
    provider = isStorageConfigured
      ? new S3StorageProvider()
      : new StubStorageProvider();
  }
  return provider;
}
