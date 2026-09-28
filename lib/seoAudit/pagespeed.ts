// Google PageSpeed Insights: Google loads the page in real Chrome and runs
// Lighthouse, so JavaScript-rendered sites are measured properly, and the
// fetch happens on Google's side rather than ours. The raw response is several
// MB (screenshots, traces); only what the page renders is kept.
//
// PAGESPEED_API_KEY is effectively required — without it Google answers from
// a tiny shared keyless quota and returns 429 almost immediately.

import type { FieldData, PsiErrorCode, PsiReport, Rating } from "./types";

const ENDPOINT = "https://www.googleapis.com/pagespeedonline/v5/runPagespeed";
const CATEGORIES = ["performance", "seo", "accessibility", "best-practices"];
const METRICS = [
  "first-contentful-paint",
  "largest-contentful-paint",
  "total-blocking-time",
  "cumulative-layout-shift",
  "speed-index",
];

export class PsiError extends Error {
  constructor(public code: PsiErrorCode) {
    super(code);
  }
}

type LhAudit = {
  title?: string;
  score?: number | null;
  scoreDisplayMode?: string;
  displayValue?: string;
};

type CruxMetric = { percentile?: number; category?: string };
type CruxBlock = {
  overall_category?: string;
  origin_fallback?: boolean;
  metrics?: Record<string, CruxMetric>;
};

type PsiResponse = {
  loadingExperience?: CruxBlock;
  originLoadingExperience?: CruxBlock;
  lighthouseResult?: {
    runtimeError?: { code?: string };
    categories?: Record<string, { score: number | null; auditRefs?: { id: string; group?: string }[] }>;
    audits?: Record<string, LhAudit>;
  };
};

export async function runPageSpeed(url: string, strategy: PsiReport["strategy"]): Promise<PsiReport> {
  const params = new URLSearchParams({ url, strategy });
  CATEGORIES.forEach((c) => params.append("category", c));
  const key = process.env.PAGESPEED_API_KEY;
  if (key) params.set("key", key);
  else console.warn("SEO audit: PAGESPEED_API_KEY is not set — PageSpeed will almost always return 429");

  let res: Response;
  try {
    res = await fetch(`${ENDPOINT}?${params}`, { cache: "no-store", signal: AbortSignal.timeout(55_000) });
  } catch (err) {
    console.error(`SEO audit: PageSpeed ${strategy} request failed:`, err);
    throw new PsiError("failed");
  }
  if (!res.ok) {
    console.error(`SEO audit: PageSpeed ${strategy} returned ${res.status}:`, (await res.text()).slice(0, 500));
    throw new PsiError(res.status === 429 ? "quota" : "failed");
  }

  const json = (await res.json()) as PsiResponse;
  const lh = json.lighthouseResult;
  if (!lh || lh.runtimeError?.code) {
    console.error(`SEO audit: Lighthouse ${strategy} runtime error:`, lh?.runtimeError);
    throw new PsiError("failed");
  }

  const audits = lh.audits ?? {};
  const categories = lh.categories ?? {};
  const pct = (id: string) => {
    const s = categories[id]?.score;
    return typeof s === "number" ? Math.round(s * 100) : null;
  };

  return {
    strategy,
    scores: {
      performance: pct("performance"),
      seo: pct("seo"),
      accessibility: pct("accessibility"),
      bestPractices: pct("best-practices"),
    },
    metrics: METRICS.filter((id) => audits[id]).map((id) => ({
      id,
      displayValue: audits[id].displayValue ?? "",
      score: audits[id].score ?? null,
    })),
    field: fieldData(json),
    opportunities: opportunities(categories.performance?.auditRefs ?? [], audits),
  };
}

// Failing performance audits outside the headline metrics. Chosen by score
// rather than by a hardcoded id list: Lighthouse renames and regroups these
// between versions (v13 folded many into "insights"), and PSI upgrades silently.
function opportunities(refs: { id: string; group?: string }[], audits: Record<string, LhAudit>) {
  const skipModes = new Set(["informative", "notApplicable", "manual", "error"]);
  return refs
    .filter((ref) => ref.group !== "metrics" && ref.group !== "hidden")
    .map((ref) => ({ id: ref.id, audit: audits[ref.id] }))
    .filter(
      ({ audit }) =>
        audit &&
        typeof audit.score === "number" &&
        audit.score < 0.9 &&
        !skipModes.has(audit.scoreDisplayMode ?? "")
    )
    .sort((a, b) => (a.audit.score as number) - (b.audit.score as number))
    .slice(0, 6)
    .map(({ id, audit }) => ({
      id,
      title: plainText(audit.title ?? id),
      displayValue: audit.displayValue ?? "",
      score: audit.score as number,
    }));
}

// Lighthouse titles contain Markdown: `code` and [text](link).
function plainText(markdown: string): string {
  return markdown.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1").replace(/`/g, "");
}

function rating(category?: string): Rating | null {
  return category === "FAST" || category === "AVERAGE" || category === "SLOW" ? category : null;
}

// Chrome UX Report data — real visitors over the last 28 days. Only sites with
// enough Chrome traffic have it; most small Georgian sites will have none.
function fieldData(json: PsiResponse): FieldData | null {
  const page = json.loadingExperience;
  const block = page?.metrics ? page : json.originLoadingExperience?.metrics ? json.originLoadingExperience : null;
  if (!block?.metrics) return null;

  const m = block.metrics;
  const metric = (key: string, scale = 1) => {
    const entry = m[key];
    const r = rating(entry?.category);
    return typeof entry?.percentile === "number" && r ? { value: entry.percentile / scale, rating: r } : null;
  };
  const lcp = metric("LARGEST_CONTENTFUL_PAINT_MS");
  const inp = metric("INTERACTION_TO_NEXT_PAINT");
  const cls = metric("CUMULATIVE_LAYOUT_SHIFT_SCORE", 100);

  return {
    source: block === page && !page?.origin_fallback ? "url" : "origin",
    overall: rating(block.overall_category),
    lcp: lcp && { ms: lcp.value, rating: lcp.rating },
    inp: inp && { ms: inp.value, rating: inp.rating },
    cls,
  };
}
