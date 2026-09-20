import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock, ArrowRight, ExternalLink, BookOpen } from "lucide-react";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { AuroraBackground } from "@/components/ui/AuroraBackground";
import { Reveal } from "@/components/ui/Reveal";
import { NewsletterCTA } from "@/components/NewsletterCTA";
import { BlogCard } from "@/components/BlogCard";
import { RichText } from "@/components/blog/RichText";
import { JsonLd } from "@/components/seo/JsonLd";
import { BLOG_POSTS, getPost } from "@/data/blog";
import { SITE } from "@/data/site";

interface PageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const post = getPost(params.slug);
  if (!post) return { title: "Post not found" };
  const image = post.heroImage ?? SITE.avatar;
  return {
    title: post.title,
    description: post.excerpt,
    keywords: post.keywords,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      url: `${SITE.url}/blog/${post.slug}`,
      publishedTime: post.isoDate ?? post.date,
      images: [{ url: image, alt: post.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [image],
    },
  };
}

export default function BlogPostPage({ params }: PageProps) {
  const post = getPost(params.slug);
  if (!post) notFound();

  const related = BLOG_POSTS.filter((p) => p.slug !== post.slug).slice(0, 3);

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.isoDate ?? post.date,
    image: [post.heroImage ?? SITE.avatar],
    author: { "@type": "Organization", name: SITE.shop, url: SITE.url },
    publisher: {
      "@type": "Organization",
      name: SITE.name,
      logo: { "@type": "ImageObject", url: SITE.avatar },
    },
    mainEntityOfPage: `${SITE.url}/blog/${post.slug}`,
    ...(post.keywords ? { keywords: post.keywords.join(", ") } : {}),
  };

  return (
    <>
      <JsonLd data={articleLd} />
      <Nav />
      <main>
        <article>
          <header className="relative isolate overflow-hidden pb-8 pt-36 md:pt-44">
            <AuroraBackground />
            <div className="container-page max-w-3xl">
              <Reveal>
                <Link
                  href="/blog"
                  className="inline-flex items-center gap-1.5 text-sm font-bold text-lavender transition-colors hover:text-pink"
                >
                  <ArrowLeft size={15} /> All articles
                </Link>
                <div className="mt-6 flex items-center gap-3 text-xs text-muted">
                  <span className="rounded-full border border-subtle bg-lavender/10 px-2.5 py-1 font-bold text-lavender">
                    {post.tag}
                  </span>
                  <span>{post.date}</span>
                  <span className="inline-flex items-center gap-1">
                    <Clock size={12} /> {post.readingTime}
                  </span>
                </div>
                <h1 className="mt-5 text-balance text-[clamp(2rem,5vw,3.25rem)] font-extrabold leading-tight text-heading">
                  {post.title}
                </h1>
                <p className="mt-5 text-lg text-body">{post.excerpt}</p>
              </Reveal>
            </div>
          </header>

          <div className="container-page max-w-3xl pb-16">
            <div className="prose-cozy mt-4 flex flex-col gap-8">
              {post.body.map((block, i) => (
                <Reveal key={i} delay={0.04}>
                  <section>
                    {block.heading && (
                      <h2 className="mb-3 text-xl font-bold text-heading md:text-2xl">
                        {block.heading}
                      </h2>
                    )}
                    <div className="flex flex-col gap-4">
                      {block.paragraphs.map((p, j) => (
                        <p
                          key={j}
                          className="text-[17px] leading-relaxed text-body"
                        >
                          <RichText text={p} />
                        </p>
                      ))}
                    </div>
                  </section>
                </Reveal>
              ))}
            </div>

            {/* Primary call-to-action - drive readers to the shop / Etsy */}
            {post.cta && (
              <Reveal>
                <div className="mt-12 overflow-hidden rounded-2xl border border-lavender/30 bg-gradient-to-br from-surface-2 to-surface p-7 shadow-card">
                  <h2 className="text-xl font-extrabold text-heading md:text-2xl">
                    {post.cta.heading}
                  </h2>
                  <p className="mt-2 max-w-2xl text-body">{post.cta.text}</p>
                  {/^https?:/i.test(post.cta.href) ? (
                    <a
                      href={post.cta.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-5 inline-flex items-center gap-2 rounded-full bg-accent-gradient px-6 py-3 text-sm font-bold text-base shadow-glow transition-transform hover:-translate-y-0.5"
                    >
                      {post.cta.label} <ExternalLink size={15} />
                    </a>
                  ) : (
                    <Link
                      href={post.cta.href}
                      className="mt-5 inline-flex items-center gap-2 rounded-full bg-accent-gradient px-6 py-3 text-sm font-bold text-base shadow-glow transition-transform hover:-translate-y-0.5"
                    >
                      {post.cta.label} <ArrowRight size={15} />
                    </Link>
                  )}
                </div>
              </Reveal>
            )}

            {/* Helpful resources */}
            {post.resources && post.resources.length > 0 && (
              <Reveal>
                <section className="mt-10 rounded-2xl border border-subtle bg-surface/40 p-6">
                  <h2 className="flex items-center gap-2 text-lg font-bold text-heading">
                    <BookOpen size={18} className="text-lavender" /> Helpful
                    resources
                  </h2>
                  <ul className="mt-4 flex flex-col gap-2.5">
                    {post.resources.map((r) => {
                      const external = /^https?:/i.test(r.href);
                      return (
                        <li key={r.href}>
                          {external ? (
                            <a
                              href={r.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 text-body transition-colors hover:text-lavender"
                            >
                              {r.label} <ExternalLink size={13} />
                            </a>
                          ) : (
                            <Link
                              href={r.href}
                              className="inline-flex items-center gap-1.5 text-body transition-colors hover:text-lavender"
                            >
                              {r.label} <ArrowRight size={13} />
                            </Link>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                </section>
              </Reveal>
            )}
          </div>
        </article>

        <div className="container-page max-w-3xl pb-16">
          <NewsletterCTA />
        </div>

        <section className="section-pad border-t border-subtle pt-16">
          <div className="container-page">
            <h2 className="text-2xl font-extrabold text-heading">
              Keep reading
            </h2>
            <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
              {related.map((p, i) => (
                <Reveal key={p.slug} delay={i * 0.06}>
                  <BlogCard post={p} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
