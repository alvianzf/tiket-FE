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
                    <div className="flex flex-col gap-8 p-6">
                        <div className="flex flex-row flex-wrap justify-between gap-5 items-center">
                            <div className="w-[35%] lg:w-[15%] md:w-[15%]">
                                <Image as={NextImage} src={flight.airlineIcon} alt={flight.airlineCode} width={80} height={80} className="brightness-110"/>
                            </div>

                            <div className="flex flex-col gap-1 w-[55%] lg:w-[25%] md:w-[25%]">
                                <p className="text-xl font-extrabold text-slate-800 tracking-tight">{flight.airlineName}</p>
                                <p className="text-2xl text-[#ff5a00] font-black tracking-tighter">
                                    {!isMounted ? "" : (minPrice !== null && Number.isFinite(minPrice) && minPrice > 0 ? 
                                        `${new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(minPrice)}` : 
                                        "Harga Tidak Tersedia")}
                                    <span className="text-xs font-medium text-slate-500 ml-1">/ Org</span>
                                </p>
                            </div>

                            <div className="flex flex-row gap-8 items-center justify-center w-full lg:w-[35%] md:w-[35%]">
                                <div className="flex flex-col text-center">
                                    <p className="font-black text-2xl text-slate-800">{departureTime}</p>
                                    <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">{origin}</p>
                                </div>
                                
                                <div className="flex flex-col items-center gap-1.5 flex-1 max-w-[150px]">
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">{flight.duration}</p>
                                    <div className="flex items-center w-full relative">
                                        <div className="w-2 h-2 rounded-full border-2 border-orange-500 bg-white z-10" />
                                        <div className="flex-1 border-t-2 border-dashed border-orange-200" />
                                        <div className="w-2 h-2 rounded-full bg-orange-500 z-10 shadow-lg shadow-orange-500/50" />
                                    </div>
                                    <p className="text-[10px] font-black text-orange-600/80 uppercase tracking-widest">
                                        {(!flight.isTransit || (flight.detailTitle?.length ?? 0) <= 1) 
                                            ? t('tickets.direct') 
                                            : t('tickets.transit', { number: flight.detailTitle.length - 1 }).replace('%{number}', (flight.detailTitle.length - 1).toString())
                                        }
                                    </p>
                                </div>

                                <div className="flex flex-col text-center">
                                    <p className="font-black text-2xl text-slate-800">{arrivalTime}</p>
                                    <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">{destination}</p>
                                </div>
                            </div>

                            <Button bgColor={"orange"} className="w-full md:w-auto px-10 h-14 rounded-2xl font-bold shadow-xl shadow-orange-500/30" onClick={handleSelect(flight.searchId)}>
                                {t('tickets.choose')}
                            </Button>
                        </div>

                        <AnimatePresence>
                            {extended && (
                                <motion.div 
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    className="overflow-hidden"
                                >
                                    <div className="bg-white/5 p-8 border-t border-white/10 rounded-2xl backdrop-blur-md">
                                        <div className="flex flex-col w-full max-w-2xl mx-auto">
                                            {flight.detailTitle?.map((detail, index) => (
                                                <div key={index} className="flex flex-col">
                                                    <div className="grid grid-cols-[100px_40px_1fr] gap-6">
                                                        <div className="flex flex-col justify-between py-1 text-right">
                                                            <p className="text-lg font-black text-slate-800 tracking-tight">{detail.depart}</p>
                                                            <p className="text-lg font-black text-slate-800 tracking-tight">{detail.arrival}</p>
                                                        </div>

                                                        <div className="flex flex-col items-center">
                                                            <div className="w-3.5 h-3.5 rounded-full border-2 border-orange-500 bg-white z-10 shadow-md" />
                                                            <div className="flex-1 w-[2px] border-l-2 border-dashed border-orange-200 my-1" />
                                                            <div className="w-3.5 h-3.5 rounded-full bg-orange-500 z-10 shadow-md shadow-orange-500/50" />
                                                        </div>

                                                        <div className="flex flex-col justify-between py-1">
                                                            <div>
                                                                <p className="text-lg font-extrabold text-slate-800 tracking-tight">{detail.originName}</p>
                                                                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest leading-none">{detail.origin}</p>
                                                            </div>

                                                            <div className="my-6 bg-white/30 p-4 rounded-2xl border border-white/20 shadow-sm flex items-center gap-4 backdrop-blur-sm">
                                                                <div className="flex flex-col">
                                                                    <p className="text-sm font-black text-slate-700">{detail.flightName || flight.airlineName}</p>
                                                                    <div className="flex items-center gap-2 mt-1">
                                                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{detail.flightCode}</p>
                                                                        <span className="text-slate-300">•</span>
                                                                        <p className="text-[10px] font-medium text-slate-500 italic">Duration: {detail.durationDetail}</p>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div>
                                                                <p className="text-lg font-extrabold text-slate-800 tracking-tight">{detail.destinationName}</p>
                                                                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest leading-none">{detail.destination}</p>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {index < (flight.detailTitle?.length || 0) - 1 && (
                                                        <div className="grid grid-cols-[100px_40px_1fr] gap-6">
                                                            <div />
                                                            <div className="h-16 w-[2px] bg-orange-100 flex items-center justify-center ml-[19px]">
                                                                <div className="w-1.5 h-4 rounded-full bg-orange-200" />
                                                            </div>
                                                            <div className="flex items-center py-4">
                                                                <span className="text-[10px] font-bold text-orange-400 uppercase tracking-tighter ml-4">Layover in {detail.destinationName}</span>
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