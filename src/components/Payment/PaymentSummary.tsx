import { GetBookFlightResponse } from "@api/bookFlight/types";
import { Card, CardBody, CardHeader, Divider, Skeleton } from "@nextui-org/react"
import { useTranslation } from "react-i18next"

interface Props {
    isLoading: boolean;
    flight?: GetBookFlightResponse;
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
                    {t('checkout.order_no', { no : flight?.data.bookingCode })}
                </CardHeader>
                <Divider />
                <CardBody>
                    <div className="flex flex-col gap-3">
                        {flight?.data?.flightdetail.map((detail, index) => (
                            <div key={index}>
                                <p className="font-medium">{t('checkout.flight_detail')}</p>
                                <p>{`${detail?.originName} (${detail?.origin}) - ${detail?.destinationName} (${detail?.destination})`}</p>
                            </div>
                        ))}
                        <div>
                            <p className="font-medium">{t('checkout.passenger_detail')}</p>
                            {flight?.data.passengers.adults?.map((passenger, index) => (
                                <p key={index}>{`${passenger.title} ${passenger.first_name} (${t('tickets.adult')})`}</p>
                            ))}
                            {flight?.data.passengers.children?.map((passenger, index) => (
                                <p key={index}>{`${passenger.title} ${passenger.first_name} (${t('tickets.child')})`}</p>
                            ))}
                            {flight?.data.passengers.infants?.map((passenger, index) => (
                                <p key={index}>{`${passenger.title} ${passenger.first_name} (${t('tickets.infant')})`}</p>
                            ))}
                        </div>
                    </div>
                </CardBody>
            </Card>
        )
    )
}

export default PaymentSummary