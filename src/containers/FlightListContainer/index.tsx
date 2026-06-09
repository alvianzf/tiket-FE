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
import { useEffect, useMemo, useState, useRef } from "react"
import { useInView } from "react-intersection-observer"
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
    const tripType = (query?.tripType as string) || 'one_way';
    const returnDate = query?.returnDate as string;
    const segmentsParam = query?.segments as string;

    const isRoundTrip = tripType === 'round_trip';
    const isMultiCity = tripType === 'multi_city';

    type SegmentValue = { from: string; to: string; date: string };
    const multiCitySegments: SegmentValue[] = useMemo(() => {
        if (!isMultiCity || !segmentsParam) return [];
        try { return JSON.parse(segmentsParam) as SegmentValue[]; } catch { return []; }
    }, [isMultiCity, segmentsParam]);

    useEffect(() => {
        if (!isReady) return;

        if (isMultiCity) {
            if (multiCitySegments.length >= 2) { setOpen(false); return; }
            push('/');
            return;
        }

        if (from && to && date && adult && child !== undefined && classParams) {
            setOpen(false);
            return;
        }

        const timer = setTimeout(() => {
            if (!from || !to || !date || !adult || !classParams) {
                push('/');
            }
        }, 0);
        return () => clearTimeout(timer);
    }, [isReady, from, to, date, adult, child, infant, push, classParams, isMultiCity, multiCitySegments]);

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

    const { data: returnFlights, isFetching: isFetchingReturn } = useQuerySearchFlights({
        request: {
            departure: to,
            arrival: from,
            departureDate: returnDate,
            adult: parseInt(adult),
            child: parseInt(child),
            infant: parseInt(infant),
        },
        enabled: !!(isRoundTrip && from && to && returnDate && isReady && adult && child && infant && classParams)
    });

    const mcSeg0 = multiCitySegments[0];
    const mcSeg1 = multiCitySegments[1];
    const mcSeg2 = multiCitySegments[2];
    const mcSeg3 = multiCitySegments[3];

    const { data: mcFlights0, isFetching: mcFetching0 } = useQuerySearchFlights({ request: { departure: mcSeg0?.from ?? '', arrival: mcSeg0?.to ?? '', departureDate: mcSeg0?.date ?? '', adult: parseInt(adult), child: parseInt(child), infant: parseInt(infant) }, enabled: isMultiCity && !!mcSeg0?.from && !!mcSeg0?.to && !!mcSeg0?.date && isReady });
    const { data: mcFlights1, isFetching: mcFetching1 } = useQuerySearchFlights({ request: { departure: mcSeg1?.from ?? '', arrival: mcSeg1?.to ?? '', departureDate: mcSeg1?.date ?? '', adult: parseInt(adult), child: parseInt(child), infant: parseInt(infant) }, enabled: isMultiCity && !!mcSeg1?.from && !!mcSeg1?.to && !!mcSeg1?.date && isReady });
    const { data: mcFlights2, isFetching: mcFetching2 } = useQuerySearchFlights({ request: { departure: mcSeg2?.from ?? '', arrival: mcSeg2?.to ?? '', departureDate: mcSeg2?.date ?? '', adult: parseInt(adult), child: parseInt(child), infant: parseInt(infant) }, enabled: isMultiCity && !!mcSeg2?.from && !!mcSeg2?.to && !!mcSeg2?.date && isReady });
    const { data: mcFlights3, isFetching: mcFetching3 } = useQuerySearchFlights({ request: { departure: mcSeg3?.from ?? '', arrival: mcSeg3?.to ?? '', departureDate: mcSeg3?.date ?? '', adult: parseInt(adult), child: parseInt(child), infant: parseInt(infant) }, enabled: isMultiCity && !!mcSeg3?.from && !!mcSeg3?.to && !!mcSeg3?.date && isReady });

    const mcFlightSets = [
        { data: mcFlights0?.data.flatMap(f => f.flat()) ?? [], isFetching: mcFetching0, seg: mcSeg0 },
        { data: mcFlights1?.data.flatMap(f => f.flat()) ?? [], isFetching: mcFetching1, seg: mcSeg1 },
        { data: mcFlights2?.data.flatMap(f => f.flat()) ?? [], isFetching: mcFetching2, seg: mcSeg2 },
        { data: mcFlights3?.data.flatMap(f => f.flat()) ?? [], isFetching: mcFetching3, seg: mcSeg3 },
    ].filter(s => !!s.seg);

    const [mcSelections, setMcSelections] = useState<(string | null)[]>([null, null, null, null]);

    const flightDatas = useMemo(() => flights?.data.flatMap((flight) => flight.flat()) ?? [], [flights]);
    const returnFlightDatas = useMemo(() => returnFlights?.data.flatMap((flight) => flight.flat()) ?? [], [returnFlights]);

    const [selectedOutboundCode, setSelectedOutboundCode] = useState<string | null>(null);

    const PAGE_SIZE = 10;
    const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
    const [visibleReturnCount, setVisibleReturnCount] = useState(PAGE_SIZE);
    const { ref: sentinelRef, inView } = useInView({ threshold: 0 });
    const { ref: returnSentinelRef, inView: returnInView } = useInView({ threshold: 0 });
    const prevOutboundCode = useRef<string | null>(null);

    useEffect(() => {
        if (prevOutboundCode.current !== selectedOutboundCode) {
            prevOutboundCode.current = selectedOutboundCode;
            setVisibleReturnCount(PAGE_SIZE);
        }
    }, [selectedOutboundCode]);

    useEffect(() => {
        setVisibleCount(PAGE_SIZE);
    }, [from, to, date, selectedAirlines, sortOrder, transitFilter]);

    const airlinesData = useMemo(() => {
        const uniqueAirlines = Array.from(new Set(flightDatas.map(f => f.airlineName)));
        return uniqueAirlines.map(name => ({ key: name, label: name }));
    }, [flightDatas]);

    const filterAndSort = (data: typeof flightDatas) => data
        .filter(flight => {
            const price = getPrice(flight);
            if (price === null) return false;
            const airlineMatch = selectedAirlines.length === 0 || selectedAirlines.includes(flight.airlineName);
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

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const filteredAndSortedFlights = useMemo(() => filterAndSort(flightDatas), [flightDatas, selectedAirlines, sortOrder, transitFilter]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const filteredAndSortedReturnFlights = useMemo(() => filterAndSort(returnFlightDatas), [returnFlightDatas, selectedAirlines, sortOrder, transitFilter]);

    useEffect(() => {
        if (inView && visibleCount < filteredAndSortedFlights.length) {
            setVisibleCount(c => c + PAGE_SIZE);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [inView, filteredAndSortedFlights.length]);

    useEffect(() => {
        if (returnInView && visibleReturnCount < filteredAndSortedReturnFlights.length) {
            setVisibleReturnCount(c => c + PAGE_SIZE);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [returnInView, filteredAndSortedReturnFlights.length]);

    const totalPassengerCount = (parseInt(adult) || 0) + (parseInt(child) || 0) + (parseInt(infant) || 0);

    const handleSelect = (flightCode: string) => () => {
        if (isRoundTrip && !selectedOutboundCode) {
            setSelectedOutboundCode(flightCode);
            return;
        }
        const queryParams: Record<string, string> = {
            from,
            to,
            date,
            adult,
            child,
            infant,
            class: classParams,
            code: isRoundTrip ? selectedOutboundCode! : flightCode,
            tripType
        };
        if (isRoundTrip && returnDate) {
            queryParams.returnDate = returnDate;
            queryParams.returnCode = flightCode;
        }
        push({ pathname: '/checkout', query: queryParams });
    }

    const handleSelectReturn = (flightCode: string) => () => {
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
                code: selectedOutboundCode!,
                returnCode: flightCode,
                returnDate,
                tripType
            }
        });
    }

    return (
        <>
            <div className="flex flex-wrap justify-center min-h-[220px] home-app relative z-30 pt-10 px-4">
                <div className="flex flex-wrap justify-center items-center w-full py-[40px]">
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
                            className="w-full lg:min-w-[50%] lg:w-auto glass-card p-5 md:p-6 rounded-2xl shadow-xl backdrop-blur-3xl border border-white/20 bg-white/10"
                        >
                            <div className="flex flex-row gap-4 items-center justify-between w-full">
                                <div className="flex flex-col gap-1 flex-1">
                                    <div className="flex flex-row gap-2 md:gap-3 items-center">
                                        <p className="text-xl md:text-2xl font-extrabold text-slate-800 tracking-tight">{from ?? '-'}</p>
                                        <div className="h-0.5 w-4 md:w-6 bg-orange-500/50 rounded-full"></div>
                                        <p className="text-xl md:text-2xl font-extrabold text-slate-800 tracking-tight">{to ?? '-'}</p>
                                    </div>
                                    <div className="flex flex-wrap gap-x-3 gap-y-1 text-slate-600/80 font-medium text-xs md:text-sm">
                                        <p>{moment(date).format("ddd, DD MMM YYYY")}</p>
                                        <p className="text-slate-300 hidden md:block">•</p>
                                        <p>{!isMounted ? "..." : t('tickets.passenger', { count: totalPassengerCount })}</p>
                                        <p className="text-slate-300 hidden md:block">•</p>
                                        <p className="capitalize">{classParams}</p>
                                    </div>
                                </div>
                                <div className="flex-shrink-0">
                                    <Button 
                                        isIconOnly 
                                        className="button-orange w-12 h-12 md:w-14 md:h-14 rounded-xl md:rounded-2xl shadow-xl shadow-orange-500/40" 
                                        onClick={handleOpen}
                                    >
                                        <IconSearch width={20} height={20}/>
                                    </Button> 
                                </div>
                            </div>
                        </motion.div>
                    )}
                </div>
            </div>
            <div className="flex flex-wrap justify-center my-10 px-4">
                <div className="flex flex-col lg:flex-row gap-8 w-full max-w-[1280px]">
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
                    <div className="flex flex-col gap-8 w-full">
                        {isRoundTrip && (
                            <p className="text-sm font-semibold text-orange-600 uppercase tracking-wide">
                                {selectedOutboundCode
                                    ? `${t('tickets.return_date')} — ${to} → ${from} · ${moment(returnDate).format('ddd, DD MMM YYYY')}`
                                    : `${t('tickets.departured_date')} — ${from} → ${to} · ${moment(date).format('ddd, DD MMM YYYY')}`
                                }
                            </p>
                        )}
                        {isMultiCity ? (
                            <div className="flex flex-col gap-10 w-full">
                                {mcFlightSets.map((set, segIdx) => {
                                    const activeSegIdx = mcSelections.findIndex(s => s === null);
                                    const isSelected = mcSelections[segIdx] !== null;
                                    if (segIdx > activeSegIdx && activeSegIdx !== -1) return null;
                                    return (
                                        <div key={segIdx} className="flex flex-col gap-4">
                                            <p className="text-sm font-semibold text-orange-600 uppercase tracking-wide">
                                                {t('tickets.segment', { number: segIdx + 1 })} — {set.seg?.from} → {set.seg?.to} · {moment(set.seg?.date).format('ddd, DD MMM YYYY')}
                                                {isSelected && <span className="ml-2 text-green-600">✓</span>}
                                            </p>
                                            {!isSelected && (
                                                <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.05 } } }} className="flex flex-col gap-4">
                                                    {set.isFetching && <><FlightCardSkeleton /><FlightCardSkeleton /><FlightCardSkeleton /></>}
                                                    {!set.isFetching && set.data.length > 0 && set.data.map((flight, i) => (
                                                        <FlightCard key={i} flight={flight} handleSelect={(code) => () => {
                                                            const updated = [...mcSelections];
                                                            updated[segIdx] = code;
                                                            setMcSelections(updated);
                                                            const allSelected = updated.slice(0, mcFlightSets.length).every(s => s !== null);
                                                            if (allSelected) {
                                                                push({ pathname: '/checkout', query: { from: mcFlightSets[0].seg?.from, to: mcFlightSets[mcFlightSets.length - 1].seg?.to, date: mcFlightSets[0].seg?.date, adult, child, infant, class: classParams, code: updated[0]!, tripType: 'multi_city', segments: segmentsParam, allCodes: JSON.stringify(updated.slice(0, mcFlightSets.length)) } });
                                                            }
                                                        }} />
                                                    ))}
                                                    {!set.isFetching && set.data.length === 0 && <FlightNotAvailable />}
                                                </motion.div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        ) : (
                        <motion.div
                            initial="hidden"
                            animate="visible"
                            variants={{ visible: { transition: { staggerChildren: 0.05 } } }}
                            className="flex flex-col gap-4 w-full"
                        >
                            {(!isRoundTrip || !selectedOutboundCode) && (
                                <>
                                    {!isFetching && filteredAndSortedFlights.length > 0 && filteredAndSortedFlights.slice(0, visibleCount).map((flight, index) => (
                                        <FlightCard flight={flight} key={index} handleSelect={handleSelect} />
                                    ))}
                                    {isFetching && <><FlightCardSkeleton /><FlightCardSkeleton /><FlightCardSkeleton /></>}
                                    {!isFetching && filteredAndSortedFlights.length === 0 && <FlightNotAvailable />}
                                    {!isFetching && visibleCount < filteredAndSortedFlights.length && (
                                        <div ref={sentinelRef} className="flex justify-center py-4">
                                            <FlightCardSkeleton />
                                        </div>
                                    )}
                                </>
                            )}
                            {isRoundTrip && selectedOutboundCode && (
                                <>
                                    {!isFetchingReturn && filteredAndSortedReturnFlights.length > 0 && filteredAndSortedReturnFlights.slice(0, visibleReturnCount).map((flight, index) => (
                                        <FlightCard flight={flight} key={index} handleSelect={handleSelectReturn} />
                                    ))}
                                    {isFetchingReturn && <><FlightCardSkeleton /><FlightCardSkeleton /><FlightCardSkeleton /></>}
                                    {!isFetchingReturn && filteredAndSortedReturnFlights.length === 0 && <FlightNotAvailable />}
                                    {!isFetchingReturn && visibleReturnCount < filteredAndSortedReturnFlights.length && (
                                        <div ref={returnSentinelRef} className="flex justify-center py-4">
                                            <FlightCardSkeleton />
                                        </div>
                                    )}
                                </>
                            )}
                        </motion.div>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}

export default FlightListContainer