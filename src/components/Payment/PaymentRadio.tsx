import { FormControlLabel, Radio, RadioProps, useRadioGroup } from "@mui/material"
import { ReactNode } from "react"

interface Props extends RadioProps {
    children?: ReactNode;
}

const PaymentRadio = ({ children, value, ...radioProps }: Props) => {
    const radioGroup = useRadioGroup();
    const selected = radioGroup ? radioGroup.value === value : !!radioProps.checked;

    return (
        <FormControlLabel
            value={value}
            control={
                <Radio
                    {...radioProps}
                    sx={{ p: 0, "&.Mui-checked": { color: "#ff5a00" }, ...radioProps.sx }}
                />
            }
            label={children}
            className="group inline-flex items-center hover:opacity-70 active:opacity-50 flex-row tap-highlight-transparent cursor-pointer rounded-lg gap-4 p-4"
            sx={{
                margin: 0,
                border: "2px solid",
                borderColor: selected ? "#ff5a00" : "rgba(0,0,0,0.12)",
            }}
        />
    )
}

export default PaymentRadio
