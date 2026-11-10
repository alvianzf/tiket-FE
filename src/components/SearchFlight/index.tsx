import Button from "@components/ui/Button";
import DatePicker from "@components/ui/DatePicker";
import { useTranslation } from "react-i18next";
import FromInput from "./FromInput";
import DestinationInput from "./DestinationInput";
import PassengerInput from "./PassengerInput";
import MultiCitySegment, { SegmentValue } from "./MultiCitySegment";
import { useQueryGetAirports } from "@queries/airports";
import { Airport } from "@api/airports/types";
import { FormProvider } from "react-hook-form";
import useForm, { FormProps } from "./forms/useForm";
import { useEffect, useState } from "react";
import moment from "moment";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { Plane, ArrowLeftRight, Route, Plus, Search } from "lucide-react";

const SearchFlight = () => {
    const [mounted, setMounted] = useState(false);
    const { t } = useTranslation();

    const { push, query, isReady } = useRouter();

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isMultiCity, setIsMultiCity] = useState(false);
    const defaultSegment = (): SegmentValue => ({ from: '', to: '', date: moment().add(1, 'days').format('YYYY-MM-DD') });
    const [segments, setSegments] = useState<SegmentValue[]>([defaultSegment(), defaultSegment()]);

    useEffect(() => {
        setMounted(true);
    }, []);

    const { data: airportsResponse, isFetching: isAirportsLoading } = useQueryGetAirports({
        enabled: true
    });

    // Extremely robust extraction to handle any nesting { data: { data: [] } } or { data: [] } or []
    // Extremely robust extraction to handle any nesting
    const airports = (() => {
        if (!airportsResponse) return [];
        if (Array.isArray(airportsResponse)) return airportsResponse;
        
        // Check for nested 'data' property (standardized or legacy wrapper)
        const possibleArray = airportsResponse.data;
        if (Array.isArray(possibleArray)) return possibleArray;
        
        // Check for double nesting (standardized wrapper containing legacy { data: [] })
        if (possibleArray && typeof possibleArray === 'object' && Array.isArray((possibleArray as { data?: Airport[] }).data)) {
            return (possibleArray as { data: Airport[] }).data;
        }
        
        return [];
    })();

    const methods = useForm();

    const { handleSubmit, reset, watch, setValue } = methods;


    const from = query?.from as unknown as string;
    const to = query?.to as unknown as string;
    const date = query?.date as unknown as string;
    const adult = query?.adult as unknown as string;
    const child = query?.child as unknown as string;
    const infant = query?.infant as unknown as string;
    const classParams = query?.class as unknown as string;
    const tripTypeParam = (query?.tripType as string) || 'one_way';
    const returnDateParam = query?.returnDate as unknown as string;

    useEffect(
        () => {
            if(!!from && !!to && !!date && isReady && !!adult && !!child && !!infant && !!classParams) {
                reset({
                    from,
                    to,
                    date,
                    adult,
                    child,
                    infant,
                    class: classParams,
                    tripType: (tripTypeParam as 'one_way' | 'round_trip') || 'one_way',
                    returnDate: returnDateParam || undefined
                });
            }
        },
        [isReady, from, to, date, adult, child, infant, classParams, tripTypeParam, returnDateParam, reset]
    )

    const onSubmit = (data: FormProps) => {
        if(data) {
            setIsSubmitting(true);
            const queryParams: Record<string, string> = {
                from: data.from,
                to: data.to,
                date: data.date,
                adult: data.adult,
                child: data.child,
                infant: data.infant,
                class: data.class,
                tripType: data.tripType
            };
            if (data.tripType === 'round_trip' && data.returnDate) {
                queryParams.returnDate = data.returnDate;
            }
            push({
                pathname: '/flights',
                query: queryParams
            }).finally(() => {
                setIsSubmitting(false);
            });
        }
    }

    const handleMultiCitySearch = () => {
        const valid = segments.every(s => s.from && s.to && s.date);
        if (!valid) {
            toast.error(t('tickets.incomplete_segments'));
            return;
        }
        const datesNonDecreasing = segments.every((s, i) => i === 0 || s.date >= segments[i - 1].date);
        if (!datesNonDecreasing) {
            toast.error(t('tickets.date_order_error'));
            return;
        }
        setIsSubmitting(true);
        push({
            pathname: '/flights',
            query: {
                tripType: 'multi_city',
                segments: JSON.stringify(segments),
                adult: watch('adult') || '1',
                child: watch('child') || '0',
                infant: watch('infant') || '0',
                class: watch('class') || 'economy'
            }
        }).finally(() => setIsSubmitting(false));
    };

    const filteredAirports = airports?.filter((item: Airport) => item.group === 'Domestik');
    const items = (filteredAirports && filteredAirports.length > 0) ? filteredAirports : airports;

    if (!mounted) {
        return (
            <div className="w-full lg:max-w-[1200px] surface-card p-8 md:p-10 mx-auto animate-pulse h-[136px] flex items-center justify-center">
                <div className="w-full h-12 bg-slate-100 rounded-xl" />
            </div>
        );
    }

    const tripType = watch('tripType');

    return (
        <div className="w-full lg:max-w-[1200px] surface-card p-6 md:p-10 mx-auto">
            <FormProvider {...methods}>
                <div className="flex flex-row gap-2 bg-slate-100 p-1.5 rounded-2xl w-full sm:w-fit mb-6">
                    <button
                        type="button"
                        className={`flex items-center justify-center gap-1 sm:gap-1.5 grow rounded-xl transition-all h-10 px-2 sm:px-4 min-w-0 text-xs sm:text-sm font-bold whitespace-nowrap ${!isMultiCity && tripType === 'one_way' ? 'bg-orange-500 shadow-lg shadow-orange-500/30 text-white' : 'bg-transparent text-slate-500 hover:bg-white'}`}
                        onClick={() => { setIsMultiCity(false); setValue('tripType', 'one_way'); }}
                    >
                        <Plane size={14} className="shrink-0 hidden sm:inline" />
                        <span className="truncate">{t('tickets.one_way')}</span>
                    </button>
                    <button
                        type="button"
                        className={`flex items-center justify-center gap-1 sm:gap-1.5 grow rounded-xl transition-all h-10 px-2 sm:px-4 min-w-0 text-xs sm:text-sm font-bold whitespace-nowrap ${!isMultiCity && tripType === 'round_trip' ? 'bg-orange-500 shadow-lg shadow-orange-500/30 text-white' : 'bg-transparent text-slate-500 hover:bg-white'}`}
                        onClick={() => { setIsMultiCity(false); setValue('tripType', 'round_trip'); }}
                    >
                        <ArrowLeftRight size={14} className="shrink-0 hidden sm:inline" />
                        <span className="truncate">{t('tickets.round_trip')}</span>
                    </button>
                    <button
                        type="button"
                        className={`flex items-center justify-center gap-1 sm:gap-1.5 grow rounded-xl transition-all h-10 px-2 sm:px-4 min-w-0 text-xs sm:text-sm font-bold whitespace-nowrap ${isMultiCity ? 'bg-orange-500 shadow-lg shadow-orange-500/30 text-white' : 'bg-transparent text-slate-500 hover:bg-white'}`}
                        onClick={() => setIsMultiCity(true)}
                    >
                        <Route size={14} className="shrink-0 hidden sm:inline" />
                        <span className="truncate">{t('tickets.multi_city')}</span>
                    </button>
                </div>

                {isMultiCity ? (
                    <div className="flex flex-col gap-4 w-full">
                        {segments.map((seg, i) => (
                            <MultiCitySegment
                                key={i}
                                index={i}
                                value={seg}
                                airports={items}
                                isLoading={isAirportsLoading}
                                canRemove={segments.length > 2}
                                minDate={i > 0 ? segments[i - 1].date : undefined}
                                onChange={(idx, val) => setSegments(prev => prev.map((s, j) => j === idx ? val : s))}
                                onRemove={(idx) => setSegments(prev => prev.filter((_, j) => j !== idx))}
                            />
                        ))}
                        <div className="flex flex-col lg:flex-row gap-4 items-center justify-between w-full mt-2">
                            <div className="w-full lg:w-auto">
                                <PassengerInput />
                            </div>
                            <div className="flex gap-3 w-full lg:w-auto">
                                {segments.length < 4 && (
                                    <button
                                        type="button"
                                        onClick={() => setSegments(prev => [...prev, defaultSegment()])}
                                        className="flex items-center gap-1 text-sm font-bold text-orange-500 hover:text-orange-600 transition-colors px-4 py-2 rounded-xl bg-orange-500/10 hover:bg-orange-500/20 whitespace-nowrap"
                                    >
                                        <Plus size={14} /> {t('tickets.add_flight')}
                                    </button>
                                )}
                                <Button
                                    isLoading={isSubmitting}
                                    variant="cta"
                                    className="h-12 px-8"
                                    onClick={handleMultiCitySearch}
                                >
                                    <Search size={18} />
                                    {t('common.search_flight')}
                                </Button>
                            </div>
                        </div>
                    </div>
                ) : (
                <div className="flex flex-col lg:flex-row gap-6 items-end w-full">
                    <div className="w-full lg:flex-1">
                        <FromInput 
                            items={items}
                            isLoading={isAirportsLoading}
                        />
                    </div>
                    <div className="w-full lg:flex-1">
                        <DestinationInput 
                            items={items}
                            isLoading={isAirportsLoading}
                        />
                    </div>
                    <div className="w-full lg:w-auto">
                        <PassengerInput />
                    </div>
                    <div className="w-full lg:flex-1 bg-slate-50 rounded-xl p-3 border border-slate-100 focus-within:border-primary/50 focus-within:bg-white transition-colors">
                        <p className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wide text-slate-400 mb-1">{t('tickets.departured_date')}</p>
                        <DatePicker
                            value={watch('date') || ''}
                            onChange={(value) => setValue('date', value)}
                            min={moment().format('YYYY-MM-DD')}
                        />
                    </div>
                    {tripType === 'round_trip' && (
                        <div className="w-full lg:flex-1 bg-slate-50 rounded-xl p-3 border border-slate-100 focus-within:border-primary/50 focus-within:bg-white transition-colors">
                            <p className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wide text-slate-400 mb-1">{t('tickets.return_date')}</p>
                            <DatePicker
                                value={watch('returnDate') || ''}
                                onChange={(value) => setValue('returnDate', value)}
                                min={watch('date') || moment().format('YYYY-MM-DD')}
                            />
                        </div>
                    )}
                    <Button
                        isLoading={isSubmitting}
                        variant="cta"
                        className="h-14 w-full lg:w-14 lg:px-0"
                        onClick={() => handleSubmit(onSubmit)()}
                    >
                        <Search size={20} />
                        <span className="lg:hidden font-bold">{t('common.search_flight')}</span>
                    </Button>
                </div>
                )}
            </FormProvider>

            {/* AI Banner */}
            <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-orange-500/20 to-primary/20 border border-orange-500/30 flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-primary to-orange-500 flex items-center justify-center shadow-lg shadow-orange-500/30 text-white shrink-0">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path></svg>
                    </div>
                    <div>
                        <p className="text-slate-800 font-bold text-sm md:text-base">{t('common.ai_promo_banner_title')}</p>
                        <p className="text-slate-600 text-xs md:text-sm mt-1">{t('common.ai_promo_banner_desc')} <span className="font-mono bg-orange-500/10 text-orange-700 px-1.5 py-0.5 rounded border border-orange-500/20">&quot;{t('common.ai_promo_banner_example_flight')}&quot;</span></p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SearchFlight