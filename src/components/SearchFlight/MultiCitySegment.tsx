import Combobox from "@components/ui/Combobox";
import DatePicker from "@components/ui/DatePicker";
import { useTranslation } from "react-i18next";
import moment from "moment";
import { Airport } from "@api/airports/types";
import { PlaneTakeoff, PlaneLanding, Trash2 } from "lucide-react";

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
    minDate?: string;
    onChange: (index: number, value: SegmentValue) => void;
    onRemove: (index: number) => void;
}

const MultiCitySegment = ({ index, value, airports, isLoading, canRemove, minDate, onChange, onRemove }: Props) => {
    const { t } = useTranslation();

    const airportOptions = airports.map((item) => ({ code: item.code, name: `${item.code} — ${item.name}`, group: item.group }));

    return (
        <div className="flex flex-col lg:flex-row gap-4 items-end w-full p-4 bg-slate-50 rounded-2xl border border-slate-100">
            <div className="hidden lg:flex w-6 shrink-0 items-center justify-center self-end pb-2">
                <span className="text-xs font-black text-orange-500">{index + 1}</span>
            </div>
            <div className="w-full lg:flex-1 flex flex-col gap-2">
                <p className="font-medium text-slate-800/80 text-sm">{t('tickets.from')}</p>
                <div className="flex items-center gap-2 bg-white rounded-xl p-3 border border-slate-100 focus-within:border-primary/50 transition-colors">
                    <PlaneTakeoff size={16} className="text-primary shrink-0" />
                    <Combobox
                        options={airportOptions}
                        value={value.from}
                        isLoading={isLoading}
                        placeholder={t('tickets.from_placeholder')}
                        onChange={(code) => onChange(index, { ...value, from: code })}
                    />
                </div>
            </div>
            <div className="w-full lg:flex-1 flex flex-col gap-2">
                <p className="font-medium text-slate-800/80 text-sm">{t('tickets.to')}</p>
                <div className="flex items-center gap-2 bg-white rounded-xl p-3 border border-slate-100 focus-within:border-primary/50 transition-colors">
                    <PlaneLanding size={16} className="text-primary shrink-0" />
                    <Combobox
                        options={airportOptions}
                        value={value.to}
                        isLoading={isLoading}
                        placeholder={t('tickets.to_placeholder')}
                        onChange={(code) => onChange(index, { ...value, to: code })}
                    />
                </div>
            </div>
            <div className="w-full lg:flex-1 flex flex-col gap-2">
                <p className="font-medium text-slate-800/80 text-sm">{t('tickets.departured_date')}</p>
                <div className="bg-white rounded-xl p-3 border border-slate-100 focus-within:border-primary/50 transition-colors">
                    <DatePicker
                        value={value.date}
                        onChange={(date) => onChange(index, { ...value, date })}
                        min={minDate || moment().format('YYYY-MM-DD')}
                    />
                </div>
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
