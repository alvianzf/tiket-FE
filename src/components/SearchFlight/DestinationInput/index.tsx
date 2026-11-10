import Combobox from "@components/ui/Combobox";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { FormProps } from "../forms/useForm";
import { Airport } from "@api/airports/types";
import { PlaneLanding } from "lucide-react";

interface Props {
    items: Airport[];
    isLoading?: boolean;
}

const DestinationInput = ({ items, isLoading } : Props) => {

    const { t } = useTranslation();

    const { setValue, watch, formState: { errors }} = useFormContext<FormProps>();

    return (
        <div className="w-full flex flex-col gap-2">
            <p className="font-medium text-slate-800/80">{t('tickets.to')}</p>
            <div className={`flex items-center gap-2 bg-slate-50 rounded-xl p-3 border transition-colors ${errors?.to?.message ? "border-red-400" : "border-slate-100 focus-within:border-primary/50"}`}>
                <PlaneLanding size={16} className="text-primary shrink-0" />
                <Combobox
                    options={items.map((item) => ({ code: item.code, name: `${item.code} — ${item.name}`, group: item.group }))}
                    value={watch('to') || ''}
                    isLoading={isLoading}
                    placeholder={t('tickets.to_placeholder')}
                    onChange={(code) => setValue('to', code)}
                />
            </div>
            {errors?.to?.message && <span className="text-xs text-red-500">{errors.to.message}</span>}
        </div>
    )
}

export default DestinationInput
