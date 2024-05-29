import { Button as BaseButton, ButtonProps } from "@nextui-org/react";
import { ReactNode, useMemo } from "react";

interface Props extends ButtonProps {
    children: ReactNode;
    bgColor: "blue" | "orange";
}

const Button = ({ children, bgColor, ...restProps} : Props) => {

    const classNames = useMemo(
        () => bgColor === 'blue' ? 'button-blue' : 'button-orange',
        [bgColor]
    );

    return (
        <BaseButton color="default" {...restProps} className={classNames}>
            {children}
        </BaseButton>
    )
}

export default Button