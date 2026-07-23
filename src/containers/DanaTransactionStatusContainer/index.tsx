import { getApiUrl } from "@api/baseApi";
import Button from "@components/Button";
import { CircularProgress } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import io from "socket.io-client";
import { useQueryCheckBookFlight } from "@queries/bookFlight";

// DANA PAY_RETURN landing page. After paying in the DANA app the user is sent
// to /dana-transaction-status?bookingno=<code>. We wait for the booking:update
// Socket.io push and forward to the e-ticket once the matching update arrives.
// A slow poll backs the socket up: if the push fired while this page was
// closed/refreshed, the poll still sees the issued ticket and forwards —
// the page survives a refresh instead of waiting forever.
const DanaTransactionStatusContainer = () => {

    const { t } = useTranslation();
    const { query, isReady, push } = useRouter();

    const bookingno = query?.bookingno as string | undefined;

    useQueryCheckBookFlight({
        enabled: !!bookingno,
        request: bookingno ?? "",
        refetchInterval: 5000,
        onSuccess: (response) => {
            if (response?.data?.status === "ISSUED" && bookingno) {
                push({ pathname: "/eticket", query: { bookingno } });
            }
        },
    });

    useEffect(() => {
        if (!bookingno) return;

        const apiUrl = getApiUrl();
        let socketUrl = apiUrl;
        try {
            socketUrl = new URL(apiUrl).origin;
        } catch (e) {
            socketUrl = apiUrl;
        }

        const socket = io(socketUrl);
        socket.on("booking:update", (payload: { bookingNo: string }) => {
            if (payload?.bookingNo === bookingno) {
                push({ pathname: "/eticket", query: { bookingno } });
            }
        });

        return () => {
            socket.disconnect();
        };
    }, [bookingno, push]);

    return (
        <div className="flex justify-center px-5 py-16 min-h-screen">
            <div className="glass-card bg-white/85 p-8 md:p-12 shadow-lg w-full max-w-[560px] flex flex-col items-center text-center gap-8">
                <CircularProgress size={48} />

                <div className="space-y-2">
                    <h1 className="text-2xl font-extrabold text-primary">
                        {t("checkout.checking_payment", "Checking your payment…")}
                    </h1>
                    <p className="text-slate-500">
                        {t("checkout.checking_payment_description", "We're confirming your DANA payment. This page will update automatically once it's done.")}
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
                    {isReady && bookingno && (
                        <Button
                            dsVariant="cta"
                            className="h-12 px-10 rounded-ds-sm shadow-md"
                            component={Link}
                            href={`/eticket?bookingno=${encodeURIComponent(bookingno)}`}
                        >
                            {t("checkout.view_my_ticket", "View my ticket")}
                        </Button>
                    )}
                    <Button dsVariant="ghost" className="h-12 px-10 rounded-ds-sm shadow-md" component={Link} href="/">
                        {t("profile.home")}
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default DanaTransactionStatusContainer;
