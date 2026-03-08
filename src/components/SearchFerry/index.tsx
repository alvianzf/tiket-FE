import { Button, DatePicker, Input, Select, SelectItem } from "@nextui-org/react";
import { parseDate } from "@internationalized/date";
import moment from "moment";
import { useTranslation } from "react-i18next"
import { useState, useMemo } from "react";
import { useRouter } from "next/router";
import { useQueryFerryRoutes } from "../../queries/ferry";

const SearchFerry = () => {
    const { t } = useTranslation();
    const [type, setType] = useState<'one_way' | 'round_trip'>('one_way');
    const [departurePort, setDeparturePort] = useState<string>("");
    const [destinationPort, setDestinationPort] = useState<string>("");
    const [departureDate, setDepartureDate] = useState<any>(parseDate(moment().format('YYYY-MM-DD')));
    const [returnDate, setReturnDate] = useState<any>(null);
    const { push } = useRouter();

    const { data: routesData, isLoading: isLoadingRoutes } = useQueryFerryRoutes({ pageIndex: 0, pageSize: 0 });

    const departurePorts = useMemo(() => {
        if (!routesData?.records) return [];
        const ports = new Map();
        routesData.records.forEach((route: any) => {
            ports.set(route.embarkationPort.code, route.embarkationPort.name);
        });
        return Array.from(ports.entries()).map(([code, name]) => ({ code, name }));
    }, [routesData]);

    const availableDestinations = useMemo(() => {
        if (!routesData?.records || !departurePort) return [];
        return routesData.records
            .filter((route: any) => route.embarkationPort.code === departurePort)
            .map((route: any) => ({
                code: route.destinationPort.code,
                name: route.destinationPort.name
            }));
    }, [routesData, departurePort]);

    const handleSearch = () => {
        if (!departurePort || !destinationPort || !departureDate) return;
        
        const params = new URLSearchParams({
            embarkation: departurePort,
            destination: destinationPort,
            tripdate: departureDate.toString().replace(/-/g, ''),
            type
        });

        if (type === 'round_trip' && returnDate) {
            params.append('returndate', returnDate.toString().replace(/-/g, ''));
        }

        push(`/ferry/list?${params.toString()}`);
    };

    return (
        <div className="min-w-[320px] max-w-[400px] glass-card p-6 shadow-2xl">
            <div className="flex flex-col gap-6 w-full">
                <div className="flex flex-row gap-2 bg-slate-200/30 p-1 rounded-xl">
                    <Button 
                        size="sm"
                        className={`grow rounded-lg transition-all ${type === 'one_way' ? 'bg-white shadow-sm text-orange-600 font-bold' : 'bg-transparent text-slate-600 hover:bg-white/50'}`} 
                        onClick={() => setType('one_way')}
                    >
                        {t('tickets.one_way')}
                    </Button> 
                    <Button 
                        size="sm"
                        className={`grow rounded-lg transition-all ${type === 'round_trip' ? 'bg-white shadow-sm text-orange-600 font-bold' : 'bg-transparent text-slate-600 hover:bg-white/50'}`} 
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
                            variant="flat"
                            classNames={{
                                trigger: "bg-white/50 backdrop-blur-md border border-white/40 shadow-sm",
                                label: "text-slate-600 font-medium",
                            }}
                            selectedKeys={departurePort ? [departurePort] : []}
                            onSelectionChange={(keys) => {
                                const selected = Array.from(keys)[0] as string;
                                setDeparturePort(selected);
                                setDestinationPort(""); 
                            }}
                            isLoading={isLoadingRoutes}
                        >
                            {departurePorts.map((port) => (
                                <SelectItem key={port.code} value={port.code} className="capitalize">
                                    {port.name}
                                </SelectItem>
                            ))}
                        </Select>
                    </div>

                    <Select
                        label={t('tickets.destination')}
                        placeholder={t('tickets.destination_placeholder')}
                        variant="flat"
                        classNames={{
                            trigger: "bg-white/50 backdrop-blur-md border border-white/40 shadow-sm",
                            label: "text-slate-600 font-medium",
                        }}
                        selectedKeys={destinationPort ? [destinationPort] : []}
                        onSelectionChange={(keys) => setDestinationPort(Array.from(keys)[0] as string)}
                        disabled={!departurePort}
                    >
                        {availableDestinations.map((port) => (
                            <SelectItem key={port.code} value={port.code} className="capitalize">
                                {port.name}
                            </SelectItem>
                        ))}
                    </Select>

                    <div className="grid grid-cols-1 gap-4">
                        <div className="w-full">
                            <DatePicker 
                                label={t('tickets.departured_date')}
                                variant="flat"
                                classNames={{
                                    calendarContent: "bg-white/90 backdrop-blur-xl",
                                    inputWrapper: "bg-white/50 backdrop-blur-md border border-white/40 shadow-sm",
                                }}
                                value={departureDate}
                                onChange={setDepartureDate}
                                minValue={parseDate(moment().format('YYYY-MM-DD'))}
                            />
                        </div>
                        
                        {type === 'round_trip' && (
                            <div className="w-full">
                                <DatePicker 
                                    label={t('tickets.return_date')}
                                    variant="flat"
                                    classNames={{
                                        calendarContent: "bg-white/90 backdrop-blur-xl",
                                        inputWrapper: "bg-white/50 backdrop-blur-md border border-white/40 shadow-sm",
                                    }}
                                    value={returnDate}
                                    onChange={setReturnDate}
                                    minValue={departureDate || parseDate(moment().format('YYYY-MM-DD'))}
                                />
                            </div>
                        )}
                    </div>
                </div>

                <Button 
                    className="button-orange w-full h-12 text-lg font-bold shadow-orange-500/40 hover:scale-[1.02] active:scale-[0.98]" 
                    onClick={handleSearch}
                    disabled={!departurePort || !destinationPort || !departureDate}
                >
                    {t('tickets.search')}
                </Button> 
            </div>
        </div>
    )
}

export default SearchFerry