# Changelog

All notable changes to this project are recorded here. This project has not
been released/versioned beyond `0.1.0`; entries are grouped by development
milestone rather than by semver release.

## 0.1.0 — Initial prototype (2026-09-22)

### Added

- Next.js 16 App Router application scaffold (TypeScript, Tailwind CSS v4)
- Custom visual design system: warm/ink color tokens, serif+sans type
  pairing via system fonts, hand-built UI primitives (`src/components/ui/`)
- Data model and fixtures for startups, investors, parks, events, deals, and
  demo user personas (`src/lib/types.ts`, `src/lib/data/`)
- Deterministic, explainable matching engine (`src/lib/matching.ts`) plus the
  "match compass" SVG visualization
- Demo session mechanism (cookie-based persona switching, no real auth)
- Pages: marketing landing page, login/persona picker, role-aware dashboard,
  startups (list + detail), investors (list + detail), parks (list + detail),
  matches, events (list + detail with on-site match matrix), deal room
  (kanban + detail), settings, onboarding wizard, 404, global error boundary
- Vitest unit tests for the matching engine, formatters, and fixture
  referential integrity
- GitHub Actions CI workflow (lint, build, test)
- Full documentation suite under `docs/`

### Decisions of note

See [DECISIONS.md](DECISIONS.md) — notably: no `next/font/google` (network-
restricted build environment), single Next.js app instead of the source
dossier's multi-service architecture, deterministic scoring instead of a
trained ML model.
