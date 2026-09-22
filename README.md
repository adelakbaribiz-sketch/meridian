# Meridian

**Meridian** is a multi-role SaaS platform concept that connects science &
technology parks, venture investors, startups, and event organizers around one
shared, structured view of an innovation ecosystem — with transparent,
explainable matching instead of manual introductions.

> **This is a portfolio/demo project.** There is no real company, fund,
> customer, or transaction behind it. Every startup, investor, park, event,
> and deal in the app is fictional seed data written for this prototype. See
> [docs/LIMITATIONS.md](docs/LIMITATIONS.md) for the exhaustive, honest
> breakdown of what is real vs. simulated.

**Status:** Prototype / MVP demo. See [docs/PORTFOLIO_CASE_STUDY.md](docs/PORTFOLIO_CASE_STUDY.md).

---

## Problem

Parks, VCs, startups, and event organizers currently coordinate through
spreadsheets, inboxes, and personal networks. Matchmaking between founders and
investors is manual and doesn't scale past a program's founder's personal
Rolodex, and an introduction made at a demo day rarely has a structured home
afterward.

## Solution

Meridian gives every role a shared data model — startup and investor profiles,
park rosters, events, and a deal room — plus a transparent scoring model that
ranks startup↔investor fit on four inspectable factors (industry, stage,
geography, traction signal) instead of a black-box number. See
[docs/PRODUCT_REQUIREMENTS.md](docs/PRODUCT_REQUIREMENTS.md) for the full
feature scope and what was deliberately left out of this MVP.

## Features (this prototype)

- **Role-aware dashboards** for Park Manager, VC Manager, Startup Founder,
  Event Organizer, and Admin personas
- **Startup & investor directories** with search, filtering, and detail pages
- **Explainable matching** — a real, deterministic scoring function (not a
  trained ML model) with a score breakdown visualized as a "match compass"
- **Events** with registration state and an on-site match matrix
- **Deal room** — kanban pipeline, document status tracking, NDA state
- **Settings, onboarding wizard, and realistic empty/loading/error states**
  throughout
- **Light & dark themes**, responsive down to mobile width

## Screenshots

| Landing page | Role dashboard (VC Manager) |
|---|---|
| Hero, problem framing, transparent-matching explainer, proposed pricing | KPIs, deal pipeline funnel, top AI-suggested matches |

| Deal room (kanban) | Startup profile |
|---|---|
| Pipeline by stage, drag-free kanban, document status | Match compass, top investor matches, deal activity |

*(Run the app locally to see these live — see Quickstart below.)*

## Tech stack

- **Framework:** Next.js 16 (App Router, Turbopack), React 19, TypeScript
- **Styling:** Tailwind CSS v4 with a custom design system (CSS variables, no
  UI kit) — see [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md#visual-design-system)
- **Charts:** Recharts (bar charts), a hand-built SVG radial "match compass"
- **Data:** static, in-memory TypeScript fixtures behind a small repository
  layer (`src/lib/data/`) — **no database in this prototype**, see
  [docs/DATA_MODEL.md](docs/DATA_MODEL.md)
- **"Auth":** a demo session cookie, **not real authentication** — see
  [docs/SECURITY.md](docs/SECURITY.md)
- **Testing:** Vitest (unit tests for the matching engine, formatters, and
  fixture referential integrity)
- **Icons:** lucide-react

No `next/font/google` is used — see [docs/DECISIONS.md](docs/DECISIONS.md) for
why (network-restricted build environments).

## Quickstart

```bash
npm install
npm run dev
```

Open http://localhost:3000 (or the port printed in the terminal) and click
**"View live demo"** — pick any of the five personas on the login screen.
There is no password; see [docs/DEMO.md](docs/DEMO.md) for a guided tour of
what to click through for each role.

```bash
npm run build   # production build
npm run lint    # ESLint
npm test        # Vitest unit tests
```

## Project structure

```
src/
  app/              # Next.js App Router routes
    (app)/          # authenticated app shell — dashboard, startups, investors, ...
    login/, page.tsx, layout.tsx, globals.css
  components/
    ui/             # design-system primitives (Button, Card, Badge, Tabs, ...)
    layout/         # sidebar, topbar, mobile nav, theme toggle, role switcher
    domain/         # feature components (StartupCard, badges, wizards, ...)
    marketing/      # landing-page-only components
    charts/         # Recharts wrappers + the pipeline funnel
    match-compass.tsx
  lib/
    data/           # DEMO DATA fixtures + repository functions
    matching.ts     # the real, deterministic match-scoring engine
    session.ts      # demo session cookie (NOT real auth)
    types.ts, utils.ts, nav.ts
docs/               # see below
```

## Documentation

| File | What it covers |
|---|---|
| [PROJECT_CONTEXT.md](docs/PROJECT_CONTEXT.md) | Where this project came from, and the gap-analysis decisions made to turn a dossier into a demoable product |
| [PRODUCT_REQUIREMENTS.md](docs/PRODUCT_REQUIREMENTS.md) | Personas, features in vs. out of scope for this MVP |
| [ARCHITECTURE.md](docs/ARCHITECTURE.md) | System design, visual design system, how a real backend would slot in |
| [USER_FLOWS.md](docs/USER_FLOWS.md) | Step-by-step flows per persona |
| [API_SPEC.md](docs/API_SPEC.md) | Current internal data-access "API" and the REST API a real backend would expose |
| [DATA_MODEL.md](docs/DATA_MODEL.md) | Entity model, relationships, what's fixture vs. what a real DB schema would add |
| [SECURITY.md](docs/SECURITY.md) | What's real, what's a demo shortcut, what a production build needs |
| [ROADMAP.md](docs/ROADMAP.md) | What's next, in priority order |
| [DECISIONS.md](docs/DECISIONS.md) | Notable engineering decisions and why |
| [DEMO.md](docs/DEMO.md) | Guided walkthrough + demo personas |
| [DEPLOYMENT.md](docs/DEPLOYMENT.md) | How to run this locally / deploy it |
| [TESTING.md](docs/TESTING.md) | What's tested, what isn't, and why |
| [LIMITATIONS.md](docs/LIMITATIONS.md) | The exhaustive real-vs-simulated ledger |
| [CHANGELOG.md](docs/CHANGELOG.md) | Notable changes |
| [PORTFOLIO_CASE_STUDY.md](docs/PORTFOLIO_CASE_STUDY.md) | What I built, why, and what I'd do next |

## Business & product overview

- **Problem:** ecosystem data and matchmaking between parks, investors, and
  startups is fragmented and manual.
- **Target customer:** science/technology parks and mid-size VC funds first
  (they have the coordination pain and a budget); startups and event
  organizers as secondary, network-effect-driven users.
- **Differentiation:** one platform spanning directory + explainable matching
  + event matching + deal room, instead of a point solution for one piece.
- **Monetization:** proposed seat/tier subscription (see the pricing section
  on the landing page and [docs/ROADMAP.md](docs/ROADMAP.md)) — **not
  implemented, not validated with any real customer.**
- **Current stage:** prototype/demo — no billing, no real accounts, no
  production deployment.

## License

MIT — see [LICENSE](LICENSE). Portfolio project; not affiliated with any real
company, fund, or park named or alluded to in the demo data.
