# Product Requirements

## Personas

| Persona | Goals | Primary screens |
|---|---|---|
| **Park Manager** | Track resident startups, run events, report ecosystem outcomes | Dashboard, Startups, Events, Parks |
| **VC Manager** | Source deals via explainable matches, manage a pipeline | Dashboard, Matches, Deal Room, Investors |
| **Startup Founder** | Maintain a fundraising profile, see investor fit, register for events | Dashboard, Matches, Deal Room, Startups (own profile) |
| **Event Organizer** | Create/run events, see registration and on-site match matrix | Dashboard, Events |
| **Admin** | Platform-wide visibility across tenants and pipeline | Dashboard (platform-wide view) |

Demo personas for each role live in `src/lib/data/users.ts` and are selectable
with no password from `/login`.

## In scope for this MVP

- Directory browsing + search/filter for startups and investors
- Startup, investor, and park detail pages
- Explainable match scoring (deterministic, inspectable, see
  `src/lib/matching.ts`) surfaced on dashboards, a dedicated Matches page, and
  event detail pages (on-site match matrix)
- Events: list, detail, registration state (demo action), participant lists
- Deal room: kanban pipeline by stage, deal detail with document status list
  and NDA state
- Settings: profile, notification preferences (static), team list (static)
- A multi-step onboarding wizard (demo-only, does not persist)
- Full UI state coverage: empty, loading (route-level skeleton), error
  (global error boundary + 404), and success (toasts on demo actions)
- Light/dark theme, responsive layout down to mobile width

## Explicitly out of scope for this MVP

These are real, meaningful pieces of the original dossier's vision that are
**not built** here, and are called out explicitly rather than silently
assumed away:

- **External data ingestion** — no scraping, no Crunchbase/Dealroom/LinkedIn/
  Eventbrite integration, no proxy management. This is a substantial system in
  its own right (see the dossier's own scraping architecture) and building a
  believable subset of it would either be non-functional theater or a
  multi-week project; neither belongs in this MVP. See [ROADMAP.md](ROADMAP.md).
- **A trained ML matching model** — the matching engine is real, deterministic
  code, not a trained embedding model. See [ARCHITECTURE.md](ARCHITECTURE.md).
- **Real authentication, billing, and multi-tenant data isolation** — see
  [SECURITY.md](SECURITY.md).
- **A persistent database** — all data is in-memory fixtures; nothing you do
  in the running app is saved. See [DATA_MODEL.md](DATA_MODEL.md).
- **Drag-and-drop kanban** — the deal room pipeline is a real, data-driven
  kanban *view* (grouped by stage, computed from the fixture data), but cards
  cannot be dragged between columns in this MVP.
- **Real-time features** — no websockets/polling; every page is a normal
  request/response render.

## Success criteria for this prototype

- A visitor can go from the landing page to a role-specific dashboard with
  zero setup and understand, within the first screen, what the product does
  and that it's a demo.
- Every core entity (startup, investor, park, event, deal) has a working list
  view and detail view with real, non-trivial demo data.
- The matching feature is not just a number — a visitor can see *why* a score
  is what it is, and confirm the scoring logic is real by reading
  `src/lib/matching.ts`.
- `npm run build`, `npm run lint`, and `npm test` all pass with zero errors.
