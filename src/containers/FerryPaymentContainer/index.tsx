/* eslint-disable @typescript-eslint/no-explicit-any */
import PaymentRadio from "@components/Payment/PaymentRadio";
import BankBca from "@icons/BankBca";
import BankBni from "@icons/BankBni";
import BankMandiri from "@icons/BankMandiri";
import { Button, Card, CardBody, CardHeader, RadioGroup, Spinner } from "@nextui-org/react";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
import { getFerryBooking } from "@api/ferry";
import { createMidtransToken } from "@api/midtrans";
import { toast } from "react-toastify";

const MIDTRANS_CLIENT_KEY = process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY;

const FerryPaymentContainer = () => {

    const { t } = useTranslation();
    const { push, query } = useRouter();

    const bookingNo = query?.bookingNo as string ?? '';
    const price = parseInt(query?.price as string ?? '0');
    const embarkation = query?.embarkation as string ?? '';
    const destination = query?.destination as string ?? '';
    const vesselName = query?.vesselName as string ?? '';
    const contactEmail = query?.contactEmail as string ?? '';

    const [booking, setBooking] = useState<any>(null);
    const [isFetchingBooking, setIsFetchingBooking] = useState(false);
    const [isMidtransLoaded, setIsMidtransLoaded] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);

    // Load booking details
    useEffect(() => {
        if (!bookingNo) return;
        setIsFetchingBooking(true);
        getFerryBooking(bookingNo)
            .then((data) => setBooking(data))
            .catch((err) => {
                console.warn('Could not load ferry booking details:', err?.message ?? err);
                // Graceful degradation: still show data from URL params
            })
            .finally(() => setIsFetchingBooking(false));
    }, [bookingNo]);

    // Load Midtrans Snap
    useEffect(() => {
        const script = document.createElement('script');
        script.src = `https://app.sandbox.midtrans.com/snap/snap.js`;
        script.setAttribute('data-client-key', MIDTRANS_CLIENT_KEY || '');
        document.body.appendChild(script);
        script.onload = () => setIsMidtransLoaded(true);
        return () => {
            const existing = document.querySelector('script[src="https://app.sandbox.midtrans.com/snap/snap.js"]');
            if (existing) existing.remove();
            setIsMidtransLoaded(false);
        };
    }, []);

    const totalPrice = booking?.totalPrice ?? price;

    const formattedPrice = new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        maximumFractionDigits: 0,
    }).format(totalPrice ?? 0);

    const handlePay = async () => {
        if (!bookingNo) return;
        if (!isMidtransLoaded) {
            toast.error('Payment system not ready. Please wait a moment.');
            return;
        }

        setIsProcessing(true);
        try {
            // Get Midtrans token — booking was already submitted in the passenger step
            const orderId = `ferry-${bookingNo}-${Date.now()}`;
            const request = {
                customer_details: {
                    name: booking?.contactName ?? '',
                    email: contactEmail,
                    phone: booking?.contactMobileNumber ?? '',
                },
                transaction_details: {
                    order_id: orderId,
                    gross_amount: totalPrice,
                },
                item_details: [
                    {
                        id: bookingNo,
                        price: totalPrice,
                        quantity: 1,
                        name: `Ferry Ticket – ${vesselName || embarkation + ' → ' + destination}`,
                    }
                ]
            };

            const { token } = await createMidtransToken(request);

            if (window.snap) {
                window.snap.pay(token, {
                    onSuccess: () => {
                        toast.success('Payment successful!');
                        push('/ferry/success');
                    },
                    onPending: () => {
                        toast.info('Payment pending.');
                        push('/ferry/success');
                    },
                    onError: () => {
                        toast.error('Payment failed. Please try again.');
                        push('/ferry/failed');
                    },
                    onClose: () => {
                        console.log('User closed Midtrans popup.');
                    }
                });
            }
        } catch (err: any) {
            console.error('Ferry payment error:', err);
            toast.error(err?.message ?? 'Payment process failed. Please try again.');
        } finally {
            setIsProcessing(false);
        }
    };

    const passengers: any[] = booking?.passengers ?? [];

    return (
        <div className="flex flex-col gap-8 w-full items-center justify-center">
            <div className="flex gap-2 w-full flex-col relative flex-nowrap items-center max-w-[1024px]">
                <Card className="px-4 w-full mt-[40px]">
                    <CardBody>
                        <div className="flex flex-row items-center w-full gap-2">
                            <div className="flex flex-col items-center gap-1 w-[20%]">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="#4267b2" width="20px" height="20px" viewBox="0 0 512 512" stroke="#4267b2">
                                    <g id="SVGRepo_bgCarrier" strokeWidth="0"/>
                                    <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"/>
                                    <g id="SVGRepo_iconCarrier"><path d="M256 8C119.033 8 8 119.033 8 256s111.033 248 248 248 248-111.033 248-248S392.967 8 256 8zm80 248c0 44.112-35.888 80-80 80s-80-35.888-80-80 35.888-80 80-80 80 35.888 80 80z"/></g>
                                </svg>
                                <span>{t('tickets.select_schedule')}</span>
                            </div>
                            <div className="flex flex-col items-center w-[20%]">
                                <hr className="border-1 border-black w-[50%]" />
                            </div>
                            <div className="flex flex-col items-center w-[20%]">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="#4267b2" width="20px" height="20px" viewBox="0 0 512 512" stroke="#4267b2">
                                    <g id="SVGRepo_bgCarrier" strokeWidth="0"/>
                                    <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"/>
                                    <g id="SVGRepo_iconCarrier"><path d="M256 8C119.033 8 8 119.033 8 256s111.033 248 248 248 248-111.033 248-248S392.967 8 256 8zm80 248c0 44.112-35.888 80-80 80s-80-35.888-80-80 35.888-80 80-80 80 35.888 80 80z"/></g>
                                </svg>
                                <span>{t('tickets.ordering_details')}</span>
                            </div>
                            <div className="flex flex-col items-center w-[20%]">
                                <hr className="border-1 border-black w-[50%]" />
                            </div>
                            <div className="flex flex-col items-center w-[20%]">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="#4267b2" width="20px" height="20px" viewBox="0 0 512 512" stroke="#4267b2">
                                    <g id="SVGRepo_bgCarrier" strokeWidth="0"/>
                                    <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"/>
                                    <g id="SVGRepo_iconCarrier"><path d="M256 8C119.033 8 8 119.033 8 256s111.033 248 248 248 248-111.033 248-248S392.967 8 256 8zm80 248c0 44.112-35.888 80-80 80s-80-35.888-80-80 35.888-80 80-80 80 35.888 80 80z"/></g>
                                </svg>
                                <span>{t('tickets.payment')}</span>
                            </div>
                        </div>
                    </CardBody>
                </Card>
            </div>

            <div className="flex gap-4 w-full flex-col relative flex-nowrap items-center max-w-[1280px]">
                {isFetchingBooking && (
                    <div className="flex justify-center py-10">
                        <Spinner size="lg" color="warning" />
                    </div>
                )}

                <Card className="p-6 w-full">
                    <CardHeader className="text-center w-full">
                        <p className="text-center text-orange w-full font-semibold">
                            Complete your payment — Booking No: <span className="font-bold">{bookingNo}</span>
                        </p>
                    </CardHeader>
                    <CardBody>
                        <div className="flex flex-col gap-4">
                            {/* Bank Transfer Options */}
                            <div className="flex flex-col gap-2">
                                <p className="font-bold">Bank Transfer</p>
                                <p className="text-slate-500 text-sm">Select bank account</p>
                                <div className="flex flex-row gap-2">
                                    <div className="flex flex-col w-[50%]">
                                        <RadioGroup>
                                            <PaymentRadio value="bca">
                                                <div className="flex flex-row items-center gap-5">
                                                    <BankBca width={30} height={30}/>
                                                    <p>{'BCA - Abdul Rahman 0613336939'}</p>
                                                </div>
                                            </PaymentRadio>
                                            <PaymentRadio value="bni">
                                                <div className="flex flex-row items-center gap-5">
                                                    <BankMandiri width={30} height={30}/>
                                                    <p>{'BNI - Abdul Rahman 2100900774'}</p>
                                                </div>
                                            </PaymentRadio>
                                            <PaymentRadio value="bri">
                                                <div className="flex flex-row items-center gap-5">
                                                    <BankBni width={30} height={30}/>
                                                    <p>{'BRI - Abdul Rahman 033101073801501'}</p>
                                                </div>
                                            </PaymentRadio>
                                        </RadioGroup>
                                    </div>

                                    {/* Booking Summary */}
                                    <div className="flex flex-col w-[50%]">
                                        <Card>
                                            <CardHeader>
                                                <p className="font-bold">Booking No: {bookingNo || '—'}</p>
                                            </CardHeader>
                                            <CardBody>
                                                <div className="flex flex-col gap-4">
                                                    <div className="flex flex-row items-center justify-between">
                                                        <p className="font-bold">{embarkation || '—'}</p>
                                                        <hr className="border-1 border-black w-[20%]"/>
                                                        <p className="font-bold">{destination || '—'}</p>
                                                    </div>
                                                    {vesselName && <p className="text-slate-500 text-sm">{vesselName}</p>}
                                                    {passengers.length > 0 && (
                                                        <>
                                                            <i>Passenger Data</i>
                                                            <div className="flex flex-col gap-1">
                                                                {passengers.map((p, i) => (
                                                                    <div key={i} className="flex flex-row justify-end text-right gap-2 text-sm">
                                                                        <p className="font-bold">{p.title} {p.firstName} {p.lastName}</p>
                                                                        <p>-</p>
                                                                        <i>Adult</i>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </>
                                                    )}
                                                </div>
                                            </CardBody>
                                        </Card>
                                    </div>
                                </div>
                            </div>

                            {/* Pricing Summary */}
                            <div className="flex flex-col gap-4">
                                <p className="font-bold text-[24px]">Price Details</p>
                                <div className="flex flex-col gap-2 border p-4">
                                    <div className="flex flex-row justify-between">
                                        <p className="font-bold text-[20px]">Total Amount</p>
                                        <p className="text-orange font-bold text-[26px]">{formattedPrice}</p>
                                    </div>
                                </div>
                            </div>

                            <Button
                                className={'button-orange'}
                                isLoading={isProcessing || !isMidtransLoaded}
                                disabled={isProcessing || !isMidtransLoaded || !bookingNo}
                                onClick={handlePay}
                            >
                                {'Pay Now'}
                            </Button>
                        </div>
                    </CardBody>
                </Card>
            </div>
        </div>
    )
}

export default FerryPaymentContainer