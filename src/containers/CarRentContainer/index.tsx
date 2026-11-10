/* eslint-disable @typescript-eslint/no-explicit-any */
import CarCard from "@components/CarCard";
import CarCardSkeleton from "@components/CarCardSkeleton";
import { useState, useEffect } from "react";
import { searchCars } from "@api/carRental";
import { CarResult } from "@api/carRental/types";
import moment from "moment";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import HeroGlow from "@components/HeroGlow";
import Button from "@components/ui/Button";
import Combobox from "@components/ui/Combobox";
import DatePicker from "@components/ui/DatePicker";
import { Calendar, Car as CarIcon, Users, Search, Fuel, ShieldCheck, MessageCircle } from "lucide-react";

const fieldTileClass = "flex-1 min-w-0 bg-slate-50 rounded-xl p-3 border border-slate-100 focus-within:border-primary/50 focus-within:bg-white transition-colors";
const fieldLabelClass = "flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wide text-slate-400 mb-1";

const HOW_IT_WORKS = [
    { icon: Calendar, title: "Pick your date", desc: "Choose when you need the car and how many seats." },
    { icon: MessageCircle, title: "We confirm by WhatsApp", desc: "Our team reaches out to confirm availability and driver details." },
    { icon: CarIcon, title: "Driver meets you", desc: "Airport pickup or hotel pickup, driver + fuel included." },
];

const CAR_TYPES = [
    { code: "all", name: "All Types" },
    { code: "City Car", name: "City Car" },
    { code: "Sedan", name: "Sedan" },
    { code: "SUV", name: "SUV" },
    { code: "MPV", name: "MPV" },
    { code: "Minibus", name: "Minibus" },
    { code: "Pick-up", name: "Pick-up" },
    { code: "Double Cabin", name: "Double Cabin" },
    { code: "Van", name: "Van" },
];

const ROW_OPTIONS = [
    { code: "", name: "All" },
    { code: "2", name: "2 Rows" },
    { code: "3", name: "3 Rows" },
];

// Rebuilt from scratch to match the new shell: gradient hero (no stock
// photo) + decorative SVGs, a solid white search card. The search controls
// themselves are no longer MUI either — Combobox/DatePicker (see
// src/components/ui) replace the Select/DatePicker entirely.
const CarRentContainer = () => {
    const { t } = useTranslation();
    const [mounted, setMounted] = useState(false);
    const [date, setDate] = useState(moment().format("YYYY-MM-DD"));
    const [type, setType] = useState("all");
    const [rows, setRows] = useState("");
    const [cars, setCars] = useState<CarResult[]>([]);
    const [isSearched, setIsSearched] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const handleSearch = async () => {
        setIsLoading(true);
        try {
            const result = await searchCars({ date, type: type === "all" ? undefined : type, rows: rows ? Number(rows) : undefined });
            setCars(result.data);
            setIsSearched(true);
        } catch {
            toast.error("Failed to search available cars. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    if (!mounted) {
        return (
            <div className="flex flex-col gap-0 w-full items-center justify-center animate-pulse">
                <div className="w-full bg-gradient-to-br from-orange-600 via-orange-500 to-primary flex flex-col items-center justify-center py-16 px-4 gap-8">
                    <div className="h-10 w-48 bg-white/10 rounded-xl" />
                    <div className="surface-card p-6 md:p-8 w-full max-w-3xl h-24" />
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-0 w-full items-center justify-center">
            <section className="relative w-full bg-gradient-to-br from-orange-600 via-orange-500 to-primary pt-16 pb-32 px-4">
                <HeroGlow />
                <svg className="absolute top-10 right-[10%] w-20 h-20 text-white/15 hidden sm:block" viewBox="0 0 100 100" fill="none" aria-hidden="true">
                    <rect x="15" y="40" width="70" height="30" rx="8" stroke="currentColor" strokeWidth="2" />
                    <circle cx="30" cy="75" r="8" stroke="currentColor" strokeWidth="2" />
                    <circle cx="70" cy="75" r="8" stroke="currentColor" strokeWidth="2" />
                </svg>

                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
                    className="relative flex flex-col items-center gap-8 max-w-3xl mx-auto"
                >
                    <div className="flex flex-col items-center gap-3 text-center">
                        <span className="inline-block px-4 py-1.5 rounded-full bg-white/15 text-white text-xs font-bold tracking-wide uppercase">
                            {t("home.service_driver")}
                        </span>
                        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
                            Sewa Mobil di Batam
                        </h1>
                        <p className="text-white/80 text-base sm:text-lg max-w-xl">
                            Semua mobil kondisi top, bersih, dan nyaman. Lengkap dengan driver dan BBM. Siap antar jemput di seluruh Batam.
                        </p>
                    </div>

                    <div className="surface-card p-6 md:p-8 w-full">
                        <div className="flex flex-col md:flex-row gap-3 w-full">
                            <div className={fieldTileClass}>
                                <p className={fieldLabelClass}><Calendar size={12} /> Rental Date</p>
                                <DatePicker
                                    value={date}
                                    onChange={setDate}
                                    min={moment().format("YYYY-MM-DD")}
                                />
                            </div>

                            <div className={fieldTileClass}>
                                <p className={fieldLabelClass}><CarIcon size={12} /> Car Type</p>
                                <Combobox
                                    options={CAR_TYPES}
                                    value={type}
                                    onChange={setType}
                                />
                            </div>

                            <div className={fieldTileClass}>
                                <p className={fieldLabelClass}><Users size={12} /> Seat Rows</p>
                                <Combobox
                                    options={ROW_OPTIONS}
                                    value={rows}
                                    onChange={setRows}
                                />
                            </div>
                        </div>

                        <Button
                            variant="cta"
                            fullWidth
                            className="h-14 text-base mt-3"
                            onClick={handleSearch}
                            isLoading={isLoading}
                        >
                            <Search size={18} /> Cari Mobil
                        </Button>
                    </div>
                </motion.div>

                <svg className="absolute bottom-0 left-0 w-full h-16 text-[#f7f8fa]" viewBox="0 0 1440 80" preserveAspectRatio="none" aria-hidden="true">
                    <path fill="currentColor" d="M0 40 C 240 90, 480 0, 720 40 C 960 80, 1200 10, 1440 40 L1440 80 L0 80 Z" />
                </svg>
            </section>

            {/* How it works */}
            <div className="w-full max-w-[1280px] px-4 -mt-10 relative mb-4">
                <div className="grid sm:grid-cols-3 gap-4">
                    {HOW_IT_WORKS.map((step, i) => (
                        <motion.div
                            key={step.title}
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: i * 0.1 }}
                            className="surface-card p-5 flex items-start gap-3"
                        >
                            <div className="w-10 h-10 rounded-xl bg-orange-500/10 text-orange-600 flex items-center justify-center shrink-0">
                                <step.icon size={20} />
                            </div>
                            <div>
                                <p className="font-bold text-slate-800 text-sm">{i + 1}. {step.title}</p>
                                <p className="text-slate-500 text-xs mt-0.5">{step.desc}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
                <div className="flex items-center justify-center gap-6 mt-5 text-slate-500 text-xs font-semibold">
                    <span className="flex items-center gap-1.5"><Fuel size={14} className="text-primary" /> Fuel included</span>
                    <span className="flex items-center gap-1.5"><ShieldCheck size={14} className="text-primary" /> Verified drivers</span>
                </div>
            </div>

            {/* Results */}
            <div className="flex gap-4 w-full flex-row relative flex-wrap items-start max-w-[1280px] px-4 py-6">
                {isLoading && (
                    <>
                        <CarCardSkeleton />
                        <CarCardSkeleton />
                        <CarCardSkeleton />
                        <CarCardSkeleton />
                    </>
                )}
                {!isLoading && isSearched && cars.length === 0 && (
                    <div className="flex justify-center py-10 w-full">
                        <p className="text-slate-500">No cars found for your selection. Try different filters.</p>
                    </div>
                )}
                {!isLoading && !isSearched && (
                    <div className="flex justify-center py-10 w-full">
                        <p className="text-slate-400 text-center">Select your rental date and filters above, then click <strong>Cari Mobil</strong> to see available cars.</p>
                    </div>
                )}
                {!isLoading && cars.map((car) => (
                    <CarCard key={car.id} car={car} date={date} />
                ))}
            </div>
        </div>
    );
};

export default CarRentContainer;
