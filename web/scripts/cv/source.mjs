// The files the CV is built from. If any of them changes, the committed PDF is out of date.
import { createHash } from "node:crypto";
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

export const WEB = fileURLToPath(new URL("../../", import.meta.url));
export const PDF = join(WEB, "public/cv/virendra-vyas-cv.pdf");
export const HASH_FILE = join(WEB, "scripts/cv/source.sha256");

const SOURCES = [
  "content/cv.ts",
  "content/profile.ts",
  "content/timeline.ts",
  "content/skills.ts",
  "content/writing.ts",
  "content/projects.ts",
  "content/site.ts",
  ...readdirSync(join(WEB, "content/caseStudies")).map((name) => `content/caseStudies/${name}`),
  "components/CvDocument/CvDocument.tsx",
  "components/CvDocument/CvDocument.module.css",
  "lib/dates.ts",
].sort();

export function sourceHash() {
  const hash = createHash("sha256");
  for (const file of SOURCES) {
    hash.update(file);
    hash.update(readFileSync(join(WEB, file)));
  }
  return hash.digest("hex");
}
