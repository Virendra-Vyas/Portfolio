// Fails if content the CV is built from changed after the PDF was last generated.
import { existsSync, readFileSync } from "node:fs";
import { HASH_FILE, PDF, sourceHash } from "./source.mjs";

if (!existsSync(PDF) || !existsSync(HASH_FILE)) {
  console.error("The CV PDF has not been generated. Run: npm run build && npm run cv");
  process.exit(1);
}
if (readFileSync(HASH_FILE, "utf8").trim() !== sourceHash()) {
  console.error("The CV PDF is out of date with the site content. Run: npm run build && npm run cv, then commit the PDF.");
  process.exit(1);
}
console.log("CV PDF matches the site content.");
