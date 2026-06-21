"use client";

import { useEffect, useState } from "react";

/**
 * Returns whether the given media query currently matches.
 *
 * SSR-safe: starts as `false` so the server and first client render agree,
 * then updates on mount and on every viewport change.
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia(query);
    const onChange = () => setMatches(mql.matches);
    onChange();
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, [query]);

  return matches;
}

// Tablet and below (covers the 744px tablet frame; phones inherit this until a
// dedicated mobile layout is built).
export const TABLET_QUERY = "(max-width: 1024px)";

// Phones — burger menu / single-column mobile layouts.
export const MOBILE_QUERY = "(max-width: 640px)";

// Short viewports (e.g. 1024×600, landscape tablets) where full-height sticky
// sections clip — used to shrink tall content like the service cards.
export const SHORT_QUERY = "(max-height: 700px)";
