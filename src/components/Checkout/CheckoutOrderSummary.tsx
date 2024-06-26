import { Flight } from "@api/searchFlights/types";
import { Card, CardBody, CardHeader, Divider, Skeleton } from "@nextui-org/react"
import { useTranslation } from "react-i18next"

interface Props {
    flightData?: Flight;
    isLoading: boolean;
}

const CheckoutOrderSummary = ({ flightData, isLoading } : Props) => {

    const { t } = useTranslation();

    const totalPrice = flightData?.classes?.flatMap((flightClass) => flightClass).reduce((acc, { price }) => acc + price, 0) ?? 0;

    return (
        isLoading ? (
            <Card className="w-full">
                <Skeleton className="rounded-lg">
                    <div className="h-[300px] rounded-lg bg-secondary"></div>
                </Skeleton>
            </Card>
        ) : (
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
                            <p className="text-lg font-medium text-orange">{`${new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR"}).format(totalPrice)}`}</p>
                        </div>
                        <div className="flex flex-col gap-2">
                            <div className="flex flex-row justify-between">
                                {/* <p>{flightPrice?.flight_code}</p>
                                <p>{`${new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR"}).format(flightPrice?.totalfare ?? 0)}`}</p> */}
                            </div>
                            <div className="flex flex-row justify-between">
                                {/* <p>{t('checkout.tax')}</p>
                                <p>{`${new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR"}).format(flightPrice?.tax ?? 0)}`}</p> */}
                            </div>
                        </div>
                    </div>
                </CardBody>
            </Card>
        )
    )
}

export default CheckoutOrderSummary