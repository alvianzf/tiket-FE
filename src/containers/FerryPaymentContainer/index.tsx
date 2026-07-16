/* eslint-disable @typescript-eslint/no-explicit-any */
import DanaPayment from "@components/Payment/DanaPayment";
import { Card, CardBody, CardHeader, Spinner } from "@nextui-org/react";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
import { getFerryBooking } from "@api/ferry";

const FerryPaymentContainer = () => {

    const { t } = useTranslation();
    const { query } = useRouter();

    const bookingNo = query?.bookingNo as string ?? '';
    const price = parseInt(query?.price as string ?? '0');
    const embarkation = query?.embarkation as string ?? '';
    const destination = query?.destination as string ?? '';
    const vesselName = query?.vesselName as string ?? '';

    const [booking, setBooking] = useState<any>(null);
    const [isFetchingBooking, setIsFetchingBooking] = useState(false);

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

    const totalPrice = booking?.totalPrice ?? price;

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

            <div className="flex gap-4 w-full flex-col relative flex-nowrap items-center max-w-[1024px] px-5">
                {isFetchingBooking && (
                    <div className="flex justify-center py-10">
                        <Spinner size="lg" color="warning" />
                    </div>
                )}

                <div className="flex flex-row flex-wrap gap-[30px] w-full">
                    <div className="flex flex-col gap-[15px] w-[100%] md:w-[60%]">
                        <DanaPayment
                            isLoading={isFetchingBooking}
                            bookingNo={bookingNo}
                            amount={totalPrice}
                            successPath="/ferry/success"
                        />
                    </div>

                    <div className="w-[100%] md:w-[36%]">
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
        </div>
    )
}

export default FerryPaymentContainer
