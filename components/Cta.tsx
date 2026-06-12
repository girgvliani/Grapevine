"use client";

import { useState } from "react";
import Image from "next/image";
import birdImg from "./assets/Component 9.png";

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
    fontSize: "14px",
    fontFamily: "var(--font-primary)",
    color: "var(--dark)",
    padding: "10px 14px",
    resize: "none",
  };

  return (
    <div
      style={{
        position: "relative",
        border: `1px solid ${borderColor}`,
        borderRadius: "8px",
        transition: "border-color 0.2s",
      }}
    >
      {/* Floating label */}
      <span
        style={{
          position: "absolute",
          top: "-10px",
          left: "12px",
          fontSize: "11px",
          fontFamily: "var(--font-primary)",
          color: labelColor,
          background: "var(--cream)",
          padding: "0 4px",
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
  return (
    <section
      id="cta"
      style={{
        background: "var(--cream)",
        padding: "80px 60px 100px",
      }}
    >
      <div
        style={{
          display: "flex",
          gap: "60px",
          alignItems: "flex-start",
        }}
      >
        {/* Left — form */}
        <div style={{ flex: 1 }}>
          {/* Heading */}
          <h2
            style={{
              fontSize: "clamp(32px, 5vw, 60px)",
              fontWeight: 900,
              textTransform: "uppercase",
              letterSpacing: "-0.02em",
              color: "var(--dark)",
              fontFamily: "var(--font-heading)",
              lineHeight: 1,
              marginBottom: "40px",
            }}
          >
            Let&apos;s Talk Mess.
          </h2>

          {/* Form */}
          <form
            style={{ display: "flex", flexDirection: "column", gap: "20px" }}
            onSubmit={(e) => e.preventDefault()}
          >
            <FloatingField label="Email" type="email" placeholder="Enter Email" />
            <FloatingField label="Subject" placeholder="Subject" />
            <FloatingField label="Message" placeholder="Write your message..." multiline />

            {/* Send button */}
            <button
              type="submit"
              style={{
                width: "100%",
                padding: "16px",
                background: "var(--purple-dark)",
                color: "#fff",
                border: "none",
                borderRadius: "100px",
                fontSize: "14px",
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
              Send
            </button>

            {/* Or divider */}
            <div
              style={{
                textAlign: "center",
                fontSize: "12px",
                color: "rgba(26,5,18,0.4)",
                fontFamily: "var(--font-primary)",
                letterSpacing: "0.1em",
              }}
            >
              or
            </div>

            {/* Contact info row */}
            <div
              style={{
                display: "flex",
                gap: "32px",
                flexWrap: "wrap",
              }}
            >
              {/* Email */}
              <div style={{ display: "flex", alignItems: "flex-start", gap: "8px" }}>
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" style={{ marginTop: "2px", flexShrink: 0 }}>
                  <rect x="1" y="3" width="16" height="12" rx="2" stroke="#1A0512" strokeWidth="1.3" fill="none" opacity="0.5" />
                  <path d="M1 5L9 10L17 5" stroke="#1A0512" strokeWidth="1.3" strokeLinecap="round" opacity="0.5" />
                </svg>
                <div>
                  <div style={{ fontSize: "10px", letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(26,5,18,0.5)", fontFamily: "var(--font-primary)", marginBottom: "2px" }}>Email</div>
                  <a href="mailto:placeholder@gmail.com" style={{ fontSize: "12px", color: "var(--dark)", fontFamily: "var(--font-primary)", textDecoration: "none", borderBottom: "1px solid rgba(26,5,18,0.2)" }}>
                    placeholder@gmail.com
                  </a>
                </div>
              </div>

              {/* Phone */}
              <div style={{ display: "flex", alignItems: "flex-start", gap: "8px" }}>
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" style={{ marginTop: "2px", flexShrink: 0 }}>
                  <path d="M3 2h4l1.5 4-2 1.5a10 10 0 004 4L12 9.5l4 1.5v4a1 1 0 01-1 1C6 16 2 10 2 3a1 1 0 011-1z" stroke="#1A0512" strokeWidth="1.3" fill="none" opacity="0.5" />
                </svg>
                <div>
                  <div style={{ fontSize: "10px", letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(26,5,18,0.5)", fontFamily: "var(--font-primary)", marginBottom: "2px" }}>Phone Number</div>
                  <a href="tel:+995557544555" style={{ fontSize: "12px", color: "var(--dark)", fontFamily: "var(--font-primary)", textDecoration: "none" }}>
                    +995 557 544 555
                  </a>
                </div>
              </div>

              {/* Social */}
              <div style={{ display: "flex", alignItems: "flex-start", gap: "8px" }}>
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" style={{ marginTop: "2px", flexShrink: 0 }}>
                  <circle cx="9" cy="7" r="3" stroke="#1A0512" strokeWidth="1.3" fill="none" opacity="0.5" />
                  <path d="M2 16c0-3 3-5 7-5s7 2 7 5" stroke="#1A0512" strokeWidth="1.3" strokeLinecap="round" fill="none" opacity="0.5" />
                </svg>
                <div>
                  <div style={{ fontSize: "10px", letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(26,5,18,0.5)", fontFamily: "var(--font-primary)", marginBottom: "6px" }}>Social Media</div>
                  <div style={{ display: "flex", gap: "6px" }}>
                    {["f", "in", "ig"].map((s) => (
                      <div
                        key={s}
                        style={{
                          width: "26px",
                          height: "26px",
                          border: "1px solid rgba(26,5,18,0.25)",
                          borderRadius: "6px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "10px",
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
        </div>

        {/* Right — orange card with bird */}
        <div
          style={{
            flex: "0 0 38%",
            background: "var(--orange)",
            borderRadius: "24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "40px",
            aspectRatio: "1 / 1",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div style={{ position: "relative", width: "80%", aspectRatio: "1 / 1" }}>
            <Image
              src={birdImg}
              alt="Grapevine bird"
              fill
              style={{ objectFit: "contain" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
