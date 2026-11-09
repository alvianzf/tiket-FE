# 03 — Design System & UI

> The visual language of `tiket-FE`: two coexisting component systems (MUI for the deep booking/checkout forms, a lightweight no-MUI `ui/` kit for the app shell and anything built after the shell rebuild), a solid professional surface system (glassmorphism fully retired), the mobile-first navigation shell, the navigation rule, and the responsive approach.
> Grounded in `src/theme/theme.ts`, `src/styles/global.css`, `tailwind.config.js`, `src/components/ui/*`, `src/components/Button/index.tsx`, `src/components/AppNavbar/index.tsx`, `src/components/BottomNav/index.tsx`, `src/components/AppDrawer/index.tsx`, `docs/RESPONSIVE.md`, `docs/COMPONENTS_AND_UI.md`.

---

## 1. Two Component Systems (transitional)

`tiket-FE` is mid-migration off MUI. **Two systems currently coexist, split by area, not mixed within one component:**

1. **MUI v9** — still used in the deep booking/checkout forms: `SearchFlight`, `Checkout` (and its passenger sub-forms), `FerryPassenger`, `CarRentalForm`, anything using `@mui/x-date-pickers`. These are high-risk, payment-critical flows that were deliberately **not** touched in the shell rebuild — migrating them off MUI is a separate, future pass.
2. **`src/components/ui/`** (no MUI) — `Button`, `TextField`, `Dialog`, `Drawer`, built on Radix UI primitives (`@radix-ui/react-dialog`, `@radix-ui/react-dropdown-menu`) + Tailwind + framer-motion. Used by the app shell (`AppNavbar`, `AppDrawer`, `AppLayout`'s find-booking dialog, `SearchBookingNumber`) and every page/dialog built since (ItinerQ, Hotel, Activity booking dialogs).

When editing a page, match whichever system the surrounding code already uses — **do not mix MUI and `ui/` components inside the same form or dialog.** Tailwind CSS 3 utilities are used throughout both. NextUI has been removed from `tiket-FE` entirely (it remains the UI library for the separate `tiket-admin` project); residual "old NextUI" comments in `tiket-FE` are historical.

### 1a. The `ui/` kit (`src/components/ui/`)

- **`Button`** — `variant: "primary" | "cta" | "outline" | "ghost"`, `isLoading`, `fullWidth`; renders a `motion.button`, or a `motion.div`-wrapped `next/link` when `href` is passed (keeps link-based navigation — see §6). Bold rounded-xl shapes with colored glow shadows on `primary`/`cta`.
- **`TextField`** — plain labeled `<input>`, `error` renders a message below.
- **`Dialog`** — Radix `Dialog` (focus trap, `Escape`/overlay-click close, a11y `Title` built in — pass `title` or it falls back to a visually-hidden one) + framer-motion scale/fade enter, centered.
- **`Drawer`** — same Radix primitive, slides in from the right edge instead of appearing centered; used for `AppDrawer`.

Both `Dialog` and `Drawer` render via `RadixDialog.Portal` with `forceMount` + `AnimatePresence`, so the exit animation plays before unmount.

## 2. The MUI Theme (`src/theme/theme.ts`)

A single `createTheme({ cssVariables: true, ... })` (light mode) carries the brand forward. **Glassmorphism (frosted/translucent surfaces, backdrop blur) has been fully retired** — every surface is now solid white with a thin neutral border and a soft shadow (see §2a). Only the brand colors and the `Logo` component survived the rebuild unchanged; navbar, footer, card styling, and the theme's component overrides were all rewritten.

### Brand palette

```ts
export const brand = {
  primary: "#4267B2",
  primaryLight: "#5A7EC4",
  primaryDark: "#2F4F8A", // cornflower
  secondary: "#0AD1FF",
  secondaryDark: "#00B3D9",
  cta: "#FF5A00",
  ctaLight: "#FF7A33",
  ctaDark: "#E65100", // CTA orange
  dark: "#2F3033",
  bgBase: "#F7F8FA",
  border: "#E6E9EE",
};
```

Palette mapping in the theme:

| MUI role                 | Colour                   | Meaning                                                                                                                                                                                          |
| ------------------------ | ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `primary`                | `#4267B2` cornflower     | Brand, links, primary buttons                                                                                                                                                                    |
| `secondary`              | `#0AD1FF`                | Accent                                                                                                                                                                                           |
| **`warning`**            | **`#FF5A00` CTA orange** | **The call-to-action colour.** "Pay now", "Continue", search — all use `color="warning"`. This deliberate mapping (CTA → `warning`) is used throughout; treat `warning` as "CTA", not "caution". |
| `background.default`     | `#F7F8FA`                | Page background                                                                                                                                                                                  |
| `background.paper`       | `#FFFFFF` (solid)        | Surface                                                                                                                                                                                          |
| `text.primary/secondary` | `#0f172a` / `#475569`    | Slate text                                                                                                                                                                                       |

- **Typography:** Montserrat; buttons `textTransform: none`, weight 700; headings 700–800.
- **Shape:** base `borderRadius: 12`; `Paper`/`Card` overridden to `16`; `Button` to `8`.

### 2a. Solid surfaces (baked in)

A shared `surface` object is applied to **every `Paper` and `Card`** via `styleOverrides`, so every surface is opaque white by default without opt-in — no transparency, no `backdropFilter`, anywhere in the theme:

```ts
const surface = {
  background: "#FFFFFF",
  border: "1px solid #E6E9EE",
  boxShadow: "0 1px 2px 0 rgba(16,24,40,0.04), 0 1px 3px 0 rgba(16,24,40,0.06)",
};
```

Notable component overrides:

- `MuiPaper` — solid surface + `borderRadius: 16`.
- `MuiCard` — solid surface + hover transition on `box-shadow`/`transform`.
- `MuiButton` — `disableElevation`, radius 8, weight 700, `paddingInline: 24`, `&:active { transform: scale(0.97) }`; colored shadow variants for `contained primary` (blue glow) and `contained warning` (orange glow).
- `MuiOutlinedInput` — radius 8, solid white fill.
- `MuiAppBar` — solid brand `#4267B2` background, no shadow (the `.app-header` wrapper supplies the sticky positioning; see §5).

## 2b. The MUI-era `Button` Wrapper (`src/components/Button/index.tsx`)

**For MUI-area pages only** (§1) — not to be confused with `ui/Button` (§1a), which is unrelated and used everywhere else. A thin design-system wrapper over MUI `Button` that adds a `dsVariant` prop and framer-motion micro-interaction. **It forwards all MUI `ButtonProps`**, so `component`, `href`, `onClick`, `startIcon`, `sx`, etc. all pass through.

```tsx
<Button dsVariant="cta" isLoading={submitting}>
  Pay now
</Button>
```

| `dsVariant`       | Resolves to                                                         |
| ----------------- | ------------------------------------------------------------------- |
| `primary`         | `variant="contained" color="primary"` (blue)                        |
| `cta` _(default)_ | `variant="contained" color="warning"` (orange)                      |
| `secondary`       | `variant="contained" color="secondary"`                             |
| `ghost`           | `variant="outlined" color="primary"` with 2px border, fill-on-hover |

Behaviour:

- Wrapped in a `motion.div` (`whileHover scale 1.02`, `whileTap 0.98`) that is `w-full md:w-auto`.
- `disableRipple`, `fullWidth`.
- `isLoading` disables the button and swaps `startIcon` for a `CircularProgress` spinner.
- `sx` from the variant and from the caller are merged (array form).

## 4. Tailwind Layer & Global Styles (`src/styles/global.css`)

Tailwind `base`/`components`/`utilities` layers plus CSS custom properties mirroring the brand (`--primary`, `--orange`, `--border-subtle`, `--bottom-nav-height: 64px`, …). Design tokens are also declared in `tailwind.config.js` (`primary`, `secondary`, `cta`, `orange`, radius scale `ds-sm|md|lg|xl` = 8/12/16/24, Montserrat + JetBrains Mono).

Hand-written utilities:

| Class                                       | Effect                                                                                                                                                                                                                                                                                                                                                                                                         |
| ------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `.surface-card`                             | Opaque `#FFFFFF` + thin `--border-subtle` border + soft shadow + `rounded-ds-lg`. The Tailwind sibling to the MUI `surface` object (§2a); used on `<div>`s that aren't MUI `Card`s. **No transparency, no blur** — renamed from the old `.glass-card` when glassmorphism was retired.                                                                                                                          |
| `.surface-card-dark`                        | Dark solid variant (`#181B20`), used by the dark chat widget.                                                                                                                                                                                                                                                                                                                                                  |
| `.app-header`                               | Solid brand-color background + `sticky top-0 z-50`. Wraps `AppNavbar`/`CheckoutNavbar` in `AppLayout`/`CheckoutLayout` — **do not** re-add `sticky/top/z` on the wrapper. Renamed from `.glass-navbar`.                                                                                                                                                                                                        |
| `.bottom-nav`                               | Fixed, mobile-only bottom bar (`height: var(--bottom-nav-height)`), solid white + top hairline border, `z-60`, `env(safe-area-inset-bottom)` padding for notched phones. Backs `BottomNav` (§5a).                                                                                                                                                                                                              |
| `.bg-pattern`, `.home-app`, `.ferry-app`    | Brand SVG texture / hero background images.                                                                                                                                                                                                                                                                                                                                                                    |
| `.button-orange`, `.button-blue`, `.btn-ds` | Tailwind button styles used where a raw element (e.g. an `IconButton`) needs the CTA look.                                                                                                                                                                                                                                                                                                                     |
| `.animated-bg`, `.animated-bg__blob`        | Fixed, full-viewport layer of three slow-drifting blurred gradient blobs in brand colors (primary/orange/secondary), at a subtle `opacity: 0.18` behind the (now opaque) surfaces. Pure CSS `@keyframes` (no JS animation cost); honors `prefers-reduced-motion`. Rendered by `AnimatedBackground` (`src/components/AnimatedBackground`) and mounted once in `AppLayout`, so every page gets it automatically. |

## 5. Navigation Shell (mobile-first)

Rebuilt to fix a real inconsistency: `AppNavbar` (full nav) and `CheckoutNavbar` (bare logo bar) used to look like two different apps. Both now sit on the same `.app-header` surface, and the shell is designed mobile-first with two cooperating pieces below `lg` (1024px):

- **`AppNavbar`** — a slim top bar (logo + burger) on mobile; a full horizontal nav (all links + Find Booking + language + Login + My Bookings) on desktop (`lg:flex`, mobile nav hidden via `hidden lg:flex`). Takes a single `onOpenDrawer` prop — it doesn't own drawer state itself.
- **`BottomNav`** (mobile-only, `lg:hidden`) — a fixed bottom tab bar with the "most important" client-facing destinations: Flights, Ferry, ItinerQ, Private Driver, plus a "More" tab. Lives in `src/components/BottomNav`.
- **`AppDrawer`** — a right-anchored MUI `Drawer` holding everything _not_ in the bottom nav: Hotels, Activities, My Bookings, Find Booking, language switcher, Login. Opened by either the header burger or the bottom nav's "More" tab — both call the _same_ lifted `isDrawerOpen` state, so there's only ever one drawer instance. Lives in `src/components/AppDrawer`.

**State ownership:** `AppLayout` owns `isDrawerOpen` and the Find-Booking dialog's `isOpenFind` for the mobile path, passing callbacks down to `AppNavbar` (burger) and `BottomNav` ("More"). `AppNavbar` separately owns its own `isOpenFind` for the desktop "Find Booking" button — two independent dialog instances, mutually exclusive by viewport, which is simpler than threading one shared dialog through both layout and navbar.

`AppLayout`'s main content gets `pb-[calc(var(--bottom-nav-height)+8px)] lg:pb-0` so the fixed bottom nav never overlaps page content or the footer; `ChatBot`'s floating button is offset the same way on mobile (`bottom-[calc(var(--bottom-nav-height)+12px)] lg:bottom-6`) so the two floating UIs don't collide.

`CheckoutLayout`/`CheckoutNavbar` intentionally has **no** bottom nav and **no** burger — just the logo on `.app-header` — to avoid distracting the traveler mid-payment. This is a deliberate reduction, not a different design system.

## 6. The Navigation Rule (critical)

**Never** wire navigation through `onClick`/`onPress` + `router.push()`, and never combine an `onClick` state change with `<Link>` navigation on the same element — this causes a **double-click bug**. Render the button _as_ a link instead.

```tsx
// ✅ Correct — MUI Button rendered as a Next.js Link
<Button component={Link} href="/about">About</Button>
<Link href="/about">About</Link>

// ❌ Wrong
<Button onClick={() => router.push("/about")}>About</Button>
```

Reference implementation: `src/components/AppNavbar/index.tsx` uses `<Button component={Link} href={item.href}>` for its nav items, and the DS `Button` supports the same (`DanaTransactionStatusContainer` renders `<Button component={Link} href="/eticket?…">`).

> Distinction: _navigation_ must be link-based. _Post-action, programmatic_ navigation after an async result is still done imperatively with `router.push()` inside a handler — e.g. `Checkout` pushes to `/checkout/payment` in the `bookFlight` mutation's `onSuccess`, and `DanaPayment` navigates on a `booking:update` push. The rule targets user-initiated link clicks, not side-effect redirects.

## 5b. Forms & Submission (convention)

**Every form must submit on Enter.** Wrap the fields in a native `<form onSubmit={...}>` and give the primary action `type="submit"`:

```tsx
// ✅ Correct — Enter in any field submits; the button is the submit control
<form onSubmit={handleSubmit(onValid)}>
  <TextField ... />
  <Button type="submit">Continue</Button>
</form>

// ❌ Wrong — no <form>, submission only via onClick; Enter does nothing
<TextField ... />
<Button onClick={onValid}>Continue</Button>
```

- With `react-hook-form`, the submit control is `<Button type="submit">` and the wrapper is `<form onSubmit={handleSubmit(onValid)}>`.
- Reference implementation: `pages/history` wraps its lookup in `<form onSubmit={handleSearch}>` with a `type="submit"` button, so Enter submits.
- A dual-purpose "email or phone" field (e.g. `LoginForm`) stays `type="text"` (so a phone number isn't rejected by email validation), but the surrounding form must still submit on Enter.

## 5c. Footer & Static Content Pages

The site `Footer` (`src/components/Footer`) has four columns — brand, **Navigation** (site map: Flights `/`, Ferry `/ferry`, Car Rental `/car-rental`, My Bookings `/history`), **About Us**, and **Contact Us** — plus a bottom bar with copyright, company name, and social icons. All links use `next/link` (`component={Link}` / `<Link>`), per the navigation rule. There is no "Get the App" section and no in-footer AI promo banner.

The About/Contact/Resources links resolve to real static pages: `pages/about` (`pages.about.*`), `pages/resources` (`pages.resources.*`, i.e. Privacy / Terms / Refund / FAQ), and `pages/contact` (`pages.contact.*`, contact channels). Each is a `NextPageWithLayout` under `AppLayout` and is fully bilingual via the `pages` locale group (`src/locales/pages/{id,en}.json`). See `07-NON-FUNCTIONAL.md` for i18n.

## 6. Responsive Approach

Full detail in `07-NON-FUNCTIONAL.md`; the design-system essentials (from `docs/RESPONSIVE.md`):

- **Single layout breakpoint: Tailwind `lg` (1024px).** All show/hide toggling uses `lg:hidden` / `hidden lg:flex`. `md:` is reserved for spacing/sizing tweaks _within_ a section, never layout-level show/hide.
- **Root wrapper** (`AppLayout.tsx`) uses `overflow-x-hidden` to prevent horizontal scroll on narrow screens.
- **Navbar** (`AppNavbar`) is MUI `AppBar` + `Toolbar` with a hand-rolled burger menu: an `IconButton` inside a `lg:hidden` wrapper toggles a local `isMenuOpen`; the open menu is a `fixed inset-x-0 top-16 bottom-0` overlay; the mobile logo is absolutely centered in the toolbar; desktop actions are `hidden lg:flex`; a `useEffect` on `pathname` closes the menu on navigation.
