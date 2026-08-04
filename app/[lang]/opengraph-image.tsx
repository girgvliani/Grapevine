import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { LANGUAGES, translations } from "@/lib/i18n";
import { isLocale } from "@/lib/routing";

// Social share card, one per locale. Lives in the [lang] segment so it attaches
// to the localized pages — at the app root it only reached routes outside
// [lang], and those pages' own `openGraph` block never picked it up.
//
// Note: ImageResponse renders via satori, which supports flexbox only — no grid,
// and any element with more than one child needs an explicit `display: flex`.

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Grapevine";

// Without this the route is server-rendered on demand, re-rasterising the PNG on
// every crawler hit. Both locales are known at build time, so prerender them.
export function generateStaticParams() {
  return LANGUAGES.map(({ code }) => ({ lang: code }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale = isLocale(lang) ? lang : "ka";
  // Copy comes from i18n, so the card is localized and can't drift from the site.
  const label = translations[locale].hero.label;

  // Mersad is the site's heading face (--font-heading) and ships Latin +
  // Georgian glyphs, so both locales render in the real brand type.
  const mersad = await readFile(
    join(process.cwd(), "public/fonts/Mersad Black.ttf")
  );

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#1A0512",
          padding: "72px 80px",
          fontFamily: "Mersad",
        }}
      >
        <div style={{ display: "flex", width: 120, height: 10, background: "#EF583A" }} />

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 148,
              lineHeight: 1,
              letterSpacing: "-0.03em",
              color: "#EF583A",
              textTransform: "uppercase",
            }}
          >
            Grapevine
          </div>
          <div
            style={{
              marginTop: 28,
              fontSize: 42,
              lineHeight: 1.15,
              letterSpacing: "0.02em",
              color: "#FFEFAB",
              textTransform: "uppercase",
            }}
          >
            {label}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 26,
            letterSpacing: "0.14em",
            color: "rgba(255, 239, 171, 0.62)",
            textTransform: "uppercase",
          }}
        >
          grapevine.ge
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [{ name: "Mersad", data: mersad, weight: 900, style: "normal" }],
    }
  );
}
