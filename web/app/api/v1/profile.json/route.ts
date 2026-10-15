import { profileResponse, json } from "@/lib/publicApi";

export const dynamic = "force-static";

export function GET() {
  return json(profileResponse());
}
