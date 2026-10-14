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
cd web && npm run lint && npm run typecheck && npm run build   # static output in web/out
cd api && dotnet test
```

## Configuration

Copy `.env.example` to `.env` and fill in values. Never commit `.env`.

## Deploy

Written up at build step 10.
