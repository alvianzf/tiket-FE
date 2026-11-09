import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useQuery, useMutation } from "react-query";
import { FormProvider } from "react-hook-form";
import { toast } from "react-toastify";
import { MapPin } from "lucide-react";

import Button from "@components/ui/Button";
import TextField from "@components/ui/TextField";
import Dialog from "@components/ui/Dialog";
import { getHotels, bookHotel } from "@api/hotels";
import { Hotel } from "@api/hotels/types";
import useForm, { FormProps } from "./forms/useForm";

const HotelListContainer = () => {
    const { t } = useTranslation();
    const [bookingHotel, setBookingHotel] = useState<Hotel | null>(null);

    const { data, isLoading } = useQuery(["hotels"], getHotels);
    const hotels = data?.data || [];

    const methods = useForm();
    const { handleSubmit, formState: { errors }, watch, setValue, reset } = methods;

    const { mutate, isLoading: isSubmitting } = useMutation(
        (values: FormProps) => bookHotel(bookingHotel!.id, values),
        {
            onSuccess: () => {
                toast.success("Request received. Our concierge team will confirm availability and reach out.");
                setBookingHotel(null);
                reset();
            },
            onError: () => { toast.error("Something went wrong. Please try again."); },
        },
    );

    const openBooking = (hotel: Hotel) => {
        reset();
        setBookingHotel(hotel);
    };

    const onSubmit = handleSubmit((values) => mutate(values));

    return (
        <div className="relative max-w-[1200px] mx-auto px-4 sm:px-6 py-10">
            <div className="text-center mb-8">
                <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-800">Hotels &amp; Stays in Batam</h1>
                <p className="text-slate-600 mt-2">Handpicked stays for your Batam trip, confirmed by our concierge team.</p>
            </div>

            {isLoading && <p className="text-center text-slate-500">Loading hotels...</p>}
            {!isLoading && hotels.length === 0 && (
                <p className="text-center text-slate-500">No hotels available yet — check back soon.</p>
            )}

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {hotels.map((hotel) => (
                    <div key={hotel.id} className="surface-card p-5 flex flex-col gap-3">
                        {hotel.photos?.[0] && (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img src={hotel.photos[0]} alt={hotel.name} className="w-full h-36 object-cover rounded-ds-sm" />
                        )}
                        <div>
                            <p className="font-bold text-slate-800">{hotel.name}</p>
                            <div className="flex items-center gap-1 text-xs text-slate-500 mt-1">
                                <MapPin size={12} /> {hotel.location}
                            </div>
                        </div>
                        {hotel.description && <p className="text-sm text-slate-600 line-clamp-2">{hotel.description}</p>}
                        <div className="flex items-center justify-between mt-auto pt-2">
                            <span className="text-orange-600 font-bold">Rp {Number(hotel.pricePerNight).toLocaleString("id-ID")}/night</span>
                            <Button variant="cta" onClick={() => openBooking(hotel)}>
                                Request Stay
                            </Button>
                        </div>
                    </div>
                ))}
            </div>

            <Dialog open={!!bookingHotel} onClose={() => setBookingHotel(null)} title={`Request: ${bookingHotel?.name ?? ""}`}>
                <FormProvider {...methods}>
                    <form onSubmit={onSubmit} className="flex flex-col gap-3">
                        <TextField label={t("itinerary.fullname")} fullWidth value={watch("fullName")} onChange={(e) => setValue("fullName", e.target.value)} error={errors.fullName?.message} />
                        <TextField label={t("itinerary.phone")} fullWidth value={watch("phone")} onChange={(e) => setValue("phone", e.target.value)} error={errors.phone?.message} />
                        <TextField label={t("itinerary.email")} fullWidth value={watch("email")} onChange={(e) => setValue("email", e.target.value)} error={errors.email?.message} />
                        <div className="flex gap-3">
                            <TextField type="date" label="Check-in" fullWidth value={watch("checkIn")} onChange={(e) => setValue("checkIn", e.target.value)} error={errors.checkIn?.message} />
                            <TextField type="date" label="Check-out" fullWidth value={watch("checkOut")} onChange={(e) => setValue("checkOut", e.target.value)} error={errors.checkOut?.message} />
                        </div>
                        <TextField type="number" label="Guests" fullWidth value={watch("guests")} onChange={(e) => setValue("guests", Number(e.target.value))} error={errors.guests?.message} />
                        <Button type="submit" variant="cta" isLoading={isSubmitting} fullWidth className="mt-1">
                            Submit Request
                        </Button>
                    </form>
                </FormProvider>
            </Dialog>
        </div>
    );
};

export default HotelListContainer;
