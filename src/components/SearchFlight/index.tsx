import { Button, DatePicker } from "@nextui-org/react";
import { useTranslation } from "react-i18next";
import FromInput from "./FromInput";
import DestinationInput from "./DestinationInput";
import PassengerInput from "./PassengerInput";
import IconSearch from "@icons/IconSearch";
import { useQueryGetAirports } from "@queries/airports";
import { Airport } from "@api/airports/types";
import { FormProvider } from "react-hook-form";
import useForm, { DEFAULT_VALUES, FormProps } from "./forms/useForm";
import { useEffect, useState } from "react";
import { parseDate } from "@internationalized/date";
import moment from "moment";
import { useRouter } from "next/router";

const SearchFlight = () => {

    const { t } = useTranslation();

    const { push, query, isReady } = useRouter();

    const [isSubmitting, setIsSubmitting] = useState(false);

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
            reset(DEFAULT_VALUES)
        },
        [reset]
    );

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

    return (
        <div className="w-full lg:min-w-[70%] glass-card p-6 md:p-10 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.2)] backdrop-blur-3xl border border-white/20 bg-white/10 mx-auto">
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
                        className="button-orange h-[56px] w-full lg:min-w-[56px] lg:w-[56px] rounded-2xl shadow-xl shadow-orange-500/40" 
                        onPress={() => handleSubmit(onSubmit)()}
                    >
                        {!isSubmitting && <IconSearch width={24} height={24}/>}
                        <span className="lg:hidden ml-2 font-bold">{t('common.search_flight')}</span>
                    </Button> 
                </div>
            </FormProvider>
        </div>
    )
}

export default SearchFlight