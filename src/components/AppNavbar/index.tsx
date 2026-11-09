import SearchBookingNumber from "@components/SearchBookingNumber";
import Logo from "@icons/Logo";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import { Menu as MenuIcon } from "lucide-react";
import { useRouter } from "next/router";
import Link from "next/link";
import { useState } from "react";
import ReactCountryFlag from "react-country-flag";
import { useTranslation } from "react-i18next";

const modalBodySx = { display: "flex", flexDirection: "column", gap: 1.5, pb: 3 } as const;

interface Props {
    onOpenDrawer: () => void;
}

// Top header: a slim logo + burger bar on mobile (primary nav lives in
// BottomNav, secondary nav behind the burger's AppDrawer), a full
// horizontal nav bar on desktop (lg+), where there's room for everything.
const AppNavbar = ({ onOpenDrawer }: Props) => {
    const { t, i18n } = useTranslation();

    const [isOpenFind, setIsOpenFind] = useState(false);
    const [langAnchorEl, setLangAnchorEl] = useState<null | HTMLElement>(null);
    const language = i18n.language === "en" ? "en" : "id";

    const { pathname } = useRouter();

    const isFlightActive = pathname === "/";
    const isFerryActive = pathname.startsWith("/ferry");
    const isCarRentalActive = pathname.startsWith("/car-rental");
    const isItineraryActive = pathname.startsWith("/itinerary");
    const isHotelsActive = pathname.startsWith("/hotels");
    const isActivitiesActive = pathname.startsWith("/activities");

    const onHandleChangeLanguage = (lang: "id" | "en") => {
        i18n.changeLanguage(lang);
        setLangAnchorEl(null);
    };

    const menuItems = [
        { label: t("home.flight"), href: "/", isActive: isFlightActive },
        { label: t("home.ferry"), href: "/ferry", isActive: isFerryActive },
        { label: t("home.car_rental"), href: "/car-rental", isActive: isCarRentalActive },
        { label: t("home.itinerary"), href: "/itinerary", isActive: isItineraryActive },
        { label: t("home.hotels", "Hotels"), href: "/hotels", isActive: isHotelsActive },
        { label: t("home.activities", "Activities"), href: "/activities", isActive: isActivitiesActive },
    ];

    return (
        <>
            <AppBar position="static" elevation={0} sx={{ background: "transparent", boxShadow: "none", zIndex: 999 }}>
                <Toolbar disableGutters sx={{ width: "100%", maxWidth: "1200px", mx: "auto", px: { xs: 2, sm: 3 }, minHeight: { xs: 56, lg: 72 }, gap: 2 }}>
                    <Link href="/" className="flex items-center">
                        <Logo className="h-7 lg:h-9 w-auto" />
                    </Link>

                    {/* Desktop nav links */}
                    <div className="hidden lg:flex flex-1 items-center justify-center gap-1">
                        {menuItems.map((item) => (
                            <Button
                                key={item.label}
                                component={Link}
                                href={item.href}
                                sx={{
                                    fontWeight: 600,
                                    borderRadius: "8px",
                                    whiteSpace: "nowrap",
                                    color: item.isActive ? "#fff" : "rgba(255,255,255,0.78)",
                                    backgroundColor: item.isActive ? "rgba(255,255,255,0.16)" : "transparent",
                                    "&:hover": { backgroundColor: "rgba(255,255,255,0.12)", color: "#fff" },
                                }}
                            >
                                {item.label}
                            </Button>
                        ))}
                    </div>

                    {/* Desktop actions */}
                    <div className="hidden lg:flex items-center gap-3 ml-auto">
                        <Button
                            onClick={() => setIsOpenFind(true)}
                            sx={{
                                fontWeight: 500,
                                color: "#fff",
                                backgroundColor: "rgba(255,255,255,0.1)",
                                border: "1px solid rgba(255,255,255,0.2)",
                                "&:hover": { backgroundColor: "rgba(255,255,255,0.2)" },
                            }}
                        >
                            {t("common.find_booking")}
                        </Button>

                        <IconButton
                            disableRipple
                            aria-label="Language switcher"
                            onClick={(e) => setLangAnchorEl(e.currentTarget)}
                            sx={{ backgroundColor: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)" }}
                        >
                            <ReactCountryFlag countryCode={language === "id" ? "ID" : "GB"} svg className="rounded-full w-6 h-6 object-cover" />
                        </IconButton>
                        <Menu anchorEl={langAnchorEl} open={Boolean(langAnchorEl)} onClose={() => setLangAnchorEl(null)}>
                            <MenuItem onClick={() => onHandleChangeLanguage(language === "id" ? "en" : "id")}>
                                <ReactCountryFlag countryCode={language === "id" ? "GB" : "ID"} svg className="rounded-full w-5 h-5 object-cover mr-2" />
                                {language === "id" ? "English" : "Indonesia"}
                            </MenuItem>
                        </Menu>

                        <Button
                            variant="contained"
                            color="warning"
                            component="a"
                            href="https://dashboard.tiketq.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            sx={{ px: 4 }}
                        >
                            {t("profile.login")}
                        </Button>

                        <Link href="/history" className="flex items-center font-semibold text-white/80 hover:text-white text-sm transition-colors">
                            {t("common.my_bookings")}
                        </Link>
                    </div>

                    {/* Mobile burger */}
                    <IconButton
                        aria-label="Open menu"
                        onClick={onOpenDrawer}
                        className="lg:hidden ml-auto"
                        sx={{ color: "#fff" }}
                    >
                        <MenuIcon size={22} />
                    </IconButton>
                </Toolbar>
            </AppBar>

            <Dialog open={isOpenFind} onClose={() => setIsOpenFind(false)} fullWidth maxWidth="xs">
                <DialogTitle>{t("home.find_booking_no")}</DialogTitle>
                <DialogContent sx={modalBodySx}>
                    <SearchBookingNumber onOpenChangeFind={() => setIsOpenFind(false)} />
                </DialogContent>
            </Dialog>
        </>
    );
};

export default AppNavbar;
