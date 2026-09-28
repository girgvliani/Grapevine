"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import Link from "next/link";
import { useLang } from "./LanguageProvider";
import Turnstile, { TURNSTILE_SITE_KEY } from "./Turnstile";
import { mtavruli } from "@/lib/i18n";
import { localizedHref } from "@/lib/routing";
import type {
  AuditErrorCode,
  AuditEvent,
  Check,
  CheckStatus,
  PageReport,
  PsiErrorCode,
  PsiReport,
  Rating,
} from "@/lib/seoAudit/types";

type Strategy = PsiReport["strategy"];
const STRATEGIES: Strategy[] = ["mobile", "desktop"];

type AuditState = {
  phase: "idle" | "running" | "done" | "error";
  error: AuditErrorCode | null;
  page: PageReport | null;
  pageError: AuditErrorCode | null;
  psi: Partial<Record<Strategy, PsiReport>>;
  psiErrors: Partial<Record<Strategy, PsiErrorCode>>;
};

const INITIAL: AuditState = { phase: "idle", error: null, page: null, pageError: null, psi: {}, psiErrors: {} };

const GOOD = "#1F8A4C";
const MID = "#B86E00";
const POOR = "#C0392B";
const MUTED = "rgba(26,5,18,0.62)";
const PAD_X = "clamp(1.5rem,7.6vw,6.875rem)";

const STATUS_COLOR: Record<CheckStatus, string> = { pass: GOOD, warn: MID, fail: POOR, info: "var(--purple-dark)" };
const RATING_COLOR: Record<Rating, string> = { FAST: GOOD, AVERAGE: MID, SLOW: POOR };

function scoreColor(score: number) {
  return score >= 90 ? GOOD : score >= 50 ? MID : POOR;
}

function fill(template: string, vars: Record<string, string | number> = {}) {
  return template.replace(/\{(\w+)\}/g, (match, key) => (key in vars ? String(vars[key]) : match));
}

// On-page checks carry half the weight: they're what the agency can actually
// fix. Mobile speed and Lighthouse's SEO pass split the rest. Weights are
// re-normalised over whatever arrived, so a failed speed test doesn't zero it.
function overallScore(page: PageReport | null, mobile?: PsiReport): number | null {
  const parts: [number, number][] = [];
  if (page) parts.push([page.score, 0.5]);
  if (mobile?.scores.performance != null) parts.push([mobile.scores.performance, 0.3]);
  if (mobile?.scores.seo != null) parts.push([mobile.scores.seo, 0.2]);
  if (parts.length === 0) return null;
  const weight = parts.reduce((sum, [, w]) => sum + w, 0);
  return Math.round(parts.reduce((sum, [s, w]) => sum + s * w, 0) / weight);
}

const card: CSSProperties = {
  background: "var(--cream)",
  color: "var(--dark)",
  borderRadius: "1.25rem",
  padding: "clamp(1.25rem, 3vw, 2rem)",
};

const cardHeading: CSSProperties = {
  fontFamily: "var(--font-heading)",
  fontWeight: 900,
  fontSize: "clamp(1.25rem, 2.4vw, 1.625rem)",
  letterSpacing: "-0.01em",
  lineHeight: 1.15,
  marginBottom: "1rem",
};

export default function SeoAudit() {
  const { t, lang } = useLang();
  const s = t.seoAudit;

  const [url, setUrl] = useState("");
  const [state, setState] = useState<AuditState>(INITIAL);
  const [turnstileToken, setTurnstileToken] = useState("");
  const [turnstileKey, setTurnstileKey] = useState(0);
  // Same flow as the contact form: Turnstile only mounts once Submit is pressed.
  const [showTurnstile, setShowTurnstile] = useState(false);
  const [waitingForCaptcha, setWaitingForCaptcha] = useState(false);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => () => abortRef.current?.abort(), []);

  function apply(event: AuditEvent) {
    setState((prev) => {
      switch (event.type) {
        case "page":
          return { ...prev, page: event.report };
        case "page_error":
          return { ...prev, pageError: event.code };
        case "psi":
          return { ...prev, psi: { ...prev.psi, [event.report.strategy]: event.report } };
        case "psi_error":
          return { ...prev, psiErrors: { ...prev.psiErrors, [event.strategy]: event.code } };
        default:
          return prev;
      }
    });
  }

  async function runAudit(token: string) {
    setWaitingForCaptcha(false);
    setState({ ...INITIAL, phase: "running" });
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    try {
      const res = await fetch("/api/seo-audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url, turnstileToken: token }),
        signal: controller.signal,
      });
      if (!res.ok || !res.body) {
        const data = (await res.json().catch(() => ({}))) as { error?: AuditErrorCode };
        setState({ ...INITIAL, phase: "error", error: data.error ?? "generic" });
        return;
      }

      // NDJSON: one event per line, applied as each part of the audit finishes.
      const reader = res.body.pipeThrough(new TextDecoderStream()).getReader();
      let buffer = "";
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += value;
        let newline: number;
        while ((newline = buffer.indexOf("\n")) >= 0) {
          const line = buffer.slice(0, newline).trim();
          buffer = buffer.slice(newline + 1);
          if (line) apply(JSON.parse(line) as AuditEvent);
        }
      }
      setState((prev) => ({ ...prev, phase: "done" }));
    } catch (err) {
      if (controller.signal.aborted) return;
      console.error("SEO audit request failed:", err);
      // Keep whatever already arrived; only a run with nothing to show is an error.
      setState((prev) =>
        prev.page || prev.psi.mobile || prev.psi.desktop
          ? { ...prev, phase: "done" }
          : { ...INITIAL, phase: "error", error: "generic" }
      );
    } finally {
      setTurnstileToken("");
      setTurnstileKey((k) => k + 1);
      setShowTurnstile(false);
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (state.phase === "running" || waitingForCaptcha || !url.trim()) return;
    if (TURNSTILE_SITE_KEY && !turnstileToken) {
      setWaitingForCaptcha(true);
      setShowTurnstile(true);
      return;
    }
    runAudit(turnstileToken);
  }

  useEffect(() => {
    if (waitingForCaptcha && turnstileToken) runAudit(turnstileToken);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [turnstileToken]);

  const busy = state.phase === "running" || waitingForCaptcha;
  const hasResults = state.phase === "running" || state.phase === "done";

  return (
    <main style={{ background: "var(--dark)", color: "var(--white)", minHeight: "60vh" }}>
      <header style={{ padding: `11rem ${PAD_X} 3rem` }}>
        <div className="container-cap">
          <div
            style={{
              color: "var(--orange)",
              fontSize: "0.75rem",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              marginBottom: "1.5rem",
              fontFamily: "var(--font-primary)",
            }}
          >
            {s.eyebrow}
          </div>
          <h1
            style={{
              fontFamily: "var(--font-heading)",
              fontWeight: 900,
              fontSize: "clamp(2.75rem,7vw,6rem)",
              lineHeight: 0.95,
              letterSpacing: "-0.02em",
              color: "var(--orange)",
            }}
          >
            {mtavruli(s.heading)}
          </h1>
          <p
            style={{
              maxWidth: "38rem",
              marginTop: "1.75rem",
              fontSize: "0.95rem",
              lineHeight: 1.8,
              color: "rgba(255,250,236,0.72)",
              fontFamily: "var(--font-primary)",
            }}
          >
            {s.intro}
          </p>

          <form onSubmit={handleSubmit} style={{ marginTop: "2.5rem", maxWidth: "46rem" }}>
            <label
              htmlFor="seo-audit-url"
              style={{
                display: "block",
                fontSize: "0.6875rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "rgba(255,250,236,0.6)",
                marginBottom: "0.625rem",
                fontFamily: "var(--font-primary)",
              }}
            >
              {s.urlLabel}
            </label>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
              <input
                id="seo-audit-url"
                name="url"
                type="text"
                inputMode="url"
                autoComplete="url"
                autoCapitalize="off"
                spellCheck={false}
                required
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder={s.urlPlaceholder}
                style={{
                  flex: "1 1 18rem",
                  minWidth: 0,
                  padding: "1rem 1.25rem",
                  borderRadius: "100px",
                  border: "1px solid rgba(255,250,236,0.25)",
                  background: "var(--cream)",
                  color: "var(--dark)",
                  fontSize: "1rem",
                  fontFamily: "var(--font-primary)",
                  outline: "none",
                }}
              />
              <button
                type="submit"
                disabled={busy}
                style={{
                  flex: "0 0 auto",
                  padding: "1rem 2rem",
                  background: "var(--purple-dark)",
                  color: "#fff",
                  border: "none",
                  borderRadius: "100px",
                  fontSize: "0.875rem",
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                  fontFamily: "var(--font-primary)",
                  opacity: busy ? 0.7 : 1,
                  transition: "background 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "#a030aa")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "var(--purple-dark)")}
              >
                {busy ? s.running : s.submit}
              </button>
            </div>
            {showTurnstile && (
              <div style={{ marginTop: "0.75rem" }}>
                <Turnstile key={turnstileKey} onToken={setTurnstileToken} />
              </div>
            )}
            <p
              style={{
                marginTop: "0.875rem",
                fontSize: "0.8125rem",
                lineHeight: 1.6,
                color: "rgba(255,250,236,0.5)",
                fontFamily: "var(--font-primary)",
              }}
            >
              {s.note}
            </p>
            {state.phase === "error" && state.error && (
              <div
                role="alert"
                style={{
                  marginTop: "1rem",
                  padding: "0.875rem 1.125rem",
                  borderRadius: "0.75rem",
                  background: "rgba(192,57,43,0.16)",
                  border: "1px solid rgba(192,57,43,0.5)",
                  color: "#FFB4A8",
                  fontSize: "0.875rem",
                  fontWeight: 700,
                  fontFamily: "var(--font-primary)",
                }}
              >
                {s.errors[state.error]}
              </div>
            )}
          </form>
        </div>
      </header>

      {hasResults && (
        <div
          aria-live="polite"
          style={{ padding: `1rem ${PAD_X} 6rem`, fontFamily: "var(--font-primary)" }}
        >
          <div className="container-cap" style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            <Summary state={state} />
            {state.phase === "running" && <Progress state={state} />}
            {state.pageError && <Notice color={POOR}>{s.errors[state.pageError]}</Notice>}
            {state.page?.clientRendered && <Notice color="var(--purple-dark)">{s.clientRendered}</Notice>}
            {state.page && <Checks checks={state.page.checks} />}
            {(state.psi.mobile || state.psi.desktop || state.phase === "done") && <Speed state={state} />}
            {state.phase === "done" && <AuditCta href={localizedHref("/contact", lang)} />}
          </div>
        </div>
      )}
    </main>
  );
}

function Summary({ state }: { state: AuditState }) {
  const s = useLang().t.seoAudit;
  const mobile = state.psi.mobile;
  const overall = state.phase === "done" ? overallScore(state.page, mobile) : null;
  const pendingPsi = state.phase === "running" && !mobile && !state.psiErrors.mobile;

  const tiles: { label: string; value: number | null | undefined; pending: boolean }[] = [
    { label: s.scores.onPage, value: state.page?.score, pending: state.phase === "running" && !state.page && !state.pageError },
    { label: s.scores.performance, value: mobile?.scores.performance, pending: pendingPsi },
    { label: s.scores.seo, value: mobile?.scores.seo, pending: pendingPsi },
    { label: s.scores.accessibility, value: mobile?.scores.accessibility, pending: pendingPsi },
  ];

  return (
    <section style={card}>
      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "1.5rem 2rem" }}>
        <Gauge value={overall} size={132} pending={state.phase === "running"} />
        <div style={{ flex: "1 1 14rem", minWidth: 0 }}>
          <h2 style={{ ...cardHeading, marginBottom: "0.5rem" }}>{mtavruli(s.scores.overall)}</h2>
          {state.page && (
            <p style={{ fontSize: "0.8125rem", color: MUTED, overflowWrap: "anywhere" }}>
              {s.audited} {state.page.finalUrl}
            </p>
          )}
        </div>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(8.5rem, 1fr))",
          gap: "1rem",
          marginTop: "1.75rem",
          paddingTop: "1.5rem",
          borderTop: "1px solid rgba(26,5,18,0.12)",
        }}
      >
        {tiles.map((tile) => (
          <div key={tile.label} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.625rem", textAlign: "center" }}>
            <Gauge value={tile.value ?? null} size={76} pending={tile.pending} />
            <span style={{ fontSize: "0.75rem", lineHeight: 1.4, color: MUTED }}>{tile.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function Gauge({ value, size, pending }: { value: number | null; size: number; pending: boolean }) {
  const stroke = size > 100 ? 10 : 6;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const color = value == null ? "rgba(26,5,18,0.25)" : scoreColor(value);
  const center = size / 2;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} role="img" aria-label={value == null ? "—" : `${value}/100`} style={{ flexShrink: 0 }}>
      <circle cx={center} cy={center} r={radius} fill="none" stroke="rgba(26,5,18,0.1)" strokeWidth={stroke} />
      {pending ? (
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke="var(--orange)"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={`${circumference * 0.22} ${circumference}`}
        >
          <animateTransform attributeName="transform" type="rotate" from={`0 ${center} ${center}`} to={`360 ${center} ${center}`} dur="1.1s" repeatCount="indefinite" />
        </circle>
      ) : (
        value != null && (
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={circumference * (1 - value / 100)}
            transform={`rotate(-90 ${center} ${center})`}
            style={{ transition: "stroke-dashoffset 0.8s cubic-bezier(0.16,1,0.3,1)" }}
          />
        )
      )}
      <text
        x="50%"
        y="50%"
        dominantBaseline="central"
        textAnchor="middle"
        fill={pending ? "rgba(26,5,18,0.35)" : color}
        style={{ fontFamily: "var(--font-heading)", fontWeight: 900, fontSize: size * 0.3 }}
      >
        {pending || value == null ? "—" : value}
      </text>
    </svg>
  );
}

function Progress({ state }: { state: AuditState }) {
  const s = useLang().t.seoAudit;
  const steps = [
    { label: s.steps.page, done: Boolean(state.page || state.pageError) },
    { label: s.steps.mobile, done: Boolean(state.psi.mobile || state.psiErrors.mobile) },
    { label: s.steps.desktop, done: Boolean(state.psi.desktop || state.psiErrors.desktop) },
  ];
  return (
    <section style={{ ...card, padding: "1.125rem 1.5rem" }}>
      <ul style={{ listStyle: "none", display: "flex", flexWrap: "wrap", gap: "0.75rem 2rem" }}>
        {steps.map((step) => (
          <li key={step.label} style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.875rem", color: step.done ? "var(--dark)" : MUTED }}>
            {step.done ? (
              <svg width="16" height="16" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                <circle cx="9" cy="9" r="8" stroke={GOOD} strokeWidth="1.6" />
                <path d="M5.5 9.2 7.8 11.5l4.7-5" stroke={GOOD} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                <circle cx="9" cy="9" r="7" stroke="rgba(26,5,18,0.15)" strokeWidth="2" />
                <path d="M9 2a7 7 0 0 1 7 7" stroke="var(--orange)" strokeWidth="2" strokeLinecap="round">
                  <animateTransform attributeName="transform" type="rotate" from="0 9 9" to="360 9 9" dur="0.9s" repeatCount="indefinite" />
                </path>
              </svg>
            )}
            {step.label}
          </li>
        ))}
      </ul>
    </section>
  );
}

function Notice({ color, children }: { color: string; children: ReactNode }) {
  return (
    <div style={{ ...card, padding: "1rem 1.5rem", borderLeft: `4px solid ${color}`, fontSize: "0.875rem", lineHeight: 1.65, fontWeight: 700 }}>
      {children}
    </div>
  );
}

function Checks({ checks }: { checks: Check[] }) {
  const s = useLang().t.seoAudit;
  const byStatus = (status: CheckStatus) =>
    checks.filter((c) => c.status === status).sort((a, b) => b.weight - a.weight);
  const passed = byStatus("pass");

  return (
    <>
      {(["fail", "warn", "info"] as const).map((status) => {
        const group = byStatus(status);
        if (group.length === 0) return null;
        return (
          <section key={status} style={card}>
            <h2 style={{ ...cardHeading, display: "flex", alignItems: "center", gap: "0.625rem" }}>
              <StatusDot status={status} size={12} />
              {mtavruli(s.groups[status])}
              <span style={{ fontSize: "0.875rem", color: MUTED, fontWeight: 400 }}>({group.length})</span>
            </h2>
            <CheckList checks={group} showFix={status !== "info"} />
          </section>
        );
      })}
      {passed.length > 0 && (
        <section style={card}>
          <details>
            <summary style={{ ...cardHeading, marginBottom: 0, display: "flex", alignItems: "center", gap: "0.625rem", listStyle: "none" }}>
              <StatusDot status="pass" size={12} />
              {mtavruli(fill(s.groups.pass, { n: passed.length }))}
              <span aria-hidden="true" style={{ marginLeft: "auto", fontSize: "1rem", color: MUTED }}>+</span>
            </summary>
            <div style={{ marginTop: "1rem" }}>
              <CheckList checks={passed} showFix={false} />
            </div>
          </details>
        </section>
      )}
    </>
  );
}

function CheckList({ checks, showFix }: { checks: Check[]; showFix: boolean }) {
  const s = useLang().t.seoAudit;
  return (
    <ul style={{ listStyle: "none" }}>
      {checks.map((check, i) => {
        const copy = s.checks[check.id] as Record<string, string>;
        const sentence = (check.variant && copy[`${check.status}_${check.variant}`]) || copy[check.status] || "";
        return (
          <li
            key={check.id}
            style={{
              display: "flex",
              gap: "0.875rem",
              padding: "1rem 0",
              borderTop: i === 0 ? "none" : "1px solid rgba(26,5,18,0.1)",
            }}
          >
            <StatusDot status={check.status} size={10} style={{ marginTop: "0.375rem" }} />
            <div style={{ minWidth: 0 }}>
              <div style={{ fontWeight: 700, fontSize: "0.9375rem", marginBottom: "0.25rem" }}>{copy.label}</div>
              <p style={{ fontSize: "0.875rem", lineHeight: 1.65, color: "rgba(26,5,18,0.8)", overflowWrap: "anywhere" }}>
                {fill(sentence, check.data)}
              </p>
              {showFix && copy.fix && (
                <p style={{ marginTop: "0.5rem", fontSize: "0.8125rem", lineHeight: 1.65, color: MUTED }}>
                  <strong style={{ color: "var(--purple-dark)" }}>{s.howToFix}:</strong> {copy.fix}
                </p>
              )}
            </div>
          </li>
        );
      })}
    </ul>
  );
}

function StatusDot({ status, size, style }: { status: CheckStatus; size: number; style?: CSSProperties }) {
  return (
    <span
      aria-hidden="true"
      style={{ width: size, height: size, borderRadius: "50%", background: STATUS_COLOR[status], flexShrink: 0, display: "inline-block", ...style }}
    />
  );
}

function Speed({ state }: { state: AuditState }) {
  const s = useLang().t.seoAudit;
  return (
    <section style={card}>
      <h2 style={cardHeading}>{mtavruli(s.speed.heading)}</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(17rem, 1fr))", gap: "1.5rem 2.5rem" }}>
        {STRATEGIES.map((strategy) => (
          <SpeedColumn
            key={strategy}
            label={s.speed[strategy]}
            report={state.psi[strategy]}
            error={state.psiErrors[strategy]}
            pending={state.phase === "running"}
          />
        ))}
      </div>
      <p style={{ marginTop: "1.5rem", fontSize: "0.75rem", color: MUTED }}>{s.speed.source}</p>
    </section>
  );
}

function SpeedColumn({
  label,
  report,
  error,
  pending,
}: {
  label: string;
  report?: PsiReport;
  error?: PsiErrorCode;
  pending: boolean;
}) {
  const s = useLang().t.seoAudit;
  const metricLabel = s.speed.metrics as Record<string, string>;
  const subheading: CSSProperties = {
    fontSize: "0.6875rem",
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    color: MUTED,
    margin: "1.25rem 0 0.5rem",
  };

  return (
    <div style={{ minWidth: 0 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1rem" }}>
        <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 900, fontSize: "1.125rem" }}>{label}</h3>
        {report?.scores.performance != null && <Gauge value={report.scores.performance} size={56} pending={false} />}
      </div>

      {!report && error && <p style={{ marginTop: "0.75rem", fontSize: "0.875rem", color: POOR }}>{s.psiErrors[error]}</p>}
      {!report && !error && pending && <p style={{ marginTop: "0.75rem", fontSize: "0.875rem", color: MUTED }}>{s.running}</p>}

      {report && (
        <>
          <div style={subheading}>{report.field?.source === "origin" ? s.speed.fieldOrigin : s.speed.field}</div>
          {report.field ? (
            <>
              <MetricRow label={metricLabel.lcp} value={report.field.lcp && formatMs(report.field.lcp.ms)} color={report.field.lcp && RATING_COLOR[report.field.lcp.rating]} rating={report.field.lcp && s.speed.ratings[report.field.lcp.rating]} />
              <MetricRow label={metricLabel.inp} value={report.field.inp && `${Math.round(report.field.inp.ms)} ms`} color={report.field.inp && RATING_COLOR[report.field.inp.rating]} rating={report.field.inp && s.speed.ratings[report.field.inp.rating]} />
              <MetricRow label={metricLabel.cls} value={report.field.cls && report.field.cls.value.toFixed(2)} color={report.field.cls && RATING_COLOR[report.field.cls.rating]} rating={report.field.cls && s.speed.ratings[report.field.cls.rating]} />
            </>
          ) : (
            <p style={{ fontSize: "0.8125rem", lineHeight: 1.6, color: MUTED }}>{s.speed.noField}</p>
          )}

          <div style={subheading}>{s.speed.lab}</div>
          {report.metrics.map((metric) => (
            <MetricRow
              key={metric.id}
              label={metricLabel[metric.id] ?? metric.id}
              value={metric.displayValue}
              color={metric.score == null ? null : scoreColor(metric.score * 100)}
            />
          ))}

          {report.opportunities.length > 0 && (
            <>
              <div style={subheading}>{s.speed.opportunities}</div>
              <ul style={{ listStyle: "none" }}>
                {report.opportunities.map((o) => (
                  <li key={o.id} style={{ display: "flex", gap: "0.625rem", padding: "0.4rem 0", fontSize: "0.8125rem", lineHeight: 1.5 }}>
                    <span aria-hidden="true" style={{ width: 8, height: 8, marginTop: "0.35rem", borderRadius: "50%", flexShrink: 0, background: scoreColor(o.score * 100) }} />
                    <span style={{ minWidth: 0 }}>
                      {o.title}
                      {o.displayValue && <span style={{ color: MUTED }}> — {o.displayValue}</span>}
                    </span>
                  </li>
                ))}
              </ul>
            </>
          )}
        </>
      )}
    </div>
  );
}

function MetricRow({
  label,
  value,
  color,
  rating,
}: {
  label: string;
  value: string | null;
  color: string | null;
  rating?: string | null;
}) {
  if (!value) return null;
  return (
    <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: "1rem", padding: "0.4rem 0", borderBottom: "1px solid rgba(26,5,18,0.08)", fontSize: "0.875rem" }}>
      <span>{label}</span>
      <span style={{ fontWeight: 700, color: color ?? "var(--dark)", whiteSpace: "nowrap" }}>
        {value}
        {rating && <span style={{ fontWeight: 400, fontSize: "0.75rem", marginLeft: "0.4rem" }}>{rating}</span>}
      </span>
    </div>
  );
}

function formatMs(ms: number) {
  return ms >= 1000 ? `${(ms / 1000).toFixed(1)} s` : `${Math.round(ms)} ms`;
}

function AuditCta({ href }: { href: string }) {
  const s = useLang().t.seoAudit;
  return (
    <section
      style={{
        ...card,
        background: "var(--orange)",
        color: "var(--white)",
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "1.25rem 2rem",
      }}
    >
      <div style={{ flex: "1 1 20rem", minWidth: 0 }}>
        <h2 style={{ ...cardHeading, color: "var(--white)", marginBottom: "0.5rem" }}>{mtavruli(s.cta.heading)}</h2>
        <p style={{ fontSize: "0.9rem", lineHeight: 1.7, maxWidth: "40rem" }}>{s.cta.body}</p>
      </div>
      <Link
        href={href}
        style={{
          flex: "0 0 auto",
          background: "var(--dark)",
          color: "var(--white)",
          padding: "0.95rem 1.75rem",
          borderRadius: "100px",
          fontSize: "0.8125rem",
          fontWeight: 700,
          letterSpacing: "0.08em",
          textDecoration: "none",
          fontFamily: "var(--font-primary)",
        }}
      >
        {s.cta.button} →
      </Link>
    </section>
  );
}
