# Testing

## Automated tests

Run with:

```bash
npm test
```

Current suite (Vitest, 3 files / 17 tests, all passing):

| File | What it verifies |
|---|---|
| `src/lib/matching.test.ts` | The matching engine: scores stay within [0, 100], a fully-aligned pair outscores a fully-misaligned one, stage fit is scored independently of industry fit, every match has at least one human-readable reason, `topMatchesFor*` return results sorted descending and respect the requested limit. Also runs `scoreMatch` across the full startup × investor cross product from the real fixtures to make sure nothing throws or goes out of range on real data. |
| `src/lib/data/integrity.test.ts` | Referential integrity of the hand-authored demo fixtures: every deal's `startupId`/`investorId` resolves to a real record, every startup/event's `parkId` resolves to a real park, every event participant id resolves, no duplicate ids within any collection, and no event has `registered > capacity`. This is the test that would have caught real authoring typos during development. |
| `src/lib/utils.test.ts` | `formatCurrency` (whole-dollar and compact formatting) and `initials` (name → avatar initials). |

## What's NOT automated (and why)

- **No component tests** (React Testing Library) — the UI primitives are
  thin wrappers around standard HTML elements and Tailwind classes; the
  highest-risk logic (scoring, data lookups) is covered instead. This is a
  reasonable but real gap — see [ROADMAP.md](ROADMAP.md).
- **No E2E tests** (Playwright/Cypress) — every route and the primary flows
  (login → dashboard → match → request intro → deal room → event → settings)
  were manually exercised in a real browser during development, in both light
  and dark themes and at mobile viewport width, but that verification is not
  automated or repeatable in CI today.

## Manual verification performed during development

- `npm run build` — zero errors, all 16 routes compile
- `npm run lint` — zero errors, zero warnings
- `npm test` — 17/17 passing
- Browser walkthrough: landing page, login, all 5 role dashboards spot-checked
  (VC Manager dashboard fully verified interactively), startup/investor/deal/
  event detail pages, the deal-room kanban, the "Request introduction" and
  "Register" demo actions (toast + state change), dark mode toggle, and a
  375px-wide mobile viewport including the mobile nav drawer

## CI

`.github/workflows/ci.yml` runs lint, build, and test on every push and pull
request against `main`.
