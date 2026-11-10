import { useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { getApiUrl } from "@api/baseApi";

// Matches the FUNNEL_STEPS allow-list in tiketq-bosbiller's
// routes/api/analytics/index.js — keep these two in sync. Paths not listed
// here just aren't tagged with a funnel step (still tracked as a plain
// pageview).
const FUNNEL_STEP_BY_PATH: Record<string, string> = {
    "/": "ferry_search",
    "/ferry/list": "ferry_list",
    "/ferry/passenger": "ferry_passenger",
    "/ferry/payment": "ferry_payment",
    "/ferry/success": "ferry_success",
    "/ferry/failed": "ferry_failed",
    "/flight": "flight_search",
    "/flights": "flight_list",
    "/checkout": "flight_checkout",
    "/checkout/payment": "flight_payment",
    "/checkout/payment/success": "flight_payment_success",
    "/checkout/payment/failed": "flight_payment_failed",
    "/checkout/payment/waiting": "flight_payment_waiting",
    "/eticket": "flight_eticket",
    "/car-rental": "car_list",
    "/car-rental/[id]": "car_detail",
    "/car-rental/rent": "car_rent_form",
};

const SESSION_KEY = "tiketq_analytics_session";

const randomUUID = (): string => {
    if (typeof crypto !== "undefined" && "randomUUID" in crypto) return crypto.randomUUID();
    // Fallback for older browsers without crypto.randomUUID — good enough
    // for an analytics id, not used for anything security-sensitive.
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
        const r = (Math.random() * 16) | 0;
        const v = c === "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
};

const getSessionId = (): string => {
    try {
        let id = sessionStorage.getItem(SESSION_KEY);
        if (!id) {
            id = randomUUID();
            sessionStorage.setItem(SESSION_KEY, id);
        }
        return id;
    } catch {
        return randomUUID();
    }
};

// Analytics must never break or slow down the app — every call here is
// fire-and-forget, swallows its own errors, and the hook itself never
// throws into the component tree.
const postJson = (url: string, payload: unknown) => {
    try {
        fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
            keepalive: true,
        }).catch(() => undefined);
    } catch {
        // no-op
    }
};

const sendDuration = (apiUrl: string, id: string, durationMs: number) => {
    try {
        const body = JSON.stringify({ id, durationMs });
        const sent = typeof navigator !== "undefined" && navigator.sendBeacon?.(
            `${apiUrl}/api/analytics/duration`,
            new Blob([body], { type: "application/json" })
        );
        if (!sent) postJson(`${apiUrl}/api/analytics/duration`, { id, durationMs });
    } catch {
        // no-op
    }
};

interface ActiveView {
    id: string;
    startedAt: number;
}

/**
 * Tracks page views + time-on-page for the admin's visitor analytics.
 * Mount once, near the root (_app.tsx) — it reacts to Next.js router events
 * itself, nothing else needs to call it per-page.
 */
export const usePageTracking = () => {
    const router = useRouter();
    const activeView = useRef<ActiveView | null>(null);

    useEffect(() => {
        if (!router.isReady) return;

        const apiUrl = getApiUrl();

        const startView = (path: string) => {
            const id = randomUUID();
            activeView.current = { id, startedAt: Date.now() };
            postJson(`${apiUrl}/api/analytics/pageview`, {
                id,
                sessionId: getSessionId(),
                path,
                referrer: typeof document !== "undefined" ? document.referrer || undefined : undefined,
                funnelStep: FUNNEL_STEP_BY_PATH[path],
            });
        };

        const endView = () => {
            if (!activeView.current) return;
            const { id, startedAt } = activeView.current;
            sendDuration(apiUrl, id, Date.now() - startedAt);
            activeView.current = null;
        };

        // Initial page load — routeChangeComplete doesn't fire for this one.
        if (!activeView.current) startView(router.pathname);

        const handleRouteChangeStart = () => endView();
        const handleRouteChangeComplete = () => startView(router.pathname);
        const handleVisibilityChange = () => {
            if (document.visibilityState === "hidden") endView();
        };

        router.events.on("routeChangeStart", handleRouteChangeStart);
        router.events.on("routeChangeComplete", handleRouteChangeComplete);
        window.addEventListener("pagehide", endView);
        document.addEventListener("visibilitychange", handleVisibilityChange);

        return () => {
            router.events.off("routeChangeStart", handleRouteChangeStart);
            router.events.off("routeChangeComplete", handleRouteChangeComplete);
            window.removeEventListener("pagehide", endView);
            document.removeEventListener("visibilitychange", handleVisibilityChange);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [router.isReady]);
};

export default usePageTracking;
