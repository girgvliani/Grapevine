"use client";

import { useState, type PointerEvent as ReactPointerEvent } from "react";
import Editable from "./Editable";
import { BOX_COLORS, type Box, type BoxColor } from "@/lib/offers/content";

// A free-placed text or image box on a slide. Position and size are in slide
// pixels (the 1920×1080 canvas), so the PDF prints them exactly where they
// were placed. While dragging, the box moves from local state and the deck
// state is only written once on release — writing on every pointer move would
// clone the whole deck (images included) many times a second.

export type BoxLabels = {
  drag: string;
  resize: string;
  heading: string;
  body: string;
  bigger: string;
  smaller: string;
  bold: string;
  alignLeft: string;
  alignCenter: string;
  alignRight: string;
  color: string;
  removeBox: string;
  textBox: string;
};

type Rect = { x: number; y: number; w: number; h: number };

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));

export default function SlideBox({
  box,
  version,
  selected,
  getScale,
  labels: t,
  onSelect,
  onChange,
  onRemove,
}: {
  box: Box;
  version: number;
  selected: boolean;
  getScale: () => number;
  labels: BoxLabels;
  onSelect: () => void;
  onChange: (patch: Partial<Box>) => void;
  onRemove: () => void;
}) {
  const [live, setLive] = useState<Rect | null>(null);
  const r: Rect = live ?? { x: box.x, y: box.y, w: box.w, h: box.kind === "image" ? box.h : 0 };

  function startDrag(e: ReactPointerEvent<HTMLElement>, mode: "move" | "resize") {
    if (e.button !== 0) return;
    e.preventDefault();
    e.stopPropagation();
    onSelect();
    const el = e.currentTarget;
    el.setPointerCapture(e.pointerId);
    const scale = getScale() || 1;
    const sx = e.clientX;
    const sy = e.clientY;
    const start: Rect = { x: box.x, y: box.y, w: box.w, h: box.kind === "image" ? box.h : 0 };
    let cur = start;
    let moved = false;
    const move = (ev: PointerEvent) => {
      const dx = (ev.clientX - sx) / scale;
      const dy = (ev.clientY - sy) / scale;
      if (Math.abs(dx) + Math.abs(dy) > 2) moved = true;
      if (mode === "move") {
        // Keep at least a corner on the slide so a box can't be lost off-canvas.
        cur = { ...start, x: clamp(start.x + dx, 60 - start.w, 1860), y: clamp(start.y + dy, -20, 1040) };
      } else if (box.kind === "image") {
        const w = clamp(start.w + dx, 60, 1920);
        cur = { ...start, w, h: (w * start.h) / start.w };
      } else {
        cur = { ...start, w: clamp(start.w + dx, 80, 1920) };
      }
      setLive(cur);
    };
    const up = () => {
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerup", up);
      el.removeEventListener("pointercancel", up);
      setLive(null);
      if (moved) {
        const patch: Partial<Box> = { x: Math.round(cur.x), y: Math.round(cur.y), w: Math.round(cur.w) };
        if (box.kind === "image") (patch as { h: number }).h = Math.round(cur.h);
        onChange(patch);
      }
    };
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerup", up);
    el.addEventListener("pointercancel", up);
  }

  // The toolbar sits above the box, or below it when the box is near the top.
  const barBelow = r.y < 110;

  return (
    <div
      className={`obox obox-${box.kind}${selected ? " is-selected" : ""}${live ? " is-dragging" : ""}`}
      style={{ left: r.x, top: r.y, width: r.w, height: box.kind === "image" ? r.h : undefined }}
      onPointerDown={onSelect}
      data-box={box.id}
    >
      {box.kind === "text" ? (
        <Editable
          key={`${version}-${box.id}`}
          as="div"
          className={`obox-copy${box.heading ? " is-heading" : ""}`}
          style={{
            fontSize: box.size,
            color: `var(--${box.color})`,
            textAlign: box.align,
            fontWeight: box.bold ? 700 : box.heading ? 700 : undefined,
          }}
          value={box.text}
          onChange={(text) => onChange({ text })}
          label={t.textBox}
        />
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={box.src} alt="" draggable={false} onPointerDown={(e) => startDrag(e, "move")} />
      )}

      {selected && (
        <div className={`offer-ctl obox-bar${barBelow ? " below" : ""}`} onPointerDown={(e) => e.stopPropagation()}>
          <button type="button" className="obox-grip" title={t.drag} aria-label={t.drag} onPointerDown={(e) => startDrag(e, "move")}>
            ⠿
          </button>
          {box.kind === "text" && (
            <>
              <span className="obox-sep" />
              <button type="button" aria-pressed={!box.heading} onClick={() => onChange({ heading: false })}>
                {t.body}
              </button>
              <button type="button" aria-pressed={box.heading} onClick={() => onChange({ heading: true })}>
                {t.heading}
              </button>
              <span className="obox-sep" />
              <button type="button" title={t.smaller} aria-label={t.smaller} onClick={() => onChange({ size: Math.max(12, box.size - 4) })}>
                A−
              </button>
              <span className="obox-size">{box.size}</span>
              <button type="button" title={t.bigger} aria-label={t.bigger} onClick={() => onChange({ size: Math.min(240, box.size + 4) })}>
                A+
              </button>
              <button type="button" className="obox-b" aria-pressed={box.bold} title={t.bold} aria-label={t.bold} onClick={() => onChange({ bold: !box.bold })}>
                B
              </button>
              <span className="obox-sep" />
              {(["left", "center", "right"] as const).map((a) => (
                <button
                  key={a}
                  type="button"
                  aria-pressed={box.align === a}
                  title={a === "left" ? t.alignLeft : a === "center" ? t.alignCenter : t.alignRight}
                  aria-label={a === "left" ? t.alignLeft : a === "center" ? t.alignCenter : t.alignRight}
                  onClick={() => onChange({ align: a })}
                >
                  <span className={`obox-align obox-align-${a}`} aria-hidden="true">
                    <i />
                    <i />
                    <i />
                  </span>
                </button>
              ))}
              <span className="obox-sep" />
              {BOX_COLORS.map((col: BoxColor) => (
                <button
                  key={col}
                  type="button"
                  className="obox-swatch"
                  style={{ background: `var(--${col})` }}
                  aria-pressed={box.color === col}
                  title={`${t.color}: ${col}`}
                  aria-label={`${t.color}: ${col}`}
                  onClick={() => onChange({ color: col })}
                />
              ))}
            </>
          )}
          <span className="obox-sep" />
          <button type="button" className="obox-del" title={t.removeBox} aria-label={t.removeBox} onClick={onRemove}>
            ×
          </button>
        </div>
      )}

      {selected && (
        <span
          className={`offer-ctl obox-resize obox-resize-${box.kind}`}
          title={t.resize}
          aria-hidden="true"
          onPointerDown={(e) => startDrag(e, "resize")}
        />
      )}
    </div>
  );
}
