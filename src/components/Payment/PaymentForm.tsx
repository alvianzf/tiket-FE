import { Card, CardBody, CardHeader, Divider } from "@nextui-org/react"
import { useTranslation } from "react-i18next"
import Button from "@components/Button";
import { GetBookFlightResponse } from "@api/bookFlight/types";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { createMidtransToken } from "@api/midtrans";
import { midtrans_snap_request } from "@api/midtrans/types";

const MIDTRANS_CLIENT_KEY = process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY;

interface Props {
    isLoading: boolean;
    flight?: GetBookFlightResponse;
}

interface SnapResult {
    status_code: string;
    status_message: string;
    transaction_id: string;
    order_id: string;
    gross_amount: string;
    payment_type: string;
    transaction_time: string;
    transaction_status: string;
}

interface SnapInstance {
    pay: (token: string, options: SnapOptions) => void;
}

interface SnapOptions {
    onSuccess: (result: SnapResult) => void;
    onPending: (result: SnapResult) => void;
    onError: (result: SnapResult) => void;
    onClose: () => void;
}

declare global {
    interface Window {
        snap: SnapInstance;
    }
}

const PaymentForm = ({ isLoading, flight }: Props) => {
    const { t } = useTranslation();
    const [isMidtransLoaded, setIsMidtransLoaded] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);

    const { push } = useRouter();

    useEffect(() => {
        const loadMidtransScript = async () => {
            const script = document.createElement('script');
            script.src = `https://app.sandbox.midtrans.com/snap/snap.js`;
            script.setAttribute('data-client-key', MIDTRANS_CLIENT_KEY || '');
            document.body.appendChild(script);

            script.onload = () => {
                setIsMidtransLoaded(true);
            };
        };

        loadMidtransScript();

        return () => {
            const script = document.querySelector('script[src="https://app.sandbox.midtrans.com/snap/snap.js"]');
            if (script) {
                script.remove();
            }
            setIsMidtransLoaded(false);
        };
    }, []);

    const handleOnPayment = async () => {
        try {
            if (!isMidtransLoaded) {
                console.error('Midtrans is not loaded');
                return;
            }

            setIsProcessing(true);

            const orderId = `order-id-${Math.round((new Date()).getTime() / 1000)}`;
            const grossAmount = total;

            const request: midtrans_snap_request = {
                customer_details: {
                    first_name: "John",
                    last_name: "Doe",
                    email: "johndoe@example.com",
                    phone: "08111222333"
                },
                transaction_details: {
                    order_id: orderId,
                    gross_amount: grossAmount
                },
                item_details: [
                    {
                        id: "FLIGHT1",
                        price: grossAmount,
                        quantity: 1,
                        name: "Flight Ticket"
                    }
                ]
            };

            const response = await createMidtransToken(request);

            const { token } = response;

            window.snap.pay(token, {
                onSuccess: function (result: SnapResult) {
                    console.log('success', result);
                    push('/checkout/payment/success');
                },
                onPending: function (result: SnapResult) {
                    console.log('pending', result);
                    push('/checkout/payment/pending');
                },
                onError: function (result: SnapResult) {
                    console.error('error', result);
                    push('/checkout/payment/error');
                },
                onClose: function () {
                    console.log('customer closed the popup without finishing the payment');
                    setIsProcessing(false);
                }
            });

        } catch (error) {
            console.error('Error in payment process:', error);
            setIsProcessing(false);
        }
    };

    const total = parseInt(flight?.data?.nominal ?? '0');

    return (
        <>
            <div className="flex flex-col gap-4">
                <Card classNames={{
                    header: "font-medium"
                }}>
                    <CardHeader>
                        {t('checkout.order_summary')}
                    </CardHeader>
                    <Divider />
                    <CardBody>
                        <div className="flex flex-col gap-5">
                            <div className="flex flex-row justify-between">
                                <p className="text-lg font-medium text-orange">{t('checkout.total')}</p>
                                <p className="text-lg font-medium text-orange">{`${new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(total ?? 0)}`}</p>
                            </div>
                            <div className="flex flex-col gap-2">
                                <div className="flex flex-row justify-between">
                                    <p>{t('checkout.tax')}</p>
                                    <p>{`${new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(parseInt(flight?.data.comission ?? '0') ?? 0)}`}</p>
                                </div>
                            </div>
                        </div>
                    </CardBody>
                </Card>
            </div>

            <Button bgColor={"orange"} isLoading={isLoading || isProcessing} disabled={isLoading || isProcessing || !isMidtransLoaded} onClick={handleOnPayment}>
                {t('checkout.choose_payment')}
            </Button>
        </>
    )
}

export default PaymentForm
