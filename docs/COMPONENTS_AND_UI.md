# UI Architecture & Component Map

This document defines the structural rules and directory conventions for the `tiket-FE` frontend application. It maps every component in `/src/components`, every container in `/src/containers`, and every layout in `/src/layouts` to its specific role and responsibility. It also documents the strict navigation pattern required by Next.js 14 and NextUI — specifically why `onClick`-based routing causes a known double-click bug and what the correct `<Button as={Link}>` pattern is. Any developer adding a new page, component, or navigation element must read this document first.

## The Navigation Bug Rule

**CRITICAL RULE FOR AI:** Do not use `onClick` handlers combined with state modifications on `<Link>` components, nor `onPress={() => router.push()}` on NextUI `<Button>` components.

**Correct:**

```tsx
<Button as={Link} href="/about">About</Button>
<Link href="/about">About</Link>
```

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

### `/src/containers` (Page-Level Views)

These components wrap entire pages, invoke `react-query` hooks, and handle side effects.

- `HomeContainer`: Landing page.
- `FlightListContainer`, `FerryListContainer`: Search result pages.
- `EticketContainer`: Display page for flight e-tickets. Listens to Socket.io for updates.
- `FerrySuccessContainer`: Display page for ferry e-tickets.
- `CheckoutContainer`, `PaymentContainer`: Multi-step payment workflows.
- `ChangeProfileContainer`: User profile management.

### `/src/layouts` (Wrappers)

- `AppLayout.tsx`: Standard layout containing `AppNavbar` and `Footer`.
- `CheckoutLayout.tsx`: Minimized layout used during payment to prevent user distraction.
