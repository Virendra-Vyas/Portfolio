import { caseStudiesResponse, json } from "@/lib/publicApi";

export const dynamic = "force-static";

export function GET() {
  return json(caseStudiesResponse());
}
