import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Check, ArrowLeft, Shield, Zap, Download } from "lucide-react";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { AuroraBackground } from "@/components/ui/AuroraBackground";
import { ProductGallery } from "@/components/commerce/ProductGallery";
import { RelatedProducts } from "@/components/commerce/RelatedProducts";
import { AddToCartButtons } from "@/components/commerce/AddToCartButtons";
import { getProductBySlug, getAllProducts } from "@/lib/products";
import { formatCents } from "@/lib/money";
import { COMPATIBILITY, BUY_ON_ETSY, SITE } from "@/data/site";
import { JsonLd } from "@/components/seo/JsonLd";
import { WishlistButton } from "@/components/commerce/WishlistButton";
import { ShareButton } from "@/components/commerce/ShareButton";

// Prerender every product page as static HTML at build time (great for SEO and
// crawl coverage). The catalog is static data, so no database is needed.
export async function generateStaticParams() {
  const products = await getAllProducts();
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const product = await getProductBySlug(params.slug);
  if (!product) return { title: "Pack not found" };
  const title = `${product.name} — Animated Stream Overlay`;
  return {
    title,
    description: product.description,
    alternates: { canonical: `/shop/${product.slug}` },
    openGraph: {
      type: "website",
      title,
      description: product.description,
      url: `${SITE.url}/shop/${product.slug}`,
      images: [{ url: product.image, alt: product.name }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: product.description,
      images: [product.image],
    },
  };
}

const INCLUDED = [
  "Transparent .WEBM animated files",
  "Static .PNG versions included",
  "Sized for Twitch, YouTube, Kick & TikTok",
  "Instant secure download after payment",
];

export default async function ProductDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const product = await getProductBySlug(params.slug);
  if (!product) notFound();

  const all = await getAllProducts();
  const related = all
    .filter((p) => p.slug !== product.slug && p.category === product.category)
    .slice(0, 3);
  const relatedFallback =
    related.length > 0
      ? related
      : all.filter((p) => p.slug !== product.slug).slice(0, 3);

  const canonical = `${SITE.url}/shop/${product.slug}`;
  const saleOff =
    product.compareAtCents && product.compareAtCents > product.priceCents
      ? Math.round(100 - (product.priceCents / product.compareAtCents) * 100)
      : null;
  const productLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: [product.image],
    brand: { "@type": "Brand", name: SITE.shop },
    category: product.category,
    offers: {
      "@type": "Offer",
      url: product.etsyUrl || canonical,
      priceCurrency: product.currency || "USD",
      price: (product.priceCents / 100).toFixed(2),
      availability: "https://schema.org/InStock",
      seller: { "@type": "Organization", name: SITE.name },
    },
  };
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
      { "@type": "ListItem", position: 2, name: "Shop", item: `${SITE.url}/shop` },
      { "@type": "ListItem", position: 3, name: product.name, item: canonical },
    ],
  };

  return (
    <>
      <JsonLd data={productLd} />
      <JsonLd data={breadcrumbLd} />
      <Nav />
      <main>
        <section className="relative isolate overflow-hidden pb-12 pt-32 md:pt-40">
          <AuroraBackground />
          <div className="container-page">
            <Link
              href="/shop"
              className="inline-flex items-center gap-1.5 text-sm font-bold text-lavender transition-colors hover:text-pink"
            >
              <ArrowLeft size={15} /> Back to shop
            </Link>

            <div className="mt-8 grid gap-10 lg:grid-cols-2 lg:gap-14">
              {/* Gallery */}
              <div>
                <ProductGallery product={product} />
              </div>

              {/* Details */}
              <div>
                <span className="flex flex-wrap items-center gap-2">
                  {product.bestseller && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-accent-gradient px-3 py-1 text-xs font-bold text-base shadow-glow">
                      ★ Bestseller
                    </span>
                  )}
                  {product.isNew && (
                    <span className="rounded-full bg-pink px-3 py-1 text-xs font-bold text-base">
                      ✦ New
                    </span>
                  )}
                  {saleOff !== null && (
                    <span className="rounded-full bg-warm px-3 py-1 text-xs font-bold text-base">
                      -{saleOff}% right now
                    </span>
                  )}
                </span>
                <h1 className="mt-3 text-[clamp(1.9rem,4vw,2.8rem)] font-extrabold leading-tight text-heading">
                  {product.name}
                </h1>
                <p className="mt-4 text-lg text-body">{product.description}</p>

                <div className="mt-6 flex items-baseline gap-3">
                  <span className="text-3xl font-extrabold text-lavender">
                    {formatCents(product.priceCents, product.currency)}
                  </span>
                  {product.compareAtCents && (
                    <span className="text-lg font-semibold text-muted line-through">
                      {formatCents(product.compareAtCents, product.currency)}
                    </span>
                  )}
                  <span className="text-sm text-muted">one-time · yours forever</span>
                </div>

                <div className="mt-6 flex items-start gap-2">
                  <div className="flex-1">
                    <AddToCartButtons
                      item={{
                        slug: product.slug,
                        name: product.name,
                        priceCents: product.priceCents,
                        image: product.image,
                        currency: product.currency,
                      }}
                      variant="detail"
                      etsyUrl={product.etsyUrl}
                    />
                  </div>
                  <WishlistButton
                    slug={product.slug}
                    name={product.name}
                    variant="inline"
                  />
                  <ShareButton
                    slug={product.slug}
                    name={product.name}
                    image={product.image}
                  />
                </div>

                {/* Trust row */}
                <div className="mt-6 flex flex-wrap gap-4 text-xs text-muted">
                  <span className="inline-flex items-center gap-1.5">
                    <Zap size={14} className="text-cyan" /> Instant download
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Shield size={14} className="text-cyan" />{" "}
                    {BUY_ON_ETSY ? "Buy safely on Etsy" : "Secure PayPal checkout"}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Download size={14} className="text-cyan" /> .WEBM + .PNG
                  </span>
                </div>

                {/* What's included */}
                <div className="mt-8 glass rounded-2xl p-6">
                  <h2 className="text-sm font-bold uppercase tracking-wide text-heading">
                    What&apos;s included
                  </h2>
                  <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
                    {[...product.features, ...INCLUDED].map((f) => (
                      <li
                        key={f}
                        className="flex items-center gap-2 text-sm text-body"
                      >
                        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-lavender/15 text-lavender">
                          <Check size={12} />
                        </span>
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Compatibility */}
                <div className="mt-6">
                  <h2 className="text-xs font-bold uppercase tracking-wide text-muted">
                    Works with
                  </h2>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {COMPATIBILITY.map((c) => (
                      <li
                        key={c}
                        className="rounded-full border border-subtle bg-surface/60 px-3 py-1.5 text-xs font-medium text-body"
                      >
                        {c}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Delivery, setup & license */}
                <div className="mt-6 flex flex-col gap-2">
                  <details className="group rounded-2xl border border-subtle bg-surface/40 p-4 open:bg-surface/60">
                    <summary className="cursor-pointer list-none text-sm font-bold text-heading">
                      📦 How delivery works
                    </summary>
                    <p className="mt-3 text-sm text-body">
                      Instant digital download — nothing physical ships. Your
                      purchase delivers a PDF containing a direct link to a
                      Google Drive folder with the complete package (animated
                      .WEBM with transparency, plus .PNG versions), ready to
                      drop into OBS, Streamlabs or StreamElements.
                    </p>
                  </details>
                  <details className="group rounded-2xl border border-subtle bg-surface/40 p-4 open:bg-surface/60">
                    <summary className="cursor-pointer list-none text-sm font-bold text-heading">
                      📜 License &amp; refunds
                    </summary>
                    <p className="mt-3 text-sm text-body">
                      Licensed for personal use on your own channels — resale or
                      redistribution isn&apos;t allowed. Because these are
                      digital products, orders can&apos;t be refunded, but
                      we&apos;ll always help fix any issue — message us and
                      we&apos;ll make it right. Small tweak requests are often
                      free.
                    </p>
                  </details>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Related */}
        <section className="section-pad border-t border-subtle pt-16">
          <div className="container-page">
            <h2 className="text-2xl font-extrabold text-heading">
              You might also love
            </h2>
            <div className="mt-8">
              <RelatedProducts products={relatedFallback} />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
