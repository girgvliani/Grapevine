"use client";

import { useEffect, useState } from "react";
import { useLang } from "./LanguageProvider";
import { useMediaQuery, MOBILE_QUERY } from "@/lib/useMediaQuery";

// Entrance easing, mirrors the old framer-motion curve. Animations themselves
// live in globals.css (@keyframes heroFade / heroFadeUp / heroFadeInDim).
const EASE = "cubic-bezier(0.16, 1, 0.3, 1)";

export default function Hero() {
  const { t } = useLang();
  const isMobile = useMediaQuery(MOBILE_QUERY);
  // useMediaQuery reports false until it runs on the client, so rendering a
  // <video> during SSR always picks the desktop clip. On a phone that clip
  // autoplays and reaches its "Always here to detangle" title card before
  // hydration can swap it — and downloads ~250 KB that mobile then discards.
  // Hold the (text-free) poster until the breakpoint is known, then mount
  // exactly one video.
  //
  // Ordering matters: useMediaQuery's effect is declared above this one, so
  // setMatches runs first and React batches both updates into a single
  // re-render. There is therefore no in-between commit where mounted is true
  // but isMobile is still a stale false — which is exactly the commit that
  // would flash the desktop clip's title card.
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

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
        {!mounted ? (
          /* Placeholder for the first paint, before the breakpoint is known.
             Deliberately the same image both <video>s use as their poster, laid
             out identically, so the swap to video is invisible — and it stays
             put if JS never runs. */
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src="/hero/knot-poster.jpg"
            alt=""
            aria-hidden="true"
            fetchPriority="high"
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "contain",
            }}
          />
        ) : isMobile ? (
          /* Plays in its natural landscape orientation — `contain` centres the
             full animation as a horizontal band, with the section's own --dark
             background filling above and below (so it doesn't read as
             letterboxing). Same fit as desktop.

             Converted from the 289 MB knot0last GIF to H.264 (45 KB) — see
             /public/hero. Only its first 3 s animate; the remaining 114 were a
             frozen duplicate frame, so it's trimmed to the motion and loops.
             MP4 only: VP9 came out heavier than H.264 on this flat-colour
             artwork, and H.264 is universal on mobile. Shares the desktop
             poster — same artwork, one fewer asset.

             The `key` is load-bearing, not decoration: both branches render a
             <video> in the same tree position, so without distinct keys React
             reuses one DOM node and merely rewrites the <source>. Swapping a
             <source> on a video that has already loaded does nothing without an
             explicit .load() call — the old clip just keeps playing. Distinct
             keys force a real unmount/mount, so the new file actually loads. */
          <video
            key="hero-mobile"
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
            <source src="/hero/knot-mobile.mp4" type="video/mp4" />
          </video>
        ) : (
          // Full-bleed hero animation. Converted from a 13 MB GIF to WebM/MP4
          // (~250 KB) — see /public/hero. Poster paints instantly as the LCP.
          // Keyed for the same reason as the mobile branch above.
          <video
            key="hero-desktop"
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