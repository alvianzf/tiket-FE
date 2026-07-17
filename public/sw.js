// Self-destroying service worker.
// The PWA layer was removed after its start-URL worker amplified a client-side
// redirect loop into origin request-hammering. Clients that still have the old
// service worker registered fetch this file on their next update check; it
// unregisters itself, wipes all caches, and reloads open tabs onto the network.
self.addEventListener("install", () => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(keys.map((key) => caches.delete(key)));
      await self.registration.unregister();
      const clients = await self.clients.matchAll({ type: "window" });
      clients.forEach((client) => client.navigate(client.url));
    })()
  );
});
