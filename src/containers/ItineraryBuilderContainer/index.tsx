import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useQuery, useMutation } from "react-query";
import {
    DndContext,
    DragEndEvent,
    DragOverlay,
    DragStartEvent,
    useDroppable,
    PointerSensor,
    useSensor,
    useSensors,
} from "@dnd-kit/core";
import { SortableContext, arrayMove, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { Sparkles, MousePointer2, Clock3, Send } from "lucide-react";
import { motion } from "framer-motion";
import { FormProvider } from "react-hook-form";
import { toast } from "react-toastify";

const HOW_IT_WORKS = [
    { icon: MousePointer2, title: "Drag destinations", desc: "Pull places from the catalog into your trip, in any order." },
    { icon: Clock3, title: "Watch cost & time add up", desc: "Each stop's visit time and travel buffer update your totals live." },
    { icon: Send, title: "Submit your trip", desc: "Our concierge team confirms availability and reaches out." },
];

import Button from "@components/ui/Button";
import TextField from "@components/ui/TextField";
import Dialog from "@components/ui/Dialog";
import { getDestinations } from "@api/destinations";
import { Destination } from "@api/destinations/types";
import { submitItinerary } from "@api/itinerary";
import DestinationCard from "./DestinationCard";
import TripStopCard from "./TripStopCard";
import useForm from "./forms/useForm";

const DURATION_OPTIONS = ["6 Hours", "1 Day", "2 Days"];

const ItineraryBuilderContainer = () => {
    const { t } = useTranslation();
    const [trip, setTrip] = useState<Destination[]>([]);
    const [durationLabel, setDurationLabel] = useState(DURATION_OPTIONS[1]);
    const [activeDrag, setActiveDrag] = useState<Destination | null>(null);
    const [isSubmitOpen, setIsSubmitOpen] = useState(false);

    const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }));

    const { data } = useQuery(["destinations"], () => getDestinations());
    const destinations = data?.data || [];

    const { setNodeRef: setTripDropRef, isOver } = useDroppable({ id: "trip-dropzone" });

    const methods = useForm();
    const { handleSubmit, formState: { errors }, watch, setValue } = methods;

    const { mutate, isLoading: isSubmitting } = useMutation(submitItinerary, {
        onSuccess: () => {
            toast.success(t("itinerary.success"));
            setIsSubmitOpen(false);
            setTrip([]);
        },
        onError: () => {
            toast.error("Something went wrong. Please try again.");
        },
    });

    const totals = useMemo(() => {
        const cost = trip.reduce((sum, d) => sum + Number(d.price), 0);
        const minutes = trip.reduce((sum, d) => sum + d.minStayMinutes + d.travelGapMinutes, 0);
        return { cost, hours: Math.floor(minutes / 60), mins: minutes % 60 };
    }, [trip]);

    const handleDragStart = (e: DragStartEvent) => {
        const dest = e.active.data.current?.destination as Destination | undefined;
        if (dest) setActiveDrag(dest);
    };

    const handleDragEnd = (e: DragEndEvent) => {
        setActiveDrag(null);
        const { active, over } = e;
        if (!over) return;

        // Dragged from the catalog onto the trip panel (or onto an existing stop)
        if (String(active.id).startsWith("catalog-")) {
            const dest = active.data.current?.destination as Destination | undefined;
            if (dest && !trip.some((d) => d.id === dest.id)) {
                setTrip((prev) => [...prev, dest]);
            }
            return;
        }

        // Reordering within the trip list
        if (String(active.id).startsWith("trip-") && active.id !== over.id) {
            setTrip((prev) => {
                const oldIndex = prev.findIndex((d) => `trip-${d.id}` === active.id);
                const newIndex = prev.findIndex((d) => `trip-${d.id}` === over.id);
                if (oldIndex === -1 || newIndex === -1) return prev;
                return arrayMove(prev, oldIndex, newIndex);
            });
        }
    };

    const handleAskAi = () => {
        window.dispatchEvent(
            new CustomEvent("tiketq:open-chat", {
                detail: { prefill: `Recommend a Batam itinerary for a ${durationLabel.toLowerCase()} trip. Ask me about my interests first.` },
            }),
        );
    };

    const onSubmitTrip = handleSubmit((values) => {
        mutate({
            ...values,
            durationLabel,
            items: trip.map((d, i) => ({ destinationId: d.id, order: i })),
        });
    });

    return (
        <div className="relative max-w-[1200px] mx-auto px-4 sm:px-6 py-10">
            <div className="text-center mb-8">
                <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-800">{t("itinerary.title")}</h1>
                <p className="text-slate-600 mt-2">{t("itinerary.subtitle")}</p>
            </div>

            <div className="grid sm:grid-cols-3 gap-4 mb-8">
                {HOW_IT_WORKS.map((step, i) => (
                    <motion.div
                        key={step.title}
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: i * 0.1 }}
                        className="surface-card p-4 flex items-start gap-3"
                    >
                        <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center shrink-0">
                            <step.icon size={18} />
                        </div>
                        <div>
                            <p className="font-bold text-slate-800 text-sm">{i + 1}. {step.title}</p>
                            <p className="text-slate-500 text-xs mt-0.5">{step.desc}</p>
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
                {DURATION_OPTIONS.map((opt) => (
                    <button
                        key={opt}
                        onClick={() => setDurationLabel(opt)}
                        className={`px-4 h-9 rounded-full text-sm font-semibold border transition-colors ${
                            durationLabel === opt ? "bg-orange-500 text-white border-orange-500" : "bg-white text-slate-600 border-slate-200 hover:border-slate-300"
                        }`}
                    >
                        {opt}
                    </button>
                ))}
                <button
                    onClick={handleAskAi}
                    className="flex items-center gap-1.5 px-4 h-9 rounded-full text-sm font-semibold border-2 border-primary text-primary hover:bg-primary/5 ml-1"
                >
                    <Sparkles size={15} /> {t("itinerary.ask_ai")}
                </button>
            </div>

            <DndContext sensors={sensors} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
                <div className="grid md:grid-cols-2 gap-6">
                    <div>
                        <h2 className="font-bold text-slate-700 mb-3">{t("itinerary.catalog_title")}</h2>
                        <div className="flex flex-col gap-2 max-h-[500px] overflow-y-auto pr-1">
                            {destinations.map((d) => (
                                <DestinationCard key={d.id} destination={d} disabled={trip.some((s) => s.id === d.id)} />
                            ))}
                        </div>
                    </div>

                    <div>
                        <h2 className="font-bold text-slate-700 mb-3">{t("itinerary.trip_title")}</h2>
                        <div
                            ref={setTripDropRef}
                            className={`flex flex-col gap-2 min-h-[300px] max-h-[500px] overflow-y-auto pr-1 p-2 rounded-ds-lg border-2 border-dashed transition-colors ${
                                isOver ? "border-orange-400 bg-orange-50/50" : "border-slate-300"
                            }`}
                        >
                            {trip.length === 0 && (
                                <p className="text-sm text-slate-400 text-center my-auto">{t("itinerary.trip_empty")}</p>
                            )}
                            <SortableContext items={trip.map((d) => `trip-${d.id}`)} strategy={verticalListSortingStrategy}>
                                {trip.map((d, i) => (
                                    <TripStopCard
                                        key={d.id}
                                        destination={d}
                                        index={i}
                                        onRemove={() => setTrip((prev) => prev.filter((x) => x.id !== d.id))}
                                    />
                                ))}
                            </SortableContext>
                        </div>

                        {trip.length > 0 && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="surface-card p-4 mt-4 flex items-center justify-between">
                                <div>
                                    <p className="text-xs text-slate-500">{t("itinerary.total_time")}</p>
                                    <p className="font-bold text-slate-800">{totals.hours}h {totals.mins}m</p>
                                </div>
                                <div>
                                    <p className="text-xs text-slate-500">{t("itinerary.total_cost")}</p>
                                    <p className="font-bold text-orange-600">Rp {totals.cost.toLocaleString("id-ID")}</p>
                                </div>
                                <Button variant="cta" onClick={() => setIsSubmitOpen(true)}>
                                    {t("itinerary.submit")}
                                </Button>
                            </motion.div>
                        )}
                    </div>
                </div>

                <DragOverlay>{activeDrag && <DestinationCard destination={activeDrag} />}</DragOverlay>
            </DndContext>

            <Dialog open={isSubmitOpen} onClose={() => setIsSubmitOpen(false)} title={t("itinerary.submit")}>
                <FormProvider {...methods}>
                    <form onSubmit={onSubmitTrip} className="flex flex-col gap-3">
                        <TextField
                            label={t("itinerary.fullname")}
                            fullWidth
                            value={watch("fullName")}
                            onChange={(e) => setValue("fullName", e.target.value)}
                            error={errors.fullName?.message}
                        />
                        <TextField
                            label={t("itinerary.phone")}
                            fullWidth
                            value={watch("phone")}
                            onChange={(e) => setValue("phone", e.target.value)}
                            error={errors.phone?.message}
                        />
                        <TextField
                            label={t("itinerary.email")}
                            fullWidth
                            value={watch("email")}
                            onChange={(e) => setValue("email", e.target.value)}
                            error={errors.email?.message}
                        />
                        <TextField
                            type="date"
                            label={t("itinerary.start_date")}
                            fullWidth
                            value={watch("startDate")}
                            onChange={(e) => setValue("startDate", e.target.value)}
                            error={errors.startDate?.message}
                        />
                        <Button type="submit" variant="cta" isLoading={isSubmitting} fullWidth className="mt-1">
                            {t("itinerary.submit")}
                        </Button>
                    </form>
                </FormProvider>
            </Dialog>
        </div>
    );
};

export default ItineraryBuilderContainer;
