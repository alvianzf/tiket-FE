import { Card, CardContent, CardHeader, Divider } from "@mui/material"
import { useTranslation } from "react-i18next"
import Button from "@components/Button";
import Link from "next/link";

// The old manual bank-transfer flow (hardcoded personal account numbers +
// a no-op "I have paid" button) has been superseded by the DANA checkout,
// which records payments and issues tickets automatically. This page no
// longer collects or displays any transfer details.
const PaymentWaiting = () => {

    const { t } = useTranslation();

    return (
        <div className="flex flex-col gap-4">
            <Card>
                <CardHeader disableTypography title={<span className="font-medium">{t('checkout.payment_instruction')}</span>} />
                <Divider />
                <CardContent>
                    <div className="flex flex-col gap-6">
                        <p className="text-slate-600">
                            {t('checkout.manual_transfer_deprecated', 'Manual bank transfer is no longer available. Please complete your payment through the standard checkout to have your ticket issued automatically.')}
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Button dsVariant="cta" className="h-12 px-10 rounded-ds-sm shadow-md" component={Link} href="/checkout/payment">
                                {t('checkout.back_to_checkout', 'Back to checkout')}
                            </Button>
                            <Button dsVariant="ghost" className="h-12 px-10 rounded-ds-sm shadow-md" component={Link} href="/">
                                {t('profile.home')}
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default PaymentWaiting
