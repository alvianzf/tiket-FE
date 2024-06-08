import { Button, DatePicker, Select, SelectItem } from "@nextui-org/react";
import { useTranslation } from "react-i18next";
import FromInput from "@components/FromInput";
import DestinationInput from "@components/DestinationInput";
import PassengerInput from "@components/PassengerInput";
import IconSearch from "@icons/IconSearch";

const SearchFlight = () => {

    const { t } = useTranslation();

    const classesData = [
        { key: 'economy', label: t('tickets.economy') },
        { key: 'premium_economy', label: t('tickets.premium_economy') },
        { key: 'business_class', label: t('tickets.business_class') },
        { key: 'first_class', label: t('tickets.first_class') },
    ];

    return (
        <div className="min-w-[50%] bg-white p-[15px] rounded">
            <div className="flex flex-wrap md:flex-nowrap lg:flex-nowrap gap-4 items-center">
                <FromInput />
                <DestinationInput />
                <PassengerInput />
                <DatePicker
                    classNames={{
                        label: "font-medium"
                    }}
                    label={t('tickets.departured_date')} 
                    labelPlacement="outside" 
                    variant="underlined"
                />
                <Select
                    classNames={{
                        label: "font-medium"
                    }} 
                    label={t('tickets.set_class')}
                    labelPlacement="outside"
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
                <Button isIconOnly className="button-orange">
                    <IconSearch width={30} height={30}/>
                </Button> 
            </div>
        </div>
    )
}

export default SearchFlight