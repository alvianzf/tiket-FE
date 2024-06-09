import { Flight } from "@api/findFlights/types";
import Button from "@components/Button";
import { Card, CardBody, Image, Select, SelectItem } from "@nextui-org/react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

interface Props {
    flight: Flight;
}

const FlightCard = ({ flight } : Props) => {

    const { t } = useTranslation();
    const [extended, setExtended] = useState<boolean>(false);

    const handleExtended = () => {
        setExtended((prevState) => !prevState);
    };

    const classesData = [
        { key: 'economy', label: t('tickets.economy') },
        { key: 'business_class', label: t('tickets.business_class') },
        { key: 'first_class', label: t('tickets.first_class') },
    ];

    const dateTimeArr = flight.flight_datetime.split(' ');

    const cityCodeArr = flight.flight_detailroute?.[0].route_city_code.split('|');
    const cityNameArr = flight.flight_detailroute?.[0].route_city_name.split('|');
    const airportArr = flight.flight_detailroute?.[0].route_airport.split('|');
    const timeArr = flight.flight_detailroute?.[0].route_time.split('|');
    const flightCodeArr = flight.flight_code.split(',');

    return (
        <Card className="px-4 flex flex-wrap lg:flex-nowrap md:flex-nowrap">
            <CardBody onClick={handleExtended}>
                <div className="flex flex-col gap-8 flex-wrap lg:flex-nowrap md:flex-nowrap">
                    <div className="flex flex-row justify-between gap-5 items-center">
                        <div className="w-[80px]">
                            <Image src={flight.flight_image} alt={flight.flight_code} width={80} height={80}/>
                        </div>
                        <div className="flex flex-col gap-3">
                            <p className="text-xl font-medium">{`${flight.flight} (${flight.flight_code})`}</p>
                            <div className="flex flex-row gap-3">
                                <div className="luggage-badge">
                                    <p className="text-sm">{flight.flight_baggage}</p>
                                </div>
                                <div className="luggage-reschedule">
                                    <p className="text-sm">{'Reschedule'}</p>
                                </div>
                            </div>
                            <p className="text-xl text-orange font-medium">
                                {`${new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR"}).format(parseInt(flight.flight_price))} / Org`}
                            </p>
                        </div>
                        <div className="flex flex-row gap-3 items-center">
                            <div className="flex flex-col text-center">
                                <p className="font-medium text-2xl">{dateTimeArr?.[0]}</p>
                                <p className="text-lg text-gray-400">{flight.flight_from}</p>
                            </div>
                            <div className="flex flex-col text-center">
                                <p className="text-sm text-gray-400">{flight.flight_duration}</p>
                                <hr />
                                <p className="text-sm text-gray-400">{flight.flight_transit}</p>
                            </div>
                            <div className="flex flex-col text-center">
                                <p className="font-medium text-2xl">{dateTimeArr?.[2]}</p>
                                <p className="text-lg text-gray-400">{flight.flight_to}</p>
                            </div>
                        </div>
                        <Button bgColor={"orange"} className="min-w-40">
                            {t('tickets.choose')}
                        </Button>
                    </div>
                    {extended && (
                        <div className="flex flex-row justify-between items-start">
                            <div className="flex flex-col gap-5">
                                {cityCodeArr?.map((cityCode, index) => {
                                    const splitCityCode = cityCode.split('~');
                                    const splitCityName = cityNameArr?.[index]?.split('~');
                                    const splitAirportName = airportArr?.[index]?.split('~');
                                    const splitTime = timeArr?.[index]?.split('~');

                                    return (
                                    <div className="flex flex-col gap-8">
                                        <div className="flex flex-row gap-20">
                                            <p className="text-lg font-medium">{splitTime?.[0]}</p>
                                            <div className="flex flex-col">
                                                <p className="text-lg font-medium">{`${splitCityName?.[0]} (${splitCityCode?.[0]})`}</p>
                                                <p className="text-gray-400">{splitAirportName?.[0]}</p>
                                            </div>
                                        </div>
                                        <div className="flex flex-row gap-20">
                                            <p className="text-gray-400 w-[40px]">{}</p>
                                            <div className="flex flex-col">
                                                <p className="text-lg font-medium">{flightCodeArr?.[index]}</p>
                                                {/* <p>{'Airbus A320'}</p> */}
                                            </div>
                                        </div>
                                        <div className="flex flex-row gap-20">
                                            <p className="text-lg font-medium">{splitTime?.[1]}</p>
                                            <div className="flex flex-col">
                                                <p className="text-lg font-medium">{`${splitCityName?.[1]} (${splitCityCode?.[1]})`}</p>
                                                <p className="text-gray-400">{splitAirportName?.[1]}</p>
                                            </div>
                                        </div>
                                    </div>
                                    )
                                })}
                                
                            </div>
                            
                            <Select 
                                placeholder={t('tickets.class_placeholder')}
                                className="max-w-xs"
                                variant="bordered"
                                radius="sm" 
                                selectionMode="single"
                                selectedKeys={["economy"]}
                            >
                                {classesData.map((item) => (
                                    <SelectItem key={item.key}>
                                        {item.label}
                                    </SelectItem>
                                    ))
                                }
                            </Select>
                        </div>
                    )}
                </div>
            </CardBody>
        </Card>
    )
}

export default FlightCard