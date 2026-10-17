/**
 * Turns the career timeline into spans on one month-based axis, the way a distributed trace lays
 * out calls on a time axis. Everything is computed at build time from content/timeline.ts.
 */
import { timeline } from "@/content/timeline";
import type { InternalHref, TimelineEntry, YearMonth } from "@/content/schema";

export type SpanKind = TimelineEntry["kind"];

export type TraceSpan = {
  id: string;
  organisation: string;
  role: string;
  kind: SpanKind;
  summary: string;
  caseStudy?: InternalHref;
  /** Months since the axis origin. */
  start: number;
  end: number;
  current: boolean;
  period: string;
  duration: string;
  durationShort: string;
};

export type Trace = {
  spans: TraceSpan[];
  /** Axis origin (January of the first year) and length in months. */
  originYear: number;
  months: number;
  years: number[];
  total: string;
};

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const kindLabels: Record<SpanKind, string> = {
  employment: "Employed",
  company: "My company",
  freelance: "Freelance",
};

export function monthName(index: number, originYear: number): string {
  return `${MONTHS[index % 12]} ${originYear + Math.floor(index / 12)}`;
}

function toIndex(value: YearMonth, originYear: number): number {
  return (value.year - originYear) * 12 + (value.month - 1);
}

function plural(n: number, word: string): string {
  return `${n} ${word}${n === 1 ? "" : "s"}`;
}

/** Inclusive month count, so a role from July to December reads as 6 months. */
function durations(months: number): { long: string; short: string } {
  const y = Math.floor(months / 12);
  const m = months % 12;
  const long = [y ? plural(y, "year") : "", m ? plural(m, "month") : ""].filter(Boolean).join(" ");
  const short = [y ? `${y}y` : "", m ? `${m}m` : ""].filter(Boolean).join(" ");
  return { long, short };
}

/** Organisation without the "(freelance, through ...)" note: the span colour carries that. */
function shortName(organisation: string): string {
  return organisation.split(" (")[0];
}

export function buildTrace(now: Date = new Date()): Trace {
  const originYear = Math.min(...timeline.map((entry) => entry.start.year));
  const nowIndex = toIndex({ year: now.getFullYear(), month: now.getMonth() + 1 }, originYear);
  // One month of head-room past today, so a current span's open end is visible.
  const months = nowIndex + 2;

  const spans = [...timeline]
    .sort((a, b) => toIndex(a.start, originYear) - toIndex(b.start, originYear))
    .map((entry): TraceSpan => {
      const start = toIndex(entry.start, originYear);
      const current = !entry.end;
      const end = (entry.end ? toIndex(entry.end, originYear) : nowIndex) + 1;
      const { long, short } = durations(end - start);
      return {
        id: `${entry.organisation}-${entry.start.year}-${entry.start.month}`.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
        organisation: shortName(entry.organisation),
        role: entry.role,
        kind: entry.kind,
        summary: entry.summary,
        caseStudy: entry.caseStudy,
        start,
        end,
        current,
        period: `${monthName(start, originYear)} to ${current ? "present" : monthName(end - 1, originYear)}`,
        duration: long,
        durationShort: short,
      };
    });

  const years = Array.from({ length: Math.floor(months / 12) + 1 }, (_, i) => originYear + i);
  const total = durations(nowIndex + 1 - Math.min(...spans.map((span) => span.start))).long;

  return { spans, originYear, months, years, total };
}

/** The kind of engagement behind a case study, for its colour. Work with no timeline role is my own company's. */
export function caseStudyKind(slug: string): SpanKind {
  return timeline.find((entry) => entry.caseStudy === `/work/${slug}/`)?.kind ?? "company";
}
