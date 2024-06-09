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

    useEffect(
        () => {
            if(isReady && !from && !to && !date) {
                push('/');
            }
        },
        [isReady, from, to, date]
    )

    const { data, isFetching } = useQueryFindFlights({
        request: {
            from,
            to,
            date
        },
        enabled: (!!from && !!to && !!date && isReady)
    });

    return (
        <div className="flex flex-wrap justify-center my-10">
            <div className="flex flex-col gap-8 w-full max-w-[1024px]">
                <FlightFilter />
                <div className="flex flex-col gap-4">
                    {!isFetching && data && data?.length > 0 && (
                        data?.map((flight) => (
                            <FlightCard flight={flight} key={flight.flight_id}/>
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