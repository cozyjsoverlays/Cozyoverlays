import { getAllProducts } from "@/lib/products";
import { ProductGrid } from "@/components/commerce/ProductGrid";
import { SectionHeading } from "@/components/ui/SectionHeading";

export async function FeaturedShop() {
  // The homepage shows the whole shop - filterable, revealed via "Load more".
  const products = await getAllProducts();

  return (
    <section id="shop" className="section-pad">
      <div className="container-page">
        <SectionHeading
          eyebrow="Shop"
          title={
            <>
              Cozy packs your{" "}
              <span className="gradient-text">chat will love</span>
            </>
          }
          subtitle={`All ${products.length} animated packs - screens, alerts, panels & emotes for Twitch, YouTube & Kick. Buy securely on Etsy, download instantly.`}
        />

        <div className="mt-10">
          <ProductGrid products={products} showFilters pageSize={12} />
        </div>
      </div>
    </section>
  );
}
