import { Card, Divider, InputAdornment, TextField } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useFormContext } from "react-hook-form";
import { FormProps } from "./forms/useForm";
import CheckoutOrderAdult from "./CheckoutOrderAdult";
import CheckoutOrderChild from "./CheckoutOrderChild";
import CheckoutOrderInfant from "./CheckoutOrderInfant";
import { User, Phone, Mail, FileText } from "lucide-react";

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

const CheckoutOrder = () => {

    const { watch, setValue, formState: { errors } } = useFormContext<FormProps>();

    const { t } = useTranslation();

    return (
        <div className="flex flex-col gap-12">
            <div className="flex flex-col gap-6">
                <div className="flex items-center gap-3">
                    <div className="w-1.5 h-6 bg-primary rounded-full"></div>
                    <p className="text-xl font-extrabold text-dark tracking-tight">{t('checkout.order_section_title')}</p>
                </div>

                <Card className="shadow-md overflow-hidden">
                    <div className="flex flex-col items-start gap-1 p-5 md:p-8 pb-3 md:pb-4">
                        <div className="flex items-center gap-2 text-slate-400 font-black uppercase tracking-[0.2em] text-xs">
                            <FileText size={14} />
                            <span>{t('checkout.order_section_description')}</span>
                        </div>
                    </div>
                    <Divider sx={{ mx: { xs: 2.5, md: 4 }, borderColor: "rgba(255,255,255,0.1)" }} />
                    <div className="p-5 md:p-8 pt-4 md:pt-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8 w-full">
                            <TextField
                                type="text"
                                label={t('checkout.name_middle_name')}
                                variant="standard"
                                fullWidth
                                placeholder="E.g. John"
                                value={watch('firstname')}
                                onChange={(e) => setValue('firstname', e.target.value)}
                                helperText={errors?.firstname?.message}
                                error={!!errors?.firstname}
                                slotProps={{
                                    inputLabel: { shrink: true },
                                    input: {
                                        startAdornment: (
                                        <InputAdornment position="start">
                                            <User size={18} className="text-slate-400" />
                                        </InputAdornment>
                                        ),
                                    },
                                }}
                                sx={fieldSx}
                            />
                            <TextField
                                type="text"
                                label={t('checkout.last_name')}
                                variant="standard"
                                fullWidth
                                placeholder="E.g. Doe"
                                value={watch('lastname')}
                                onChange={(e) => setValue('lastname', e.target.value)}
                                helperText={errors?.lastname?.message}
                                error={!!errors?.lastname}
                                slotProps={{
                                    inputLabel: { shrink: true },
                                    input: {
                                        startAdornment: (
                                        <InputAdornment position="start">
                                            <User size={18} className="text-slate-400" />
                                        </InputAdornment>
                                        ),
                                    },
                                }}
                                sx={fieldSx}
                            />
                            <TextField
                                type="tel"
                                label={t('checkout.phone_no')}
                                variant="standard"
                                fullWidth
                                placeholder="E.g. +62812345678"
                                value={watch('phone')}
                                onChange={(e) => setValue('phone', e.target.value)}
                                helperText={errors?.phone?.message}
                                error={!!errors?.phone}
                                slotProps={{
                                    inputLabel: { shrink: true },
                                    htmlInput: { inputMode: "tel" },
                                    input: {
                                        startAdornment: (
                                        <InputAdornment position="start">
                                            <Phone size={18} className="text-slate-400" />
                                        </InputAdornment>
                                        ),
                                    },
                                }}
                                sx={[fieldSx, monoInputSx]}
                            />
                            <TextField
                                type="email"
                                label={t('checkout.email')}
                                variant="standard"
                                fullWidth
                                placeholder="E.g. john.doe@example.com"
                                value={watch('email')}
                                onChange={(e) => setValue('email', e.target.value)}
                                helperText={errors?.email?.message}
                                error={!!errors?.email}
                                slotProps={{
                                    inputLabel: { shrink: true },
                                    htmlInput: { inputMode: "email" },
                                    input: {
                                        startAdornment: (
                                        <InputAdornment position="start">
                                            <Mail size={18} className="text-slate-400" />
                                        </InputAdornment>
                                        ),
                                    },
                                }}
                                sx={fieldSx}
                            />
                        </div>
                    </div>
                </Card>
            </div>

            <div className="flex flex-col gap-8">
                <div className="flex items-center gap-3">
                    <div className="w-1.5 h-6 bg-primary rounded-full"></div>
                    <p className="text-xl font-extrabold text-dark tracking-tight">{t('checkout.detail_traveler')}</p>
                </div>

                <div className="flex flex-col gap-6">
                    <CheckoutOrderAdult />
                    <CheckoutOrderChild />
                    <CheckoutOrderInfant />
                </div>
            </div>
        </div>
    )
}

export default CheckoutOrder