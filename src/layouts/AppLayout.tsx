import AppNavbar from "@components/AppNavbar";
import Footer from "@components/Footer";
import { ReactNode } from "react"
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/router";

interface Props {
    children: ReactNode;
}

const AppLayout = ({ children } : Props) => {
    const router = useRouter();
    
    return (
        <div className="min-h-screen flex flex-col bg-slate-50/50">
            <div className="glass-navbar sticky top-0 z-50 flex flex-row justify-center">
                <AppNavbar />
            </div>
            <AnimatePresence mode="wait">
                <motion.main
                    key={router.route}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="flex-grow"
                >
                    {children}
                </motion.main>
            </AnimatePresence>
            <Footer />
        </div>
    )
}

export default AppLayout