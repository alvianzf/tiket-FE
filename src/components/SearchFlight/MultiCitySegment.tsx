import { Autocomplete, AutocompleteItem, AutocompleteSection, DatePicker } from "@nextui-org/react";
import { useTranslation } from "react-i18next";
import { parseDate } from "@internationalized/date";
import moment from "moment";
import { Airport } from "@api/airports/types";
import { FaPlaneDeparture, FaPlaneArrival } from "react-icons/fa";
import { Trash2 } from "lucide-react";

export interface SegmentValue {
    from: string;
    to: string;
    date: string;
}

interface Props {
    index: number;
    value: SegmentValue;
    airports: Airport[];
    isLoading: boolean;
    canRemove: boolean;
    onChange: (index: number, value: SegmentValue) => void;
    onRemove: (index: number) => void;
}

const MultiCitySegment = ({ index, value, airports, isLoading, canRemove, onChange, onRemove }: Props) => {
    const { t } = useTranslation();

    const sections = [{ key: 'popular_city', title: t('tickets.popular_city'), children: airports }];

    return (
        <div className="flex flex-col lg:flex-row gap-4 items-end w-full p-4 bg-white/5 rounded-2xl border border-white/10">
            <div className="hidden lg:flex w-6 shrink-0 items-center justify-center self-end pb-2">
                <span className="text-xs font-black text-orange-500">{index + 1}</span>
            </div>
            <div className="w-full lg:flex-1 flex flex-col gap-2">
                <p className="font-medium text-slate-800/80 text-sm">{t('tickets.from')}</p>
                <Autocomplete
                    aria-label={t('tickets.from')}
                    placeholder={t('tickets.from_placeholder')}
                    variant="underlined"
                    startContent={<FaPlaneDeparture className="text-primary mr-2" />}
                    selectedKey={value.from || null}
                    onSelectionChange={(key) => { if (key) onChange(index, { ...value, from: String(key) }); }}
                    isLoading={isLoading}
                    isVirtualized={false}
                    items={sections}
                    classNames={{ popoverContent: 'w-[350px] md:w-[600px] glass-card bg-white/80 z-[9999]' }}
                    popoverProps={{ className: "z-[9999]" }}
                >
                    {(section) => (
                        <AutocompleteSection key={section.key} title={section.title} items={section.children}
                            classNames={{ heading: 'text-primary text-base font-bold pl-2' }} hideSelectedIcon>
                            {(item: Airport) => (
                                <AutocompleteItem key={item.code} textValue={item.name}
                                    className="text-black data-[hover=true]:bg-primary data-[hover=true]:text-white transition-colors">
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
            <div className="w-full lg:flex-1 flex flex-col gap-2">
                <p className="font-medium text-slate-800/80 text-sm">{t('tickets.to')}</p>
                <Autocomplete
                    aria-label={t('tickets.to')}
                    placeholder={t('tickets.to_placeholder')}
                    variant="underlined"
                    startContent={<FaPlaneArrival className="text-primary mr-2" />}
                    selectedKey={value.to || null}
                    onSelectionChange={(key) => { if (key) onChange(index, { ...value, to: String(key) }); }}
                    isLoading={isLoading}
                    isVirtualized={false}
                    items={sections}
                    classNames={{ popoverContent: 'w-[350px] md:w-[600px] glass-card bg-white/80 z-[9999]' }}
                    popoverProps={{ className: "z-[9999]" }}
                >
                    {(section) => (
                        <AutocompleteSection key={section.key} title={section.title} items={section.children}
                            classNames={{ heading: 'text-primary text-base font-bold pl-2' }} hideSelectedIcon>
                            {(item: Airport) => (
                                <AutocompleteItem key={item.code} textValue={item.name}
                                    className="text-black data-[hover=true]:bg-primary data-[hover=true]:text-white transition-colors">
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
            <div className="w-full lg:flex-1 flex flex-col gap-2">
                <p className="font-medium text-slate-800/80 text-sm">{t('tickets.departured_date')}</p>
                <DatePicker
                    aria-label={t('tickets.departured_date')}
                    variant="underlined"
                    color="warning"
                    className="w-full"
                    minValue={parseDate(moment().format('YYYY-MM-DD'))}
                    value={value.date ? parseDate(value.date) : null}
                    onChange={(v) => { if (v) onChange(index, { ...value, date: v.toString() }); }}
                />
            </div>
            {canRemove && (
                <button
                    type="button"
                    onClick={() => onRemove(index)}
                    className="shrink-0 w-10 h-10 flex items-center justify-center rounded-xl text-red-400 hover:bg-red-500/10 transition-colors mb-1"
                    aria-label={t('tickets.remove_flight')}
                >
                    <Trash2 size={18} />
                </button>
            )}
        </div>
    );
};

export default MultiCitySegment;
