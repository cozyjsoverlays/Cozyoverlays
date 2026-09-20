import { CATEGORIES } from "@/data/categories";
import { CategoryCard } from "@/components/CategoryCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

export function BrowseByAnimal() {
  return (
    <section id="browse" className="section-pad">
      <div className="container-page">
        <SectionHeading
          eyebrow="Browse by Animal"
          title={
            <>
              Find <span className="gradient-text">your</span> creature
            </>
          }
          subtitle="Pick the companion that matches your channel's vibe - there's a cozy world for everyone."
        />

        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {CATEGORIES.map((category, i) => (
            <Reveal key={category.name} delay={i * 0.04}>
              <CategoryCard category={category} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
