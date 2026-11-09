/* eslint-disable @typescript-eslint/no-explicit-any */
import CarCard from "@components/CarCard";
import CarCardSkeleton from "@components/CarCardSkeleton";
import { Button, CircularProgress, MenuItem, TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { useState, useEffect } from "react";
import { searchCars } from "@api/carRental";
import { CarResult } from "@api/carRental/types";
import moment from "moment";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const CAR_TYPES = [
    { key: "all", label: "All Types" },
    { key: "City Car", label: "City Car" },
    { key: "Sedan", label: "Sedan" },
    { key: "SUV", label: "SUV" },
    { key: "MPV", label: "MPV" },
    { key: "Minibus", label: "Minibus" },
    { key: "Pick-up", label: "Pick-up" },
    { key: "Double Cabin", label: "Double Cabin" },
    { key: "Van", label: "Van" },
];

const ROW_OPTIONS = [
    { key: "", label: "All" },
    { key: "2", label: "2 Rows" },
    { key: "3", label: "3 Rows" },
];

// Rebuilt from scratch to match the new shell: gradient hero (no stock
// photo) + decorative SVGs, a solid white search card (the old frosted
// dark-glass card + white text was designed for a photo background that no
// longer exists here). The search form fields themselves (MUI DatePicker/
// Select) are left as-is — that's the deep-forms migration, deferred.
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
            <section className="relative overflow-hidden w-full bg-gradient-to-br from-orange-600 via-orange-500 to-primary pt-16 pb-32 px-4">
                <svg className="absolute top-10 right-[10%] w-20 h-20 text-white/15 hidden sm:block" viewBox="0 0 100 100" fill="none" aria-hidden="true">
                    <rect x="15" y="40" width="70" height="30" rx="8" stroke="currentColor" strokeWidth="2" />
                    <circle cx="30" cy="75" r="8" stroke="currentColor" strokeWidth="2" />
                    <circle cx="70" cy="75" r="8" stroke="currentColor" strokeWidth="2" />
                </svg>

                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
                    className="relative z-10 flex flex-col items-center gap-8 max-w-3xl mx-auto"
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
                        <div className="flex flex-col md:flex-row gap-6 items-end w-full">
                            <div className="flex flex-col gap-1 w-full md:flex-1">
                                <p className="text-slate-600 text-sm font-medium">Rental Date</p>
                                <DatePicker
                                    minDate={moment().startOf("day")}
                                    value={moment(date, "YYYY-MM-DD")}
                                    onChange={(val) => { if (val) setDate(val.format("YYYY-MM-DD")); }}
                                    slotProps={{
                                        textField: {
                                            variant: "standard",
                                            fullWidth: true,
                                            slotProps: { htmlInput: { "aria-label": "Rental Date" } },
                                        },
                                    }}
                                />
                            </div>

                            <div className="flex flex-col gap-1 w-full md:flex-1">
                                <p className="text-slate-600 text-sm font-medium">Car Type</p>
                                <TextField
                                    select
                                    variant="standard"
                                    fullWidth
                                    slotProps={{ htmlInput: { "aria-label": "Car Type" } }}
                                    value={type}
                                    onChange={(e) => setType(e.target.value)}
                                >
                                    {CAR_TYPES.map((ct) => (
                                        <MenuItem key={ct.key} value={ct.key}>{ct.label}</MenuItem>
                                    ))}
                                </TextField>
                            </div>

                            <div className="flex flex-col gap-1 w-full md:flex-1">
                                <p className="text-slate-600 text-sm font-medium">Seat Rows</p>
                                <TextField
                                    select
                                    variant="standard"
                                    fullWidth
                                    slotProps={{ htmlInput: { "aria-label": "Seat Rows" } }}
                                    value={rows}
                                    onChange={(e) => setRows(e.target.value)}
                                >
                                    {ROW_OPTIONS.map((r) => (
                                        <MenuItem key={r.key} value={r.key}>{r.label}</MenuItem>
                                    ))}
                                </TextField>
                            </div>

                            <Button
                                variant="contained"
                                color="warning"
                                className="w-full md:w-auto"
                                sx={{ height: 48, borderRadius: "10px", px: { md: 4 } }}
                                onClick={handleSearch}
                                disabled={isLoading}
                                startIcon={isLoading ? <CircularProgress size={16} color="inherit" /> : undefined}
                            >
                                Cari Mobil
                            </Button>
                        </div>
                    </div>
                </motion.div>

                <svg className="absolute bottom-0 left-0 w-full h-16 text-[#f7f8fa]" viewBox="0 0 1440 80" preserveAspectRatio="none" aria-hidden="true">
                    <path fill="currentColor" d="M0 40 C 240 90, 480 0, 720 40 C 960 80, 1200 10, 1440 40 L1440 80 L0 80 Z" />
                </svg>
            </section>

            {/* Results */}
            <div className="flex gap-4 w-full flex-row relative flex-wrap items-start max-w-[1280px] px-4 py-10 -mt-10">
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
