# AI Chatbot — Full Implementation Blueprint

This document covers the complete technical implementation of the TiketQ AI Assistant feature — from the frontend Socket.io hook to the backend agentic loop. It includes the exact TypeScript types for every message and tool result, the full `useChatSocket` hook implementation, and a card-by-card breakdown of how `ChatMessage.tsx` renders each tool result type (flight cards, ferry cards, payment UI, booking summaries, and the customer service card). Anyone reading this document should be able to reproduce the chatbot end-to-end without opening the source files.

---

## TypeScript Types (`useChatSocket.ts`)

```typescript
// Discriminated union — each tool result carries its own typed `data`.
export type ToolResultData =
  | { type: "flight_results"; data: { options?: FlightOption[]; cheapest?: FlightOption; earliest?: FlightOption; latest?: FlightOption; message?: string } }
  | { type: "ferry_results"; data: { options?: FerryOption[]; cheapest?: FerryOption; earliest?: FerryOption; latest?: FerryOption; message?: string } }
  | { type: "booking_summary"; data: { bookingCode?: string; status?: string; error?: string; flightdetail?: FlightDetail[] } }
  | { type: "dana_payment"; data: { bookingCode: string; kind: "QRIS" | "VA"; vaNumber: string | null; qrContent: string | null; expiryTime: string | null } }
  | { type: "customer_service_card"; data: Record<string, never> };

export type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
  toolResult?: ToolResultData; // Present only when the message is a rich UI card
};
```

> **Note:** The union above is now the full, accurate set the frontend defines and `ChatMessage.tsx` renders. The older `'booking_form'` and `'qris_payment'` member names no longer exist; the chatbot payment card is `'dana_payment'` (see below). `FlightOption` / `FerryOption` / `FlightDetail` are also declared in `useChatSocket.ts`.

---

## Full Hook Implementation (`useChatSocket.ts`)

```typescript
export const useChatSocket = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "initial",
      role: "assistant",
      content:
        "Hi! / Halo! 👋\n\nType your travel query and I'll help you search and book.\nKetik pencarian tiket Anda dan saya akan membantu.\n\n*(e.g. \"Flight from Jakarta to Bali tomorrow\" / \"Kapal Batam ke Singapura besok\")*\n\nFor help or complaints, type **'Customer Service'** / Ketik **'Customer Service'** untuk bantuan.",
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const socketRef = useRef<Socket | null>(null);

  // Session ID generated once per component mount, NOT per message
  const sessionIdRef = useRef<string>(
    `session-${Math.random().toString(36).substring(2, 9)}`,
  );

  useEffect(() => {
    // Derives socket URL from the same API base URL used by REST calls
    const apiUrl = getApiUrl(); // from @api/baseApi
    let socketUrl = "http://localhost:3001";
    try {
      const urlObj = new URL(apiUrl);
      socketUrl = urlObj.origin; // strips path, keeps protocol + host + port
    } catch (e) {
      socketUrl = apiUrl;
    }

    const socket = io(socketUrl);
    socketRef.current = socket;

    socket.on("chat:typing", () => setIsTyping(true));

    socket.on("chat:response_done", (data: { content: string }) => {
      setIsTyping(false);
      if (data.content) {
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now().toString(),
            role: "assistant",
            content: data.content,
          },
        ]);
      }
    });

    socket.on("chat:tool_result", (result: ToolResultData) => {
      setIsTyping(false);
      // Tool results are appended as messages with empty content + toolResult payload
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          role: "assistant",
          content: "",
          toolResult: result,
        },
      ]);
    });

    socket.on("chat:error", (error) => {
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          role: "assistant",
          content: `Error: ${error.message}`,
        },
      ]);
    });

    return () => {
      socket.disconnect();
    };
  }, []); // Only connects once on mount

  const sendMessage = (text: string) => {
    if (!text.trim() || !socketRef.current) return;
    setMessages((prev) => [
      ...prev,
      { id: Date.now().toString(), role: "user", content: text },
    ]);
    setIsTyping(true);
    socketRef.current.emit("chat:message", {
      sessionId: sessionIdRef.current,
      text,
    });
  };

  return { messages, isTyping, sendMessage };
};
```

---

## ChatMessage.tsx — Tool Result Card Render Logic

`ChatMessage.tsx` renders different UI cards based on `message.toolResult.type`. Here is the complete mapping:

| `type` value                           | UI Card Rendered                                                                                                                                                                                                                                         |
| -------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `'flight_results'` / `'ferry_results'` | Interactive `<InteractiveResultCard>` per option. Supports expand to select Adults/Children/Infants, then fires `sendMessage()` with a pre-written booking intent string. Deduplicates: cheapest/earliest/latest shown only if their `searchId` differs. |
| `'booking_summary'`                    | Shows `bookingCode`, `status` badge, and route info from `flightdetail[0]`. If `data.error` present, renders a red error card instead.                                                                                                                   |
| `'dana_payment'`                       | DANA payment card. For `kind: 'QRIS'` renders a QR code (`qrcode.react`'s `QRCodeSVG`) from `data.qrContent`. For `kind: 'VA'` renders a copyable virtual-account number from `data.vaNumber`. No Midtrans Snap; no client key needed.                     |
| `'customer_service_card'`              | Renders a static WhatsApp card. CTA button links to `https://wa.me/6282382709777`.                                                                                                                                                                       |

### InteractiveResultCard — Confirm Message Format

When the user clicks "Select & Continue" after choosing a flight/ferry:

```javascript
sendMessage(
  `I want to book the ${label} ${isFlight ? "flight" : "ferry"} (${item.airline || item.ferryName}) departing at ${item.departTime}${isFlight && item.departDate ? ` on ${item.departDate}` : ""} for ${adults} Adult(s), ${children} Child(ren), and ${infants} Infant(s).`,
);
// Example output:
// "I want to book the Cheapest flight (Lion Air) departing at 08:00 on 2026-07-18 for 2 Adult(s), 0 Child(ren), and 0 Infant(s)."
```

This triggers the AI to start the conversational booking data collection flow.

### DANA Payment Card (`dana_payment`)

The chatbot's in-conversation payment card is rendered inline by `ChatMessage.tsx` — there is no Midtrans Snap popup and no client-key env var. Note this is separate from the main checkout (`Payment/DanaPayment.tsx`), and unlike checkout it still supports a QRIS branch:

```tsx
// ChatMessage.tsx — dana_payment branch
{data.kind === "QRIS" && data.qrContent && (
  <QRCodeSVG value={data.qrContent} size={200} /> // from `qrcode.react`
)}

{data.kind === "VA" && data.vaNumber && (
  // copyable virtual-account number + "transfer the exact amount" note
)}
```

---

## i18n Keys for AI Promo Content

All promotional copy for the chatbot widget is localized. Keys stored in `/src/locales/common/en.json` and `/id.json`:

| Key                                     | English                                            | Indonesian                                      |
| --------------------------------------- | -------------------------------------------------- | ----------------------------------------------- |
| `common.ai_promo_title`                 | Try TiketQ AI Assistant Now                        | Coba TiketQ AI Assistant Sekarang               |
| `common.ai_promo_banner_title`          | Too lazy to fill forms? Use TiketQ AI!             | Malas isi form? Pakai TiketQ AI Assistant!      |
| `common.ai_promo_banner_desc`           | Click the chat widget on the bottom right and type | Klik widget chat di pojok kanan bawah dan ketik |
| `common.ai_promo_banner_example_flight` | Flight from Batam to Jakarta tomorrow              | Tiket pesawat Batam ke Jakarta besok            |
| `common.ai_promo_banner_example_ferry`  | Ferry from Batam to Singapore tomorrow             | Tiket kapal Batam ke Singapura besok            |
| `common.ai_bubble`                      | Book tickets via AI, ask anything! ✨              | Pesan tiket via AI, tanya apa saja! ✨          |
