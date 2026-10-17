import type { HomePage } from "./schema";
import { cv } from "./cv";
import { site } from "./site";

/** Section headings and calls to action for the home page. The body content comes from the other content files. */
export const home: HomePage = {
  trace: {
    heading: "Career trace",
    caption:
      "Every role since 2017 on one time axis, laid out like a request trace. Where spans overlap, the work ran at the same time. Select a role for the details.",
    legendLabel: "Kind of engagement",
    gapNote: "Between roles: MSc in Computing at De Montfort University",
    periodLabel: "When",
    durationLabel: "Length",
    soFar: "so far",
    caseStudyLink: "Read the case study",
  },
  outcomes: {
    heading: "Measured, before and after",
    intro: "From leading the DeviceHub team at Datascope Systems, through a staged move from .NET 7 to .NET 10.",
    link: { label: "DeviceHub case study", href: "/work/devicehub/" },
    items: [
      {
        label: "Automated test coverage",
        icon: "flask",
        before: "Roughly 40%",
        after: "85%",
        note: "In two sprints.",
        scale: { from: 40, to: 85 },
        source: { label: "DeviceHub", href: "/work/devicehub/" },
      },
      {
        label: "Release cadence",
        icon: "repeat",
        before: "Weekly",
        after: "Daily",
        source: { label: "DeviceHub", href: "/work/devicehub/" },
      },
      {
        label: "Regression defects",
        icon: "bug",
        before: "Before CI/CD",
        after: "About 35% fewer",
        source: { label: "DeviceHub", href: "/work/devicehub/" },
      },
      {
        label: "Live platform migration",
        icon: "server-cog",
        before: ".NET 7",
        after: ".NET 10",
        note: "Zero incidents, delivered in staged, test-driven steps.",
        source: { label: "DeviceHub", href: "/work/devicehub/" },
      },
    ],
  },
  primaryAction: { label: "Email me", href: `mailto:${site.contact.email}` },
  secondaryAction: { label: "See my work", href: "/work/" },
  cvAction: cv.pdf,
  work: {
    heading: "Selected work",
    intro: "Short engineering write-ups: the problem, what I did, what came of it, and where it honestly stands.",
    link: { label: "All work", href: "/work/" },
  },
  ai: {
    heading: "How I work with AI",
    link: { label: "More on how I use and build with AI", href: "/ai/" },
  },
  contact: {
    heading: "Get in touch",
    link: { label: "Contact page", href: "/contact/" },
  },
};
