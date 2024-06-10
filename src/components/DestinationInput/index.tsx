import { CodeArea } from "@api/codeArea/types";
import { Autocomplete, AutocompleteItem, AutocompleteSection } from "@nextui-org/react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

interface Props {
    items: CodeArea[];
}

const DestinationInput = ({ items } : Props) => {

    const { t } = useTranslation();

    const [value, setValue] = useState<string | number | null>('');

    const handleContent = () => {
        return items.map((item) => (
            <AutocompleteItem value={item.code} key={`${item.city} (${item.code})`}>{`${item.city} (${item.code})`}</AutocompleteItem>
        ))
    }

    return (
        <div className="w-full flex flex-col gap-2">
            <p className="font-medium">{t('tickets.to')}</p>
            <Autocomplete
                aria-label={t('tickets.to')}
                placeholder={t('tickets.to_placeholder')}
                className="max-w-lg"
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
                selectedKey={value}
                onSelectionChange={(key) => setValue(key)}
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

export default DestinationInput