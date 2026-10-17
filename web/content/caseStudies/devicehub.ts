import type { CaseStudy } from "../schema";

export const devicehub: CaseStudy = {
  slug: "devicehub",
  icon: "router",
  title: "DeviceHub",
  summary:
    "Leading a team of five on an IoT device management and access-control platform: role-based access control, real-time messaging, field hardware, security fixes and a zero-incident .NET 7 to .NET 10 migration.",
  role: "Lead Software Engineer, leading five engineers",
  context: "Datascope Systems Ltd, employed",
  period: "August 2022 to present",
  status: { tone: "production", label: "In production" },
  featured: true,
  order: 2,
  tech: [
    "C#",
    ".NET 8 and 10",
    "ASP.NET Core",
    "EF Core",
    "React",
    "TypeScript",
    "Azure",
    "Azure Service Bus",
    "NATS",
    "Docker",
    "balena",
    "Terraform",
    "xUnit",
    "Moq",
  ],
  links: [],
  diagram: {
    src: "/diagrams/devicehub.svg",
    width: 960,
    height: 400,
    description:
      "Requests flow from the React app to the backend-for-frontend, then to the core API, then to the database. The React app has an AuthContext with a can() helper that drives permission-driven UI. The backend-for-frontend and the core API both enforce permissions, using JWT bearer authentication and a dedicated authorisation library. Roles and permissions live in the database and are managed through EF Core migrations.",
  },
  problem: {
    heading: "Context",
    paragraphs: [
      "DeviceHub is an IoT device management and access-control platform. It runs live, with devices in the field. I lead a team of five engineers on it and own delivery end to end, from breaking down requirements through to release and production support.",
      "This is employed work, so I describe it in general terms: no customer names, internal systems or code.",
    ],
  },
  whatIDid: [
    {
      heading: "Role-based access control",
      paragraphs: [
        "I designed and built a full role-based access control system, enforced on both the server and the client.",
      ],
      points: [
        "JWT bearer authentication.",
        "A dedicated authorisation library.",
        "Roles and permissions stored in the database and managed through EF Core migrations.",
        "Enforcement in both the backend-for-frontend and the core API.",
        "A React AuthContext with a can() helper, so the UI shows only what a user is allowed to do.",
      ],
    },
    {
      heading: "Real-time and event-driven messaging",
      paragraphs: [
        "For real-time device communication I evaluated NATS against MQTT, WebSocket and server-sent events. I chose NATS and built a .NET publisher to React receiver proof of concept, including reconnection handling.",
        "I have also built event-driven processing on Azure Service Bus with idempotent message handling, dead-letter handling and retry policies.",
      ],
    },
    {
      heading: "Field hardware",
      points: [
        "Got an access-control kiosk display running on Raspberry Pi devices in the field, deployed as containers through balena, which I built.",
        "Diagnosed GPU driver, display configuration and framebuffer faults on those devices.",
        "Solved a network isolation problem by moving device messaging onto the device itself.",
        "Replaced manual display configuration on each device with fleet-level deployment settings.",
      ],
    },
    {
      heading: "Security",
      paragraphs: [
        "I found and fixed four critical vulnerabilities in the live system before any of them were exploited. They covered authentication, tenant isolation, a race condition, and a permission check that failed open, which I changed to default-deny.",
      ],
    },
    {
      heading: "Zero-incident .NET 7 to .NET 10 migration",
      paragraphs: [
        "I led the migration of the live platform from .NET 7 to .NET 10 through staged, test-driven delivery rather than a single rewrite. It went out with zero incidents.",
      ],
      points: [
        "Handled the breaking changes in Ardalis.Specification v9.",
        "Removed sync-over-async anti-patterns.",
        "Cleaned up duplicate dependency injection registrations.",
        "Centralised shared build settings in Directory.Build.props.",
      ],
    },
    {
      heading: "People and process",
      points: [
        "Own code review and engineering standards for the team, with sprint-level architecture reviews.",
        "Built an xUnit and Moq testing culture and introduced CI/CD.",
        "Mentored two engineers from mid-level to senior level.",
        "Work directly with business stakeholders to turn requirements into estimated work.",
        "Use Claude Code daily, and introduced it across the team, including AI-assisted code review.",
      ],
    },
  ],
  outcome: {
    heading: "Outcome",
    points: [
      "Test coverage from roughly 40 to 85 percent in two sprints.",
      "Regression defects down about 35 percent after introducing CI/CD.",
      "Releases moved from weekly to daily.",
      "A zero-incident migration from .NET 7 to .NET 10.",
      "Four critical vulnerabilities fixed before exploitation.",
    ],
  },
  honestStatus: {
    heading: "Status",
    paragraphs: ["DeviceHub is in production and in active development. I still lead the team."],
  },
};
