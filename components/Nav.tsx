"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import logo from "./assets/logo.png";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        padding: "1.25rem clamp(1.5rem, 5vw, 2.5rem)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        transition: "background 0.3s ease",
        background: scrolled ? "rgba(26, 5, 18, 0.85)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
      }}
    >
      {/* Logo */}
      <Image src={logo} alt="Grapevine" style={{ width: "5.625rem", height: "auto" }} priority />

      {/* Links */}
      <ul
        style={{
          display: "flex",
          gap: "2.25rem",
          listStyle: "none",
        }}
      >
        {[
          { href: "#services", label: "Services" },
          { href: "#work", label: "Portfolio" },
        ].map(({ href, label }) => (
          <li key={href}>
            <a
              href={href}
              style={{
                color: "var(--white)",
                textDecoration: "none",
                fontSize: "0.75rem",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                opacity: 0.75,
                transition: "opacity 0.2s",
                fontFamily: "var(--font-primary)",
              }}
              onMouseEnter={(e) =>
                ((e.target as HTMLAnchorElement).style.opacity = "1")
              }
              onMouseLeave={(e) =>
                ((e.target as HTMLAnchorElement).style.opacity = "0.75")
              }
            >
              {label}
            </a>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <button
        style={{
          background: "var(--purple-dark)",
          color: "var(--white)",
          padding: "0.625rem 1.375rem",
          borderRadius: "100px",
          fontSize: "0.75rem",
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          fontFamily: "var(--font-primary)",
          border: "none",
          fontWeight: 700,
          transition: "transform 0.2s, background 0.2s",
        }}
        onMouseEnter={(e) => {
          const btn = e.currentTarget;
          btn.style.background = "#a030aa";
          btn.style.transform = "scale(1.04)";
        }}
        onMouseLeave={(e) => {
          const btn = e.currentTarget;
          btn.style.background = "var(--purple-dark)";
          btn.style.transform = "scale(1)";
        }}
        onClick={() =>
          document.getElementById("cta")?.scrollIntoView({ behavior: "smooth" })
        }
      >
        Grow With Us
      </button>
    </nav>
  );
}
