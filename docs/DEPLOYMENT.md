# Deployment

## Current state: local only

This prototype has **no hosted deployment**. It runs locally via the Next.js
dev/build toolchain and has no external dependencies (no database, no third-
party API keys), so there is no `.env` to configure.

## Local development

```bash
npm install
npm run dev      # http://localhost:3000 by default
```

## Production build (local)

```bash
npm run build
npm run start     # serves the production build
```

`npm run build` uses Turbopack (Next.js 16 default) and produces a mix of
static (`○`) and dynamic (`ƒ`) routes — the app routes are dynamic because
they read the demo session cookie via `next/headers` on every request.

## Environment variables

None are required. `.env.example` documents the placeholders a real backend
integration would need (database URL, session secret) — none of them are read
by any code in this repository today; they exist purely as a forward-looking
placeholder for [ROADMAP.md](ROADMAP.md) Phase 2.

## If this were deployed for real

A straightforward path with no code changes needed for the current feature
set:

- **Vercel** (first-party Next.js hosting) — connect the repo, no environment
  variables needed for the current build.
- **Docker** — not included in this repo. A `Dockerfile` would be a thin
  `node:XX-slim` image running `npm run build && npm run start`; not added
  here because there's no service to containerize alongside it yet (no DB, no
  worker) — see [ROADMAP.md](ROADMAP.md) Phase 2 for when that would become
  worthwhile.

## CI

`.github/workflows/ci.yml` runs `npm run lint`, `npm run build`, and
`npm test` on every push/PR — see [TESTING.md](TESTING.md).
