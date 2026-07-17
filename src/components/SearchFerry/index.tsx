/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Autocomplete, TextField, InputAdornment } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
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
    const [departureDate, setDepartureDate] = useState<any>(moment());
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
            tripdate: (departureDate as any).format('YYYYMMDD'),
            type
        });

        if (type === 'round_trip' && returnDate) {
            params.append('returndate', returnDate.format('YYYYMMDD'));
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
                    <button
                        type="button"
                        className={`grow rounded-xl transition-all h-10 px-4 min-w-0 text-sm font-medium ${type === 'one_way' ? 'bg-orange-500 shadow-lg shadow-orange-500/30 text-white font-bold' : 'bg-transparent text-slate-700/70 hover:bg-white/20'}`}
                        onClick={() => setType('one_way')}
                    >
                        <span className="truncate">{t('tickets.one_way')}</span>
                    </button>
                    <button
                        type="button"
                        className={`grow rounded-xl transition-all h-10 px-4 min-w-0 text-sm font-medium ${type === 'round_trip' ? 'bg-orange-500 shadow-lg shadow-orange-500/30 text-white font-bold' : 'bg-transparent text-slate-700/70 hover:bg-white/20'}`}
                        onClick={() => setType('round_trip')}
                    >
                        <span className="truncate">{t('tickets.round_trip')}</span>
                    </button>
                </div>

                <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 items-end w-full">
                    <div className="w-full lg:flex-1 relative">
                        <Autocomplete
                            options={departurePorts}
                            loading={isLoadingRoutes}
                            value={departurePorts.find((port: any) => port.code === departurePort) ?? null}
                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                            onChange={(_, port: any) => {
                                if (port) {
                                    setDeparturePort(port.code);
                                    setDestinationPort("");
                                }
                            }}
                            getOptionLabel={(port: any) => port.name}
                            isOptionEqualToValue={(option: any, val: any) => option.code === val.code}
                            slotProps={{ popper: { className: "z-[9999]", placement: "bottom" } }}
                            renderOption={(props, port: any) => (
                                <li {...props} key={port.code} className={`${props.className} capitalize`}>
                                    {port.name}
                                </li>
                            )}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    variant="standard"
                                    label={t('tickets.departure')}
                                    placeholder={t('tickets.departure_placeholder')}
                                    slotProps={{
                                        ...params.slotProps,
                                        input: {
                                            ...params.slotProps.input,
                                            startAdornment: (
                                                <>
                                                    <InputAdornment position="start"><FaShip className="text-[#ff5a00]" /></InputAdornment>
                                                    {params.slotProps.input.startAdornment}
                                                </>
                                            )
                                        }
                                    }}
                                />
                            )}
                        />
                    </div>

                    <div className="w-full lg:flex-1 relative">
                        <Autocomplete
                            options={availableDestinations}
                            value={availableDestinations.find((port: any) => port.code === destinationPort) ?? null}
                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                            onChange={(_, port: any) => {
                                if (port) {
                                    setDestinationPort(port.code);
                                }
                            }}
                            getOptionLabel={(port: any) => port.name}
                            isOptionEqualToValue={(option: any, val: any) => option.code === val.code}
                            disabled={!departurePort}
                            slotProps={{ popper: { className: "z-[9999]", placement: "bottom" } }}
                            renderOption={(props, port: any) => (
                                <li {...props} key={port.code} className={`${props.className} capitalize`}>
                                    {port.name}
                                </li>
                            )}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    variant="standard"
                                    label={t('tickets.destination')}
                                    placeholder={t('tickets.destination_placeholder')}
                                    slotProps={{
                                        ...params.slotProps,
                                        input: {
                                            ...params.slotProps.input,
                                            startAdornment: (
                                                <>
                                                    <InputAdornment position="start"><FaShip className="text-[#ff5a00]" /></InputAdornment>
                                                    {params.slotProps.input.startAdornment}
                                                </>
                                            )
                                        }
                                    }}
                                />
                            )}
                        />
                    </div>

                    <div className="w-full lg:flex-1">
                        <DatePicker
                            label={t('tickets.departured_date')}
                            value={departureDate}
                            onChange={setDepartureDate}
                            minDate={moment()}
                            slotProps={{ textField: { variant: "standard", fullWidth: true } }}
                        />
                    </div>

                    {type === 'round_trip' && (
                        <div className="w-full lg:flex-1">
                            <DatePicker
                                label={t('tickets.return_date')}
                                value={returnDate}
                                onChange={setReturnDate}
                                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                minDate={(departureDate as any) || moment()}
                                slotProps={{ textField: { variant: "standard", fullWidth: true } }}
                            />
                        </div>
                    )}

                    <Button
                        variant="contained"
                        color="warning"
                        className="w-full lg:min-w-[56px] lg:w-[56px] h-[56px] rounded-2xl flex items-center justify-center gap-2 mt-4 lg:mt-0"
                        sx={{ minWidth: 0, borderRadius: "1rem", "@media (min-width:1024px)": { paddingInline: 0 } }}
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
                        <p className="text-slate-800 font-bold text-sm md:text-base">{t('common.ai_promo_banner_title')}</p>
                        <p className="text-slate-600 text-xs md:text-sm mt-1">{t('common.ai_promo_banner_desc')} <span className="font-mono bg-orange-500/10 text-orange-700 px-1.5 py-0.5 rounded border border-orange-500/20">&quot;{t('common.ai_promo_banner_example_ferry')}&quot;</span></p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SearchFerry
