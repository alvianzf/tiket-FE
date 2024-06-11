import Button from "@components/Button";
import { Card, CardBody, CardHeader, Divider } from "@nextui-org/react"
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
        <Card classNames={{
            header: "font-medium"
        }}>
            <CardHeader>
                {t('checkout.waiting_payment_verification')}
            </CardHeader>
            <Divider />
            <CardBody>
                <div className="flex flex-col gap-5 text-center">
                    <p>{t('checkout.upload_description')}</p>
                    <Button bgColor={"orange"} onClick={handleOnPayment}>
                        {t('checkout.upload')}
                    </Button>
                </div>
            </CardBody>
        </Card>      
    )
}

export default PaymentConfirmation