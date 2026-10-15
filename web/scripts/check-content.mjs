// Fails if content contains wording or claims the brief rules out (sections 0, 2, 3 and 14).
// Run with `npm run check:content`. Matching is case-insensitive.
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const ROOT = new URL("../content/", import.meta.url).pathname;

const banned = [
  // Tone
  /\bpassionate\b/, /\brockstar\b/, /\bninja\b/, /cutting[- ]edge/, /\bguru\b/, /\bworld[- ]class\b/,
  // Availability: I'm employed
  /available (now|immediately)/, /\bimmediately available\b/,
  // How Yug Solutions is described
  /saas vendor/, /pre-seed/, /startup studio/, /\bagency\b/, /co-founder/,
  // Skills I don't have, or that are unconfirmed
  /kubernetes/, /\bgcp\b/, /google cloud/, /vue(\.js)?\b/, /grafana/, /prometheus/,
  /mongodb/, /\bdapper\b/, /\bcqrs\b/, /\bddd\b/, /domain-driven/, /\baspire\b/, /gov\.uk notify/,
  /github copilot/, /\bcursor\b/, /hugging ?face/, /\bllama\b/, /\bmistral\b/, /microservices/,
  /lambda/, /dynamodb/, /cognito/, /\bsqs\b/,
  // Personal details that must not be published
  /\+44/, /07\d{3}\s?\d{6}/, /7412/,
  // Numbers from older CVs that are not confirmed
  /10,000/, /200\+ concurrent/, /800,000/,
];

function files(dir) {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    return statSync(path).isDirectory() ? files(path) : path.endsWith(".ts") ? [path] : [];
  });
}

let failures = 0;
for (const file of files(ROOT)) {
  readFileSync(file, "utf8")
    .split("\n")
    .forEach((line, index) => {
      for (const pattern of banned) {
        const match = line.toLowerCase().match(pattern);
        if (match) {
          failures++;
          console.error(`${relative(ROOT, file)}:${index + 1}  "${match[0]}"  ${line.trim()}`);
        }
      }
    });
}

if (failures > 0) {
  console.error(`\n${failures} banned term(s) found in content.`);
  process.exit(1);
}
console.log("Content check passed.");
