"use client";

import { useEffect, useRef, useState } from "react";
import { useLang } from "@/components/LanguageProvider";

// Deployed support SPA (its own React app + /api/ask on Vercel). Override with
// NEXT_PUBLIC_SUPPORT_URL for previews / self-hosting.
const SUPPORT_URL = (
  process.env.NEXT_PUBLIC_SUPPORT_URL ?? "https://grapevine-support.vercel.app"
).replace(/\/+$/, "");

// Only postMessage the support iframe on its own origin.
const SUPPORT_ORIGIN = new URL(SUPPORT_URL).origin;

const LABELS = {
  ka: { open: "დახმარება", close: "დახურვა" },
  en: { open: "Support", close: "Close" },
} as const;

export default function SupportWidget() {
  const { lang } = useLang();
  const [open, setOpen] = useState(false);
  // Mount the iframe on first open, then keep it mounted so the conversation
  // survives closing/reopening and language switches.
  const [mounted, setMounted] = useState(false);
  const [entered, setEntered] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const readyRef = useRef(false);

  // Language baked into the iframe src, captured the moment it first mounts so
  // the greeting renders in the current language. We never change src afterward
  // (that would reload the widget and wipe the chat) — later switches go through
  // postMessage instead.
  const initialLangRef = useRef<string | null>(null);

  const label = LABELS[lang] ?? LABELS.ka;

  function openPanel() {
    if (initialLangRef.current === null) initialLangRef.current = lang;
    setMounted(true);
    setOpen(true);
    // Next frame so the enter transition runs from the closed state.
    requestAnimationFrame(() => setEntered(true));
  }

  function closePanel() {
    setEntered(false);
    setOpen(false);
  }

  function toggle() {
    if (open) closePanel();
    else openPanel();
  }

  // Push the live language into the widget whenever the site language changes
  // (or once the iframe finishes loading, in case it changed before load).
  function pushLang() {
    if (!readyRef.current) return;
    iframeRef.current?.contentWindow?.postMessage(
      { type: "grapevine:lang", lang },
      SUPPORT_ORIGIN
    );
  }

  useEffect(() => {
    pushLang();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang]);

  // Close on Escape.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closePanel();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div
      style={{
        position: "fixed",
        right: 24,
        bottom: 24,
        zIndex: 9990,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
        gap: 14,
      }}
    >
      {mounted && (
        <div
          role="dialog"
          aria-label="Grapevine support"
          aria-hidden={!open}
          style={{
            width: "min(384px, calc(100vw - 32px))",
            height: "min(600px, calc(100vh - 140px))",
            borderRadius: 18,
            overflow: "hidden",
            background: "var(--dark)",
            border: "1px solid rgba(255, 239, 171, 0.16)",
            boxShadow: "0 24px 60px -12px rgba(0, 0, 0, 0.55)",
            transformOrigin: "bottom right",
            transition: "opacity .22s ease, transform .22s ease",
            opacity: entered ? 1 : 0,
            transform: entered ? "none" : "translateY(12px) scale(.98)",
            pointerEvents: open ? "auto" : "none",
          }}
        >
          <iframe
            ref={iframeRef}
            title="Grapevine Support"
            src={`${SUPPORT_URL}/?lang=${initialLangRef.current ?? lang}&embed=1`}
            onLoad={() => {
              readyRef.current = true;
              pushLang();
            }}
            style={{ width: "100%", height: "100%", border: 0, display: "block" }}
          />
        </div>
      )}

      <button
        type="button"
        onClick={toggle}
        aria-expanded={open}
        aria-label={open ? label.close : label.open}
        style={{
          width: 58,
          height: 58,
          borderRadius: "50%",
          border: 0,
          background: "var(--orange)",
          color: "var(--dark)",
          boxShadow: "0 10px 30px -6px rgba(239, 88, 58, 0.55)",
          display: "grid",
          placeItems: "center",
          transition: "transform .15s ease",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.06)")}
        onMouseLeave={(e) => (e.currentTarget.style.transform = "none")}
      >
        {open ? (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M6 6l12 12M18 6L6 18"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
            />
          </svg>
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M4 5.5A1.5 1.5 0 0 1 5.5 4h13A1.5 1.5 0 0 1 20 5.5v9A1.5 1.5 0 0 1 18.5 16H9l-4 4V5.5z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </button>
    </div>
  );
}