import BankBca from "@icons/BankBca";
import BankBni from "@icons/BankBni";
import BankBri from "@icons/BankBri";
import BankMandiri from "@icons/BankMandiri";
import Dana from "@icons/Dana";
import { useTranslation } from "react-i18next"

const PaymentPartners = () => {
    const { t } = useTranslation();

    return (
        <div className="flex flex-col items-center gap-3 lg:w-6/12 md:w-6/12 sm:w-full w-full">
            <p className="text-lg font-medium">{t('home.payment_partners')}</p>
            <div className="flex flex-row gap-6 flex-wrap justify-center items-center">
                <Dana width={70} height={70}/>
                <BankBri width={70} height={70} />
                <BankMandiri width={70} height={70} />
                <BankBca width={70} height={70} />
                <BankBni width={70} height={70} />
            </div>
        </div>
    )
}

export default PaymentPartners