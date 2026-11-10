/* eslint-disable @typescript-eslint/no-explicit-any */
import moment from "moment";
import { useTranslation } from "react-i18next"
import { useState, useMemo, useEffect } from "react";
import { useRouter } from "next/router";
import { useQueryFerryRoutes } from "../../queries/ferry";
import Button from "@components/ui/Button";
import Combobox from "@components/ui/Combobox";
import DatePicker from "@components/ui/DatePicker";
import { Ship, MapPin, ArrowLeftRight, Sparkles, Search, Users, Minus, Plus } from "lucide-react";

// Field tile chrome shared across the redesigned search forms: an icon +
// micro-label header over a plain control (Combobox / DatePicker / counter)
// with no MUI underneath — a genuinely different control set, not a
// restyle of the old MUI Autocomplete + DatePicker row.
const fieldTileClass = "flex-1 min-w-0 bg-slate-50 rounded-xl p-3 border border-slate-100 focus-within:border-primary/50 focus-within:bg-white transition-colors";
const fieldLabelClass = "flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wide text-slate-400 mb-1";

const SearchFerry = () => {
    const [mounted, setMounted] = useState(false);
    const { t } = useTranslation();
    const [type, setType] = useState<'one_way' | 'round_trip'>('one_way');
    const [departurePort, setDeparturePort] = useState<string>("");

    useEffect(() => {
        setMounted(true);
    }, []);
    const [destinationPort, setDestinationPort] = useState<string>("");
    const [departureDate, setDepartureDate] = useState<string>(moment().format('YYYY-MM-DD'));
    const [returnDate, setReturnDate] = useState<string>("");
    const [passengerCount, setPassengerCount] = useState(1);
    const { push } = useRouter();

    const { data: routesData, isLoading: isLoadingRoutes } = useQueryFerryRoutes({ pageIndex: 0, pageSize: 0 });

    const departurePorts = useMemo(() => {
        const data = (routesData as any)?.data;
        if (!data?.records) return [];
        const ports = new Map();
        data.records.forEach((route: any) => {
            ports.set(route.embarkationPort.code, route.embarkationPort.name);
        });
        return Array.from(ports.entries()).map(([code, name]) => ({ code, name: name as string }));
    }, [routesData]);

    const availableDestinations = useMemo(() => {
        const data = (routesData as any)?.data;
        if (!data?.records || !departurePort) return [];
        return data.records
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
            tripdate: moment(departureDate, 'YYYY-MM-DD').format('YYYYMMDD'),
            type,
            adult: String(passengerCount)
        });

        if (type === 'round_trip' && returnDate) {
            params.append('returndate', moment(returnDate, 'YYYY-MM-DD').format('YYYYMMDD'));
        }

        push(`/ferry/list?${params.toString()}`);
    };

    if (!mounted) {
        return (
            <div className="w-full lg:max-w-[1024px] surface-card p-6 md:p-8 mx-auto animate-pulse h-[200px] flex items-center justify-center">
                <div className="w-full h-12 bg-slate-100 rounded-xl" />
            </div>
        );
    }

    return (
        <div className="w-full lg:max-w-[1024px] surface-card p-6 md:p-8 mx-auto">
            <div className="flex flex-col gap-5 w-full">
                <div className="flex flex-row gap-2 bg-slate-100 p-1.5 rounded-2xl w-full sm:w-fit">
                    <button
                        type="button"
                        className={`flex items-center justify-center gap-1.5 grow rounded-xl transition-all h-10 px-3 sm:px-4 min-w-0 text-sm font-bold whitespace-nowrap ${type === 'one_way' ? 'bg-orange-500 shadow-lg shadow-orange-500/30 text-white' : 'bg-transparent text-slate-500 hover:bg-white'}`}
                        onClick={() => setType('one_way')}
                    >
                        <Ship size={14} />
                        <span className="truncate">{t('tickets.one_way')}</span>
                    </button>
                    <button
                        type="button"
                        className={`flex items-center justify-center gap-1.5 grow rounded-xl transition-all h-10 px-3 sm:px-4 min-w-0 text-sm font-bold whitespace-nowrap ${type === 'round_trip' ? 'bg-orange-500 shadow-lg shadow-orange-500/30 text-white' : 'bg-transparent text-slate-500 hover:bg-white'}`}
                        onClick={() => setType('round_trip')}
                    >
                        <ArrowLeftRight size={14} />
                        <span className="truncate">{t('tickets.round_trip')}</span>
                    </button>
                </div>

                <div className="flex flex-col lg:flex-row gap-3 w-full">
                    <div className={fieldTileClass}>
                        <p className={fieldLabelClass}><MapPin size={12} /> {t('tickets.departure')}</p>
                        <Combobox
                            options={departurePorts}
                            value={departurePort}
                            isLoading={isLoadingRoutes}
                            placeholder={t('tickets.departure_placeholder')}
                            onChange={(code) => { setDeparturePort(code); setDestinationPort(""); }}
                        />
                    </div>

                    <div className={fieldTileClass}>
                        <p className={fieldLabelClass}><MapPin size={12} /> {t('tickets.destination')}</p>
                        <Combobox
                            options={availableDestinations}
                            value={destinationPort}
                            disabled={!departurePort}
                            placeholder={t('tickets.destination_placeholder')}
                            onChange={setDestinationPort}
                        />
                    </div>

                    <div className={fieldTileClass}>
                        <p className={fieldLabelClass}>{t('tickets.departured_date')}</p>
                        <DatePicker
                            value={departureDate}
                            onChange={setDepartureDate}
                            min={moment().format('YYYY-MM-DD')}
                        />
                    </div>

                    {type === 'round_trip' && (
                        <div className={fieldTileClass}>
                            <p className={fieldLabelClass}>{t('tickets.return_date')}</p>
                            <DatePicker
                                value={returnDate}
                                onChange={setReturnDate}
                                min={departureDate || moment().format('YYYY-MM-DD')}
                            />
                        </div>
                    )}

                    <div className={fieldTileClass}>
                        <p className={fieldLabelClass}><Users size={12} /> {t('tickets.passenger', { count: passengerCount })}</p>
                        <div className="flex items-center gap-3">
                            <button
                                type="button"
                                aria-label="Decrease passengers"
                                onClick={() => setPassengerCount((c) => Math.max(1, c - 1))}
                                disabled={passengerCount <= 1}
                                className="w-6 h-6 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center disabled:opacity-40 shrink-0"
                            >
                                <Minus size={12} />
                            </button>
                            <span className="font-bold text-slate-800 min-w-[1.5ch] text-center">{passengerCount}</span>
                            <button
                                type="button"
                                aria-label="Increase passengers"
                                onClick={() => setPassengerCount((c) => Math.min(9, c + 1))}
                                disabled={passengerCount >= 9}
                                className="w-6 h-6 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center disabled:opacity-40 shrink-0"
                            >
                                <Plus size={12} />
                            </button>
                        </div>
                    </div>
                </div>

                <Button
                    variant="cta"
                    fullWidth
                    className="h-14 text-base"
                    onClick={handleSearch}
                    disabled={!departurePort || !destinationPort || !departureDate}
                >
                    <Search size={18} /> {t('common.search_ferry')}
                </Button>
            </div>

            {/* AI Banner */}
            <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-orange-500/10 to-primary/10 border border-orange-500/20 flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-primary to-orange-500 flex items-center justify-center shadow-lg shadow-orange-500/30 text-white shrink-0">
                        <Sparkles size={18} />
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
