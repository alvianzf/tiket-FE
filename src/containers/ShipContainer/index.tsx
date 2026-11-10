import FerryPartners from "@components/FerryPartners"
import PaymentPartners from "@components/PaymentPartners"
import SearchFerry from "@components/SearchFerry";
import WhyBook from "@components/WhyBook";
import NoCommitment from "@components/NoCommitment";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import HeroGlow from "@components/HeroGlow";

// This is the actual /ferry landing page linked from nav (not
// FerryFindContainer, which backs the unlinked /ferry/find route) —
// rebuilt from scratch to match the new shell, same pattern as Home/
// CarRent: gradient hero, decorative SVG, wave divider, solid trust strip.
const ShipContainer = () => {
    const { t } = useTranslation();

    return (
        <div className="flex flex-col min-h-screen">
            <section className="relative bg-gradient-to-br from-secondary-dark via-primary to-primary-dark pt-16 pb-32 px-6">
                <HeroGlow />
                <svg className="absolute top-12 right-[10%] w-24 h-24 text-white/15 hidden sm:block" viewBox="0 0 100 100" fill="none" aria-hidden="true">
                    <path d="M5 60 Q 50 90, 95 55" stroke="currentColor" strokeWidth="2" fill="none" />
                    <circle cx="95" cy="55" r="4" fill="currentColor" />
                </svg>

                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
                    className="relative flex flex-col items-center gap-8 max-w-[1100px] mx-auto"
                >
                    <div className="text-center max-w-2xl">
                        <span className="inline-block px-4 py-1.5 rounded-full bg-white/15 text-white text-xs font-bold tracking-wide uppercase mb-4">
                            {t("home.hero_badge")}
                        </span>
                        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">{t("home.service_ferry")}</h1>
                        <p className="text-white/80 mt-3 text-base sm:text-lg">{t("home.service_ferry_desc")}</p>
                    </div>
                    <SearchFerry />
                </motion.div>

                <svg className="absolute bottom-0 left-0 w-full h-16 text-[#f7f8fa]" viewBox="0 0 1440 80" preserveAspectRatio="none" aria-hidden="true">
                    <path fill="currentColor" d="M0 40 C 240 90, 480 0, 720 40 C 960 80, 1200 10, 1440 40 L1440 80 L0 80 Z" />
                </svg>
            </section>

            <div className="relative -mt-14 px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="surface-card max-w-[1100px] mx-auto px-6 sm:px-10 py-6 flex flex-col sm:flex-row items-center gap-8"
                >
                    <div className="flex-1 min-w-0">
                        <FerryPartners />
                    </div>
                    <div className="w-full h-px sm:w-px sm:h-16 bg-slate-100" />
                    <div className="flex-1 min-w-0">
                        <PaymentPartners />
                    </div>
                </motion.div>
            </div>

            <WhyBook />
            <NoCommitment />
        </div>
    )
}

export default ShipContainer
