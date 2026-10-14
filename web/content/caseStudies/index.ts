import type { CaseStudy } from "../schema";
import { devicehub } from "./devicehub";
import { govbridge } from "./govbridge";
import { intellibooks } from "./intellibooks";
import { researchMarketplace } from "./researchMarketplace";
import { stringline } from "./stringline";

export const caseStudies: CaseStudy[] = [
  govbridge,
  devicehub,
  stringline,
  researchMarketplace,
  intellibooks,
].sort((a, b) => a.order - b.order);

export const featuredCaseStudies = caseStudies.filter((study) => study.featured);

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((study) => study.slug === slug);
}
