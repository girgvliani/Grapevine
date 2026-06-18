"use client";

import Image from "next/image";
import birdImg from "./assets/Component 9.png";
import logoBlack from "./assets/logoblack.png";

export default function Footer() {
  return (
    <footer
      style={{
        background: "var(--cream)",
        position: "relative",
        overflow: "hidden",
        borderTop: "1px solid rgba(26,5,18,0.1)",
      }}
    >
      {/* Faded bird — right side, below the social icons */}
      <div
        style={{
          position: "absolute",
          right: "12rem",
          top: "3.5rem",
          width: "13.75rem",
          height: "13.75rem",
          opacity: 0.1,
          pointerEvents: "none",
        }}
      >
        <Image src={birdImg} alt="" fill style={{ objectFit: "contain", objectPosition: "right top" }} />
      </div>

      {/* Main content */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          padding: "3.25rem clamp(1.5rem, 5vw, 3rem) 2.5rem",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Left — logo + tagline */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          <Image src={logoBlack} alt="Grapevine" style={{ width: "5.625rem", height: "auto" }} />

          <h3
            style={{
              fontSize: "clamp(1.125rem, 2.5vw, 1.75rem)",
              fontWeight: 900,
              textTransform: "uppercase",
              letterSpacing: "-0.01em",
              color: "var(--dark)",
              fontFamily: "var(--font-heading)",
              lineHeight: 1.1,
              maxWidth: "16.25rem",
            }}
          >
            For Brands That
            <br />
            Want To Grow.
          </h3>
        </div>

        {/* Middle — quick links */}
        <div>
          <div
            style={{
              fontSize: "0.6875rem",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "rgba(26,5,18,0.45)",
              fontFamily: "var(--font-primary)",
              marginBottom: "1rem",
            }}
          >
            Quick Links
          </div>
          <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.625rem" }}>
            {[
              { label: "Services", href: "#services" },
              { label: "Portfolio", href: "#work" },
              { label: "Contact", href: "#cta" },
            ].map(({ label, href }) => (
              <li key={href}>
                <a
                  href={href}
                  style={{
                    fontSize: "0.8125rem",
                    color: "var(--dark)",
                    fontFamily: "var(--font-primary)",
                    textDecoration: "none",
                    opacity: 0.7,
                    transition: "opacity 0.2s",
                  }}
                  onMouseEnter={(e) => ((e.target as HTMLAnchorElement).style.opacity = "1")}
                  onMouseLeave={(e) => ((e.target as HTMLAnchorElement).style.opacity = "0.7")}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Right — CTA button + socials */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "1rem" }}>
          <button
            style={{
              background: "var(--dark)",
              color: "var(--cream)",
              padding: "0.75rem 1.375rem",
              borderRadius: "100px",
              fontSize: "0.75rem",
              fontWeight: 700,
              letterSpacing: "0.06em",
              fontFamily: "var(--font-primary)",
              border: "none",
              cursor: "none",
              whiteSpace: "nowrap",
              transition: "background 0.2s",
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.background = "var(--purple-dark)")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.background = "var(--dark)")}
            onClick={() => document.getElementById("cta")?.scrollIntoView({ behavior: "smooth" })}
          >
            Untangle Your Mess
          </button>

          {/* Social icons */}
          <div style={{ display: "flex", gap: "0.5rem" }}>
            {[
              { label: "f", href: "#" },
              { label: "ig", href: "#" },
              { label: "in", href: "#" },
            ].map(({ label, href }) => (
              <a
                key={label}
                href={href}
                style={{
                  width: "2.25rem",
                  height: "2.25rem",
                  background: "var(--dark)",
                  borderRadius: "0.5rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "var(--cream)",
                  fontSize: "0.6875rem",
                  fontWeight: 700,
                  fontFamily: "var(--font-primary)",
                  textDecoration: "none",
                  transition: "background 0.2s",
                  cursor: "none",
                }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.background = "var(--purple-dark)")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.background = "var(--dark)")}
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        style={{
          borderTop: "1px solid rgba(26,5,18,0.1)",
          padding: "1rem clamp(1.5rem, 5vw, 3rem)",
          textAlign: "center",
          fontSize: "0.6875rem",
          color: "rgba(26,5,18,0.4)",
          fontFamily: "var(--font-primary)",
          letterSpacing: "0.08em",
          position: "relative",
          zIndex: 1,
        }}
      >
        Copyright © 2026 | All Rights Reserved
      </div>
    </footer>
  );
}
