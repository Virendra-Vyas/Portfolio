import type { CaseStudy } from "../schema";

export const connectResearch: CaseStudy = {
  slug: "connectresearch",
  title: "ConnectResearch",
  summary:
    "Tech Lead on a multi-tenant B2B marketplace connecting researchers with domain-expert consultants: event-driven backend on Azure Service Bus, a rules-driven financial engine, Stripe milestone payments and embedding-based matching.",
  role: "Tech Lead",
  context: "Client work through Yug Solutions Ltd",
  period: "July 2025 to December 2025",
  status: { tone: "complete", label: "Engagement complete" },
  featured: false,
  order: 4,
  tech: [
    ".NET 7 and 8",
    "ASP.NET Core",
    "EF Core",
    "SQL Server",
    "PostgreSQL",
    "Azure Service Bus",
    "Stripe",
    "SignalR",
    "OpenAI embeddings",
    "Docker",
    "GitHub Actions",
    "Next.js",
    "TypeScript",
  ],
  links: [],
  problem: {
    heading: "Problem",
    paragraphs: [
      "A multi-tenant B2B marketplace that connects researchers with domain-expert consultants has to move money between several parties, handle disputes, and match people well. Each of those has to be reliable from day one.",
    ],
  },
  whatIDid: [
    {
      heading: "Event-driven from the first sprint",
      paragraphs: [
        "I built the backend on Azure Service Bus Topics (publish/subscribe), with message idempotency and dead-letter handling built in from the first sprint.",
      ],
    },
    {
      heading: "A rules-driven financial engine",
      points: [
        "Fee distribution and commission structures.",
        "Tax calculation.",
        "Promotional discount rules.",
        "Dispute-resolution workflows.",
      ],
    },
    {
      heading: "Payments, messaging and matching",
      points: [
        "Escrow-style milestone payments through Stripe.",
        "Real-time messaging with SignalR.",
        "Consultant matching based on OpenAI embeddings, shipped as a production feature.",
        "A Next.js and TypeScript front end.",
      ],
    },
    {
      heading: "Observability",
      paragraphs: [
        "I tuned the Application Insights telemetry, cutting monitoring cost by about 40 percent.",
      ],
    },
  ],
  outcome: {
    heading: "Outcome",
    points: [
      "Event-driven backend with idempotency and dead-letter handling from the start.",
      "Embedding-based consultant matching in production.",
      "Monitoring cost down about 40 percent.",
    ],
  },
  honestStatus: {
    heading: "Status",
    paragraphs: [
      "I worked on ConnectResearch as Tech Lead from July to December 2025, through Yug Solutions.",
    ],
  },
};
