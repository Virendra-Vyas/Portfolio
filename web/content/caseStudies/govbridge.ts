import type { CaseStudy } from "../schema";

export const govbridge: CaseStudy = {
  slug: "govbridge",
  icon: "landmark",
  title: "GovBridge UK",
  summary:
    "A unified API gateway that puts HMRC Making Tax Digital, Companies House, DVLA, Land Registry and FHRS behind one consistent contract. Live, early-stage and in active development.",
  role: "Founder and sole engineer",
  context: "Yug Solutions Ltd, own product",
  period: "In active development",
  status: { tone: "live", label: "Live, early-stage" },
  featured: true,
  order: 1,
  tech: [
    "ASP.NET Core",
    "C#",
    "React",
    "PostgreSQL (Supabase)",
    "Redis (Upstash)",
    "OVHcloud",
    "Cloudflare",
    "Python",
  ],
  links: [
    { label: "govbridge.co.uk", href: "https://www.govbridge.co.uk" },
    { label: "api.govbridge.co.uk", href: "https://api.govbridge.co.uk" },
    { label: "Service status", href: "https://www.govbridge.co.uk/status" },
  ],
  diagram: {
    src: "/diagrams/govbridge.svg",
    width: 960,
    height: 680,
    description:
      "Three kinds of client call the GovBridge API: developers' applications over REST with an API key, the React developer portal on Cloudflare, and AI clients (a Python tool-calling agent and an MCP server). The API is an ASP.NET Core service on OVHcloud in London, behind Cloudflare, exposing one consistent contract over 40+ endpoints. Inside it: rate limiting per API key, encrypted OAuth token storage, HMRC fraud prevention headers, log redaction of NINO, UTR and VRN, a SandboxOnly guard attribute and explicit \"HMRC not connected\" errors. It uses PostgreSQL on Supabase and Redis on Upstash, and calls six UK government services: HMRC Making Tax Digital (VAT, Income Tax, PAYE, CIS, Savings Income), HMRC GovTalk for Corporation Tax CT600 returns with an IRmark, Companies House, DVLA, Land Registry and the Food Hygiene Rating Scheme.",
  },
  problem: {
    heading: "Problem",
    paragraphs: [
      "UK government APIs are fragmented. HMRC Making Tax Digital, Companies House, DVLA, Land Registry and the Food Hygiene Rating Scheme each have their own authentication, their own quirks and their own sandbox rules. Anyone building tax or business software has to learn and maintain every one of them separately.",
      "Developers who have seen GovBridge have told me that integrating 50+ fragmented endpoints is a real, recurring pain. That is qualitative feedback, not a sales claim, but it is the problem I set out to remove.",
    ],
  },
  whatIDid: [
    {
      heading: "One contract over many government APIs",
      paragraphs: [
        "I built a single gateway that started with VAT only and has grown to 40+ endpoints, all behind one consistent contract.",
      ],
      points: [
        "HMRC Making Tax Digital: VAT, Income Tax, PAYE, CIS Deductions and Savings Income",
        "HMRC Corporation Tax: CT600 returns through GovTalk",
        "Companies House",
        "DVLA",
        "Land Registry",
        "Food Hygiene Rating Scheme (FHRS)",
      ],
    },
    {
      heading: "The hard part: Corporation Tax",
      paragraphs: [
        "Corporation Tax works differently from the rest of the gateway: a CT600 return is submitted through GovTalk and has to carry an IRmark. I got this working end to end, and a submission was accepted by HMRC's real Transaction Engine.",
      ],
    },
    {
      heading: "Security",
      points: [
        "Encrypted OAuth token storage.",
        "HMRC fraud prevention headers.",
        "API keys stored only as a hash, revocable at any time, with rate limiting partitioned by key.",
        "National Insurance numbers, UTRs and VAT registration numbers masked in the API's logs.",
        "A SandboxOnly guard attribute for operations that must only run against the HMRC sandbox.",
        "Explicit \"HMRC not connected\" error handling.",
        "Administration only through an approved Google account with 2-Step Verification. The service runs in a locked-down container without administrator rights.",
        "Every change is scanned for known vulnerabilities and leaked secrets across code, dependencies and container images.",
      ],
    },
    {
      heading: "Backups and recovery",
      paragraphs: [
        "Encrypted database backups run every four hours, with an alert if one is missed, and are kept off-site. I rehearsed full restores on 4 and 9 October 2026 rather than assume the backups work.",
      ],
    },
    {
      heading: "Developer experience",
      paragraphs: [
        "A React developer portal groups the tools by category and shows a live HMRC status banner.",
      ],
    },
    {
      heading: "AI on top of the gateway",
      paragraphs: [
        "I built a Python tool-calling agent that works through the gateway, with an evaluation harness and a golden dataset so its answers are measured rather than assumed. I have also built a Model Context Protocol (MCP) server for the platform.",
      ],
    },
    {
      heading: "How I run the project",
      paragraphs: [
        "I run a self-hosted coding agent (OpenClaw, under WSL) against the repository. A daily scheduled automation reviews the codebase and proposes the next feature or fix to me on WhatsApp. Nothing is implemented until I approve it.",
      ],
    },
    {
      heading: "Architecture and hosting",
      paragraphs: [
        "The API is an ASP.NET Core solution split into Api, Core and Data projects. It runs on an OVHcloud server in London behind Cloudflare, with PostgreSQL on Supabase and Redis on Upstash, both in their London regions. It previously ran on Render in Frankfurt. The developer portal is a React app on Cloudflare.",
      ],
    },
  ],
  outcome: {
    heading: "Outcome",
    points: [
      "Live at api.govbridge.co.uk with 40+ endpoints behind one contract.",
      "Corporation Tax (CT600) submission accepted by HMRC's real Transaction Engine.",
      "A tool-calling agent with an evaluation harness, and an MCP server, built on the same gateway.",
    ],
  },
  honestStatus: {
    heading: "Honest status",
    paragraphs: [
      "GovBridge is early-stage. It is live and in active development, and I am validating it with Making Tax Digital software vendors. It has no paying customers yet.",
    ],
  },
  next: {
    heading: "On the roadmap",
    points: [
      "Verify & Enrich: Companies House identity verification status under ECCTA, plus company enrichment, for KYB checks.",
      "A year-end Making Tax Digital Income Tax return engine for software vendors.",
      "Stripe self-serve checkout.",
      "A signed data protection impact assessment and an independent penetration test, both before any live HMRC filing.",
    ],
  },
};
