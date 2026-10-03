"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react";
import Editable from "./Editable";
import {
  DEFAULT_CONTENT,
  LOGO_COUNT,
  LOGOS_ON_FIRST_SLIDE,
  SLIDES,
  defaultState,
  type OfferContent,
  type OfferLang,
  type OfferState,
  type ServiceCard,
} from "@/lib/offers/content";

// The offer deck as an editable web page. Slides are drawn on a fixed
// 1920×1080 canvas (the PDF's own size) and scaled to fit the screen; for the
// PDF the browser's "Save as PDF" prints each slide unscaled onto its own
// 1920×1080 page (see the @media print rules in app/offers/offers.css).
// Edits autosave to this browser (localStorage), one copy per language.

const STORE = (lang: OfferLang) => `gv-offer-v1-${lang}`;
const LANG_KEY = "gv-offer-lang";

const UI = {
  en: {
    tool: "Offer editor",
    saved: "Saved in this browser",
    reset: "Reset to original",
    resetConfirm: "Click again to reset",
    download: "Download PDF",
    signOut: "Sign out",
    include: "In PDF",
    excluded: "Hidden from PDF",
    hideCard: "Hide card",
    showCard: "Show card",
    hideLogo: "Hide",
    showLogo: "Show",
    add: "+ Add line",
    remove: "Remove line",
    link: "Link",
    required: "Required",
    emptyOne: "1 text is empty. Fill it in or remove the line before downloading.",
    emptyMany: (n: number) => `${n} texts are empty. Fill them in or remove the lines before downloading.`,
    badUrl: "The projects link must start with https://",
    showFirst: "Show me",
    tip: "Click any text to edit it. Changes save automatically in this browser.",
    printHint: "In the print window choose “Save as PDF” as the destination.",
  },
  ka: {
    tool: "შეთავაზების რედაქტორი",
    saved: "შენახულია ამ ბრაუზერში",
    reset: "საწყისზე დაბრუნება",
    resetConfirm: "დააჭირეთ კიდევ ერთხელ",
    download: "PDF-ის ჩამოტვირთვა",
    signOut: "გასვლა",
    include: "PDF-ში",
    excluded: "PDF-ში არ შევა",
    hideCard: "ბარათის დამალვა",
    showCard: "ბარათის ჩვენება",
    hideLogo: "დამალვა",
    showLogo: "ჩვენება",
    add: "+ ხაზის დამატება",
    remove: "ხაზის წაშლა",
    link: "ბმული",
    required: "სავალდებულო",
    emptyOne: "1 ტექსტი ცარიელია. შეავსეთ ან წაშალეთ ხაზი ჩამოტვირთვამდე.",
    emptyMany: (n: number) => `${n} ტექსტი ცარიელია. შეავსეთ ან წაშალეთ ხაზები ჩამოტვირთვამდე.`,
    badUrl: "პროექტების ბმული უნდა იწყებოდეს https://-ით",
    showFirst: "მაჩვენე",
    tip: "დააჭირეთ ნებისმიერ ტექსტს მის შესაცვლელად. ცვლილებები ავტომატურად ინახება ამ ბრაუზერში.",
    printHint: "ბეჭდვის ფანჯარაში აირჩიეთ „Save as PDF“.",
  },
} as const;

type Path = (string | number)[];

function getAt(obj: unknown, path: Path): unknown {
  return path.reduce<unknown>((o, k) => (o as Record<string | number, unknown>)?.[k], obj);
}

function loadState(lang: OfferLang): OfferState {
  try {
    const raw = localStorage.getItem(STORE(lang));
    if (raw) {
      const saved = JSON.parse(raw) as OfferState;
      // A saved copy from before a content change could miss sections; fall
      // back to the defaults for anything absent.
      return { ...defaultState(lang), ...saved, content: { ...DEFAULT_CONTENT[lang], ...saved.content } };
    }
  } catch {
    /* storage blocked or corrupt — start from the deck */
  }
  return defaultState(lang);
}

export default function OfferEditor({ onSignOut }: { onSignOut: () => void }) {
  const [lang, setLang] = useState<OfferLang>("ka");
  const [state, setState] = useState<OfferState>(() => defaultState("ka"));
  const [ready, setReady] = useState(false);
  const [confirmReset, setConfirmReset] = useState(false);
  const [problem, setProblem] = useState<string | null>(null);
  const [version, setVersion] = useState(0); // bumps on reset/lang switch so Editables re-seed
  const columnRef = useRef<HTMLDivElement>(null);
  const t = UI[lang];
  const c = state.content;

  // Load the last language + its saved copy once, in the browser.
  useEffect(() => {
    let initial: OfferLang = "ka";
    try {
      if (localStorage.getItem(LANG_KEY) === "en") initial = "en";
    } catch {}
    setLang(initial);
    setState(loadState(initial));
    setReady(true);
  }, []);

  // Autosave (debounced).
  useEffect(() => {
    if (!ready) return;
    const id = setTimeout(() => {
      try {
        localStorage.setItem(STORE(lang), JSON.stringify(state));
      } catch {}
    }, 300);
    return () => clearTimeout(id);
  }, [state, lang, ready]);

  // Scale the 1920px slides to the column width.
  useLayoutEffect(() => {
    const el = columnRef.current;
    if (!el) return;
    const apply = () => el.style.setProperty("--slide-scale", String(el.clientWidth / 1920));
    apply();
    const ro = new ResizeObserver(apply);
    ro.observe(el);
    return () => ro.disconnect();
  }, [ready]);

  const update = useCallback((fn: (draft: OfferState) => void) => {
    setState((prev) => {
      const next = structuredClone(prev);
      fn(next);
      return next;
    });
  }, []);

  const setAt = (path: Path, value: unknown) =>
    update((d) => {
      const parent = getAt(d.content, path.slice(0, -1)) as Record<string | number, unknown>;
      parent[path[path.length - 1]] = value;
    });

  function switchLang(next: OfferLang) {
    if (next === lang) return;
    try {
      localStorage.setItem(STORE(lang), JSON.stringify(state));
      localStorage.setItem(LANG_KEY, next);
    } catch {}
    setLang(next);
    setState(loadState(next));
    setVersion((v) => v + 1);
    setProblem(null);
  }

  function reset() {
    if (!confirmReset) {
      setConfirmReset(true);
      setTimeout(() => setConfirmReset(false), 3000);
      return;
    }
    setConfirmReset(false);
    setState(defaultState(lang));
    setVersion((v) => v + 1);
    setProblem(null);
  }

  // Every text is required: block the download while any included one is empty.
  function emptyFields(): HTMLElement[] {
    return Array.from(document.querySelectorAll<HTMLElement>(".offer-slide-wrap:not(.is-hidden) [data-editable]")).filter(
      (el) => !el.closest(".is-hidden") && el.innerText.trim() === ""
    );
  }

  function download() {
    const empty = emptyFields();
    if (empty.length) {
      document.body.classList.add("offer-validate");
      setProblem(empty.length === 1 ? t.emptyOne : t.emptyMany(empty.length));
      return;
    }
    if (!/^https?:\/\/\S+$/.test(c.projects.url.trim())) {
      document.body.classList.add("offer-validate");
      setProblem(t.badUrl);
      return;
    }
    setProblem(null);
    document.body.classList.remove("offer-validate");
    (document.activeElement as HTMLElement | null)?.blur();
    const title = document.title;
    // Chrome uses the page title as the PDF's file name.
    document.title = `Grapevine-${lang === "ka" ? "Shetavazeba" : "Offer"}-${new Date().toISOString().slice(0, 10)}`;
    setTimeout(() => {
      window.print();
      document.title = title;
    }, 50);
  }

  function showFirstProblem() {
    const first = emptyFields()[0] ?? document.querySelector<HTMLElement>("[data-field='projects-url']");
    if (!first) return;
    first.scrollIntoView({ behavior: "smooth", block: "center" });
    setTimeout(() => first.focus(), 350);
  }

  // Shorthand for an editable text bound to a content path.
  const T = (path: Path, opts: { as?: string; className?: string; caps?: boolean; multiline?: boolean; label?: string } = {}) => (
    <Editable
      key={`${version}-${path.join(".")}`}
      value={String(getAt(c, path) ?? "")}
      onChange={(v) => setAt(path, v)}
      {...opts}
    />
  );

  // An editable list: every line can be edited, removed or added to.
  const L = (path: Path, className: string, itemClass = "") => {
    const items = (getAt(c, path) as string[]) ?? [];
    return (
      <ul className={`offer-list ${className}`} key={`${version}-${path.join(".")}-list`}>
        {items.map((_, i) => (
          <li key={i} className={itemClass}>
            {T([...path, i], { multiline: false, label: `${path.join(" ")} ${i + 1}` })}
            <button
              type="button"
              className="offer-ctl offer-remove"
              aria-label={t.remove}
              title={t.remove}
              onClick={() =>
                update((d) => {
                  (getAt(d.content, path) as string[]).splice(i, 1);
                })
              }
            >
              ×
            </button>
          </li>
        ))}
        <li className="offer-ctl offer-add-row">
          <button
            type="button"
            className="offer-add"
            onClick={() => {
              update((d) => {
                (getAt(d.content, path) as string[]).push("");
              });
              setTimeout(() => {
                const lists = document.querySelectorAll<HTMLElement>(`[aria-label^="${path.join(" ")} "]`);
                lists[lists.length - 1]?.focus();
              }, 30);
            }}
          >
            {t.add}
          </button>
        </li>
      </ul>
    );
  };

  const toggle = (key: "hiddenSlides" | "hiddenCards", id: string) =>
    update((d) => {
      const list = d[key];
      const i = list.indexOf(id);
      if (i >= 0) list.splice(i, 1);
      else list.push(id);
    });

  const toggleLogo = (n: number) =>
    update((d) => {
      const i = d.hiddenLogos.indexOf(n);
      if (i >= 0) d.hiddenLogos.splice(i, 1);
      else d.hiddenLogos.push(n);
    });

  const card = (key: "servicesA" | "servicesB", s: ServiceCard, i: number) => {
    const hidden = state.hiddenCards.includes(`${key}:${s.id}`);
    return (
      <div key={s.id} className={`svc-card tone-${s.tone}${hidden ? " is-hidden" : ""}`}>
        <div className="svc-card-head">{T([key, i, "title"], { multiline: false, label: "Service title" })}</div>
        {L([key, i, "items"], "svc-card-list")}
        <button type="button" className="offer-ctl offer-eye" onClick={() => toggle("hiddenCards", `${key}:${s.id}`)}>
          {hidden ? t.showCard : t.hideCard}
        </button>
      </div>
    );
  };

  const logos = (from: number, to: number) => (
    <div className="logo-grid">
      {Array.from({ length: to - from + 1 }, (_, k) => from + k).map((n) => {
        const hidden = state.hiddenLogos.includes(n);
        return (
          <div key={n} className={`logo-pill${hidden ? " is-hidden" : ""}`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`/offers/logos/logo-${String(n).padStart(2, "0")}.webp`} alt="" />
            <button type="button" className="offer-ctl offer-logo-btn" onClick={() => toggleLogo(n)}>
              {hidden ? t.showLogo : t.hideLogo}
            </button>
          </div>
        );
      })}
    </div>
  );

  const slides: Record<(typeof SLIDES)[number]["id"], ReactNode> = {
    cover: (
      <div className="slide s-cover">
        {T(["cover", "label"], { as: "div", className: "cover-label", multiline: false })}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="wordmark cover-wordmark" src="/offers/wordmark-dark.svg" alt="Grapevine" />
        <div className="cover-contacts">
          {T(["cover", "email"], { as: "div", multiline: false, label: "Email" })}
          {T(["cover", "phone"], { as: "div", multiline: false, label: "Phone" })}
        </div>
        {T(["cover", "address"], { as: "div", className: "cover-address", multiline: false, label: "Address" })}
      </div>
    ),
    about: (
      <div className="slide s-about">
        <div className="band band-orange">{T(["about", "title"], { as: "h2", caps: true, multiline: false })}</div>
        <p className="about-lead">
          {T(["about", "leadBefore"])}
          {T(["about", "leadBold"], { as: "strong" })}
          {T(["about", "leadAfter"])}
        </p>
        <div className="about-right">
          {T(["about", "role"], { as: "p" })}
          {T(["about", "listIntro"], { as: "p", className: "about-intro" })}
          {L(["about", "bullets"], "about-bullets")}
          {T(["about", "closing"], { as: "p", className: "about-closing" })}
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="about-scribble" src="/offers/scribble.webp" alt="" />
      </div>
    ),
    values: (
      <div className="slide s-values">
        <svg className="thread" viewBox="0 0 1920 1080" aria-hidden="true">
          <path d="M-40 800 C 260 790, 520 720, 610 560 C 700 400, 640 250, 510 258 C 380 266, 350 430, 470 525 C 570 605, 740 560, 880 470 C 1010 390, 1140 380, 1250 430 C 1370 485, 1400 620, 1350 720" />
          <path d="M1000 540 C 1140 540, 1230 640, 1300 760 C 1400 930, 1560 1060, 1760 1020 C 1860 1000, 1930 940, 1970 880" />
          <path d="M1030 640 C 990 700, 1010 790, 1100 800 C 1190 810, 1260 740, 1320 690" />
        </svg>
        <div className="band band-lavender">{T(["values", "title"], { as: "h2", caps: true, multiline: false })}</div>
        {[0, 1, 2, 3, 4].map((i) => (
          <div key={i} className={`value-pill value-${i}`}>
            {T(["values", "items", i])}
          </div>
        ))}
        {T(["values", "closing"], { as: "p", className: "values-closing" })}
      </div>
    ),
    clients1: (
      <div className="slide s-clients">
        {T(["clients", "title"], { as: "h2", className: "clients-title", caps: true })}
        {T(["clients", "period"], { as: "div", className: "clients-period", multiline: false })}
        {logos(1, LOGOS_ON_FIRST_SLIDE)}
      </div>
    ),
    clients2: <div className="slide s-clients s-clients-2">{logos(LOGOS_ON_FIRST_SLIDE + 1, LOGO_COUNT)}</div>,
    servicesIntro: (
      <div className="slide s-intro">
        <div className="intro-tiles">
          {[
            ["orange", "seo"],
            ["lavender", "social"],
            ["orange", "strategy"],
            ["lavender", "branding"],
            ["orange", "campaigns"],
            ["lavender", "crm"],
          ].map(([tone, icon]) => (
            <div key={icon} className={`tile tone-${tone}`}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`/offers/icons/${icon}.png`} alt="" />
            </div>
          ))}
        </div>
        <div className="intro-right">{T(["servicesIntro", "title"], { as: "h2" })}</div>
      </div>
    ),
    servicesA: (
      <div className="slide s-services s-services-a">
        <div className="svc-grid">{c.servicesA.map((s, i) => card("servicesA", s, i))}</div>
        <div className="tile tile-sm tone-orange deco-a1">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/offers/icons/seo.png" alt="" />
        </div>
        <div className="tile tile-sm tone-lavender deco-a2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/offers/icons/branding.png" alt="" />
        </div>
        <svg className="deco-arrow" viewBox="0 0 300 60" aria-hidden="true">
          <path d="M4 30 H 290 M 252 6 L 290 30 L 252 54" />
        </svg>
      </div>
    ),
    projects: (
      <div className="slide s-projects">
        {T(["projects", "title"], { as: "h2", className: "projects-title", multiline: false })}
        <svg className="thread thread-lavender" viewBox="0 0 1920 1080" aria-hidden="true">
          <path d="M30 1100 C 150 960, 260 850, 470 846 C 690 842, 900 800, 942 650 C 984 500, 880 395, 740 398 C 600 401, 548 500, 560 568 C 576 660, 690 722, 808 700 C 960 672, 1100 520, 1280 498 C 1440 478, 1530 640, 1660 716 C 1790 790, 1900 720, 1970 650" />
        </svg>
        <a className="projects-link" href={c.projects.url} target="_blank" rel="noopener noreferrer" onClick={(e) => e.preventDefault()}>
          {T(["projects", "linkLabel"], { multiline: false })}
        </a>
        <svg className="projects-cursor" viewBox="0 0 16 20" aria-hidden="true">
          <path d="M1 1 V 16 L 5 12 L 8 19 L 11 18 L 8 11 L 14 11 Z" />
        </svg>
        <div className="offer-ctl projects-url-row">
          <span>{t.link}:</span>
          <Editable
            key={`${version}-url`}
            value={c.projects.url}
            onChange={(v) => setAt(["projects", "url"], v)}
            multiline={false}
            className="projects-url"
            label="Projects link"
          />
        </div>
      </div>
    ),
    how: (
      <div className="slide s-how">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="how-art" src="/offers/tangle.webp" alt="" />
        <div className="how-right">
          <div className="band-pill band-yellow">{T(["how", "title"], { as: "h2", caps: true, multiline: false })}</div>
          {T(["how", "intro"], { as: "p", className: "how-intro" })}
          {T(["how", "weLabel"], { as: "h3", className: "how-we", caps: true, multiline: false })}
          {L(["how", "bullets"], "how-bullets")}
          {T(["how", "closing"], { as: "p", className: "how-closing" })}
        </div>
      </div>
    ),
    servicesB: (
      <div className="slide s-services s-services-b">
        <div className="svc-grid svc-grid-b">{c.servicesB.map((s, i) => card("servicesB", s, i))}</div>
        <div className="tile tile-sm tone-lavender deco-b1">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/offers/icons/social.png" alt="" />
        </div>
        <div className="tile tile-sm tone-orange deco-b2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/offers/icons/campaigns.png" alt="" />
        </div>
      </div>
    ),
    gets: (
      <div className="slide s-gets">
        <svg className="thread thread-purple" viewBox="0 0 1920 1080" aria-hidden="true">
          <path d="M1250 1030 C 1380 1005, 1500 985, 1520 905 C 1540 830, 1440 805, 1420 870 C 1400 940, 1520 905, 1560 800 C 1600 700, 1700 660, 1760 600 C 1820 540, 1800 470, 1750 480 C 1700 490, 1720 570, 1790 592 C 1860 612, 1920 620, 1970 600" />
        </svg>
        <div className="band-pill band-yellow gets-band">{T(["gets", "title"], { as: "h2", caps: true, multiline: false })}</div>
        <div className="gets-card gets-left">
          {T(["gets", "rationalTitle"], { as: "h3", caps: true, multiline: false })}
          {L(["gets", "rationalItems"], "gets-list")}
        </div>
        <div className="gets-card gets-right">
          {T(["gets", "emotionalTitle"], { as: "h3", caps: true, multiline: false })}
          {L(["gets", "emotionalItems"], "gets-list")}
        </div>
        <div className="bird" aria-hidden="true">
          <div className="bird-shape" />
        </div>
      </div>
    ),
    sentence: (
      <div className="slide s-sentence">
        <div className="band-pill band-yellow sentence-band">{T(["sentence", "title"], { as: "h2", caps: true, multiline: false })}</div>
        {T(["sentence", "text"], { as: "p", className: "sentence-text", caps: lang === "en" })}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="wordmark sentence-wordmark" src="/offers/wordmark-yellow.svg" alt="Grapevine" />
      </div>
    ),
  };

  if (!ready) return <div className="offer-loading" />;

  return (
    <div className="offer-app" data-lang={lang} lang={lang}>
      <header className="offer-toolbar">
        <div className="offer-toolbar-in">
          <div className="offer-brand">
            {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="wordmark toolbar-wordmark" src="/offers/wordmark-lavender.svg" alt="Grapevine" />
            <span>{t.tool}</span>
          </div>
          <div className="offer-actions">
            <div className="offer-lang" role="group" aria-label="Language">
              {(["ka", "en"] as const).map((l) => (
                <button key={l} type="button" aria-pressed={lang === l} onClick={() => switchLang(l)}>
                  {l === "ka" ? "ქარ" : "ENG"}
                </button>
              ))}
            </div>
            <button type="button" className="offer-btn ghost" onClick={reset}>
              {confirmReset ? t.resetConfirm : t.reset}
            </button>
            <button type="button" className="offer-btn primary" onClick={download}>
              {t.download}
            </button>
            <button type="button" className="offer-btn ghost" onClick={onSignOut}>
              {t.signOut}
            </button>
          </div>
        </div>
        {problem ? (
          <div className="offer-problem" role="alert">
            <span>{problem}</span>
            <button type="button" onClick={showFirstProblem}>
              {t.showFirst}
            </button>
          </div>
        ) : (
          <p className="offer-tip">
            {t.tip} {t.printHint} <span className="offer-saved">· {t.saved}</span>
          </p>
        )}
      </header>

      <main className="offer-column" ref={columnRef}>
        {SLIDES.map((s, i) => {
          const hidden = state.hiddenSlides.includes(s.id);
          return (
            <section key={s.id} className={`offer-slide-wrap${hidden ? " is-hidden" : ""}`} aria-label={s.name[lang]}>
              <div className="offer-slide-head">
                <span>
                  {i + 1} / {SLIDES.length} · {s.name[lang]}
                </span>
                <button type="button" className="offer-switch" aria-pressed={!hidden} onClick={() => toggle("hiddenSlides", s.id)}>
                  {hidden ? t.excluded : t.include}
                </button>
              </div>
              <div className="offer-slide-frame">{slides[s.id]}</div>
            </section>
          );
        })}
      </main>
    </div>
  );
}
