import { Card, Divider } from "@mui/material"
import { useTranslation } from "react-i18next"
import { User, Calendar, CheckCircle2 } from "lucide-react";
import moment from "moment";

interface Props {
    fullname: string;
    date_of_birth: string;
    index: number;
}

const CheckoutOrderReviewPassenger = ({ fullname, date_of_birth, index } : Props) => {

    const { t } = useTranslation();

    return (
        <Card className="shadow-sm hover:shadow-md transition-all duration-300">
            <div className="p-6 pb-3">
                <div className="flex w-full items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-ds-sm bg-primary/10 flex items-center justify-center">
                            <span className="text-xs font-bold text-primary font-mono">{index}</span>
                        </div>
                        <p className="text-base font-bold text-dark tracking-tight capitalize">{fullname.toLowerCase()}</p>
                    </div>
                    <CheckCircle2 size={18} className="text-emerald-500 opacity-50" />
                </div>
            </div>
            <Divider sx={{ mx: 3, borderColor: "#E6E9EE" }} />
            <div className="p-6 pt-4">
                <div className="flex items-center gap-6">
                    <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-1.5 text-slate-400">
                            <Calendar size={12} />
                            <span className="text-[10px] font-bold uppercase tracking-wider font-sans">{t('checkout.date_of_birth')}</span>
                        </div>
                        <p className="text-sm font-semibold text-dark font-mono pl-4.5">
                            {date_of_birth && moment(date_of_birth, 'YYYY-MM-DD').isValid() ? moment(date_of_birth, 'YYYY-MM-DD').format('DD-MM-YYYY') : '-'}
                        </p>
                    </div>
                    <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-1.5 text-slate-400">
                            <User size={12} />
                            <span className="text-[10px] font-bold uppercase tracking-wider font-sans">{t('checkout.type', 'Passenger Type')}</span>
                        </div>
                        <p className="text-sm font-semibold text-dark pl-4.5">
                            {index === 1 ? 'Primary Traveler' : 'Additional Traveler'}
                        </p>
                    </div>
                </div>
            </div>
        </Card>
    )
}

export default CheckoutOrderReviewPassenger