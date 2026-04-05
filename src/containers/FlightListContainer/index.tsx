import { getPrice } from "@api/searchFlights/types"
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
import { motion } from "framer-motion"
import moment from "moment"

const FlightListContainer = () => {
    const { query, isReady, push } = useRouter();
    const [isOpen, setOpen] = useState(false);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

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
                const priceA = getPrice(a) ?? Infinity;
                const priceB = getPrice(b) ?? Infinity;
                return sortOrder === 'low' ? priceA - priceB : priceB - priceA;
            });

    }, [flightDatas, selectedAirlines, sortOrder, transitFilter]);



    const totalPassengerCount = (parseInt(adult) || 0) + (parseInt(child) || 0) + (parseInt(infant) || 0);

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
            <div className="flex flex-wrap justify-center min-h-[220px] home-app relative z-30 pt-10">
                <div className="flex flex-wrap justify-center items-center w-full py-[40px] px-4">
                    {isOpen ? (
                        <motion.div 
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="w-full flex justify-center"
                        >
                            <SearchFlight />
                        </motion.div>
                    ) : (
                        <motion.div 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="min-w-[50%] glass-card p-6 rounded-2xl shadow-xl backdrop-blur-3xl border border-white/20 bg-white/10"
                        >
                            <div className="flex flex-wrap md:flex-nowrap lg:flex-nowrap gap-4 items-center">
                                <div className="flex flex-row gap-3 justify-between w-full items-center">
                                    <div className="flex flex-col gap-1 w-[85%]">
                                        <div className="flex flex-row gap-3 items-center">
                                            <p className="text-2xl font-extrabold text-slate-800 tracking-tight">{from ?? '-'}</p>
                                            <div className="h-0.5 w-6 bg-orange-500/50 rounded-full"></div>
                                            <p className="text-2xl font-extrabold text-slate-800 tracking-tight">{to ?? '-'}</p>
                                        </div>
                                        <div className="flex flex-row gap-3 text-slate-600/80 font-medium text-sm">
                                            <p>{moment(date).format("ddd, DD MMM YYYY")}</p>
                                            <p className="text-slate-300">•</p>
                                            <p>{!isMounted ? "..." : t('tickets.passenger', { count: totalPassengerCount })}</p>
                                            <p className="text-slate-300">•</p>
                                            <p className="capitalize">{classParams}</p>
                                        </div>
                                    </div>
                                    <div className="flex w-[15%] justify-end">
                                        <Button 
                                            isIconOnly 
                                            className="button-orange w-14 h-14 rounded-2xl shadow-xl shadow-orange-500/40" 
                                            onClick={handleOpen}
                                        >
                                            <IconSearch width={24} height={24}/>
                                        </Button> 
                                    </div>
                                </div>
                            </div>
                        </motion.div>
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
                    <motion.div 
                        initial="hidden"
                        animate="visible"
                        variants={{
                            visible: { transition: { staggerChildren: 0.05 } }
                        }}
                        className="flex flex-col gap-4 w-full"
                    >
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
                    </motion.div>
                </div>
            </div>
        </>
    )
}

export default FlightListContainer