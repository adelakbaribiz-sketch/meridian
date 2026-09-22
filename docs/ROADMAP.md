# Roadmap

Everything below is **PROPOSED** — none of it is scheduled, funded, or
committed to. Ordered roughly by what would need to happen first for this to
become a real product, not by any external deadline.

## Phase 1 — Make the demo persuasive (mostly done)

- [x] Core directories (startups, investors, parks) with search/filter
- [x] Explainable matching engine + visualization
- [x] Events with on-site match matrix
- [x] Deal room (kanban + document/NDA tracking)
- [x] Role-aware dashboards for all 5 personas
- [x] Full UI states (empty/loading/error/success), light+dark themes
- [ ] Component/E2E test coverage (currently: unit tests only — see
      [TESTING.md](TESTING.md))
- [ ] Real screenshots/GIFs embedded in the README

## Phase 2 — Real data layer

- [ ] PostgreSQL + an ORM (Prisma, matching the sibling patterns used
      elsewhere in this portfolio) behind the existing repository-layer
      functions — pages shouldn't need to change, see [ARCHITECTURE.md](ARCHITECTURE.md)
- [ ] Real authentication (replace the demo cookie) with hashed credentials
      or OAuth
- [ ] Row-level tenant scoping
- [ ] Persist every "demo action" (introduction requests, registrations,
      settings changes) for real

## Phase 3 — Real matching + data ingestion

- [ ] Replace the Jaccard industry-overlap term with a real embedding model
      (e.g., `text-embedding-3-small`, as the source dossier proposed) once
      there's enough real profile text to embed meaningfully
- [ ] Build (or integrate) at least one real external data source — starting
      with something with a public API (e.g., Crunchbase's or Eventbrite's)
      rather than scraping, to avoid ToS and legal risk on day one
- [ ] Human-in-the-loop feedback (like/pass) feeding back into match ranking

## Phase 4 — Monetization

- [ ] Payment integration (Stripe) for the proposed subscription tiers — see
      the landing page's "Proposed pricing" section
- [ ] Usage metering (match views, event seats) if tiers gate by usage
- [ ] A real go-to-market: pilot with 1-2 real parks before building
      anything else in this phase

## Phase 5 — Scale-outs from the original dossier (lower priority)

- [ ] Multi-language / RTL support
- [ ] Analytics/reporting warehouse (the dossier proposed ClickHouse) once
      there's enough real usage data to warrant it
- [ ] Public API for third-party integrations (see [API_SPEC.md](API_SPEC.md))

## Explicitly not planned

- Reproducing the dossier's speculative multi-year revenue projections as if
  they were forecasts for this actual codebase — see
  [PROJECT_CONTEXT.md](PROJECT_CONTEXT.md) for why those numbers are not
  carried into this repo.
