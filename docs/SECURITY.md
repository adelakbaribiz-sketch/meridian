# Security

This document is intentionally blunt about what is and isn't real. Read this
before assuming any security property of this prototype.

## What is real

- **No secrets are committed.** There are no API keys, credentials, or
  connection strings anywhere in this repository (there's nothing external to
  authenticate to — see below).
- **The demo session cookie is `httpOnly` and `sameSite: lax`**, and scoped
  with a reasonable `maxAge` (8 hours) — standard cookie hygiene, even though
  the cookie itself carries no real security value (see below).
- **Every "write" action in the UI is a disclosed demo action** — buttons like
  "Request introduction," "Register," "Save changes," and the onboarding
  wizard's "Finish" all show a toast that says "(Demo action — not
  persisted.)" in the UI itself, not just in documentation. Nothing is
  silently faked as if it succeeded against a real backend.
- **Input is not reflected unsafely.** React's default JSX escaping is relied
  on throughout (no `dangerouslySetInnerHTML` anywhere in this codebase); form
  inputs are uncontrolled/local React state, not persisted or echoed into
  other users' views.

## What is explicitly NOT real

- **There is no authentication.** `/login` is a persona picker with no
  password. Selecting a card calls `setDemoSession(userId)`
  (`src/lib/session.ts`), a Server Action that sets a cookie naming which
  fixture user to render as. Anyone can set any role's cookie with zero
  verification. **Do not point this at real user data or treat the cookie as
  a security boundary of any kind.**
- **There is no authorization / tenant isolation.** Every persona can
  navigate to every URL (e.g. any deal's `/deals/[id]`) — the UI *shows*
  role-appropriate dashboards, but nothing server-side restricts which
  records a given role can read. A real implementation needs row-level
  scoping (the source dossier proposed PostgreSQL RLS) keyed off a real,
  verified identity.
- **There is no password storage, no hashing, no MFA, no SSO/SAML.**
- **There is no rate limiting, no CSRF token beyond `sameSite: lax`'s default
  protection, and no audit log** of who did what.
- **There is no real file upload.** Deal documents are metadata rows
  (`DealDocument`) with a name/type/status — no file bytes are ever accepted,
  stored, or served, so there is no file-upload attack surface to secure (or
  to worry about) in this prototype.
- **There are no external API integrations** (payment processors, email
  providers, data-source scrapers) — so there is nothing to leak credentials
  for.

## Dependency risk

Dependencies are limited to Next.js/React, Tailwind, Recharts, lucide-react,
clsx/tailwind-merge, and Vitest for testing — no dependency touches payments,
auth, or file handling, which keeps the supply-chain surface small on
purpose. Run `npm audit` before extending this project with new dependencies.

## What a production version would need (not built here)

- Real authentication (e.g., a managed provider — see the dossier's proposal
  of Clerk/NextAuth) with hashed credentials or OAuth, and MFA for VC/park
  admin roles handling deal-room documents
- Server-side authorization checks on every data-access function, keyed off a
  verified session — not just cookie presence
- Tenant-scoped queries (real RLS or equivalent) once there's a real database
- Encryption at rest for deal-room documents once real file upload exists
- An audit log table for compliance-sensitive actions (NDA signing, document
  access, stage changes)
- Dependency scanning and secret scanning in CI once real secrets exist to
  scan for
