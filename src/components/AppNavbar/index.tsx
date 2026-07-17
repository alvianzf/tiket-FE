import LoginForm from "@components/LoginForm";
import RegisterForm from "@components/RegisterForm";
import SearchBookingNumber from "@components/SearchBookingNumber";
// import IconLogout from "@icons/IconLogout";
// import IconProfile from "@icons/IconProfile";
// import IconReceipt from "@icons/IconReceipt";
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
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { useRouter } from "next/router";
import Link from "next/link";
import { useState, useEffect } from "react";
import ReactCountryFlag from "react-country-flag";
import { useTranslation } from "react-i18next";

// Shared glass styling for the three modals (parity with the old
// `glass-card border-white/75 bg-white/75 backdrop-blur-2xl shadow-2xl` + blurred backdrop).
const modalSlotProps = {
    paper: {
        sx: {
            background: "rgba(255,255,255,0.75)",
            backdropFilter: "blur(40px)",
            WebkitBackdropFilter: "blur(40px)",
            border: "1px solid rgba(255,255,255,0.75)",
            boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)",
        },
    },
    backdrop: {
        sx: {
            backgroundColor: "rgba(0,0,0,0.3)",
            backdropFilter: "blur(4px)",
            WebkitBackdropFilter: "blur(4px)",
        },
    },
} as const;

const modalBodySx = { display: "flex", flexDirection: "column", gap: 1.5, pb: 3 } as const;

const AppNavbar = () => {

    const { t, i18n } = useTranslation();

    const [language, setLanguage] = useState<'id' | 'en'>('id');
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const [isOpenLogin, setIsOpenLogin] = useState(false);

    const [isOpenRegister, setIsOpenRegister] = useState(false);

    const [isOpenFind, setIsOpenFind] = useState(false);

    const [langAnchorEl, setLangAnchorEl] = useState<null | HTMLElement>(null);


    const { pathname } = useRouter();

    const isFlightActive = pathname === '/';
    const isFerryActive = pathname.startsWith('/ferry');
    const isCarRentalActive = pathname.startsWith('/car-rental');
    const isHistoryActive = pathname.startsWith('/history');

    useEffect(() => {
        setIsMenuOpen(false);
    }, [pathname]);

    const onHandleChangeLanguage = (lang: 'id' | 'en') => {
        i18n.changeLanguage(lang)
        setLanguage(lang)
    }

    const menuItems = [
        { label: t('home.flight'), href: '/', isActive: isFlightActive },
        { label: t('home.ferry'), href: '/ferry', isActive: isFerryActive },
        { label: t('home.car_rental'), href: '/car-rental', isActive: isCarRentalActive },
        { label: t('common.my_bookings', 'My Bookings'), href: '/history', isActive: isHistoryActive },
    ];

    return (
        <>
            <AppBar
                position="static"
                elevation={0}
                sx={{
                    // The `.glass-navbar` wrapper in AppLayout supplies the primary
                    // background; keep the AppBar itself transparent. The old NextUI
                    // navbar also added a `shadow-lg` — keep that here.
                    background: "transparent",
                    border: "none",
                    boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
                    zIndex: 999,
                }}
            >
                <Toolbar
                    disableGutters
                    sx={{ position: "relative", width: "100%", maxWidth: "1200px", mx: "auto", px: 3, py: 1, minHeight: 64, gap: 2 }}
                >
                    {/* Mobile Menu Toggle */}
                    <div className="flex flex-1 items-center lg:hidden relative z-20">
                        <IconButton
                            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                            onClick={() => setIsMenuOpen((open) => !open)}
                            className="relative z-30"
                            sx={{ color: "#fff" }}
                        >
                            {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
                        </IconButton>
                    </div>

                    {/* Mobile Logo centered absolutely */}
                    <div className="absolute left-1/2 -translate-x-1/2 lg:hidden z-10 py-2 flex items-center h-full">
                        <Link href="/" className="flex items-center">
                            <div className="cursor-pointer flex items-center">
                                <Logo />
                            </div>
                        </Link>
                    </div>

                    {/* Logo - Desktop */}
                    <div className="hidden lg:flex flex-1 items-center justify-start">
                        <Link href="/" className="flex items-center">
                            <div className="cursor-pointer flex items-center">
                                <Logo />
                            </div>
                        </Link>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden lg:flex flex-1 items-center justify-center gap-4">
                        {menuItems.map((item) => (
                            <Button
                                key={item.label}
                                component={Link}
                                href={item.href}
                                sx={{
                                    fontWeight: 600,
                                    borderRadius: "8px",
                                    whiteSpace: "nowrap",
                                    transition: "all .2s ease",
                                    color: item.isActive ? "#fff" : "rgba(255,255,255,0.8)",
                                    backgroundColor: item.isActive ? "rgba(255,255,255,0.2)" : "transparent",
                                    boxShadow: item.isActive ? "inset 0 2px 4px 0 rgb(0 0 0 / 0.05)" : "none",
                                    "&:hover": {
                                        backgroundColor: item.isActive ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.15)",
                                        color: "#fff",
                                    },
                                }}
                            >
                                {item.label}
                            </Button>
                        ))}
                    </div>

                    {/* Desktop Actions */}
                    <div className="hidden lg:flex flex-1 items-center justify-end gap-4">
                        <Button
                            onClick={() => setIsOpenFind(true)}
                            sx={{
                                fontWeight: 500,
                                color: "#fff",
                                backgroundColor: "rgba(255,255,255,0.1)",
                                backdropFilter: "blur(12px)",
                                WebkitBackdropFilter: "blur(12px)",
                                border: "1px solid rgba(255,255,255,0.2)",
                                transition: "all .2s ease",
                                "&:hover": { backgroundColor: "rgba(255,255,255,0.2)" },
                            }}
                        >
                            {t('common.find_booking')}
                        </Button>

                        <IconButton
                            disableRipple
                            aria-label="LanguageSwitcher"
                            onClick={(e) => setLangAnchorEl(e.currentTarget)}
                            sx={{
                                backgroundColor: "rgba(255,255,255,0.1)",
                                backdropFilter: "blur(12px)",
                                WebkitBackdropFilter: "blur(12px)",
                                border: "1px solid rgba(255,255,255,0.2)",
                                transition: "all .2s ease",
                                "&:hover": { backgroundColor: "rgba(255,255,255,0.2)" },
                            }}
                        >
                            {language === 'id' ?
                                (
                                    <ReactCountryFlag countryCode="ID" svg className="rounded-full w-6 h-6 object-cover"/>
                                ) : (
                                    <ReactCountryFlag countryCode="GB" svg className="rounded-full w-6 h-6 object-cover"/>
                                )
                            }
                        </IconButton>
                        <Menu
                            anchorEl={langAnchorEl}
                            open={Boolean(langAnchorEl)}
                            onClose={() => setLangAnchorEl(null)}
                            slotProps={{ paper: { sx: { minWidth: 0, width: "fit-content" } } }}
                        >
                            <MenuItem
                                sx={{ justifyContent: "center", p: 1, minWidth: 0 }}
                                onClick={() => {
                                    onHandleChangeLanguage(language === 'id' ? 'en' : 'id');
                                    setLangAnchorEl(null);
                                }}
                            >
                                <div className="flex justify-center w-full">
                                    {language === 'id' ?
                                        (
                                            <ReactCountryFlag countryCode="GB" svg className="rounded-full w-6 h-6 object-cover"/>
                                        ) : (
                                            <ReactCountryFlag countryCode="ID" svg className="rounded-full w-6 h-6 object-cover"/>
                                        )
                                    }
                                </div>
                            </MenuItem>
                        </Menu>

                        <Button
                            variant="contained"
                            color="warning"
                            component="a"
                            href="https://dashboard.tiketq.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            sx={{ px: 4, fontWeight: 700 }}
                        >
                            {t('profile.login')}
                        </Button>
                    </div>
                </Toolbar>
            </AppBar>

            {/* Mobile Menu Content */}
            {isMenuOpen && (
                <div className="lg:hidden fixed inset-x-0 top-16 bottom-0 z-[998] bg-primary/95 backdrop-blur-md px-6 pt-6 pb-6 flex flex-col gap-4 overflow-y-auto">
                    {menuItems.map((item, index) => (
                        <Link
                            key={`${item.label}-${index}`}
                            href={item.href}
                            className={`flex items-center w-full px-5 text-lg font-semibold h-14 rounded-xl transition-all ${
                                item.isActive
                                ? "bg-white/20 text-white font-bold shadow-inner"
                                : "bg-transparent text-white/80 hover:bg-white/10"
                            }`}
                        >
                            {item.label}
                        </Link>
                    ))}
                    <div className="h-px bg-white/20 my-2" />
                    <Button
                        fullWidth
                        onClick={() => {
                            setIsOpenFind(true);
                            setIsMenuOpen(false);
                        }}
                        sx={{
                            justifyContent: "flex-start",
                            height: 56,
                            fontSize: "1.125rem",
                            fontWeight: 500,
                            color: "#fff",
                            backgroundColor: "rgba(255,255,255,0.1)",
                            "&:hover": { backgroundColor: "rgba(255,255,255,0.2)" },
                        }}
                    >
                        {t('common.find_booking')}
                    </Button>
                    <div className="flex gap-4 items-center p-2">
                        <p className="text-white/60 font-medium">{t('common.language')}</p>
                        <IconButton
                            onClick={() => onHandleChangeLanguage('id')}
                            sx={{
                                height: 48,
                                width: 48,
                                borderRadius: "12px",
                                transition: "all .2s ease",
                                backgroundColor: language === 'id' ? "rgba(255,255,255,0.2)" : "transparent",
                            }}
                        >
                            <ReactCountryFlag countryCode="ID" svg className="rounded-full w-6 h-6 object-cover"/>
                        </IconButton>
                        <IconButton
                            onClick={() => onHandleChangeLanguage('en')}
                            sx={{
                                height: 48,
                                width: 48,
                                borderRadius: "12px",
                                transition: "all .2s ease",
                                backgroundColor: language === 'en' ? "rgba(255,255,255,0.2)" : "transparent",
                            }}
                        >
                            <ReactCountryFlag countryCode="GB" svg className="rounded-full w-6 h-6 object-cover"/>
                        </IconButton>
                    </div>
                    <Button
                        fullWidth
                        variant="contained"
                        color="warning"
                        component="a"
                        href="https://dashboard.tiketq.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => setIsMenuOpen(false)}
                        sx={{ mt: 2, height: 56, fontSize: "1.25rem", fontWeight: 700 }}
                    >
                        {t('profile.login')}
                    </Button>
                </div>
            )}

            <Dialog
                open={isOpenLogin}
                onClose={() => setIsOpenLogin(false)}
                fullWidth
                maxWidth="xs"
                slotProps={modalSlotProps}
            >
                <DialogTitle>{t('profile.login')}</DialogTitle>
                <DialogContent sx={modalBodySx}>
                    <LoginForm />
                </DialogContent>
            </Dialog>

            <Dialog
                open={isOpenRegister}
                onClose={() => setIsOpenRegister(false)}
                fullWidth
                maxWidth="xs"
                slotProps={modalSlotProps}
            >
                <DialogTitle>{t('profile.register')}</DialogTitle>
                <DialogContent sx={modalBodySx}>
                    <RegisterForm onOpenLogin={() => setIsOpenLogin(true)}/>
                </DialogContent>
            </Dialog>

            <Dialog
                open={isOpenFind}
                onClose={() => setIsOpenFind(false)}
                fullWidth
                maxWidth="xs"
                slotProps={modalSlotProps}
            >
                <DialogTitle>{t('home.find_booking_no')}</DialogTitle>
                <DialogContent sx={modalBodySx}>
                    <SearchBookingNumber onOpenChangeFind={() => setIsOpenFind(false)}/>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default AppNavbar
