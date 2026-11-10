/* eslint-disable @typescript-eslint/no-explicit-any */
import DanaPayment from "@components/Payment/DanaPayment";
import FerryStepper from "@components/FerryStepper";
import { Card, CardContent, CardHeader, CircularProgress } from "@mui/material";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { getFerryBooking } from "@api/ferry";

const FerryPaymentContainer = () => {

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
        <div className="flex flex-col gap-8 w-full items-center justify-center py-10">
            <div className="flex gap-2 w-full flex-col relative flex-nowrap items-center max-w-[1024px] px-4">
                <FerryStepper activeStep={3} />
            </div>

            <div className="flex gap-4 w-full flex-col relative flex-nowrap items-center max-w-[1024px] px-5">
                {isFetchingBooking && (
                    <div className="flex justify-center py-10">
                        <CircularProgress size={44} color="warning" />
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
                            <CardHeader
                                disableTypography
                                title={<p className="font-bold">Booking No: {bookingNo || '—'}</p>}
                            />
                            <CardContent>
                                <div className="flex flex-col gap-4">
                                    <div className="flex flex-row items-center justify-between">
                                        <p className="font-bold">{embarkation || '—'}</p>
                                        <hr className="border-slate-200 w-[20%]"/>
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
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FerryPaymentContainer
