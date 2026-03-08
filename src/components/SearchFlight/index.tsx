import { Button, DatePicker } from "@nextui-org/react";
import { useTranslation } from "react-i18next";
import FromInput from "./FromInput";
import DestinationInput from "./DestinationInput";
import PassengerInput from "./PassengerInput";
import IconSearch from "@icons/IconSearch";
import { useQueryGetAirports } from "@queries/airports";
import { FormProvider } from "react-hook-form";
import useForm, { DEFAULT_VALUES, FormProps } from "./forms/useForm";
import { useEffect } from "react";
import { parseDate } from "@internationalized/date";
import moment from "moment";
import { useRouter } from "next/router";

const SearchFlight = () => {

    const { t } = useTranslation();

    const { push, query, isReady } = useRouter();

    const { data: airports } = useQueryGetAirports({
        enabled: true
    });

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
        []
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
        [isReady, from, to, date, adult, child, infant, push, classParams]
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

    return (
        <div className="min-w-[70%] glass-card p-[30px] rounded-2xl shadow-2xl backdrop-blur-xl border border-white/10 bg-white/5">
            <FormProvider {...methods}>
                <div className="flex flex-wrap md:flex-nowrap lg:flex-nowrap gap-4 items-center">
                    <FromInput 
                        items={airports?.data?.filter((item) => item.group === 'Domestik') ?? []}
                    />
                    <DestinationInput items={airports?.data?.filter((item) => item.group === 'Domestik') ?? []}/>
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
                        className="bg-[#4267B2] text-white hover:bg-[#00D5FF] transition-all shadow-lg shadow-[#4267B2]/30 w-full lg:w-[200px] h-[60px] rounded-2xl active:scale-95 font-bold text-lg gap-2" 
                        onClick={handleSubmit(onSubmit)}
                        startContent={<IconSearch width={24} height={24}/>}
                    >
                        {t('common.search')}
                    </Button> 
                </div>
            </FormProvider>
        </div>
    )
}

export default SearchFlight