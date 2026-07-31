"use client";

import Image from "next/image";
import heroMobile from "./assets/mobileversion.png";
import { useLang } from "./LanguageProvider";
import { useMediaQuery, MOBILE_QUERY } from "@/lib/useMediaQuery";

// Entrance easing, mirrors the old framer-motion curve. Animations themselves
// live in globals.css (@keyframes heroFade / heroFadeUp / heroFadeInDim).
const EASE = "cubic-bezier(0.16, 1, 0.3, 1)";

export default function Hero() {
  const { t } = useLang();
  const isMobile = useMediaQuery(MOBILE_QUERY);
  return (
    <section
      style={{
        position: "relative",
        height: "100vh",
        minHeight: "40rem",
        background: "var(--dark)",
        overflow: "hidden",
      }}
    >
      {/* Hero animation — full bleed background */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          overflow: "hidden",
          animation: `heroFade 1.2s ${EASE} 0.2s both`,
        }}
      >
        {isMobile ? (
          // Rotated 90° clockwise; width/height swapped to viewport units so the
          // rotated image fills the portrait screen.
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              width: "100vh",
              height: "100vw",
              transform: "translate(-50%, -50%) rotate(90deg)",
            }}
          >
            <Image src={heroMobile} alt="" fill sizes="100vh" fetchPriority="high" loading="eager" style={{ objectFit: "cover" }} />
          </div>
        ) : (
          // Full-bleed hero animation. Converted from a 13 MB GIF to WebM/MP4
          // (~250 KB) — see /public/hero. Poster paints instantly as the LCP.
          <video
            autoPlay
            muted
            loop
            playsInline
            poster="/hero/knot-poster.jpg"
            aria-hidden="true"
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "contain",
            }}
          >
            <source src="/hero/knot.webm" type="video/webm" />
            <source src="/hero/knot.mp4" type="video/mp4" />
          </video>
        )}
        <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.35)" }} />
      </div>

      {/* Label — top left */}
      <div
        style={{
          position: "absolute",
          top: "clamp(5rem, 10vh, 7rem)",
          left: "clamp(1.5rem, 5vw, 2.5rem)",
          fontSize: "0.6875rem",
          letterSpacing: "0.3em",
          textTransform: "uppercase",
          color: "var(--orange)",
          fontFamily: "var(--font-primary)",
          zIndex: 1,
          animation: `heroFadeUp 0.8s ${EASE} 0.4s both`,
        }}
      >
        {t.hero.label}
      </div>

      {/* Description — bottom left */}
      <p
        style={{
          position: "absolute",
          bottom: "clamp(3rem, 8vh, 5rem)",
          left: "clamp(1.5rem, 5vw, 2.5rem)",
          maxWidth: "17.5rem",
          fontSize: "0.75rem",
          lineHeight: 1.9,
          fontFamily: "var(--font-primary)",
          zIndex: 1,
          animation: `heroFadeUp 0.8s ${EASE} 1s both`,
        }}
      >
        {t.hero.description}
      </p>

      {/* Scroll hint — bottom right, lifted so it clears the floating support
          bubble (fixed at bottom:24px, ~58px tall) that shares this corner. */}
      <div
        style={{
          position: "absolute",
          bottom: "clamp(5.75rem, calc(4vh + 4rem), 6.75rem)",
          right: "clamp(1.5rem, 5vw, 2.5rem)",
          display: "flex",
          alignItems: "center",
          gap: "0.75rem",
          fontSize: "0.5625rem",
          letterSpacing: "0.25em",
          textTransform: "uppercase",
          fontFamily: "var(--font-primary)",
          zIndex: 1,
          animation: `heroFadeInDim 1s ease 1.6s both`,
        }}
      >
        <div
          className="scroll-line"
          style={{
            width: "2.25rem",
            height: "1px",
            background: "var(--white)",
            transformOrigin: "left",
          }}
        />
        <span>{t.hero.scroll}</span>
      </div>
    </section>
  );
}