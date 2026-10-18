import type { Writing } from "./schema";

export const writing: Writing = {
  title: "Writing and open source",
  articlesHeading: "Articles",
  openSourceHeading: "Open source",
  linkPendingNote: "Link coming soon",
  intro:
    "Technical write-ups from my own integration work, and contributions back to the libraries I use.",
  // Newest first, with titles as published on dev.to.
  articles: [
    {
      title: "My API Was Logging People's National Insurance Numbers. I Never Told It To.",
      summary: "A privacy write-up: National Insurance numbers turning up in an API's logs when nothing was meant to record them.",
      platform: "dev.to",
    },
    {
      title: "GovBridge UK: Why I Built a Unified API Gateway for UK Government Data (HMRC, Companies House, DVLA, Land Registry)",
      summary: "Why I built GovBridge UK: one API in front of HMRC, Companies House, DVLA and Land Registry.",
      platform: "dev.to",
    },
    {
      title: "What HMRC's Fraud Prevention Headers Actually Require (That the Docs Don't Tell You)",
      summary: "Implementing HMRC's fraud prevention headers for Making Tax Digital APIs.",
      platform: "dev.to",
    },
    {
      title: "Two JWT Bearer Schemes, One API: A Real ASP.NET Core Setup",
      summary: "Two JWT bearer schemes in one ASP.NET Core API, with MapInboundClaims = false.",
      platform: "dev.to",
    },
    {
      title: "Swagger UI Is Showing the Wrong Auth Requirement on Every Endpoint — Here's the Fix",
      summary: "Per-operation security requirements in Swashbuckle using an IOperationFilter.",
      platform: "dev.to",
    },
    {
      title:
        "What building against HMRC's MTD APIs actually looks like in 2026 (the undocumented gotchas nobody warns you about)",
      summary: "The undocumented behaviour I ran into building against HMRC's Making Tax Digital APIs.",
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
