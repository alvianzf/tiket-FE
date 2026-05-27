# AI Chatbot — Full Implementation Blueprint

This document covers the complete technical implementation of the TiketQ AI Assistant feature — from the frontend Socket.io hook to the backend agentic loop. It includes the exact TypeScript types for every message and tool result, the full `useChatSocket` hook implementation, and a card-by-card breakdown of how `ChatMessage.tsx` renders each tool result type (flight cards, ferry cards, payment UI, booking summaries, and the customer service card). Anyone reading this document should be able to reproduce the chatbot end-to-end without opening the source files.

---

## TypeScript Types (`useChatSocket.ts`)

```typescript
// IMPORTANT: The frontend ToolResultData type only lists some of the backend types.
// The actual type union handled in ChatMessage.tsx is broader.
export type ToolResultData = {
  type: "booking_form" | "qris_payment" | "booking_summary";
  data: any;
};

export type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
  toolResult?: ToolResultData; // Present only when the message is a rich UI card
};
```

> ⚠️ **Type Mismatch Warning:** The `ToolResultData.type` union in the frontend is incomplete. `ChatMessage.tsx` actually handles `'flight_results'`, `'ferry_results'`, and `'customer_service_card'` which are NOT listed in the TypeScript type. The type definition should eventually be expanded.

---

## Full Hook Implementation (`useChatSocket.ts`)

```typescript
export const useChatSocket = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "initial",
      role: "assistant",
      content:
        "Halo! Silakan ketik rute pencarian tiket yang Anda inginkan...\n\nJika Anda butuh bantuan lebih lanjut atau ingin menyampaikan keluhan, cukup ketik **'Customer Service'** kapan saja.",
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
| `'qris_payment'`                       | Shows booking code, amount in IDR, and a "Pay via Midtrans" button. On click, dynamically injects `snap.js` script tag and calls `window.snap.pay(token, callbacks)`. **Requires** `NEXT_PUBLIC_MIDTRANS_CLIENT_KEY` env var.                            |
| `'customer_service_card'`              | Renders a static WhatsApp card. CTA button links to `https://wa.me/6282382709777`.                                                                                                                                                                       |
| `'booking_form'`                       | Shows a template with service type, price, and a text snippet the user can copy with passenger details.                                                                                                                                                  |

### InteractiveResultCard — Confirm Message Format

When the user clicks "Select & Continue" after choosing a flight/ferry:

```javascript
sendMessage(
  `I want to book the ${label} ${isFlight ? "flight" : "ferry"} (${item.airline || item.ferryName}) departing at ${item.departTime} for ${adults} Adult(s), ${children} Child(ren), and ${infants} Infant(s).`,
);
// Example output:
// "I want to book the Cheapest flight (Lion Air) departing at 08:00 for 2 Adult(s), 0 Child(ren), and 0 Infant(s)."
```

This triggers the AI to start the conversational booking data collection flow.

### Midtrans Snap Integration

```typescript
// ChatMessage.tsx dynamically loads the sandbox Midtrans Snap script:
script.src = "https://app.sandbox.midtrans.com/snap/snap.js";
script.setAttribute(
  "data-client-key",
  process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY || "",
);

// Then calls:
window.snap.pay(token, {
  onSuccess: (result) => console.log("Payment success", result),
  onPending: (result) => console.log("Payment pending", result),
  onError: (result) => console.error("Payment error", result),
  onClose: () => console.log("Payment popup closed"),
});
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
