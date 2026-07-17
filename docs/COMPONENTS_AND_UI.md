# UI Architecture & Component Map

This document defines the structural rules and directory conventions for the `tiket-FE` frontend application. It maps every component in `/src/components`, every container in `/src/containers`, and every layout in `/src/layouts` to its specific role and responsibility. It also documents the navigation pattern used with Next.js 14 and MUI — specifically why wiring navigation through `onClick`/`onPress` + `router.push()` is avoided (double-click bug) and what the correct MUI `<Button component={Link}>` pattern is. Any developer adding a new page, component, or navigation element must read this document first.

## UI Stack

`tiket-FE` uses **Material UI (MUI) v9** (`@mui/material`) as the component library, configured with a glassmorphism theme in `src/theme/theme.ts` (brand cornflower `#4267B2`, CTA orange `#FF5A00`, Montserrat, frosted translucent `Paper`/`Card` surfaces). **Tailwind CSS is still used** in a hybrid model: MUI components (styled via the `sx` prop) sit alongside Tailwind utility classes and the `.glass-card` / `.glass-navbar` utilities defined in `src/styles/global.css`. `@nextui-org` has been removed. Some component comments still reference "the old NextUI" look they replicate — those are historical notes, not live dependencies.

## The Navigation Bug Rule

**CRITICAL RULE FOR AI:** Do not wire navigation through `onClick`/`onPress` + `router.push()`, and do not combine `onClick` state changes with `<Link>` navigation on the same element (double-click bug). Render the button as a link instead.

**Correct (MUI):**

```tsx
<Button component={Link} href="/about">About</Button>
<Link href="/about">About</Link>
```

See `src/components/AppNavbar/index.tsx` for the reference implementation (`<Button component={Link} href={...}>`).

## Directory Map

### `/src/components` (Reusable UI Elements)

These components are stateless or contain localized state. They do not fetch data.

- `AppNavbar`: The main navigation header.
- `Footer`: The global footer.
- `ChatBot`: The Socket.io powered AI assistant widget.
- `SearchFlight`: The flight search form logic.
- `SearchFerry`: The ferry search form logic.
- `CarRentalForm`: Form for car rentals.
- `FlightCard`, `FerryCard`, `CarCard`: Display UI for search results.
- `PersonalDataForm`, `ContactForm`: Booking input fields.
- `LoginForm`, `RegisterForm`: Authentication modals.
- `Payment/DanaPayment`: DANA checkout payment picker (see Payment Flow below).
- `PaymentPartners`: Home-page row of accepted payment logos (DANA, BRI, Mandiri, BNI).

### `/src/containers` (Page-Level Views)

These components wrap entire pages, invoke `react-query` hooks, and handle side effects.

- `HomeContainer`: Landing page.
- `FlightListContainer`, `FerryListContainer`: Search result pages.
- `EticketContainer`: Display page for flight e-tickets. Listens to Socket.io for updates.
- `FerrySuccessContainer`: Display page for ferry e-tickets.
- `CheckoutContainer`, `PaymentContainer`: Multi-step payment workflows.
- `DanaTransactionStatusContainer`: DANA `PAY_RETURN` landing (route `/dana-transaction-status`). Shows a "checking payment" state and forwards to the e-ticket when the matching `booking:update` Socket.io push arrives (see Payment Flow below).
- `ChangeProfileContainer`: User profile management.

### `/src/layouts` (Wrappers)

- `AppLayout.tsx`: Standard layout containing `AppNavbar` and `Footer`.
- `CheckoutLayout.tsx`: Minimized layout used during payment to prevent user distraction.

## Payment Flow (DANA)

Checkout payment is handled by `Payment/DanaPayment.tsx` (methods created via `src/api/dana/index.ts` → `POST /api/dana/create-order`). The picker offers **DANA, BRI, MANDIRI, and BNI**, each shown with the same logos as the home-page `PaymentPartners`. BCA is intentionally omitted (not enabled for the DANA merchant) and QRIS is not offered in checkout.

- **DANA wallet** returns `kind: "REDIRECT"` — the browser is sent to `redirectUrl` to pay in the DANA app.
- **BRI / MANDIRI / BNI** return `kind: "VA"` — the component shows a copyable virtual-account number and a countdown to expiry.

After paying, DANA redirects the user to `/dana-transaction-status?bookingno=<code>` (`DanaTransactionStatusContainer`), which waits for the `booking:update` push and routes to `/eticket`. `DanaPayment` itself also subscribes to `booking:update` so a confirmed payment auto-advances to the e-ticket — no polling (see `STATE_AND_QUERIES.md`).

> The legacy manual bank-transfer page (`Payment/PaymentWaiting.tsx`) has been neutralized — it no longer shows any hardcoded personal account numbers and just points users back to the DANA checkout. The fabricated "Base Fare / Tax & Fees" breakdown was removed from `Checkout/CheckoutOrderSummary.tsx`, which now shows only the order total.
