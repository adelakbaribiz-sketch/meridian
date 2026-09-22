# Demo Guide

## Running it

```bash
npm install
npm run dev
```

Open the printed local URL. No environment variables are required — this
prototype has no external services to configure (see
[DEPLOYMENT.md](DEPLOYMENT.md)).

## Demo credentials

**There are none — that's intentional.** `/login` shows five persona cards;
click one to enter the app as that persona. See [SECURITY.md](SECURITY.md)
for why this is explicitly not real authentication.

| Persona | Name | Org |
|---|---|---|
| Park Manager | Priya Andersson | Harborview Innovation Quarter |
| VC Manager | Marcus Feld | Northgate Capital Partners |
| Startup Founder | Iman Osei | Glacius Thermal |
| Event Organizer | Lena Kowalski | Meridiana Digital Park |
| Admin | Sam Whitfield | Meridian (platform) |

## Suggested walkthrough (~5 minutes)

1. **Landing page** (`/`) — read the hero and the "How Meridian works" steps;
   scroll to the "Every match shows its work" section to see the real scoring
   formula and an example `MatchCompass`.
2. **Log in as VC Manager (Marcus Feld).** The dashboard shows a real deal
   pipeline funnel and the top AI-suggested startup matches for Northgate
   Capital Partners, computed live from `src/lib/matching.ts`.
3. Click into a match → lands on a startup profile
   (`/startups/su-glacius`). Note the "Top investor matches" section and try
   **"Request introduction"** — watch the toast and button state change (a
   disclosed demo action, not persisted).
4. Go to **Deal Room** (`/deals`) — a kanban pipeline grouped by stage. Click
   any card to see its document list and NDA status.
5. Go to **Events** (`/events`) → open an event with participants (e.g.
   "Harborview Climate & Manufacturing Demo Day") to see the **on-site match
   matrix** — every participating startup scored against every participating
   investor.
6. **Switch personas** via the avatar menu (top right) → try Startup Founder
   or Park Manager to see how the dashboard and available actions change.
7. Toggle **dark mode** (moon/sun icon, top right) and try a mobile-width
   viewport to see the responsive layout and mobile nav drawer.

## What to look at in the code, not just the UI

- `src/lib/matching.ts` — the scoring engine, fully unit-tested
  (`matching.test.ts`)
- `src/lib/data/index.ts` — the repository layer every page calls through
- `src/lib/session.ts` — the demo session mechanism, with inline disclosure
  comments
- `src/lib/data/integrity.test.ts` — a test that specifically guards against
  broken references in the hand-authored fixture data
