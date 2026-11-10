import { useMemo, useState } from "react";
import * as Popover from "@radix-ui/react-popover";
import moment from "moment";
import { CalendarDays, ChevronLeft, ChevronRight } from "lucide-react";

interface Props {
    value: string; // YYYY-MM-DD, or "" for empty
    onChange: (value: string) => void;
    min?: string; // YYYY-MM-DD
    max?: string; // YYYY-MM-DD
    disabled?: boolean;
    placeholder?: string;
    error?: boolean;
}

const DISPLAY_FORMAT = "DD-MM-YYYY";

// Replaces both MUI's DatePicker AND the native <input type="date"> (which
// displays in whatever format the browser's locale picks - MM/DD/YYYY on
// en-US - not something HTML lets us force). This renders its own month
// grid in a Radix Popover so the display format is always DD-MM-YYYY,
// everywhere, regardless of the visitor's browser locale.
const DatePicker = ({ value, onChange, min, max, disabled, placeholder, error }: Props) => {
    const [open, setOpen] = useState(false);
    const selected = value ? moment(value, "YYYY-MM-DD") : null;
    const minMoment = min ? moment(min, "YYYY-MM-DD") : null;
    const maxMoment = max ? moment(max, "YYYY-MM-DD") : null;
    const [viewMonth, setViewMonth] = useState(() => (selected || maxMoment || moment()).clone().startOf("month"));

    const weeks = useMemo(() => {
        const start = viewMonth.clone().startOf("month").startOf("week");
        const end = viewMonth.clone().endOf("month").endOf("week");
        const days: moment.Moment[] = [];
        const cursor = start.clone();
        while (cursor.isSameOrBefore(end, "day")) {
            days.push(cursor.clone());
            cursor.add(1, "day");
        }
        const rows: moment.Moment[][] = [];
        for (let i = 0; i < days.length; i += 7) rows.push(days.slice(i, i + 7));
        return rows;
    }, [viewMonth]);

    const isDisabled = (day: moment.Moment) =>
        (!!minMoment && day.isBefore(minMoment, "day")) || (!!maxMoment && day.isAfter(maxMoment, "day"));

    return (
        <Popover.Root open={open} onOpenChange={setOpen}>
            <Popover.Trigger asChild>
                <button
                    type="button"
                    disabled={disabled}
                    className="w-full flex items-center gap-2 text-left disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <CalendarDays size={16} className={`shrink-0 ${error ? "text-red-400" : "text-slate-400"}`} />
                    <span className={`truncate font-bold ${error ? "text-red-500" : selected ? "text-slate-800" : "text-slate-400 font-normal"}`}>
                        {selected ? selected.format(DISPLAY_FORMAT) : (placeholder || DISPLAY_FORMAT)}
                    </span>
                </button>
            </Popover.Trigger>
            <Popover.Portal>
                <Popover.Content align="start" sideOffset={8} className="z-[1300] w-[300px] bg-white rounded-xl shadow-xl border border-slate-100 p-3">
                    <div className="flex items-center justify-between mb-2 px-1">
                        <button type="button" onClick={() => setViewMonth((m) => m.clone().subtract(1, "month"))} className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-slate-100 text-slate-500">
                            <ChevronLeft size={16} />
                        </button>
                        <span className="font-bold text-sm text-slate-800">{viewMonth.format("MMMM YYYY")}</span>
                        <button type="button" onClick={() => setViewMonth((m) => m.clone().add(1, "month"))} className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-slate-100 text-slate-500">
                            <ChevronRight size={16} />
                        </button>
                    </div>
                    <div className="grid grid-cols-7 gap-1 mb-1">
                        {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => (
                            <span key={d} className="text-[10px] font-bold text-slate-400 text-center uppercase">{d}</span>
                        ))}
                    </div>
                    {weeks.map((week, i) => (
                        <div key={i} className="grid grid-cols-7 gap-1 mb-1">
                            {week.map((day) => {
                                const inMonth = day.isSame(viewMonth, "month");
                                const isSelected = selected && day.isSame(selected, "day");
                                const disabledDay = isDisabled(day);
                                return (
                                    <button
                                        key={day.format("YYYY-MM-DD")}
                                        type="button"
                                        disabled={disabledDay}
                                        onClick={() => { onChange(day.format("YYYY-MM-DD")); setOpen(false); }}
                                        className={`h-8 rounded-lg text-xs font-semibold transition-colors ${
                                            isSelected ? "bg-orange-500 text-white" :
                                            disabledDay ? "text-slate-300 cursor-not-allowed" :
                                            inMonth ? "text-slate-700 hover:bg-slate-100" : "text-slate-300 hover:bg-slate-50"
                                        }`}
                                    >
                                        {day.date()}
                                    </button>
                                );
                            })}
                        </div>
                    ))}
                </Popover.Content>
            </Popover.Portal>
        </Popover.Root>
    );
};

export default DatePicker;
