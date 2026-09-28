"use client";

import { useMemo } from "react";
import Image from "next/image";
import { useLang } from "./LanguageProvider";
import SocialCards, { type CardItem } from "./ui/card-fan-carousel";
import { getServiceDetail } from "@/lib/serviceContent";
import { localizedHref } from "@/lib/routing";
import { mtavruli } from "@/lib/i18n";
import { SERVICE_ASSETS } from "./servicesConfig";

// Homepage services: the 11 services fanned out as cards (21st.dev card fan,
// components/ui/card-fan-carousel.tsx), rotated with the arrows, a swipe, or by
// hovering to spread them. Each card links to its /services/<slug> page. Replaced
// the old 400vh scroll-jacked horizontal track + flip cards (see git history).
// Tile styles: .svc-fan-tile in globals.css.
export default function Services() {
  const { t, lang } = useLang();

  const cards = useMemo<CardItem[]>(
    () =>
      SERVICE_ASSETS.map((s) => {
        const card = t.services.cards[s.id];
        const name = `${card.name}${card.sub ? ` ${card.sub}` : ""}`;
        const intro = getServiceDetail(s.id, lang)?.intro;
        return {
          linkUrl: localizedHref(`/services/${s.id}`, lang),
          label: name,
          content: (
            <div className="svc-fan-tile">
              <div className="svc-fan-tile__icon">
                <Image src={s.icon} alt="" sizes="(max-width: 768px) 30vw, 220px" />
              </div>
              <div className="svc-fan-tile__name">{name}</div>
              {intro && <p className="svc-fan-tile__intro">{intro}</p>}
              <span className="svc-fan-tile__more" aria-hidden="true">
                {t.servicesPage.seeMore} →
              </span>
            </div>
          ),
        };
      }),
    [t, lang]
  );

  return (
    <section
      id="services"
      style={{
        background: "#10030a",
        overflow: "hidden",
        padding: "clamp(5rem, 10vh, 7rem) 0 clamp(4rem, 8vh, 6rem)",
      }}
    >
      <h2
        style={{
          fontSize: "clamp(2rem, 4.44vw, 4rem)",
          fontWeight: 900,
          letterSpacing: "-0.02em",
          color: "var(--orange)",
          fontFamily: "var(--font-heading)",
          padding: "0 clamp(1.5rem, 7.6vw, 6.875rem)",
          marginBottom: "clamp(1rem, 3vh, 2rem)",
        }}
      >
        {mtavruli(t.services.heading)}
      </h2>
      <SocialCards cards={cards} labels={{ previous: t.services.previous, next: t.services.next }} />
    </section>
  );
}
