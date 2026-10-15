/**
 * OpenAPI 3.1 description of the public JSON API in `publicApi.ts`.
 * Objects are closed (additionalProperties: false), so any drift between the data and this
 * contract fails `npm run check:api` after the build.
 */
import { caseStudies } from "@/content/caseStudies";
import { site } from "@/content/site";
import { API_BASE, API_VERSION } from "./publicApi";

type Schema = Record<string, unknown>;

const ref = (name: string): Schema => ({ $ref: `#/components/schemas/${name}` });
const str: Schema = { type: "string" };
const strList: Schema = { type: "array", items: str };
const nullableStr: Schema = { type: ["string", "null"] };

function object(properties: Record<string, Schema>, optional: string[] = []): Schema {
  return {
    type: "object",
    additionalProperties: false,
    required: Object.keys(properties).filter((key) => !optional.includes(key)),
    properties,
  };
}

function envelope(data: Schema): Schema {
  return object({ data, links: ref("Links") });
}

const schemas: Record<string, Schema> = {
  Links: {
    type: "object",
    description: "Related resources. `self` is this response; `html` is the matching page.",
    properties: { self: str, html: str },
    additionalProperties: str,
    required: ["self"],
  },
  Link: object({ label: str, href: str }),
  Section: object({ heading: str, paragraphs: strList, points: strList }),
  Status: object({
    code: { type: "string", enum: ["live", "production", "prototype", "complete", "notLaunched"] },
    label: str,
  }),
  Index: object({ name: str, description: str, version: { type: "string", const: API_VERSION } }),
  Profile: object({
    name: str,
    role: str,
    headline: str,
    summary: str,
    location: str,
    rightToWork: str,
    availability: str,
    workingArrangements: strList,
    contact: object({ email: { type: "string", format: "email" }, links: { type: "array", items: ref("Link") } }),
    education: { type: "array", items: object({ title: str, institution: str, period: str }) },
    certifications: { type: "array", items: object({ title: str, note: nullableStr }) },
    languages: strList,
  }),
  CaseStudySummary: object({
    slug: str,
    title: str,
    summary: str,
    role: str,
    context: str,
    period: str,
    status: ref("Status"),
    tech: strList,
    links: ref("Links"),
  }),
  CaseStudy: object({
    slug: str,
    title: str,
    summary: str,
    role: str,
    context: str,
    period: str,
    status: ref("Status"),
    tech: strList,
    externalLinks: { type: "array", items: ref("Link") },
    diagram: { oneOf: [{ type: "null" }, object({ href: str, description: str })] },
    problem: ref("Section"),
    whatIDid: { type: "array", items: ref("Section") },
    outcome: ref("Section"),
    honestStatus: ref("Section"),
    next: { oneOf: [{ type: "null" }, ref("Section")] },
  }),
  TimelineEntry: object({
    organisation: str,
    role: str,
    kind: { type: "string", enum: ["employment", "company", "freelance"] },
    start: { type: "string", pattern: "^\\d{4}-\\d{2}$" },
    end: { type: ["string", "null"], pattern: "^\\d{4}-\\d{2}$" },
    current: { type: "boolean" },
    summary: str,
    caseStudy: nullableStr,
  }),
  SkillGroup: object({ name: str, items: strList, evidence: { type: "array", items: ref("Link") } }),
  Writing: object({
    articles: {
      type: "array",
      items: object({ title: str, summary: str, platform: str, href: nullableStr }),
    },
    openSource: { type: "array", items: object({ title: str, project: str, summary: str, href: str }) },
  }),
};

type Operation = { path: string; operationId: string; summary: string; description: string; schema: Schema };

/** One entry per endpoint, in the order the explorer shows them. */
export const operations: Operation[] = [
  {
    path: `${API_BASE}/index.json`,
    operationId: "getIndex",
    summary: "API index",
    description: "Entry point. Links to every other resource.",
    schema: envelope(ref("Index")),
  },
  {
    path: `${API_BASE}/profile.json`,
    operationId: "getProfile",
    summary: "Profile",
    description: "Who I am, where I'm based, right to work, availability and how to reach me.",
    schema: envelope(ref("Profile")),
  },
  {
    path: `${API_BASE}/case-studies.json`,
    operationId: "listCaseStudies",
    summary: "Case studies",
    description: "Summaries of every case study, in the order the Work page shows them.",
    schema: envelope({ type: "array", items: ref("CaseStudySummary") }),
  },
  {
    path: `${API_BASE}/case-studies/{slug}.json`,
    operationId: "getCaseStudy",
    summary: "One case study",
    description: "The full write-up: problem, what I did, outcome and honest status.",
    schema: envelope(ref("CaseStudy")),
  },
  {
    path: `${API_BASE}/timeline.json`,
    operationId: "getTimeline",
    summary: "Career timeline",
    description: "Roles with start and end months (YYYY-MM). Current roles have a null end.",
    schema: envelope({ type: "array", items: ref("TimelineEntry") }),
  },
  {
    path: `${API_BASE}/skills.json`,
    operationId: "getSkills",
    summary: "Skills, with evidence",
    description: "Skill groups, each linking to the work where the skill was used.",
    schema: envelope({ type: "array", items: ref("SkillGroup") }),
  },
  {
    path: `${API_BASE}/writing.json`,
    operationId: "getWriting",
    summary: "Writing and open source",
    description: "Articles and merged open-source contributions.",
    schema: envelope(ref("Writing")),
  },
];

export const caseStudySlugs = caseStudies.map((study) => study.slug);

export function openApiDocument() {
  return {
    openapi: "3.1.0",
    info: {
      title: `${site.name}, portfolio API`,
      version: API_VERSION,
      summary: "Read-only JSON for everything on this site.",
      description:
        "Static JSON generated at build time from the same typed content as the pages. No authentication, no cookies, no tracking. Every response is validated against this document in CI.",
      contact: { name: site.name, email: site.contact.email },
    },
    servers: site.url ? [{ url: site.url }] : [{ url: "/" }],
    paths: Object.fromEntries(
      operations.map((op) => [
        op.path,
        {
          get: {
            operationId: op.operationId,
            summary: op.summary,
            description: op.description,
            ...(op.path.includes("{slug}")
              ? {
                  parameters: [
                    {
                      name: "slug",
                      in: "path",
                      required: true,
                      schema: { type: "string", enum: caseStudySlugs },
                    },
                  ],
                }
              : {}),
            responses: {
              "200": {
                description: "OK",
                content: { "application/json": { schema: op.schema } },
              },
            },
          },
        },
      ]),
    ),
    components: { schemas },
  };
}
