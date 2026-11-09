import Link from "next/link";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import Drawer from "@components/ui/Drawer";
import Button from "@components/ui/Button";
import { X, Receipt, Search, Globe } from "lucide-react";
import ReactCountryFlag from "react-country-flag";
import Logo from "@icons/Logo";

interface Props {
    open: boolean;
    onClose: () => void;
    onOpenFind: () => void;
    language: "id" | "en";
    onChangeLanguage: (lang: "id" | "en") => void;
}

// Secondary slide-in menu — "the rest" of the navigation, reached via the
// header burger or the bottom tab bar's "More" tab. Primary destinations
// (Flights/Ferry/ItinerQ/Driver) live in BottomNav on mobile and the top
// nav on desktop, so they aren't repeated here.
const AppDrawer = ({ open, onClose, onOpenFind, language, onChangeLanguage }: Props) => {
    const { t } = useTranslation();
    const { pathname } = useRouter();

    const links = [
        { label: t("common.my_bookings", "My Bookings"), href: "/history", icon: Receipt },
    ];

    return (
        <Drawer open={open} onClose={onClose}>
            <div className="flex flex-col h-full">
                <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
                    <Logo className="h-7 w-auto" />
                    <button onClick={onClose} aria-label="Close menu" className="text-slate-500 hover:text-slate-800">
                        <X size={20} />
                    </button>
                </div>

                <nav className="flex flex-col gap-1 p-3">
                    {links.map((link) => {
                        const isActive = pathname.startsWith(link.href);
                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={onClose}
                                className={`flex items-center gap-3 px-4 py-3 rounded-ds-sm font-semibold transition-colors ${
                                    isActive ? "bg-primary/10 text-primary" : "text-slate-700 hover:bg-slate-50"
                                }`}
                            >
                                <link.icon size={18} />
                                {link.label}
                            </Link>
                        );
                    })}
                    <button
                        onClick={() => {
                            onClose();
                            onOpenFind();
                        }}
                        className="flex items-center gap-3 px-4 py-3 rounded-ds-sm font-semibold text-slate-700 hover:bg-slate-50 text-left"
                    >
                        <Search size={18} />
                        {t("common.find_booking")}
                    </button>
                </nav>

                <div className="mt-auto p-5 border-t border-slate-100 flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                        <span className="flex items-center gap-2 text-sm font-semibold text-slate-500">
                            <Globe size={16} /> {t("common.language")}
                        </span>
                        <div className="flex gap-2">
                            <button
                                onClick={() => onChangeLanguage("id")}
                                className={`w-10 h-10 flex items-center justify-center rounded-lg ${language === "id" ? "bg-primary/10" : ""}`}
                            >
                                <ReactCountryFlag countryCode="ID" svg className="rounded-full w-5 h-5 object-cover" />
                            </button>
                            <button
                                onClick={() => onChangeLanguage("en")}
                                className={`w-10 h-10 flex items-center justify-center rounded-lg ${language === "en" ? "bg-primary/10" : ""}`}
                            >
                                <ReactCountryFlag countryCode="GB" svg className="rounded-full w-5 h-5 object-cover" />
                            </button>
                        </div>
                    </div>
                    <Button variant="cta" fullWidth href="https://dashboard.tiketq.com" target="_blank" rel="noopener noreferrer">
                        {t("profile.login")}
                    </Button>
                </div>
            </div>
        </Drawer>
    );
};

export default AppDrawer;
