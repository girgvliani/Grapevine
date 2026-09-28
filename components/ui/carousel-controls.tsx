"use client";

// Round prev/next arrows + position dots shared by the homepage carousels
// (services card fan, portfolio slider) so both look and behave the same.
// Styled for the site's dark sections. No `cursor-pointer`: the custom cursor
// (components/Cursor.tsx) replaces the native one on buttons.

const ARROW_CLASSES =
  "relative flex items-center justify-center rounded-full border-[1.5px] border-white/15 bg-white/5 backdrop-blur-[16px] text-white/60 shrink-0 z-30 outline-none shadow-[0_4px_20px_rgba(0,0,0,0.4)] hover:border-white/35 hover:text-white/90 focus-visible:border-white/60 active:opacity-70 transition-colors duration-300 before:content-[''] before:absolute before:inset-[3px] before:rounded-full before:border before:border-white/[0.05] before:pointer-events-none w-10 h-10 md:w-12 md:h-12";

export function CarouselArrow({
  direction,
  label,
  onClick,
}: {
  direction: "left" | "right";
  label: string;
  onClick: () => void;
}) {
  return (
    <button type="button" className={ARROW_CLASSES} onClick={onClick} aria-label={label}>
      <svg className="relative z-[2] w-4 h-4 md:w-5 md:h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points={direction === "left" ? "15 18 9 12 15 6" : "9 18 15 12 9 6"} />
      </svg>
    </button>
  );
}

export function CarouselDots({ count, active }: { count: number; active: number }) {
  return (
    <div className="flex items-center gap-2" aria-hidden="true">
      {Array.from({ length: count }, (_, i) => (
        <span key={i} className={`w-2 h-2 rounded-full transition-all duration-300 ${i === active ? "bg-white/80 scale-[1.3]" : "bg-white/15"}`} />
      ))}
    </div>
  );
}

// Prev arrow · dots · next arrow, centred under a carousel.
export function CarouselControls({
  count,
  active,
  labels,
  onPrev,
  onNext,
  className = "",
}: {
  count: number;
  active: number;
  labels: { previous: string; next: string };
  onPrev: () => void;
  onNext: () => void;
  className?: string;
}) {
  return (
    <div className={`flex items-center justify-center gap-4 z-30 ${className}`}>
      <CarouselArrow direction="left" label={labels.previous} onClick={onPrev} />
      <CarouselDots count={count} active={active} />
      <CarouselArrow direction="right" label={labels.next} onClick={onNext} />
    </div>
  );
}
