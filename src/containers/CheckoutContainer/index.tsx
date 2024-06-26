import Checkout from "@components/Checkout"
import { useQuerySearchFlights } from "@queries/flights";
import { useRouter } from "next/router";
import { useEffect } from "react";

const CheckoutContainer = () => {

    const { query, isReady, push } = useRouter();

    const from = query?.from as unknown as string;
    const to = query?.to as unknown as string;
    const date = query?.date as unknown as string;
    const adult = query?.adult as unknown as string;
    const child = query?.child as unknown as string;
    const infant = query?.infant as unknown as string;
    const classParams = query?.class as unknown as string;
    const code = query?.code as unknown as string;

    useEffect(() => {
        if (!isReady) return;

        if (!from || !to || !date || !adult || !child || !classParams || !code) {
            push('/');

            return;
        }

    }, [isReady, from, to, date, adult, child, infant, push, classParams]);

    const { data: flights, isFetching } = useQuerySearchFlights({
        request: {
            departure: from,
            arrival: to,
            departureDate: date,
            adult: parseInt(adult),
            child: parseInt(child),
            infant: parseInt(infant),
        },
        enabled: (!!from && !!to && !!date && isReady && !!adult && !!child && !!infant && !!classParams)
    });

    const flightDatas = flights?.data.flatMap((flight) => flight.flat()) ?? [];

    const flightData = flightDatas.find((flight) => flight.searchId === code);

    useEffect(() => {
        if (!isFetching && !flightData) {
            push('/');

            return;
        }
    },[isFetching, flightData])

    return (
        <div className="flex flex-wrap justify-center my-10">
            <div className="flex flex-col gap-8 w-full px-5 max-w-[1024px]">
                <Checkout flightData={flightData} isLoading={isFetching} />
            </div>
        </div>
    )
}

export default CheckoutContainer