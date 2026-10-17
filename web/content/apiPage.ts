import type { ApiPageCopy } from "./schema";

export const apiPage: ApiPageCopy = {
  title: "This portfolio is also an API",
  eyebrow: "Portfolio API, version 1",
  intro:
    "I build API gateways for a living, so this site has one too. Everything you can read here is also available as versioned JSON, described by an OpenAPI 3.1 document. Send a request below, or use curl.",
  howHeading: "How it works",
  howPoints: [
    "Each endpoint is generated at build time from the same typed content files the pages render, so the JSON and the pages can't disagree.",
    "Every response uses one envelope: data, plus links to related resources and the matching page.",
    "After every build, a contract test validates each response against the OpenAPI document. Objects are closed, so an added, missing or renamed field fails the build.",
    "Static files on a CDN: no server, no authentication, no cookies and no tracking.",
  ],
  endpointsHeading: "Endpoints",
  openapiLink: { label: "OpenAPI 3.1 document", href: "/api/openapi.json" },
  labels: {
    send: "Send request",
    sending: "Sending",
    copy: "Copy curl",
    copied: "Copied",
    caseStudy: "Case study",
    response: "Response",
    error: "The request failed. Try again, or open the URL directly.",
  },
  teaserStatus: "200 OK",
  teaser: {
    heading: "This portfolio is also an API",
    intro:
      "Everything on this site is available as versioned JSON with an OpenAPI 3.1 contract, validated on every build. Try a request.",
    link: { label: "Open the API explorer", href: "/api/" },
  },
};
