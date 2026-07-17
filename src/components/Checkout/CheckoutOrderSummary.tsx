import { Flight } from "@api/searchFlights/types";
import { Card, Divider, Skeleton } from "@mui/material"
import { useTranslation } from "react-i18next"
import { Receipt } from "lucide-react";
import { motion } from "framer-motion";

interface Props {
    flightData?: Flight;
    isLoading: boolean;
}

// The summary card intentionally overrides the default glass surface with a
// more translucent tint, heavier blur, and a 32px radius.
const summaryCardSx = {
    background: "rgba(255,255,255,0.10)",
    backdropFilter: "blur(64px)",
    border: "none",
    borderRadius: "32px",
    boxShadow: "0 20px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1)",
} as const;

const CheckoutOrderSummary = ({ flightData, isLoading } : Props) => {

    const { t } = useTranslation();

    const totalPrice = flightData?.classes?.flatMap((flightClass) => flightClass).reduce((acc, { price }) => acc + price, 0) ?? 0;

    return (
        isLoading ? (
            <Card className="w-full overflow-hidden" sx={summaryCardSx}>
                <Skeleton variant="rounded" height={300} sx={{ borderRadius: "32px", bgcolor: "rgba(10,209,255,0.2)" }} />
            </Card>
        ) : (
            <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
            >
                <Card className="overflow-hidden sticky top-24" sx={summaryCardSx}>
                    <div className="p-8 pb-4">
                        <div className="flex items-center gap-2 text-slate-400 font-black uppercase tracking-[0.2em] text-xs">
                            <Receipt size={14} />
                            <span>{t('checkout.order_summary')}</span>
                        </div>
                    </div>
                    <Divider sx={{ mx: 4, borderColor: "rgba(255,255,255,0.1)" }} />
                    <div className="p-8 pt-6">
                        <div className="flex flex-col gap-8">
                            <div className="space-y-4">
                                <div className="flex items-center justify-between group">
                                    <div className="flex items-center gap-2 border-l-2 border-slate-200 pl-3 group-hover:border-[#ff5a00] transition-colors">
                                        <span className="text-xs font-black uppercase tracking-wider text-slate-400">{t('checkout.total')}</span>
                                    </div>
                                    <span className="text-2xl font-black text-[#ff5a00] tracking-tighter">
                                        {new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(totalPrice)}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </Card>
            </motion.div>
        )
    )
}

export default CheckoutOrderSummary