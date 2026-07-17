# Responsive Layout Rules

## Breakpoint Convention

The single mobile/desktop breakpoint is **`lg` (1024px)**. All show/hide toggling for the navbar and its burger menu uses `lg:hidden` / `hidden lg:flex`. Do not use `md:` for layout-level show/hide — only for spacing/sizing tweaks within a section.

## Root Layout (`AppLayout.tsx`)

- The root wrapper has `overflow-x-hidden` to prevent horizontal scroll when child content exceeds the viewport width on narrow screens.
- The `.glass-navbar` CSS class (defined in `src/styles/global.css`) already applies `sticky top-0 z-50` via `@apply`. Do **not** add those Tailwind classes again on the wrapper `<div>` in `AppLayout`.

## Navbar Burger Menu (`AppNavbar`)

The navbar is built with MUI (`AppBar` + `Toolbar`); the burger menu is a hand-rolled toggle, not a component-library drawer. Key points:

- The toggle is an MUI `IconButton` (Menu/Close icon) wrapped in a `div className="... lg:hidden ..."` — visible only below 1024px. It flips a local `isMenuOpen` state.
- When open, the mobile menu is a `div className="lg:hidden fixed inset-x-0 top-16 bottom-0 ..."` overlay rendered below the `AppBar`.
- The mobile logo is absolutely centered (`absolute left-1/2 -translate-x-1/2 lg:hidden`) inside the `<Toolbar>` (which sets `position: relative`).
- Desktop actions (find-booking button, language switcher, login) are `hidden lg:flex` — on mobile they appear inside the mobile menu overlay instead.
- Closing on navigation: `useEffect` watches `pathname` and calls `setIsMenuOpen(false)` on route change.
- **Never** use `refetchInterval` on queries triggered from inside the navbar or menu — see `STATE_AND_QUERIES.md`.
