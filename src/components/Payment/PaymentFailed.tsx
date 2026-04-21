import Button from "@components/Button";
import { Image } from "@nextui-org/react";
import NextImage from "next/image"
import { useTranslation } from "react-i18next"

const PaymentFailed = () => {

    const { t } = useTranslation();

    return (
        <div className="flex flex-col text-center gap-8">
            <div className="m-auto">
                <Image as={NextImage} src="/images/payment-failed.png" width={200} height={200} alt="Payment Failed"/>
            </div>

            <p className="text-orange text-lg font-medium">{t('checkout.payment_failed')}</p>
            <Button dsVariant="cta" className="h-12 px-10 rounded-ds-sm shadow-md" onClick={() => window.location.href = '/'}>
                 {t('profile.home')}
            </Button>
        </div>      
    )
}

export default PaymentFailed