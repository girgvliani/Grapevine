"use client";

import { useEffect, useRef, useState } from "react";

export default function Quote() {
  const ref = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let debounceId: ReturnType<typeof setTimeout> | undefined;
    // Tracks the in-flight play() promise so a pause() never interrupts it —
    // calling pause() before play() has resolved is a known source of visual
    // glitches in some browsers.
    let playPromise: Promise<void> | undefined;

    const io = new IntersectionObserver(
      ([entry]) => {
        // Debounce: only act if the visibility state holds for 200ms.
        if (debounceId) clearTimeout(debounceId);
        debounceId = setTimeout(() => {
          const video = videoRef.current;
          if (!video) return;
          if (entry.isIntersecting) {
            setVisible(true);
            playPromise = video.play().catch(() => {});
          } else {
            Promise.resolve(playPromise).finally(() => video.pause());
          }
        }, 200);
      },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      if (debounceId) clearTimeout(debounceId);
    };
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
      <div className="container-cap">
        <div
          style={{
            borderRadius: "1.75rem",
            overflow: "hidden",
            aspectRatio: "16 / 9",
            opacity: visible ? 1 : 0,
            transform: visible ? "none" : "translateY(1.5rem)",
            transition: "opacity 0.7s ease, transform 0.7s cubic-bezier(0.16,1,0.3,1)",
          }}
        >
          <video
            ref={videoRef}
            src="/assets/videos/Comp1-web.mp4"
            muted
            loop
            playsInline
            preload="auto"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
              // Disqualifies the video from Chrome's hardware overlay plane
              // (Direct Composition/MPO on Windows). Without this, Chrome can
              // promote an on-screen <video> to a dedicated overlay plane —
              // decoded via the GPU driver's video processor, a different
              // YUV→RGB pipeline than normal compositing — and demote it back
              // the instant it's partially scrolled off-screen. Same content,
              // different pipeline, different color: exactly the "same frame,
              // subtly different shade, right at the viewport edge" symptom.
              // A non-identity filter forces it through normal compositing
              // everywhere, so there's no pipeline to switch between.
              filter: "brightness(1.0001)",
            }}
          />
        </div>
      </div>
    </section>
  );
}
