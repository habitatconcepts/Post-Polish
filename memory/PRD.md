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
- Pricing tiers: **The Essential $349** (code-compliant install, quality retail wood or vinyl,
  removal + haul-away), **The Designer Series $699** (most popular — 220-grit hand-sanded finish,
  eased edges, premium paint/stain, integrated solar safety lighting, premium hardware),
  **The Signature Series — quote by project** (architectural builds, charred Shou Sugi Ban finishes,
  commercial & business builds: auto shops, real estate offices, themed displays).
- **Ritual of Quality** section: Professional Prep (811 checks + old post removal), Craftsman Finish
  (hand-sanded, leveled, wiped to a shine), The P&P Stamp (yard stake + clean worksite).
- Material matching note (wood, vinyl, decorative metal matched to siding/fencing/HOA) and a
  prominent "Request a Custom Quote" CTA band for Signature/commercial builds.
- Aesthetic: Deep Navy #0C1627, Brass #C5A059, Cream/Bone #F6F5F2, Cormorant Garamond serif headlines.
- Booking: `POST /api/leads` (public) persists to MongoDB; tier/CTA clicks preselect the service.
- Admin: `/admin/login` + `/admin` dashboard — stat cards, lead table, status pipeline
  (new/contacted/scheduled/completed/lost), status filters, refresh, logout.
- **Definitive NE Post & Polish logo** (eggshell enamel plate with burnt patina edges, maroon embossed
  serif wordmark, saturated navy hand-painted brush stroke, semi-transparent wood-grain post with a
  Fire Pit brown cap) applied to nav, footer, favicon, apple-touch-icon; page title and meta updated.
  Assets: `/app/frontend/public/logo-primary.png`, `logo-icon.png`, `apple-touch-icon.png`, `favicon.ico`.
  Raster only — an SVG rebuild is still open if large-format print is needed.- AI-generated placeholder hero and before/after photography.
- Tested: iteration_4 green — 20/20 backend, all requested frontend flows.

## Implemented (2026-09 — visual overhaul)
- Vector logo: `LogoMark.js` hand-authored SVG (eggshell plate + burnt patina, maroon embossed serif
  wordmark, navy hand-painted brush pull, wood-grain post with Fire Pit brown cap) used in nav + footer;
  raster PNG retained for favicon/apple-touch-icon.
- Kinetic hero: full-bleed photography with framer-motion scroll parallax, masked line-by-line
  headline reveal, staggered pain-points, scroll cue.
- New sections: **Manifesto** (4 numbered chapters), **Gallery — "Our latest transformations"**
  (6-item editorial grid), **Signature Showcase** (Shou Sugi Ban heritage bridge + themed muscle-car
  display, dual parallax, spotlight treatment), **Hand-Crafted** ("Driveway to curbside" — driveway
  workshop + tools-of-the-trade, integrity-driven-builds copy), **Process** photo cards
  (stock selection / hardware / 220-grit finish). Slow editorial marquee replaces the trust ribbon.
- Lenis momentum scrolling; framer-motion reveals and micro-interactions throughout.
- All photography is the client's own work: 10 real project photos wired via `SHOTS` in content.js
  (three-post row with flowers, solar caps/finials close-up, charred Shou Sugi Ban timber stack,
  Mustang display build, driveway bracket assembly, charred arbour frame, raw bevelled blanks,
  tool tray, prepped mailboxes, stain can). Each section shows a different shot. No AI imagery.
- **Proof slider** (`ProofSlider.js`): honest raw-stock → charred-and-assembled transformation
  ("The same timber, forty hours apart") — the client has no true curbside before/after pair yet.
- Hero is a two-column layout (copy left, right-edge framed parallax portrait panel) because the real
  hero photo is portrait; mobile falls back to a full-bleed background.
- Lead alert emails: Resend + FastAPI BackgroundTasks (`send_lead_alert`), safe no-op until
  `RESEND_API_KEY` + `LEAD_ALERT_EMAIL` are set.
- Tested: iteration_6 green — 20/20 backend, all new sections, 0 broken images, 0 console errors.

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
1. **Blocked — awaiting user key**: lead alert emails. Code path is live via Resend + BackgroundTasks
   but no-ops until `RESEND_API_KEY` and `LEAD_ALERT_EMAIL` are set in `/app/backend/.env`.
2. A true curbside before/after pair (same property, old post then new) would let the proof slider
   sell the customer outcome rather than the material transformation.
3. More installed-at-the-curb photos — most current shots are bench/workshop stage.
4. Add booking-form photo upload (object storage) for photo-based quoting.
