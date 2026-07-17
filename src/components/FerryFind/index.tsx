import { Button, InputAdornment, TextField } from "@mui/material";
import { useTranslation } from "react-i18next"
import IconSearch from "@icons/IconSearch";
import { FaTicketAlt, FaIdCard } from "react-icons/fa";

const FerryFind = () => {
    const { t } = useTranslation();

    return (
        <div className="min-w-[320px] max-w-[400px] glass-card p-8 shadow-2xl bg-white/40 backdrop-blur-2xl border-white/40">
            <div className="flex flex-col gap-8 w-full">
                <div className="space-y-2">
                    <h2 className="text-2xl font-bold text-slate-800">{t('common.find_booking')}</h2>
                    <p className="text-sm text-slate-600 leading-relaxed">
                        Please provide us your booking number and passport number to retrieve your booking details.
                    </p>
                </div>

                <div className="space-y-5">
                    <div className="w-full flex flex-col gap-2">
                        <label className="text-sm font-semibold text-slate-700 ml-1">{t('common.booking_no') || 'Booking No.'}</label>
                        <TextField
                            type="text"
                            variant="standard"
                            placeholder="e.g. BZK12345"
                            fullWidth
                            slotProps={{
                                input: {
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <FaTicketAlt className="text-[#4267B2] mr-2" />
                                        </InputAdornment>
                                    ),
                                },
                                htmlInput: {
                                    className: "text-slate-800 font-medium",
                                },
                            }}
                        />
                    </div>
                    <div className="w-full flex flex-col gap-2">
                        <label className="text-sm font-semibold text-slate-700 ml-1">{t('common.passport_no') || 'Passport No.'}</label>
                        <TextField
                            type="text"
                            variant="standard"
                            placeholder="e.g. A1234567"
                            fullWidth
                            slotProps={{
                                input: {
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <FaIdCard className="text-[#4267B2] mr-2" />
                                        </InputAdornment>
                                    ),
                                },
                                htmlInput: {
                                    className: "text-slate-800 font-medium",
                                },
                            }}
                        />
                    </div>
                </div>

                <Button
                    variant="contained"
                    color="warning"
                    aria-label="search"
                    className="w-full h-14 text-lg font-bold shadow-lg shadow-orange-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all"
                >
                    <IconSearch width={28} height={28}/>
                </Button>
            </div>
        </div>
    )
}

export default FerryFind
