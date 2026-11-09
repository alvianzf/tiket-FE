import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { ShieldCheck, Headset, Wallet } from "lucide-react";

// Rebuilt from scratch — bold gradient icon tiles instead of PNG icons,
// framer-motion stagger reveal, no MUI. Shared across Home and Ferry pages,
// so this one rewrite updates both consistently.
const WhyBook = () => {
    const { t } = useTranslation();

    const features = [
        { title: t("home.secure_transaction"), description: t("home.secure_transaction_description"), icon: ShieldCheck, gradient: "from-primary to-primary-light" },
        { title: t("home.assistance_and_support"), description: t("home.assistance_and_support_description"), icon: Headset, gradient: "from-secondary to-primary-light" },
        { title: t("home.various_payment_option"), description: t("home.various_payment_option_description"), icon: Wallet, gradient: "from-orange-500 to-orange-400" },
    ];

    return (
        <section className="flex justify-center py-20 px-6">
            <div className="flex flex-col w-full gap-12 max-w-[1200px]">
                <div className="text-center space-y-3">
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-800 tracking-tight">{t("home.why_book_title")}</h2>
                    <div className="w-16 h-1.5 bg-orange-500 mx-auto rounded-full" />
                </div>

                <div className="grid sm:grid-cols-3 gap-6">
                    {features.map((feature, i) => (
                        <motion.div
                            key={feature.title}
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                            className="surface-card p-8 text-center flex flex-col items-center gap-4"
                        >
                            <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center shadow-lg`}>
                                <feature.icon size={30} className="text-white" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-800">{feature.title}</h3>
                            <p className="text-slate-500 leading-relaxed">{feature.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default WhyBook;
