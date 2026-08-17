import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import Footer from "@/components/Footer";
import { getPublishedPostBySlug } from "@/lib/blog";
import { translations } from "@/lib/i18n";
import { isLocale, localizedHref, type Locale } from "@/lib/routing";
import { pageMetadata } from "@/lib/seo";

// Same reasoning as the blog listing page: posts come from a database that
// changes independently of deploys, so this can't be frozen as static HTML
// at build time.
export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { lang, slug } = await params;
  const locale = isLocale(lang) ? lang : "ka";
  const post = await getPublishedPostBySlug(locale, slug);
  if (!post) return {};
  return pageMetadata({
    internalPath: `/blog/${slug}`,
    locale,
    title: `${post.title} — Grapevine`,
    description: post.excerpt || post.title,
  });
}

function formatDate(iso: string, locale: Locale) {
  return new Date(iso).toLocaleDateString(locale === "ka" ? "ka-GE" : "en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

const markdownComponents = {
  h1: (props: React.ComponentProps<"h1">) => (
    <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 900, fontSize: "1.75rem", color: "var(--dark)", letterSpacing: "-0.01em", margin: "2rem 0 1rem" }} {...props} />
  ),
  h2: (props: React.ComponentProps<"h2">) => (
    <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 900, fontSize: "1.5rem", color: "var(--dark)", letterSpacing: "-0.01em", margin: "2rem 0 1rem" }} {...props} />
  ),
  h3: (props: React.ComponentProps<"h3">) => (
    <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "1.25rem", color: "var(--dark)", margin: "1.75rem 0 0.75rem" }} {...props} />
  ),
  p: (props: React.ComponentProps<"p">) => (
    <p style={{ fontSize: "1rem", lineHeight: 1.85, color: "rgba(26,5,18,0.85)", fontFamily: "var(--font-primary)", marginBottom: "1.25rem" }} {...props} />
  ),
  a: (props: React.ComponentProps<"a">) => (
    <a style={{ color: "#902793", textDecoration: "underline" }} {...props} />
  ),
  ul: (props: React.ComponentProps<"ul">) => (
    <ul style={{ marginBottom: "1.25rem", paddingLeft: "1.25rem", color: "rgba(26,5,18,0.85)", fontFamily: "var(--font-primary)", lineHeight: 1.8 }} {...props} />
  ),
  ol: (props: React.ComponentProps<"ol">) => (
    <ol style={{ marginBottom: "1.25rem", paddingLeft: "1.25rem", color: "rgba(26,5,18,0.85)", fontFamily: "var(--font-primary)", lineHeight: 1.8 }} {...props} />
  ),
  blockquote: (props: React.ComponentProps<"blockquote">) => (
    <blockquote style={{ borderLeft: "3px solid var(--orange)", paddingLeft: "1.25rem", margin: "1.5rem 0", color: "rgba(26,5,18,0.65)", fontStyle: "italic" }} {...props} />
  ),
  code: (props: React.ComponentProps<"code">) => (
    <code style={{ background: "rgba(26,5,18,0.08)", borderRadius: "0.25rem", padding: "0.125rem 0.375rem", fontSize: "0.875em" }} {...props} />
  ),
};

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  const locale: Locale = isLocale(lang) ? lang : "ka";
  const t = translations[locale];
  const post = await getPublishedPostBySlug(locale, slug);
  if (!post) notFound();

  return (
    <>
      <main style={{ background: "var(--dark)", color: "var(--white)" }}>
        <header style={{ padding: "11rem clamp(1.5rem,7.6vw,6.875rem) 2.5rem" }}>
          <div className="container-cap">
            <Link
              href={localizedHref("/blog", locale)}
              style={{
                display: "inline-block",
                marginBottom: "1.5rem",
                fontSize: "0.75rem",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "var(--orange)",
                fontFamily: "var(--font-primary)",
                textDecoration: "none",
              }}
            >
              ← {t.blog.backToBlog}
            </Link>
            <div
              style={{
                fontSize: "0.6875rem",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "var(--orange)",
                fontFamily: "var(--font-primary)",
                marginBottom: "1rem",
              }}
            >
              {formatDate(post.createdAt, locale)}
            </div>
            <h1
              style={{
                fontFamily: "var(--font-heading)",
                fontWeight: 900,
                fontSize: "clamp(2.25rem,5vw,3.75rem)",
                lineHeight: 1.05,
                letterSpacing: "-0.02em",
                maxWidth: "44rem",
              }}
            >
              {post.title}
            </h1>
          </div>
        </header>

        <div style={{ background: "var(--cream)", padding: "3rem clamp(1.5rem,7.6vw,6.875rem) 5rem" }}>
          <article className="container-cap" style={{ maxWidth: "44rem" }}>
            <ReactMarkdown components={markdownComponents}>{post.content}</ReactMarkdown>
          </article>
        </div>
      </main>
      <Footer />
    </>
  );
}
