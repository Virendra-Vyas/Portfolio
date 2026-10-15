import type { Site } from "./schema";

export const site: Site = {
  name: "Virendra Vyas",
  role: "Senior full-stack .NET engineer",
  description:
    "Senior full-stack .NET engineer in Eastbourne, UK. Lead Software Engineer at Datascope Systems and founder of Yug Solutions Ltd.",
  nav: [
    { label: "Work", href: "/work/" },
    { label: "About", href: "/about/" },
    { label: "AI", href: "/ai/" },
    { label: "Writing", href: "/writing/" },
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
    company: "Yug Solutions Ltd, registered in England and Wales",
    privacyNote:
      "This site sets no cookies and runs no trackers. Messages sent through the contact form are used only to reply to you.",
  },
};
