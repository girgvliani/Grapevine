"use client";

import { motion } from "framer-motion";
import type { Transition } from "framer-motion";
import { useEffect } from "react";

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

const word = (delay: number) =>
  ({
    initial: { opacity: 0, y: "110%" },
    animate: { opacity: 1, y: "0%" },
    transition: { duration: 0.9, delay, ease: EASE } as Transition,
  } as const);

export default function Hero() {
  useEffect(() => {
    const hero = document.getElementById("hero");
    if (!hero) return;

    const onScroll = () => {
      hero.style.transform = `translateY(${window.scrollY * 0.3}px)`;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section
      id="hero"
      style={{
        height: "100vh",
        minHeight: "600px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        padding: "60px 40px 80px",
        overflow: "hidden",
        background: "var(--dark)",
        position: "relative",
      }}
    >
      {/* Background tangle SVG */}
      <svg
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          width: "100%",
          height: "100%",
          opacity: 0.07,
          pointerEvents: "none",
        }}
        viewBox="0 0 1200 800"
        fill="none"
        preserveAspectRatio="xMidYMid slice"
      >
        <path
          d="M100,400 C150,200 300,100 400,300 C500,500 350,600 500,400 C650,200 700,350 600,500 C500,650 700,700 800,500 C900,300 1000,400 1100,300"
          stroke="#EF583A"
          strokeWidth="3"
          fill="none"
          opacity="0.6"
        />
        <path
          d="M200,600 C300,400 500,500 400,300 C300,100 600,200 700,400 C800,600 900,300 1000,500"
          stroke="#AFA9FF"
          strokeWidth="2.5"
          fill="none"
          opacity="0.5"
        />
        <path
          d="M50,100 C200,300 100,500 300,600 C500,700 400,400 600,300 C800,200 700,500 900,600 C1100,700 1050,400 1150,200"
          stroke="#FFEFAB"
          strokeWidth="2"
          fill="none"
          opacity="0.3"
        />
      </svg>

      {/* Floating bird icon */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 1 }}
        style={{ position: "absolute", top: "25%", right: "60px" }}
      >
        <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
          <path
            d="M10,20 L10,65 Q10,70 15,70 L50,70 L50,50 Q50,35 65,35 Q65,20 50,20 Q45,15 35,18 Z"
            fill="#EF583A"
          />
          <circle cx="42" cy="30" r="5" fill="#1A0512" />
          <circle cx="44" cy="29" r="2" fill="#EF583A" />
        </svg>
      </motion.div>

      {/* Label */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
        style={{
          fontSize: "11px",
          letterSpacing: "0.3em",
          textTransform: "uppercase",
          color: "var(--orange)",
          marginBottom: "24px",
        }}
      >
        Marketing Agency — Since 2020
      </motion.div>

      {/* Hero title */}
      <h1
        style={{
          fontSize: "clamp(52px, 9vw, 120px)",
          lineHeight: 0.92,
          fontWeight: 900,
          textTransform: "uppercase",
          letterSpacing: "-0.03em",
          fontFamily: "'Arial Black', Arial, sans-serif",
          overflow: "hidden",
        }}
      >
        <span style={{ display: "block", overflow: "hidden" }}>
          <motion.span
            style={{ display: "inline-block", marginRight: "0.2em" }}
            {...word(0.5)}
          >
            We&nbsp;
          </motion.span>
          <motion.span style={{ display: "inline-block" }} {...word(0.65)}>
            Untangle
          </motion.span>
        </span>
        <span style={{ display: "block", overflow: "hidden" }}>
          <motion.span
            style={{ display: "inline-block", color: "var(--orange)" }}
            {...word(0.8)}
          >
            The&nbsp;Mess.
          </motion.span>
        </span>
      </h1>

      {/* Sub */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1, ease: "easeOut" }}
        style={{
          marginTop: "32px",
          maxWidth: "400px",
          fontSize: "13px",
          lineHeight: 1.8,
          opacity: 0.6,
        }}
      >
        Grapevine finds the core thread of your brand and helps you grow it —
        free of chaos, full of direction.
      </motion.p>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ delay: 1.5, duration: 1 }}
        style={{
          position: "absolute",
          bottom: "40px",
          right: "40px",
          display: "flex",
          alignItems: "center",
          gap: "12px",
          fontSize: "10px",
          letterSpacing: "0.2em",
          textTransform: "uppercase",
        }}
      >
        <div
          className="scroll-line"
          style={{
            width: "40px",
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
