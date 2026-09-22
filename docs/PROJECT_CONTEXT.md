# Project Context

## Origin

This project was built from a **Technical Project Dossier** — a structured
document produced from an earlier conversation about a proposed SaaS platform
connecting science & technology parks, VCs, and exhibitions/events. That
dossier explicitly marked almost everything beyond the core concept as
`PROPOSED` or `UNKNOWN`: no confirmed project name, no confirmed final tech
stack, no UI designs, no code, no repository, and no real customer or
financial validation. It did, however, contain a clear product concept,
proposed data model, proposed pricing, and a proposed roadmap — considerably
more scaffolding than a from-scratch idea.

This repository is the result of turning that dossier into a demoable,
professionally structured MVP: a concrete product name, a designed visual
identity, a working (if intentionally lightweight) full-stack app, and this
documentation set.

## Classification

Per the dossier's own project-type taxonomy, this is:

**C. SAAS** (B2B/B2B2C, multi-tenant web application)

No other hybrid outputs (research package, trading strategy, book manuscript)
apply — the dossier contained a product concept, not a research question or
dataset.

## What the dossier left undecided, and how this repo resolved it

| Gap in the dossier | Resolution in this repo | Status |
|---|---|---|
| Project name | Invented: **Meridian** | ASSUMPTION |
| Final tech stack | Simplified from the dossier's proposal (NestJS + Python FastAPI + PostgreSQL/pgvector + Redis + ClickHouse + AWS) to a single Next.js app with in-memory fixtures — see [DECISIONS.md](DECISIONS.md) for why | DESIGNED, SIMPLIFIED |
| Data model | Designed from the dossier's proposed entities (startups, investors, parks, events, deals) — see [DATA_MODEL.md](DATA_MODEL.md) | DESIGNED |
| AI matchmaking | The dossier proposed a weighted score with embeddings (`0.40 × cosine_sim + 0.25 × stage + 0.20 × industry + 0.15 × geo`). This repo implements the same weighted-sum *shape* but with transparent structured-attribute scoring (Jaccard similarity over tags, not a trained embedding model) — a deliberate, disclosed simplification. See `src/lib/matching.ts` and [ARCHITECTURE.md](ARCHITECTURE.md) | IMPLEMENTED (simplified), REAL CODE |
| Scraping / external data ingestion pipeline | **Not implemented.** The dossier's scraping architecture (Crunchbase/Dealroom/LinkedIn/Eventbrite ingestion, proxy management, embeddings pipeline) is a significant system on its own and is out of scope for a portfolio MVP. All startup/investor/event data is hand-authored demo data. See [ROADMAP.md](ROADMAP.md) | NOT IMPLEMENTED |
| UI/UX | Designed from scratch for this project specifically — a cartography-inspired visual identity (serif/sans pairing, teal/amber palette, a radial "match compass" instead of a generic progress bar) chosen so this project doesn't look like a template. See [ARCHITECTURE.md](ARCHITECTURE.md#visual-design-system) | DESIGNED, IMPLEMENTED |
| Business model / pricing | The dossier's proposed tiers and financial projections are reproduced *only* as an illustrative, clearly labeled "Proposed — not validated" pricing section. The dossier's multi-year revenue projections are **not** reproduced anywhere in this repo — they were speculative figures with no supporting evidence, and repeating them here would misrepresent this prototype's stage | NOT FABRICATED |
| Iran exclusion constraint | The dossier recorded an explicit instruction that Iran-specific components be excluded. This repo's demo data uses an internationally distributed, fictional set of parks/regions (North America, Western Europe, Nordics, Southeast Asia, MENA is listed as a region type but has no seeded park, Latin America) with no Iran-specific content, consistent with that constraint | HONORED |
| Real customers / usage / revenue | **Not fabricated anywhere in this repo.** | NOT APPLICABLE |
| Security implementation | Real for what exists (tenant-scoped data access patterns in the repository layer, no secrets committed); the "auth" is an explicit, disclosed demo cookie, not real authentication. See [SECURITY.md](SECURITY.md) | PARTIAL / DISCLOSED |
| Automated tests | Real tests for the matching engine, formatters, and fixture referential integrity. No component/E2E test suite — see [TESTING.md](TESTING.md) | PARTIAL |
| Deployment | Runs locally via `npm run dev` / `npm run build`. No hosted deployment exists. See [DEPLOYMENT.md](DEPLOYMENT.md) | NOT DEPLOYED |

## What is real vs. simulated in this repository

- **Real:** the Next.js app, every component and page, the TypeScript data
  model, the matching engine (`src/lib/matching.ts` — a genuine, runnable,
  tested scoring function), the demo session cookie mechanism, the automated
  tests, and any interaction you perform while using the running app (though
  none of it persists — see below).
- **Simulated / demo data:** every startup, investor, park, event, deal, and
  user persona in `src/lib/data/` is fictional, hand-authored seed data. It is
  labeled `DEMO DATA` throughout the UI and in this documentation.
- **Not implemented:** a database, real authentication, billing/payments,
  email delivery, the scraping/ingestion pipeline, file storage for real
  uploaded documents, and any hosted deployment. See
  [LIMITATIONS.md](LIMITATIONS.md) for the authoritative, exhaustive list.

See [LIMITATIONS.md](LIMITATIONS.md) and [DEMO.md](DEMO.md) for the up-to-date
statement of what's real versus mocked, and [PORTFOLIO_CASE_STUDY.md](PORTFOLIO_CASE_STUDY.md)
for the narrative version of this same story.
