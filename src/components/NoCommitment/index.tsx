import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { UserX, Ban, Lock, MailX, Sparkles } from "lucide-react";

// Rebuilt from scratch — same real content (no-signup booking value props +
// AI assistant promo) in a fresh layout: a diagonal-accented message panel
// instead of the old photo-backed card, a 2x2 value grid, and a trimmed-down
// AI promo banner. Shared across Home and Ferry pages.
const NoCommitment = () => {
    const { t } = useTranslation();

    const features = [
        { title: t("home.no_signups_title"), desc: t("home.no_signups_desc"), icon: UserX },
        { title: t("home.zero_commitment_title"), desc: t("home.zero_commitment_desc"), icon: Ban },
        { title: t("home.privacy_first_title"), desc: t("home.privacy_first_desc"), icon: Lock },
        { title: t("home.spam_free_title"), desc: t("home.spam_free_desc"), icon: MailX },
    ];

    return (
        <section className="flex justify-center py-20 px-6">
            <div className="flex flex-col w-full max-w-[1200px] gap-6">
                <div className="grid lg:grid-cols-[1fr_1.3fr] gap-6 items-stretch">
                    <motion.div
                        initial={{ opacity: 0, x: -24 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="relative overflow-hidden rounded-ds-xl bg-gradient-to-br from-primary-dark via-primary to-secondary text-white p-8 lg:p-10 flex flex-col justify-center gap-4"
                    >
                        <div className="absolute -right-16 -top-16 w-56 h-56 bg-white/10 rounded-full" />
                        <div className="absolute -right-4 bottom-0 w-32 h-32 bg-orange-500/30 rounded-full blur-2xl" />
                        <span className="relative z-10 inline-flex items-center gap-1 self-start px-3 py-1 rounded-full bg-white/15 text-xs font-bold uppercase tracking-wide">
                            Fast-Track Booking
                        </span>
                        <h2 className="relative z-10 text-3xl lg:text-4xl font-extrabold leading-tight">{t("home.no_commitment_title")}</h2>
                        <p className="relative z-10 text-white/85 max-w-md">{t("home.no_commitment_subtitle")}</p>
                    </motion.div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {features.map((feature, i) => (
                            <motion.div
                                key={feature.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: i * 0.08 }}
                                className="surface-card p-6 flex flex-col gap-3"
                            >
                                <feature.icon size={24} className="text-primary" />
                                <h3 className="font-bold text-slate-800">{feature.title}</h3>
                                <p className="text-sm text-slate-500 leading-relaxed">{feature.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="rounded-ds-xl bg-slate-900 text-white p-8 flex flex-col sm:flex-row items-center gap-6 justify-between"
                >
                    <div className="flex items-start gap-3">
                        <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-orange-500 to-secondary flex items-center justify-center shrink-0">
                            <Sparkles size={20} className="text-white" />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold">{t("home.ai_integration_title")}</h3>
                            <p className="text-slate-400 text-sm mt-1 max-w-lg">{t("home.ai_integration_desc")}</p>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2 shrink-0">
                        <span className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-full text-xs font-mono text-slate-300">
                            &quot;{t("home.ai_integration_example_1")}&quot;
                        </span>
                        <span className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-full text-xs font-mono text-slate-300">
                            &quot;{t("home.ai_integration_example_2")}&quot;
                        </span>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default NoCommitment;
