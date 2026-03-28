import { Flight } from "@api/searchFlights/types"
import FlightCard from "@components/FlightCard"
import FlightCardSkeleton from "@components/FlightCardSkeleton"
import FlightFilter from "@components/FlightFilter"
import FlightNotAvailable from "@components/FlightNotAvailable"
import SearchFlight from "@components/SearchFlight"
import IconSearch from "@icons/IconSearch"
import { Button } from "@nextui-org/react"
import { useQuerySearchFlights } from "@queries/flights"
import { useRouter } from "next/router"
import { useEffect, useMemo, useState } from "react"
import { useTranslation } from "react-i18next"

const FlightListContainer = () => {
    const { query, isReady, push } = useRouter();
    const [isOpen, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const { t } = useTranslation();

    const [selectedAirlines, setSelectedAirlines] = useState<string[]>([]);
    const [sortOrder, setSortOrder] = useState<string>('low');
    const [transitFilter, setTransitFilter] = useState<string>('all');


    const from = query?.from as string;
    const to = query?.to as string;
    const date = query?.date as string;
    const adult = query?.adult as string;
    const child = query?.child as string;
    const infant = query?.infant as string;
    const classParams = query?.class as string;

    useEffect(() => {
        if (!isReady) return;

        if (!from || !to || !date || !adult || !child || !classParams) {
            push('/');
            return;
        }

        if (from && to && date && isReady && adult && child && infant && classParams) {
            setOpen(false);
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
        enabled: !!(from && to && date && isReady && adult && child && infant && classParams)
    });

    const flightDatas = useMemo(() => flights?.data.flatMap((flight) => flight.flat()) ?? [], [flights]);

    const airlinesData = useMemo(() => {
        const uniqueAirlines = Array.from(new Set(flightDatas.map(f => f.airlineName)));
        return uniqueAirlines.map(name => ({ key: name, label: name }));
    }, [flightDatas]);

    const filteredAndSortedFlights = useMemo(() => {
        return flightDatas
            .filter(flight => {
                const airlineMatch = selectedAirlines.length === 0 || selectedAirlines.includes(flight.airlineName);
                
                // standard transit logic: isTransit true means Transit, false means Direct
                const isDirect = !flight.isTransit; 
                const transitMatch = transitFilter === 'all' || 
                                     (transitFilter === 'direct' && isDirect) ||
                                     (transitFilter === 'transit' && !isDirect);
                
                return airlineMatch && transitMatch;
            })
            .sort((a, b) => {
                const getPrice = (f: Flight) => {
                    const firstClass = f.classes?.[0];
                    if (!firstClass || !firstClass.price) return Infinity;
                    
                    const rawPrice = firstClass.price as string | number;
                    const p = typeof rawPrice === 'string' ? parseFloat(rawPrice.replace(/[^0-9]/g, '')) : Number(rawPrice);
                    
                    return (p && !isNaN(p) && p > 0) ? p : Infinity;
                };
                const priceA = getPrice(a);
                const priceB = getPrice(b);
                return sortOrder === 'low' ? priceA - priceB : priceB - priceA;
            });

    }, [flightDatas, selectedAirlines, sortOrder, transitFilter]);



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
                    ) : (
                        <div className="min-w-[50%] bg-white p-[15px] rounded items-center shadow-sm">
                            <div className="flex flex-wrap md:flex-nowrap lg:flex-nowrap gap-4 items-center">
                                <div className="flex flex-row gap-3 justify-between w-full items-center">
                                    <div className="flex flex-col gap-2 w-[89%]">
                                        <div className="flex flex-row gap-2">
                                            <p className="text-lg font-medium">{from ?? '-'}</p>
                                            <p>{'-'}</p>
                                            <p className="text-lg font-medium">{to ?? '-'}</p>
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
            <div className="flex flex-wrap justify-center my-10 mx-[20px] lg:mx-0 md:mx-[20px]">
                <div className="flex flex-row flex-wrap lg:flex-nowrap gap-8 w-full max-w-[1280px]">
                    <div className="w-full lg:w-[300px] flex-shrink-0">
                        <FlightFilter 
                            selectedAirlines={selectedAirlines}
                            onAirlinesChange={setSelectedAirlines}
                            selectedSort={sortOrder}
                            onSortChange={setSortOrder}
                            selectedTransit={transitFilter}
                            onTransitChange={setTransitFilter}
                            airlinesData={airlinesData}
                        />
                    </div>
                    <div className="flex flex-col gap-4 w-full">
                        {!isFetching && filteredAndSortedFlights && filteredAndSortedFlights.length > 0 && (
                            filteredAndSortedFlights.map((flight, index) => (
                                <FlightCard 
                                    flight={flight} 
                                    key={index} 
                                    handleSelect={handleSelect}
                                />
                            ))
                        )}
                        {isFetching && (
                        <>
                            <FlightCardSkeleton />
                            <FlightCardSkeleton />
                            <FlightCardSkeleton />
                        </>
                        )}
                        {!isFetching && filteredAndSortedFlights.length === 0 && (
                            <FlightNotAvailable />
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}

export default FlightListContainer