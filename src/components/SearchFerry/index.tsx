/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, DatePicker, Autocomplete, AutocompleteItem } from "@nextui-org/react";
import { parseDate } from "@internationalized/date";
import moment from "moment";
import { useTranslation } from "react-i18next"
import { useState, useMemo, useEffect } from "react";
import { useRouter } from "next/router";
import { useQueryFerryRoutes } from "../../queries/ferry";
import IconSearch from "@icons/IconSearch";
import { FaShip } from "react-icons/fa";

const SearchFerry = () => {
    const [mounted, setMounted] = useState(false);
    const { t } = useTranslation();
    const [type, setType] = useState<'one_way' | 'round_trip'>('one_way');
    const [departurePort, setDeparturePort] = useState<string>("");

    useEffect(() => {
        setMounted(true);
    }, []);
    const [destinationPort, setDestinationPort] = useState<string>("");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [departureDate, setDepartureDate] = useState<any>(parseDate(moment().format('YYYY-MM-DD')));
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [returnDate, setReturnDate] = useState<any>(null);
    const { push } = useRouter();

    const { data: routesData, isLoading: isLoadingRoutes } = useQueryFerryRoutes({ pageIndex: 0, pageSize: 0 });

    const departurePorts = useMemo(() => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const data = (routesData as any)?.data;
        if (!data?.records) return [];
        const ports = new Map();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        data.records.forEach((route: any) => {
            ports.set(route.embarkationPort.code, route.embarkationPort.name);
        });
        return Array.from(ports.entries()).map(([code, name]) => ({ code, name }));
    }, [routesData]);

    const availableDestinations = useMemo(() => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const data = (routesData as any)?.data;
        if (!data?.records || !departurePort) return [];
        return data.records
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            .filter((route: any) => route.embarkationPort.code === departurePort)
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            .map((route: any) => ({
                code: route.destinationPort.code,
                name: route.destinationPort.name
            }));
    }, [routesData, departurePort]);

    const handleSearch = () => {
        if (!departurePort || !destinationPort || !departureDate) return;
        
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const params = new URLSearchParams({
            embarkation: departurePort,
            destination: destinationPort,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            tripdate: (departureDate as any).toString().replace(/-/g, ''),
            type
        });

        if (type === 'round_trip' && returnDate) {
            params.append('returndate', returnDate.toString().replace(/-/g, ''));
        }

        push(`/ferry/list?${params.toString()}`);
    };

    if (!mounted) {
        return (
            <div className="w-full lg:max-w-[1024px] glass-card p-6 md:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.15)] backdrop-blur-3xl border border-white/20 bg-white/10 rounded-3xl mx-auto animate-pulse h-[136px] flex items-center justify-center">
                <div className="w-full h-12 bg-white/10 rounded-xl" />
            </div>
        );
    }

    return (
        <div className="w-full lg:max-w-[1024px] glass-card p-6 md:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.15)] backdrop-blur-3xl border border-white/20 bg-white/10 rounded-3xl mx-auto">
            <div className="flex flex-col gap-6 w-full">
                <div className="flex flex-row gap-2 bg-white/10 p-1.5 rounded-2xl border border-white/10 backdrop-blur-md w-fit">
                    <Button 
                        size="sm"
                        className={`grow rounded-xl transition-all h-10 px-4 min-w-0 ${type === 'one_way' ? 'bg-orange-500 shadow-lg shadow-orange-500/30 text-white font-bold' : 'bg-transparent text-slate-700/70 hover:bg-white/20'}`} 
                        onClick={() => setType('one_way')}
                    >
                        <span className="truncate">{t('tickets.one_way')}</span>
                    </Button> 
                    <Button 
                        size="sm"
                        className={`grow rounded-xl transition-all h-10 px-4 min-w-0 ${type === 'round_trip' ? 'bg-orange-500 shadow-lg shadow-orange-500/30 text-white font-bold' : 'bg-transparent text-slate-700/70 hover:bg-white/20'}`} 
                        onClick={() => setType('round_trip')}
                    >
                        <span className="truncate">{t('tickets.round_trip')}</span>
                    </Button> 
                </div>

                <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 items-end w-full">
                    <div className="w-full lg:flex-1 relative">
                        <Autocomplete
                            label={t('tickets.departure')}
                            placeholder={t('tickets.departure_placeholder')}
                            variant="underlined"
                            startContent={<FaShip className="text-[#ff5a00] mr-2" />}
                            selectedKey={departurePort}
                            onSelectionChange={(key) => {
                                if (key) {
                                    setDeparturePort(key as string);
                                    setDestinationPort(""); 
                                }
                            }}
                            isLoading={isLoadingRoutes}
                            popoverProps={{ classNames: { content: "z-[9999]" }, placement: "bottom" }}
                        >
                            {departurePorts.map((port: any) => (
                                <AutocompleteItem key={port.code} value={port.code} className="capitalize">
                                    {port.name}
                                </AutocompleteItem>
                            ))}
                        </Autocomplete>
                    </div>

                    <div className="w-full lg:flex-1 relative">
                        <Autocomplete
                            label={t('tickets.destination')}
                            placeholder={t('tickets.destination_placeholder')}
                            variant="underlined"
                            startContent={<FaShip className="text-[#ff5a00] mr-2" />}
                            selectedKey={destinationPort}
                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                            onSelectionChange={(key: any) => {
                                if (key) {
                                    setDestinationPort(key as string);
                                }
                            }}
                            isDisabled={!departurePort}
                            popoverProps={{ classNames: { content: "z-[9999]" }, placement: "bottom" }}
                        >
                            {availableDestinations.map((port: any) => (
                                <AutocompleteItem key={port.code} value={port.code} className="capitalize">
                                    {port.name}
                                </AutocompleteItem>
                            ))}
                        </Autocomplete>
                    </div>

                    <div className="w-full lg:flex-1">
                        <DatePicker 
                            label={t('tickets.departured_date')}
                            variant="underlined"
                            classNames={{
                                calendarContent: "bg-white/90 backdrop-blur-xl",
                            }}
                            showMonthAndYearPickers
                            value={departureDate}
                            onChange={setDepartureDate}
                            minValue={parseDate(moment().format('YYYY-MM-DD'))}
                        />
                    </div>
                    
                    {type === 'round_trip' && (
                        <div className="w-full lg:flex-1">
                            <DatePicker 
                                label={t('tickets.return_date')}
                                variant="underlined"
                                classNames={{
                                    calendarContent: "bg-white/90 backdrop-blur-xl",
                                }}
                                showMonthAndYearPickers
                                value={returnDate}
                                onChange={setReturnDate}
                                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                minValue={(departureDate as any) || parseDate(moment().format('YYYY-MM-DD'))}
                            />
                        </div>
                    )}

                    <Button 
                        className="button-orange w-full lg:min-w-[56px] lg:w-[56px] h-[56px] rounded-2xl flex items-center justify-center gap-2 mt-4 lg:mt-0" 
                        onClick={handleSearch}
                        disabled={!departurePort || !destinationPort || !departureDate}
                    >
                        <IconSearch width={24} height={24}/>
                        <span className="lg:hidden ml-2 font-bold">{t('common.search_ferry')}</span>
                    </Button> 
                </div>
            </div>

            {/* AI Banner */}
            <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-orange-500/20 to-primary/20 border border-orange-500/30 flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-primary to-orange-500 flex items-center justify-center shadow-lg shadow-orange-500/30 text-white shrink-0">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path></svg>
                    </div>
                    <div>
                        <p className="text-white font-bold text-sm md:text-base">Malas isi form? Pakai TiketQ AI Assistant!</p>
                        <p className="text-white/80 text-xs md:text-sm">Klik widget chat di pojok kanan bawah dan ketik <span className="font-mono bg-black/20 px-1 py-0.5 rounded">&quot;Tiket kapal Batam ke Singapura besok&quot;</span></p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SearchFerry