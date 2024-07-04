import { Flight } from "@api/searchFlights/types";
import Button from "@components/Button";
import { Card, CardBody, Image } from "@nextui-org/react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

interface Props {
    flight: Flight;
    handleSelect: (flightCode: string) => () => void;
}

const FlightCard = ({ flight, handleSelect } : Props) => {

    const { t } = useTranslation();
    const [extended, setExtended] = useState<boolean>(false);

    const handleExtended = () => {
        setExtended((prevState) => !prevState);
    };

    // const classesData = [
    //     { key: 'economy', label: t('tickets.economy') },
    //     { key: 'business_class', label: t('tickets.business_class') },
    //     { key: 'first_class', label: t('tickets.first_class') },
    // ];

    const departureTime = flight.detailTitle?.[0]?.depart ?? '';
    const arrivalTime = flight.detailTitle?.[flight.detailTitle.length - 1]?.arrival ?? '';

    const origin = flight.detailTitle?.[0]?.origin ?? '';
    const destination = flight.detailTitle?.[flight.detailTitle.length - 1]?.destination ?? '';

    const totalPrice = flight.classes?.flatMap((flightClass) => flightClass).reduce((acc, { price }) => acc + price, 0);
    return (
        <Card className="px-4 flex flex-wrap lg:flex-nowrap md:flex-nowrap">
            <CardBody onClick={handleExtended}>
                <div className="flex flex-col gap-8 flex-wrap lg:flex-nowrap md:flex-nowrap">
                    <div className="flex flex-row flex-wrap justify-between gap-5 items-center">
                        <div className="w-[35%] lg:w-[15%] md:w-[15%]">
                            <Image src={flight.airlineIcon} alt={flight.airlineCode} width={80} height={80}/>
                        </div>
                        <div className="flex flex-col gap-3 w-[55%] lg:w-[25%] md:w-[25%]">
                            <p className="text-xl font-medium">{`${flight.airlineName}`}</p>
                            <div className="flex flex-row gap-3">
                                {/* <div className="luggage-badge">
                                    <p className="text-sm">{''}</p>
                                </div>
                                <div className="luggage-reschedule">
                                    <p className="text-sm">{'Reschedule'}</p>
                                </div> */}
                            </div>
                            <p className="text-xl text-orange font-medium">
                                {`${new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR"}).format(totalPrice)} / Org`}
                            </p>
                        </div>
                        <div className="flex flex-row gap-3 items-center justify-center w-full lg:w-[25%] md:w-[25%]">
                            <div className="flex flex-col text-center">
                                <p className="font-medium text-2xl">{departureTime}</p>
                                <p className="text-lg text-gray-400">{origin}</p>
                            </div>
                            <div className="flex flex-col text-center">
                                <p className="text-sm text-gray-400">{flight.duration}</p>
                                <hr />
                                <p className="text-sm text-gray-400">{'transit'}</p>
                            </div>
                            <div className="flex flex-col text-center">
                                <p className="font-medium text-2xl">{arrivalTime}</p>
                                <p className="text-lg text-gray-400">{destination}</p>
                            </div>
                        </div>
                        <Button bgColor={"orange"} className="w-full md:min-w-40 lg:min-w-40" onClick={handleSelect(flight.searchId)}>
                            {t('tickets.choose')}
                        </Button>
                    </div>
                    {extended && (
                        <div className="flex flex-row justify-between items-start">
                            <div className="flex flex-col gap-5 w-[50%]">
                                {flight.detailTitle?.map((detail, index) => (
                                    <div className="flex flex-col gap-8" key={index}>
                                        <div className="flex flex-row gap-20">
                                            <p className="text-lg font-medium w-[50%]">{detail.depart}</p>
                                            <div className="flex flex-col w-[50%]">
                                                <p className="text-lg font-medium">{`${detail.originName} (${detail.origin})`}</p>
                                                {/* <p className="text-gray-400">{'Airport'}</p> */}
                                            </div>
                                        </div>
                                        <div className="flex flex-row gap-20">
                                            <p className="text-gray-400 w-[50%]">{detail.durationDetail}</p>
                                            <div className="flex flex-col w-[50%]">
                                                <p className="text-lg font-medium">{detail.flightCode}</p>
                                                {/* <p>{'Airbus A320'}</p> */}
                                            </div>
                                        </div>
                                        <div className="flex flex-row gap-20">
                                            <p className="text-lg font-medium w-[50%]">{detail.arrival}</p>
                                            <div className="flex flex-col w-[50%]">
                                                <p className="text-lg font-medium">{`${detail.destinationName} (${detail.destination})`}</p>
                                                {/* <p className="text-gray-400">{'Airport'}</p> */}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                
                            </div>
                            
                            {/* <Select 
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
                            </Select> */}
                        </div>
                    )}
                </div>
            </CardBody>
        </Card>
    )
}

export default FlightCard