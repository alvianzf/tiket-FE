# State Management — React Query Hook Registry & Rules

This document governs how server state is fetched and synchronized in `tiket-FE`. It establishes the golden rule against using `refetchInterval` (polling), explains why the Eticket page uses Socket.io-triggered manual refetches instead, and provides the full implementation of the `useQueryCheckBookFlight` hook including its exact input interface and all return values. It also catalogs every React Query hook in the `/src/queries` directory by domain (ferry, flights, airports, bookFlight) with their parameter signatures, and documents the required `react-hook-form` + `yup` validation pattern used across all booking forms. Do not add new data-fetching logic to a component without consulting this document first.

---

## The Golden Rule: No `refetchInterval`

```typescript
// ❌ NEVER DO THIS — causes full-page spinner to re-mount every 30s
const { data } = useQuery(key, fetcher, { refetchInterval: 30_000 });

// ✅ CORRECT — use Socket.io to trigger refetch on real events
const { data, refetch } = useQuery(key, fetcher, { enabled });
```

---

## `useQueryCheckBookFlight` — Full Signature

**File:** `/src/queries/bookFlight/useQueryCheckBookFlight.ts`

```typescript
interface Props {
  enabled?: boolean;
  onSuccess?: (response: GetBookFlightResponse) => void;
  request: string; // The booking code (e.g. "ABCDEF")
}

// Internal query key shape
interface CheckBookQueryKeys {
  key: string; // GET_CHECK_BOOK_FLIGHT constant
  payload: string; // The booking code
}

const useQueryCheckBookFlight = ({ enabled, onSuccess, request }: Props) => {
  const queryKeys: CheckBookQueryKeys[] = [
    { key: GET_CHECK_BOOK_FLIGHT, payload: request },
  ];

  const { data, isFetching, error, refetch } = useQuery(
    queryKeys,
    ({ queryKey: [{ payload }] }) => checkBookFlight(payload), // calls GET /api/flight/book-info/:payload
    { enabled, onSuccess },
  );

  return { isFetching, data, queryKeys, error, refetch };
};
```

---

## Eticket Real-Time Pattern (`EticketContainer`)

The `EticketContainer` is the reference implementation for Socket.io + React Query integration.

```typescript
// EticketContainer/index.tsx
const { data, isFetching, refetch } = useQueryCheckBookFlight({
  enabled: !!bookingno,
  request: bookingno,
});

useEffect(() => {
  if (!bookingno) return;

  const apiUrl = getApiUrl();
  let socketUrl = "http://localhost:3001";
  try {
    const urlObj = new URL(apiUrl);
    socketUrl = urlObj.origin;
  } catch (e) {
    socketUrl = apiUrl;
  }

  const socket = io(socketUrl);
  socket.on("booking:update", (payload: { bookingNo: string }) => {
    // Only refetch if this socket event is for THIS booking
    if (payload.bookingNo === bookingno) {
      refetch();
    }
  });
  // Reconnect recovery: a booking:update pushed while the tab was backgrounded
  // (user in the bank/DANA app) can be missed if the socket dropped. On
  // reconnect, re-pull the booking so the e-ticket reflects the latest status.
  socket.io.on("reconnect", () => {
    refetch();
  });

  return () => {
    socket.disconnect();
  };
}, [bookingno, refetch]);
```

The same reconnect-recovery pattern is used by `Payment/DanaPayment.tsx` and `DanaTransactionStatusContainer`: both subscribe to `booking:update` (routing the user to the e-ticket on a match). This is still push-based — there is **no** `refetchInterval` anywhere. The reconnect listener only re-pulls once on socket reconnect; it is not polling.

---

## Ferry Query Hooks

**File:** `/src/queries/ferry/index.ts`

```typescript
// Returns available sectors (origin/destination) for the SearchFerry form dropdown
export const useQueryFerrySectors = () => { ... }

// Returns ferry routes, filterable by sectorID
export const useQueryFerryRoutes = (params: {
    searchString?: string;
    sectorID?: string;
    pageIndex?: number;
    pageSize?: number;
}) => { ... }

// Returns available trip schedules (used to populate search results)
export const useQuerySearchFerryTrips = (params: {
    embarkation: string;
    destination: string;
    tripdate: string; // YYYYMMDD format
}, options?: any) => { ... }
```

---

## Form Validation Pattern

All forms use `react-hook-form` + `@hookform/resolvers/yup`:

```typescript
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup.object().shape({
  firstName: yup.string().required("First name is required"),
  email: yup.string().email("Invalid email").required(),
  passportNumber: yup.string().optional(),
});

const {
  register,
  handleSubmit,
  formState: { errors },
} = useForm({
  resolver: yupResolver(schema),
});
```

**Never** use raw `useState` for complex multi-field forms.
