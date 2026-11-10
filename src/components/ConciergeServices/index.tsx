import Link from "next/link";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Plane, Ship, Car, Map } from "lucide-react";

const ConciergeServices = () => {
    const { t } = useTranslation();

    const services = [
        { title: t("home.service_ferry"), desc: t("home.service_ferry_desc"), href: "/", icon: Ship, color: "text-secondary bg-secondary/10" },
        { title: t("home.service_itinerary"), desc: t("home.service_itinerary_desc"), href: "/itinerary", icon: Map, color: "text-emerald-600 bg-emerald-500/10" },
        { title: t("home.service_driver"), desc: t("home.service_driver_desc"), href: "/car-rental", icon: Car, color: "text-orange-600 bg-orange-500/10" },
        { title: t("home.service_flight"), desc: t("home.service_flight_desc"), href: "/flight", icon: Plane, color: "text-primary bg-primary/10" },
    ];

    return (
        <div className="flex justify-center py-16 px-6 relative z-10">
            <div className="flex flex-col w-full gap-10 max-w-[1200px]">
                <h2 className="text-3xl font-bold text-slate-800 text-center tracking-tight">{t("home.services_title")}</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
                    {services.map((service, i) => (
                        <motion.div
                            key={service.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: i * 0.08 }}
                        >
                            <Link href={service.href} className="surface-card flex flex-col gap-3 p-5 h-full hover:-translate-y-1 transition-transform">
                                <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${service.color}`}>
                                    <service.icon size={22} />
                                </div>
                                <p className="font-bold text-slate-800">{service.title}</p>
                                <p className="text-sm text-slate-500">{service.desc}</p>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ConciergeServices;
