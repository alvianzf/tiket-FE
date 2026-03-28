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
import { useEffect } from "react";
import { parseDate } from "@internationalized/date";
import moment from "moment";
import { useRouter } from "next/router";

const SearchFlight = () => {

    const { t } = useTranslation();

    const { push, query, isReady } = useRouter();

    const { data: airportsResponse } = useQueryGetAirports({
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
            });
        }
    }

    const filteredAirports = airports?.filter((item: Airport) => item.group === 'Domestik');
    const items = (filteredAirports && filteredAirports.length > 0) ? filteredAirports : airports;

    return (
        <div className="min-w-[70%] glass-card p-[30px] rounded-2xl shadow-2xl backdrop-blur-xl border border-white/10 bg-white/5">
            <FormProvider {...methods}>
                <div className="flex flex-wrap md:flex-nowrap lg:flex-nowrap gap-4 items-center">
                    <FromInput 
                        items={items}
                    />
                    <DestinationInput items={items}/>
                    <PassengerInput />
                    <div className="w-full flex flex-col gap-2">
                        <p className="font-medium">{t('tickets.departured_date')}</p>
                        <DatePicker 
                            aria-label={t('tickets.departured_date')} 
                            variant="underlined"
                            minValue={parseDate(moment().format('YYYY-MM-DD'))}
                            value={parseDate(watch('date'))}
                            onChange={(value) => setValue('date', moment(value).format('YYYY-MM-DD'))}
                        />
                    </div>
                    <Button 
                        isIconOnly
                        className="button-orange w-[60px] h-[60px] min-w-[60px] rounded-2xl active:scale-95 font-bold shadow-lg shadow-orange-500/30" 
                        onClick={handleSubmit(onSubmit)}
                    >
                        <IconSearch width={28} height={28}/>
                    </Button> 
                </div>
            </FormProvider>
        </div>
    )
}

export default SearchFlight