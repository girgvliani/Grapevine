"use client";

import { useState } from "react";

const BEHANCE_URL = "https://www.behance.net/grapevineagency";

function BehanceIcon({ size = 16 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      style={{ display: "block", flexShrink: 0 }}
    >
      <path d="M22 7h-7V5h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-3.074 0-5.564-1.729-5.564-5.675 0-3.91 2.325-5.92 5.466-5.92 3.082 0 4.964 1.782 5.375 4.426.078.506.109 1.188.095 2.14H15.97c.13 3.211 3.483 3.312 4.588 2.029h3.168zm-7.686-4h4.965c-.105-1.547-1.136-2.219-2.477-2.219-1.466 0-2.277.768-2.488 2.219zm-9.574 6.988H0V5.021h6.953c5.476.081 5.58 5.444 2.72 6.906 3.461 1.26 3.577 8.061-3.201 8.061zM3 11h3.584c2.508 0 2.906-3-.312-3H3v3zm3.391 3H3v3.016h3.341c3.055 0 2.868-3.016.05-3.016z" />
    </svg>
  );
}

/**
 * Link to the Grapevine Behance profile.
 *
 * - `pill`  — labelled outline pill for the top of the Services / Portfolio
 *             headers (dark hero background). Inverts + lifts on hover.
 * - `badge` — icon-only square that matches the Footer social badges (cream
 *             background). Fills purple on hover, like its siblings.
 */
export default function BehanceLink({ variant = "pill" }: { variant?: "pill" | "badge" }) {
  const [hover, setHover] = useState(false);

  const common = {
    href: BEHANCE_URL,
    target: "_blank" as const,
    rel: "noopener noreferrer",
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
  };

  if (variant === "badge") {
    return (
      <a
        {...common}
        aria-label="Grapevine on Behance"
        style={{
          width: "2.25rem",
          height: "2.25rem",
          background: hover ? "var(--purple-dark)" : "var(--dark)",
          borderRadius: "0.5rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "var(--cream)",
          textDecoration: "none",
          transition: "background 0.2s",
          cursor: "none",
        }}
      >
        <BehanceIcon size={16} />
      </a>
    );
  }

  return (
    <a
      {...common}
      aria-label="See our work on Behance"
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "0.5rem",
        padding: "0.5rem 0.95rem",
        borderRadius: "100px",
        border: `1px solid ${hover ? "var(--cream)" : "rgba(255,250,236,0.35)"}`,
        background: hover ? "var(--cream)" : "transparent",
        color: hover ? "var(--dark)" : "var(--cream)",
        fontFamily: "var(--font-primary)",
        fontSize: "0.75rem",
        fontWeight: 700,
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        textDecoration: "none",
        whiteSpace: "nowrap",
        transition: "background 0.25s, color 0.25s, border-color 0.25s, transform 0.25s",
        transform: hover ? "translateY(-2px)" : "none",
        cursor: "none",
      }}
    >
      <BehanceIcon size={15} />
      <span style={{ lineHeight: 1, position: "relative", top: "0.2em" }}>Behance</span>
    </a>
  );
}