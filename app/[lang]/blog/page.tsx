import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import { getPublishedPosts } from "@/lib/blog";
import { translations, mtavruli } from "@/lib/i18n";
import { isLocale, localizedHref, type Locale } from "@/lib/routing";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const locale = isLocale(lang) ? lang : "ka";
  const t = translations[locale];
  return pageMetadata({
    internalPath: "/blog",
    locale,
    title: locale === "ka" ? "ბლოგი — Grapevine" : "Blog — Grapevine",
    description: t.blog.intro,
  });
}

function formatDate(iso: string, locale: Locale) {
  return new Date(iso).toLocaleDateString(locale === "ka" ? "ka-GE" : "en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function BlogPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const locale: Locale = isLocale(lang) ? lang : "ka";
  const t = translations[locale];
  const posts = await getPublishedPosts(locale);

  return (
    <>
      <main style={{ background: "var(--dark)", color: "var(--white)", minHeight: "60vh" }}>
        <header style={{ padding: "11rem clamp(1.5rem,7.6vw,6.875rem) 3rem" }}>
          <div
            style={{
              color: "var(--orange)",
              fontSize: "0.75rem",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              marginBottom: "1.5rem",
              fontFamily: "var(--font-primary)",
            }}
          >
            {t.blog.eyebrow}
          </div>
          <h1
            style={{
              fontFamily: "var(--font-heading)",
              fontWeight: 900,
              fontSize: "clamp(2.75rem,7vw,6rem)",
              lineHeight: 0.95,
              textTransform: "uppercase",
              letterSpacing: "-0.02em",
              color: "var(--orange)",
            }}
          >
            {mtavruli(t.blog.heading)}
          </h1>
          <p
            style={{
              maxWidth: "34rem",
              marginTop: "1.75rem",
              fontSize: "0.95rem",
              lineHeight: 1.8,
              color: "rgba(255,250,236,0.72)",
              fontFamily: "var(--font-primary)",
            }}
          >
            {t.blog.intro}
          </p>
        </header>

        <div style={{ padding: "1.5rem clamp(1.5rem,7.6vw,6.875rem) 6rem" }}>
          {posts.length === 0 ? (
            <p style={{ color: "rgba(255,250,236,0.5)", fontFamily: "var(--font-primary)", fontSize: "0.9375rem" }}>
              {t.blog.empty}
            </p>
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(18rem, 1fr))",
                gap: "1.25rem",
              }}
            >
              {posts.map((post) => (
                <Link
                  key={post.id}
                  href={localizedHref(`/blog/${post.slug}`, locale)}
                  style={{
                    display: "block",
                    background: "var(--cream)",
                    borderRadius: "1.25rem",
                    padding: "1.75rem",
                    textDecoration: "none",
                    transition: "transform 0.25s cubic-bezier(0.16,1,0.3,1)",
                  }}
                >
                  <div
                    style={{
                      fontSize: "0.6875rem",
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                      color: "var(--orange)",
                      fontFamily: "var(--font-primary)",
                      marginBottom: "0.75rem",
                    }}
                  >
                    {formatDate(post.createdAt, locale)}
                  </div>
                  <h2
                    style={{
                      fontFamily: "var(--font-heading)",
                      fontWeight: 900,
                      fontSize: "1.375rem",
                      color: "var(--dark)",
                      letterSpacing: "-0.01em",
                      lineHeight: 1.15,
                      marginBottom: "0.75rem",
                    }}
                  >
                    {post.title}
                  </h2>
                  {post.excerpt && (
                    <p
                      style={{
                        fontSize: "0.875rem",
                        lineHeight: 1.65,
                        color: "rgba(26,5,18,0.72)",
                        fontFamily: "var(--font-primary)",
                        marginBottom: "1rem",
                      }}
                    >
                      {post.excerpt}
                    </p>
                  )}
                  <span
                    style={{
                      fontSize: "0.75rem",
                      fontWeight: 700,
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      color: "#902793",
                      fontFamily: "var(--font-primary)",
                    }}
                  >
                    {t.blog.readMore} →
                  </span>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
