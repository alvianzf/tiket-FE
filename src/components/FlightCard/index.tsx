import { Flight } from "@api/searchFlights/types";
import NextImage from "next/image";
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

    const minPrice = Math.min(...(flight.classes?.map((c) => Number(c.price)).filter(p => !isNaN(p) && p > 0) || [0]));
    return (
        <Card className="flex flex-col overflow-hidden">
            <CardBody onClick={handleExtended} className="p-0">
                <div className="flex flex-col gap-8 p-4">
                    <div className="flex flex-row flex-wrap justify-between gap-5 items-center">
                        <div className="w-[35%] lg:w-[15%] md:w-[15%]">
                            <Image as={NextImage} src={flight.airlineIcon} alt={flight.airlineCode} width={80} height={80}/>
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
                        <div className="bg-gray-100/80 p-6 border-t border-gray-100">
                            <div className="flex flex-col w-full max-w-2xl mx-auto">
                                {flight.detailTitle?.map((detail, index) => (
                                    <div key={index} className="flex flex-col">
                                        {/* Flight Segment */}
                                        <div className="grid grid-cols-[100px_30px_1fr] gap-4">
                                            {/* Left: Time */}
                                            <div className="flex flex-col justify-between py-1 text-right">
                                                <p className="text-base font-bold text-gray-800">{detail.depart}</p>
                                                <p className="text-base font-bold text-gray-800">{detail.arrival}</p>
                                            </div>

                                            {/* Center: Timeline Line */}
                                            <div className="flex flex-col items-center">
                                                <div className="w-3 h-3 rounded-full border-2 border-orange-500 bg-white z-10" />
                                                <div className="flex-1 w-[2px] border-l-2 border-dashed border-gray-300 my-1" />
                                                <div className="w-3 h-3 rounded-full bg-orange-500 z-10" />
                                            </div>

                                            {/* Right: Info */}
                                            <div className="flex flex-col justify-between py-1">
                                                <div>
                                                    <p className="text-base font-bold text-gray-800">{detail.originName}</p>
                                                    <p className="text-xs text-gray-500 uppercase tracking-wider">{detail.origin}</p>
                                                </div>

                                                <div className="my-6 bg-white/50 p-3 rounded-lg border border-gray-200 shadow-sm flex items-center gap-4">
                                                    <div className="flex flex-col">
                                                        <p className="text-sm font-semibold text-gray-700">{detail.flightName || flight.airlineName}</p>
                                                        <div className="flex items-center gap-2">
                                                            <p className="text-[10px] text-gray-400 uppercase tracking-widest leading-none">{detail.flightCode}</p>
                                                            <span className="text-gray-300">•</span>
                                                            <p className="text-[10px] text-gray-400 italic">Duration: {detail.durationDetail}</p>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div>
                                                    <p className="text-base font-bold text-gray-800">{detail.destinationName}</p>
                                                    <p className="text-xs text-gray-500 uppercase tracking-wider">{detail.destination}</p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Transit Spacer/Info */}
                                        {index < (flight.detailTitle?.length || 0) - 1 && (
                                            <div className="grid grid-cols-[100px_30px_1fr] gap-4">
                                                <div />
                                                <div className="h-12 w-[2px] bg-gray-100 flex items-center justify-center ml-[14px]">
                                                    <div className="w-1 h-3 rounded-full bg-gray-200" />
                                                </div>
                                                <div className="flex items-center py-4">
                                                    <div className="px-3 py-1 bg-orange-50 border border-orange-100 rounded-full">
                                                        <p className="text-[10px] font-bold text-orange-600 uppercase tracking-widest">
                                                            {detail.transitTime ? `Transit ${detail.transitTime}` : 'Connecting Flight'}
                                                        </p>
                                                    </div>
                                                </div>
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