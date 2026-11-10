import Combobox from "@components/ui/Combobox";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { FormProps } from "../forms/useForm";
import { Airport } from "@api/airports/types";
import { PlaneTakeoff } from "lucide-react";

interface Props {
    items: Airport[];
    isLoading?: boolean;
}

const FromInput = ({ items, isLoading } : Props) => {

    const { t } = useTranslation();

    const { setValue, watch, formState: { errors }} = useFormContext<FormProps>();

    return (
        <div className="w-full flex flex-col gap-2">
            <p className="font-medium text-slate-800/80">{t('tickets.from')}</p>
            <div className={`flex items-center gap-2 bg-slate-50 rounded-xl p-3 border transition-colors ${errors?.from?.message ? "border-red-400" : "border-slate-100 focus-within:border-primary/50"}`}>
                <PlaneTakeoff size={16} className="text-primary shrink-0" />
                <Combobox
                    options={items.map((item) => ({ code: item.code, name: `${item.code} — ${item.name}`, group: item.group }))}
                    value={watch('from') || ''}
                    isLoading={isLoading}
                    placeholder={t('tickets.from_placeholder')}
                    onChange={(code) => setValue('from', code)}
                />
            </div>
            {errors?.from?.message && <span className="text-xs text-red-500">{errors.from.message}</span>}
        </div>
    )
}

export default FromInput
