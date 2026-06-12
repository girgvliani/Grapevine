"use client";

import { motion } from "framer-motion";
import type { Transition } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

const fadeUp = (delay: number) =>
  ({
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, delay, ease: EASE } as Transition,
  } as const);

// Static wire bundle — placeholder until animation is added
function WireBundle() {
  return (
    <svg
      width="420"
      height="360"
      viewBox="0 0 420 360"
      fill="none"
      style={{ display: "block" }}
    >
      {/* Loop 1 — orange */}
      <ellipse
        cx="200" cy="175" rx="130" ry="85"
        stroke="#EF583A" strokeWidth="3.5" fill="none"
        transform="rotate(-20 200 175)"
        opacity="0.9"
      />
      {/* Loop 2 — cream */}
      <ellipse
        cx="215" cy="185" rx="120" ry="75"
        stroke="#FFEFAB" strokeWidth="3" fill="none"
        transform="rotate(15 215 185)"
        opacity="0.85"
      />
      {/* Loop 3 — purple light */}
      <ellipse
        cx="195" cy="180" rx="115" ry="90"
        stroke="#AFA9FF" strokeWidth="3" fill="none"
        transform="rotate(50 195 180)"
        opacity="0.8"
      />
      {/* Loop 4 — purple dark */}
      <ellipse
        cx="210" cy="170" rx="100" ry="70"
        stroke="#902793" strokeWidth="3.5" fill="none"
        transform="rotate(-45 210 170)"
        opacity="0.75"
      />
      {/* Loop 5 — orange smaller */}
      <ellipse
        cx="205" cy="190" rx="85" ry="60"
        stroke="#EF583A" strokeWidth="2.5" fill="none"
        transform="rotate(80 205 190)"
        opacity="0.6"
      />
      {/* Loop 6 — cream smaller */}
      <ellipse
        cx="200" cy="175" rx="70" ry="50"
        stroke="#FFEFAB" strokeWidth="2" fill="none"
        transform="rotate(-70 200 175)"
        opacity="0.5"
      />
    </svg>
  );
}

export default function Hero() {
  return (
    <section
      style={{
        position: "relative",
        height: "100vh",
        minHeight: "640px",
        background: "var(--dark)",
        overflow: "hidden",
      }}
    >
      {/* Label — top left */}
      <motion.div
        {...fadeUp(0.4)}
        style={{
          position: "absolute",
          top: "110px",
          left: "40px",
          fontSize: "11px",
          letterSpacing: "0.3em",
          textTransform: "uppercase",
          color: "var(--orange)",
          fontFamily: "var(--font-primary)",
        }}
      >
        Marketing Agency — Since 2014
      </motion.div>

      {/* Wire bundle — centered */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, delay: 0.3, ease: EASE }}
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -52%)",
        }}
      >
        <WireBundle />
      </motion.div>

      {/* Full-width orange line */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1, delay: 0.6, ease: EASE }}
        style={{
          position: "absolute",
          top: "52%",
          left: 0,
          right: 0,
          height: "1.5px",
          background: "var(--orange)",
          transformOrigin: "left",
        }}
      />

      {/* Description — bottom left */}
      <motion.p
        {...fadeUp(1.0)}
        style={{
          position: "absolute",
          bottom: "80px",
          left: "40px",
          maxWidth: "280px",
          fontSize: "12px",
          lineHeight: 1.9,
          opacity: 0.55,
          fontFamily: "var(--font-primary)",
        }}
      >
        Grapevine finds the core thread of your brand and
        helps you grow it — free of chaos, full of direction.
      </motion.p>

      {/* Scroll hint — bottom right */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.35 }}
        transition={{ delay: 1.6, duration: 1 }}
        style={{
          position: "absolute",
          bottom: "40px",
          right: "40px",
          display: "flex",
          alignItems: "center",
          gap: "12px",
          fontSize: "9px",
          letterSpacing: "0.25em",
          textTransform: "uppercase",
          fontFamily: "var(--font-primary)",
        }}
      >
        <div
          className="scroll-line"
          style={{
            width: "36px",
            height: "1px",
            background: "var(--white)",
            transformOrigin: "left",
          }}
        />
        <span>Scroll to explore</span>
      </motion.div>
    </section>
  );
}
