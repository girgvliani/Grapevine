"use client";

import { motion } from "framer-motion";
import type { Transition } from "framer-motion";
import Image from "next/image";
import heroGif from "./assets/GIF/knot-landing page.gif";
import heroMobile from "./assets/mobileversion.png";
import { useLang } from "./LanguageProvider";
import { useMediaQuery, MOBILE_QUERY } from "@/lib/useMediaQuery";

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

const fadeUp = (delay: number) =>
  ({
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, delay, ease: EASE } as Transition,
  } as const);

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
      {/* Hero GIF — full bleed background */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.2, ease: EASE }}
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          overflow: "hidden",
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
            <Image src={heroMobile} alt="" fill unoptimized style={{ objectFit: "cover" }} />
          </div>
        ) : (
          <Image src={heroGif} alt="" fill unoptimized style={{ objectFit: "contain" }} />
        )}
        <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.35)" }} />
      </motion.div>

      {/* Label — top left */}
      <motion.div
        {...fadeUp(0.4)}
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
        }}
      >
        {t.hero.label}
      </motion.div>

      {/* Description — bottom left */}
      <motion.p
        {...fadeUp(1.0)}
        style={{
          position: "absolute",
          bottom: "clamp(3rem, 8vh, 5rem)",
          left: "clamp(1.5rem, 5vw, 2.5rem)",
          maxWidth: "17.5rem",
          fontSize: "0.75rem",
          lineHeight: 1.9,
          opacity: 0.55,
          fontFamily: "var(--font-primary)",
          zIndex: 1,
        }}
      >
        {t.hero.description}
      </motion.p>

      {/* Scroll hint — bottom right */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.35 }}
        transition={{ delay: 1.6, duration: 1 }}
        style={{
          position: "absolute",
          bottom: "clamp(1.5rem, 4vh, 2.5rem)",
          right: "clamp(1.5rem, 5vw, 2.5rem)",
          display: "flex",
          alignItems: "center",
          gap: "0.75rem",
          fontSize: "0.5625rem",
          letterSpacing: "0.25em",
          textTransform: "uppercase",
          fontFamily: "var(--font-primary)",
          zIndex: 1,
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
      </motion.div>
    </section>
  );
}
