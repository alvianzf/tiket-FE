# State Management — React Query Hook Registry & Rules

**AI Context Note:** This document specifies the exact hook signatures derived from reading the `/src/queries` source files. Do not write raw axios calls in components.

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

  return () => {
    socket.disconnect();
  };
}, [bookingno, refetch]);
```

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
