# TiketQ Frontend (tiket-FE)

The consumer-facing Next.js 14 web application for TiketQ — a travel booking platform serving flights, ferries, and car rentals. Built with React 18, Material UI (MUI) v9, Tailwind CSS, and React Query. Handles the full booking lifecycle from search and passenger data entry through DANA payment and e-ticket display. This README provides the exact dependency versions, required environment variables, and setup commands needed to run the application locally.

## Tech Stack & Versions

- **Core:** `next: 14.2.3`, `react: ^18`
- **UI Component Library:** `@mui/material: ^9.2.0` (+ `@mui/icons-material`, `@mui/x-date-pickers`) with `@emotion/react` + `@emotion/styled`, `framer-motion: ^11.2.6`
- **Styling:** `tailwindcss: ^3.4.3`, `tailwind-merge: ^3.5.0` — MUI components are styled alongside Tailwind utility classes and a glassmorphism theme (`src/theme/theme.ts`) + `.glass-card` utilities (`src/styles/global.css`)
- **Data Fetching:** `axios: ^1.7.2`, `react-query: ^3.39.3`
- **Forms & Validation:** `react-hook-form: ^7.51.5`, `yup: ^1.4.0`
- **Internationalization:** `react-i18next: ^14.1.2`, `i18next: ^23.11.5`
- **Real-Time:** `socket.io-client: ^4.8.3`

## Required Environment Variables (`.env.local`)

Create a `.env.local` file. AI Agents must reference this configuration when building API routes.

```env
# Essential
NEXT_PUBLIC_API_URL="http://localhost:3000/api"
```

> The Socket.io URL is derived from `NEXT_PUBLIC_API_URL` (origin only). No payment client key is read by the frontend — DANA orders are created server-side (`POST /api/dana/create-order`), which returns either a redirect URL (DANA wallet) or a virtual-account number.

## Setup & Execution

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm run dev
   # OR for a specific port (used locally)
   npm run dev:start
   ```
