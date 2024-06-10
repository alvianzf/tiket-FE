import AppNavbar from "@components/AppNavbar";
import Footer from "@components/Footer";
import { ReactNode } from "react"

interface Props {
    children: ReactNode;
}

const AppLayout = ({ children } : Props) => {
    return (
        <>
            <div className="bg-blue flex flex-row justify-center">
                <AppNavbar />
            </div>
            {children}
            <Footer />
        </>
    )
}

export default AppLayout