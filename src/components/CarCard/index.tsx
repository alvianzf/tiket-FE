import { Button, Card, CardBody } from "@nextui-org/react";
import { useRouter } from "next/router";
import Image from "next/image";
import { CarResult } from "@api/carRental/types";

interface Props {
    car: CarResult;
    date?: string;
}

const CarCard = ({ car, date }: Props) => {
    const { push } = useRouter();

    const formattedPrice = new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        maximumFractionDigits: 0,
    }).format(Number(car.pricePerDay));

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
        <Card 
            className="w-[calc(25%-12px)] mb-5 glass-card border border-white/20 bg-white/30 backdrop-blur-xl shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300" 
        >
            <CardBody>
                <div className="flex flex-col gap-4">
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
                            <span className="bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-bold text-slate-800 opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0 duration-300">Lihat Detail</span>
                        </div>
                    </div>

                    {/* Info */}
                    <div className="flex flex-col gap-3">
                        <div className="flex flex-col gap-0.5">
                            <p className="text-xl font-bold text-slate-800 line-clamp-1">{car.name}</p>
                            <p className="text-[11px] text-slate-500 uppercase tracking-wider font-bold">{car.type} · {car.rows} Baris · {car.transmission}</p>
                            <p className="text-lg text-orange-600 font-black mt-1">{formattedPrice}<span className="text-xs font-normal text-slate-400"> / hari</span></p>
                        </div>

                        {/* Buttons Group */}
                        <div className="flex flex-col gap-2 mt-1">
                            <Button
                                className="bg-orange-600 text-white w-full font-bold h-11 shadow-[0_5px_15px_rgba(234,88,12,0.2)] hover:bg-orange-700 hover:-translate-y-0.5 active:translate-y-0 transition-all"
                                onPress={handleRent}
                            >
                                Sewa Sekarang
                            </Button>
                            <Button
                                variant="light"
                                className="w-full font-bold h-10 text-slate-600 border border-slate-200"
                                onPress={handleViewDetails}
                            >
                                Lihat Detail
                            </Button>
                        </div>
                    </div>
                </div>
            </CardBody>
        </Card>
    );
};

export default CarCard;