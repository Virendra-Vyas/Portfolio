// Builds the site, prints /cv/ to public/cv/virendra-vyas-cv.pdf and records the source hash
// that `npm run check:cv` compares against. Run with `npm run cv`.
// Building first means the PDF and the recorded hash always come from the same sources.
import { spawnSync } from "node:child_process";
import { createReadStream, existsSync, statSync, writeFileSync } from "node:fs";
import { createServer } from "node:http";
import { extname, join } from "node:path";
import { chromium } from "playwright";
import { HASH_FILE, PDF, WEB, sourceHash } from "./source.mjs";

// Hash before building, so an edit made during the build can't be recorded as covered.
const hash = sourceHash();
const build = spawnSync("npm", ["run", "build"], { cwd: WEB, stdio: "inherit" });
if (build.status !== 0) process.exit(build.status ?? 1);

const OUT = join(WEB, "out");

const types = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".woff2": "font/woff2", ".svg": "image/svg+xml", ".png": "image/png", ".json": "application/json" };
const server = createServer((req, res) => {
  let path = join(OUT, decodeURIComponent(new URL(req.url, "http://x").pathname));
  if (existsSync(path) && statSync(path).isDirectory()) path = join(path, "index.html");
  if (!existsSync(path)) return res.writeHead(404).end();
  res.writeHead(200, { "Content-Type": types[extname(path)] ?? "application/octet-stream" });
  createReadStream(path).pipe(res);
}).listen(0);
const { port } = server.address();

const browser = await chromium.launch();
const page = await browser.newPage();
await page.goto(`http://localhost:${port}/cv/`, { waitUntil: "networkidle" });
await page.evaluate(() => document.fonts.ready);
await page.emulateMedia({ media: "print" });
await page.pdf({ path: PDF, format: "A4", printBackground: true, preferCSSPageSize: true, tagged: true, outline: true });
await browser.close();
server.close();

if (sourceHash() !== hash) {
  console.error("Sources changed while the CV was being generated. Run npm run cv again.");
  process.exit(1);
}
writeFileSync(HASH_FILE, `${hash}\n`);
console.log(`Wrote ${PDF.replace(WEB, "")} and updated ${HASH_FILE.replace(WEB, "")}`);
