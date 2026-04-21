import { Button as BaseButton, ButtonProps } from "@nextui-org/react";
import { ReactNode, useMemo } from "react";
import { motion } from "framer-motion";

interface Props extends ButtonProps {
    children: ReactNode;
    dsVariant?: "primary" | "cta" | "ghost" | "glass" | "secondary";
}

const Button = ({ children, dsVariant = "cta", ...restProps} : Props) => {

    const variantStyles = useMemo(() => {
        switch (dsVariant) {
            case "primary":
                return "bg-primary text-white shadow-[0_4px_14px_rgba(66,103,178,0.3)] hover:bg-primary-dark hover:shadow-[0_6px_20px_rgba(66,103,178,0.4)]";
            case "cta":
                return "bg-cta text-white shadow-[0_4px_14px_rgba(255,90,0,0.3)] hover:bg-cta-dark hover:shadow-[0_6px_20px_rgba(255,90,0,0.4)]";
            case "secondary":
                return "bg-secondary text-dark font-bold hover:bg-secondary-dark transition-all";
            case "ghost":
                return "bg-transparent text-primary border-2 border-primary hover:bg-primary hover:text-white";
            case "glass":
                return "bg-white/10 backdrop-blur-md text-white border border-white/25 hover:bg-white/20";
            default:
                return "";
        }
    }, [dsVariant]);

    const baseClassNames = [
        "ds-btn font-bold rounded-ds-sm transition-all duration-200 active:scale-95 px-6",
        variantStyles,
        restProps.className
    ].join(" ");

    return (
        <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full md:w-auto"
        >
            <BaseButton 
                disableRipple
                {...restProps} 
                className={baseClassNames}
            >
                {children}
            </BaseButton>
        </motion.div>
    )
}

export default Button