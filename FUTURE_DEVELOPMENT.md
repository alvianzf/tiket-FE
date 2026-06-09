# TiketQ Frontend (tiket-FE) — Possible Future Development

This document serves as an exhaustive future development roadmap and technical implementation plan specifically for the consumer-facing Next.js frontend application (`tiket-FE`). It details key functional updates, styling enhancements, performance optimizations, and integration steps to guide engineering teams in implementing new features in a consistent manner. It serves as a single source of truth for the frontend product roadmap and technical debt.

---

## Consumer Frontend Engineering Checklist

### Booking Flows

- [x] **Round-trip flight booking** — Added One Way / Round Trip toggle to `SearchFlight`; return date picker; `FlightListContainer` shows two result sections for round trips with sequential outbound/return selection.
- [x] **Multi-city / stopover flights** — Multi-City tab in `SearchFlight` with up to 4 segments; `FlightListContainer` shows per-segment results in sequence; navigates to checkout with all booking codes.
- [x] **Infant and child seat selection** — Cabin class selector (Economy/Business) added to adult, child, infant checkout forms; lap infant toggle on infant form.
- [x] **Ferry return trip booking** — `FerryListContainer` handles `type=round_trip`: shows outbound trips first, then return trips after selection; `FerryPassengerContainer` passes `returnDate` to booking API.
- [ ] **Seat map selection** — Not supported by provider APIs (only `availableSeats` count returned, no layout data).
- [ ] **Add-on baggage selection** — Baggage is purchased at the airport/check-in counter, not via OTA. Out of scope.

### User Account & Profile

- [ ] **My Bookings page** — Authenticated users should see a history of their `Transaction` records, linked by email. Requires a `GET /api/auth/bookings` backend endpoint.
- [ ] **Booking cancellation flow** — UI and backend logic to cancel `PENDING` bookings and optionally trigger Midtrans refunds.
- [ ] **E-ticket resend by email** — Button on the Eticket page to re-trigger the email service (`emailService.js`).
- [ ] **Profile edit page** — The `ChangeProfileContainer` exists but may be incomplete. Fully wire up password change and username update to `PUT /api/auth/users/:id`.
- [ ] **Social login (Google/Facebook)** — Integrate Firebase Auth or a similar OAuth provider.

### Search & Discovery

- [ ] **Flight price calendar** — A month-view calendar showing the cheapest available price per day (leverages `search_cheapest_flight_in_range` backend query logic adapted for UI).
- [ ] **Live price alerts** — Email/push notification when a route drops below a user-defined price threshold.
- [ ] **Popular routes section** — Static or dynamically pulled popular/frequently booked routes displayed on the homepage.
- [ ] **Flexible date search** — "I'm flexible" mode that searches ±3 days from the selected date.

### Car Rental Flow

- [ ] **Complete car rental booking flow** — `CarRentalForm` and `CarRentContainer` exist but the end-to-end payment and confirmation flow needs to be verified and completed.
- [ ] **Car availability calendar** — Show blocked/available dates for each car based on existing `CarRentalRequest` records.
- [ ] **Driver license upload** — Add KTP/SIM upload step to the frontend booking form (backend already has `ktpImage` and `ktpSelfie` fields).

### Performance & User Experience (UX)

- [x] **Progressive Web App (PWA)** — `@ducanh2912/next-pwa` installed; service worker + `public/manifest.json` added; disabled in development, enabled in production. Offline fallback page at `/offline`.
- [x] **Skeleton loading states** — `FerryCardSkeleton` and `CarCardSkeleton` created; wired into `FerryListContainer` and `CarRentContainer` replacing spinners.
- [x] **Image optimization** — Audit complete: no raw `<img>` tags found in any `.tsx` file; all images already use Next.js `<Image>` component with `remotePatterns` configured.
- [x] **Infinite scroll on flight results** — `react-intersection-observer` installed; `FlightListContainer` now renders 10 flights at a time and loads more as the sentinel div enters the viewport. Resets on filter/route change.
- [x] **Error boundary improvements** — Granular `<ErrorBoundary FallbackComponent={ContainerError}>` added to each container page (flights, ferry list, car rent); `ContainerError` component provides retry button.

### Internationalization (i18n)

- [ ] **Complete i18n coverage** — Audit all hardcoded English/Indonesian strings. Any text not in `en.json` / `id.json` must be extracted to the locale files.
- [ ] **Language selector persistence** — Store the user's selected language preference in `localStorage` so it persists across sessions.
- [ ] **Add additional languages** — Malay (`ms`) and Mandarin (`zh`) for broader ASEAN reach.

### Chatbot UI & Support

- [ ] **Proactive booking suggestions** — Chatbot suggests trips based on user's past bookings or search history.
- [ ] **Voice input** — Integrate Web Speech API for hands-free chatbot interaction on mobile.
- [ ] **Chatbot feedback loop** — Thumbs up/down on AI responses to log quality metrics.

---

## Infrastructure & Cross-Cutting Features (FE Relevance)

- [ ] **Unified monorepo tooling** — Set up a Turborepo or Nx workspace at the `/tiketq/` root for shared scripts and dependency management.
- [ ] **Shared TypeScript types package** — Extract shared types (Transaction, Booking, Passenger) into a local `@tiketq/types` package consumable by both `tiket-FE` and `tiket-admin`.
- [ ] **Docker Compose for local dev** — Support single `docker-compose.yml` at root to spin up frontend along with database, redis, backend, and admin.
- [ ] **CDN for static assets** — Serve Next.js static files and PDF assets via Cloudflare or AWS CloudFront.
- [ ] **GDPR/Privacy compliance** — Add data deletion endpoint/request in UI (`DELETE /api/auth/me`) and cookie consent banner.
