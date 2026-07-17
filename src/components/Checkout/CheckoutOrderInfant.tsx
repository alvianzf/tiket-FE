import { Card, Checkbox, Divider, FormControlLabel, MenuItem, TextField } from "@mui/material"
import { DatePicker } from "@mui/x-date-pickers";
import { useFieldArray, useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { FormProps } from "./forms/useForm";
import moment from "moment";
import { Baby } from "lucide-react";
import { motion } from "framer-motion";

// Replicates the old NextUI "underlined + outside label" input look.
const fieldSx = {
    "& .MuiInputLabel-root": {
        fontWeight: 700,
        textTransform: "uppercase",
        letterSpacing: "0.05em",
        color: "#94a3b8",
        fontSize: 13.5,
    },
    "& .MuiInput-input": {
        fontWeight: 600,
        color: "#2F3033",
    },
} as const;

const monoInputSx = {
    "& .MuiInput-input": { fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace" },
} as const;

const CheckoutOrderInfant = () => {

    const { setValue, formState: { errors }, control, watch } = useFormContext<FormProps>();

    const { t } = useTranslation();

    const { fields } = useFieldArray({
        control,
        name: 'infantPassengers',
        keyName: 'infantPassengerKey'
    })

    const options = [
        { key: 'Mr', label: t('checkout.mr') },
        { key: 'Ms', label: t('checkout.ms') },
    ];

    return (
        <div className="flex flex-col gap-6">
            {fields.map((field, index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                >
                    <Card className="shadow-md overflow-hidden">
                        <div className="flex items-center gap-3 p-5 md:p-8 pb-3 md:pb-4">
                            <div className="w-10 h-10 rounded-ds-md bg-primary/10 flex items-center justify-center shrink-0">
                                <Baby size={20} className="text-primary" />
                            </div>
                            <span className="text-lg font-black text-slate-800 tracking-tight">
                                {t('checkout.infant', { count: index+1 })}
                            </span>
                        </div>
                        <Divider sx={{ mx: { xs: 2.5, md: 4 }, borderColor: "rgba(255,255,255,0.1)" }} />
                        <div className="p-5 md:p-8 pt-4 md:pt-6">
                            <div className="flex flex-col gap-5 md:gap-8 w-full">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-8">
                                    <TextField
                                        select
                                        label={t('checkout.choose')}
                                        variant="standard"
                                        fullWidth
                                        value={watch(`infantPassengers.${index}.call`) || ''}
                                        helperText={errors?.infantPassengers?.[index]?.call?.message}
                                        error={!!errors?.infantPassengers?.[index]?.call}
                                        onChange={(e) => setValue(`infantPassengers.${index}.call`, e.target.value)}
                                        slotProps={{
                                            inputLabel: { shrink: true },
                                            select: {
                                                displayEmpty: true,
                                                renderValue: (value: unknown) => {
                                                    const v = value as string;
                                                    if (!v) return <span className="text-slate-400">Title</span>;
                                                    return options.find((item) => item.key === v)?.label ?? v;
                                                },
                                            },
                                        }}
                                        sx={fieldSx}
                                    >
                                        {options.map((item) => (
                                            <MenuItem key={item.key} value={item.key}>
                                                {item.label}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                    <div className="md:col-span-2">
                                        <TextField
                                            type="text"
                                            label={t('checkout.name_middle_name')}
                                            variant="standard"
                                            fullWidth
                                            placeholder="Enter first/middle name"
                                            defaultValue={watch(`infantPassengers.${index}.firstname`)}
                                            onChange={(e) => setValue(`infantPassengers.${index}.firstname`, e.target.value)}
                                            helperText={errors?.infantPassengers?.[index]?.firstname?.message}
                                            error={!!errors?.infantPassengers?.[index]?.firstname}
                                            slotProps={{ inputLabel: { shrink: true } }}
                                            sx={fieldSx}
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8">
                                    <TextField
                                        type="text"
                                        label={t('checkout.last_name')}
                                        variant="standard"
                                        fullWidth
                                        placeholder="Enter last name"
                                        defaultValue={watch(`infantPassengers.${index}.lastname`)}
                                        onChange={(e) => setValue(`infantPassengers.${index}.lastname`, e.target.value)}
                                        helperText={errors?.infantPassengers?.[index]?.lastname?.message}
                                        error={!!errors?.infantPassengers?.[index]?.lastname}
                                        slotProps={{ inputLabel: { shrink: true } }}
                                        sx={fieldSx}
                                    />
                                    <DatePicker
                                        label={t('checkout.date_of_birth')}
                                        onChange={(value) => setValue(`infantPassengers.${index}.date_of_birth`, moment(value).format('YYYY-MM-DD'))}
                                        defaultValue={watch(`infantPassengers.${index}.date_of_birth`) ? moment(watch(`infantPassengers.${index}.date_of_birth`)) : null}
                                        slotProps={{
                                            textField: {
                                                variant: "standard",
                                                fullWidth: true,
                                                error: !!errors?.infantPassengers?.[index]?.date_of_birth,
                                                helperText: errors?.infantPassengers?.[index]?.date_of_birth?.message,
                                                slotProps: { inputLabel: { shrink: true } },
                                                sx: [fieldSx, monoInputSx],
                                            },
                                        }}
                                    />
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8">
                                    <TextField
                                        select
                                        label={t('checkout.cabin_class')}
                                        variant="standard"
                                        fullWidth
                                        disabled={!!watch(`infantPassengers.${index}.isLapInfant`)}
                                        value={watch(`infantPassengers.${index}.cabinClass`) || 'economy'}
                                        onChange={(e) => setValue(`infantPassengers.${index}.cabinClass`, e.target.value)}
                                        slotProps={{ inputLabel: { shrink: true } }}
                                        sx={fieldSx}
                                    >
                                        <MenuItem value="economy">{t('checkout.economy')}</MenuItem>
                                        <MenuItem value="business">{t('checkout.business')}</MenuItem>
                                    </TextField>
                                    <div className="flex items-center pt-5 md:pt-6">
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={!!watch(`infantPassengers.${index}.isLapInfant`)}
                                                    onChange={(e) => {
                                                        const checked = e.target.checked;
                                                        setValue(`infantPassengers.${index}.isLapInfant`, checked);
                                                        if (checked) setValue(`infantPassengers.${index}.cabinClass`, 'economy');
                                                    }}
                                                />
                                            }
                                            label={t('checkout.lap_infant')}
                                            slotProps={{ typography: { sx: { fontSize: 14, fontWeight: 500, color: "#334155" } } }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Card>
                </motion.div>
            ))}
        </div>
    )
}

export default CheckoutOrderInfant