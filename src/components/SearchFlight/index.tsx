import { Button, DatePicker, Select, SelectItem } from "@nextui-org/react";
import { useTranslation } from "react-i18next";
import FromInput from "@components/FromInput";
import DestinationInput from "@components/DestinationInput";
import PassengerInput from "@components/PassengerInput";
import IconSearch from "@icons/IconSearch";
import { useQueryCodeAreas } from "@queries/codeAreas";

const SearchFlight = () => {

    const { t } = useTranslation();

    const { data } = useQueryCodeAreas({
        enabled: true
    });

    const classesData = [
        { key: 'economy', label: t('tickets.economy') },
        { key: 'premium_economy', label: t('tickets.premium_economy') },
        { key: 'business_class', label: t('tickets.business_class') },
        { key: 'first_class', label: t('tickets.first_class') },
    ];

    return (
        <div className="min-w-[57%] bg-white p-[15px] rounded">
            <div className="flex flex-wrap md:flex-nowrap lg:flex-nowrap gap-4 items-center">
                <FromInput items={data?.filter((item) => item.grup === 'lokal') ?? []}/>
                <DestinationInput items={data?.filter((item) => item.grup === 'lokal') ?? []}/>
                <PassengerInput />
                <div className="w-full flex flex-col gap-2">
                    <p className="font-medium">{t('tickets.departured_date')}</p>
                    <DatePicker aria-label={t('tickets.departured_date')} variant="underlined"
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
                    >
                        {classesData.map((item) => (
                                <SelectItem key={item.key}>
                                    {item.label}
                                </SelectItem>
                            ))
                        }
                    </Select>
                </div>
                <Button isIconOnly className="button-orange">
                    <IconSearch width={30} height={30}/>
                </Button> 
            </div>
        </div>
    )
}

export default SearchFlight