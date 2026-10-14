import type { CaseStudy } from "../schema";

export const stringline: CaseStudy = {
  slug: "stringline",
  title: "Stringline",
  summary:
    "A six-step multi-agent pipeline on the Claude API that automates a construction company's month-end finance close, with every step scored for confidence. Phase 0 proof of concept, public on GitHub.",
  role: "Sole engineer",
  context: "Yug Solutions Ltd, public project",
  period: "June 2026",
  status: { tone: "prototype", label: "Phase 0 proof of concept" },
  featured: true,
  order: 3,
  tech: ["Python", "Claude API", "Dynamics 365 Business Central (OData)"],
  links: [
    { label: "Code on GitHub", href: "https://github.com/Virendra-Vyas/stringline-pipeline" },
  ],
  problem: {
    heading: "Problem",
    paragraphs: [
      "A month-end finance close means pulling ledger data out of the accounting system, classifying it, reconciling the bank, spotting anything unusual and writing commentary a reviewer can act on. Handing it to a language model is only useful if you can tell which parts of the output to trust.",
    ],
  },
  whatIDid: [
    {
      heading: "Six steps, each with one job",
      points: [
        "Ingestion from Dynamics 365 Business Central over OData.",
        "Classification.",
        "Bank reconciliation.",
        "Anomaly detection.",
        "Plain-English commentary.",
        "Sector intelligence through web search.",
      ],
    },
    {
      heading: "Hybrid confidence scoring",
      paragraphs: [
        "Steps with a measurable answer get a deterministic confidence score. Narrative steps get a Claude self-assessment. The output is evaluated rather than trusted.",
      ],
    },
    {
      heading: "Output people already use",
      paragraphs: [
        "The pipeline produces a branded Word month-end pack (.docx) and an Excel reviewer checklist for SharePoint.",
      ],
    },
  ],
  outcome: {
    heading: "Outcome",
    points: [
      "A working six-step pipeline from ledger data to a reviewable month-end pack.",
      "A confidence score on every step.",
      "Code published on GitHub.",
    ],
  },
  honestStatus: {
    heading: "Honest status",
    paragraphs: ["Stringline is a Phase 0 proof of concept, built in June 2026."],
  },
};
