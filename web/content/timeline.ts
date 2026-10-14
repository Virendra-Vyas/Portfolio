import type { TimelineEntry } from "./schema";

/** Newest first. Dates and titles must match the CV and LinkedIn exactly. */
export const timeline: TimelineEntry[] = [
  {
    organisation: "Yug Solutions Ltd",
    role: "Founder and Principal Engineer",
    start: { year: 2024, month: 11 },
    kind: "company",
    summary:
      "A bootstrapped UK software company I founded and direct. I build products through it, including GovBridge UK, and take on contract work.",
    caseStudy: "/work/govbridge/",
  },
  {
    organisation: "IntelliBooks (freelance, through Yug Solutions)",
    role: "Lead Engineer and Sole Architect",
    start: { year: 2025, month: 7 },
    end: { year: 2026, month: 2 },
    kind: "freelance",
    summary:
      "A greenfield accounting and tax application for a regulated domain, built as the sole engineer, with HMRC integrations tested against the HMRC sandbox.",
    caseStudy: "/work/intellibooks/",
  },
  {
    organisation: "ConnectResearch (freelance, through Yug Solutions)",
    role: "Tech Lead",
    start: { year: 2025, month: 7 },
    end: { year: 2025, month: 12 },
    kind: "freelance",
    summary:
      "A multi-tenant B2B marketplace with an event-driven backend on Azure Service Bus, Stripe milestone payments and a rules-driven financial calculation engine.",
    caseStudy: "/work/connectresearch/",
  },
  {
    organisation: "Datascope Systems Ltd",
    role: "Lead Software Engineer",
    start: { year: 2022, month: 8 },
    kind: "employment",
    summary:
      "I lead a team of five engineers on DeviceHub, an IoT device management and access-control platform, and own delivery end to end.",
    caseStudy: "/work/devicehub/",
  },
  {
    organisation: "Mondaq Ltd",
    role: "Full Stack .NET Developer",
    start: { year: 2022, month: 2 },
    end: { year: 2022, month: 8 },
    kind: "employment",
    summary:
      "Backend and front-end features on a high-traffic, global B2B legal content platform. Improved API performance by about 18 percent through query refactoring.",
  },
  {
    organisation: "Goodmaysys Software Technologies",
    role: "Software Developer",
    start: { year: 2019, month: 10 },
    end: { year: 2022, month: 1 },
    kind: "employment",
    summary:
      "Built and maintained GSLFx, a live money-transfer platform, including real-time status updates, Cosmos DB data modelling, reporting, and HMRC and DVLA integrations.",
  },
  {
    organisation: "Whizability",
    role: "Web Developer",
    start: { year: 2018, month: 2 },
    end: { year: 2018, month: 8 },
    kind: "employment",
    summary: "Web applications and internal tooling for small business clients in ASP.NET, C# and JavaScript.",
  },
  {
    organisation: "MG Infosoft",
    role: "Junior Software Engineer",
    start: { year: 2017, month: 1 },
    end: { year: 2018, month: 1 },
    kind: "employment",
    summary: "Commercial web application features with REST API integration, before postgraduate study in the UK.",
  },
];
