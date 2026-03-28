import { Autocomplete, AutocompleteItem, AutocompleteSection } from "@nextui-org/react";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { FormProps } from "../forms/useForm";
import { Airport } from "@api/airports/types";
import { FaPlaneDeparture } from "react-icons/fa";

interface Props {
    items: Airport[];
    isLoading?: boolean;
}

const FromInput = ({ items, isLoading } : Props) => {

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
            <p className="font-medium text-slate-800/80">{t('tickets.from')}</p>
            <Autocomplete
                aria-label={t('tickets.from')}
                placeholder={t('tickets.from_placeholder')}
                className="w-full"
                variant="underlined"
                startContent={<FaPlaneDeparture className="text-[#4267B2] mr-2" />}
                classNames={{
                    listbox: 'flex flex-col',
                    popoverContent: 'w-[350px] border border-white/20 bg-white/95 backdrop-blur-xl'
                }}
                listboxProps={{
                    classNames: {
                        list: "flex flex-col gap-3",
                        base: 'w-full'
                    }
                }}
                onSelectionChange={(key) => {
                    if(key && typeof key === 'string') {
                        setValue('from', key)
                    }
                }}
                selectedKey={watch('from') || null}
                errorMessage={errors?.from?.message}
                isInvalid={!!errors?.from?.message}
                isLoading={isLoading}
                items={sections}
            >
                {(section) => (
                    <AutocompleteSection 
                        key={section.key}
                        title={section.title} 
                        items={section.children}
                        classNames={{
                            heading: 'text-[#00D5FF] text-base font-bold pl-2',
                            group: 'flex flex-col w-full'
                        }} 
                        hideSelectedIcon
                    >
                         {(item: Airport) => (
                            <AutocompleteItem 
                                key={item.code} 
                                textValue={item.name}
                                className="text-black data-[hover=true]:bg-[#4267B2] data-[hover=true]:text-white transition-colors"
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

export default FromInput