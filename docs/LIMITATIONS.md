# Limitations — the honest, exhaustive ledger

This is the single source of truth for what's real vs. simulated in this
repository. If any other doc or UI copy seems to conflict with this file,
trust this file.

## REAL

- The Next.js/React/TypeScript application itself — every page, component,
  and route actually renders and functions as shown.
- The matching engine (`src/lib/matching.ts`) — a genuine, deterministic,
  unit-tested scoring function. Not a stub, not a random number.
- The demo session mechanism (`src/lib/session.ts`) — a working cookie-based
  role switcher, correctly scoped and expiring, though not a security
  boundary (see [SECURITY.md](SECURITY.md)).
- Automated tests (`npm test`) and the CI workflow that runs them.
- Light/dark theming and responsive layout — both genuinely implemented and
  browser-verified, not just claimed.
- Every UI interaction's *client-side* behavior (filters, tabs, the
  onboarding wizard, toasts) — these really execute in the browser.

## IMPLEMENTED (with a disclosed simplification)

- **Matching "AI"** — real weighted scoring, not a trained embedding model.
  See [ARCHITECTURE.md](ARCHITECTURE.md#matching-engine) and
  [DECISIONS.md](DECISIONS.md).
- **Deal-room kanban** — real, data-driven grouping by stage; not
  drag-and-drop, see [DECISIONS.md](DECISIONS.md).

## MOCKED / DEMO DATA

- Every startup, investor, park, event, deal, and demo user persona
  (`src/lib/data/*.ts`) is fictional, hand-authored seed data. No real
  company, fund, park, or person is represented, named, or implied.
- KPI numbers, chart data, and "recent activity" feeds on every dashboard are
  computed from that same fictional seed data — the computation is real, the
  underlying data is not.

## SIMULATED / NOT PERSISTED

- Every "write" action in the app — "Request introduction," "Register" for an
  event, "Save changes" in Settings, "Invite teammate," the onboarding wizard
  — shows realistic success feedback (a toast, a button state change) but
  **does not persist anything**. Refreshing the page reverts all of it. Each
  of these is labeled "(Demo action — not persisted.)" in its own toast.

## NOT IMPLEMENTED

- **No database.** All data is in-memory TypeScript arrays, reset on every
  server restart and shared across all visitors/personas (there is no
  per-visitor data isolation).
- **No real authentication.** See [SECURITY.md](SECURITY.md) in full — the
  login screen is a persona picker with no password.
- **No billing/payments.** The pricing section on the landing page is
  explicitly labeled "Proposed — not validated" and no payment flow exists
  anywhere.
- **No external data ingestion / scraping.** No Crunchbase, Dealroom,
  LinkedIn, Eventbrite, or any other integration exists. This was a
  significant part of the source dossier's vision and is out of scope for
  this MVP — see [PROJECT_CONTEXT.md](PROJECT_CONTEXT.md) and
  [ROADMAP.md](ROADMAP.md).
- **No real file storage.** Deal-room documents are metadata rows (name,
  type, status) with no underlying file.
- **No email delivery, no SSO/SAML, no MFA.**
- **No hosted deployment.** Runs locally only — see
  [DEPLOYMENT.md](DEPLOYMENT.md).
- **No real customers, revenue, investment, or usage data of any kind**, and
  none of the source dossier's speculative multi-year financial projections
  are reproduced anywhere in this repository.

## Known rough edges

- The deal-room kanban board's columns scroll horizontally on narrow screens
  rather than reflowing into a single column — a deliberate trade-off to keep
  the stage-by-stage pipeline view intact at the cost of some mobile
  ergonomics.
- Search/filtering on the Startups and Investors directories is client-side
  over the full fixture array — fine at demo scale (a few dozen records),
  would need to move server-side with a real database and larger datasets.
