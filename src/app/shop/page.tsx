import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { ProductGrid } from "@/components/commerce/ProductGrid";
import { AuroraBackground } from "@/components/ui/AuroraBackground";
import { Reveal } from "@/components/ui/Reveal";
import { getAllProducts } from "@/lib/products";

export const metadata: Metadata = {
  title: "Shop - Animated Stream Overlay Packs",
  description:
    "Browse cozy, animated stream overlay packs for Twitch, YouTube, Kick & TikTok. Instant secure download, pay safely with PayPal.",
  alternates: { canonical: "/shop" },
};

export default async function ShopPage() {
  const products = await getAllProducts();

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

        <section className="section-pad pt-4">
          <div className="container-page">
            <ProductGrid products={products} syncUrl />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
