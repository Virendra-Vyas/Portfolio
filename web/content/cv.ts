import type { CvCopy } from "./schema";

export const cv: CvCopy = {
  title: "CV",
  pdf: { label: "Download CV (PDF)", href: "/cv/virendra-vyas-cv.pdf" },
  viewOnline: { label: "View CV online", href: "/cv/" },
  headings: {
    summary: "Summary",
    achievements: "Key achievements",
    experience: "Experience",
    skills: "Skills",
    writing: "Writing and open source",
    education: "Education",
    certifications: "Certifications",
    languages: "Languages",
  },
  presentLabel: "present",
  websiteLabel: "virendravyas.dev",
  footnote:
    "Generated from the same content as virendravyas.dev, so the CV and the site always match. Case studies with more detail are on the site.",
};
