import { Card, CardBody, CardHeader, Divider } from "@nextui-org/react"
import { useTranslation } from "react-i18next"

const CheckoutOrderSummary = () => {

    const { t } = useTranslation();

    return (
        <Card classNames={{
            header: "font-medium"
        }}>
            <CardHeader>
                {t('checkout.order_summary')}
            </CardHeader>
            <Divider />
            <CardBody>
                <div className="flex flex-col gap-5">
                    <div className="flex flex-row justify-between">
                        <p className="text-lg font-medium text-orange">{t('checkout.total')}</p>
                        <p className="text-lg font-medium text-orange">{'Rp 1.800.000'}</p>
                    </div>
                    <div className="flex flex-col gap-2">
                        <div className="flex flex-row justify-between">
                            <p>{t('checkout.insurance')}</p>
                            <p>{'Rp 1.800.000'}</p>
                        </div>
                        <div className="flex flex-row justify-between">
                            <p>{t('checkout.insurance')}</p>
                            <p>{'Rp 1.800.000'}</p>
                        </div>
                        <div className="flex flex-row justify-between">
                            <p>{t('checkout.insurance')}</p>
                            <p>{'Rp 1.800.000'}</p>
                        </div>
                    </div>
                </div>
            </CardBody>
        </Card>
    )
}

export default CheckoutOrderSummary