# Portfolio Case Study — Meridian

**Status: Prototype / MVP demo.** Not production, not funded, no real users.

## What I built

A multi-role SaaS prototype for an "innovation ecosystem" platform —
connecting science & technology parks, venture investors, and startups
through explainable matching, event management, and a lightweight deal room.
Five distinct dashboards (Park Manager, VC Manager, Startup Founder, Event
Organizer, Admin), full CRUD-shaped browsing across startups/investors/parks/
events/deals, and a real (if intentionally simplified) match-scoring engine
with its own visualization.

## Problem

The source material for this project was a technical dossier describing a
platform to connect fragmented innovation-ecosystem data: parks, VCs,
startups, and events currently coordinate through spreadsheets and personal
networks, and matchmaking between founders and investors is manual and
doesn't scale.

## Approach

Rather than implement the dossier literally (which proposed a five-service
backend, a scraping pipeline against six external data sources, and a
trained embedding model — weeks of infrastructure with nothing to look at
until it was all wired together), I ran a gap analysis and made deliberate,
disclosed scope decisions:

1. **One Next.js app, not five services.** The product experience — the
   thing a reviewer actually evaluates — doesn't depend on where the data
   physically lives. A repository-layer abstraction (`src/lib/data/index.ts`)
   means a real backend could replace the in-memory fixtures later without
   touching a single page.
2. **A real matching algorithm, not a fake one.** Rather than hard-coding
   match scores or calling an LLM to "fake AI," I implemented the dossier's
   proposed weighted-scoring *shape* with genuine, deterministic, unit-tested
   code (Jaccard similarity over tags + rule-based stage/geo/signal terms).
   It's disclosed as not-a-trained-model everywhere it appears, because
   pretending otherwise would be dishonest about what's actually running.
3. **A visual identity built for this product, not a template.** A
   cartography-inspired palette and a custom radial "match compass"
   visualization instead of shadcn-out-of-the-box, so this project doesn't
   look interchangeable with the others in this portfolio.
4. **No external data ingestion.** Scraping Crunchbase/LinkedIn/Eventbrite is
   a real project with real ToS and legal considerations — building a fake
   version would be worse than clearly scoping it out and documenting it as
   future work.

## Architecture

Single Next.js 16 (App Router) application, Server Components reading
directly from typed in-memory fixtures through a repository layer, Client
Components for interactive bits (filters, tabs, toasts, the onboarding
wizard). See [ARCHITECTURE.md](ARCHITECTURE.md) for the full breakdown.

## Key features

- Role-aware dashboards computed live from the fixture data (real
  aggregation logic — pipeline funnels, KPI cards — not hard-coded numbers)
- A match-scoring engine with a transparent breakdown, not a black-box score
- An on-site "match matrix" at each event — every participating startup
  scored against every participating investor
- A deal-room kanban with document/NDA status tracking

## Challenges

- **Sandbox had no outbound network access**, which broke `next/font/google`
  mid-build. Solved by switching to system font stacks — see
  [DECISIONS.md](DECISIONS.md) for the reasoning, since this also makes the
  build reproducible on any machine regardless of network policy.
- **Keeping the "match compass" legible at small sizes** — an early version
  overlapped text at ~110px. Fixed by abbreviating axis labels and gating the
  legend to larger renders, verified visually in the browser at every size
  the component is actually used at.

## Design decisions

See [DECISIONS.md](DECISIONS.md) for the full list with rationale — notably
the choice of a single-app architecture, a deterministic (not ML) matching
engine, and hand-built UI primitives over a component kit.

## Current status: Prototype / MVP demo

- `npm run build`, `npm run lint`, and `npm test` all pass
- Every route was manually verified in a real browser (light + dark theme,
  desktop + mobile viewport)
- No database, no real auth, no deployment — see
  [LIMITATIONS.md](LIMITATIONS.md) for the exhaustive list

## What I'd do next

See [ROADMAP.md](ROADMAP.md) — in short: a real database behind the existing
repository-layer abstraction, real authentication, then one real external
data source (an API-based one, not scraping) before touching billing.
