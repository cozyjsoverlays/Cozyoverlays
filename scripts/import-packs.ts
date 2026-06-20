/**
 * Bulk-import packs from a CSV into the Product table.
 *
 *   npm run import:packs -- ./scripts/packs-template.csv
 *
 * Columns (header row, case-insensitive). Only `name` and `price` are required:
 *   name        Pack title (required)
 *   price       e.g. "24.00" or "$24.99" (required)
 *   slug        URL slug — auto-generated from name if blank
 *   category    cat|dragon|fox|bear|japanese|frog|other  (default: other)
 *   description Short description
 *   image       Public preview image URL
 *   video       Public preview video URL (optional)
 *   features    Pipe-separated, e.g. "Animated Screens|Alerts|Panels"
 *   file        Deliverable filename, e.g. "cat-forest.pdf" (lives under packs/)
 *   featured    true|false
 *   bestseller  true|false
 *   sortorder   integer (default: row order)
 *
 * Packs stay HIDDEN (needsFile=true) until their file is confirmed uploaded by
 * `npm run upload:files` — so importing never publishes an undeliverable pack.
 */

import { PrismaClient } from "@prisma/client";
import { readFileSync } from "fs";
import { resolve } from "path";
import { parseCsvToObjects } from "./lib/csv";

const prisma = new PrismaClient();

const VALID_CATEGORIES = [
  "cat",
  "dragon",
  "fox",
  "bear",
  "japanese",
  "frog",
  "other",
];

function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 60);
}

function priceToCents(raw: string): number | null {
  const cleaned = raw.replace(/[^0-9.]/g, "");
  if (!cleaned) return null;
  const value = parseFloat(cleaned);
  if (isNaN(value) || value <= 0) return null;
  return Math.round(value * 100);
}

function bool(raw: string | undefined): boolean {
  return /^(true|yes|1|y)$/i.test((raw ?? "").trim());
}

async function main() {
  const file = process.argv[2];
  if (!file) {
    console.error("Usage: npm run import:packs -- <path-to-csv>");
    process.exit(1);
  }

  const csv = readFileSync(resolve(file), "utf8");
  const rows = parseCsvToObjects(csv);
  if (rows.length === 0) {
    console.error("No data rows found in CSV.");
    process.exit(1);
  }

  console.log(`📦 Importing ${rows.length} rows from ${file}…`);

  let created = 0;
  let updated = 0;
  let skipped = 0;
  const warnings: string[] = [];
  const seenSlugs = new Set<string>();

  for (let i = 0; i < rows.length; i++) {
    const r = rows[i];
    const rowNum = i + 2; // +1 header, +1 to 1-index

    const name = r.name?.trim();
    if (!name) {
      warnings.push(`Row ${rowNum}: missing name — skipped.`);
      skipped++;
      continue;
    }

    const cents = priceToCents(r.price ?? "");
    if (cents === null) {
      warnings.push(`Row ${rowNum} (${name}): invalid price "${r.price}" — skipped.`);
      skipped++;
      continue;
    }

    let slug = r.slug?.trim() || slugify(name);
    if (seenSlugs.has(slug)) {
      warnings.push(`Row ${rowNum} (${name}): duplicate slug "${slug}" in file — appended suffix.`);
      slug = `${slug}-${i}`;
    }
    seenSlugs.add(slug);

    let category = (r.category || "other").toLowerCase().trim();
    if (!VALID_CATEGORIES.includes(category)) {
      warnings.push(`Row ${rowNum} (${name}): unknown category "${category}" → "other".`);
      category = "other";
    }

    const features = (r.features || "")
      .split("|")
      .map((f) => f.trim())
      .filter(Boolean);

    const image = r.image?.trim() || "";
    if (!image) {
      warnings.push(`Row ${rowNum} (${name}): no image URL — pack will look empty until you add one.`);
    }

    // Intended deliverable key, if a filename was supplied. The pack stays
    // hidden (needsFile=true) until upload:files confirms the file exists.
    const fileName = r.file?.trim();
    const fileKey = fileName
      ? fileName.startsWith("packs/")
        ? fileName
        : `packs/${fileName}`
      : "";

    const sortOrder = parseInt(r.sortorder ?? "", 10);

    const data = {
      name,
      category,
      description: r.description?.trim() || name,
      priceCents: cents,
      currency: "USD",
      image,
      video: r.video?.trim() || null,
      features: JSON.stringify(features),
      fileKey,
      source: "manual",
      needsFile: true, // flipped to false by upload:files once the file lands
      active: false, // published after the file is attached
      featured: bool(r.featured),
      bestseller: bool(r.bestseller),
      sortOrder: isNaN(sortOrder) ? i : sortOrder,
    };

    const existing = await prisma.product.findUnique({ where: { slug } });
    if (existing) {
      await prisma.product.update({ where: { slug }, data });
      updated++;
    } else {
      await prisma.product.create({ data: { slug, ...data } });
      created++;
    }
  }

  console.log(`\n✅ Done: ${created} created, ${updated} updated, ${skipped} skipped.`);
  if (warnings.length) {
    console.log(`\n⚠️  ${warnings.length} warning(s):`);
    warnings.forEach((w) => console.log(`   - ${w}`));
  }
  console.log(
    `\nNext: run "npm run upload:files -- <folder>" to upload the PDFs and publish each pack.`,
  );
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
