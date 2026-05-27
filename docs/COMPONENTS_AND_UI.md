# Components & UI Architecture

The frontend is built primarily with **Next.js**, utilizing **NextUI** components powered by **TailwindCSS**.

## Directory Structure

- `/src/components`: Reusable UI elements (Buttons, Navbars, ChatBot widgets).
- `/src/containers`: High-level page wrappers representing entire views (e.g., `HomeContainer`, `EticketContainer`, `SearchFlightContainer`).
- `/src/layouts`: Layout components that wrap pages (including the main `AppNavbar` and `Footer`).
- `/src/styles`: Global CSS and Tailwind directives.

## Styling Guidelines

We heavily utilize Tailwind utility classes. For complex components with interactive states (like the glass-morphism cards in the flight search forms), we use `backdrop-blur`, custom `bg-primary/10` opacity classes, and extensive micro-animations via `framer-motion`.

## Navigation

Navigation is handled seamlessly using Next.js native `<Link>` component and `useRouter`. Components inside `AppNavbar` listen to route changes (`pathname`) to automatically close mobile menus gracefully.
