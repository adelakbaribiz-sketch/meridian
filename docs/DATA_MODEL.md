# Data Model

## Current state: TypeScript fixtures, not a database

All entities are defined as TypeScript interfaces in `src/lib/types.ts` and
populated as static arrays in `src/lib/data/*.ts`. There is no database, no
migrations, and nothing persists across a server restart. Counts as of this
writing: 14 startups, 10 investors, 6 parks, 6 events, 12 deals, 5 demo users.

## Entities

### Startup
`id, name, tagline, description, industries[], stage, region, founded,
teamSize, parkId (nullable), raisedToDate, seeking, arr, momGrowth, tags[],
website, profileCompleteness`

### Investor
`id, name, firmType, tagline, description, focusIndustries[], focusStages[],
focusRegions[], checkSizeMin, checkSizeMax, aum, portfolioCount, tags[],
activeSince`

### Park
`id, name, region, country, description, focusIndustries[], residentStartups,
programs[], founded`

### EcosystemEvent
`id, name, type, format, date, location, parkId (nullable), description,
capacity, registered, participantStartupIds[], participantInvestorIds[],
status`

### Deal
`id, startupId, investorId, stage, amount, createdAt, lastActivity, nextStep,
documents[] (DealDocument), ndaSigned`

### DealDocument
`id, name, type, status (pending/shared/signed/expired), updatedAt`

### DemoUser
`id, name, role, orgName, title` — the demo session identity, see
[SECURITY.md](SECURITY.md)

### Match (computed, not stored)
`startupId, investorId, score, breakdown { industry, stage, geo, signal },
reasons[]` — produced on demand by `scoreMatch()`, never persisted.

## Relationships

```
Park 1 ── * Startup        (Startup.parkId, nullable — a startup may be independent)
Park 1 ── * EcosystemEvent  (EcosystemEvent.parkId, nullable)
Startup 1 ── * Deal         (Deal.startupId)
Investor 1 ── * Deal        (Deal.investorId)
EcosystemEvent * ── * Startup   (participantStartupIds)
EcosystemEvent * ── * Investor  (participantInvestorIds)
```

These are plain id-string references, not enforced foreign keys — nothing in
TypeScript stops a typo'd id. `src/lib/data/integrity.test.ts` exists
specifically to catch that class of bug (every reference is checked to
resolve to a real record, ids are checked for uniqueness, and event
`registered` is checked to never exceed `capacity`).

## What a real schema would add

- Proper foreign keys + cascade rules (a real DB, e.g. PostgreSQL via Prisma)
- Multi-tenancy: a `Tenant` concept with row-level scoping (the dossier
  proposed Postgres RLS) — this prototype has role-based *views* but no real
  tenant data isolation, since everyone shares the same fixture arrays
- Audit log table (who changed what deal stage/document status, when)
- Real file storage for uploaded documents (currently: metadata only, no file
  bytes ever exist)
- A `users` table separate from the demo `DemoUser` fixture, with real
  credentials
- Timestamps as actual `Date`/`timestamptz` rather than ISO date strings
