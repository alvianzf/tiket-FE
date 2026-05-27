# AI Chatbot Integration

TiketQ integrates a conversational AI assistant directly into the frontend layout to allow users to book flights, ferries, and request customer service using natural language.

## Architecture

The chatbot operates on a seamless bidirectional WebSocket layer (`socket.io-client`).

- **Hook:** `useChatSocket.ts` manages the internal state of the `messages` array, typing indicators, and the socket connection.
- **Component:** `ChatBot/index.tsx` is a floating widget anchored to the bottom right of the screen. It renders the conversation history and input form.
- **Rich UI Renderers:** If the backend LLM triggers a specific "tool" (e.g., `execute_flight_booking`, `show_customer_service`), the backend emits a `chat:tool_result` event containing JSON data. The frontend intercepts this payload and renders a custom interactive card (e.g., a flight search form prepopulated with the user's intent, or a clickable WhatsApp support link) directly inside the chat flow.

## Promotional Integrations

To encourage users to utilize the AI assistant:

- A "bubble" tooltip hovers next to the chat button when closed (`Pesan tiket via AI...`).
- AI Promo banners are injected under standard search forms (`SearchFlight`, `SearchFerry`) and inside the `Footer`.
- All text is localized using `react-i18next`.
