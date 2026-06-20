/**
 * Bulk-upload deliverable files (.pdf/.zip) to storage and publish the packs.
 *
 *   npm run upload:files -- ./path/to/files
 *
 * For each file in the folder it:
 *   1. uploads it to storage under packs/<filename>
 *   2. finds the matching Product (by existing fileKey, or by slug == filename)
 *   3. sets fileKey, needsFile=false, active=true  → the pack goes live
 *
 * Requires storage env vars (STORAGE_ENDPOINT/BUCKET/ACCESS_KEY_ID/SECRET).
 * Files whose name doesn't match any product are reported, not uploaded blindly.
 */

import { PrismaClient } from "@prisma/client";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { readFileSync, readdirSync, existsSync } from "fs";
import { resolve, basename, extname } from "path";

// ── Load .env (tsx doesn't auto-load it) ─────────────────────────────────────
function loadEnv() {
  const envPath = resolve(process.cwd(), ".env");
  if (!existsSync(envPath)) return;
  for (const line of readFileSync(envPath, "utf8").split("\n")) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
    if (!m) continue;
    const key = m[1];
    let val = m[2].trim();
    if (
      (val.startsWith('"') && val.endsWith('"')) ||
      (val.startsWith("'") && val.endsWith("'"))
    ) {
      val = val.slice(1, -1);
    }
    if (!(key in process.env)) process.env[key] = val;
  }
}
loadEnv();

const prisma = new PrismaClient();

function contentTypeFor(ext: string): string {
  return ext.toLowerCase() === ".pdf" ? "application/pdf" : "application/zip";
}

function slugFromFile(fileName: string): string {
  return basename(fileName, extname(fileName)).toLowerCase();
}

async function main() {
  const folder = process.argv[2];
  if (!folder) {
    console.error("Usage: npm run upload:files -- <folder>");
    process.exit(1);
  }

  const endpoint = process.env.STORAGE_ENDPOINT;
  const bucket = process.env.STORAGE_BUCKET;
  const accessKeyId = process.env.STORAGE_ACCESS_KEY_ID;
  const secretAccessKey = process.env.STORAGE_SECRET_ACCESS_KEY;
  if (!endpoint || !bucket || !accessKeyId || !secretAccessKey) {
    console.error(
      "Storage is not configured. Set STORAGE_ENDPOINT, STORAGE_BUCKET, " +
        "STORAGE_ACCESS_KEY_ID and STORAGE_SECRET_ACCESS_KEY in .env first.",
    );
    process.exit(1);
  }

  const s3 = new S3Client({
    region: process.env.STORAGE_REGION || "auto",
    endpoint,
    forcePathStyle: true,
    credentials: { accessKeyId, secretAccessKey },
  });

  const dir = resolve(folder);
  const files = readdirSync(dir).filter((f) => /\.(pdf|zip)$/i.test(f));
  if (files.length === 0) {
    console.error(`No .pdf or .zip files found in ${dir}`);
    process.exit(1);
  }

  console.log(`📤 Uploading ${files.length} file(s) from ${dir}…`);

  let uploaded = 0;
  let linked = 0;
  const unmatched: string[] = [];

  for (const fileName of files) {
    const key = `packs/${fileName}`;
    const ext = extname(fileName);
    const body = readFileSync(resolve(dir, fileName));

    // Match a product first so we never upload an orphan file.
    const slug = slugFromFile(fileName);
    const product = await prisma.product.findFirst({
      where: { OR: [{ fileKey: key }, { slug }] },
    });

    if (!product) {
      unmatched.push(fileName);
      continue;
    }

    await s3.send(
      new PutObjectCommand({
        Bucket: bucket,
        Key: key,
        Body: body,
        ContentType: contentTypeFor(ext),
      }),
    );
    uploaded++;

    await prisma.product.update({
      where: { id: product.id },
      data: { fileKey: key, needsFile: false, active: true },
    });
    linked++;
    console.log(`   ✓ ${fileName} → ${product.name} (live)`);
  }

  console.log(`\n✅ Uploaded ${uploaded}, linked & published ${linked}.`);
  if (unmatched.length) {
    console.log(
      `\n⚠️  ${unmatched.length} file(s) had no matching product (name must equal the slug). Not uploaded:`,
    );
    unmatched.forEach((f) => console.log(`   - ${f}`));
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
