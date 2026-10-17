import type { Site } from "./schema";

export const site: Site = {
  name: "Virendra Vyas",
  role: "Senior full-stack .NET engineer",
  url: "https://virendravyas.dev",
  description:
    "Senior full-stack .NET engineer in Eastbourne, UK. Lead Software Engineer at Datascope Systems, and founder of Yug Solutions Ltd, a bootstrapped UK software company.",
  nav: [
    { label: "Work", href: "/work/" },
    { label: "About", href: "/about/" },
    { label: "Writing", href: "/writing/" },
    { label: "API", href: "/api/" },
    { label: "Contact", href: "/contact/" },
  ],
  contact: {
    email: "virendra1629@gmail.com",
    links: [
      { label: "LinkedIn", href: "https://www.linkedin.com/in/virendra-vyas" },
      { label: "GitHub", href: "https://github.com/virendra-vyas" },
    ],
  },
  notFound: { title: "Page not found", linkLabel: "Back to the home page" },
  footer: {
    links: [{ label: "How I use AI", href: "/ai/" }],
    company: "Yug Solutions Ltd, registered in England and Wales",
    privacyNote:
      "This site sets no cookies and runs no trackers. Messages sent through the contact form are used only to reply to you.",
  },
};
