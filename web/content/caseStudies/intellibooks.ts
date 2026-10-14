import type { CaseStudy } from "../schema";

export const intellibooks: CaseStudy = {
  slug: "intellibooks",
  title: "IntelliBooks",
  summary:
    "A greenfield accounting and tax application for a regulated domain, built as sole engineer and architect, with HMRC integrations under OAuth 2.0 tested against the HMRC sandbox. Not currently commercially launched.",
  role: "Lead Engineer and Sole Architect",
  context: "Freelance, through Yug Solutions Ltd",
  period: "July 2025 to February 2026",
  status: { tone: "notLaunched", label: "Not currently commercially launched" },
  featured: false,
  order: 5,
  tech: [
    ".NET 7 and 8",
    "ASP.NET Core",
    "EF Core",
    "PostgreSQL",
    "SQL Server",
    "OAuth 2.0",
    "OpenID Connect",
    "JWT",
    "AWS",
    "Next.js",
    "TypeScript",
  ],
  links: [],
  problem: {
    heading: "Problem",
    paragraphs: [
      "Accounting and tax software sits in a regulated domain. Calculations have to be right and traceable, and submissions to HMRC have to go through properly authorised flows. I built IntelliBooks from nothing as the only engineer, so every one of those decisions was mine.",
    ],
  },
  whatIDid: [
    {
      heading: "HMRC integrations",
      paragraphs: ["All under OAuth 2.0 and OpenID Connect, tested against the HMRC sandbox:"],
      points: [
        "VAT, including automated VAT return submission.",
        "Self Assessment.",
        "National Insurance.",
        "Customs data.",
      ],
    },
    {
      heading: "Calculations and data",
      points: [
        "Rules-based calculation processing with full audit trails.",
        "A PostgreSQL schema designed for regulatory data.",
      ],
    },
    {
      heading: "Architecture and cloud",
      paragraphs: [
        "I owned architecture and technology choices end to end: an ASP.NET Core backend, a Next.js front end using React Server Components and server-side rendering, TypeScript throughout, and the AWS services for hosting and data storage.",
      ],
    },
    {
      heading: "Built with Claude Code",
      paragraphs: [
        "I used Claude Code throughout for scaffolding, tests, migrations and documentation. I kept ownership of the business logic.",
      ],
    },
  ],
  outcome: {
    heading: "Outcome",
    points: [
      "HMRC VAT, Self Assessment, National Insurance and Customs integrations working against the HMRC sandbox.",
      "Automated VAT return submission.",
      "Calculation processing with full audit trails.",
    ],
  },
  honestStatus: {
    heading: "Honest status",
    paragraphs: ["IntelliBooks is not currently commercially launched."],
  },
};
