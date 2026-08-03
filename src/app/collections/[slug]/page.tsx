import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { AuroraBackground } from "@/components/ui/AuroraBackground";
import { ProductGrid } from "@/components/commerce/ProductGrid";
import { JsonLd } from "@/components/seo/JsonLd";
import { COLLECTIONS, getCollection, packsInCollection } from "@/data/collections";
import { getAllProductsSync, getCatalogPacks } from "@/lib/products";
import { SITE } from "@/data/site";

interface PageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return COLLECTIONS.map((c) => ({ slug: c.slug }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const c = getCollection(params.slug);
  if (!c) return { title: "Collection not found" };
  return {
    title: `${c.name} — Animated Stream Overlay Packs`,
    description: c.blurb,
    alternates: { canonical: `/collections/${c.slug}` },
    openGraph: {
      type: "website",
      title: `${c.name} · CozyOverlays`,
      description: c.blurb,
      url: `${SITE.url}/collections/${c.slug}`,
    },
  };
}

export default function CollectionPage({ params }: PageProps) {
  const collection = getCollection(params.slug);
  if (!collection) notFound();

  const slugs = new Set(packsInCollection(getCatalogPacks(), collection).map((p) => p.slug));
  const products = getAllProductsSync().filter((p) => slugs.has(p.slug));

  const collectionLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: collection.name,
    description: collection.blurb,
    url: `${SITE.url}/collections/${collection.slug}`,
  };

  return (
    <>
      <JsonLd data={collectionLd} />
      <Nav />
      <main>
        <section className="relative isolate overflow-hidden pb-8 pt-36 md:pt-44">
          <AuroraBackground />
          <div className="container-page text-center">
            <Link
              href="/shop"
              className="inline-flex items-center gap-1.5 text-sm font-bold text-lavender transition-colors hover:text-pink"
            >
              <ArrowLeft size={15} /> All packs
            </Link>
            <h1 className="mt-5 text-[clamp(2.2rem,6vw,3.6rem)] font-extrabold leading-tight text-heading">
              {collection.name.replace(" Twitch Overlays", "")}{" "}
              <span className="gradient-text">overlays</span>
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-body">
              {collection.blurb}
            </p>
            <p className="mt-2 text-sm text-muted">
              {products.length} pack{products.length === 1 ? "" : "s"}
            </p>
          </div>
        </section>

        <section className="section-pad pt-4">
          <div className="container-page">
            {products.length > 0 ? (
              <ProductGrid products={products} showFilters={false} />
            ) : (
              <p className="py-16 text-center text-body">
                Nothing here yet — new packs drop often.{" "}
                <Link href="/shop" className="font-bold text-lavender">
                  Browse everything
                </Link>
              </p>
            )}
          </div>
        </section>

        {/* Other collections */}
        <section className="container-page pb-20">
          <h2 className="text-sm font-bold uppercase tracking-wide text-muted">
            More collections
          </h2>
          <ul className="mt-4 flex flex-wrap gap-2">
            {COLLECTIONS.filter((c) => c.slug !== collection.slug).map((c) => (
              <li key={c.slug}>
                <Link
                  href={`/collections/${c.slug}`}
                  className="rounded-full border border-subtle bg-white/5 px-4 py-2 text-sm font-medium text-body transition-colors hover:border-lavender/40 hover:text-heading"
                >
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </main>
      <Footer />
    </>
  );
}
