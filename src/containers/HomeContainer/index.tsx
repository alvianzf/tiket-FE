import AirlinesPartners from "@components/AirlinesPartners"
import PaymentPartners from "@components/PaymentPartners"
import SearchFlight from "@components/SearchFlight";
import WhyBook from "@components/WhyBook";
import NoCommitment from "@components/NoCommitment";
import ConciergeServices from "@components/ConciergeServices";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

// Rebuilt from scratch: a bold gradient hero (no stock photo) that leans on
// the brand colors + AnimatedBackground instead, a cleaner trust strip, and
// the WhyBook/NoCommitment/ConciergeServices sections below it (each
// rebuilt separately — see their own files).
const HomeContainer = () => {
    const { t } = useTranslation();

    return (
        <>
            <section className="relative overflow-hidden bg-gradient-to-br from-primary-dark via-primary to-secondary pt-16 pb-32 px-6">
                {/* Decorative motifs — plane trail + island dots, on-brand "adventurous" touches */}
                <svg className="absolute top-10 left-[6%] w-24 h-24 text-white/15 hidden sm:block" viewBox="0 0 100 100" fill="none" aria-hidden="true">
                    <path d="M10 70 Q 40 20, 90 15" stroke="currentColor" strokeWidth="2" strokeDasharray="4 6" fill="none" />
                    <path d="M82 8 L95 14 L83 22 L85 14 Z" fill="currentColor" />
                </svg>
                <svg className="absolute bottom-16 right-[8%] w-20 h-20 text-white/10 hidden sm:block" viewBox="0 0 100 100" aria-hidden="true">
                    <circle cx="20" cy="70" r="6" fill="currentColor" />
                    <circle cx="45" cy="80" r="10" fill="currentColor" />
                    <circle cx="75" cy="65" r="5" fill="currentColor" />
                </svg>

                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
                    className="relative z-10 flex flex-col items-center gap-8 max-w-[1100px] mx-auto"
                >
                    <div className="text-center max-w-2xl">
                        <span className="inline-block px-4 py-1.5 rounded-full bg-white/15 text-white text-xs font-bold tracking-wide uppercase mb-4">
                            {t("home.hero_badge")}
                        </span>
                        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">{t("home.hero_title")}</h1>
                        <p className="text-white/80 mt-3 text-base sm:text-lg">{t("home.hero_subtitle")}</p>
                    </div>
                    <SearchFlight />
                </motion.div>

                {/* Wave divider into the page background */}
                <svg className="absolute bottom-0 left-0 w-full h-16 text-[#f7f8fa]" viewBox="0 0 1440 80" preserveAspectRatio="none" aria-hidden="true">
                    <path fill="currentColor" d="M0 40 C 240 90, 480 0, 720 40 C 960 80, 1200 10, 1440 40 L1440 80 L0 80 Z" />
                </svg>
            </section>

            <div className="relative -mt-14 z-10 px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="surface-card max-w-[1100px] mx-auto px-6 sm:px-10 py-6 flex flex-col sm:flex-row items-center gap-8"
                >
                    <div className="flex-1 min-w-0">
                        <AirlinesPartners />
                    </div>
                    <div className="w-full h-px sm:w-px sm:h-16 bg-slate-100" />
                    <div className="flex-1 min-w-0">
                        <PaymentPartners />
                    </div>
                </motion.div>
            </div>

            <ConciergeServices />
            <WhyBook />
            <NoCommitment />
        </>
    )
}

export default HomeContainer
