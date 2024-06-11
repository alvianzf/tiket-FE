import { BookFlight } from "@api/bookFlight/types";
import { Card, CardBody, CardHeader, Divider, Skeleton } from "@nextui-org/react"
import { useTranslation } from "react-i18next"

interface Props {
    isLoading: boolean;
    flight?: BookFlight;
}

const PaymentSummary = ({ isLoading, flight } : Props) => {

    const { t } = useTranslation();

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
                    {t('checkout.order_no', { no : flight?.kodebooking })}
                </CardHeader>
                <Divider />
                <CardBody>
                    <div className="flex flex-col gap-3">
                        <div>
                            <p className="font-medium">{t('checkout.flight_detail')}</p>
                            <p>{flight?.flight_infotransit}</p>
                        </div>
                        <div>
                            <p className="font-medium">{t('checkout.passenger_detail')}</p>
                            {flight?.flight_datapassengers_json?.map((passenger, index) => (
                                <p key={index}>{`${passenger.passenger_title} ${passenger.passenger_fullname} (${passenger.passenger_type})`}</p>
                            ))}
                        </div>
                    </div>
                </CardBody>
            </Card>
        )
    )
}

export default PaymentSummary