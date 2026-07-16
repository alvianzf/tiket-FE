import { Card, CardBody, CardHeader, Divider, RadioGroup, Radio, Snippet } from "@nextui-org/react";
import Button from "@components/Button";
import { createDanaOrder, DanaPayMethod, DanaPaymentResponse } from "@api/dana";
import { getApiUrl } from "@api/baseApi";
import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { QRCodeSVG } from "qrcode.react";
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

const METHODS: { key: DanaPayMethod; label: string }[] = [
    { key: "QRIS", label: "QRIS" },
    { key: "BCA", label: "BCA Virtual Account" },
    { key: "BNI", label: "BNI Virtual Account" },
    { key: "BRI", label: "BRI Virtual Account" },
    { key: "MANDIRI", label: "Mandiri Virtual Account" },
];

const formatIDR = (n: number) =>
    new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(n ?? 0);

const DanaPayment = ({ bookingNo, amount, isLoading = false, successPath = "/eticket" }: Props) => {
    const { t } = useTranslation();
    const { push } = useRouter();

    const total = amount;

    const [method, setMethod] = useState<DanaPayMethod>("QRIS");
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
        socket.on("booking:update", (payload: { bookingNo: string }) => {
            if (payload?.bookingNo === bookingNo) {
                push({ pathname: successPath, query: { bookingno: bookingNo } });
            }
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
                <CardHeader className="font-medium">{t("checkout.complete_payment", "Complete your payment")}</CardHeader>
                <Divider />
                <CardBody className="flex flex-col gap-5">
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

                    {payment.kind === "QRIS" && payment.qrContent && !expired && (
                        <div className="flex flex-col items-center gap-3">
                            <div className="bg-white p-4 rounded-ds-md border">
                                <QRCodeSVG value={payment.qrContent} size={220} />
                            </div>
                            <p className="text-sm text-slate-500 text-center">
                                {t("checkout.scan_qris", "Scan this QR with any QRIS-enabled app (DANA, GoPay, OVO, m-banking).")}
                            </p>
                        </div>
                    )}

                    {payment.kind === "VA" && payment.vaNumber && !expired && (
                        <div className="flex flex-col gap-2">
                            <span className="text-sm text-slate-500">
                                {payment.method} {t("checkout.va_number", "Virtual Account number")}
                            </span>
                            <Snippet symbol="" variant="bordered" className="w-full" classNames={{ pre: "font-mono text-lg tracking-wide" }}>
                                {payment.vaNumber}
                            </Snippet>
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
                </CardBody>
            </Card>
        );
    }

    // Method selection view.
    return (
        <Card>
            <CardHeader className="font-medium">{t("checkout.choose_payment", "Choose a payment method")}</CardHeader>
            <Divider />
            <CardBody className="flex flex-col gap-5">
                <div className="flex justify-between">
                    <span className="text-slate-500">{t("checkout.total")}</span>
                    <span className="font-semibold text-orange">{formatIDR(total)}</span>
                </div>

                <RadioGroup value={method} onValueChange={(v) => setMethod(v as DanaPayMethod)}>
                    {METHODS.map((m) => (
                        <Radio key={m.key} value={m.key}>{m.label}</Radio>
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
            </CardBody>
        </Card>
    );
};

export default DanaPayment;
