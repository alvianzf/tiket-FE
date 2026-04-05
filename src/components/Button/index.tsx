import { Button as BaseButton, ButtonProps } from "@nextui-org/react";
import { ReactNode, useMemo } from "react";
import { motion } from "framer-motion";

interface Props extends ButtonProps {
    children: ReactNode;
    bgColor?: "blue" | "orange";
}

const Button = ({ children, bgColor = "orange", ...restProps} : Props) => {

    const classNames = useMemo(
        () => bgColor === 'blue' ? 'button-blue' : 'button-orange',
        [bgColor]
    );

    const baseClassNames = [classNames, restProps.className].join(" ");

    return (
        <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full md:w-auto"
        >
            <BaseButton color="default" {...restProps} className={baseClassNames}>
                {children}
            </BaseButton>
        </motion.div>
    )
}

export default Button