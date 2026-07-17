import BaseButton, { ButtonProps } from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import { ReactNode, useMemo } from "react";
import { motion } from "framer-motion";

interface Props extends ButtonProps {
    children: ReactNode;
    dsVariant?: "primary" | "cta" | "ghost" | "glass" | "secondary";
    isLoading?: boolean;
}

const Button = ({ children, dsVariant = "cta", isLoading = false, ...restProps} : Props) => {

    const variantProps = useMemo((): Partial<ButtonProps> => {
        switch (dsVariant) {
            case "primary":
                return { variant: "contained", color: "primary" };
            case "cta":
                return { variant: "contained", color: "warning" };
            case "secondary":
                return { variant: "contained", color: "secondary" };
            case "ghost":
                return {
                    variant: "outlined",
                    color: "primary",
                    sx: { borderWidth: 2, "&:hover": { borderWidth: 2, bgcolor: "primary.main", color: "#fff" } },
                };
            case "glass":
                return {
                    variant: "outlined",
                    sx: {
                        color: "#fff",
                        bgcolor: "rgba(255,255,255,0.1)",
                        backdropFilter: "blur(12px)",
                        borderColor: "rgba(255,255,255,0.25)",
                        "&:hover": { bgcolor: "rgba(255,255,255,0.2)", borderColor: "rgba(255,255,255,0.25)" },
                    },
                };
            default:
                return {};
        }
    }, [dsVariant]);

    return (
        <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full md:w-auto"
        >
            <BaseButton
                disableRipple
                fullWidth
                disabled={isLoading || restProps.disabled}
                startIcon={isLoading ? <CircularProgress size={16} color="inherit" /> : restProps.startIcon}
                {...variantProps}
                {...restProps}
                sx={[
                    ...(Array.isArray(variantProps.sx) ? variantProps.sx : [variantProps.sx]),
                    ...(Array.isArray(restProps.sx) ? restProps.sx : [restProps.sx]),
                ]}
            >
                {children}
            </BaseButton>
        </motion.div>
    )
}

export default Button
