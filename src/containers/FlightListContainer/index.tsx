import { DateIndoFormat } from "@api/baseApi/types"
import FlightCard from "@components/FlightCard"
import FlightCardSkeleton from "@components/FlightCardSkeleton"
import FlightFilter from "@components/FlightFilter"
import FlightNotAvailable from "@components/FlightNotAvailable"
import { useQueryFindFlights } from "@queries/flights"
import { useRouter } from "next/router"
import { useEffect } from "react"

const FlightListContainer = () => {

    const { query, isReady, push } = useRouter();

    const from = query?.from as unknown as string;
    const to = query?.to as unknown as string;
    const date = query?.date as unknown as DateIndoFormat;
    const adult = query?.adult as unknown as string;
    const child = query?.child as unknown as string;
    const infant = query?.infant as unknown as string;

    useEffect(() => {
        if (!isReady) return;

        if (!from || !to || !date || !adult || !child || !infant) {
            push('/');
        }
    }, [isReady, from, to, date, adult, child, infant, push]);

    const { data, isFetching } = useQueryFindFlights({
        request: {
            from,
            to,
            date
        },
        enabled: (!!from && !!to && !!date && isReady && !!adult && !!child && !!infant)
    });

    return (
        <div className="flex flex-wrap justify-center my-10">
            <div className="flex flex-col gap-8 w-full max-w-[1024px]">
                <FlightFilter />
                <div className="flex flex-col gap-4">
                    {!isFetching && data && data?.length > 0 && (
                        data?.map((flight, index) => (
                            <FlightCard flight={flight} key={index}/>
                        ))
                    )}
                    {isFetching && (
                       <>
                            <FlightCardSkeleton />
                            <FlightCardSkeleton />
                            <FlightCardSkeleton />
                       </>
                    )}
                    {!isFetching && !!data && (
                        <FlightNotAvailable />
                    )}
                </div>
            </div>
        </div>
    )
}

export default FlightListContainer