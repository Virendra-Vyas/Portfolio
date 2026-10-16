# Portfolio

Personal engineering portfolio for Virendra Vyas.

| Folder | What it is |
| --- | --- |
| `web/` | Next.js (App Router, TypeScript), exported as a static site for Cloudflare Pages. One CSS module per component, all content in typed files under `web/content/`. |
| `api/` | ASP.NET Core minimal API (.NET 10) for the contact form, with xUnit tests. |

## Prerequisites

- Node.js 22 or later
- .NET SDK 10

## Run locally

```bash
# Site: http://localhost:3000
cd web
npm ci
npm run dev

# API: http://localhost:5113
cd api
dotnet run --project ContactApi
```

## Checks

```bash
cd web
npm run lint
npm run typecheck
npm run check:content   # banned wording, unconfirmed claims, personal details
npm run build           # static output in web/out
npm run check:api       # validates every built JSON response against the OpenAPI document
npm run check:cv        # fails if the CV PDF is older than the content it is built from

cd api && dotnet test
```

## The site is also an API

Every page's data is published as static JSON under `/api/v1/`, described by an OpenAPI 3.1
document at `/api/openapi.json` and explorable at `/api/`. The JSON is generated at build time
from the same typed content as the pages (`web/lib/publicApi.ts`); `check:api` fails the build
if a response and the contract drift apart.

## CV

The CV at `/cv/` is rendered from the same content files. The PDF (`public/cv/virendra-vyas-cv.pdf`)
is printed from that page and committed: after changing content, run `npm run cv` (it builds the site first)
and commit the PDF. CI fails if it is out of date. The first time, install the browser Playwright uses:
`npx playwright install chromium`.

## Images

`public/og.png` (social preview) and `app/apple-icon.png` are rendered from
`scripts/og/template.html` and `app/icon.svg` with `node scripts/og/render.mjs` (uses the same Playwright browser).
Set `SITE_URL` at build time so preview links are absolute.

## Configuration

Copy `.env.example` to `.env` and fill in values. Never commit `.env`.

## Deploy (all on free plans; the domain is the only cost)

| Piece | Where | Address |
| --- | --- | --- |
| Site | Cloudflare Workers (static assets) | https://virendravyas.dev |
| Contact API | Render (free web service, Docker) | https://api.virendravyas.dev |
| Email | Resend (free plan) | sends from contact@virendravyas.dev |

### 1. Email: Resend

1. Create a Resend account and add the domain `virendravyas.dev`.
2. Resend shows DNS records (SPF, DKIM, and optionally DMARC). Add them in Cloudflare DNS, then press Verify.
3. Create an API key with "Sending access" only. Keep it for step 2.

### 2. Contact API: Render

1. In Render: New > Blueprint, and pick this repository. Render reads `render.yaml`.
2. When asked, paste the Resend API key into `Resend__ApiKey`.
3. After the first deploy, open `https://<service>.onrender.com/health`; it should return `{"status":"ok"}`.
4. Settings > Custom Domains > add `api.virendravyas.dev`. In Cloudflare DNS add the CNAME Render shows,
   with the proxy **off** (grey cloud) so Render can issue the certificate.

Free services sleep after 15 minutes idle and take up to a minute to wake. The Contact page wakes the API
when it loads and falls back to a pre-filled email if sending fails.

### 3. Site: Cloudflare Workers (static assets)

The site is served by a Worker with no script: `web/wrangler.jsonc` points it at the static export in
`web/out`, adds trailing-slash handling and the site's own 404 page, and Cloudflare applies
`web/public/_headers`.

1. Workers & Pages > Create > Import a repository, and pick this repository.
2. Settings > Builds:
   - Root directory: `web`
   - Build command: `npm ci && npm run build`
   - Deploy command: `npx wrangler deploy`
   - API token: create one if the dropdown says the configured token is unavailable.
3. No build variables are needed: the production URLs are the defaults, and `web/.node-version` pins Node 22.
4. Settings > Domains & Routes > add `virendravyas.dev` (and `www.virendravyas.dev`).

Check the result locally with `npm run build && npx wrangler dev`.

`web/public/_headers` sets the security headers, including a Content Security Policy that only allows the
contact API as an outside connection.
