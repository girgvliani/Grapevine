import { notFound } from "next/navigation";

// Matches any path under /[lang]/... that isn't a real page (bad link, typo,
// moved content). Just triggers the nearest not-found.tsx boundary, which is
// app/[lang]/not-found.tsx — this is what makes that page actually render for
// genuinely nonexistent URLs, rather than Next's bare built-in fallback.
export default function CatchAll() {
  notFound();
}
