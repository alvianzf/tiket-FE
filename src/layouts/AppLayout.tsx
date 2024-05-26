import AppNavbar from "@components/AppNavbar";
import { ReactNode } from "react"

interface Props {
    children: ReactNode;
}

const AppLayout = ({ children } : Props) => {
    return (
        <>
            <AppNavbar />
            {children}
        </>
    )
}

export default AppLayout