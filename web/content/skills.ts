import type { SkillGroup } from "./schema";

/** Each group links to where the skill was used, so a reader can check it. */
export const skills: SkillGroup[] = [
  {
    name: "C# and .NET (about 9 years)",
    items: [
      ".NET 7, 8 and 10",
      "ASP.NET Core",
      "EF Core",
      "ASP.NET MVC and WCF (legacy)",
      "REST API design",
      "SignalR",
      "Background services",
      "Clean architecture and SOLID",
    ],
    evidence: [
      { label: "DeviceHub", href: "/work/devicehub/" },
      { label: "GovBridge UK", href: "/work/govbridge/" },
    ],
  },
  {
    name: "Front end",
    items: [
      "React (about 7 years)",
      "TypeScript (4 years)",
      "JavaScript",
      "Next.js (about 1.8 years)",
      "Vite",
    ],
    evidence: [
      { label: "DeviceHub", href: "/work/devicehub/" },
      { label: "IntelliBooks", href: "/work/intellibooks/" },
    ],
  },
  {
    name: "Data",
    items: [
      "SQL Server",
      "PostgreSQL, including pgvector",
      "Cosmos DB (data modelling and partition key design)",
      "Redis",
      "SSIS",
      "SSRS",
    ],
    evidence: [
      { label: "GovBridge UK", href: "/work/govbridge/" },
      { label: "GSLFx", href: "/work/#further-work" },
    ],
  },
  {
    name: "Cloud and delivery",
    items: [
      "Azure: Functions, Service Bus, App Service, Key Vault, Application Insights, DevOps",
      "Docker",
      "balena",
      "Terraform",
      "GitHub Actions",
      "CI/CD (5 years)",
      "Cloudflare Pages, Render, Vercel",
      "AWS at architecture and service-selection level",
    ],
    evidence: [
      { label: "DeviceHub", href: "/work/devicehub/" },
      { label: "Research marketplace", href: "/work/research-marketplace/" },
    ],
  },
  {
    name: "Testing",
    items: ["xUnit", "Moq", "Integration testing", "Test-driven delivery"],
    evidence: [{ label: "DeviceHub", href: "/work/devicehub/" }],
  },
  {
    name: "Security",
    items: [
      "OAuth 2.0",
      "OpenID Connect",
      "JWT",
      "Role-based access control",
      "GDPR-compliant audit logging",
      "OWASP ASVS",
    ],
    evidence: [
      { label: "DeviceHub", href: "/work/devicehub/" },
      { label: "GovBridge UK", href: "/work/govbridge/" },
    ],
  },
  {
    name: "AI engineering",
    items: [
      "Claude API",
      "Claude Code",
      "Tool-calling agents",
      "MCP server",
      "Multi-agent pipelines",
      "Evaluation harnesses",
      "OpenAI embeddings",
      "pgvector semantic search",
    ],
    evidence: [
      { label: "Stringline", href: "/work/stringline/" },
      { label: "How I work with AI", href: "/ai/" },
    ],
  },
  {
    name: "Python (secondary language)",
    items: ["AI pipelines and agents", "Scraping", "Data processing and reporting"],
    evidence: [
      { label: "Stringline", href: "/work/stringline/" },
      { label: "GovBridge UK", href: "/work/govbridge/" },
    ],
  },
  {
    name: "Integrations",
    items: [
      "HMRC Making Tax Digital: VAT, Income Tax, PAYE, CIS, Corporation Tax (GovTalk), National Insurance, Customs",
      "Companies House",
      "DVLA",
      "Land Registry",
      "Stripe",
      "Dynamics 365 Business Central (OData)",
      "Power Platform connectors",
    ],
    evidence: [
      { label: "GovBridge UK", href: "/work/govbridge/" },
      { label: "IntelliBooks", href: "/work/intellibooks/" },
    ],
  },
  {
    name: "Leadership",
    items: [
      "Leading a team of five",
      "Mentoring",
      "Code review",
      "Engineering standards",
      "Stakeholder communication",
    ],
    evidence: [{ label: "DeviceHub", href: "/work/devicehub/" }],
  },
];
