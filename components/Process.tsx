"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import birdImg from "./assets/Component 9.png";

const STEPS = [
  {
    num: "01",
    title: "ანალიზი",
    sub: "პირველ ეტაპზე",
    desc: "პირველ ეტაპზე ვიგებთ, რა სჭირდება რეალურად ბიზნესს, პრობლემებს განვსაზღვრავთ და ამოცანებს სივრცეს მივცემთ.",
  },
  {
    num: "02",
    title: "სტრუქტურა",
    sub: "დიზაინი",
    desc: "შევქმნით სტრუქტურას: რა არის მნიშვნელოვანი, რა არის და როგორ უკავშირდება ყველაფერი ერთმანეთს.",
  },
  {
    num: "03",
    title: "შესრულება",
    sub: "დიზაინი",
    desc: "მხოლოდ ამის შემდეგ გადავდგებით შესრულებაზე. რადგან სრულად გვაქვს ამოცანები განსაზღვრელი და ყველა ქმედება ელოდება სივრცეს.",
  },
];

function StepItem({
  step,
  delay,
}: {
  step: (typeof STEPS)[0];
  delay: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        display: "flex",
        gap: "24px",
        paddingBottom: "32px",
        marginBottom: "32px",
        borderBottom: "1px solid rgba(26,5,18,0.12)",
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : "translateY(20px)",
        transition: `opacity 0.6s ease ${delay}s, transform 0.6s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
      }}
    >
      {/* Number */}
      <div
        style={{
          fontSize: "42px",
          fontWeight: 700,
          color: "var(--orange)",
          fontFamily: "var(--font-primary)",
          minWidth: "70px",
          lineHeight: 1,
          paddingTop: "2px",
        }}
      >
        {step.num}
      </div>

      {/* Content */}
      <div style={{ flex: 1 }}>
        <div
          style={{
            fontSize: "clamp(26px, 3vw, 38px)",
            fontWeight: 900,
            color: "#1A0512",
            fontFamily: "var(--font-heading)",
            textTransform: "uppercase",
            letterSpacing: "-0.01em",
            lineHeight: 1,
            marginBottom: "6px",
          }}
        >
          {step.title}
        </div>
        <div
          style={{
            fontSize: "11px",
            color: "var(--orange)",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            fontFamily: "var(--font-primary)",
            marginBottom: "10px",
          }}
        >
          {step.sub}
        </div>
        <div
          style={{
            fontSize: "12px",
            lineHeight: 1.75,
            color: "#1A0512",
            opacity: 0.65,
            fontFamily: "var(--font-primary)",
            maxWidth: "340px",
          }}
        >
          {step.desc}
        </div>
      </div>
    </div>
  );
}

export default function Process() {
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section
      id="process"
      ref={sectionRef}
      style={{
        background: "var(--cream)",
        padding: "80px 40px 60px",
      }}
    >
      <div
        style={{
          display: "flex",
          gap: "60px",
          alignItems: "flex-start",
        }}
      >
        {/* Left — bird + title side by side */}
        <div
          style={{
            flex: "0 0 42%",
            display: "flex",
            flexDirection: "row",
            alignItems: "flex-end",
          }}
        >
          {/* Bird image */}
          <div
            style={{
              position: "relative",
              width: "60%",
              aspectRatio: "1 / 1.1",
              flexShrink: 0,
              opacity: visible ? 1 : 0,
              transition: "opacity 0.8s ease",
            }}
          >
            <Image
              src={birdImg}
              alt="Grapevine bird"
              fill
              style={{ objectFit: "contain", objectPosition: "left center" }}
              priority
            />
          </div>

          {/* "როგორ ვმუშაობთ?" to the right of bird */}
          <div
            style={{
              fontFamily: "var(--font-heading)",
              fontWeight: 900,
              fontSize: "78px",
              lineHeight: 1.1,
              textTransform: "uppercase",
              letterSpacing: "-0.02em",
              paddingBottom: "16px",
              opacity: visible ? 1 : 0,
              transform: visible ? "none" : "translateY(16px)",
              transition: "opacity 0.8s ease 0.3s, transform 0.8s ease 0.3s",
            }}
          >
            <span style={{ color: "var(--orange)" }}>როგორ</span>
            <br />
            <span style={{ color: "var(--dark)" }}>ვმუშაობთ?</span>
          </div>
        </div>

        {/* Right — steps */}
        <div style={{ flex: 1, paddingTop: "8px", paddingLeft: "100px" }}>
          {STEPS.map((step, i) => (
            <StepItem key={step.num} step={step} delay={0.2 + i * 0.15} />
          ))}

          {/* Pagination dots */}
          <div
            style={{
              display: "flex",
              gap: "8px",
              marginTop: "8px",
              opacity: visible ? 1 : 0,
              transition: "opacity 0.6s ease 0.7s",
            }}
          >
            <div
              style={{
                width: "10px",
                height: "10px",
                borderRadius: "50%",
                background: "var(--orange)",
              }}
            />
            <div
              style={{
                width: "10px",
                height: "10px",
                borderRadius: "50%",
                border: "1.5px solid var(--orange)",
                background: "transparent",
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
