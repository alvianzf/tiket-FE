# TiketQ Frontend (tiket-FE)

The consumer-facing Next.js 14 web application for TiketQ — a travel booking platform serving flights, ferries, and car rentals. Built with React 18, NextUI, Tailwind CSS, and React Query. Handles the full booking lifecycle from search and passenger data entry through Midtrans payment and e-ticket display. This README provides the exact dependency versions, required environment variables, and setup commands needed to run the application locally.

## Tech Stack & Versions

- **Core:** `next: 14.2.3`, `react: ^18`
- **UI Component Library:** `@nextui-org/react: ^2.3.6`, `framer-motion: ^11.2.6`
- **Styling:** `tailwindcss: ^3.4.3`, `tailwind-merge: ^3.5.0`
- **Data Fetching:** `axios: ^1.7.2`, `react-query: ^3.39.3`
- **Forms & Validation:** `react-hook-form: ^7.51.5`, `yup: ^1.4.0`
- **Internationalization:** `react-i18next: ^14.1.2`, `i18next: ^23.11.5`
- **Real-Time:** `socket.io-client: ^4.8.3`

## Required Environment Variables (`.env.local`)

Create a `.env.local` file. AI Agents must reference this configuration when building API routes.

```env
# Essential
NEXT_PUBLIC_API_URL="http://localhost:3000/api"

# Optional (Midtrans Client Config)
NEXT_PUBLIC_MIDTRANS_CLIENT_KEY="client_key"
```

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
