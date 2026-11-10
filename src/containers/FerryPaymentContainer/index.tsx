/* eslint-disable @typescript-eslint/no-explicit-any */
import DanaPayment from "@components/Payment/DanaPayment";
import FerryStepper from "@components/FerryStepper";
import { Card, CardContent, CardHeader, CircularProgress } from "@mui/material";
import { Ship, RotateCcw } from "lucide-react";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { getFerryBooking } from "@api/ferry";
import moment from "moment";

const formatTripDate = (value: string) => {
    if (!value) return '';
    const parsed = moment(value, ['YYYYMMDD', 'YYYY-MM-DD'], true);
    return parsed.isValid() ? parsed.format('DD-MM-YYYY') : value;
};

const FerryPaymentContainer = () => {

    const { query } = useRouter();

    const bookingNo = query?.bookingNo as string ?? '';
    const price = parseInt(query?.price as string ?? '0');
    const embarkation = query?.embarkation as string ?? '';
    const destination = query?.destination as string ?? '';
    const tripdate = query?.tripdate as string ?? '';
    const returndate = query?.returndate as string ?? '';
    const isRoundTrip = !!returndate;
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
    const basePrice = booking?.basePrice;
    const serviceFee = booking?.serviceFee;

    const passengers: any[] = booking?.passengers ?? [];

    const formatRp = (value: number) => `Rp ${Number(value).toLocaleString('id-ID')}`;

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
                                    {isRoundTrip && (
                                        <div className="flex items-center gap-1.5 w-fit px-2.5 py-1 rounded-full bg-orange-500/10">
                                            <RotateCcw size={12} className="text-[#ff5a00]" />
                                            <span className="text-[10px] font-black uppercase tracking-wider text-[#ff5a00]">Round Trip</span>
                                        </div>
                                    )}

                                    <div className="flex flex-col gap-2.5">
                                        <div className="flex items-start gap-2">
                                            <Ship size={14} className="text-slate-400 mt-0.5 shrink-0" />
                                            <div className="flex-1">
                                                <div className="flex flex-row items-center justify-between">
                                                    <p className="font-bold">{embarkation || '—'}</p>
                                                    <hr className="border-slate-200 w-[15%]"/>
                                                    <p className="font-bold">{destination || '—'}</p>
                                                </div>
                                                {tripdate && <p className="text-slate-400 text-xs mt-0.5">{formatTripDate(tripdate)}</p>}
                                            </div>
                                        </div>

                                        {isRoundTrip && (
                                            <div className="flex items-start gap-2">
                                                <RotateCcw size={14} className="text-slate-400 mt-0.5 shrink-0" />
                                                <div className="flex-1">
                                                    <div className="flex flex-row items-center justify-between">
                                                        <p className="font-bold">{destination || '—'}</p>
                                                        <hr className="border-slate-200 w-[15%]"/>
                                                        <p className="font-bold">{embarkation || '—'}</p>
                                                    </div>
                                                    <p className="text-slate-400 text-xs mt-0.5">{formatTripDate(returndate)}</p>
                                                </div>
                                            </div>
                                        )}
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
                                    {(basePrice !== undefined || serviceFee !== undefined) && (
                                        <>
                                            <hr className="border-slate-200" />
                                            <div className="flex flex-col gap-1.5 text-sm">
                                                {basePrice !== undefined && (
                                                    <div className="flex flex-row justify-between text-slate-500">
                                                        <p>Ticket Price</p>
                                                        <p>{formatRp(basePrice)}</p>
                                                    </div>
                                                )}
                                                {serviceFee !== undefined && (
                                                    <div className="flex flex-row justify-between text-slate-500">
                                                        <p>Service Fee</p>
                                                        <p>{formatRp(serviceFee)}</p>
                                                    </div>
                                                )}
                                                <div className="flex flex-row justify-between font-bold text-slate-800">
                                                    <p>Total</p>
                                                    <p>{formatRp(totalPrice)}</p>
                                                </div>
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
