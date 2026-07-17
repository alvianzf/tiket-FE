import Button from "@components/Button";
import NextImage from "next/image"
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next"

const PaymentFailed = () => {

    const { t } = useTranslation();
    const { back } = useRouter();

    return (
        <div className="flex flex-col text-center gap-8">
            <div className="m-auto">
                <NextImage src="/images/payment-failed.png" width={200} height={200} alt="Payment Failed"/>
            </div>

            <p className="text-orange text-lg font-medium">{t('checkout.payment_failed')}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button dsVariant="cta" className="h-12 px-10 rounded-ds-sm shadow-md" onClick={() => back()}>
                     {t('checkout.try_again', 'Try Again')}
                </Button>
                <Button dsVariant="ghost" className="h-12 px-10 rounded-ds-sm shadow-md" onClick={() => window.location.href = '/'}>
                     {t('profile.home')}
                </Button>
            </div>
        </div>
    )
}

export default PaymentFailed
