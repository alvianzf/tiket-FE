import SearchBookingNumber from "@components/SearchBookingNumber";
import Dialog from "@components/ui/Dialog";
import Logo from "@icons/Logo";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { Menu as MenuIcon, Search } from "lucide-react";
import { useRouter } from "next/router";
import Link from "next/link";
import { useState } from "react";
import ReactCountryFlag from "react-country-flag";
import { useTranslation } from "react-i18next";

interface Props {
    onOpenDrawer: () => void;
}

// Top header: a slim logo + burger bar on mobile (primary nav lives in
// BottomNav, secondary nav behind the burger's AppDrawer), a full
// horizontal nav bar on desktop (lg+), where there's room for everything.
// No MUI — plain Tailwind + Radix (dropdown) + framer-motion (via Button).
const AppNavbar = ({ onOpenDrawer }: Props) => {
    const { t, i18n } = useTranslation();
    const [isOpenFind, setIsOpenFind] = useState(false);
    const language = i18n.language === "en" ? "en" : "id";

    const { pathname } = useRouter();

    // Order reflects the Batam/MY/SG concierge focus: crossing the border
    // (Ferry) first, then planning (ItinerQ), getting around (Private
    // Driver), and flights last.
    const menuItems = [
        { label: t("home.ferry"), href: "/", isActive: pathname === "/" },
        { label: t("home.itinerary"), href: "/itinerary", isActive: pathname.startsWith("/itinerary") },
        { label: t("home.car_rental"), href: "/car-rental", isActive: pathname.startsWith("/car-rental") },
        { label: t("home.flight"), href: "/flight", isActive: pathname.startsWith("/flight") },
    ];

    return (
        <>
            <div className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 flex items-center gap-2 h-14 lg:h-[72px]">
                <Link href="/" className="flex items-center">
                    <Logo className="h-7 lg:h-9 w-auto" />
                </Link>

                {/* Desktop nav links */}
                <nav className="hidden lg:flex flex-1 items-center justify-center gap-1">
                    {menuItems.map((item) => (
                        <Link
                            key={item.label}
                            href={item.href}
                            className={`px-4 py-2 rounded-lg font-semibold whitespace-nowrap transition-colors ${
                                item.isActive ? "bg-white/15 text-white" : "text-white/75 hover:bg-white/10 hover:text-white"
                            }`}
                        >
                            {item.label}
                        </Link>
                    ))}
                </nav>

                {/* Desktop actions */}
                <div className="hidden lg:flex items-center gap-3 ml-auto">
                    <button
                        onClick={() => setIsOpenFind(true)}
                        className="flex items-center gap-2 px-4 h-10 rounded-lg font-medium text-white bg-white/10 border border-white/20 hover:bg-white/20 transition-colors"
                    >
                        <Search size={16} /> {t("common.find_booking")}
                    </button>

                    <DropdownMenu.Root>
                        <DropdownMenu.Trigger asChild>
                            <button
                                aria-label="Language switcher"
                                className="w-10 h-10 flex items-center justify-center rounded-lg bg-white/10 border border-white/20 hover:bg-white/20 transition-colors"
                            >
                                <ReactCountryFlag countryCode={language === "id" ? "ID" : "GB"} svg className="rounded-full w-6 h-6 object-cover" />
                            </button>
                        </DropdownMenu.Trigger>
                        <DropdownMenu.Portal>
                            <DropdownMenu.Content
                                align="end"
                                sideOffset={8}
                                className="bg-white rounded-xl shadow-xl border border-slate-100 p-1 min-w-[160px] z-[1100]"
                            >
                                <DropdownMenu.Item
                                    onSelect={() => i18n.changeLanguage(language === "id" ? "en" : "id")}
                                    className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 cursor-pointer outline-none"
                                >
                                    <ReactCountryFlag countryCode={language === "id" ? "GB" : "ID"} svg className="rounded-full w-5 h-5 object-cover" />
                                    {language === "id" ? "English" : "Indonesia"}
                                </DropdownMenu.Item>
                            </DropdownMenu.Content>
                        </DropdownMenu.Portal>
                    </DropdownMenu.Root>

                    <Link href="/history" className="font-semibold text-white/80 hover:text-white text-sm transition-colors whitespace-nowrap">
                        {t("common.my_bookings")}
                    </Link>
                </div>

                {/* Mobile burger */}
                <button
                    aria-label="Open menu"
                    onClick={onOpenDrawer}
                    className="lg:hidden ml-auto w-10 h-10 flex items-center justify-center text-white"
                >
                    <MenuIcon size={22} />
                </button>
            </div>

            <Dialog open={isOpenFind} onClose={() => setIsOpenFind(false)} title={t("home.find_booking_no")}>
                <SearchBookingNumber onOpenChangeFind={() => setIsOpenFind(false)} />
            </Dialog>
        </>
    );
};

export default AppNavbar;
