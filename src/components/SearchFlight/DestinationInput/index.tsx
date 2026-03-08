import { Autocomplete, AutocompleteItem, AutocompleteSection } from "@nextui-org/react";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { FormProps } from "../forms/useForm";
import { Airport } from "@api/airports/types";
import { FaPlaneArrival } from "react-icons/fa";

interface Props {
    items: Airport[];
}

const DestinationInput = ({ items } : Props) => {

    const { t } = useTranslation();

    const { setValue, watch, formState: { errors }} = useFormContext<FormProps>();

    const handleContent = () => {
        return items.map((item) => (
            <AutocompleteItem value={item.code} key={`${item.code}`}>{`${item.name}`}</AutocompleteItem>
        ))
    }

    return (
        <div className="w-full flex flex-col gap-2">
            <p className="font-medium text-slate-800/80">{t('tickets.to')}</p>
            <Autocomplete
                aria-label={t('tickets.to')}
                placeholder={t('tickets.to_placeholder')}
                className="w-full"
                variant="underlined"
                startContent={<FaPlaneArrival className="text-[#3C9DFF] mr-2" />}
                classNames={{
                    listbox: 'flex flex-col',
                    popoverContent: 'w-fit border border-white/20 bg-white/95 backdrop-blur-xl'
                }}
                listboxProps={{
                    classNames: {
                        list: "flex flex-col gap-3",
                        base: 'w-full'
                    }
                }}
                defaultItems={items}
                selectedKey={watch('to')}
                onSelectionChange={(key) => {
                    if(key && typeof key === 'string') {
                        setValue('to', key)
                    }
                }}
                errorMessage={errors?.to?.message}
                isInvalid={!!errors?.to?.message}
            >
                <AutocompleteSection title={t('tickets.popular_city')} classNames={{
                    heading: 'text-[#0AD1FF] text-base font-bold',
                    group: 'grid grid-cols-3 gap-2 min-w-[400px]'
                }} hideSelectedIcon>
                     {handleContent()}
                </AutocompleteSection>
            </Autocomplete>
        </div>
    )
}

export default DestinationInput