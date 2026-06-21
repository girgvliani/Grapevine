"use client";

import { useState } from "react";
import Image from "next/image";
import birdImg from "./assets/Component 9.png";
import { useLang } from "./LanguageProvider";
import { useMediaQuery, MOBILE_QUERY } from "@/lib/useMediaQuery";

function FloatingField({
  label,
  type = "text",
  placeholder,
  multiline = false,
}: {
  label: string;
  type?: string;
  placeholder: string;
  multiline?: boolean;
}) {
  const [focused, setFocused] = useState(false);

  const borderColor = focused ? "var(--purple-dark)" : "rgba(26,5,18,0.25)";
  const labelColor = focused ? "var(--purple-dark)" : "rgba(26,5,18,0.5)";

  const sharedStyle: React.CSSProperties = {
    width: "100%",
    background: "transparent",
    border: "none",
    outline: "none",
    fontSize: "0.875rem",
    fontFamily: "var(--font-primary)",
    color: "var(--dark)",
    padding: "0.625rem 0.875rem",
    resize: "none",
  };

  return (
    <div
      style={{
        position: "relative",
        border: `1px solid ${borderColor}`,
        borderRadius: "0.5rem",
        transition: "border-color 0.2s",
      }}
    >
      {/* Floating label */}
      <span
        style={{
          position: "absolute",
          top: "-0.625rem",
          left: "0.75rem",
          fontSize: "0.6875rem",
          fontFamily: "var(--font-primary)",
          color: labelColor,
          background: "var(--cream)",
          padding: "0 0.25rem",
          letterSpacing: "0.05em",
          transition: "color 0.2s",
        }}
      >
        {label}
      </span>

      {multiline ? (
        <textarea
          placeholder={placeholder}
          rows={5}
          style={{ ...sharedStyle, display: "block" }}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />
      ) : (
        <input
          type={type}
          placeholder={placeholder}
          style={sharedStyle}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />
      )}
    </div>
  );
}

export default function Cta() {
  const { t } = useLang();
  const isMobile = useMediaQuery(MOBILE_QUERY);

  const heading = (
    <h2
      style={{
        fontSize: "clamp(2rem, 5vw, 3.75rem)",
        fontWeight: 900,
        textTransform: "uppercase",
        letterSpacing: "-0.02em",
        color: "var(--dark)",
        fontFamily: "var(--font-heading)",
        lineHeight: 1,
        marginBottom: isMobile ? 0 : "2.5rem",
      }}
    >
      {t.cta.heading}
    </h2>
  );

  const card = (
    <div
      style={{
        flex: isMobile ? "0 0 auto" : "0 0 38%",
        width: isMobile ? "100%" : undefined,
        background: "var(--orange)",
        borderRadius: "1.5rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "2.5rem",
        aspectRatio: isMobile ? "1 / 0.8" : "1 / 1",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div style={{ position: "relative", width: "80%", aspectRatio: "1 / 1" }}>
        <Image src={birdImg} alt="Grapevine bird" fill style={{ objectFit: "contain" }} />
      </div>
    </div>
  );

  const formBody = (
          <form
            style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}
            onSubmit={(e) => e.preventDefault()}
          >
            <FloatingField label={t.cta.fields.email} type="email" placeholder={t.cta.placeholders.email} />
            <FloatingField label={t.cta.fields.subject} placeholder={t.cta.placeholders.subject} />
            <FloatingField label={t.cta.fields.message} placeholder={t.cta.placeholders.message} multiline />

            {/* Send button */}
            <button
              type="submit"
              style={{
                width: "100%",
                padding: "1rem",
                background: "var(--purple-dark)",
                color: "#fff",
                border: "none",
                borderRadius: "100px",
                fontSize: "0.875rem",
                fontWeight: 700,
                letterSpacing: "0.08em",
                fontFamily: "var(--font-primary)",
                transition: "background 0.2s, transform 0.2s",
                cursor: "none",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background = "#a030aa";
                (e.currentTarget as HTMLButtonElement).style.transform = "scale(1.01)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background = "var(--purple-dark)";
                (e.currentTarget as HTMLButtonElement).style.transform = "none";
              }}
            >
              {t.cta.send}
            </button>

            {/* Or divider */}
            <div
              style={{
                textAlign: "center",
                fontSize: "0.75rem",
                color: "rgba(26,5,18,0.4)",
                fontFamily: "var(--font-primary)",
                letterSpacing: "0.1em",
              }}
            >
              {t.cta.or}
            </div>

            {/* Contact info row */}
            <div
              style={{
                display: "flex",
                flexDirection: isMobile ? "column" : "row",
                gap: isMobile ? "1.25rem" : "2rem",
                flexWrap: "wrap",
              }}
            >
              {/* Email */}
              <div style={{ display: "flex", alignItems: "flex-start", gap: "0.5rem" }}>
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" style={{ marginTop: "0.125rem", flexShrink: 0 }}>
                  <rect x="1" y="3" width="16" height="12" rx="2" stroke="#1A0512" strokeWidth="1.3" fill="none" opacity="0.5" />
                  <path d="M1 5L9 10L17 5" stroke="#1A0512" strokeWidth="1.3" strokeLinecap="round" opacity="0.5" />
                </svg>
                <div>
                  <div style={{ fontSize: "0.625rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(26,5,18,0.5)", fontFamily: "var(--font-primary)", marginBottom: "0.125rem" }}>{t.cta.contact.email}</div>
                  <a href="mailto:placeholder@gmail.com" style={{ fontSize: "0.75rem", color: "var(--dark)", fontFamily: "var(--font-primary)", textDecoration: "none", borderBottom: "1px solid rgba(26,5,18,0.2)" }}>
                    placeholder@gmail.com
                  </a>
                </div>
              </div>

              {/* Phone */}
              <div style={{ display: "flex", alignItems: "flex-start", gap: "0.5rem" }}>
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" style={{ marginTop: "0.125rem", flexShrink: 0 }}>
                  <path d="M3 2h4l1.5 4-2 1.5a10 10 0 004 4L12 9.5l4 1.5v4a1 1 0 01-1 1C6 16 2 10 2 3a1 1 0 011-1z" stroke="#1A0512" strokeWidth="1.3" fill="none" opacity="0.5" />
                </svg>
                <div>
                  <div style={{ fontSize: "0.625rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(26,5,18,0.5)", fontFamily: "var(--font-primary)", marginBottom: "0.125rem" }}>{t.cta.contact.phone}</div>
                  <a href="tel:+995557544555" style={{ fontSize: "0.75rem", color: "var(--dark)", fontFamily: "var(--font-primary)", textDecoration: "none" }}>
                    +995 557 544 555
                  </a>
                </div>
              </div>

              {/* Social */}
              <div style={{ display: "flex", alignItems: "flex-start", gap: "0.5rem" }}>
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" style={{ marginTop: "0.125rem", flexShrink: 0 }}>
                  <circle cx="9" cy="7" r="3" stroke="#1A0512" strokeWidth="1.3" fill="none" opacity="0.5" />
                  <path d="M2 16c0-3 3-5 7-5s7 2 7 5" stroke="#1A0512" strokeWidth="1.3" strokeLinecap="round" fill="none" opacity="0.5" />
                </svg>
                <div>
                  <div style={{ fontSize: "0.625rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(26,5,18,0.5)", fontFamily: "var(--font-primary)", marginBottom: "0.375rem" }}>{t.cta.contact.social}</div>
                  <div style={{ display: "flex", gap: "0.375rem" }}>
                    {["f", "in", "ig"].map((s) => (
                      <div
                        key={s}
                        style={{
                          width: "1.625rem",
                          height: "1.625rem",
                          border: "1px solid rgba(26,5,18,0.25)",
                          borderRadius: "0.375rem",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "0.625rem",
                          fontWeight: 700,
                          color: "rgba(26,5,18,0.6)",
                          fontFamily: "var(--font-primary)",
                          cursor: "none",
                        }}
                      >
                        {s}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </form>
  );

  return (
    <section
      id="cta"
      style={{
        background: "var(--cream)",
        padding: "5rem clamp(1.5rem, 6vw, 3.75rem) 6.25rem",
      }}
    >
      {isMobile ? (
        <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
          {heading}
          {card}
          {formBody}
        </div>
      ) : (
        <div
          className="container-cap"
          style={{
            display: "flex",
            gap: "clamp(2rem, 5vw, 3.75rem)",
            alignItems: "flex-start",
          }}
        >
          <div style={{ flex: 1 }}>
            {heading}
            {formBody}
          </div>
          {card}
        </div>
      )}
    </section>
  );
}
