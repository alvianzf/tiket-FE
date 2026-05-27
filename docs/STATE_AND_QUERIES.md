# State Management & Queries

We use **React Query** (`react-query`) exclusively for handling server state and data fetching.

## Setup

Custom hooks are located in `/src/queries`. Each major domain has its own query hooks (e.g., `useQueryCheckBookFlight`).

## Real-Time Invalidation

To avoid aggressive polling (like `refetchInterval`), we utilize **Socket.io**.

1. Components establish a socket connection on mount (e.g., `EticketContainer`).
2. They listen for specific domain events, such as `booking:update`.
3. When the socket event matches the component's context (e.g. `payload.bookingNo === bookingno`), we manually call the `refetch()` function exposed by React Query. This guarantees our UI represents the server's real-time state seamlessly without unnecessary network requests.

## Internationalization (i18n)

Client-side translations are managed by `react-i18next`.

- JSON language files are stored in `/src/locales/`.
- Usage: `const { t } = useTranslation();`
- Strings are grouped into files like `common.json`, `checkout.json`, and nested under the language keys (`en`, `id`).
