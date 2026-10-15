import type { Writing } from "./schema";

export const writing: Writing = {
  title: "Writing and open source",
  articlesHeading: "Articles",
  openSourceHeading: "Open source",
  linkPendingNote: "Link coming soon",
  intro:
    "Technical write-ups from my own integration work, and contributions back to the libraries I use.",
  articles: [
    {
      title: "HMRC fraud prevention headers",
      summary: "Implementing HMRC's fraud prevention headers for Making Tax Digital APIs.",
      platform: "dev.to",
    },
    {
      title: "Dual JWT bearer authentication in ASP.NET Core",
      summary: "Two JWT bearer schemes in one ASP.NET Core API, with MapInboundClaims = false.",
      platform: "dev.to",
    },
    {
      title: "Per-operation Swashbuckle security with IOperationFilter",
      summary: "Per-operation security requirements in Swashbuckle using an IOperationFilter.",
      platform: "dev.to",
    },
  ],
  openSource: [
    {
      title: "Fix CountAsync ignoring PostProcessingAction",
      project: "ardalis/Specification",
      summary: "A merged pull request fixing CountAsync so it no longer ignored a specification's PostProcessingAction.",
      href: "https://github.com/ardalis/Specification/pull/552",
    },
  ],
};
