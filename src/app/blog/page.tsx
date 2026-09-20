import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { BlogCard } from "@/components/BlogCard";
import { AuroraBackground } from "@/components/ui/AuroraBackground";
import { Reveal } from "@/components/ui/Reveal";
import { NewsletterCTA } from "@/components/NewsletterCTA";
import { BLOG_POSTS } from "@/data/blog";

export const metadata: Metadata = {
  title: "Blog - Stream Setup Guides & Studio Stories",
  description:
    "Guides, tips, and behind-the-scenes stories from CozyJsStudio - OBS setup, choosing overlays, and the making of our cozy packs.",
  alternates: { canonical: "/blog" },
};

export default function BlogIndexPage() {
  return (
    <>
      <Nav />
      <main>
        <section className="relative isolate overflow-hidden pb-12 pt-36 md:pt-44">
          <AuroraBackground />
          <div className="container-page text-center">
            <Reveal>
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-lavender">
                The CozyOverlays Blog
              </span>
              <h1 className="mt-4 text-[clamp(2.4rem,6vw,4rem)] font-extrabold leading-tight text-heading">
                Stream craft, <span className="gradient-text">cozy style</span>
              </h1>
              <p className="mx-auto mt-5 max-w-2xl text-lg text-body">
                Setup walkthroughs, design tips, and the stories behind the
                packs - everything to help your channel feel alive.
              </p>
            </Reveal>
          </div>
        </section>

        <section className="section-pad pt-4">
          <div className="container-page">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {BLOG_POSTS.map((post, i) => (
                <Reveal key={post.slug} delay={(i % 3) * 0.06}>
                  <BlogCard post={post} />
                </Reveal>
              ))}
            </div>

            <div className="mt-16">
              <NewsletterCTA />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
