# Architecture

## System overview

This is a single Next.js 16 (App Router) application — no separate backend
service. That's a deliberate choice for this MVP; see [DECISIONS.md](DECISIONS.md).

```
Browser
  │
  ▼
Next.js App Router (Server Components by default)
  ├── Route handlers / Server Actions read from src/lib/data (in-memory fixtures)
  ├── src/lib/matching.ts — pure functions, no I/O
  ├── src/lib/session.ts — demo session cookie (Server Actions: setDemoSession, getDemoUser)
  └── Client Components (interactive bits: filters, tabs, toasts, wizards)
        — hold local UI state only; nothing they do persists server-side
```

There is no database, no external API calls, and no queue/cache layer in this
prototype.

## Data flow

1. `src/lib/data/*.ts` export static, typed arrays (`startups`, `investors`,
   `parks`, `events`, `deals`, `demoUsers`) — this is the entire "database."
2. `src/lib/data/index.ts` re-exports them plus small lookup/filter helpers
   (`getStartup(id)`, `dealsForInvestor(id)`, etc.) — a **repository layer**.
   Pages and components only ever import from here, never from the individual
   fixture files directly (with the narrow exception of `src/lib/data/users.ts`
   for role labels).
3. Server Components (every `page.tsx` under `src/app/(app)/`) call the
   repository layer directly during render — no fetch, no API round-trip,
   since the "database" already lives in the same process.
4. `src/lib/matching.ts` is pure and side-effect-free: given a `Startup` and
   an `Investor`, it returns a `Match`. This is what makes it independently
   testable (see `src/lib/matching.test.ts`) and reusable from any context
   (a dashboard, the Matches page, an event's match matrix all call the same
   functions).

### Why this shape matters for a future real backend

Swapping the fixture-backed repository layer for real queries (Prisma against
Postgres, or a REST client against a separate API) should only require
rewriting `src/lib/data/index.ts` and the fixture files — no page or component
should need to change, because they only ever call functions like
`getStartup(id)`, never touch the arrays directly. The matching engine would
plug in unchanged; only the *inputs* to `scoreMatch` would start coming from a
real database instead of an array.

## Matching engine

The dossier proposed:

```
score = 0.40 × cosine_sim(embedding_startup, embedding_vc)
      + 0.25 × stage_match
      + 0.20 × industry_match
      + 0.15 × geo_match
```

This repo implements the same weighted-sum *shape*, with one disclosed
substitution: instead of a trained embedding model producing
`cosine_sim(embedding_startup, embedding_vc)`, it computes a **Jaccard
similarity over each side's structured industry tags** (a real, deterministic,
zero-dependency computation) as the industry term, and a heuristic "signal"
term (traction + profile completeness + check-size fit) in place of a free
`cosine_sim` term:

```
score = 0.40 × industry_overlap   (Jaccard similarity over industry tags)
      + 0.25 × stage_match        (1 if investor funds this stage, else 0.15)
      + 0.20 × geo_match          (1 if investor is active in this region, else 0.2)
      + 0.15 × signal             (traction + profile completeness + check-size fit)
```

See `src/lib/matching.ts` for the full implementation and inline rationale.
This is **not** a trained ML model — there is no training data, no model
weights, no inference call. It is transparent, explainable, unit-tested code
that mirrors the dossier's proposed formula shape. A production version could
replace the `industryOverlap` term with real embedding similarity without
changing the function's signature or the UI that renders `Match.breakdown`.

## Visual design system

Chosen deliberately to avoid the generic "AI dashboard" look (gradients,
glassmorphism, giant headings, purple-to-blue everything):

- **Palette:** a warm paper background (`#FAF8F4` light / deep ink `#0E1116`
  dark), a deep teal-green brand color (`#0F6E5E`), and a warm amber accent
  (`#C9762B`) — evoking cartography/trade-route maps rather than a generic
  SaaS blue. Defined as CSS variables in `src/app/globals.css`, consumed via
  Tailwind v4's `@theme inline`.
- **Typography:** a serif display face (system serif stack — see
  [DECISIONS.md](DECISIONS.md) for why not a webfont) paired with the system
  sans stack for UI text — an "atlas/ledger" editorial feel, not a single
  sans-only typeface doing everything.
- **The "match compass"** (`src/components/match-compass.tsx`) — a four-axis
  radial plot of a match's score breakdown, replacing a generic progress bar.
  It's a real SVG computed from `Match.breakdown`, not a static asset.
- **Hairline borders, minimal shadow, modest radii** — cards use 1px borders
  and a very light shadow, not glassmorphism or heavy elevation.
- Both light and dark themes are fully defined (see `:root[data-theme="dark"]`
  in `globals.css`) and verified in the browser during development.

## Route structure

```
src/app/
  page.tsx                 # marketing landing page
  login/page.tsx            # demo persona picker
  (app)/                    # route group — shared authenticated shell
    layout.tsx               # requireDemoUser() + Sidebar/Topbar/demo banner
    loading.tsx               # route-level skeleton
    dashboard/page.tsx
    startups/page.tsx, [id]/page.tsx
    investors/page.tsx, [id]/page.tsx
    parks/page.tsx, [id]/page.tsx
    matches/page.tsx
    events/page.tsx, [id]/page.tsx
    deals/page.tsx, [id]/page.tsx
    settings/page.tsx
    onboarding/page.tsx
  not-found.tsx, error.tsx  # global 404 / error boundary
```

The `(app)` route group's `layout.tsx` calls `requireDemoUser()`, which
redirects to `/login` if no demo session cookie is set — this is the only
"auth guard" in the app, and it is explicitly not real authorization (see
[SECURITY.md](SECURITY.md)).
