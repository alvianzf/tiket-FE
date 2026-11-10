import { useRouter } from "next/router";
import { useTranslation } from "react-i18next"
import { FerryTrip } from "@interfaces/travel";
import { motion } from "framer-motion";
import { Ship, Clock, Users, ArrowRight, ShieldCheck } from "lucide-react";
import Button from "@components/ui/Button";

interface Props {
    trip: FerryTrip;
    embarkation: string;
    destination: string;
    tripdate: string;
    passengerCount?: number;
    onSelect?: (trip: FerryTrip) => void;
}

const FerryCard = ({ trip, embarkation, destination, tripdate, passengerCount = 1, onSelect }: Props) => {
    const { t } = useTranslation();
    const { push } = useRouter();

    const totalPrice = (trip.price ?? 0) * passengerCount;

    const formattedPrice = new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: trip.currency || "IDR",
        maximumFractionDigits: 0,
    }).format(totalPrice);

    const handleOrder = () => {
        if (onSelect) {
            onSelect(trip);
            return;
        }
        push({
            pathname: '/ferry/passenger',
            query: {
                tripID: trip.tripID,
                embarkation,
                destination,
                tripdate,
                vesselName: trip.vesselName,
                price: totalPrice,
                adult: passengerCount,
            }
        });
    };

    const lowSeats = typeof trip.availableSeats === "number" && trip.availableSeats > 0 && trip.availableSeats <= 10;

    return (
        <motion.div
            variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 }
            }}
            whileHover={{ y: -4 }}
            className="w-full"
        >
            <div className="surface-card w-full overflow-hidden transition-shadow hover:shadow-lg">
                <div className="flex flex-col md:flex-row">
                    {/* Vessel + route */}
                    <div className="flex-1 flex flex-col gap-5 p-5 md:p-7">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-2xl bg-secondary/10 flex items-center justify-center shrink-0">
                                <Ship size={22} className="text-secondary-dark" strokeWidth={2.5} />
                            </div>
                            <div className="min-w-0">
                                <p className="text-[11px] font-black uppercase tracking-[0.15em] text-slate-400">{t('tickets.ferry_name', 'Vessel Name')}</p>
                                <h3 className="text-base md:text-lg font-extrabold text-dark tracking-tight truncate">{trip.vesselName}</h3>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 md:gap-6 w-full">
                            <div className="flex flex-col shrink-0">
                                <span className="text-xl md:text-2xl font-black text-dark tracking-tighter">{embarkation}</span>
                                <div className="flex items-center gap-1.5 text-slate-500 mt-0.5">
                                    <Clock size={12} />
                                    <span className="text-xs font-bold">{trip.departureTime}</span>
                                </div>
                            </div>

                            <div className="flex-1 flex flex-col items-center gap-1 min-w-0">
                                <div className="w-full h-1 bg-secondary/10 rounded-full relative overflow-hidden">
                                    <motion.div
                                        initial={{ x: "-100%" }}
                                        animate={{ x: "100%" }}
                                        transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
                                        className="absolute inset-0 w-1/3 bg-gradient-to-r from-transparent via-secondary-dark to-transparent opacity-60"
                                    />
                                </div>
                                <ArrowRight size={14} className="text-secondary" />
                            </div>

                            <div className="flex flex-col text-right shrink-0">
                                <span className="text-xl md:text-2xl font-black text-dark tracking-tighter">{destination}</span>
                                <div className="flex items-center gap-1.5 text-slate-500 mt-0.5 justify-end">
                                    <Clock size={12} />
                                    <span className="text-xs font-bold">{trip.arrivalTime}</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-2">
                            <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full w-fit ${lowSeats ? "bg-cta/10" : "bg-slate-100"}`}>
                                <Users size={12} className={lowSeats ? "text-cta" : "text-slate-400"} />
                                <span className={`text-[11px] font-black uppercase tracking-wide leading-none ${lowSeats ? "text-cta" : "text-slate-600"}`}>
                                    {t('tickets.seats_available', { count: trip.availableSeats })}
                                </span>
                            </div>
                            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 w-fit">
                                <ShieldCheck size={12} className="text-emerald-600" />
                                <span className="text-[11px] font-black text-emerald-700 uppercase tracking-wide leading-none">
                                    {t('tickets.border_crossing_ready', 'Immigration-Ready Crossing')}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Pricing + CTA */}
                    <div className="flex flex-row md:flex-col items-center justify-between md:items-end gap-4 p-5 md:p-7 md:w-[220px] md:border-l border-slate-100 bg-slate-50/60 md:bg-transparent">
                        <div className="text-left md:text-right">
                            <span className="text-[11px] font-black uppercase tracking-[0.15em] text-slate-400 mb-1 block">
                                {t('tickets.price', 'Total Price')} &middot; {t('tickets.passenger', { count: passengerCount })}
                            </span>
                            <span className="text-2xl md:text-3xl font-black text-cta tracking-tighter">{formattedPrice}</span>
                        </div>

                        <Button
                            variant="cta"
                            className="h-12 md:h-14 px-8 text-base w-auto md:w-full"
                            onClick={handleOrder}
                        >
                            {t('tickets.order')}
                        </Button>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}

export default FerryCard
