import Button from "@components/Button";
import { Card, CardBody, CardHeader, Divider } from "@nextui-org/react"
import { useTranslation } from "react-i18next"

interface Props {
    handleCompletePayment: () => void;
}

const PaymentConfirmation = ({ handleCompletePayment } : Props) => {

    const { t } = useTranslation();

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
                    <Button bgColor={"orange"} onClick={handleCompletePayment}>
                        {t('checkout.upload')}
                    </Button>
                </div>
            </CardBody>
        </Card>      
    )
}

export default PaymentConfirmation