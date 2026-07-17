import { Autocomplete, TextField, InputAdornment } from "@mui/material";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { FormProps } from "../forms/useForm";
import { Airport } from "@api/airports/types";
import { FaPlaneArrival } from "react-icons/fa";

interface Props {
    items: Airport[];
    isLoading?: boolean;
}

const DestinationInput = ({ items, isLoading } : Props) => {

    const { t } = useTranslation();

    const { setValue, watch, formState: { errors }} = useFormContext<FormProps>();

    return (
        <div className="w-full flex flex-col gap-2">
            <p className="font-medium text-slate-800/80">{t('tickets.to')}</p>
            <Autocomplete
                aria-label={t('tickets.to')}
                className="w-full"
                options={items}
                loading={isLoading}
                value={items.find((item) => item.code === watch('to')) ?? null}
                onChange={(_, item) => {
                    if(item) {
                        setValue('to', item.code)
                    }
                }}
                getOptionLabel={(item) => item.name}
                isOptionEqualToValue={(option, val) => option.code === val.code}
                groupBy={() => t('tickets.popular_city')}
                slotProps={{
                    popper: {
                        className: "z-[9999]",
                        sx: { width: { xs: "350px !important", md: "800px !important" } }
                    }
                }}
                renderGroup={(params) => (
                    <li key={params.key}>
                        <div className="text-primary text-base font-bold pl-2 py-1">{params.group}</div>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 w-full list-none p-0">{params.children}</ul>
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
                        error={!!errors?.to?.message}
                        helperText={errors?.to?.message}
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
    )
}

export default DestinationInput
