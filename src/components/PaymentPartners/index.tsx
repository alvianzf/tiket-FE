import BankBca from "@icons/BankBca";
import BankBni from "@icons/BankBni";
import BankBri from "@icons/BankBri";
import BankMandiri from "@icons/BankMandiri";
import Dana from "@icons/Dana";
import { useTranslation } from "react-i18next"

const PaymentPartners = () => {
    const { t } = useTranslation();

    return (
        <div className="flex flex-col items-center gap-4">
            <div className="flex flex-col items-center text-center space-y-1">
                <p className="text-lg font-medium text-slate-700">
                    {t('home.payment_partners')}
                </p>
                <p className="text-xs text-slate-500">
                    {t('home.payment_partners_description') || 'Safe and secure payment methods for your convenience'}
                </p>
            </div>
            <div className="flex flex-row gap-6 flex-wrap justify-center items-center">
                <div className="filter grayscale hover:grayscale-0 transition-all cursor-pointer">
                    <Dana width={60} height={60} />
                </div>
                <div className="filter grayscale hover:grayscale-0 transition-all cursor-pointer">
                    <BankBri width={60} height={60} />
                </div>
                <div className="filter grayscale hover:grayscale-0 transition-all cursor-pointer">
                    <BankMandiri width={60} height={60} />
                </div>
                <div className="filter grayscale hover:grayscale-0 transition-all cursor-pointer">
                    <BankBca width={60} height={60} />
                </div>
                <div className="filter grayscale hover:grayscale-0 transition-all cursor-pointer">
                    <BankBni width={60} height={60} />
                </div>
            </div>
        </div>
    )
}

export default PaymentPartners