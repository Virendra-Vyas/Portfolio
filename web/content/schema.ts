/**
 * Types every content file must satisfy. Components only ever render these shapes,
 * so a missing or misspelt field fails the type check rather than shipping.
 * Extended with profile, case study and writing types in build step 4.
 */

export type NavItem = {
  label: string;
  href: `/${string}`;
};

export type ExternalLink = {
  label: string;
  href: `https://${string}` | `mailto:${string}`;
};

export type Site = {
  name: string;
  /** Short role line used in the header and page titles. */
  role: string;
  /** Default meta description. */
  description: string;
  /** Production origin, e.g. https://example.com. Undefined until the domain is confirmed. */
  url?: `https://${string}`;
  nav: NavItem[];
  contact: {
    email: string;
    links: ExternalLink[];
  };
  footer: {
    company: string;
    /** Companies House number. Shown only once confirmed. */
    companyNumber?: string;
    privacyNote: string;
  };
};
