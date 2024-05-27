import AppNavbar from "@components/AppNavbar";
import Footer from "@components/Footer";
import { ReactNode } from "react"

interface Props {
    children: ReactNode;
}

const AppLayout = ({ children } : Props) => {
    return (
        <>
            <AppNavbar />
            {children}
            <Footer />
        </>
    )
}

export default AppLayout