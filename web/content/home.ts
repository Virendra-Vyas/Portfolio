import type { HomePage } from "./schema";
import { site } from "./site";

/** Section headings and calls to action for the home page. The body content comes from the other content files. */
export const home: HomePage = {
  primaryAction: { label: "Email me", href: `mailto:${site.contact.email}` },
  secondaryAction: { label: "See my work", href: "/work/" },
  proof: { heading: "What I've delivered" },
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
