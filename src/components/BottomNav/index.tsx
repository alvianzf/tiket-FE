import Link from "next/link";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import { Plane, Ship, Car, Map, Menu as MenuIcon } from "lucide-react";

interface Props {
    onOpenMore: () => void;
}

// Fixed mobile-only bottom tab bar — the "most important" client-facing
// destinations. Everything else lives behind "More" → AppDrawer.
const BottomNav = ({ onOpenMore }: Props) => {
    const { t } = useTranslation();
    const { pathname } = useRouter();

    const tabs = [
        { label: t("home.ferry"), href: "/", icon: Ship, isActive: pathname === "/" },
        { label: t("home.itinerary"), href: "/itinerary", icon: Map, isActive: pathname.startsWith("/itinerary") },
        { label: t("home.car_rental"), href: "/car-rental", icon: Car, isActive: pathname.startsWith("/car-rental") },
        { label: t("home.flight"), href: "/flight", icon: Plane, isActive: pathname.startsWith("/flight") },
    ];

    return (
        <nav className="bottom-nav lg:hidden flex items-stretch justify-around">
            {tabs.map((tab) => (
                <Link
                    key={tab.href}
                    href={tab.href}
                    className={`flex flex-1 flex-col items-center justify-center gap-0.5 text-[11px] font-semibold transition-colors ${
                        tab.isActive ? "text-primary" : "text-slate-400"
                    }`}
                >
                    <tab.icon size={20} strokeWidth={tab.isActive ? 2.5 : 2} />
                    {tab.label}
                </Link>
            ))}
            <button
                onClick={onOpenMore}
                className="flex flex-1 flex-col items-center justify-center gap-0.5 text-[11px] font-semibold text-slate-400"
            >
                <MenuIcon size={20} />
                {t("common.more", "More")}
            </button>
        </nav>
    );
};

export default BottomNav;
