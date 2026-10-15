import { caseStudies, getCaseStudy } from "@/content/caseStudies";
import { caseStudyResponse, json } from "@/lib/publicApi";

export const dynamic = "force-static";
export const dynamicParams = false;

// The segment is the whole file name, e.g. "govbridge.json", so the export writes real .json files.
export function generateStaticParams() {
  return caseStudies.map((study) => ({ file: `${study.slug}.json` }));
}

export async function GET(_request: Request, { params }: { params: Promise<{ file: string }> }) {
  const { file } = await params;
  const study = getCaseStudy(file.replace(/\.json$/, ""));
  if (!study) return new Response("Not found", { status: 404 });
  return json(caseStudyResponse(study));
}
