// Renders the social preview image and the Apple touch icon with Playwright.
// One-off generator: the PNGs are committed, so CI does not need a browser for this.
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";

const here = (path) => fileURLToPath(new URL(path, import.meta.url));
const browser = await chromium.launch();

const og = await browser.newPage({ viewport: { width: 1200, height: 630 } });
await og.goto(`file://${here("./template.html")}`);
await og.evaluate(() => document.fonts.ready);
await og.screenshot({ path: here("../../public/og.png") });

const icon = await browser.newPage({ viewport: { width: 180, height: 180 } });
await icon.goto(`file://${here("../../app/icon.svg")}`);
await icon.screenshot({ path: here("../../app/apple-icon.png"), omitBackground: true });

await browser.close();
console.log("Wrote public/og.png and app/apple-icon.png");
