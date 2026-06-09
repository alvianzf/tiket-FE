# Responsive Layout Rules

## Breakpoint Convention

The single mobile/desktop breakpoint is **`lg` (1024px)**. All show/hide toggling for the navbar and its burger menu uses `lg:hidden` / `hidden lg:flex`. Do not use `md:` for layout-level show/hide — only for spacing/sizing tweaks within a section.

## Root Layout (`AppLayout.tsx`)

- The root wrapper has `overflow-x-hidden` to prevent horizontal scroll when child content exceeds the viewport width on narrow screens.
- The `.glass-navbar` CSS class (defined in `src/styles/global.css`) already applies `sticky top-0 z-50` via `@apply`. Do **not** add those Tailwind classes again on the wrapper `<div>` in `AppLayout`.

## Navbar Burger Menu (`AppNavbar`)

The burger menu is implemented with NextUI's built-in `NavbarMenuToggle` + `NavbarMenu`. Key points:

- `NavbarMenuToggle` is wrapped in `NavbarContent className="lg:hidden"` — visible only below 1024px.
- The mobile logo is absolutely centered (`absolute left-1/2 -translate-x-1/2 lg:hidden`) inside the `<Navbar>` element, which provides the `position: relative` anchor.
- Desktop actions (login button, language switcher) are `hidden lg:flex` — on mobile they appear inside the `NavbarMenu` drawer instead.
- Closing on navigation: `useEffect` watches `pathname` and calls `setIsMenuOpen(false)` on route change.
- **Never** use `refetchInterval` on queries triggered from inside the navbar or menu — see `STATE_AND_QUERIES.md`.
