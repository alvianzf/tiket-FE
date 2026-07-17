# 00 — Product Overview

> Software Design Document for **tiket-FE**, the consumer-facing booking application of the TiketQ travel platform.
> This document set is grounded in the actual source under `tiket-FE/`. Where the code and legacy documentation disagree, the code is authoritative.

---

## 1. Purpose

`tiket-FE` is the public, consumer-facing web application through which travellers search, book, pay for, and retrieve tickets for:

- **Flights** — one-way, round-trip, and multi-city (up to 4 segments), issued through the Lion Air provider.
- **Ferries** — international/domestic ferry crossings (e.g. Batam ↔ Singapore) with passport-bearing passengers.
- **Car rentals** — Batam-area car rental requests (with driver + fuel), submitted as a lead/request rather than an instantly-issued ticket.

The application also embeds an **AI booking assistant** (chatbot) that can search flights/ferries and drive a conversational booking + payment flow entirely over Socket.io.

It is the customer front-end of a three-project monorepo (see the repository-root `CLAUDE.md`): the Express/Prisma backend `tiketq-bosbiller` serves the REST API and Socket.io server; `tiket-admin` is the internal operations dashboard. `tiket-FE` never talks to the database directly — it consumes the backend REST + realtime surface only.

## 2. Scope

**In scope** for this application and this spec set:

- Search and result rendering for flights, ferries, and car rentals.
- The checkout workflow: contact + passenger data collection with `react-hook-form` + `yup` validation.
- Payment via **DANA only** — DANA wallet redirect and BNI/BRI/MANDIRI virtual accounts (see `05-PAYMENTS.md`).
- E-ticket retrieval, advanced by realtime `booking:update` Socket.io pushes (no polling).
- The AI chatbot widget and its tool-result rendering.
- Internationalization (English / Indonesian), responsive layout, and the glassmorphism design system.

**Out of scope** (owned by other projects or not present in `tiket-FE`):

- Payment settlement, webhook verification, ticket issuance, DANA SNAP signing — all backend (`tiketq-bosbiller`).
- Admin/operations tooling — `tiket-admin`.
- A full authenticated user account system. Login/Register modals exist in the UI (`LoginForm`, `RegisterForm`) but the primary booking flows are keyed off booking codes carried in URL query strings, not a session-bound user. This is noted as a current-state gap in `07-NON-FUNCTIONAL.md`.

## 3. Target Users & Platforms

- **Primary users:** retail travellers in Indonesia booking flights, ferries, and cars.
- **Platforms:** responsive web, designed for **both mobile and desktop**. The single layout breakpoint is Tailwind `lg` (1024px); below it the app is a mobile experience with a burger-menu navbar (see `03-DESIGN-SYSTEM-AND-UI.md` and `07-NON-FUNCTIONAL.md`).
- **Locales:** Indonesian (`id`, default) and English (`en`), switchable at runtime from the navbar language switcher.

## 4. High-Level Feature List

| Feature | Entry point | Primary container(s) |
|---|---|---|
| Flight search (one-way / round-trip / multi-city) | `/` (home) | `HomeContainer`, `SearchFlight` |
| Flight results + filter/sort + infinite scroll | `/flights` | `FlightListContainer` |
| Flight checkout (contact + passengers) | `/checkout` | `CheckoutContainer` → `Checkout` |
| Flight payment (DANA) | `/checkout/payment` | `PaymentContainer` → `DanaPayment` |
| Flight e-ticket | `/eticket` | `EticketContainer` |
| Ferry search | `/ferry`, `/ferry/find` | `FerryFindContainer`, `SearchFerry` |
| Ferry results | `/ferry/list` | `FerryListContainer` |
| Ferry passenger + contact entry | `/ferry/passenger` | `FerryPassengerContainer` |
| Ferry payment (DANA) | `/ferry/payment` | `FerryPaymentContainer` → `DanaPayment` |
| Ferry success | `/ferry/success` | `FerrySuccessContainer` |
| Car rental search | `/car-rent`, `/car-rental` | `CarRentContainer` |
| Car rental request form | `/car-rental/rent` | `CarRentalFormContainer` → `CarRentalForm` |
| DANA payment-return landing | `/dana-transaction-status` | `DanaTransactionStatusContainer` |
| AI chatbot | global (rendered in `_app.tsx`) | `ChatBot` + `useChatSocket` |

## 5. Glossary

| Term | Meaning |
|---|---|
| **Container** | A page-level React view under `src/containers/` that invokes data hooks and side effects. See `01-ARCHITECTURE.md`. |
| **Component** | A reusable, largely presentational element under `src/components/`. |
| **`booking:update`** | Socket.io event emitted by the backend when a booking's payment/issuance status changes; drives e-ticket advancement (see `02-STATE-AND-DATA.md`). |
| **`searchId`** | Provider-issued, single-use identifier for a specific flight fare; a booking spends it. |
| **`bookingCode` / `bookingNo`** | Human-facing booking reference used across checkout, payment, e-ticket, and realtime matching. |
| **DANA** | The Indonesian e-wallet + virtual-account payment gateway; the platform's only payment method. |
| **VA** | Virtual Account — a per-transaction bank account number the user transfers to (BNI/BRI/MANDIRI). |
| **REDIRECT** | DANA-wallet payment mode: the browser is redirected to DANA to authorize payment. |
| **Glassmorphism** | The design language: frosted, translucent surfaces with backdrop blur. See `03-DESIGN-SYSTEM-AND-UI.md`. |
| **CTA orange** | Brand call-to-action colour `#FF5A00`, mapped to MUI `warning`. |

## 6. Specification Index

| File | Contents |
|---|---|
| `00-OVERVIEW.md` | This document — purpose, scope, users, feature list, glossary. |
| `01-ARCHITECTURE.md` | Tech stack, Container vs Component pattern, directory map, page composition. |
| `02-STATE-AND-DATA.md` | React Query hook registry, shared Axios client, the no-`refetchInterval` rule, Socket.io + query integration. |
| `03-DESIGN-SYSTEM-AND-UI.md` | MUI v9 glassmorphism theme, the `Button` wrapper, Tailwind glass utilities, the navigation rule, responsiveness. |
| `04-USER-FLOWS.md` | End-to-end flight / ferry / car-rental flows with sequence and flow diagrams. |
| `05-PAYMENTS.md` | DANA payment UI: picker, wallet redirect vs VA, create-order client, PAY_RETURN landing. |
| `06-AI-CHATBOT.md` | `useChatSocket` hook, chat events, `ChatMessage` tool-result rendering. |
| `07-NON-FUNCTIONAL.md` | i18n, responsiveness, performance, accessibility, mobile keyboard conventions, known gaps. |
