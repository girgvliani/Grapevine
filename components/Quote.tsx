"use client";

import { useEffect, useRef, useState } from "react";
import { useLang } from "./LanguageProvider";
import { useMediaQuery, MOBILE_QUERY } from "@/lib/useMediaQuery";

export default function Quote() {
  const { t } = useLang();
  const isMobile = useMediaQuery(MOBILE_QUERY);
  const ref = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          videoRef.current?.play();
        } else {
          videoRef.current?.pause();
        }
      },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      style={{
        background: "var(--cream)",
        padding: "3.75rem clamp(1.5rem, 5vw, 2.5rem) 5rem",
        marginTop: "-1px",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          alignItems: isMobile ? "stretch" : "center",
          gap: isMobile ? "2rem" : "clamp(2rem, 5vw, 3.75rem)",
        }}
      >
        {/* Video */}
        <div
          style={{
            flex: isMobile ? "0 0 auto" : "0 0 46%",
            width: isMobile ? "100%" : undefined,
            borderRadius: "1.75rem",
            overflow: "hidden",
            opacity: visible ? 1 : 0,
            transform: visible ? "none" : isMobile ? "translateY(1.5rem)" : "translateX(-1.5rem)",
            transition: "opacity 0.7s ease, transform 0.7s cubic-bezier(0.16,1,0.3,1)",
          }}
        >
          <video
            ref={videoRef}
            src="/assets/videos/Comp1.mp4"
            muted
            loop
            playsInline
            style={{
              width: "100%",
              height: isMobile ? "auto" : "100%",
              objectFit: "cover",
              display: "block",
            }}
          />
        </div>

        {/* Quote */}
        <blockquote
          style={{
            flex: 1,
            margin: 0,
            opacity: visible ? 1 : 0,
            transform: visible ? "none" : isMobile ? "translateY(1.5rem)" : "translateX(1.5rem)",
            transition: "opacity 0.7s ease 0.15s, transform 0.7s cubic-bezier(0.16,1,0.3,1) 0.15s",
          }}
        >
          <p
            style={{
              fontSize: "clamp(0.8125rem, 1.4vw, 1rem)",
              lineHeight: 1.85,
              color: "var(--orange)",
              fontFamily: "var(--font-primary)",
              marginBottom: "1.25rem",
            }}
          >
            &ldquo;{t.quote.text}&rdquo;
          </p>
          <cite
            style={{
              fontSize: "0.6875rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "var(--orange)",
              fontFamily: "var(--font-primary)",
              fontStyle: "normal",
              opacity: 0.6,
            }}
          >
            {t.quote.cite}
          </cite>
        </blockquote>
      </div>
    </section>
  );
}
