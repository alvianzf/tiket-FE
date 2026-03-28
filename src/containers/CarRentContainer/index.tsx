/* eslint-disable @typescript-eslint/no-explicit-any */
import CarCard from "@components/CarCard";
import { Button, DatePicker, Select, SelectItem, Spinner } from "@nextui-org/react";
import { useState } from "react";
import { searchCars } from "@api/carRental";
import { CarResult } from "@api/carRental/types";
import { parseDate, getLocalTimeZone, today } from "@internationalized/date";
import moment from "moment";
import { toast } from "react-toastify";

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

const CarRentContainer = () => {
    const [date, setDate] = useState(moment().format("YYYY-MM-DD"));
    const [type, setType] = useState("all");
    const [rows, setRows] = useState("");
    const [cars, setCars] = useState<CarResult[]>([]);
    const [isSearched, setIsSearched] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

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

    return (
        <div className="flex flex-col gap-0 w-full items-center justify-center">
            {/* Hero / Search Section */}
            <div className="w-full home-app flex flex-col items-center justify-center py-16 px-4 gap-8">
                <div className="flex flex-col items-center gap-3 text-center">
                    <h1 className="text-4xl font-extrabold text-white drop-shadow-lg">
                        Sewa Mobil di Batam
                    </h1>
                    <p className="text-white/80 text-lg max-w-xl">
                        Semua mobil kondisi top, bersih, dan nyaman. Lengkap dengan driver dan BBM. Siap antar jemput di seluruh Batam.
                    </p>
                </div>

                {/* Glassmorphism search card */}
                <div className="glass-card p-8 rounded-2xl shadow-2xl backdrop-blur-xl border border-white/10 bg-white/5 w-full max-w-3xl">
                    <div className="flex flex-wrap gap-4 items-end">
                        {/* Date */}
                        <div className="flex flex-col gap-1 flex-1 min-w-[160px]">
                            <p className="text-white/80 text-sm font-medium">Rental Date</p>
                            <DatePicker
                                aria-label="Rental Date"
                                variant="underlined"
                                minValue={today(getLocalTimeZone())}
                                value={parseDate(date)}
                                onChange={(val) => { if (val) setDate(moment(val.toString()).format("YYYY-MM-DD")); }}
                                classNames={{ input: "text-white", label: "text-white/80", innerWrapper: "text-white/80" }}
                            />
                        </div>

                        {/* Type */}
                        <div className="flex flex-col gap-1 flex-1 min-w-[160px]">
                            <p className="text-white/80 text-sm font-medium">Car Type</p>
                            <Select
                                aria-label="Car Type"
                                variant="underlined"
                                selectedKeys={[type]}
                                onSelectionChange={(keys) => setType(Array.from(keys)[0] as string)}
                                classNames={{ value: "text-white", trigger: "text-white/80" }}
                            >
                                {CAR_TYPES.map((t) => (
                                    <SelectItem key={t.key}>{t.label}</SelectItem>
                                ))}
                            </Select>
                        </div>

                        {/* Rows */}
                        <div className="flex flex-col gap-1 flex-1 min-w-[120px]">
                            <p className="text-white/80 text-sm font-medium">Seat Rows</p>
                            <Select
                                aria-label="Seat Rows"
                                variant="underlined"
                                selectedKeys={[rows]}
                                onSelectionChange={(keys) => setRows(Array.from(keys)[0] as string)}
                                classNames={{ value: "text-white", trigger: "text-white/80" }}
                            >
                                {ROW_OPTIONS.map((r) => (
                                    <SelectItem key={r.key}>{r.label}</SelectItem>
                                ))}
                            </Select>
                        </div>

                        <Button
                            className="button-orange h-[48px] px-8 font-bold shadow-lg shadow-orange-500/30 rounded-xl"
                            onPress={handleSearch}
                            isLoading={isLoading}
                        >
                            Cari Mobil
                        </Button>
                    </div>
                </div>
            </div>

            {/* Results */}
            <div className="flex gap-4 w-full flex-row relative flex-wrap items-start max-w-[1280px] px-4 py-10 -mt-4">
                {isLoading && (
                    <div className="flex justify-center py-20 w-full">
                        <Spinner size="lg" color="warning" />
                    </div>
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