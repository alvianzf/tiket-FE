import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { IconButton } from "@mui/material";
import { X, Clock, ArrowRight } from "lucide-react";
import { Destination } from "@api/destinations/types";

interface Props {
    destination: Destination;
    index: number;
    onRemove: () => void;
}

const TripStopCard = ({ destination, index, onRemove }: Props) => {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
        id: `trip-${destination.id}`,
    });

    return (
        <div
            ref={setNodeRef}
            style={{ transform: CSS.Transform.toString(transform), transition }}
            className={`glass-card p-3 flex items-center gap-3 ${isDragging ? "opacity-40" : ""}`}
        >
            <div
                {...attributes}
                {...listeners}
                className="flex items-center justify-center w-7 h-7 rounded-full bg-primary text-white text-xs font-bold shrink-0 cursor-grab active:cursor-grabbing"
            >
                {index + 1}
            </div>
            <div className="flex-1 min-w-0">
                <p className="font-bold text-slate-800 text-sm truncate">{destination.name}</p>
                <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
                    <ArrowRight size={11} /> {destination.travelGapMinutes} min travel
                    <Clock size={11} /> {destination.minStayMinutes} min stay
                </div>
            </div>
            <span className="text-orange-600 text-sm font-bold whitespace-nowrap">
                Rp {Number(destination.price).toLocaleString("id-ID")}
            </span>
            <IconButton size="small" onClick={onRemove} aria-label="Remove stop">
                <X size={16} />
            </IconButton>
        </div>
    );
};

export default TripStopCard;
