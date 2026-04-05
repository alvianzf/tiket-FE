import { Card, CardBody, CardHeader, Divider } from "@nextui-org/react"
import { useTranslation } from "react-i18next"
import { User, Calendar, CheckCircle2 } from "lucide-react";

interface Props {
    fullname: string;
    date_of_birth: string;
    index: number;
}

const CheckoutOrderReviewPassenger = ({ fullname, date_of_birth, index } : Props) => {

    const { t } = useTranslation();

    return (
        <Card className="glass-card border-none bg-white/5 backdrop-blur-3xl shadow-lg rounded-[28px] overflow-hidden hover:bg-white/10 transition-all duration-300">
            <CardHeader className="p-6 pb-3">
                <div className="flex w-full items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-xl bg-orange-500/10 flex items-center justify-center">
                            <span className="text-xs font-black text-[#ff5a00]">{index}</span>
                        </div>
                        <p className="text-base font-extrabold text-slate-800 tracking-tight capitalize">{fullname.toLowerCase()}</p>
                    </div>
                    <CheckCircle2 size={18} className="text-emerald-500 opacity-50" />
                </div>
            </CardHeader>
            <Divider className="bg-white/10 mx-6 w-auto" />
            <CardBody className="p-6 pt-4">
                <div className="flex items-center gap-6">
                    <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-1.5 text-slate-400">
                            <Calendar size={12} />
                            <span className="text-[10px] font-black uppercase tracking-[0.1em]">{t('checkout.date_of_birth')}</span>
                        </div>
                        <p className="text-sm font-bold text-slate-600 pl-4.5">{date_of_birth || '-'}</p>
                    </div>
                    <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-1.5 text-slate-400">
                            <User size={12} />
                            <span className="text-[10px] font-black uppercase tracking-[0.1em]">{t('checkout.type', 'Passenger Type')}</span>
                        </div>
                        <p className="text-sm font-bold text-slate-600 pl-4.5">
                            {index === 1 ? 'Primary Traveler' : 'Additional Traveler'}
                        </p>
                    </div>
                </div>
            </CardBody>
        </Card>
    )
}

export default CheckoutOrderReviewPassenger