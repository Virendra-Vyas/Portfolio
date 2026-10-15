/**
 * The public, read-only JSON API for this site.
 *
 * Every endpoint is generated at build time from the same typed content the pages render,
 * so the API and the pages cannot disagree. Responses share one envelope:
 * `{ data, links }`. The shapes here are the contract; `openapi.ts` documents them and
 * `scripts/check-api.mjs` validates every built response against that document.
 */
import { caseStudies } from "@/content/caseStudies";
import { profile } from "@/content/profile";
import type { CaseStudy, Section, TimelineEntry, YearMonth } from "@/content/schema";
import { site } from "@/content/site";
import { skills } from "@/content/skills";
import { timeline } from "@/content/timeline";
import { writing } from "@/content/writing";

export const API_VERSION = "v1";
export const API_BASE = `/api/${API_VERSION}`;

export type Links = Record<string, string>;
export type Envelope<T> = { data: T; links: Links };

export const endpoints = {
  index: `${API_BASE}/index.json`,
  profile: `${API_BASE}/profile.json`,
  caseStudies: `${API_BASE}/case-studies.json`,
  caseStudy: (slug: string) => `${API_BASE}/case-studies/${slug}.json`,
  timeline: `${API_BASE}/timeline.json`,
  skills: `${API_BASE}/skills.json`,
  writing: `${API_BASE}/writing.json`,
  openapi: "/api/openapi.json",
} as const;

function yearMonth(value?: YearMonth): string | null {
  return value ? `${value.year}-${String(value.month).padStart(2, "0")}` : null;
}

function section(value: Section) {
  return { heading: value.heading, paragraphs: value.paragraphs ?? [], points: value.points ?? [] };
}

/* ------------------------------------------------------------------ Builders */

export function indexResponse(): Envelope<{ name: string; description: string; version: string }> {
  return {
    data: {
      name: `${site.name}, portfolio API`,
      description:
        "Read-only JSON for everything on this site, generated from the same typed content as the pages.",
      version: API_VERSION,
    },
    links: {
      self: endpoints.index,
      profile: endpoints.profile,
      caseStudies: endpoints.caseStudies,
      timeline: endpoints.timeline,
      skills: endpoints.skills,
      writing: endpoints.writing,
      openapi: endpoints.openapi,
      html: "/api/",
    },
  };
}

export function profileResponse() {
  return {
    data: {
      name: site.name,
      role: site.role,
      headline: profile.hero.headline,
      summary: profile.hero.summary,
      location: profile.location,
      rightToWork: profile.rightToWork,
      availability: profile.availability,
      workingArrangements: profile.workingArrangements,
      contact: {
        email: site.contact.email,
        links: site.contact.links.map((link) => ({ label: link.label, href: link.href })),
      },
      education: profile.education,
      certifications: profile.certifications.map((item) => ({ title: item.title, note: item.note ?? null })),
      languages: profile.languages,
    },
    links: { self: endpoints.profile, html: "/about/", index: endpoints.index },
  };
}

function caseStudySummary(study: CaseStudy) {
  return {
    slug: study.slug,
    title: study.title,
    summary: study.summary,
    role: study.role,
    context: study.context,
    period: study.period,
    status: { code: study.status.tone, label: study.status.label },
    tech: study.tech,
    links: { self: endpoints.caseStudy(study.slug), html: `/work/${study.slug}/` },
  };
}

export function caseStudiesResponse() {
  return {
    data: caseStudies.map(caseStudySummary),
    links: { self: endpoints.caseStudies, html: "/work/", index: endpoints.index },
  };
}

export function caseStudyResponse(study: CaseStudy) {
  const { links, ...summary } = caseStudySummary(study);
  return {
    data: {
      ...summary,
      externalLinks: study.links.map((link) => ({ label: link.label, href: link.href })),
      diagram: study.diagram ? { href: study.diagram.src, description: study.diagram.description } : null,
      problem: section(study.problem),
      whatIDid: study.whatIDid.map(section),
      outcome: section(study.outcome),
      honestStatus: section(study.honestStatus),
      next: study.next ? section(study.next) : null,
    },
    links: { ...links, collection: endpoints.caseStudies },
  };
}

function timelineEntry(entry: TimelineEntry) {
  return {
    organisation: entry.organisation,
    role: entry.role,
    kind: entry.kind,
    start: yearMonth(entry.start),
    end: yearMonth(entry.end),
    current: !entry.end,
    summary: entry.summary,
    caseStudy: entry.caseStudy ?? null,
  };
}

export function timelineResponse() {
  return {
    data: timeline.map(timelineEntry),
    links: { self: endpoints.timeline, html: "/about/#career", index: endpoints.index },
  };
}

export function skillsResponse() {
  return {
    data: skills.map((group) => ({
      name: group.name,
      items: group.items,
      evidence: group.evidence.map((link) => ({ label: link.label, href: link.href })),
    })),
    links: { self: endpoints.skills, html: "/about/#skills", index: endpoints.index },
  };
}

export function writingResponse() {
  return {
    data: {
      articles: writing.articles.map((article) => ({
        title: article.title,
        summary: article.summary,
        platform: article.platform,
        href: article.href ?? null,
      })),
      openSource: writing.openSource,
    },
    links: { self: endpoints.writing, html: "/writing/", index: endpoints.index },
  };
}

/** Pretty-printed JSON response, as a static file in the export. */
export function json(body: unknown): Response {
  return new Response(`${JSON.stringify(body, null, 2)}\n`, {
    headers: { "Content-Type": "application/json; charset=utf-8" },
  });
}
