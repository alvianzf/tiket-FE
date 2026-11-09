import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { Destination } from "@api/destinations/types";
import { MapPin, Clock } from "lucide-react";

const DestinationCard = ({ destination, disabled }: { destination: Destination; disabled?: boolean }) => {
    const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
        id: `catalog-${destination.id}`,
        data: { destination },
        disabled,
    });

    return (
        <div
            ref={setNodeRef}
            {...listeners}
            {...attributes}
            style={{ transform: CSS.Translate.toString(transform) }}
            className={`surface-card p-3 cursor-grab active:cursor-grabbing select-none transition-opacity ${
                isDragging ? "opacity-40" : disabled ? "opacity-50 cursor-not-allowed" : "opacity-100"
            }`}
        >
            <p className="font-bold text-slate-800 text-sm">{destination.name}</p>
            <div className="flex items-center gap-1 text-xs text-slate-500 mt-1">
                <MapPin size={12} /> {destination.area}
                {destination.category && <span className="text-slate-400">&middot; {destination.category}</span>}
            </div>
            <div className="flex items-center justify-between mt-2">
                <div className="flex items-center gap-1 text-xs text-slate-500">
                    <Clock size={12} /> {destination.minStayMinutes} min
                </div>
                <span className="text-orange-600 text-sm font-bold">
                    Rp {Number(destination.price).toLocaleString("id-ID")}
                </span>
            </div>
        </div>
    );
};

export default DestinationCard;
