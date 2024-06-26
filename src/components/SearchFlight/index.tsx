import { Button, DatePicker, Select, SelectItem } from "@nextui-org/react";
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

    const classesData = [
        { key: 'economy', label: t('tickets.economy') },
        { key: 'premium_economy', label: t('tickets.premium_economy') },
        { key: 'business_class', label: t('tickets.business_class') },
        { key: 'first_class', label: t('tickets.first_class') },
    ];

    const methods = useForm();

    const { handleSubmit, reset, watch, setValue, getValues } = methods;

    console.log(getValues())

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
        <div className="min-w-[57%] bg-white p-[15px] rounded">
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
                    <div className="w-full flex flex-col gap-2">
                        <p className="font-medium">{t('tickets.set_class')}</p>
                        <Select
                            aria-label={t('tickets.set_class')}
                            placeholder={t('tickets.set_class')}
                            className="max-w-xs"
                            variant="bordered"
                            radius="sm" 
                            defaultSelectedKeys={[watch('class')]}
                            onSelectionChange={(keys) => setValue('class', keys.toString()?.[0])}
                            multiple={false}
                        >
                            {classesData.map((item) => (
                                    <SelectItem key={item.key}>
                                        {item.label}
                                    </SelectItem>
                                ))
                            }
                        </Select>
                    </div>
                    <Button isIconOnly className="button-orange" onClick={handleSubmit(onSubmit)}>
                        <IconSearch width={30} height={30}/>
                    </Button> 
                </div>
            </FormProvider>
        </div>
    )
}

export default SearchFlight