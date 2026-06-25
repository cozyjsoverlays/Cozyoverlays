import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { BLOG_POSTS } from "@/data/blog";
import { BlogCard } from "@/components/BlogCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

export function BlogTeaser() {
  return (
    <section id="blog" className="section-pad">
      <div className="container-page">
        <SectionHeading
          eyebrow="From the Blog"
          title={
            <>
              Tips, stories &amp;{" "}
              <span className="gradient-text">stream craft</span>
            </>
          }
          subtitle="Guides for getting set up, picking your vibe, and the stories behind our favorite packs."
        />

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {BLOG_POSTS.slice(0, 3).map((post, i) => (
            <Reveal key={post.slug} delay={(i % 3) * 0.06}>
              <BlogCard post={post} />
            </Reveal>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-base font-bold text-lavender transition-colors hover:text-pink"
          >
            Visit the Blog <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
