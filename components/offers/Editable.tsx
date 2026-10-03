"use client";

import { createElement, useEffect, useRef, type CSSProperties, type KeyboardEvent } from "react";
import { mtavruli } from "@/lib/i18n";

// One editable text on the offer deck. Uncontrolled on purpose: React never
// re-renders the element's text while someone types (that would throw the
// caret to the start), it only writes the text in when the value changes from
// outside — a language switch or a reset. Every text is required: an empty
// one gets `.is-empty` and blocks the PDF download (see OfferEditor).
export default function Editable({
  value,
  onChange,
  as = "span",
  className,
  style,
  caps = false,
  multiline = true,
  label,
}: {
  value: string;
  onChange: (value: string) => void;
  as?: string;
  className?: string;
  style?: CSSProperties;
  // Headings: Latin is upper-cased, Georgian turned into Mtavruli capitals
  // (CSS uppercase is ignored for Georgian in Chrome). Applied when the field
  // loses focus, so the caret never jumps mid-word.
  caps?: boolean;
  multiline?: boolean;
  // Accessible name, e.g. "Slide title".
  label?: string;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (el && el.innerText !== value) el.innerText = value;
    el?.classList.toggle("is-empty", value.trim() === "");
  }, [value]);

  const read = () => (ref.current?.innerText ?? "").replace(/ /g, " ").replace(/\n{3,}/g, "\n\n");

  return createElement(as, {
    ref,
    className: ["editable", className].filter(Boolean).join(" "),
    style,
    contentEditable: "plaintext-only",
    suppressContentEditableWarning: true,
    spellCheck: false,
    role: "textbox",
    "aria-multiline": multiline,
    "aria-label": label,
    "data-editable": "",
    onInput: () => {
      const text = read();
      ref.current?.classList.toggle("is-empty", text.trim() === "");
      onChange(text);
    },
    onBlur: () => {
      let text = read().replace(/^\s+|\s+$/g, "");
      if (caps) text = mtavruli(text);
      if (ref.current && ref.current.innerText !== text) ref.current.innerText = text;
      ref.current?.classList.toggle("is-empty", text === "");
      onChange(text);
    },
    onKeyDown: (e: KeyboardEvent) => {
      if (!multiline && e.key === "Enter") {
        e.preventDefault();
        (e.currentTarget as HTMLElement).blur();
      }
    },
    onPaste: (e: React.ClipboardEvent) => {
      // Plain text only — formatting pasted from Word or a PDF must not
      // leak into the deck.
      e.preventDefault();
      const text = e.clipboardData.getData("text/plain");
      document.execCommand("insertText", false, multiline ? text : text.replace(/\s*\n\s*/g, " "));
    },
  });
}
