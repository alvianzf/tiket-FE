# 07 — Non-Functional Requirements

> Cross-cutting qualities of `tiket-FE`: internationalization, responsiveness, performance, accessibility, and mobile input conventions — plus honestly-noted current-state gaps.
> Grounded in `src/utils/i18n/`, `src/locales/*`, `src/components/AppNavbar/index.tsx`, `docs/RESPONSIVE.md`, `src/theme/theme.ts`, `src/styles/global.css`, and the flow containers. See `03-DESIGN-SYSTEM-AND-UI.md` for the visual system these constrain.

---

## 1. Internationalization (i18next)

### Setup

- Engine: **i18next** + **react-i18next**, initialized in `src/utils/i18n/index.ts` with `intl-pluralrules` for plural forms.
- **Default language: `id` (Indonesian).** English (`en`) is the alternate.
- Interpolation uses a custom `%{var}` prefix/suffix (not the i18next default `{{var}}`), e.g. `t('tickets.passenger', { count })`.
- `keySeparator: '.'` — keys are dotted, namespaced by domain group.

### Translation assembly

`src/utils/i18n/translations.ts` `require`s per-domain JSON files and merges them into a flat `en`/`id` resource bundle. The domain groups are:

```
meta, home, footer, tickets, checkout, profile, form, common
```

Each lives under `src/locales/<group>/{en.json,id.json}` (the JSON is wrapped in a top-level `en`/`id` key that the loader unwraps). To add copy, add the key to **both** `en.json` and `id.json` of the relevant group.

### Language switcher

In `AppNavbar`, an MUI `Menu` triggered by an "LanguageSwitcher" `IconButton` shows `ReactCountryFlag` flags (`ID` / `GB`). Selecting a language calls `i18n.changeLanguage(lang)` and updates local `language` state. Locale codes map `en → en_US`, `id → id_ID` (`localeOptions`).

> **Gaps / notes:** (1) The selected language is **not persisted** (no `localStorage`/cookie) — it resets to `id` on reload. (2) `<html lang>` in `_document.tsx` is not switched dynamically with the runtime language. (3) Several strings are hardcoded rather than translated — e.g. the entire flight `EticketContainer` body ("Detail Penumpang", important-notes block), the ferry passenger form labels ("Email Address", "Mobile Phone"), and the car-rental copy are literal (mostly Indonesian) text. i18n coverage is real but incomplete.

## 2. Responsiveness

- **Single layout breakpoint: Tailwind `lg` (1024px)** (`docs/RESPONSIVE.md`). Layout-level show/hide always uses `lg:hidden` / `hidden lg:flex`; `md:` is reserved for intra-section spacing/sizing tweaks only.
- **Mobile + desktop are both first-class.** The navbar collapses to a hand-rolled burger overlay below `lg` (see `03-DESIGN-SYSTEM-AND-UI.md` §6); search forms stack (`flex-col lg:flex-row`); the DS `Button` is `w-full md:w-auto`; result grids and payment columns use responsive width fractions (`w-[100%] md:w-[60%]`).
- **Horizontal-scroll guard:** `AppLayout` root uses `overflow-x-hidden`.
- **Hydration safety:** search/result components (`SearchFlight`, `CarRentContainer`, `FlightListContainer`) gate first render on a `mounted`/`isMounted` flag to avoid SSR/CSR mismatch on time- and viewport-dependent UI, showing a skeleton until mounted.
- **Viewport:** `_app.tsx` sets `<meta name="viewport" content="initial-scale=1, width=device-width" />`.

## 3. Performance

- **Glassmorphism cost.** The theme applies `backdrop-filter: blur(24px)` to **every** `Paper`/`Card` (plus `.glass-card`, and heavier blurs on dialogs — up to `blur(64px)` in the checkout confirm dialog, `blur(40px)` on navbar modals). Backdrop blur is GPU-expensive and compounds when many blurred surfaces overlap or animate; on low-end mobile this is the most likely source of scroll/animation jank. Treat large stacked blurred surfaces as a performance budget item.
- **No polling.** The hard no-`refetchInterval` rule (`02-STATE-AND-DATA.md`) avoids repeated network/render churn; realtime updates are push-based.
- **React Query defaults** disable retries and window-focus refetch (`defaultQueryOption`), reducing redundant requests.
- **Infinite scroll** in `FlightListContainer` renders results in pages of 10 via `react-intersection-observer`, avoiding rendering large result sets at once.
- **framer-motion** animates list items and transitions; combined with backdrop blur this should be profiled on mobile.
- **Bundle:** heavy libs are present (`moment`, `framer-motion`, `swiper`, `@mui/x-date-pickers`, `pdf-viewer-reactjs`); no explicit code-splitting/dynamic-import strategy is configured beyond Next.js per-page defaults.

## 4. Accessibility

Observed current state (factual, mixed):

- **Present:** `aria-label`s on icon-only controls (menu toggle `"Open menu"/"Close menu"`, language switcher, copy-VA button, car-rental select fields, table `aria-label`s); semantic MUI components (`Table`, `Dialog`, `RadioGroup`, `Tabs`) carry built-in ARIA roles/focus management; buttons rendered as links (`component={Link}`) keep correct link semantics.
- **Gaps:** many decorative SVGs (e.g. the ferry step indicators) lack `role`/`aria-hidden`; some interactive elements are raw `<button>`/`<div>` with Tailwind styling and no explicit focus-visible styling; color-contrast of light slate text over translucent glass surfaces is not verified against WCAG AA; the language switcher does not announce state changes. No automated a11y testing is configured (no test runner exists in the project — see repo-root `CLAUDE.md`).

## 5. Mobile Keyboard / Input-Type Conventions

Text inputs set `type` and, on MUI fields, `inputMode` so mobile keyboards match the field (verified in `ContactForm`, `Checkout/CheckoutOrder`, `CarRentalForm`, `FerryPassengerContainer`):

| Field | Convention |
|---|---|
| Email | `type="email"` + (MUI) `slotProps={{ htmlInput: { inputMode: "email" } }}` |
| Phone / WhatsApp | `type="tel"` + `inputMode: "tel"` |
| Numeric (rental duration) | `type="number"` |

> Consistency note: the `react-hook-form`-based flight forms and the `ContactForm` apply `inputMode` via MUI `slotProps.htmlInput`, whereas the ferry passenger form uses plain `type="tel"/"email"` without `inputMode`. The intent (correct mobile keyboard) is applied broadly but not uniformly.

## 6. Summary of Known Current-State Gaps

These are documented as-is so they are visible, not smuggled:

1. **No auth session for bookings.** Login/Register modals exist but flows are keyed off booking codes in URL query strings; there is no session-bound user account gating checkout/e-ticket.
2. **Ferry flow diverges from flight flow.** Ferry passenger/contact entry uses local `useState` + manual `toast` validation instead of the mandated `react-hook-form` + `yup` pattern used by flights.
3. **`FerrySuccessContainer` is static.** It shows a hardcoded placeholder order number and does not read a live booking or subscribe to `booking:update` (unlike the flight e-ticket path).
4. **Language not persisted; partial i18n coverage** (§1).
5. **Payment method union vs UI.** `DanaPayMethod` includes `CIMB`/`PANIN` that the checkout picker does not surface (see `05-PAYMENTS.md`).
6. **Chatbot QRIS divergence.** The inline chatbot payment card supports QRIS while checkout does not (see `06-AI-CHATBOT.md`).
7. **No test runner / a11y automation** configured in the project.
