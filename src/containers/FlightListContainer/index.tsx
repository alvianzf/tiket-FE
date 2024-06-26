import FlightCard from "@components/FlightCard"
import FlightCardSkeleton from "@components/FlightCardSkeleton"
import FlightFilter from "@components/FlightFilter"
import FlightNotAvailable from "@components/FlightNotAvailable"
import SearchFlight from "@components/SearchFlight"
import IconSearch from "@icons/IconSearch"
import { Button } from "@nextui-org/react"
import { useQuerySearchAirports } from "@queries/airports"
import { useQuerySearchFlights } from "@queries/flights"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"

const FlightListContainer = () => {

    const { query, isReady, push } = useRouter();

    const [isOpen, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);

    const { t } = useTranslation();

    const from = query?.from as unknown as string;
    const to = query?.to as unknown as string;
    const date = query?.date as unknown as string;
    const adult = query?.adult as unknown as string;
    const child = query?.child as unknown as string;
    const infant = query?.infant as unknown as string;
    const classParams = query?.class as unknown as string;

    useEffect(() => {
        if (!isReady) return;

        if (!from || !to || !date || !adult || !child || !classParams) {
            push('/');

            return;
        }

        if(!!from && !!to && !!date && isReady && !!adult && !!child && !!infant && !!classParams) {
            setOpen(false);
            return
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

    const { data: origin } = useQuerySearchAirports({
        enabled: true,
        request: from
    });

    const { data: destination } = useQuerySearchAirports({
        enabled: true,
        request: to
    });

    const flightDatas = flights?.data.flatMap((flight) => flight.flat()) ?? [];

    const totalPassenger = parseInt(adult) + parseInt(child) + parseInt(infant);

    const handleSelect = (flightCode: string) => () => {
        push({
            pathname: '/checkout',
            query: {
                from,
                to,
                date,
                adult,
                child,
                infant,
                class: classParams,
                code: flightCode
            }
        });
    }

    return (
        <>
            <div className="flex flex-wrap justify-center min-h-[200px] home-app">
                <div className="flex flex-wrap justify-center items-center w-full py-[40px]">
                        {isOpen ? (
                            <SearchFlight />
                        ): (
                            <div className="min-w-[50%] bg-white p-[15px] rounded items-center">
                                <div className="flex flex-wrap md:flex-nowrap lg:flex-nowrap gap-4 items-center">
                                    <div className="flex flex-row gap-3 justify-between w-full items-center">
                                        <div className="flex flex-col gap-2 w-[89%]">
                                            <div className="flex flex-row gap-2">
                                                <p className="text-lg font-medium">{origin?.data?.[0]?.name ?? '-'}</p>
                                                <p>{'-'}</p>
                                                <p className="text-lg font-medium">{destination?.data?.[0]?.name ?? '-'}</p>
                                            </div>
                                            <div className="flex flex-row gap-2">
                                                <p>{date}</p>
                                                <p>|</p>
                                                <p>{t('tickets.passenger', { count: totalPassenger })}</p>
                                                <p>|</p>
                                                <p>{classParams}</p>
                                            </div>
                                        </div>
                                        <div className="flex w-[10%] justify-end">
                                            <Button isIconOnly className="button-orange" onClick={handleOpen}>
                                                <IconSearch width={30} height={30}/>
                                            </Button> 
                                        </div>
                                    </div>                 
                                </div>
                            </div>
                        )}
                </div>
            </div>
            <div className="flex flex-wrap justify-center my-10">
                <div className="flex flex-col gap-8 w-full max-w-[1024px]">
                    <FlightFilter />
                    <div className="flex flex-col gap-4">
                        {!isFetching && flightDatas && flightDatas?.length > 0 && (
                            flightDatas?.map((flight, index) => (
                                <FlightCard flight={flight} key={index} handleSelect={handleSelect}/>
                            ))
                        )}
                        {isFetching && (
                        <>
                                <FlightCardSkeleton />
                                <FlightCardSkeleton />
                                <FlightCardSkeleton />
                        </>
                        )}
                        {!isFetching && !flights && (
                            <FlightNotAvailable />
                        )}
                    </div>
                </div>
            </div>
            
        </>
    )
}

export default FlightListContainer