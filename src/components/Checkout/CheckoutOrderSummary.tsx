import { Flight } from "@api/searchFlights/types";
import { Card, CardBody, CardHeader, Divider, Skeleton } from "@nextui-org/react"
import { useTranslation } from "react-i18next"
import { Receipt, Tag } from "lucide-react";
import { motion } from "framer-motion";

interface Props {
    flightData?: Flight;
    isLoading: boolean;
}

const CheckoutOrderSummary = ({ flightData, isLoading } : Props) => {

    const { t } = useTranslation();

    const totalPrice = flightData?.classes?.flatMap((flightClass) => flightClass).reduce((acc, { price }) => acc + price, 0) ?? 0;

    return (
        isLoading ? (
            <Card className="w-full glass-card border-none bg-white/10 backdrop-blur-3xl shadow-xl rounded-[32px] overflow-hidden">
                <Skeleton className="rounded-[32px]">
                    <div className="h-[300px] rounded-[32px] bg-secondary/20"></div>
                </Skeleton>
            </Card>
        ) : (
            <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
            >
                <Card className="glass-card border-none bg-white/10 backdrop-blur-3xl shadow-xl rounded-[32px] overflow-hidden sticky top-24">
                    <CardHeader className="p-8 pb-4">
                        <div className="flex items-center gap-2 text-slate-400 font-black uppercase tracking-[0.2em] text-xs">
                            <Receipt size={14} />
                            <span>{t('checkout.order_summary')}</span>
                        </div>
                    </CardHeader>
                    <Divider className="bg-white/10 mx-8 w-auto" />
                    <CardBody className="p-8 pt-6">
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

                            <div className="p-5 rounded-2xl bg-orange-500/5 border border-orange-500/10 space-y-3">
                                <div className="flex items-center gap-2 mb-1">
                                    <Tag size={12} className="text-[#ff5a00]" />
                                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">{t('checkout.price_details', 'Price Details')}</span>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <div className="flex justify-between items-center">
                                        <span className="text-xs font-bold text-slate-500">Base Fare</span>
                                        <span className="text-xs font-black text-slate-700">
                                            {new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(totalPrice * 0.9)}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-xs font-bold text-slate-500">Tax & Fees</span>
                                        <span className="text-xs font-black text-slate-700">
                                            {new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(totalPrice * 0.1)}
                                        </span>
                                    </div>
                                </div>
                                <Divider className="bg-orange-500/10 my-2" />
                                <div className="flex justify-between items-center">
                                    <span className="text-sm font-black text-slate-800">Grand Total</span>
                                    <span className="text-lg font-black text-[#ff5a00]">
                                        {new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(totalPrice)}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </CardBody>
                </Card>
            </motion.div>
        )
    )
}

export default CheckoutOrderSummary