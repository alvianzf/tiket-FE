import CheckoutNavbar from "@components/CheckoutNavbar";
import Footer from "@components/Footer";
import { ReactNode } from "react"

interface Props {
    children: ReactNode;
}

const CheckoutLayout = ({ children } : Props) => {
    return (
        <>
            <CheckoutNavbar />
            {children}
            <Footer />
        </>
    )
}

export default CheckoutLayout