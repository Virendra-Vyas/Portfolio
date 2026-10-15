/**
 * Types every content file must satisfy. Components only ever render these shapes,
 * so a missing or misspelt field fails the type check rather than shipping.
 */

export type InternalHref = `/${string}`;
export type ExternalHref = `https://${string}` | `mailto:${string}`;

export type NavItem = {
  label: string;
  href: InternalHref;
};

export type ExternalLink = {
  label: string;
  href: ExternalHref;
};

/** A link that may point inside the site or out of it. */
export type AnyLink = {
  label: string;
  href: InternalHref | ExternalHref;
};

export type Site = {
  name: string;
  /** Short role line used in the header and page titles. */
  role: string;
  /** Default meta description. */
  description: string;
  /** Production origin, e.g. https://example.com. */
  url?: `https://${string}`;
  nav: NavItem[];
  contact: {
    email: string;
    links: ExternalLink[];
  };
  notFound: { title: string; linkLabel: string };
  footer: {
    company: string;
    /** Companies House number. Shown only once confirmed. */
    companyNumber?: string;
    privacyNote: string;
  };
};

/* ------------------------------------------------------------------ Profile */

/** A label/value pair, rendered as a definition list. */
export type Fact = { term: string; detail: string };

export type ProofPoint = {
  /** The claim in a few words, e.g. "Zero-incident .NET 7 to .NET 10 migration". */
  title: string;
  detail: string;
  link: AnyLink;
};

export type Qualification = {
  title: string;
  institution: string;
  period: string;
};

export type Certification = {
  title: string;
  /** e.g. "In progress" or "August 2021". */
  note?: string;
};

export type Profile = {
  hero: {
    headline: string;
    summary: string;
  };
  location: string;
  rightToWork: string;
  availability: string;
  workingArrangements: string[];
  /** Labels for location, right to work and availability where they are shown as facts. */
  factLabels: { location: string; rightToWork: string; availability: string };
  proofPoints: ProofPoint[];
  about: string[];
  education: Qualification[];
  certifications: Certification[];
  languages: string[];
};

/* ----------------------------------------------------------------- Timeline */

/** Month is 1-12. */
export type YearMonth = { year: number; month: number };

export type TimelineEntry = {
  organisation: string;
  role: string;
  start: YearMonth;
  /** Omitted while the role is current. */
  end?: YearMonth;
  kind: "employment" | "company" | "freelance";
  summary: string;
  /** Case study for this role, if there is one. */
  caseStudy?: InternalHref;
  /** Title of a further-work card for this role, used for CV bullet points when there is no case study. */
  project?: string;
};

/* ------------------------------------------------------------- Case studies */

export type StatusTone = "live" | "production" | "prototype" | "complete" | "notLaunched";

export type Status = {
  tone: StatusTone;
  label: string;
};

/** A titled block of write-up. Paragraphs render first, then the bullet list. */
export type Section = {
  heading: string;
  paragraphs?: string[];
  points?: string[];
};

export type Diagram = {
  /** Path under /public, e.g. "/diagrams/govbridge.svg". */
  src: InternalHref;
  /** Full text alternative describing what the diagram shows. */
  description: string;
  /** Intrinsic size from the SVG viewBox, so the browser reserves space and nothing shifts. */
  width: number;
  height: number;
};

export type CaseStudy = {
  slug: string;
  title: string;
  /** One or two sentences for cards and meta descriptions. */
  summary: string;
  role: string;
  /** Employer, client or company, and the engagement type. */
  context: string;
  period: string;
  status: Status;
  featured: boolean;
  /** Ascending order on the Work index. */
  order: number;
  tech: string[];
  links: ExternalLink[];
  diagram?: Diagram;
  problem: Section;
  whatIDid: Section[];
  outcome: Section;
  honestStatus: Section;
  /** Only where I have said what comes next. */
  next?: Section;
};

/* -------------------------------------------------------- Shorter work cards */

export type ProjectCard = {
  title: string;
  context: string;
  period?: string;
  summary: string;
  points: string[];
  tech: string[];
  links: ExternalLink[];
};

/* ------------------------------------------------------------------- Skills */

export type SkillGroup = {
  name: string;
  items: string[];
  /** Where the skill was used, so a reader can check it. */
  evidence: AnyLink[];
};

/* ----------------------------------------------------------------------- AI */

export type AiPractice = {
  heading: string;
  body: string;
  evidence?: AnyLink;
};

export type AiPage = {
  title: string;
  intro: string;
  practices: AiPractice[];
};

/* ------------------------------------------------------------------ Writing */

export type Article = {
  title: string;
  summary: string;
  platform: string;
  /** Omitted until the URL is confirmed. */
  href?: ExternalHref;
};

export type OpenSourceContribution = {
  title: string;
  project: string;
  summary: string;
  href: ExternalHref;
};

export type Writing = {
  title: string;
  intro: string;
  articlesHeading: string;
  openSourceHeading: string;
  /** Shown on an article card while its URL is still to be added. */
  linkPendingNote: string;
  articles: Article[];
  openSource: OpenSourceContribution[];
};

/* --------------------------------------------------------------------- Home */

export type SectionCopy = {
  heading: string;
  intro?: string;
  link?: AnyLink;
};

export type HomePage = {
  primaryAction: AnyLink;
  secondaryAction: AnyLink;
  cvAction: AnyLink;
  proof: SectionCopy;
  work: SectionCopy;
  ai: SectionCopy;
  contact: SectionCopy;
};

/* --------------------------------------------------------------------- Work */

export type WorkPage = {
  title: string;
  intro: string;
  caseStudies: SectionCopy;
  furtherWork: SectionCopy;
  /** Labels used by the case study template. */
  labels: {
    backToWork: string;
    role: string;
    context: string;
    period: string;
    technologies: string;
    whatIDid: string;
    diagramHeading: string;
    diagramDescription: string;
    diagramFullSize: string;
    nextCaseStudy: string;
    viewAsJson: string;
  };
};

/* -------------------------------------------------------------------- About */

export type AboutPage = {
  title: string;
  storyHeading: string;
  timelineHeading: string;
  /** Label for an entry with no end date. */
  presentLabel: string;
  caseStudyLinkLabel: string;
  skillsHeading: string;
  skillsIntro: string;
  evidenceLabel: string;
  credentialsHeading: string;
  educationHeading: string;
  certificationsHeading: string;
  languagesHeading: string;
};

/* ------------------------------------------------------------------ Contact */

export type ContactForm = {
  heading: string;
  intro: string;
  fields: { name: string; email: string; message: string; honeypot: string };
  hints: { email: string; message: string };
  submit: string;
  sending: string;
  service: { checking: string; ready: string; unreachable: string };
  errorSummary: string;
  sent: { heading: string; body: string };
  rateLimited: string;
  failed: string;
  fallbackLink: string;
  fallbackSubject: string;
  privacy: string;
};

export type ContactPage = {
  title: string;
  intro: string;
  routesHeading: string;
  emailLabel: string;
  arrangementsHeading: string;
  form: ContactForm;
};

/* ---------------------------------------------------------------- API page */

export type ApiPageCopy = {
  title: string;
  eyebrow: string;
  intro: string;
  howHeading: string;
  howPoints: string[];
  endpointsHeading: string;
  openapiLink: AnyLink;
  labels: {
    send: string;
    sending: string;
    copy: string;
    copied: string;
    caseStudy: string;
    response: string;
    error: string;
  };
  /** Short teaser used on the home page. */
  teaser: SectionCopy;
};

/* ----------------------------------------------------------------------- CV */

export type CvCopy = {
  title: string;
  /** The generated PDF, committed under /public. */
  pdf: AnyLink;
  viewOnline: AnyLink;
  headings: {
    summary: string;
    achievements: string;
    experience: string;
    skills: string;
    writing: string;
    education: string;
    certifications: string;
    languages: string;
  };
  presentLabel: string;
  websiteLabel: string;
  footnote: string;
};
