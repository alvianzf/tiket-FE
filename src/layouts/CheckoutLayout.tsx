import { ReactNode } from "react"

interface Props {
    children: ReactNode;
}

const CheckoutLayout = ({ children } : Props) => {
    return (
        <>{children}</>
    )
}

export default CheckoutLayout