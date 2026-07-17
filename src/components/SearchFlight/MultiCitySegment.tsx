import { Autocomplete, TextField, InputAdornment } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { useTranslation } from "react-i18next";
import moment from "moment";
import { Airport } from "@api/airports/types";
import { FaPlaneDeparture, FaPlaneArrival } from "react-icons/fa";
import { Trash2 } from "lucide-react";

export interface SegmentValue {
    from: string;
    to: string;
    date: string;
}

interface Props {
    index: number;
    value: SegmentValue;
    airports: Airport[];
    isLoading: boolean;
    canRemove: boolean;
    minDate?: string;
    onChange: (index: number, value: SegmentValue) => void;
    onRemove: (index: number) => void;
}

const MultiCitySegment = ({ index, value, airports, isLoading, canRemove, minDate, onChange, onRemove }: Props) => {
    const { t } = useTranslation();

    return (
        <div className="flex flex-col lg:flex-row gap-4 items-end w-full p-4 bg-white/5 rounded-2xl border border-white/10">
            <div className="hidden lg:flex w-6 shrink-0 items-center justify-center self-end pb-2">
                <span className="text-xs font-black text-orange-500">{index + 1}</span>
            </div>
            <div className="w-full lg:flex-1 flex flex-col gap-2">
                <p className="font-medium text-slate-800/80 text-sm">{t('tickets.from')}</p>
                <Autocomplete
                    aria-label={t('tickets.from')}
                    options={airports}
                    loading={isLoading}
                    value={airports.find((item) => item.code === value.from) ?? null}
                    onChange={(_, item) => { if (item) onChange(index, { ...value, from: item.code }); }}
                    getOptionLabel={(item) => item.name}
                    isOptionEqualToValue={(option, val) => option.code === val.code}
                    groupBy={() => t('tickets.popular_city')}
                    slotProps={{
                        popper: {
                            className: "z-[9999]",
                            sx: { width: { xs: "350px !important", md: "600px !important" } }
                        }
                    }}
                    renderGroup={(params) => (
                        <li key={params.key}>
                            <div className="text-primary text-base font-bold pl-2 py-1">{params.group}</div>
                            <ul className="list-none p-0">{params.children}</ul>
                        </li>
                    )}
                    renderOption={(props, item) => (
                        <li {...props} key={item.code} className={`${props.className} text-black hover:bg-primary hover:text-white transition-colors`}>
                            <div className="flex flex-col">
                                <span className="font-bold">{item.code}</span>
                                <span className="text-xs opacity-80">{item.name}</span>
                            </div>
                        </li>
                    )}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            variant="standard"
                            placeholder={t('tickets.from_placeholder')}
                            slotProps={{
                                ...params.slotProps,
                                input: {
                                    ...params.slotProps.input,
                                    startAdornment: (
                                        <>
                                            <InputAdornment position="start"><FaPlaneDeparture className="text-primary" /></InputAdornment>
                                            {params.slotProps.input.startAdornment}
                                        </>
                                    )
                                }
                            }}
                        />
                    )}
                />
            </div>
            <div className="w-full lg:flex-1 flex flex-col gap-2">
                <p className="font-medium text-slate-800/80 text-sm">{t('tickets.to')}</p>
                <Autocomplete
                    aria-label={t('tickets.to')}
                    options={airports}
                    loading={isLoading}
                    value={airports.find((item) => item.code === value.to) ?? null}
                    onChange={(_, item) => { if (item) onChange(index, { ...value, to: item.code }); }}
                    getOptionLabel={(item) => item.name}
                    isOptionEqualToValue={(option, val) => option.code === val.code}
                    groupBy={() => t('tickets.popular_city')}
                    slotProps={{
                        popper: {
                            className: "z-[9999]",
                            sx: { width: { xs: "350px !important", md: "600px !important" } }
                        }
                    }}
                    renderGroup={(params) => (
                        <li key={params.key}>
                            <div className="text-primary text-base font-bold pl-2 py-1">{params.group}</div>
                            <ul className="list-none p-0">{params.children}</ul>
                        </li>
                    )}
                    renderOption={(props, item) => (
                        <li {...props} key={item.code} className={`${props.className} text-black hover:bg-primary hover:text-white transition-colors`}>
                            <div className="flex flex-col">
                                <span className="font-bold">{item.code}</span>
                                <span className="text-xs opacity-80">{item.name}</span>
                            </div>
                        </li>
                    )}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            variant="standard"
                            placeholder={t('tickets.to_placeholder')}
                            slotProps={{
                                ...params.slotProps,
                                input: {
                                    ...params.slotProps.input,
                                    startAdornment: (
                                        <>
                                            <InputAdornment position="start"><FaPlaneArrival className="text-primary" /></InputAdornment>
                                            {params.slotProps.input.startAdornment}
                                        </>
                                    )
                                }
                            }}
                        />
                    )}
                />
            </div>
            <div className="w-full lg:flex-1 flex flex-col gap-2">
                <p className="font-medium text-slate-800/80 text-sm">{t('tickets.departured_date')}</p>
                <DatePicker
                    className="w-full"
                    minDate={minDate ? moment(minDate) : moment()}
                    value={value.date ? moment(value.date) : null}
                    onChange={(v) => { if (v) onChange(index, { ...value, date: v.format('YYYY-MM-DD') }); }}
                    slotProps={{
                        textField: {
                            variant: "standard",
                            fullWidth: true
                        }
                    }}
                />
            </div>
            {canRemove && (
                <button
                    type="button"
                    onClick={() => onRemove(index)}
                    className="shrink-0 w-10 h-10 flex items-center justify-center rounded-xl text-red-400 hover:bg-red-500/10 transition-colors mb-1"
                    aria-label={t('tickets.remove_flight')}
                >
                    <Trash2 size={18} />
                </button>
            )}
        </div>
    );
};

export default MultiCitySegment;
