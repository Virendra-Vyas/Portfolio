import type { ProjectCard } from "./schema";

/** Shorter cards under the case studies on the Work page. */
export const projects: ProjectCard[] = [
  {
    title: "GSLFx money-transfer platform",
    context: "Goodmaysys Software Technologies, Software Developer",
    period: "October 2019 to January 2022",
    summary: "Built and maintained GSLFx, a live money-transfer platform.",
    points: [
      "Real-time transaction status updates with SignalR.",
      "Made the Cosmos DB partition key and data model decisions for high-throughput transaction data alongside SQL Server.",
      "SSIS packages for data movement and SSRS for financial reporting.",
      "HMRC (VAT, Self Assessment, National Insurance and Customs) and DVLA integrations under OAuth 2.0, with audit logging.",
      "Stripe integration.",
      "Mentored two junior developers. Regression bugs fell by about 20 percent through stricter code review.",
    ],
    tech: [
      "C#",
      ".NET Framework",
      "ASP.NET MVC",
      "WCF",
      "SQL Server",
      "SignalR",
      "Cosmos DB",
      "SSIS",
      "SSRS",
      "Stripe",
      "React",
    ],
    links: [],
  },
  {
    title: "B2B legal content platform",
    context: "Mondaq Ltd, Full Stack .NET Developer",
    period: "February 2022 to August 2022",
    summary: "Backend and front-end features on a high-traffic, global B2B legal content platform.",
    points: [
      "ASP.NET Core APIs and React features.",
      "SQL Server stored procedures and EF Core.",
      "Improved API performance by about 18 percent through query refactoring.",
    ],
    tech: ["ASP.NET Core", "C#", "React", "SQL Server", "EF Core"],
    links: [],
  },
  {
    title: "Power Platform integration",
    context: "Freelance",
    summary:
      "C# and .NET Web APIs and custom connectors feeding Power Automate flows, with Power Apps and Copilot Studio front ends.",
    points: [
      "The .NET integration side, the Web APIs and custom connectors, was where I did most of the work.",
    ],
    tech: ["C#", ".NET", "Power Automate", "Power Apps", "Copilot Studio"],
    links: [],
  },
  {
    title: "Yug Solutions websites",
    context: "Yug Solutions Ltd",
    summary:
      "The company site, plus a live service site for local Eastbourne businesses covering web, systems, and AI and automation work.",
    points: [
      "Both sites run from one React 19 and Vite project on Vercel, with hostname-based rendering choosing which site to serve.",
    ],
    tech: ["React 19", "Vite", "Vercel"],
    links: [
      { label: "yugsolutions.co.uk", href: "https://yugsolutions.co.uk" },
      { label: "local.yugsolutions.co.uk", href: "https://local.yugsolutions.co.uk" },
    ],
  },
];
