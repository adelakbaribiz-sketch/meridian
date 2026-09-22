# User Flows

All flows start at `/` (landing page) or `/login`. None require an account —
selecting a persona on `/login` sets a demo session cookie (see
[SECURITY.md](SECURITY.md)) and redirects to `/dashboard`.

## Onboarding (demo)

```
START → / (landing) → "View live demo" → /login → pick persona
  → /dashboard (role-specific) → optional: /onboarding wizard (Organization
  → Focus → Team → Review) → /dashboard
```

The onboarding wizard is a self-contained demo flow reachable from the
sidebar-less areas; it does not gate access to the rest of the app and does
not persist anything (see the toast it shows on completion).

## Matchmaking (Startup Founder view)

```
/dashboard → "Top investor matches" → click a match
  → /investors/[id] → "Request introduction" (demo action, toast + button
  state change, not persisted) → /matches (full ranked list)
```

## Matchmaking (VC Manager view)

```
/dashboard → "Top AI-suggested matches" → click a match
  → /startups/[id] → review profile, fundraise data, deal activity
  → "Request introduction" (demo action)
```

## Event flow

```
/events → filter by scrolling/browsing → click an event → /events/[id]
  → "Register" (demo action) → review on-site match matrix (startup × investor
  pairs scored live) → click through to a participant's profile
```

## Deal flow

```
/deals (kanban by stage) → click a deal card → /deals/[id]
  → review documents (status: pending/shared/signed/expired), NDA state,
  next step → navigate to either side's profile
```

The kanban stages mirror the dossier's proposed pipeline: Prospect →
Contacted → Meeting → Due Diligence → Term Sheet → Closed (plus Passed, shown
separately).

## Admin flow

```
/login → Admin persona → /dashboard
  → platform-wide KPIs (total startups/investors/parks, pipeline value)
  → deals-by-stage funnel across the whole network
  → recent activity feed (deals sorted by last activity)
```

## Settings

```
/settings → tabs: Profile (edit + "Save changes" demo action) │
  Notifications (toggle preferences, static) │ Team (static roster +
  "Invite teammate" demo action)
```
