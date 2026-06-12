"use client";

import Image from "next/image";
import birdImg from "./assets/Component 9.png";

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
      {/* Faded bird — right side background */}
      <div
        style={{
          position: "absolute",
          right: "80px",
          bottom: "30px",
          width: "220px",
          height: "220px",
          opacity: 0.1,
          pointerEvents: "none",
        }}
      >
        <Image src={birdImg} alt="" fill style={{ objectFit: "contain", objectPosition: "right bottom" }} />
      </div>

      {/* Main content */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          padding: "52px 48px 40px",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Left — logo + tagline */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div
            style={{
              fontSize: "14px",
              fontWeight: 900,
              textTransform: "uppercase",
              lineHeight: 1.1,
              letterSpacing: "0.05em",
              color: "var(--dark)",
              fontFamily: "var(--font-primary)",
            }}
          >
            GRAPE
            <br />
            VINE
          </div>

          <h3
            style={{
              fontSize: "clamp(18px, 2.5vw, 28px)",
              fontWeight: 900,
              textTransform: "uppercase",
              letterSpacing: "-0.01em",
              color: "var(--dark)",
              fontFamily: "var(--font-heading)",
              lineHeight: 1.1,
              maxWidth: "260px",
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
              fontSize: "11px",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "rgba(26,5,18,0.45)",
              fontFamily: "var(--font-primary)",
              marginBottom: "16px",
            }}
          >
            Quick Links
          </div>
          <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "10px" }}>
            {[
              { label: "Services", href: "#services" },
              { label: "Portfolio", href: "#work" },
              { label: "Contact", href: "#cta" },
            ].map(({ label, href }) => (
              <li key={href}>
                <a
                  href={href}
                  style={{
                    fontSize: "13px",
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
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "16px" }}>
          <button
            style={{
              background: "var(--dark)",
              color: "var(--cream)",
              padding: "12px 22px",
              borderRadius: "100px",
              fontSize: "12px",
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
          <div style={{ display: "flex", gap: "8px" }}>
            {[
              { label: "f", href: "#" },
              { label: "ig", href: "#" },
              { label: "in", href: "#" },
            ].map(({ label, href }) => (
              <a
                key={label}
                href={href}
                style={{
                  width: "36px",
                  height: "36px",
                  background: "var(--dark)",
                  borderRadius: "8px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "var(--cream)",
                  fontSize: "11px",
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
          padding: "16px 48px",
          textAlign: "center",
          fontSize: "11px",
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
