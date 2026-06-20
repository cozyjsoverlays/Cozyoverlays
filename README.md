# 🐾 CozyOverlays.com

A standalone digital marketplace for **CozyJsStudio** — animated stream overlay
packs for Twitch, YouTube, Kick & TikTok. Customers buy directly on the site,
pay with **PayPal**, and get **instant, secure, expiring download links** by
email. Packs are managed entirely from a built-in `/admin` panel (no code edits,
no redeploys) with an **optional** Etsy import path.

## ✨ What's inside

- **Marketing storefront** — Awwwards-style landing page, filterable shop grid,
  product detail pages, hover video previews, lightbox.
- **Cart + checkout** — Zustand cart with drawer, PayPal Smart Buttons,
  server-authoritative pricing.
- **Secure delivery** — HMAC-signed, time-limited, download-count-limited links
  that proxy to short-TTL signed storage URLs (files are never public).
- **Admin panel** (`/admin`) — password login, full product CRUD, **direct .zip
  upload to R2/S3**, instant storefront revalidation, active/featured/bestseller
  flags and sort order.
- **Optional Etsy sync** (`/admin/etsy`) — OAuth2 (PKCE) import of your own
  listings, daily Vercel Cron refresh, graceful degradation when not configured.

## 🛠 Tech Stack

| Layer | Choice |
| --- | --- |
| Framework | Next.js 14 (App Router) + TypeScript |
| Styling | Tailwind CSS + Framer Motion |
| Payments | `@paypal/react-paypal-js` (client) + PayPal Orders v2 REST API (server) |
| Database | Prisma + SQLite (dev) → Postgres (prod, Neon/Supabase) |
| Storage | Cloudflare R2 / any S3-compatible (presigned URLs) |
| Email | Resend |
| Cart | Zustand (localStorage persisted) |
| Validation | Zod |

---

## 🚀 Local setup

```bash
# 1. Install dependencies
npm install

# 2. Create your env file and fill it in (see "What you must provide" below)
cp .env.example .env

# 3. Create the database and apply migrations
npm run db:migrate

# 4. Seed 12 demo packs + reviews
npm run db:seed

# 5. Start the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

The site runs **with no third-party credentials**: storage and email fall back
to console/stub implementations, so you can exercise the entire purchase flow
locally. (PayPal needs at least sandbox keys to render the buttons — see below.)

### Scripts

```bash
npm run dev         # dev server
npm run build       # prisma generate + next build
npm run start       # serve the production build
npm run lint        # ESLint
npm run db:migrate  # prisma migrate dev
npm run db:seed     # seed demo data
npm run db:studio   # open Prisma Studio
npm run db:reset    # drop + re-migrate + re-seed
```

---

## 🧑‍💼 The everyday workflow — adding a pack (no Etsy needed)

This is the primary, always-working path.

1. Go to **`/admin`** and sign in with `ADMIN_PASSWORD`.
2. Click **Add pack**.
3. Fill in name (slug auto-generates), category, price, description, and pick
   feature tags.
4. Paste a **preview image URL** (and optional preview video URL).
5. **Upload the pack `.zip`** — it uploads directly to your storage bucket via a
   signed URL, with a progress bar. The resulting `fileKey` is stored on the
   product.
6. Set flags (**Live**, Featured, Bestseller) and sort order, then **Create**.
7. The storefront updates **immediately** — `revalidatePath('/shop')` runs on
   save, so the pack appears without a redeploy.

> A pack with no `.zip` attached is marked **Needs file** and stays hidden from
> the shop until you attach one. This guarantees customers can never buy an
> undeliverable product.

Editing, hiding (toggle active), and deleting all work inline from the product
table and revalidate the storefront the same way.

### Bulk import (many packs at once)

For a large catalog, don't enter packs one-by-one — use the CSV pipeline.

1. **Fill the spreadsheet.** Copy [`scripts/packs-template.csv`](scripts/packs-template.csv)
   and add one row per pack. Columns (only `name` and `price` are required):

   | column | notes |
   | --- | --- |
   | `name` | pack title |
   | `price` | `24.00` or `$24.99` |
   | `category` | `cat`/`dragon`/`fox`/`bear`/`japanese`/`frog`/`other` |
   | `description` | quote it if it contains commas |
   | `image` | public preview image URL |
   | `video` | optional preview video URL |
   | `features` | pipe-separated: `Animated Screens\|Alerts\|Panels` |
   | `file` | deliverable filename, e.g. `cat-forest.pdf` |
   | `featured` / `bestseller` | `true`/`false` |
   | `sortorder` | integer (optional) |

2. **Import the metadata:**

   ```bash
   npm run import:packs -- ./your-packs.csv
   ```

   Every pack is created/updated but stays **hidden** (`needsFile=true`) so an
   undeliverable pack can never go live.

3. **Drop the deliverables in a folder** (filenames matching the `file` column
   or the slug, e.g. `cat-forest.pdf`) and upload + publish them all:

   ```bash
   npm run upload:files -- ./your-pdf-folder
   ```

   Each file uploads to storage, its pack's `fileKey` is set, and the pack goes
   **live** automatically. Files with no matching pack are reported, not uploaded.
   (Requires the `STORAGE_*` env vars.)

> The deliverable can be a **`.pdf` or a `.zip`** — both the admin upload and the
> bulk uploader accept either and set the correct content type.

---

## 🔐 Security model

- **PayPal secret is server-only.** Only the public client ID reaches the browser.
- **Totals are always recomputed from the database** server-side in
  `create-order` and re-verified in `capture-order`. Any amount sent by the
  client is ignored.
- **Capture verifies** `status === "COMPLETED"` **and**
  `capturedAmount === recomputedTotal` **and** currency match before any
  fulfillment. Capture is idempotent (safe to retry).
- **Download tokens** are HMAC-SHA256 signed, expire in **72h**, allow **5**
  downloads max, and are scoped to one paid order. The signature is checked
  before any DB hit.
- **Files are never public** — every download proxies through
  `/api/download/[token]`, which mints a fresh ~60s signed storage URL per request.
- **Admin** is gated by a signed session cookie (HMAC, 24h) enforced in
  `middleware.ts`; login is rate-limited (5 / 15 min).
- **Etsy tokens** are encrypted at rest with AES-256-GCM (`TOKEN_ENCRYPTION_KEY`).
- Checkout, download, and admin-login routes are all rate-limited; all inputs
  are validated with Zod.

---

## 📦 What you must provide (production)

| Need | Where | Notes |
| --- | --- | --- |
| **PayPal app** | [developer.paypal.com](https://developer.paypal.com/dashboard/) | Client ID + secret. Start in **sandbox**, flip `PAYPAL_ENV=live` for production. |
| **Storage bucket** | Cloudflare R2 or any S3-compatible | Holds the pack `.zip` files. Set the 5 `STORAGE_*` vars. |
| **Email sender** | [Resend](https://resend.com) | API key + a **verified** `EMAIL_FROM` domain. |
| **Production database** | [Neon](https://neon.tech) / [Supabase](https://supabase.com) | Set `DATABASE_URL` and change `provider` to `postgresql` in `prisma/schema.prisma`, then `npm run db:migrate`. |
| **Secrets** | — | `DOWNLOAD_TOKEN_SECRET`, `SESSION_SECRET`, `ADMIN_PASSWORD`, `CRON_SECRET` (and `TOKEN_ENCRYPTION_KEY` if using Etsy). Generate randoms with `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`. |
| **Site URL** | — | `NEXT_PUBLIC_SITE_URL=https://yourdomain.com` (no trailing slash). |

Every variable is documented in [`.env.example`](.env.example).

---

## 🧪 Sandbox purchase test

1. In `.env`, set sandbox PayPal keys and `PAYPAL_ENV=sandbox`.
2. `npm run dev`, add a pack to the cart, go to **/checkout**, enter an email.
3. Pay with a [PayPal sandbox buyer account](https://developer.paypal.com/dashboard/accounts).
4. On success you'll see download links on the confirmation page; the email is
   logged to your terminal (or sent, if Resend is configured).
5. Click a link → it routes through `/api/download/[token]`. With real storage
   it 302s to a signed URL; with the dev stub it returns a placeholder file.
   Confirm the link stops working after 5 downloads or 72h.

---

## 🛒 Etsy sync (OPTIONAL — best-effort)

> **The site runs 100% without Etsy.** This path only mirrors your existing Etsy
> listings into the same product table to save re-entry.

### Current Etsy API status (verified mid-2025)

The **Etsy Open API v3** is live and uses OAuth2 with PKCE. However, **new app
approval is selective** — Etsy restricted open registration, and access for
third-party apps is reviewed case-by-case. Apply at
[etsy.com/developers/register](https://www.etsy.com/developers/register). Rate
limits are ~10,000 requests/day and ~10/second; this app paginates and backs off
on HTTP 429.

**Hard limitation:** Etsy's API does **not** expose your uploaded digital files.
So imported listings come in with metadata + images but `needsFile = true` and
stay **hidden** from the shop until you attach the `.zip` once via the admin
form. **We never scrape Etsy HTML** — that violates their Terms of Service. API
only, or nothing.

### Connecting

1. Create an approved Etsy app and set `ETSY_CLIENT_ID`, `ETSY_CLIENT_SECRET`,
   `ETSY_SHOP_ID`, `ETSY_REDIRECT_URI`, and `TOKEN_ENCRYPTION_KEY`.
2. Add your callback URL (`https://yourdomain.com/api/etsy/oauth/callback`) to
   the app's allowed redirect URIs.
3. Go to **`/admin/etsy`** → **Connect Etsy** → authorize. Tokens are stored
   encrypted, and refreshed automatically.
4. Click **Sync now** to import/refresh listings. Categories are mapped from
   tags/taxonomy to your animal categories (unknowns → `other`, flagged for
   review).
5. Attach a `.zip` to each imported pack to publish it.

If credentials are missing or invalid, `/admin/etsy` shows a clear "not
configured" message and nothing breaks.

### Auto-refresh (Vercel Cron)

[`vercel.json`](vercel.json) registers a daily cron:

```json
{ "crons": [{ "path": "/api/cron/etsy-sync", "schedule": "0 6 * * *" }] }
```

The route is protected by `CRON_SECRET` (sent as a Bearer token by Vercel) and
**no-ops cleanly** when Etsy isn't configured.

---

## 📁 Structure

```
prisma/
├── schema.prisma        # Product, Order, OrderItem, DownloadToken, Review,
│                        #   EtsyAuth, EtsySyncLog
├── seed.ts              # 12 demo packs + reviews
└── migrations/

src/
├── middleware.ts        # admin/api auth gate (signed session cookie)
├── app/
│   ├── admin/           # login, products list, add/edit form, etsy sync
│   ├── api/
│   │   ├── admin/       # login, logout, products CRUD, signed upload
│   │   ├── checkout/    # create-order, capture-order (server-authoritative)
│   │   ├── download/    # [token] secure proxy + dev stub
│   │   ├── etsy/        # oauth start/callback, sync
│   │   └── cron/        # etsy-sync (Vercel Cron)
│   ├── shop/            # /shop + /shop/[slug] (DB-driven)
│   ├── cart, checkout/  # cart, checkout, success, cancel
│   └── page.tsx         # landing page
├── components/
│   ├── admin/           # login form, product table, product form, etsy panel
│   └── commerce/        # cart drawer, product cards, PayPal buttons
└── lib/                 # db, env, money, paypal, storage, email, tokens,
                         #   admin-auth, encrypt, etsy, etsy-sync, rate-limit
```

---

© 2026 CozyOverlays / CozyJsStudio.
