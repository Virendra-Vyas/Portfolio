import type { AiPage } from "./schema";

export const ai: AiPage = {
  title: "How I work with AI",
  intro:
    "I use AI every day on production work, and I build systems on top of it. In both cases the rule is the same: output gets reviewed, tested or scored before anyone relies on it.",
  practices: [
    {
      heading: "Claude Code on production work",
      body: "I use Claude Code daily on production code. I introduced it across my team at Datascope, including AI-assisted code review.",
      evidence: { label: "DeviceHub case study", href: "/work/devicehub/" },
    },
    {
      heading: "Multi-agent workflows",
      body: "I split larger pieces of work across sub-agents running in parallel: one on the API contract, one on business logic, one on the schema and one on tests. I use custom commands and manage context deliberately.",
    },
    {
      heading: "Evaluation over trust",
      body: "Stringline scores every step for confidence: deterministic scores where the answer is measurable, Claude self-assessment where it is narrative. The GovBridge agent has an evaluation harness and a golden dataset. And every generated change gets a human review before it ships.",
      evidence: { label: "Stringline case study", href: "/work/stringline/" },
    },
    {
      heading: "Automation with a human gate",
      body: "A self-hosted coding agent reviews the GovBridge codebase every day and proposes the next feature or fix to me on WhatsApp. It never implements anything until I approve it.",
      evidence: { label: "GovBridge case study", href: "/work/govbridge/" },
    },
    {
      heading: "Building for AI clients",
      body: "I have built a Model Context Protocol (MCP) server for GovBridge, so AI assistants can use the platform as a tool.",
      evidence: { label: "GovBridge case study", href: "/work/govbridge/" },
    },
  ],
};
