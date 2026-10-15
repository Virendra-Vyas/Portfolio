// Prints /cv/ from the built site (web/out) to public/cv/virendra-vyas-cv.pdf and records the
// source hash that `npm run check:cv` compares against. Run after `npm run build`:
//   npm run build && node scripts/cv/render.mjs
import { createReadStream, existsSync, statSync, writeFileSync } from "node:fs";
import { createServer } from "node:http";
import { createRequire } from "node:module";
import { extname, join } from "node:path";
import { HASH_FILE, PDF, WEB, sourceHash } from "./source.mjs";

const require = createRequire(import.meta.url);
let chromium;
try {
  ({ chromium } = require("playwright"));
} catch {
  ({ chromium } = createRequire("/opt/node22/lib/node_modules/")("playwright"));
}

const OUT = join(WEB, "out");
if (!existsSync(join(OUT, "cv/index.html"))) throw new Error("Build the site first: npm run build");

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

writeFileSync(HASH_FILE, `${sourceHash()}\n`);
console.log(`Wrote ${PDF.replace(WEB, "")} and updated ${HASH_FILE.replace(WEB, "")}`);
