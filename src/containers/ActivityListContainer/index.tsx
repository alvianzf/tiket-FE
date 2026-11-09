import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useQuery, useMutation } from "react-query";
import { Button, Dialog, DialogTitle, DialogContent, TextField, CircularProgress, Chip } from "@mui/material";
import { FormProvider } from "react-hook-form";
import { toast } from "react-toastify";
import { Clock } from "lucide-react";

import { getActivities, bookActivity } from "@api/activities";
import { Activity } from "@api/activities/types";
import useForm, { FormProps } from "./forms/useForm";

const ActivityListContainer = () => {
    const { t } = useTranslation();
    const [bookingActivity, setBookingActivity] = useState<Activity | null>(null);

    const { data, isLoading } = useQuery(["activities"], getActivities);
    const activities = data?.data || [];

    const methods = useForm();
    const { handleSubmit, formState: { errors }, watch, setValue, reset } = methods;

    const { mutate, isLoading: isSubmitting } = useMutation(
        (values: FormProps) => bookActivity(bookingActivity!.id, values),
        {
            onSuccess: () => {
                toast.success("Request received. Our concierge team will confirm availability and reach out.");
                setBookingActivity(null);
                reset();
            },
            onError: () => { toast.error("Something went wrong. Please try again."); },
        },
    );

    const openBooking = (activity: Activity) => {
        reset();
        setBookingActivity(activity);
    };

    const onSubmit = handleSubmit((values) => mutate(values));

    return (
        <div className="relative max-w-[1200px] mx-auto px-4 sm:px-6 py-10">
            <div className="text-center mb-8">
                <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-800">Batam Activities &amp; Tours</h1>
                <p className="text-slate-600 mt-2">Golf, diving, island hopping, and more — confirmed by our concierge team.</p>
            </div>

            {isLoading && <p className="text-center text-slate-500">Loading activities...</p>}
            {!isLoading && activities.length === 0 && (
                <p className="text-center text-slate-500">No activities available yet — check back soon.</p>
            )}

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {activities.map((activity) => (
                    <div key={activity.id} className="glass-card p-5 flex flex-col gap-3">
                        {activity.photos?.[0] && (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img src={activity.photos[0]} alt={activity.name} className="w-full h-36 object-cover rounded-ds-sm" />
                        )}
                        <div>
                            <div className="flex items-center justify-between">
                                <p className="font-bold text-slate-800">{activity.name}</p>
                                <Chip label={activity.category} size="small" />
                            </div>
                            {activity.duration && (
                                <div className="flex items-center gap-1 text-xs text-slate-500 mt-1">
                                    <Clock size={12} /> {activity.duration}
                                </div>
                            )}
                        </div>
                        {activity.description && <p className="text-sm text-slate-600 line-clamp-2">{activity.description}</p>}
                        <div className="flex items-center justify-between mt-auto pt-2">
                            <span className="text-orange-600 font-bold">Rp {Number(activity.price).toLocaleString("id-ID")}</span>
                            <Button variant="contained" color="warning" size="small" onClick={() => openBooking(activity)}>
                                Request Booking
                            </Button>
                        </div>
                    </div>
                ))}
            </div>

            <Dialog open={!!bookingActivity} onClose={() => setBookingActivity(null)} fullWidth maxWidth="xs">
                <DialogTitle>Request: {bookingActivity?.name}</DialogTitle>
                <DialogContent>
                    <FormProvider {...methods}>
                        <form onSubmit={onSubmit} className="flex flex-col gap-3 mt-1">
                            <TextField label={t("itinerary.fullname")} fullWidth value={watch("fullName")} onChange={(e) => setValue("fullName", e.target.value)} error={!!errors.fullName} helperText={errors.fullName?.message} />
                            <TextField label={t("itinerary.phone")} fullWidth value={watch("phone")} onChange={(e) => setValue("phone", e.target.value)} error={!!errors.phone} helperText={errors.phone?.message} />
                            <TextField label={t("itinerary.email")} fullWidth value={watch("email")} onChange={(e) => setValue("email", e.target.value)} error={!!errors.email} helperText={errors.email?.message} />
                            <TextField type="date" label="Date" fullWidth slotProps={{ inputLabel: { shrink: true } }} value={watch("date")} onChange={(e) => setValue("date", e.target.value)} error={!!errors.date} helperText={errors.date?.message} />
                            <TextField type="number" label="Participants" fullWidth value={watch("participants")} onChange={(e) => setValue("participants", Number(e.target.value))} error={!!errors.participants} helperText={errors.participants?.message} />
                            <Button type="submit" variant="contained" color="warning" disabled={isSubmitting} sx={{ mt: 1 }}>
                                {isSubmitting ? <CircularProgress size={20} color="inherit" /> : "Submit Request"}
                            </Button>
                        </form>
                    </FormProvider>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default ActivityListContainer;
