# API Specification

## Current state: no HTTP API

This prototype has **no REST or GraphQL API** and no `route.ts` handlers.
Every page is a Server Component that calls the repository layer in
`src/lib/data/index.ts` directly during render, in-process — there is nothing
to call over HTTP because the "database" and the "server" are the same
Node process. See [ARCHITECTURE.md](ARCHITECTURE.md).

## The current internal "API": the repository layer

This is the real, typed contract every page and component actually programs
against (`src/lib/data/index.ts`):

| Function | Returns |
|---|---|
| `getStartup(id)` | `Startup \| null` |
| `getInvestor(id)` | `Investor \| null` |
| `getPark(id)` | `Park \| null` |
| `getEvent(id)` | `EcosystemEvent \| null` |
| `getDeal(id)` | `Deal \| null` |
| `dealsForStartup(startupId)` | `Deal[]` |
| `dealsForInvestor(investorId)` | `Deal[]` |
| `eventsForPark(parkId)` | `EcosystemEvent[]` |
| `startupsForPark(parkId)` | `Startup[]` |
| `startups`, `investors`, `parks`, `events`, `deals`, `demoUsers` | full arrays |

Plus the matching engine (`src/lib/matching.ts`), which is the closest thing
this repo has to a "smart" endpoint:

| Function | Signature | Behavior |
|---|---|---|
| `scoreMatch` | `(startup, investor) => Match` | Pure function, deterministic, see [ARCHITECTURE.md](ARCHITECTURE.md#matching-engine) |
| `topMatchesForStartup` | `(startup, investors[], limit) => Match[]` | Sorted descending by score |
| `topMatchesForInvestor` | `(investor, startups[], limit) => Match[]` | Sorted descending by score |

Session functions (`src/lib/session.ts`, Next.js Server Actions, **not real
auth** — see [SECURITY.md](SECURITY.md)):

| Function | Behavior |
|---|---|
| `getDemoUser()` | Reads the demo cookie, returns `DemoUser \| null` |
| `requireDemoUser()` | Same, redirects to `/login` if absent |
| `setDemoSession(userId)` | Sets the cookie, redirects to `/dashboard` |
| `clearDemoSession()` | Clears the cookie, redirects to `/` |

## Proposed REST API (not implemented)

If this became a real product with a separate data layer, the dossier's
proposed endpoint shape (adapted to this product's entities) is a reasonable
starting point:

```
GET    /api/v1/startups                 list + filter (industry, stage, region, query)
GET    /api/v1/startups/:id
GET    /api/v1/startups/:id/matches     top-N investor matches
POST   /api/v1/startups/:id/intro       request an introduction to an investor

GET    /api/v1/investors                list + filter
GET    /api/v1/investors/:id
GET    /api/v1/investors/:id/matches    top-N startup matches

GET    /api/v1/parks/:id/startups
GET    /api/v1/events                   list + filter (status, format, park)
GET    /api/v1/events/:id
POST   /api/v1/events/:id/register

GET    /api/v1/deals                    list + filter (stage, startup, investor)
GET    /api/v1/deals/:id
PATCH  /api/v1/deals/:id                 update stage/next step
POST   /api/v1/deals/:id/documents       attach a document
POST   /api/v1/deals/:id/nda/sign

POST   /api/v1/auth/login               real credential auth (replaces the demo cookie)
GET    /api/v1/auth/me
```

All of the above is **`PROPOSED`** — none of it exists in this codebase. See
[ROADMAP.md](ROADMAP.md) for sequencing if this were built out.
