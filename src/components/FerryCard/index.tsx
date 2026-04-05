import { Button, Card, CardBody } from "@nextui-org/react"
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next"
import { FerryTrip } from "@interfaces/travel";
import { motion } from "framer-motion";
import { Ship, Clock, Users, ArrowRight } from "lucide-react";

interface Props {
    trip: FerryTrip;
    embarkation: string;
    destination: string;
    tripdate: string;
}

const FerryCard = ({ trip, embarkation, destination, tripdate }: Props) => {
    const { t } = useTranslation();
    const { push } = useRouter();

    const formattedPrice = new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: trip.currency || "IDR",
        maximumFractionDigits: 0,
    }).format(trip.price ?? 0);

    const handleOrder = () => {
        push({
            pathname: '/ferry/passenger',
            query: {
                tripID: trip.tripID,
                embarkation,
                destination,
                tripdate,
                vesselName: trip.vesselName,
                price: trip.price,
            }
        });
    };

    return (
        <motion.div
            variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 }
            }}
            whileHover={{ y: -4 }}
            className="w-full"
        >
            <Card className="w-full glass-card border-none bg-white/10 backdrop-blur-2xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden rounded-[32px]">
                <CardBody className="p-8">
                    <div className="flex flex-col md:flex-row items-center gap-10">
                        {/* Icon Side */}
                        <div className="flex-shrink-0">
                            <div className="w-20 h-20 rounded-3xl bg-orange-500/10 flex items-center justify-center shadow-inner">
                                <Ship size={36} className="text-[#ff5a00]" strokeWidth={2.5} />
                            </div>
                        </div>

                        {/* Info Side */}
                        <div className="flex-grow flex flex-col gap-6">
                            <div className="space-y-1">
                                <span className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">{t('tickets.ferry_name', 'Vessel Name')}</span>
                                <h3 className="text-xl font-extrabold text-slate-800 tracking-tight">{trip.vesselName}</h3>
                            </div>

                            <div className="flex flex-row items-center gap-8 w-full">
                                <div className="flex flex-col">
                                    <span className="text-2xl font-black text-slate-800 tracking-tighter">{embarkation}</span>
                                    <div className="flex items-center gap-2 text-slate-500 mt-1">
                                        <Clock size={14} />
                                        <span className="text-sm font-bold">{trip.departureTime}</span>
                                    </div>
                                </div>

                                <div className="flex-grow flex flex-col items-center gap-1">
                                    <div className="w-full h-1 bg-orange-500/10 rounded-full relative overflow-hidden">
                                        <motion.div 
                                            initial={{ x: "-100%" }}
                                            animate={{ x: "100%" }}
                                            transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
                                            className="absolute inset-0 w-1/3 bg-gradient-to-r from-transparent via-[#ff5a00] to-transparent opacity-50"
                                        />
                                    </div>
                                    <ArrowRight size={16} className="text-orange-300" />
                                </div>

                                <div className="flex flex-col text-right">
                                    <span className="text-2xl font-black text-slate-800 tracking-tighter">{destination}</span>
                                    <div className="flex items-center gap-2 text-slate-500 mt-1 justify-end">
                                        <Clock size={14} />
                                        <span className="text-sm font-bold">{trip.arrivalTime}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full w-fit backdrop-blur-sm border border-white/10">
                                <Users size={14} className="text-slate-400" />
                                <span className="text-xs font-black text-slate-600 uppercase tracking-widest leading-none">
                                    {trip.availableSeats} {t('tickets.seats_available')}
                                </span>
                            </div>
                        </div>

                        {/* Pricing Side */}
                        <div className="flex-shrink-0 flex flex-col items-center md:items-end gap-6 md:pl-10 md:border-l border-white/10">
                            <div className="text-center md:text-right">
                                <span className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 mb-1 block">{t('tickets.price', 'Total Price')}</span>
                                <span className="text-3xl font-black text-[#ff5a00] tracking-tighter">{formattedPrice}</span>
                            </div>
                            
                            <Button 
                                className="button-orange h-14 px-10 text-lg font-bold shadow-xl shadow-orange-500/40 rounded-2xl w-full md:w-auto" 
                                onClick={handleOrder}
                            >
                                {t('tickets.order')}
                            </Button>
                        </div>
                    </div>
                </CardBody>
            </Card>
        </motion.div>
    )
}

export default FerryCard