"use client";

import { useEffect, useRef, useState } from "react";

export default function Quote() {
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
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "clamp(2rem, 5vw, 3.75rem)",
        }}
      >
        {/* Left — video */}
        <div
          style={{
            flex: "0 0 46%",
            borderRadius: "1.75rem",
            overflow: "hidden",
            opacity: visible ? 1 : 0,
            transform: visible ? "none" : "translateX(-1.5rem)",
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
              height: "100%",
              objectFit: "cover",
              display: "block",
            }}
          />
        </div>

        {/* Right — quote */}
        <blockquote
          style={{
            flex: 1,
            opacity: visible ? 1 : 0,
            transform: visible ? "none" : "translateX(1.5rem)",
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
            &ldquo;Engineers and designers simultaneously know too much and too
            little. They know too much about technology and too little about how
            other people live their lives and do their activities&rdquo;
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
            — Donald Norman
          </cite>
        </blockquote>
      </div>
    </section>
  );
}
