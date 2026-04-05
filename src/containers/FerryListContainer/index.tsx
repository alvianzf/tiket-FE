import FerryCard from "@components/FerryCard";
import { Spinner } from "@nextui-org/react";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/router";
import { useQuerySearchFerryTrips } from "@queries/ferry";
import { motion } from "framer-motion";
import { Ship, User, CreditCard } from "lucide-react";

const FerryListContainer = () => {

    const { t } = useTranslation();
    const { query } = useRouter();

    const embarkation = query?.embarkation as string ?? '';
    const destination = query?.destination as string ?? '';
    const tripdate = query?.tripdate as string ?? '';

    const { data: trips, isFetching, isError } = useQuerySearchFerryTrips(
        { embarkation, destination, tripdate },
        { enabled: !!embarkation && !!destination && !!tripdate }
    );

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const tripList: any[] = (trips as any)?.data ?? [];

    const steps = [
        { id: 1, label: t('tickets.select_schedule'), icon: Ship, active: true },
        { id: 2, label: t('tickets.ordering_details'), icon: User, active: false },
        { id: 3, label: t('tickets.payment'), icon: CreditCard, active: false },
    ];

    return (
        <div className="flex flex-col gap-12 w-full items-center justify-center py-12 px-4">
            {/* Stepper */}
            <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-4xl glass-card border-none bg-white/10 backdrop-blur-3xl p-8 rounded-3xl shadow-xl border border-white/10"
            >
                <div className="flex justify-between items-center relative">
                    {/* Background Line */}
                    <div className="absolute top-1/2 left-0 w-full h-0.5 bg-slate-200/30 -translate-y-1/2 z-0 hidden md:block"></div>
                    
                    {steps.map((step) => (
                        <div key={step.id} className="relative z-10 flex flex-col items-center gap-3">
                            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500 shadow-lg ${
                                step.active 
                                ? "bg-[#ff5a00] text-white shadow-orange-500/40 border-4 border-white/20" 
                                : "bg-white/20 text-slate-400 backdrop-blur-md"
                            }`}>
                                <step.icon size={24} strokeWidth={2.5} />
                            </div>
                            <span className={`text-xs font-black uppercase tracking-[0.1em] text-center max-w-[100px] ${
                                step.active ? "text-slate-800" : "text-slate-400"
                            }`}>
                                {step.label}
                            </span>
                        </div>
                    ))}
                </div>
            </motion.div>

            <div className="flex gap-4 w-full flex-col relative flex-nowrap items-center max-w-[1280px]">
                {isFetching && (
                    <div className="flex flex-col items-center justify-center py-32 gap-4">
                        <Spinner size="lg" color="warning" />
                        <p className="text-slate-400 font-bold animate-pulse uppercase tracking-widest text-xs">Finding your trips...</p>
                    </div>
                )}
                
                {isError && (
                    <div className="glass-card bg-red-50/10 border-red-500/20 p-8 rounded-3xl w-full max-w-md text-center">
                        <p className="text-red-500 font-bold">{t('tickets.error_loading_trips')}</p>
                    </div>
                )}
                
                {!isFetching && !isError && tripList.length === 0 && (
                    <div className="glass-card bg-white/5 backdrop-blur-xl p-16 rounded-[40px] w-full text-center border-none shadow-2xl">
                         <div className="bg-orange-500/10 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Ship size={48} className="text-[#ff5a00]" />
                         </div>
                         <h3 className="text-2xl font-black text-slate-800 mb-2">No Ferry Scheduled</h3>
                         <p className="text-slate-500 font-medium">{t('tickets.no_trips_found')}</p>
                    </div>
                )}

                <motion.div 
                    initial="hidden"
                    animate="visible"
                    variants={{
                        visible: { transition: { staggerChildren: 0.1 } }
                    }}
                    className="w-full flex flex-col gap-6"
                >
                    {!isFetching && tripList.map((trip) => (
                        <FerryCard
                            key={trip.tripID}
                            trip={trip}
                            embarkation={embarkation}
                            destination={destination}
                            tripdate={tripdate}
                        />
                    ))}
                </motion.div>
            </div>
        </div>
    )
}

export default FerryListContainer