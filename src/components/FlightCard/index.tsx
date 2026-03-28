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

    const minPrice = Math.min(...(flight.classes?.map((c) => c.price) || [0]));
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
                            </div>
                            <p className="text-xl text-orange font-medium">
                                {`${new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR"}).format(minPrice)} / Org`}
                            </p>
                        </div>
                        <div className="flex flex-row gap-6 items-center justify-center w-full lg:w-[35%] md:w-[35%]">
                            <div className="flex flex-col text-center">
                                <p className="font-medium text-2xl">{departureTime}</p>
                                <p className="text-lg text-gray-400">{origin}</p>
                            </div>
                            
                            <div className="flex flex-col items-center gap-1 flex-1 max-w-[150px]">
                                <p className="text-xs text-gray-400">{flight.duration}</p>
                                <div className="flex items-center w-full">
                                    <div className="w-2 h-2 rounded-full border-2 border-orange-500 bg-white" />
                                    <div className="flex-1 border-t-2 border-dashed border-gray-300" />
                                    <div className="w-2 h-2 rounded-full bg-orange-500" />
                                </div>
                                <p className="text-xs font-medium text-gray-500">
                                    {!flight.isTransit ? t('tickets.direct') : t('tickets.transit', { number: 1 }).replace('%{number}', '1')}
                                </p>
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
                        <div className="flex flex-row justify-between items-start bg-gray-100/80 -mx-4 -mb-4 p-6 border-t border-gray-100">
                            <div className="flex flex-col gap-6 w-full max-w-2xl">
                                {flight.detailTitle?.map((detail, index) => (
                                    <div className="flex flex-col gap-8 relative" key={index}>
                                        <div className="flex flex-row gap-20">
                                            <p className="text-lg font-medium w-[120px] text-gray-700">{detail.depart}</p>
                                            <div className="flex flex-col">
                                                <p className="text-lg font-bold text-gray-800">{`${detail.originName} (${detail.origin})`}</p>
                                            </div>
                                        </div>
                                        <div className="flex flex-row gap-20">
                                            <div className="flex flex-col w-[120px] text-gray-400 text-xs italic">
                                                <p>{detail.durationDetail}</p>
                                            </div>
                                            <div className="flex flex-col border-l-2 border-dashed border-gray-300 pl-8 ml-[-2px]">
                                                <p className="text-sm font-semibold text-gray-600">{detail.flightName || flight.airlineName}</p>
                                                <p className="text-[10px] text-gray-400 uppercase tracking-widest leading-none mt-1">{detail.flightCode}</p>
                                            </div>
                                        </div>
                                        <div className="flex flex-row gap-20">
                                            <p className="text-lg font-medium w-[120px] text-gray-700">{detail.arrival}</p>
                                            <div className="flex flex-col">
                                                <p className="text-lg font-bold text-gray-800">{`${detail.destinationName} (${detail.destination})`}</p>
                                            </div>
                                        </div>

                                        {index < (flight.detailTitle?.length || 0) - 1 && detail.transitTime && (
                                            <div className="py-3 my-2 border border-orange-200 bg-white -mx-2 px-4 rounded-full flex items-center justify-center gap-2 shadow-sm w-fit self-center">
                                                <p className="text-[10px] font-bold text-orange-600 uppercase tracking-[0.2em]">{`Transit ${detail.transitTime} di ${detail.destinationName}`}</p>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}


                </div>
            </CardBody>
        </Card>
    )
}

export default FlightCard