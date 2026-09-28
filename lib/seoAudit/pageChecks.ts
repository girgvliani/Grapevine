// On-page SEO checks run against the raw HTML of a single page, plus the site's
// robots.txt and sitemap. Speed and rendering are left to PageSpeed Insights;
// this covers what Lighthouse doesn't — mainly the Georgian-market specifics
// (lang="ka" vs the common "ge" mistake, Georgian titles, Facebook previews).

import { parse, type HTMLElement } from "node-html-parser";
import { AuditError, safeFetch } from "./safeFetch";
import type { Check, PageReport } from "./types";

const PAGE_MAX_BYTES = 3 * 1024 * 1024;
// Mkhedruli, Asomtavruli/Nuskhuri and Mtavruli. The /g copies are for
// counting with match(); test() must use the non-global one, since a shared
// global regex carries lastIndex over between calls.
const GEORGIAN_LETTER = /[Ⴀ-ჿᲐ-Ჿ]/;
const GEORGIAN_LETTER_G = /[Ⴀ-ჿᲐ-Ჿ]/g;
const ANY_LETTER = /\p{L}/gu;

export async function auditPage(url: URL): Promise<PageReport> {
  const page = await safeFetch(url, { timeoutMs: 12_000, maxBytes: PAGE_MAX_BYTES });

  const contentType = page.headers.get("content-type") ?? "";
  if (contentType && !/html|xml/i.test(contentType)) throw new AuditError("not_html");

  const root = parse(page.body, { comment: false });
  const html = root.querySelector("html");
  const head = root.querySelector("head") ?? root;
  const meta = (name: string) =>
    head.querySelector(`meta[name="${name}"]`)?.getAttribute("content")?.trim() ?? "";
  const property = (name: string) =>
    head.querySelector(`meta[property="${name}"]`)?.getAttribute("content")?.trim() ?? "";

  const title = head.querySelector("title")?.text.trim().replace(/\s+/g, " ") ?? "";

  // A bot-protection page (Cloudflare's "Just a moment...") isn't the client's
  // site — scoring it would report a missing H1 and noindex that don't exist.
  const challenged =
    page.headers.get("cf-mitigated") === "challenge" ||
    /just a moment|attention required|checking your browser|access denied/i.test(title);
  if (challenged || [401, 403, 429].includes(page.status)) throw new AuditError("bot_blocked");

  const lang = html?.getAttribute("lang")?.trim() ?? "";
  const scripts = root.querySelectorAll("script[src]").length;
  // Must run before visibleText(), which strips <script> tags out of the tree.
  const structuredData = checkStructuredData(root);
  const bodyText = visibleText(root);

  const [robots, sitemapFound] = await robotsAndSitemap(page.finalUrl);
  const wordCount = checkWordCount(bodyText, scripts);

  const checks: Check[] = [
    checkHttps(page.finalUrl),
    checkStatus(page.status, page.redirects),
    checkIndexable(meta("robots"), meta("googlebot"), page.headers.get("x-robots-tag")),
    checkTitle(title),
    checkDescription(meta("description")),
    checkH1(root.querySelectorAll("h1")),
    { id: "viewport", weight: 2, status: meta("viewport") ? "pass" : "fail" },
    checkLang(lang),
    checkGeorgian(bodyText, lang, title),
    checkHreflang(head),
    checkCanonical(head, page.finalUrl),
    checkOpenGraph(property),
    checkImages(root.querySelectorAll("img")),
    structuredData,
    robots,
    { id: "sitemap", weight: 1, status: sitemapFound ? "pass" : "warn" },
    wordCount,
  ];

  return {
    requestedUrl: url.href,
    finalUrl: page.finalUrl.href,
    statusCode: page.status,
    responseMs: page.elapsedMs,
    clientRendered: wordCount.variant === "js",
    checks,
    score: score(checks),
  };
}

// pass = full weight, warn = half, fail = none; info checks don't count.
function score(checks: Check[]): number {
  let earned = 0;
  let total = 0;
  for (const c of checks) {
    if (c.status === "info") continue;
    total += c.weight;
    if (c.status === "pass") earned += c.weight;
    else if (c.status === "warn") earned += c.weight / 2;
  }
  return total ? Math.round((earned / total) * 100) : 0;
}

function visibleText(root: HTMLElement): string {
  const body = root.querySelector("body") ?? root;
  body.querySelectorAll("script, style, noscript, svg, template").forEach((el) => el.remove());
  return body.text.replace(/\s+/g, " ").trim();
}


function clip(text: string, max = 120): string {
  return text.length > max ? `${text.slice(0, max - 1)}…` : text;
}

// "ge" is Georgia's country code; the language code for Georgian is "ka".
function isWrongGeorgianCode(code: string): boolean {
  return /^(ge|geo)(-|$)/i.test(code);
}

function checkHttps(finalUrl: URL): Check {
  return { id: "https", weight: 3, status: finalUrl.protocol === "https:" ? "pass" : "fail" };
}

function checkStatus(code: number, redirects: number): Check {
  const data = { code, redirects };
  if (code < 200 || code >= 300) return { id: "status", weight: 3, status: "fail", data };
  return { id: "status", weight: 3, status: redirects >= 3 ? "warn" : "pass", data };
}

function checkIndexable(robots: string, googlebot: string, header: string | null): Check {
  const noindex = [robots, googlebot, header ?? ""].some((v) => /\b(noindex|none)\b/i.test(v));
  return { id: "indexable", weight: 3, status: noindex ? "fail" : "pass" };
}

function checkTitle(title: string): Check {
  if (!title) return { id: "title", weight: 3, status: "fail" };
  const length = [...title].length;
  const data = { value: clip(title), length };
  return { id: "title", weight: 3, status: length >= 30 && length <= 60 ? "pass" : "warn", data };
}

function checkDescription(description: string): Check {
  if (!description) return { id: "metaDescription", weight: 2, status: "fail" };
  const length = [...description].length;
  return {
    id: "metaDescription",
    weight: 2,
    status: length >= 70 && length <= 160 ? "pass" : "warn",
    data: { length },
  };
}

function checkH1(h1s: HTMLElement[]): Check {
  if (h1s.length === 0) return { id: "h1", weight: 2, status: "fail" };
  const value = clip(h1s[0].text.replace(/\s+/g, " ").trim());
  return { id: "h1", weight: 2, status: h1s.length === 1 ? "pass" : "warn", data: { value, count: h1s.length } };
}

function checkLang(lang: string): Check {
  if (!lang) return { id: "lang", weight: 2, status: "fail" };
  if (isWrongGeorgianCode(lang)) return { id: "lang", weight: 2, status: "fail", variant: "ge", data: { value: lang } };
  return { id: "lang", weight: 2, status: "pass", data: { value: lang } };
}

function checkGeorgian(text: string, lang: string, title: string): Check {
  const letters = text.match(ANY_LETTER)?.length ?? 0;
  // A few words of navigation can't tell us what language a page is in.
  if (letters < 80) return { id: "georgianContent", weight: 1.5, status: "info", variant: "empty" };

  const georgianShare = (text.match(GEORGIAN_LETTER_G)?.length ?? 0) / letters;
  const percent = Math.round(georgianShare * 100);
  if (georgianShare < 0.3) return { id: "georgianContent", weight: 1.5, status: "info", data: { percent } };
  if (lang && !/^ka(-|$)/i.test(lang)) {
    return { id: "georgianContent", weight: 1.5, status: "warn", variant: "lang", data: { value: lang } };
  }
  if (title && !GEORGIAN_LETTER.test(title)) {
    return { id: "georgianContent", weight: 1.5, status: "warn", variant: "title" };
  }
  return { id: "georgianContent", weight: 1.5, status: "pass", data: { percent } };
}

function checkHreflang(head: HTMLElement): Check {
  const codes = head
    .querySelectorAll('link[rel="alternate"][hreflang]')
    .map((el) => el.getAttribute("hreflang")?.trim() ?? "")
    .filter(Boolean);
  if (codes.length === 0) return { id: "hreflang", weight: 1, status: "info" };

  const value = [...new Set(codes)].join(", ");
  if (codes.some(isWrongGeorgianCode)) {
    return { id: "hreflang", weight: 1, status: "fail", variant: "ge", data: { value } };
  }
  const hasDefault = codes.some((c) => c.toLowerCase() === "x-default");
  return { id: "hreflang", weight: 1, status: hasDefault ? "pass" : "warn", data: { value } };
}

function checkCanonical(head: HTMLElement, finalUrl: URL): Check {
  const href = head.querySelector('link[rel="canonical"]')?.getAttribute("href")?.trim();
  if (!href) return { id: "canonical", weight: 1.5, status: "warn", variant: "missing" };

  let canonical: URL;
  try {
    canonical = new URL(href, finalUrl);
  } catch {
    return { id: "canonical", weight: 1.5, status: "warn", variant: "missing" };
  }
  const strip = (u: URL) => `${u.hostname.replace(/^www\./, "")}${u.pathname.replace(/\/$/, "")}`;
  if (strip(canonical) !== strip(finalUrl)) {
    return { id: "canonical", weight: 1.5, status: "warn", variant: "other", data: { value: clip(canonical.href) } };
  }
  return { id: "canonical", weight: 1.5, status: "pass" };
}

function checkOpenGraph(property: (name: string) => string): Check {
  const missing = ["og:title", "og:description", "og:image"].filter((p) => !property(p));
  if (missing.length === 3) return { id: "openGraph", weight: 1, status: "fail" };
  if (missing.length > 0) return { id: "openGraph", weight: 1, status: "warn", data: { value: missing.join(", ") } };
  return { id: "openGraph", weight: 1, status: "pass" };
}

function checkImages(images: HTMLElement[]): Check {
  const total = images.length;
  if (total === 0) return { id: "imageAlt", weight: 1, status: "info" };
  // alt="" is correct for decorative images — only a missing attribute counts.
  const missing = images.filter((img) => img.getAttribute("alt") === undefined).length;
  return { id: "imageAlt", weight: 1, status: missing === 0 ? "pass" : "warn", data: { total, missing } };
}

function checkStructuredData(root: HTMLElement): Check {
  const types = new Set<string>();
  for (const script of root.querySelectorAll('script[type="application/ld+json"]')) {
    try {
      collectTypes(JSON.parse(script.rawText), types);
    } catch {
      /* invalid JSON-LD — ignored rather than counted */
    }
  }
  for (const el of root.querySelectorAll("[itemtype]")) {
    const type = el.getAttribute("itemtype")?.split("/").pop();
    if (type) types.add(type);
  }
  if (types.size === 0) return { id: "structuredData", weight: 1, status: "warn" };
  return { id: "structuredData", weight: 1, status: "pass", data: { value: clip([...types].join(", ")) } };
}

function collectTypes(node: unknown, types: Set<string>) {
  if (Array.isArray(node)) {
    node.forEach((n) => collectTypes(n, types));
  } else if (node && typeof node === "object") {
    const obj = node as Record<string, unknown>;
    const t = obj["@type"];
    if (typeof t === "string") types.add(t);
    if (Array.isArray(t)) t.forEach((x) => typeof x === "string" && types.add(x));
    if (obj["@graph"]) collectTypes(obj["@graph"], types);
  }
}

function checkWordCount(text: string, scripts: number): Check {
  const count = text ? text.split(" ").filter((w) => w.length > 1).length : 0;
  if (count >= 200) return { id: "wordCount", weight: 1, status: "pass", data: { count } };
  // Near-empty HTML that loads scripts is almost always a client-rendered app.
  const variant = count < 50 && scripts > 0 ? "js" : undefined;
  return { id: "wordCount", weight: 1, status: "warn", variant, data: { count } };
}

async function robotsAndSitemap(pageUrl: URL): Promise<[Check, boolean]> {
  const origin = pageUrl.origin;
  let robots: Check = { id: "robotsTxt", weight: 1, status: "warn" };
  const declaredSitemaps: string[] = [];

  const res = await safeFetch(new URL("/robots.txt", origin), { timeoutMs: 6000, maxBytes: 256 * 1024 }).catch(
    () => null
  );
  // SPAs often answer every path with their index.html — that isn't a robots.txt.
  if (res && res.status === 200 && !res.body.trimStart().startsWith("<")) {
    robots = { id: "robotsTxt", weight: 1, status: blocksEverything(res.body) ? "fail" : "pass" };
    for (const line of res.body.split(/\r?\n/)) {
      const match = /^\s*sitemap:\s*(\S+)/i.exec(line);
      if (match) declaredSitemaps.push(match[1]);
    }
  }

  const candidates = [...declaredSitemaps.slice(0, 2), `${origin}/sitemap.xml`, `${origin}/sitemap_index.xml`];
  for (const candidate of candidates) {
    let url: URL;
    try {
      url = new URL(candidate, origin);
    } catch {
      continue;
    }
    const sitemap = await safeFetch(url, { timeoutMs: 6000, maxBytes: 64 * 1024 }).catch(() => null);
    if (sitemap && sitemap.status === 200 && /<(urlset|sitemapindex)[\s>]/i.test(sitemap.body)) {
      return [robots, true];
    }
  }
  return [robots, false];
}

// True when the `User-agent: *` group contains a bare `Disallow: /`.
function blocksEverything(robotsTxt: string): boolean {
  let inWildcardGroup = false;
  let lastWasAgent = false;
  for (const raw of robotsTxt.split(/\r?\n/)) {
    const line = raw.replace(/#.*/, "").trim();
    if (!line) continue;
    const [field, ...rest] = line.split(":");
    const key = field.trim().toLowerCase();
    const value = rest.join(":").trim();
    if (key === "user-agent") {
      // Consecutive User-agent lines share one group.
      inWildcardGroup = (lastWasAgent && inWildcardGroup) || value === "*";
      lastWasAgent = true;
      continue;
    }
    lastWasAgent = false;
    if (inWildcardGroup && key === "disallow" && value === "/") return true;
  }
  return false;
}
