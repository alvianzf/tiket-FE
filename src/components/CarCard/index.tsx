import { useRouter } from "next/router";
import Image from "next/image";
import { CarResult } from "@api/carRental/types";
import { Users, GaugeCircle } from "lucide-react";
import Button from "@components/ui/Button";

interface Props {
    car: CarResult;
    date?: string;
}

const CarCard = ({ car, date }: Props) => {
    const { push } = useRouter();

    const priceValue = Number(car.pricePerDay);
    const formattedPrice = Number.isFinite(priceValue)
        ? new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            maximumFractionDigits: 0,
        }).format(priceValue)
        : "-";

    const primaryPhoto = car.photos?.find((p) => p.isPrimary) ?? car.photos?.[0];

    const handleRent = () => {
        push({
            pathname: '/car-rental/rent',
            query: { carId: car.id, date: date ?? '' }
        });
    };

    const handleViewDetails = () => {
        push({
            pathname: `/car-rental/${car.id}`,
            query: { date: date ?? '' }
        });
    };

    return (
        <div className="surface-card w-full hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
            <div className="p-4 flex flex-col gap-4">
                {/* Photo - still clickable for details */}
                <div
                    onClick={handleViewDetails}
                    className="relative w-full h-[160px] rounded-xl overflow-hidden bg-slate-100 flex items-center justify-center cursor-pointer group"
                >
                    {primaryPhoto ? (
                        <Image src={primaryPhoto.url} alt={car.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" unoptimized />
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-24 h-24 text-slate-300" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.85 7h10.29l1.08 3.11H5.77L6.85 7zM19 17H5v-5h14v5z"/>
                            <circle cx="7.5" cy="14.5" r="1.5"/>
                            <circle cx="16.5" cy="14.5" r="1.5"/>
                        </svg>
                    )}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                        <span className="bg-white px-3 py-1.5 rounded-full text-xs font-bold text-slate-800 opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0 duration-300 shadow-md">Lihat Detail</span>
                    </div>
                </div>

                {/* Info */}
                <div className="flex flex-col gap-3">
                    <div className="flex flex-col gap-1">
                        <p className="text-lg font-extrabold text-dark tracking-tight line-clamp-1">{car.name}</p>
                        <div className="flex items-center gap-3 text-slate-500 flex-wrap">
                            <span className="text-[11px] font-black uppercase tracking-wide text-primary bg-primary/10 px-2 py-0.5 rounded-full">{car.type}</span>
                            <span className="flex items-center gap-1 text-[11px] font-bold uppercase tracking-wide">
                                <Users size={12} /> {car.rows} Baris
                            </span>
                            <span className="flex items-center gap-1 text-[11px] font-bold uppercase tracking-wide">
                                <GaugeCircle size={12} /> {car.transmission}
                            </span>
                        </div>
                        <p className="text-lg text-cta font-black tracking-tight mt-1">{formattedPrice}<span className="text-xs font-semibold text-slate-400"> / {car.pricingDuration || 'Hari'}</span></p>
                    </div>

                    {/* Buttons Group */}
                    <div className="flex flex-col gap-2 mt-1">
                        <Button variant="cta" fullWidth className="h-11" onClick={handleRent}>
                            Sewa Sekarang
                        </Button>
                        <Button variant="ghost" fullWidth className="h-10 border border-slate-200" onClick={handleViewDetails}>
                            Lihat Detail
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CarCard;
