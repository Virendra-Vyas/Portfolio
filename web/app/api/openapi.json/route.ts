import { openApiDocument } from "@/lib/openapi";
import { json } from "@/lib/publicApi";

export const dynamic = "force-static";

export function GET() {
  return json(openApiDocument());
}
