import { Card, Divider, InputAdornment, MenuItem, TextField } from "@mui/material"
import { useFieldArray, useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { FormProps } from "./forms/useForm";
import { User, Calendar } from "lucide-react";
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

const CheckoutOrderAdult = () => {
    const { setValue, formState: { errors }, control, watch } = useFormContext<FormProps>();
    const { t } = useTranslation();

    const { fields } = useFieldArray({
        control,
        name: 'adultPassengers',
        keyName: 'adultPassengerKey'
    })

    const options = [
        { key: 'Mr', label: t('checkout.mr') },
        { key: 'Mrs', label: t('checkout.mrs') },
        { key: 'Ms', label: t('checkout.ms') },
    ];

    const handleDateChange = (value: string, index: number) => {
        setValue(`adultPassengers.${index}.date_of_birth`, value);
    };

    return (
        <div className="flex flex-col gap-6">
            {fields.map((field, index) => (
                <motion.div
                    key={field.adultPassengerKey}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                >
                    <Card className="shadow-md overflow-hidden">
                        <div className="flex items-center gap-3 p-5 md:p-8 pb-3 md:pb-4">
                            <div className="w-10 h-10 rounded-ds-md bg-primary/10 flex items-center justify-center shrink-0">
                                <User size={20} className="text-primary" />
                            </div>
                            <span className="text-lg font-black text-slate-800 tracking-tight">
                                {t('checkout.adult', { count: index+1 })}
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
                                        value={watch(`adultPassengers.${index}.call`) || ''}
                                        helperText={errors?.adultPassengers?.[index]?.call?.message}
                                        error={!!errors?.adultPassengers?.[index]?.call}
                                        onChange={(e) => setValue(`adultPassengers.${index}.call`, e.target.value)}
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
                                            value={watch(`adultPassengers.${index}.firstname`)}
                                            onChange={(e) => setValue(`adultPassengers.${index}.firstname`, e.target.value)}
                                            error={!!errors?.adultPassengers?.[index]?.firstname}
                                            helperText={errors?.adultPassengers?.[index]?.firstname?.message}
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
                                        value={watch(`adultPassengers.${index}.lastname`)}
                                        onChange={(e) => setValue(`adultPassengers.${index}.lastname`, e.target.value)}
                                        error={!!errors?.adultPassengers?.[index]?.lastname}
                                        helperText={errors?.adultPassengers?.[index]?.lastname?.message}
                                        slotProps={{ inputLabel: { shrink: true } }}
                                        sx={fieldSx}
                                    />
                                    <TextField
                                        type="date"
                                        label={t('checkout.date_of_birth')}
                                        variant="standard"
                                        fullWidth
                                        placeholder={t('checkout.select_date')}
                                        value={watch(`adultPassengers.${index}.date_of_birth`)}
                                        onChange={(e) => handleDateChange(e.target.value, index)}
                                        error={!!errors?.adultPassengers?.[index]?.date_of_birth}
                                        helperText={errors?.adultPassengers?.[index]?.date_of_birth?.message}
                                        slotProps={{
                                            inputLabel: { shrink: true },
                                            input: {
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <Calendar size={18} className="text-slate-400" />
                                                    </InputAdornment>
                                                ),
                                            },
                                        }}
                                        sx={[fieldSx, monoInputSx]}
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8">
                                    <TextField
                                        select
                                        label={t('checkout.cabin_class')}
                                        variant="standard"
                                        fullWidth
                                        value={watch(`adultPassengers.${index}.cabinClass`) || 'economy'}
                                        onChange={(e) => setValue(`adultPassengers.${index}.cabinClass`, e.target.value)}
                                        slotProps={{ inputLabel: { shrink: true } }}
                                        sx={fieldSx}
                                    >
                                        <MenuItem value="economy">{t('checkout.economy')}</MenuItem>
                                        <MenuItem value="business">{t('checkout.business')}</MenuItem>
                                    </TextField>
                                </div>
                            </div>
                        </div>
                    </Card>
                </motion.div>
            ))}
        </div>
    )
}

export default CheckoutOrderAdult
