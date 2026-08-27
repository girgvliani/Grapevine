"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Script from "next/script";
import birdImg from "./assets/Component 9.png";
import { useLang } from "./LanguageProvider";
import { useMediaQuery, TABLET_QUERY } from "@/lib/useMediaQuery";
import { mtavruli } from "@/lib/i18n";

const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

declare global {
  interface Window {
    turnstile?: {
      render: (
        container: HTMLElement,
        options: {
          sitekey: string;
          callback: (token: string) => void;
          "error-callback"?: () => void;
          "expired-callback"?: () => void;
        }
      ) => string;
      reset: (widgetId: string) => void;
    };
  }
}

// Renders Cloudflare Turnstile invisibly and hands the verification token up
// via onToken — kept separate so the widget only mounts/unmounts once, not
// on every Cta re-render.
function Turnstile({ onToken }: { onToken: (token: string) => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetId = useRef<string | null>(null);

  function renderWidget() {
    if (!containerRef.current || !window.turnstile || !TURNSTILE_SITE_KEY) return;
    widgetId.current = window.turnstile.render(containerRef.current, {
      sitekey: TURNSTILE_SITE_KEY,
      callback: onToken,
      "error-callback": () => onToken(""),
      "expired-callback": () => onToken(""),
    });
  }

  useEffect(() => {
    if (window.turnstile) renderWidget();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!TURNSTILE_SITE_KEY) return null;

  return (
    <>
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js"
        strategy="afterInteractive"
        onReady={renderWidget}
      />
      <div ref={containerRef} />
    </>
  );
}

function FloatingField({
  label,
  type = "text",
  placeholder,
  multiline = false,
  name,
  value,
  onChange,
  required = false,
}: {
  label: string;
  type?: string;
  placeholder: string;
  multiline?: boolean;
  name: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
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
          name={name}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={5}
          required={required}
          style={{ ...sharedStyle, display: "block" }}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />
      ) : (
        <input
          name={name}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          type={type}
          placeholder={placeholder}
          required={required}
          style={sharedStyle}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />
      )}
    </div>
  );
}

export default function Cta({
  eyebrow,
  standalone = false,
}: {
  // Optional label above the heading — used by the dedicated /contact page.
  eyebrow?: string;
  // `true` on the /contact route: adds top padding to clear the fixed nav.
  standalone?: boolean;
} = {}) {
  const { t } = useLang();
  // Stack the heading/card/form into one column from tablet width down — the
  // side-by-side form + card only fits comfortably on desktop.
  const isMobile = useMediaQuery(TABLET_QUERY);

  const [form, setForm] = useState({ email: "", subject: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [turnstileToken, setTurnstileToken] = useState("");
  // Bumped after every submit attempt to force the Turnstile widget to
  // remount — tokens are single-use, so a retry needs a fresh one.
  const [turnstileKey, setTurnstileKey] = useState(0);
  // Turnstile doesn't mount at all until Submit is pressed — nothing is
  // loaded/rendered up front. Pressing Submit mounts it and waits for the
  // token via the effect below before the actual request goes out.
  const [showTurnstile, setShowTurnstile] = useState(false);

  async function sendForm(token: string) {
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, turnstileToken: token }),
      });
      if (!res.ok) throw new Error("request_failed");
      setStatus("success");
      setForm({ email: "", subject: "", message: "" });
    } catch {
      setStatus("error");
    } finally {
      setTurnstileToken("");
      setTurnstileKey((k) => k + 1);
      setShowTurnstile(false);
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (status === "sending") return;
    if (TURNSTILE_SITE_KEY && !turnstileToken) {
      // First press: mount Turnstile and wait — sendForm runs once the
      // widget's callback delivers a token (see the effect below).
      setStatus("sending");
      setShowTurnstile(true);
      return;
    }
    sendForm(turnstileToken);
  }

  useEffect(() => {
    if (status === "sending" && turnstileToken) sendForm(turnstileToken);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [turnstileToken]);

  const heading = (
    <>
      {eyebrow && (
        <div
          style={{
            color: "var(--orange)",
            fontSize: "0.75rem",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            fontFamily: "var(--font-primary)",
            marginBottom: "1rem",
          }}
        >
          {eyebrow}
        </div>
      )}
      <h2
        style={{
          fontSize: "clamp(2rem, 5vw, 3.75rem)",
          fontWeight: 900,
          letterSpacing: "-0.02em",
          color: "var(--dark)",
          fontFamily: "var(--font-heading)",
          lineHeight: 1,
          marginBottom: isMobile ? 0 : "2.5rem",
        }}
      >
        {mtavruli(t.cta.heading)}
      </h2>
    </>
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
        <Image src={birdImg} alt="Grapevine bird" fill sizes="(max-width: 640px) 60vw, 30vw" style={{ objectFit: "contain" }} />
      </div>
    </div>
  );

  const formBody = (
          <form
            style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}
            onSubmit={handleSubmit}
          >
            <FloatingField
              label={t.cta.fields.email}
              type="email"
              placeholder={t.cta.placeholders.email}
              name="email"
              value={form.email}
              onChange={(v) => setForm((f) => ({ ...f, email: v }))}
              required
            />
            <FloatingField
              label={t.cta.fields.subject}
              placeholder={t.cta.placeholders.subject}
              name="subject"
              value={form.subject}
              onChange={(v) => setForm((f) => ({ ...f, subject: v }))}
            />
            <FloatingField
              label={t.cta.fields.message}
              placeholder={t.cta.placeholders.message}
              multiline
              name="message"
              value={form.message}
              onChange={(v) => setForm((f) => ({ ...f, message: v }))}
              required
            />

            {showTurnstile && <Turnstile key={turnstileKey} onToken={setTurnstileToken} />}

            {/* Send button */}
            <button
              type="submit"
              disabled={status === "sending"}
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
                cursor: status === "sending" ? "default" : "none",
                opacity: status === "sending" ? 0.7 : 1,
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
              {status === "sending" ? t.cta.sending : t.cta.send}
            </button>

            {(status === "success" || status === "error") && (
              <div
                role="status"
                style={{
                  textAlign: "center",
                  fontSize: "0.8125rem",
                  color: status === "success" ? "var(--purple-dark)" : "#c0392b",
                  fontFamily: "var(--font-primary)",
                }}
              >
                {status === "success" ? t.cta.success : t.cta.error}
              </div>
            )}

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
                  <a href="mailto:info@grapevine.ge" style={{ fontSize: "0.75rem", color: "var(--dark)", fontFamily: "var(--font-primary)", textDecoration: "none", borderBottom: "1px solid rgba(26,5,18,0.2)" }}>
                    info@grapevine.ge
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
                  <a href="tel:+995599495574" style={{ fontSize: "0.75rem", color: "var(--dark)", fontFamily: "var(--font-primary)", textDecoration: "none" }}>
                    +995 599 495 574
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
                    {[
                      { label: "f", href: "https://www.facebook.com/share/1EK3dwXeqv/?mibextid=wwXIfr" },
                      { label: "in", href: "https://www.linkedin.com/company/grapevine-georgia/" },
                      { label: "ig", href: "https://www.instagram.com/grapevine.agency?igsh=MTJxdnRhdjdrbXhrNA==" },
                    ].map(({ label, href }) => (
                      <a
                        key={label}
                        href={href}
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
                          textDecoration: "none",
                          cursor: "none",
                        }}
                      >
                        {label}
                      </a>
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
        padding: standalone
          ? "8.5rem clamp(1.5rem, 6vw, 3.75rem) 6.25rem"
          : "5rem clamp(1.5rem, 6vw, 3.75rem) 6.25rem",
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
