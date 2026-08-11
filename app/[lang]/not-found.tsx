"use client";

import Link from "next/link";
import Image from "next/image";
import birdImg from "@/components/assets/Component 9.png";
import Footer from "@/components/Footer";
import { useLang } from "@/components/LanguageProvider";
import { mtavruli } from "@/lib/i18n";
import { localizedHref } from "@/lib/routing";

// Rendered whenever a URL under /[lang]/... doesn't match a real page (bad
// link, typo, moved content). Nav is already provided by the parent layout.
export default function NotFound() {
  const { t, lang } = useLang();

  return (
    <>
      <main
        style={{
          background: "#10030a",
          color: "var(--white)",
          minHeight: "70vh",
          display: "flex",
          alignItems: "center",
          padding: "8rem clamp(1.5rem, 6vw, 3.75rem) 5rem",
        }}
      >
        <div
          className="container-cap"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            gap: "1.5rem",
            margin: "0 auto",
          }}
        >
          <div style={{ position: "relative", width: "9rem", aspectRatio: "1 / 1.1" }}>
            <Image src={birdImg} alt="" fill sizes="144px" style={{ objectFit: "contain" }} />
          </div>

          <div
            style={{
              fontSize: "0.75rem",
              letterSpacing: "0.2em",
              color: "var(--orange)",
              fontFamily: "var(--font-primary)",
              textTransform: "uppercase",
            }}
          >
            {t.notFound.eyebrow}
          </div>

          <h1
            style={{
              fontSize: "clamp(2rem, 6vw, 3.75rem)",
              fontWeight: 900,
              letterSpacing: "-0.02em",
              lineHeight: 1.05,
              fontFamily: "var(--font-heading)",
              maxWidth: "40rem",
            }}
          >
            {mtavruli(t.notFound.heading)}
          </h1>

          <p
            style={{
              fontSize: "1rem",
              lineHeight: 1.6,
              opacity: 0.7,
              fontFamily: "var(--font-primary)",
              maxWidth: "28rem",
            }}
          >
            {t.notFound.description}
          </p>

          <Link
            href={localizedHref("/", lang)}
            style={{
              display: "inline-block",
              marginTop: "1rem",
              background: "var(--purple-dark)",
              color: "var(--white)",
              padding: "0.875rem 2rem",
              borderRadius: "100px",
              fontSize: "0.875rem",
              fontWeight: 700,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              fontFamily: "var(--font-primary)",
              textDecoration: "none",
              transition: "transform 0.2s, background 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#a030aa";
              e.currentTarget.style.transform = "scale(1.03)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "var(--purple-dark)";
              e.currentTarget.style.transform = "none";
            }}
          >
            {t.notFound.backHome}
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
