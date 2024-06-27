import { Autocomplete, AutocompleteItem, AutocompleteSection } from "@nextui-org/react";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { FormProps } from "../forms/useForm";
import { Airport } from "@api/airports/types";

interface Props {
    items: Airport[];
}

const FromInput = ({ items } : Props) => {

    const { t } = useTranslation();

    const { setValue, watch, formState: { errors }} = useFormContext<FormProps>();

    const handleContent = () => {
        return items.map((item) => (
            <AutocompleteItem value={item.code} key={`${item.code}`}>{`${item.name}`}</AutocompleteItem>
        ))
    }

    return (
        <div className="w-full flex flex-col gap-2">
            <p className="font-medium">{t('tickets.from')}</p>
            <Autocomplete
                aria-label={t('tickets.from')}
                placeholder={t('tickets.from_placeholder')}
                className="w-full lg:max-w-lg md:max-w-lg"
                variant="underlined"
                classNames={{
                    listbox: 'flex flex-row',
                    popoverContent: 'w-fit'
                }}
                listboxProps={{
                    classNames: {
                        list: "flex flex-col gap-3",
                        base: 'w-full'
                    }
                }}
                defaultItems={items}
                selectedKey={watch('from')}
                onSelectionChange={(key) => {
                    if(key && typeof key === 'string') {
                        setValue('from', key)
                    }
                }}
                errorMessage={errors?.from?.message}
                isInvalid={!!errors?.from?.message}
            >
                <AutocompleteSection title={t('tickets.popular_city')} classNames={{
                    heading: 'text-orange text-base',
                    group: 'grid grid-cols-3 gap-2 min-w-[400px]'
                }} hideSelectedIcon>
                     {handleContent()}
                </AutocompleteSection>
            </Autocomplete>
        </div>
    )
}

export default FromInput