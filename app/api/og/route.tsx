import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { isLocale } from "@/lib/routing";
import { translations } from "@/lib/i18n";

// Social share card for every page: /api/og?lang=ka&title=<page name>.
//
// Referenced from lib/seo.ts (openGraph.images / twitter.images) so each page's
// preview on Facebook, Messenger, LinkedIn and X carries that page's own name
// instead of nothing. The file-convention opengraph-image only ever reached the
// homepage in production, which is why this is a plain route handler instead.
//
// The title is part of the URL, so a renamed page gets a new URL and the long
// CDN cache below never serves a stale card.
//
// Satori (ImageResponse's renderer) supports flexbox only: no grid, and any
// element with more than one child needs an explicit `display: flex`.

export const size = { width: 1200, height: 630 };

const MAX_TITLE = 90;

let mersadFont: Promise<Buffer> | null = null;
function loadMersad() {
  // Mersad is the site's heading face and ships Latin + Georgian glyphs, so
  // both locales render in the real brand type. Must stay .ttf: Satori can't
  // decode .woff2.
  mersadFont ??= readFile(join(process.cwd(), "public/fonts/Mersad Black.ttf"));
  return mersadFont;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const langParam = searchParams.get("lang") ?? "ka";
  const locale = isLocale(langParam) ? langParam : "ka";

  const rawTitle = (searchParams.get("title") ?? "").trim();
  const title = rawTitle
    ? rawTitle.length > MAX_TITLE
      ? `${rawTitle.slice(0, MAX_TITLE - 1).trimEnd()}…`
      : rawTitle
    : translations[locale].hero.label;

  // Long page names step down in size so they still fit on two to three lines.
  const titleSize = title.length > 60 ? 40 : title.length > 36 ? 50 : 60;

  const mersad = await loadMersad();

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
              fontSize: 124,
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
              fontSize: titleSize,
              lineHeight: 1.15,
              letterSpacing: "0.02em",
              color: "#FFEFAB",
              textTransform: "uppercase",
              maxWidth: 1040,
            }}
          >
            {title}
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
      headers: {
        // Crawlers re-fetch cards often; let the CDN keep them for a year.
        "Cache-Control": "public, max-age=86400, s-maxage=31536000, stale-while-revalidate=86400",
      },
    }
  );
}
