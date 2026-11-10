import { useMemo, useState } from "react";
import * as Popover from "@radix-ui/react-popover";
import { Check, ChevronDown, Loader2 } from "lucide-react";

export interface ComboboxOption {
    code: string;
    name: string;
    group?: string;
}

interface Props {
    options: ComboboxOption[];
    value: string;
    onChange: (code: string) => void;
    placeholder?: string;
    isLoading?: boolean;
    disabled?: boolean;
}

// Replaces MUI Autocomplete — a genuinely different control, not a restyle:
// a plain trigger button opens a searchable list in a Radix Popover (so it's
// always portaled to <body>, immune to the ancestor-stacking-context bug
// that buried PassengerInput's old custom dropdown). No MUI underneath.
const Combobox = ({ options, value, onChange, placeholder, isLoading, disabled }: Props) => {
    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState("");

    const selected = options.find((o) => o.code === value);

    const filtered = useMemo(() => {
        if (!query) return options;
        const q = query.toLowerCase();
        return options.filter((o) => o.name.toLowerCase().includes(q));
    }, [options, query]);

    const grouped = useMemo(() => {
        const groups = new Map<string, ComboboxOption[]>();
        filtered.forEach((o) => {
            const key = o.group || "";
            if (!groups.has(key)) groups.set(key, []);
            groups.get(key)!.push(o);
        });
        return Array.from(groups.entries());
    }, [filtered]);

    return (
        <Popover.Root open={open} onOpenChange={(next) => { setOpen(next); if (!next) setQuery(""); }}>
            <Popover.Trigger asChild>
                <button
                    type="button"
                    disabled={disabled}
                    className="w-full flex items-center justify-between gap-2 text-left disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <span className={`truncate font-bold ${selected ? "text-slate-800" : "text-slate-400 font-normal"}`}>
                        {selected ? selected.name : (placeholder || "Select...")}
                    </span>
                    {isLoading ? <Loader2 size={16} className="animate-spin text-slate-400 shrink-0" /> : <ChevronDown size={16} className="text-slate-400 shrink-0" />}
                </button>
            </Popover.Trigger>
            <Popover.Portal>
                <Popover.Content
                    align="start"
                    sideOffset={8}
                    className="z-[1300] w-[min(360px,90vw)] bg-white rounded-xl shadow-xl border border-slate-100 overflow-hidden"
                >
                    <div className="p-2 border-b border-slate-100">
                        <input
                            autoFocus
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Search..."
                            className="w-full h-9 px-3 rounded-lg bg-slate-50 text-sm outline-none focus:bg-white focus:ring-1 focus:ring-primary/30"
                        />
                    </div>
                    <div className="max-h-[280px] overflow-y-auto py-1">
                        {filtered.length === 0 && (
                            <p className="px-3 py-4 text-sm text-slate-400 text-center">No results</p>
                        )}
                        {grouped.map(([group, items]) => (
                            <div key={group || "_"}>
                                {group && <p className="px-3 pt-2 pb-1 text-[11px] font-bold uppercase tracking-wide text-primary">{group}</p>}
                                {items.map((item) => (
                                    <button
                                        key={item.code}
                                        type="button"
                                        onClick={() => { onChange(item.code); setOpen(false); setQuery(""); }}
                                        className="w-full flex items-center justify-between gap-2 px-3 py-2 text-sm text-left hover:bg-slate-50 transition-colors"
                                    >
                                        <span className="truncate">{item.name}</span>
                                        {item.code === value && <Check size={14} className="text-primary shrink-0" />}
                                    </button>
                                ))}
                            </div>
                        ))}
                    </div>
                </Popover.Content>
            </Popover.Portal>
        </Popover.Root>
    );
};

export default Combobox;
