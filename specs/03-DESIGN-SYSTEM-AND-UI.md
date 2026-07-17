# 03 — Design System & UI

> The visual language of `tiket-FE`: the MUI v9 glassmorphism theme, the design-system `Button` wrapper, the Tailwind glass utilities, the navigation rule, and the responsive approach.
> Grounded in `src/theme/theme.ts`, `src/styles/global.css`, `tailwind.config.js`, `src/components/Button/index.tsx`, `src/components/AppNavbar/index.tsx`, `docs/RESPONSIVE.md`, `docs/COMPONENTS_AND_UI.md`.

---

## 1. Hybrid Styling Model

`tiket-FE` styles UI two ways simultaneously:

1. **MUI v9 components** styled through the theme and the `sx` prop (`Card`, `Button`, `TextField`, `AppBar`, `Dialog`, `Tabs`, `Table`, date pickers).
2. **Tailwind CSS 3** utilities plus a handful of hand-written glass utilities in `src/styles/global.css`.

Both appear on the same elements throughout (e.g. an MUI `<Card className="px-4 w-full mt-[40px]">`). NextUI has been removed; residual "old NextUI" comments are historical. When editing a page, match whichever styling the surrounding code already uses.

## 2. The MUI Theme (`src/theme/theme.ts`)

A single `createTheme({ cssVariables: true, ... })` (light mode) carries the brand forward and bakes glassmorphism into every surface.

### Brand palette

```ts
export const brand = {
  primary: "#4267B2",  primaryLight: "#5A7EC4", primaryDark: "#2F4F8A", // cornflower
  secondary: "#0AD1FF", secondaryDark: "#00B3D9",
  cta: "#FF5A00", ctaLight: "#FF7A33", ctaDark: "#E65100",             // CTA orange
  dark: "#2F3033", bgBase: "#F0F4F8",
};
```

Palette mapping in the theme:

| MUI role | Colour | Meaning |
|---|---|---|
| `primary` | `#4267B2` cornflower | Brand, links, primary buttons |
| `secondary` | `#0AD1FF` | Accent |
| **`warning`** | **`#FF5A00` CTA orange** | **The call-to-action colour.** "Pay now", "Continue", search — all use `color="warning"`. This deliberate mapping (CTA → `warning`) is used throughout; treat `warning` as "CTA", not "caution". |
| `background.default` | `#F0F4F8` | Page background |
| `background.paper` | `rgba(255,255,255,0.72)` | Frosted surface |
| `text.primary/secondary` | `#0f172a` / `#475569` | Slate text |

- **Typography:** Montserrat; buttons `textTransform: none`, weight 700; headings 700–800.
- **Shape:** base `borderRadius: 12`; `Paper`/`Card` overridden to `16`; `Button` to `8`.

### Glass surfaces (baked in)

A shared `glassSurface` object is applied to **every `Paper` and `Card`** via `styleOverrides`, so surfaces are frosted by default without opt-in:

```ts
const glassSurface = {
  background: "rgba(255, 255, 255, 0.72)",
  backdropFilter: "blur(24px)", WebkitBackdropFilter: "blur(24px)",
  border: "1px solid rgba(255, 255, 255, 0.75)",
  boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.08)",
};
```

Notable component overrides:
- `MuiPaper` — glass + `borderRadius: 16`; `elevation8` bumped to `rgba(255,255,255,0.92)` so menus/popovers stay readable.
- `MuiCard` — glass + hover transition on `box-shadow`/`transform`.
- `MuiButton` — `disableElevation`, radius 8, weight 700, `paddingInline: 24`, `&:active { transform: scale(0.97) }`; colored shadow variants for `contained primary` (blue glow) and `contained warning` (orange glow).
- `MuiOutlinedInput` — radius 8, translucent white fill.
- `MuiAppBar` — solid brand `#4267B2` background, no shadow (the navbar wrapper adds glass; see §5).

## 3. The `Button` Wrapper (`src/components/Button/index.tsx`)

A thin design-system wrapper over MUI `Button` that adds a `dsVariant` prop and framer-motion micro-interaction. **It forwards all MUI `ButtonProps`**, so `component`, `href`, `onClick`, `startIcon`, `sx`, etc. all pass through.

```tsx
<Button dsVariant="cta" isLoading={submitting}>Pay now</Button>
```

| `dsVariant` | Resolves to |
|---|---|
| `primary` | `variant="contained" color="primary"` (blue) |
| `cta` *(default)* | `variant="contained" color="warning"` (orange) |
| `secondary` | `variant="contained" color="secondary"` |
| `ghost` | `variant="outlined" color="primary"` with 2px border, fill-on-hover |
| `glass` | translucent white outlined button with `backdrop-filter: blur(12px)` — for use over imagery |

Behaviour:
- Wrapped in a `motion.div` (`whileHover scale 1.02`, `whileTap 0.98`) that is `w-full md:w-auto`.
- `disableRipple`, `fullWidth`.
- `isLoading` disables the button and swaps `startIcon` for a `CircularProgress` spinner.
- `sx` from the variant and from the caller are merged (array form).

## 4. Tailwind Layer & Global Styles (`src/styles/global.css`)

Tailwind `base`/`components`/`utilities` layers plus CSS custom properties mirroring the brand (`--primary`, `--orange`, `--glass-bg`, `--glass-blur: 24px`, …). Design tokens are also declared in `tailwind.config.js` (`primary`, `secondary`, `cta`, `orange`, radius scale `ds-sm|md|lg|xl` = 8/12/16/24, Montserrat + JetBrains Mono).

Hand-written utilities:

| Class | Effect |
|---|---|
| `.glass-card` | `rgba(255,255,255,0.85)` + `blur(24px)` + hairline border + soft shadow + `rounded-ds-lg`. The Tailwind sibling to the MUI `glassSurface`; used on `<div>`s that aren't MUI `Card`s. |
| `.glass-card-dark` | Dark frosted variant (`rgba(17,24,39,0.6)`). |
| `.glass-navbar` | Brand background + bottom hairline + `sticky top-0 z-50`. Applied by `AppLayout`; **do not** re-add `sticky/top/z` on the wrapper. |
| `.bg-pattern`, `.home-app`, `.ferry-app` | Brand SVG texture / hero background images. |
| `.button-orange`, `.button-blue`, `.btn-ds` | Tailwind button styles used where a raw element (e.g. an `IconButton`) needs the CTA look. |

## 5. The Navigation Rule (critical)

**Never** wire navigation through `onClick`/`onPress` + `router.push()`, and never combine an `onClick` state change with `<Link>` navigation on the same element — this causes a **double-click bug**. Render the button *as* a link instead.

```tsx
// ✅ Correct — MUI Button rendered as a Next.js Link
<Button component={Link} href="/about">About</Button>
<Link href="/about">About</Link>

// ❌ Wrong
<Button onClick={() => router.push("/about")}>About</Button>
```

Reference implementation: `src/components/AppNavbar/index.tsx` uses `<Button component={Link} href={item.href}>` for its nav items, and the DS `Button` supports the same (`DanaTransactionStatusContainer` renders `<Button component={Link} href="/eticket?…">`).

> Distinction: *navigation* must be link-based. *Post-action, programmatic* navigation after an async result is still done imperatively with `router.push()` inside a handler — e.g. `Checkout` pushes to `/checkout/payment` in the `bookFlight` mutation's `onSuccess`, and `DanaPayment` navigates on a `booking:update` push. The rule targets user-initiated link clicks, not side-effect redirects.

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

- **Single layout breakpoint: Tailwind `lg` (1024px).** All show/hide toggling uses `lg:hidden` / `hidden lg:flex`. `md:` is reserved for spacing/sizing tweaks *within* a section, never layout-level show/hide.
- **Root wrapper** (`AppLayout.tsx`) uses `overflow-x-hidden` to prevent horizontal scroll on narrow screens.
- **Navbar** (`AppNavbar`) is MUI `AppBar` + `Toolbar` with a hand-rolled burger menu: an `IconButton` inside a `lg:hidden` wrapper toggles a local `isMenuOpen`; the open menu is a `fixed inset-x-0 top-16 bottom-0` overlay; the mobile logo is absolutely centered in the toolbar; desktop actions are `hidden lg:flex`; a `useEffect` on `pathname` closes the menu on navigation.
