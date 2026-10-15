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

cd api && dotnet test
```

## The site is also an API

Every page's data is published as static JSON under `/api/v1/`, described by an OpenAPI 3.1
document at `/api/openapi.json` and explorable at `/api/`. The JSON is generated at build time
from the same typed content as the pages (`web/lib/publicApi.ts`); `check:api` fails the build
if a response and the contract drift apart.

## Images

`public/og.png` (social preview) and `app/apple-icon.png` are rendered from
`scripts/og/template.html` and `app/icon.svg` with `node scripts/og/render.mjs` (needs Playwright).
Set `SITE_URL` at build time so preview links are absolute.

## Configuration

Copy `.env.example` to `.env` and fill in values. Never commit `.env`.

## Deploy

Written up at build step 10.
