import { Card, CardContent, CardHeader, Divider, RadioGroup, Radio, FormControlLabel, IconButton } from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import Button from "@components/Button";
import Dana from "@icons/Dana";
import BankBni from "@icons/BankBni";
import BankBri from "@icons/BankBri";
import BankMandiri from "@icons/BankMandiri";
import { createDanaOrder, DanaPayMethod, DanaPaymentResponse } from "@api/dana";
import { getApiUrl } from "@api/baseApi";
import { useEffect, useMemo, useRef, useState, ReactElement } from "react";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import io from "socket.io-client";

interface Props {
    /** Booking number (flight bookingCode or ferry bookingNo). */
    bookingNo?: string;
    /** Amount in IDR (display only — the server re-prices from the booking). */
    amount: number;
    isLoading?: boolean;
    /** Where to send the user once payment is confirmed. Defaults to the e-ticket. */
    successPath?: string;
}

type IconComponent = (props: { width: number; height: number }) => ReactElement;

// Uses the same payment logos shown on the home page (PaymentPartners). BCA is
// intentionally omitted — it is not enabled for our DANA merchant yet.
const METHODS: { key: DanaPayMethod; label: string; Icon: IconComponent }[] = [
    { key: "DANA", label: "DANA", Icon: Dana },
    { key: "BRI", label: "BRI Virtual Account", Icon: BankBri },
    { key: "MANDIRI", label: "Mandiri Virtual Account", Icon: BankMandiri },
    { key: "BNI", label: "BNI Virtual Account", Icon: BankBni },
];

const formatIDR = (n: number) =>
    new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(n ?? 0);

const DanaPayment = ({ bookingNo, amount, isLoading = false, successPath = "/eticket" }: Props) => {
    const { t } = useTranslation();
    const { push } = useRouter();

    const total = amount;

    const [method, setMethod] = useState<DanaPayMethod>("DANA");
    const [isProcessing, setIsProcessing] = useState(false);
    const [payment, setPayment] = useState<DanaPaymentResponse | null>(null);
    const [remaining, setRemaining] = useState<number | null>(null);
    const isSubmittingRef = useRef(false);

    // Subscribe to booking:update so a completed payment auto-advances to the
    // e-ticket (no polling — Socket.io push, per project rule).
    useEffect(() => {
        if (!bookingNo) return;
        const apiUrl = getApiUrl();
        let socketUrl = apiUrl;
        try {
            socketUrl = new URL(apiUrl).origin;
        } catch (e) {
            socketUrl = apiUrl;
        }
        const socket = io(socketUrl);
        const onBookingUpdate = (payload: { bookingNo: string }) => {
            if (payload?.bookingNo === bookingNo) {
                push({ pathname: successPath, query: { bookingno: bookingNo } });
            }
        };
        socket.on("booking:update", onBookingUpdate);
        // On flaky mobile networks the socket can drop while the user is in the
        // bank/DANA app and reconnect on return. socket.io keeps the
        // booking:update listener attached across reconnects, so any update
        // emitted after we reconnect still routes the user to their e-ticket.
        socket.on("connect", () => {
            // Resubscription is automatic; nothing to re-emit.
        });
        socket.io.on("reconnect", () => {
            // Resubscription is automatic; nothing to re-emit.
        });
        return () => {
            socket.disconnect();
        };
    }, [bookingNo, push, successPath]);

    // Countdown to expiry.
    useEffect(() => {
        if (!payment?.expiryTime) {
            setRemaining(null);
            return;
        }
        const expiry = new Date(payment.expiryTime).getTime();
        const tick = () => setRemaining(Math.max(0, Math.floor((expiry - Date.now()) / 1000)));
        tick();
        const id = setInterval(tick, 1000);
        return () => clearInterval(id);
    }, [payment?.expiryTime]);

    const countdownLabel = useMemo(() => {
        if (remaining == null) return null;
        const m = Math.floor(remaining / 60);
        const s = remaining % 60;
        return `${m}:${String(s).padStart(2, "0")}`;
    }, [remaining]);

    const handlePay = async () => {
        if (!bookingNo || isSubmittingRef.current) return;
        isSubmittingRef.current = true;
        setIsProcessing(true);
        try {
            const result = await createDanaOrder(bookingNo, method);
            // DANA wallet returns a redirect URL — send the user to DANA to pay.
            if (result?.kind === "REDIRECT" && result.redirectUrl) {
                window.location.href = result.redirectUrl;
                return;
            }
            if (!result?.paymentCode) {
                toast.error(t("checkout.payment_failed", "Failed to start payment. Please try again."));
                return;
            }
            setPayment(result);
        } catch (err: unknown) {
            const e = err as { message?: string };
            toast.error(e?.message ?? t("checkout.payment_failed", "Failed to start payment. Please try again."));
        } finally {
            setIsProcessing(false);
            isSubmittingRef.current = false;
        }
    };

    // Payment instructions view (after a method is chosen and the order created).
    if (payment) {
        const expired = remaining === 0;
        return (
            <Card>
                <CardHeader disableTypography title={<span className="font-medium">{t("checkout.complete_payment", "Complete your payment")}</span>} />
                <Divider />
                <CardContent className="flex flex-col gap-5">
                    <div className="flex justify-between">
                        <span className="text-slate-500">{t("checkout.total")}</span>
                        <span className="font-semibold text-orange">{formatIDR(total)}</span>
                    </div>

                    {countdownLabel && (
                        <div className={`text-sm ${expired ? "text-red-600" : "text-slate-500"}`}>
                            {expired
                                ? t("checkout.payment_expired", "This payment has expired. Please start again.")
                                : `${t("checkout.pay_before", "Pay before")}: ${countdownLabel}`}
                        </div>
                    )}

                    {payment.kind === "VA" && payment.vaNumber && !expired && (
                        <div className="flex flex-col gap-2">
                            <span className="text-sm text-slate-500">
                                {payment.method} {t("checkout.va_number", "Virtual Account number")}
                            </span>
                            <div className="flex items-center justify-between gap-3 w-full border-2 border-default rounded-lg px-4 py-2">
                                <pre className="font-mono text-lg tracking-wide m-0">{payment.vaNumber}</pre>
                                <IconButton
                                    size="small"
                                    aria-label={t("checkout.copy", "Copy")}
                                    onClick={() => navigator.clipboard.writeText(payment.vaNumber ?? "")}
                                >
                                    <ContentCopyIcon fontSize="small" />
                                </IconButton>
                            </div>
                            <p className="text-sm text-slate-500">
                                {t("checkout.va_instructions", "Transfer the exact amount to this Virtual Account from your bank app. Your ticket is issued automatically once payment is received.")}
                            </p>
                        </div>
                    )}

                    <Button
                        dsVariant="ghost"
                        className="w-full mt-2"
                        onClick={() => setPayment(null)}
                        disabled={isProcessing}
                    >
                        {t("checkout.change_method", "Change payment method")}
                    </Button>
                </CardContent>
            </Card>
        );
    }

    // Method selection view.
    return (
        <Card>
            <CardHeader disableTypography title={<span className="font-medium">{t("checkout.choose_payment", "Choose a payment method")}</span>} />
            <Divider />
            <CardContent className="flex flex-col gap-5">
                <div className="flex justify-between">
                    <span className="text-slate-500">{t("checkout.total")}</span>
                    <span className="font-semibold text-orange">{formatIDR(total)}</span>
                </div>

                <RadioGroup value={method} onChange={(e) => setMethod(e.target.value as DanaPayMethod)}>
                    {METHODS.map((m) => (
                        <FormControlLabel
                            key={m.key}
                            value={m.key}
                            control={<Radio />}
                            label={
                                <span className="flex items-center gap-3">
                                    <m.Icon width={44} height={44} />
                                    <span>{m.label}</span>
                                </span>
                            }
                        />
                    ))}
                </RadioGroup>

                <Button
                    dsVariant="cta"
                    className="w-full h-14 text-lg"
                    isLoading={isLoading || isProcessing}
                    disabled={isLoading || isProcessing || !bookingNo}
                    onClick={handlePay}
                >
                    {t("checkout.pay_now", "Pay now")}
                </Button>
            </CardContent>
        </Card>
    );
};

export default DanaPayment;
