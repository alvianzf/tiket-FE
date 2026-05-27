import { DatePicker } from "@nextui-org/react";
import Button from "@components/Button";
import { useTranslation } from "react-i18next";
import FromInput from "./FromInput";
import DestinationInput from "./DestinationInput";
import PassengerInput from "./PassengerInput";
import IconSearch from "@icons/IconSearch";
import { useQueryGetAirports } from "@queries/airports";
import { Airport } from "@api/airports/types";
import { FormProvider } from "react-hook-form";
import useForm, { FormProps } from "./forms/useForm";
import { useEffect, useState } from "react";
import { parseDate } from "@internationalized/date";
import moment from "moment";
import { useRouter } from "next/router";

const SearchFlight = () => {
    const [mounted, setMounted] = useState(false);
    const { t } = useTranslation();

    const { push, query, isReady } = useRouter();

    const [isSubmitting, setIsSubmitting] = useState(false);

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
                    class: classParams
                });
            }
        },
        [isReady, from, to, date, adult, child, infant, classParams, reset]
    )

    const onSubmit = (data: FormProps) => {
        if(data) {
            setIsSubmitting(true);
            push({
                pathname: '/flights',
                query: {
                    from: data.from,
                    to: data.to,
                    date: data.date,
                    adult: data.adult,
                    child: data.child,
                    infant: data.infant,
                    class: data.class
                }
            }).finally(() => {
                setIsSubmitting(false);
            });
        }
    }

    const filteredAirports = airports?.filter((item: Airport) => item.group === 'Domestik');
    const items = (filteredAirports && filteredAirports.length > 0) ? filteredAirports : airports;

    if (!mounted) {
        return (
            <div className="w-full lg:max-w-[1200px] glass-card p-8 md:p-10 border-white/30 backdrop-blur-3xl mx-auto animate-pulse h-[136px] flex items-center justify-center">
                <div className="w-full h-12 bg-white/10 rounded-xl" />
            </div>
        );
    }

    return (
        <div className="w-full lg:max-w-[1200px] glass-card p-8 md:p-10 border-white/30 backdrop-blur-3xl mx-auto">
            <FormProvider {...methods}>
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
                    <div className="w-full lg:flex-1 flex flex-col gap-2">
                        <p className="font-medium text-slate-800/80">{t('tickets.departured_date')}</p>
                        <DatePicker 
                            aria-label={t('tickets.departured_date')} 
                            variant="underlined"
                            color="warning"
                            className="w-full"
                            minValue={parseDate(moment().format('YYYY-MM-DD'))}
                            value={watch('date') ? parseDate(watch('date')) : null}
                            onChange={(value) => {
                                if (value) {
                                    setValue('date', value.toString());
                                }
                            }}
                        />
                    </div>
                    <Button 
                        isIconOnly={!isSubmitting}
                        isLoading={isSubmitting}
                        dsVariant="cta"
                        className="h-[56px] w-full lg:min-w-[56px] lg:w-[56px] rounded-ds-md" 
                        onPress={() => handleSubmit(onSubmit)()}
                    >
                        {!isSubmitting && <IconSearch width={24} height={24}/>}
                        <span className="lg:hidden ml-2 font-bold">{t('common.search_flight')}</span>
                    </Button> 
                </div>
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