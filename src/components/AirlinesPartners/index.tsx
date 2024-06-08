import { Card, Image, Skeleton } from "@nextui-org/react";
import { useQueryCodeFlights } from "@queries/codeFlights";
import { useTranslation } from "react-i18next"

const AirlinesPartners = () => {
    const { t } = useTranslation();

    const { data, isFetching } = useQueryCodeFlights({
        enabled: true
    });

    return (
        <div className="flex flex-col lg:w-6/12 md:w-6/12 gap-3 sm:w-full w-full">
            <div className="flex flex-col items-center">
                <p className="text-lg font-medium">{t('home.airlines_partners')}</p>
                <p>{t('home.airlines_partners_description')}</p>
            </div>
            <div className="flex flex-row gap-3 flex-wrap items-center">
                {isFetching && (
                    <>
                        <Card>
                            <Skeleton >
                                <div className="h-[50px] w-[50px] bg-secondary"/>
                            </Skeleton>
                        </Card>
                        <Card>
                            <Skeleton >
                                <div className="h-[50px] w-[50px] bg-secondary"/>
                            </Skeleton>
                        </Card>
                        <Card>
                            <Skeleton >
                                <div className="h-[50px] w-[50px] bg-secondary"/>
                            </Skeleton>
                        </Card>
                        <Card>
                            <Skeleton >
                                <div className="h-[50px] w-[50px] bg-secondary"/>
                            </Skeleton>
                        </Card>
                        <Card>
                            <Skeleton >
                                <div className="h-[50px] w-[50px] bg-secondary"/>
                            </Skeleton>
                        </Card>
                        <Card>
                            <Skeleton >
                                <div className="h-[50px] w-[50px] bg-secondary"/>
                            </Skeleton>
                        </Card>
                        <Card>
                            <Skeleton >
                                <div className="h-[50px] w-[50px] bg-secondary"/>
                            </Skeleton>
                        </Card>
                        <Card>
                            <Skeleton >
                                <div className="h-[50px] w-[50px] bg-secondary"/>
                            </Skeleton>
                        </Card>
                        <Card>
                            <Skeleton >
                                <div className="h-[50px] w-[50px] bg-secondary"/>
                            </Skeleton>
                        </Card>
                        <Card>
                            <Skeleton >
                                <div className="h-[50px] w-[50px] bg-secondary"/>
                            </Skeleton>
                        </Card>
                        <Card>
                            <Skeleton >
                                <div className="h-[50px] w-[50px] bg-secondary"/>
                            </Skeleton>
                        </Card>
                        <Card>
                            <Skeleton >
                                <div className="h-[50px] w-[50px] bg-secondary"/>
                            </Skeleton>
                        </Card>

                    </>
                )}
                {data?.filter((codeFlight) => codeFlight.flight_name === "Garuda Indonesia" 
                    || codeFlight.flight_code === "JT"
                    || codeFlight.flight_code === "ID"
                    || codeFlight.flight_code === "IW"
                    || codeFlight.flight_code === "QZ"
                    || codeFlight.flight_code === "OD"
                    || codeFlight.flight_code === "IP"
                    || codeFlight.flight_code === "IN"
                    || codeFlight.flight_code === "IU"
                    || codeFlight.flight_code === "QG"
                    || codeFlight.flight_code === "SJ"
                    )
                .map((codeFlight, index) => (
                    <Image width={50} height={50} src={codeFlight.flight_image} alt={codeFlight.flight_name} key={index}/>
                ))}
            </div>
        </div>
    )
}

export default AirlinesPartners