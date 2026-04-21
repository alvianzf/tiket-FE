import { Flight } from "@api/searchFlights/types";
import NextImage from "next/image";
import Button from "@components/Button";
import { Card, CardBody, Image } from "@nextui-org/react";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { getPrice } from "@api/searchFlights/types";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
    flight: Flight;
    handleSelect: (flightCode: string) => () => void;
}

const FlightCard = ({ flight, handleSelect } : Props) => {

    const { t } = useTranslation();
    const [extended, setExtended] = useState<boolean>(false);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const handleExtended = () => {
        setExtended((prevState) => !prevState);
    };

    const departureTime = flight.detailTitle?.[0]?.depart ?? '';
    const arrivalTime = flight.detailTitle?.[flight.detailTitle.length - 1]?.arrival ?? '';

    const origin = flight.detailTitle?.[0]?.origin ?? '';
    const destination = flight.detailTitle?.[flight.detailTitle.length - 1]?.destination ?? '';

    const minPrice = getPrice(flight);

    return (
        <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            layout
        >
            <Card className="flex flex-col h-auto glass-card border-none bg-white/10 backdrop-blur-2xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden rounded-3xl">
                <CardBody onClick={handleExtended} className="p-0 overflow-visible cursor-pointer">
                    <div className="flex flex-col gap-6 p-5 lg:p-8">
                        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                            {/* Airline Info & Price */}
                            <div className="flex items-center gap-4 lg:w-[35%]">
                                <div className="p-3 bg-white/10 rounded-2xl backdrop-blur-md">
                                    <Image as={NextImage} src={flight.airlineIcon} alt={flight.airlineCode} width={50} height={50} className="brightness-110 object-contain min-w-[50px]"/>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <p className="text-lg font-extrabold text-slate-800 tracking-tight leading-tight">{flight.airlineName}</p>
                                    <p className="text-xl md:text-2xl text-[#ff5a00] font-black tracking-tighter">
                                        {!isMounted ? "" : (minPrice !== null && Number.isFinite(minPrice) && minPrice > 0 ? 
                                            `${new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(minPrice)}` : 
                                            "Harga Tidak Tersedia")}
                                        <span className="text-[10px] font-medium text-slate-500 ml-1">/ Org</span>
                                    </p>
                                </div>
                            </div>

                            {/* Trip Timeline */}
                            <div className="flex flex-row items-center justify-between lg:justify-center gap-4 md:gap-8 flex-1 w-full lg:max-w-md mx-auto">
                                <div className="flex flex-col text-center min-w-[60px]">
                                    <p className="font-black text-xl md:text-2xl text-slate-800">{departureTime}</p>
                                    <p className="text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-widest">{origin}</p>
                                </div>
                                
                                <div className="flex flex-col items-center gap-1.5 flex-1 max-w-[120px] md:max-w-[150px]">
                                    <p className="text-[9px] md:text-[10px] font-bold text-slate-400 uppercase tracking-tighter text-center">{flight.duration}</p>
                                    <div className="flex items-center w-full relative">
                                        <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full border-2 border-orange-500 bg-white z-10" />
                                        <div className="flex-1 border-t-2 border-dashed border-orange-200" />
                                        <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-orange-500 z-10 shadow-lg shadow-orange-500/50" />
                                    </div>
                                    <p className="text-[9px] md:text-[10px] font-black text-orange-600/80 uppercase tracking-widest text-center truncate w-full">
                                        {(!flight.isTransit || (flight.detailTitle?.length ?? 0) <= 1) 
                                            ? t('tickets.direct') 
                                            : t('tickets.transit', { number: flight.detailTitle.length - 1 }).replace('%{number}', (flight.detailTitle.length - 1).toString())
                                        }
                                    </p>
                                </div>

                                <div className="flex flex-col text-center min-w-[60px]">
                                    <p className="font-black text-xl md:text-2xl text-slate-800">{arrivalTime}</p>
                                    <p className="text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-widest">{destination}</p>
                                </div>
                            </div>

                            {/* Action Button */}
                            <div className="w-full lg:w-auto">
                                <Button bgColor={"orange"} className="w-full md:w-auto min-w-[140px] px-8 h-12 md:h-14 rounded-2xl font-bold shadow-xl shadow-orange-500/30 text-lg" onClick={handleSelect(flight.searchId)}>
                                    {t('tickets.choose')}
                                </Button>
                            </div>
                        </div>

                        <AnimatePresence>
                            {extended && (
                                <motion.div 
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    className="overflow-hidden"
                                >
                                    <div className="bg-black/5 p-4 md:p-8 border-t border-black/5 rounded-2xl">
                                        <div className="flex flex-col w-full max-w-2xl mx-auto">
                                            {flight.detailTitle?.map((detail, index) => (
                                                <div key={index} className="flex flex-col">
                                                    <div className="grid grid-cols-[60px_30px_1fr] md:grid-cols-[100px_40px_1fr] gap-4 md:gap-6">
                                                        <div className="flex flex-col justify-between py-1 text-right">
                                                            <p className="text-base md:text-lg font-black text-slate-800 tracking-tight">{detail.depart}</p>
                                                            <p className="text-base md:text-lg font-black text-slate-800 tracking-tight">{detail.arrival}</p>
                                                        </div>

                                                        <div className="flex flex-col items-center">
                                                            <div className="w-3 md:w-3.5 h-3 md:h-3.5 rounded-full border-2 border-orange-500 bg-white z-10 shadow-md" />
                                                            <div className="flex-1 w-[2px] border-l-2 border-dashed border-orange-200 my-1" />
                                                            <div className="w-3 md:w-3.5 h-3 md:h-3.5 rounded-full bg-orange-500 z-10 shadow-md shadow-orange-500/50" />
                                                        </div>

                                                        <div className="flex flex-col justify-between py-1">
                                                            <div className="truncate">
                                                                <p className="text-base md:text-lg font-extrabold text-slate-800 tracking-tight truncate">{detail.originName}</p>
                                                                <p className="text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-widest leading-none">{detail.origin}</p>
                                                            </div>

                                                            <div className="my-4 md:my-6 bg-white/30 p-3 md:p-4 rounded-2xl border border-white/20 shadow-sm flex items-center gap-3 backdrop-blur-sm">
                                                                <div className="flex flex-col">
                                                                    <p className="text-xs md:text-sm font-black text-slate-700">{detail.flightName || flight.airlineName}</p>
                                                                    <div className="flex flex-wrap items-center gap-2 mt-1">
                                                                        <p className="text-[9px] md:text-[10px] font-bold text-slate-400 uppercase tracking-widest">{detail.flightCode}</p>
                                                                        <span className="hidden md:inline text-slate-300">•</span>
                                                                        <p className="text-[9px] md:text-[10px] font-medium text-slate-500 italic">Duration: {detail.durationDetail}</p>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div className="truncate">
                                                                <p className="text-base md:text-lg font-extrabold text-slate-800 tracking-tight truncate">{detail.destinationName}</p>
                                                                <p className="text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-widest leading-none">{detail.destination}</p>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {index < (flight.detailTitle?.length || 0) - 1 && (
                                                        <div className="grid grid-cols-[60px_30px_1fr] md:grid-cols-[100px_40px_1fr] gap-4 md:gap-6">
                                                            <div />
                                                            <div className="h-12 md:h-16 w-[2px] bg-orange-100 flex items-center justify-center ml-[13px] md:ml-[19px]">
                                                                <div className="w-1.5 h-3 md:h-4 rounded-full bg-orange-200" />
                                                            </div>
                                                            <div className="flex items-center py-2 md:py-4">
                                                                <span className="text-[9px] md:text-[10px] font-bold text-orange-400 uppercase tracking-tighter ml-2 md:ml-4">Layover in {detail.destinationName}</span>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </CardBody>
            </Card>
        </motion.div>
    )
}

export default FlightCard