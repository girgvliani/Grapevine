"use client";

import { useEffect, useRef } from "react";
import Script from "next/script";

export const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

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
// on every parent re-render.
export default function Turnstile({ onToken }: { onToken: (token: string) => void }) {
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
