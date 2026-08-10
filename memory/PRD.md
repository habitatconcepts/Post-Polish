# Post & Polish — PRD

## Original problem statement
User supplied a full brand framework for **Post & Polish**, a specialist mailbox
replacement / repair / curbside refresh brand ("we're not in the mailbox business,
we're in the business of fixing neglected first impressions"), plus a static v1
HTML landing page. Goal: turn it into a real, frictionless digital presence with
clear flat-rate tiers and low-friction booking.

## User personas
- **Homeowner with an eyesore** — leaning/rusted box, embarrassed by the front view, wants it gone this week.
- **HOA-pressured homeowner** — needs a compliant, style-matched install fast.
- **Storm / vehicle damage** — urgent, mail delivery blocked.
- **Curb-appeal upgrader** — wants the front-of-home to look intentional.

## Core requirements (static)
- Specialist positioning, never "handyman". Premium, trusted-local-institution feel.
- Five R's: Replace, Reset, Refresh, Recover, Upgrade.
- Flat-rate, all-inclusive tiers (hardware + labor + haul-away + cleanup).
- Before/after visual proof as the primary marketing asset.
- Booking in under two minutes, no phone tag.
- Internal place to see and work the leads.

## Architecture
- React 19 (CRA + craco), Tailwind, shadcn/ui, framer-motion, Lenis smooth scroll, react-fast-marquee.
- FastAPI + Motor/MongoDB. All routes under `/api`.
- JWT admin auth (bcrypt hash, httpOnly cookies + Bearer fallback), seeded admin, account-keyed brute-force lockout (5 fails / 15 min).

## Implemented (2026-06)
- Landing page: hero with pain-point checklist, trust ribbon marquee, five R's bento grid,
  pricing tiers, draggable before/after slider, 4-step process + Recover priority banner,
  FAQ accordion, 2-step booking form, footer.
- Pricing tiers: **The Standard $299**, **The Upgrade $699** (most popular), **The Landscape from $1,499** (call for a firm quote).
- Booking: `POST /api/leads` (public) persists to MongoDB; package/CTA clicks preselect the service.
- Admin: `/admin/login` + `/admin` dashboard — stat cards, lead table, status pipeline
  (new/contacted/scheduled/completed/lost), status filters, refresh, logout.
- AI-generated placeholder hero and before/after photography.
- Tested: iteration_3 green — 20/20 backend, all requested frontend flows.

## Backlog
### P0
- Replace placeholder before/after photos with real job photos (gallery of multiple jobs).
- Email/SMS notification on new lead (Resend / Twilio) so leads aren't missed.
### P1
- Photo upload on the booking form (object storage) for photo-based quoting.
- Service-area check by ZIP before booking.
- Google reviews / testimonial section.
### P2
- Calendar slot selection with real availability.
- Deposit or full payment at booking (Stripe).
- Admin lead notes/timeline and CSV export.
- SEO: local business schema, per-service landing pages.

## Next tasks
1. Confirm real flat rates and swap in real job photography.
2. Wire new-lead email notifications to the owner.
3. Add booking-form photo upload.
