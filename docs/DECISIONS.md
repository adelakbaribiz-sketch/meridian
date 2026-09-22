# Decisions

Notable engineering decisions and the reasoning behind them. Newest first.

## No `next/font/google`

**Decision:** use system font stacks (`src/app/globals.css`) instead of
`next/font/google`, even though the visual design calls for a serif/sans
pairing.

**Why:** `next/font/google` fetches font files over the network at build/dev
time. This project was built in a sandboxed environment with no outbound
network access, and `next build` hard-failed trying to reach
`fonts.googleapis.com`. Rather than ship something that only builds on
machines with unrestricted network access, the font stack uses well-supported
system fonts that approximate the same serif-display/sans-body pairing with
zero external dependency. This also makes `npm run build` meaningfully faster
and fully reproducible offline.

## Single Next.js app instead of the dossier's proposed multi-service stack

**Decision:** one Next.js app with in-memory fixtures, instead of the source
dossier's proposed Next.js + NestJS + Python/FastAPI + PostgreSQL/pgvector +
Redis + ClickHouse + AWS stack.

**Why:** this is a portfolio MVP meant to demonstrate product thinking, UX
craft, and one real piece of "smart" logic (the matching engine) — not a
distributed systems exercise. Running five services to show a match score is
worse for a reviewer's ability to `npm install && npm run dev` and see the
product in under a minute. See "Backend philosophy" in the review criteria
this project was built against: frontend and product experience first,
backend only when it's load-bearing for the demo. The repository layer
(`src/lib/data/index.ts`) is written so a real backend can be substituted
later without touching page code — see [ARCHITECTURE.md](ARCHITECTURE.md).

## Deterministic scoring instead of a trained embedding model

**Decision:** `src/lib/matching.ts` uses Jaccard similarity over structured
tags plus rule-based stage/geo/signal terms, not a trained ML embedding model.

**Why:** a trained model needs training data, which doesn't exist for a
fictional demo dataset, and calling a real embeddings API (e.g. OpenAI) would
mean either committing a real API key (unacceptable) or the demo silently
failing without one. A transparent, deterministic function that mirrors the
dossier's proposed weighting *shape* is both honest (no black box, no faked
"AI") and fully testable. See [ARCHITECTURE.md](ARCHITECTURE.md#matching-engine).

## Hand-rolled UI primitives instead of a component library

**Decision:** `src/components/ui/` is hand-written (Button, Card, Badge,
Tabs, Toast, etc.) rather than installing shadcn/ui or another kit wholesale.

**Why:** this project's visual identity (serif/sans pairing, cartography
palette, the match-compass visualization) is meant to look distinct from
other projects in this portfolio and from generic AI-generated dashboards.
Starting from a general-purpose kit's default look and overriding it tends to
leave template fingerprints; a small, purpose-built primitive set kept full
control over the look with a manageable amount of code (a few hundred lines
total).

## No drag-and-drop on the deal-room kanban

**Decision:** `/deals` renders a real, data-driven kanban grouped by stage,
but cards aren't draggable.

**Why:** drag-and-drop between columns implies a persistence layer to write
the new stage to — which doesn't exist in this prototype (see
[DATA_MODEL.md](DATA_MODEL.md)). Implementing drag interactions that visually
"work" but discard the result on refresh would be a worse, more confusing demo
than a static-but-honest grouped view. This is called out explicitly in
[PRODUCT_REQUIREMENTS.md](PRODUCT_REQUIREMENTS.md) as an intentional scope cut,
not an oversight.

## Vitest, unit tests only — no component/E2E suite

**Decision:** automated tests cover the matching engine, formatters, and
fixture referential integrity (`src/lib/*.test.ts`), but there's no React
Testing Library / Playwright suite.

**Why:** the highest-value, most bug-prone logic in this codebase is the
matching engine and the hand-authored fixture data (a typo'd id silently
breaks a page) — both are now covered. Component and E2E tests add real value
but are a larger time investment better spent, for a portfolio MVP, on
product breadth; see [TESTING.md](TESTING.md) for what manual verification
was done instead (every route was exercised in a real browser, light and
dark themes, and mobile viewport, during development).
