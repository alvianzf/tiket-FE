/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, DatePicker, Select, SelectItem } from "@nextui-org/react";
import { parseDate } from "@internationalized/date";
import moment from "moment";
import { useTranslation } from "react-i18next"
import { useState, useMemo } from "react";
import { useRouter } from "next/router";
import { useQueryFerryRoutes } from "../../queries/ferry";
import IconSearch from "@icons/IconSearch";
import { FaShip } from "react-icons/fa";

const SearchFerry = () => {
    const { t } = useTranslation();
    const [type, setType] = useState<'one_way' | 'round_trip'>('one_way');
    const [departurePort, setDeparturePort] = useState<string>("");
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

    return (
        <div className="min-w-[320px] max-w-[420px] glass-card p-8 shadow-[0_20px_50px_rgba(0,0,0,0.15)] backdrop-blur-3xl border border-white/20 bg-white/10 rounded-3xl">
            <div className="flex flex-col gap-6 w-full">
                <div className="flex flex-row gap-2 bg-white/10 p-1.5 rounded-2xl border border-white/10 backdrop-blur-md">
                    <Button 
                        size="sm"
                        className={`grow rounded-xl transition-all h-10 ${type === 'one_way' ? 'bg-orange-500 shadow-lg shadow-orange-500/30 text-white font-bold' : 'bg-transparent text-slate-700/70 hover:bg-white/20'}`} 
                        onClick={() => setType('one_way')}
                    >
                        {t('tickets.one_way')}
                    </Button> 
                    <Button 
                        size="sm"
                        className={`grow rounded-xl transition-all h-10 ${type === 'round_trip' ? 'bg-orange-500 shadow-lg shadow-orange-500/30 text-white font-bold' : 'bg-transparent text-slate-700/70 hover:bg-white/20'}`} 
                        onClick={() => setType('round_trip')}
                    >
                        {t('tickets.round_trip')}
                    </Button> 
                </div>

                <div className="space-y-4">
                    <div className="relative">
                        <Select
                            label={t('tickets.departure')}
                            placeholder={t('tickets.departure_placeholder')}
                            variant="underlined"
                            startContent={<FaShip className="text-[#ff5a00] mr-2" />}
                            selectedKeys={departurePort ? [departurePort] : []}
                            onSelectionChange={(keys) => {
                                const selected = Array.from(keys)[0] as string;
                                setDeparturePort(selected);
                                setDestinationPort(""); 
                            }}
                            isLoading={isLoadingRoutes}
                        >
                            {departurePorts.map((port: any) => (
                                <SelectItem key={port.code} value={port.code} className="capitalize">
                                    {port.name}
                                </SelectItem>
                            ))}
                        </Select>
                    </div>

                    <Select
                        label={t('tickets.destination')}
                        placeholder={t('tickets.destination_placeholder')}
                        variant="underlined"
                        startContent={<FaShip className="text-[#ff5a00] mr-2" />}
                        selectedKeys={destinationPort ? [destinationPort] : []}
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        onSelectionChange={(keys: any) => setDestinationPort(Array.from(keys)[0] as string)}
                        disabled={!departurePort}
                    >
                        {availableDestinations.map((port: any) => (
                            <SelectItem key={port.code} value={port.code} className="capitalize">
                                {port.name}
                            </SelectItem>
                        ))}
                    </Select>

                    <div className="grid grid-cols-1 gap-4">
                        <div className="w-full">
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
                            <div className="w-full">
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
                    </div>
                </div>

                <Button 
                    isIconOnly
                    className="button-orange w-full h-14 text-lg font-bold shadow-xl shadow-orange-500/40 rounded-2xl" 
                    onClick={handleSearch}
                    disabled={!departurePort || !destinationPort || !departureDate}
                >
                    <IconSearch width={24} height={24}/>
                </Button> 
            </div>
        </div>
    )
}

export default SearchFerry