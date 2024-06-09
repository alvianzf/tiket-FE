import { DateIndoFormat } from "@api/baseApi/types"
import FlightCard from "@components/FlightCard"
import FlightCardSkeleton from "@components/FlightCardSkeleton"
import FlightFilter from "@components/FlightFilter"
import { useQueryFindFlights } from "@queries/flights"
import { useRouter } from "next/router"

const FlightListContainer = () => {

    const { query, isReady } = useRouter();

    const from = query?.from as unknown as string;
    const to = query?.to as unknown as string;
    const date = query?.date as unknown as DateIndoFormat;

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
                    {!isFetching ? (
                        data?.map((flight) => (
                            <FlightCard flight={flight} key={flight.flight_id}/>
                        ))
                    ): (
                        <>
                            <FlightCardSkeleton />
                            <FlightCardSkeleton />
                            <FlightCardSkeleton />
                        </>
                    )}
                    
                </div>
            </div>
        </div>
    )
}

export default FlightListContainer