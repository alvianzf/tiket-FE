import Checkout from "@components/Checkout"
import { useQuerySearchFlights } from "@queries/flights";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { motion } from "framer-motion";

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

    }, [isReady, from, to, date, adult, child, push, classParams, code]);

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
        if (!isReady && !isFetching && !flightData) {
            push('/');

            return;
        }
    },[isReady, isFetching, flightData, push])

    return (
        <div className="flex flex-wrap justify-center py-16 bg-white min-h-screen">
            <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="flex flex-col gap-10 w-full px-5 max-w-[1024px]"
            >
                <Checkout flightData={flightData} isLoading={isFetching} />
            </motion.div>
        </div>
    )
}

export default CheckoutContainer