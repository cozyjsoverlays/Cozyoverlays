import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { TrustBar } from "@/components/TrustBar";
import { FeaturedShop } from "@/components/commerce/FeaturedShop";
import { BrowseByAnimal } from "@/components/BrowseByAnimal";
import { Reviews } from "@/components/Reviews";
import { HowItWorks } from "@/components/HowItWorks";
import { Compatibility } from "@/components/Compatibility";
import { CustomCommission } from "@/components/CustomCommission";
import { About } from "@/components/About";
import { Tutorials } from "@/components/Tutorials";
import { BlogTeaser } from "@/components/BlogTeaser";
import { FAQ } from "@/components/FAQ";
import { Footer } from "@/components/Footer";

// The featured-packs section reads the live DB, so render at request time
// instead of statically prerendering at build (which has no database).
export const dynamic = "force-dynamic";

export default function HomePage() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <TrustBar />
        <FeaturedShop />
        <BrowseByAnimal />
        <Reviews />
        <HowItWorks />
        <Compatibility />
        <Tutorials />
        <CustomCommission />
        <About />
        <BlogTeaser />
        <FAQ />
      </main>
      <Footer />
    </>
  );
}
