import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { ProductGrid } from "@/components/commerce/ProductGrid";
import { AuroraBackground } from "@/components/ui/AuroraBackground";
import { Reveal } from "@/components/ui/Reveal";
import Link from "next/link";
import { getAllProducts, getCatalogPacks } from "@/lib/products";
import { COLLECTIONS, packsInCollection } from "@/data/collections";

export const metadata: Metadata = {
  title: "Shop - Animated Stream Overlay Packs",
  description:
    "Browse cozy, animated stream overlay packs for Twitch, YouTube, Kick & TikTok. Instant secure download, pay safely with PayPal.",
  alternates: { canonical: "/shop" },
};

export default async function ShopPage() {
  const products = await getAllProducts();

  // Collection pages were only reachable from each other, so neither shoppers
  // nor crawlers could find them. Surface every non-empty one here.
  const packs = getCatalogPacks();
  const collections = COLLECTIONS.map((c) => ({
    ...c,
    count: packsInCollection(packs, c).length,
  })).filter((c) => c.count > 0);

  return (
    <>
      <Nav />
      <main>
        <section className="relative isolate overflow-hidden pb-8 pt-36 md:pt-44">
          <AuroraBackground />
          <div className="container-page text-center">
            <Reveal>
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-lavender">
                The Shop
              </span>
              <h1 className="mt-4 text-[clamp(2.4rem,6vw,4rem)] font-extrabold leading-tight text-heading">
                Every cozy pack,{" "}
                <span className="gradient-text">one click away</span>
              </h1>
              <p className="mx-auto mt-5 max-w-2xl text-lg text-body">
                Fully animated screens, alerts, panels &amp; emotes for Twitch,
                YouTube &amp; Kick. Buy securely on Etsy, download instantly.
              </p>
            </Reveal>
          </div>
        </section>

        <section className="pt-2">
          <div className="container-page">
            <div className="flex items-baseline justify-between gap-4">
              <h2 className="text-xs font-bold uppercase tracking-wide text-muted">
                Shop by collection
              </h2>
              <Link
                href="/collections"
                className="text-xs font-bold text-lavender transition-colors hover:text-pink"
              >
                All {collections.length} collections
              </Link>
            </div>
            <ul className="mt-3 flex flex-wrap gap-2">
              {collections.map((c) => (
                <li key={c.slug}>
                  <Link
                    href={`/collections/${c.slug}`}
                    className="inline-flex items-center gap-1.5 rounded-full border border-subtle bg-white/5 px-4 py-2 text-sm font-medium text-body transition-colors hover:border-lavender/40 hover:text-heading"
                  >
                    {c.name}
                    <span className="text-xs text-muted">{c.count}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="section-pad pt-8">
          <div className="container-page">
            <ProductGrid products={products} syncUrl />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
