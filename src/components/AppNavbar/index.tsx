import LoginForm from "@components/LoginForm";
import RegisterForm from "@components/RegisterForm";
import SearchBookingNumber from "@components/SearchBookingNumber";
// import IconLogout from "@icons/IconLogout";
// import IconProfile from "@icons/IconProfile";
// import IconReceipt from "@icons/IconReceipt";
import Logo from "@icons/Logo";
import { 
    Navbar, 
    NavbarBrand, 
    NavbarContent, 
    NavbarItem, 
    Button, 
    Modal, 
    ModalContent, 
    ModalHeader, 
    ModalBody, 
    useDisclosure, 
    DropdownTrigger, 
    DropdownMenu, 
    Dropdown, 
    DropdownItem,
    NavbarMenuToggle,
    NavbarMenu,
    NavbarMenuItem
} from "@nextui-org/react";
import { useRouter } from "next/router";
// import { useRouter } from "next/router";
import { useState } from "react";
import ReactCountryFlag from "react-country-flag";
import { useTranslation } from "react-i18next";

const AppNavbar = () => {

    const { t, i18n } = useTranslation();

    const [language, setLanguage] = useState<'id' | 'en'>('id');
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const { isOpen: isOpenLogin, onOpen: onOpenLogin, onOpenChange: onOpenChangeLogin } = useDisclosure();

    const { isOpen: isOpenRegister, onOpenChange: onOpenChangeRegister } = useDisclosure();

    const { isOpen: isOpenFind, onOpen: onOpenFind, onOpenChange: onOpenChangeFind } = useDisclosure();


    const { push, pathname } = useRouter();

    const isFlightActive = pathname === '/';
    const isFerryActive = pathname.startsWith('/ferry');
    const isCarRentalActive = pathname.startsWith('/car-rental');

    const onHandleChangeLanguage = (lang: 'id' | 'en') => {
        i18n.changeLanguage(lang)
        setLanguage(lang)
    }

    const menuItems = [
        { label: t('home.flight'), href: '/', isActive: isFlightActive },
        { label: t('home.ferry'), href: '/ferry', isActive: isFerryActive },
        { label: t('home.car_rental'), href: '/car-rental', isActive: isCarRentalActive },
    ];

    return (
        <>
            <Navbar 
                isBlurred={false} 
                maxWidth="xl" 
                isMenuOpen={isMenuOpen}
                onMenuOpenChange={setIsMenuOpen}
                classNames={{
                    base: "bg-[#4267B2]",
                    content: "gap-4",
                    item: "data-[active=true]:text-white",
                    wrapper: "px-6 py-2"
                }}
            >
                {/* Mobile Menu Toggle */}
                <NavbarContent className="lg:hidden" justify="start">
                    <NavbarMenuToggle aria-label={isMenuOpen ? "Close menu" : "Open menu"} className="text-white" />
                </NavbarContent>

                {/* Logo - Desktop & Mobile */}
                <NavbarContent className="hidden lg:flex" justify="start">
                    <NavbarBrand onClick={() => push('/')} className="cursor-pointer">
                        <Logo />
                    </NavbarBrand>
                </NavbarContent>

                <NavbarContent className="lg:hidden pr-3" justify="center">
                    <NavbarBrand onClick={() => push('/')} className="cursor-pointer">
                        <Logo />
                    </NavbarBrand>
                </NavbarContent>

                {/* Desktop Menu */}
                <NavbarContent className="hidden lg:flex gap-4" justify="center">
                    {menuItems.map((item) => (
                        <NavbarItem key={item.label} isActive={item.isActive}>
                            <Button 
                                variant="flat" 
                                className={`font-medium transition-all border-none ${
                                    item.isActive 
                                    ? "bg-white/20 text-white shadow-inner" 
                                    : "bg-transparent text-white/80 hover:bg-white/10 hover:text-white"
                                }`}
                                onPress={() => push(item.href)}
                            >
                                {item.label}
                            </Button>
                        </NavbarItem>
                    ))}
                </NavbarContent>

                {/* Desktop Actions */}
                <NavbarContent justify="end" className="hidden lg:flex">
                    <NavbarItem>
                        <Button 
                            variant="flat" 
                            className="bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 text-white font-medium transition-all" 
                            onPress={onOpenFind}
                        >
                            {t('common.find_booking')}
                        </Button>
                    </NavbarItem>

                    <Dropdown className="pill-dropdown glass-card shadow-xl border-white/20 min-w-0 w-fit">
                        <NavbarItem>
                            <DropdownTrigger>
                                <Button
                                    disableRipple
                                    className="bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 text-white min-w-fit font-medium transition-all"                   
                                    radius="full"
                                    variant="flat"
                                    isIconOnly
                                >
                                    {language === 'id' ? 
                                        (
                                            <ReactCountryFlag countryCode="ID" svg className="rounded-full w-6 h-6 object-cover"/>
                                        ) : (
                                            <ReactCountryFlag countryCode="GB" svg className="rounded-full w-6 h-6 object-cover"/>
                                        )
                                    }
                                </Button>
                            </DropdownTrigger>
                        </NavbarItem>
                        <DropdownMenu
                            aria-label="LanguageSwitcher"
                            className="w-[50px] min-w-0 p-0"
                            itemClasses={{
                                base: "flex justify-center p-2 rounded-none",
                            }}
                        >
                            {language === 'id' ? 
                                (
                                    <DropdownItem
                                        key="en"
                                        className="p-1 min-w-0"
                                        onPress={() => onHandleChangeLanguage('en')}
                                    >
                                        <div className="flex justify-center w-full">
                                            <ReactCountryFlag countryCode="GB" svg className="rounded-full w-6 h-6 object-cover"/>
                                        </div>
                                    </DropdownItem>
                                ) : (
                                    <DropdownItem
                                        key="id"
                                        className="p-1 min-w-0"
                                        onPress={() => onHandleChangeLanguage('id')}
                                    >
                                        <div className="flex justify-center w-full">
                                            <ReactCountryFlag countryCode="ID" svg className="rounded-full w-6 h-6 object-cover"/>
                                        </div>
                                    </DropdownItem>
                                )
                            }
                        </DropdownMenu>
                    </Dropdown>

                    <NavbarItem>
                        <Button 
                            variant="solid" 
                            className="bg-[#ff5a00] text-white font-bold shadow-lg hover:bg-[#e65100] transition-all px-6"
                            onPress={onOpenLogin}
                        >
                            {t('profile.login')}
                        </Button>
                    </NavbarItem>
                </NavbarContent>

                {/* Mobile Menu Content */}
                <NavbarMenu className="bg-[#4267B2]/95 backdrop-blur-md pt-6 gap-4">
                    {menuItems.map((item, index) => (
                        <NavbarMenuItem key={`${item.label}-${index}`}>
                            <Button
                                fullWidth
                                className={`justify-start text-lg font-semibold h-14 ${
                                    item.isActive ? "bg-white/20 text-white" : "bg-transparent text-white/80"
                                }`}
                                variant="flat"
                                onPress={() => {
                                    push(item.href);
                                    setIsMenuOpen(false);
                                }}
                            >
                                {item.label}
                            </Button>
                        </NavbarMenuItem>
                    ))}
                    <div className="h-px bg-white/20 my-2" />
                    <NavbarMenuItem>
                        <Button 
                            fullWidth
                            variant="flat" 
                            className="bg-white/10 text-white font-medium h-14 justify-start text-lg" 
                            onPress={() => {
                                onOpenFind();
                                setIsMenuOpen(false);
                            }}
                        >
                            {t('common.find_booking')}
                        </Button>
                    </NavbarMenuItem>
                    <NavbarMenuItem>
                        <div className="flex gap-4 items-center p-2">
                            <p className="text-white/60 font-medium">{t('common.language')}</p>
                            <Button
                                className={`min-w-fit h-12 rounded-xl transition-all ${language === 'id' ? 'bg-white/20 border-white/40' : 'bg-transparent'}`}
                                variant="flat"
                                isIconOnly
                                onPress={() => onHandleChangeLanguage('id')}
                            >
                                <ReactCountryFlag countryCode="ID" svg className="rounded-full w-6 h-6 object-cover"/>
                            </Button>
                            <Button
                                className={`min-w-fit h-12 rounded-xl transition-all ${language === 'en' ? 'bg-white/20 border-white/40' : 'bg-transparent'}`}
                                variant="flat"
                                isIconOnly
                                onPress={() => onHandleChangeLanguage('en')}
                            >
                                <ReactCountryFlag countryCode="GB" svg className="rounded-full w-6 h-6 object-cover"/>
                            </Button>
                        </div>
                    </NavbarMenuItem>
                    <NavbarMenuItem className="mt-4">
                        <Button 
                            fullWidth
                            variant="solid" 
                            className="bg-[#ff5a00] text-white font-bold h-14 text-xl shadow-lg"
                            onPress={() => {
                                onOpenLogin();
                                setIsMenuOpen(false);
                            }}
                        >
                            {t('profile.login')}
                        </Button>
                    </NavbarMenuItem>
                </NavbarMenu>
            </Navbar>

            <Modal 
                isOpen={isOpenLogin} 
                onOpenChange={onOpenChangeLogin}
                backdrop="blur"
                classNames={{
                    backdrop: "bg-black/30 backdrop-blur-sm",
                }}
            >
                <ModalContent className="glass-card border-white/75 bg-white/75 backdrop-blur-2xl shadow-2xl">
                    {() => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">{t('profile.login')}</ModalHeader>
                            <ModalBody>
                                <LoginForm />
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>

            <Modal 
                isOpen={isOpenRegister} 
                onOpenChange={onOpenChangeRegister}
                backdrop="blur"
                classNames={{
                    backdrop: "bg-black/30 backdrop-blur-sm",
                }}
            >
                <ModalContent className="glass-card border-white/75 bg-white/75 backdrop-blur-2xl shadow-2xl">
                    {() => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">{t('profile.register')}</ModalHeader>
                            <ModalBody>
                                <RegisterForm onOpenLogin={onOpenLogin}/>
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>

            <Modal 
                isOpen={isOpenFind} 
                onOpenChange={onOpenChangeFind}
                backdrop="blur"
                classNames={{
                    backdrop: "bg-black/30 backdrop-blur-sm",
                }}
            >
                <ModalContent className="glass-card border-white/75 bg-white/75 backdrop-blur-2xl shadow-2xl">
                    {() => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">{t('home.find_booking_no')}</ModalHeader>
                            <ModalBody>
                                <SearchBookingNumber onOpenChangeFind={onOpenChangeFind}/>
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    )
}

export default AppNavbar