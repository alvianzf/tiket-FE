import AppNavbar from "@components/AppNavbar";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
        <div className="w-full h-full min-h-screen bg-[#f0f4f8] flex flex-col justify-between">
            <ToastContainer />
            <div className="w-full flex-1 h-full min-h-screen">
                <div className="glass-navbar sticky top-0 z-50 flex flex-row justify-center">
                    <AppNavbar />
                </div>
                <AnimatePresence mode="popLayout" initial={false}>
                    <motion.main
                        key={router.route}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -12 }}
                        transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                        className="flex-grow"
                    >
                        {children}
                    </motion.main>
                </AnimatePresence>
                <Footer />
            </div>
        </div>
    )
}

export default AppLayout