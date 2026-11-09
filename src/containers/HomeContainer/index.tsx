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
            <section className="relative overflow-hidden bg-gradient-to-br from-primary-dark via-primary to-secondary pt-16 pb-28 px-6">
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
