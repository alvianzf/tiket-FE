/* eslint-disable @typescript-eslint/no-explicit-any */
import CarRentalForm from "@components/CarRentalForm";
import { Spinner } from "@nextui-org/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { searchCars } from "@api/carRental";
import { CarResult } from "@api/carRental/types";
import { toast } from "react-toastify";

const CarRentalFormContainer = () => {
    const { query } = useRouter();
    const carId = query?.carId as string;
    const date = query?.date as string ?? '';

    const [car, setCar] = useState<CarResult | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!carId) return;
        // Fetch all available cars and find the one matching carId
        searchCars({ date })
            .then((res) => {
                const found = res.data.find((c: any) => String(c.id) === String(carId));
                if (found) setCar(found);
                else toast.error("Car not found. Please go back and select again.");
            })
            .catch(() => toast.error("Failed to load car details."))
            .finally(() => setIsLoading(false));
    }, [carId, date]);

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-[400px]">
                <Spinner size="lg" color="warning" />
            </div>
        );
    }

    if (!car) {
        return (
            <div className="flex justify-center items-center min-h-[400px]">
                <p className="text-slate-500">Car not found. Please go back and select a car.</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-0 w-full items-center">
            <div className="w-full home-app flex items-center justify-center py-10 px-4">
                <div className="flex flex-col items-center gap-2 text-center">
                    <h1 className="text-3xl font-extrabold text-white drop-shadow-lg">Rental Form</h1>
                    <p className="text-white/80">Fill in your details to complete the rental request.</p>
                </div>
            </div>
            <CarRentalForm car={car} date={date} />
        </div>
    );
};

export default CarRentalFormContainer;
