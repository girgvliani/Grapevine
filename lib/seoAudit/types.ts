// Shapes shared by the /api/seo-audit route and the <SeoAudit> client. The
// server only ever sends check ids + raw data; every human-readable sentence
// lives in `translations.seoAudit` so both languages stay in one place.

export type CheckStatus = "pass" | "warn" | "fail" | "info";

export type CheckId =
  | "https"
  | "status"
  | "indexable"
  | "title"
  | "metaDescription"
  | "h1"
  | "viewport"
  | "lang"
  | "georgianContent"
  | "hreflang"
  | "canonical"
  | "openGraph"
  | "imageAlt"
  | "structuredData"
  | "robotsTxt"
  | "sitemap"
  | "wordCount";

export type Check = {
  id: CheckId;
  status: CheckStatus;
  // How much the check counts toward the on-page score (info checks don't count).
  weight: number;
  // Picks an alternative sentence for the same status, e.g. `fail_ge`.
  variant?: string;
  // Values interpolated into the translated sentence ({value}, {count}, …).
  data?: Record<string, string | number>;
};

export type PageReport = {
  requestedUrl: string;
  finalUrl: string;
  statusCode: number;
  responseMs: number;
  // Near-empty initial HTML that loads scripts: our checks see what Facebook
  // and simple crawlers see, but Google renders JS and may see more.
  clientRendered: boolean;
  checks: Check[];
  score: number; // 0–100
};

export type Rating = "FAST" | "AVERAGE" | "SLOW";

export type FieldData = {
  // "url" = real-user data for this exact page; "origin" = the whole site,
  // which Google falls back to when the page alone has too little traffic.
  source: "url" | "origin";
  overall: Rating | null;
  lcp: { ms: number; rating: Rating } | null;
  inp: { ms: number; rating: Rating } | null;
  cls: { value: number; rating: Rating } | null;
};

export type PsiReport = {
  strategy: "mobile" | "desktop";
  scores: {
    performance: number | null;
    seo: number | null;
    accessibility: number | null;
    bestPractices: number | null;
  };
  metrics: { id: string; displayValue: string; score: number | null }[];
  field: FieldData | null;
  // Failing Lighthouse audits, in Lighthouse's own (English) wording.
  opportunities: { id: string; title: string; displayValue: string; score: number }[];
};

export type AuditErrorCode =
  | "invalid_url"
  | "blocked_host"
  | "dns_failed"
  | "timeout"
  | "fetch_failed"
  | "bot_blocked"
  | "tls_invalid"
  | "not_html"
  | "too_many_redirects"
  | "rate_limited"
  | "captcha"
  | "generic";

export type PsiErrorCode = "quota" | "failed";

// The route streams one JSON object per line (NDJSON) as each part finishes,
// so the page check (~1–3s) shows up long before PageSpeed (~10–30s).
export type AuditEvent =
  | { type: "page"; report: PageReport }
  | { type: "page_error"; code: AuditErrorCode }
  | { type: "psi"; report: PsiReport }
  | { type: "psi_error"; strategy: PsiReport["strategy"]; code: PsiErrorCode }
  | { type: "done" };
