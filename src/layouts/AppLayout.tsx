import AppNavbar from "@components/AppNavbar";
import AppDrawer from "@components/AppDrawer";
import BottomNav from "@components/BottomNav";
import AnimatedBackground from "@components/AnimatedBackground";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from "@components/Footer";
import { ReactNode, useState } from "react"
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import Dialog from "@components/ui/Dialog";
import SearchBookingNumber from "@components/SearchBookingNumber";

interface Props {
    children: ReactNode;
}

const AppLayout = ({ children } : Props) => {
    const router = useRouter();
    const { i18n, t } = useTranslation();
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [isOpenFind, setIsOpenFind] = useState(false);
    const language = i18n.language === "en" ? "en" : "id";

    return (
        <div className="w-full h-full min-h-screen bg-[#f7f8fa] flex flex-col justify-between overflow-x-hidden">
            <AnimatedBackground />
            <ToastContainer />
            <div className="w-full flex-1 h-full min-h-screen relative z-[1] pb-[calc(var(--bottom-nav-height)+8px)] lg:pb-0">
                <div className="app-header flex flex-row justify-center">
                    <AppNavbar onOpenDrawer={() => setIsDrawerOpen(true)} />
                </div>
                <AnimatePresence mode="wait" initial={false}>
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

            <BottomNav onOpenMore={() => setIsDrawerOpen(true)} />
            <AppDrawer
                open={isDrawerOpen}
                onClose={() => setIsDrawerOpen(false)}
                onOpenFind={() => setIsOpenFind(true)}
                language={language}
                onChangeLanguage={(lang) => i18n.changeLanguage(lang)}
            />

            <Dialog open={isOpenFind} onClose={() => setIsOpenFind(false)} title={t("home.find_booking_no")}>
                <SearchBookingNumber onOpenChangeFind={() => setIsOpenFind(false)} />
            </Dialog>
        </div>
    )
}

export default AppLayout
