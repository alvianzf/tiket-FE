import Button from "@components/Button";
import { Card, CardContent, CardHeader, Divider } from "@mui/material"
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next"


const PaymentConfirmation = () => {

    const { t } = useTranslation();

    const { query, push } = useRouter();

    const handleOnPayment = () => {
        push({
            pathname: '/checkout/payment/success',
            query: {
                ...query
            }
        })
    }

    return (
        <Card>
            <CardHeader disableTypography title={<span className="font-medium">{t('checkout.waiting_payment_verification')}</span>} />
            <Divider />
            <CardContent>
                <div className="flex flex-col gap-5 text-center">
                    <p>{t('checkout.upload_description')}</p>
                    <Button dsVariant={"cta"} onClick={handleOnPayment}>
                        {t('checkout.upload')}
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}

export default PaymentConfirmation
