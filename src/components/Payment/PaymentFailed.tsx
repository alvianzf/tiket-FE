import Button from "@components/Button";
import { Image } from "@nextui-org/react";
import { useTranslation } from "react-i18next"

const PaymentFailed = () => {

    const { t } = useTranslation();

    return (
        <div className="flex flex-col text-center gap-8">
            <div className="m-auto">
                <Image src="/images/payment-failed.png" width={200} height={200}/>
            </div>
            <p className="text-orange text-lg font-medium">{t('checkout.payment_failed')}</p>
            <Button bgColor={"orange"}>
                {t('checkout.home')}
            </Button>
        </div>      
    )
}

export default PaymentFailed