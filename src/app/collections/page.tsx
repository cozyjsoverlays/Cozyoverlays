import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { AuroraBackground } from "@/components/ui/AuroraBackground";
import { Reveal } from "@/components/ui/Reveal";
import { JsonLd } from "@/components/seo/JsonLd";
import { COLLECTIONS, packsInCollection } from "@/data/collections";
import { getCatalogPacks } from "@/lib/products";
import { packThumbAlt } from "@/lib/seo";
import { SITE } from "@/data/site";

export const metadata: Metadata = {
  title: "Collections - Animated Stream Overlays by Theme",
  description:
    "Browse every theme in the shop: sakura, witchy, cozy rooms, lofi, halloween, cats, foxes, frogs and more. Animated overlay packs for Twitch, YouTube, Kick and TikTok.",
  keywords: [
    "twitch overlay collections",
    "stream overlays by theme",
    "sakura twitch overlay",
    "witchy twitch overlay",
    "cozy twitch overlay",
    "lofi twitch overlay",
    "animated stream overlays",
  ],
  alternates: { canonical: "/collections" },
  openGraph: {
    type: "website",
    title: "Collections · CozyOverlays",
    description: "Every cozy overlay theme in one place.",
    url: `${SITE.url}/collections`,
  },
};

export default function CollectionsIndexPage() {
  const packs = getCatalogPacks();

  const collections = COLLECTIONS.map((c) => {
    const inside = packsInCollection(packs, c);
    return { ...c, count: inside.length, cover: inside[0] ?? null };
  })
    .filter((c) => c.count > 0)
    .sort((a, b) => b.count - a.count);

  const listLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Overlay Collections",
    description: metadata.description,
    url: `${SITE.url}/collections`,
    hasPart: collections.map((c) => ({
      "@type": "CollectionPage",
      name: c.name,
      description: c.blurb,
      url: `${SITE.url}/collections/${c.slug}`,
    })),
  };

  return (
    <>
      <JsonLd data={listLd} />
      <Nav />
      <main>
        <section className="relative isolate overflow-hidden pb-6 pt-36 md:pt-44">
          <AuroraBackground />
          <div className="container-page text-center">
            <Reveal>
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-lavender">
                Collections
              </span>
              <h1 className="mt-4 text-[clamp(2.4rem,6vw,4rem)] font-extrabold leading-tight text-heading">
                Find your <span className="gradient-text">theme</span>
              </h1>
              <p className="mx-auto mt-5 max-w-2xl text-lg text-body">
                {collections.length} collections across {packs.length} animated
                packs. Pick the world your channel lives in - sakura, witchy,
                lofi bedrooms, forest nights - and everything matching is one
                click away.
              </p>
            </Reveal>
          </div>
        </section>

        <section className="section-pad pt-6">
          <div className="container-page">
            <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {collections.map((c) => (
                <li key={c.slug}>
                  <Link
                    href={`/collections/${c.slug}`}
                    className="group flex h-full flex-col overflow-hidden rounded-2xl border border-subtle bg-white/5 transition-colors hover:border-lavender/40"
                  >
                    {c.cover && (
                      <div className="relative aspect-[16/9] overflow-hidden">
                        <Image
                          src={c.cover.image}
                          alt={packThumbAlt(c.cover.name, c.cover.category)}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                    )}
                    <div className="flex flex-1 flex-col p-5">
                      <h2 className="text-lg font-bold text-heading">
                        {c.name}
                      </h2>
                      <p className="mt-2 flex-1 text-sm text-body">{c.blurb}</p>
                      <span className="mt-3 text-xs font-bold uppercase tracking-wide text-lavender">
                        {c.count} pack{c.count === 1 ? "" : "s"}
                      </span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
