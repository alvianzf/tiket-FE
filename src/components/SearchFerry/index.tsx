import { Button, DatePicker, Input, Select, SelectItem } from "@nextui-org/react";
import { parseDate } from "@internationalized/date";
import moment from "moment";
import { useTranslation } from "react-i18next"
import { useState } from "react";
import { useRouter } from "next/router";

const SearchFerry = () => {
    const { t } = useTranslation();
    const [type, setType] = useState<'one_way' | 'round_trip'>('one_way');
    const { push } = useRouter();

    const classesData = [
        { key: 'economy', label: t('tickets.economy') },
        { key: 'premium_economy', label: t('tickets.premium_economy') },
        { key: 'business_class', label: t('tickets.business_class') },
        { key: 'first_class', label: t('tickets.first_class') },
    ];

    return (
        <div className="min-w-[25%] bg-white p-[15px] rounded">
            <div className="flex flex-col gap-4 w-full">
                <div className="flex flex-row gap-4">
                    <Button className={`${type === 'one_way' ? 'button-orange w-full' : 'button-grey w-full'}`} onClick={() => setType('one_way')}>
                        {t('tickets.one_way')}
                    </Button> 
                    <Button className={`${type === 'round_trip' ? 'button-orange w-full' : 'button-grey w-full'}`} onClick={() => setType('round_trip')}>
                        {t('tickets.round_trip')}
                    </Button> 
                </div>
                <Input type="text" variant={"bordered"} placeholder={t('tickets.passenger_nationalitty')}/>
                <Select
                    label={t('tickets.departure')}
                    placeholder={t('tickets.departure_placeholder')}
                    className="w-full"
                >
                    <SelectItem key={"batam_centre_terminal"}>
                        {'Batam Centre Terminal'}
                    </SelectItem>
                    <SelectItem key={"sekupang"}>
                        {'Sekupang Terminal'}
                    </SelectItem>
                </Select>
                <Select
                    label={t('tickets.destination')}
                    placeholder={t('tickets.destination_placeholder')}
                    className="w-full"
                >
                    <SelectItem key={"batam_centre_terminal"}>
                        {'Batam Centre Terminal'}
                    </SelectItem>
                    <SelectItem key={"sekupang"}>
                        {'Sekupang Terminal'}
                    </SelectItem>
                </Select>
                <div className="w-full flex flex-col gap-2">
                    <p>{t('tickets.departured_date')}</p>
                    <DatePicker 
                        aria-label={t('tickets.departured_date')} 
                        variant="underlined"
                        minValue={parseDate(moment().format('YYYY-MM-DD'))}
                    />
                </div>
                {type === 'round_trip' && (
                    <div className="w-full flex flex-col gap-2">
                        <p>{t('tickets.return_date')}</p>
                        <DatePicker 
                            aria-label={t('tickets.return_date')} 
                            variant="underlined"
                            minValue={parseDate(moment().format('YYYY-MM-DD'))}
                        />
                    </div>
                )}
                <div className="w-full flex flex-col gap-2">
                    <p>{t('tickets.set_class')}</p>
                    <Select
                        aria-label={t('tickets.set_class')}
                        placeholder={t('tickets.set_class')}
                        className="w-full"
                        variant="bordered"
                        radius="sm" 
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
                <Button className="button-orange w-full" onClick={() => push('/ferry/list')}>
                    {t('tickets.search')}
                </Button> 
            </div>
        </div>
    )
}

export default SearchFerry