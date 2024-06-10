import { Card, CardBody, CardHeader, Divider } from "@nextui-org/react"
import { useTranslation } from "react-i18next"

const PaymentSummary = () => {

    const { t } = useTranslation();

    return (
        <Card classNames={{
            header: "font-medium"
        }}>
            <CardHeader>
                {t('checkout.order_no', { no : 12345})}
            </CardHeader>
            <Divider />
            <CardBody>
                <div className="flex flex-col gap-3">
                    <div>
                        <p className="font-medium">{t('checkout.flight_detail')}</p>
                        <p>{'14 August 2024 Batam (BTH) - Jakarta (CGK)'}</p>
                    </div>
                    <div>
                        <p className="font-medium">{t('checkout.passenger_detail')}</p>
                        <p>{`John Doe (${t('tickets.adult')})`}</p>
                    </div>
                </div>
            </CardBody>
        </Card>
    )
}

export default PaymentSummary