import { Autocomplete, AutocompleteItem, AutocompleteSection } from "@nextui-org/react";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { FormProps } from "../forms/useForm";
import { Airport } from "@api/airports/types";
import { FaPlaneArrival } from "react-icons/fa";

interface Props {
    items: Airport[];
    isLoading?: boolean;
}

const DestinationInput = ({ items, isLoading } : Props) => {

    const { t } = useTranslation();

    const { setValue, watch, formState: { errors }} = useFormContext<FormProps>();

    const sections = [
        {
            key: 'popular_city',
            title: t('tickets.popular_city'),
            children: items
        }
    ];

    return (
        <div className="w-full flex flex-col gap-2">
            <p className="font-medium text-slate-800/80">{t('tickets.to')}</p>
            <Autocomplete
                aria-label={t('tickets.to')}
                placeholder={t('tickets.to_placeholder')}
                className="w-full"
                variant="underlined"
                startContent={<FaPlaneArrival className="text-[#ff5a00] mr-2" />}
                classNames={{
                    listbox: 'flex flex-col',
                    popoverContent: 'w-[350px] md:w-[800px] glass-card bg-white/80'
                }}
                listboxProps={{
                    classNames: {
                        list: "flex flex-col gap-3",
                        base: 'w-full'
                    }
                }}
                onSelectionChange={(key) => {
                    if(key && typeof key === 'string') {
                        setValue('to', key)
                    }
                }}
                selectedKey={watch('to') || null}
                errorMessage={errors?.to?.message}
                isInvalid={!!errors?.to?.message}
                isLoading={isLoading}
                isVirtualized={false}
                items={sections}
            >
                {(section) => (
                    <AutocompleteSection 
                        key={section.key}
                        title={section.title} 
                        items={section.children}
                        classNames={{
                            heading: 'text-[#ff5a00] text-base font-bold pl-2',
                            group: 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 w-full'
                        }} 
                        hideSelectedIcon
                    >
                         {(item: Airport) => (
                            <AutocompleteItem 
                                key={item.code} 
                                textValue={item.name}
                                className="text-black data-[hover=true]:bg-[#ff5a00] data-[hover=true]:text-white transition-colors"
                            >
                                <div className="flex flex-col">
                                    <span className="font-bold">{item.code}</span>
                                    <span className="text-tiny opacity-80">{item.name}</span>
                                </div>
                            </AutocompleteItem>
                         )}
                    </AutocompleteSection>
                )}
            </Autocomplete>
        </div>
    )
}

export default DestinationInput