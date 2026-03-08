import LoginForm from "@components/LoginForm";
import RegisterForm from "@components/RegisterForm";
import SearchBookingNumber from "@components/SearchBookingNumber";
// import IconLogout from "@icons/IconLogout";
// import IconProfile from "@icons/IconProfile";
// import IconReceipt from "@icons/IconReceipt";
import Logo from "@icons/Logo";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Button, Modal, ModalContent, ModalHeader, ModalBody, useDisclosure, DropdownTrigger, DropdownMenu, Dropdown, DropdownItem} from "@nextui-org/react";
import { useRouter } from "next/router";
// import { useRouter } from "next/router";
import { useState } from "react";
import ReactCountryFlag from "react-country-flag";
import { useTranslation } from "react-i18next";

const AppNavbar = () => {

    const { t, i18n } = useTranslation();

    const [language, setLanguage] = useState<'id' | 'en'>('id');

    const { isOpen: isOpenLogin, onOpen: onOpenLogin, onOpenChange: onOpenChangeLogin } = useDisclosure();

    const { isOpen: isOpenRegister, onOpenChange: onOpenChangeRegister } = useDisclosure();

    const { isOpen: isOpenFind, onOpen: onOpenFind, onOpenChange: onOpenChangeFind } = useDisclosure();


    const { push } = useRouter();

    const onHandleChangeLanguage = (lang: 'id' | 'en') => {
        i18n.changeLanguage(lang)
        setLanguage(lang)
    }

    return (
        <>
            <Navbar isBlurred={false} maxWidth="xl" classNames={{
                base: "bg-[#3C9DFF]",
                content: "gap-4",
                item: "data-[active=true]:text-white",
                wrapper: "px-6 py-2"
            }}>
                <NavbarBrand onClick={() => push('/')} className="cursor-pointer">
                    <Logo />
                </NavbarBrand>
                <NavbarContent justify="end">
                    <Dropdown className="glass-card shadow-xl border-white/20">
                        <NavbarItem>
                            <DropdownTrigger>
                                <Button
                                    disableRipple
                                    className="bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 text-slate-800 min-w-fit font-medium transition-all"                   
                                    radius="lg"
                                    variant="flat"
                                >
                                    {language === 'id' ? 
                                        (
                                            <ReactCountryFlag countryCode="ID" svg className="rounded-sm"/>
                                        ) : (
                                            <ReactCountryFlag countryCode="US" svg className="rounded-sm"/>
                                        )
                                    }
                                </Button>
                            </DropdownTrigger>
                        </NavbarItem>
                        <DropdownMenu
                            aria-label="Language"
                            className="w-fit"
                            itemClasses={{
                                base: "gap-2",
                            }}
                        >
                            {language === 'id' ? 
                                (
                                    <DropdownItem
                                        key="en"
                                        onClick={() => onHandleChangeLanguage('en')}
                                        startContent={<ReactCountryFlag countryCode="US" svg/>}
                                    >
                                        {'EN'}
                                    </DropdownItem>
                                ) : (
                                    <DropdownItem
                                        key="id"
                                        onClick={() => onHandleChangeLanguage('id')}
                                        startContent={<ReactCountryFlag countryCode="ID" svg/>}
                                    >
                                        {'ID'}
                                    </DropdownItem>
                                )
                            }
                        </DropdownMenu>
                    </Dropdown>

                    <NavbarItem>
                        <Button 
                            variant="flat" 
                            className="bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 text-slate-800 font-medium transition-all" 
                            onClick={onOpenFind}
                        >
                            {t('home.find_booking_no')}
                        </Button>
                    </NavbarItem>

                    <Dropdown className="glass-card shadow-xl border-white/20">
                        <NavbarItem>
                            <DropdownTrigger>
                                <Button
                                    disableRipple
                                    className="bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 text-slate-800 font-medium transition-all"
                                    radius="lg"
                                    variant="flat"
                                >
                                    {t('home.ferry_ticket')}
                                </Button>
                            </DropdownTrigger>
                        </NavbarItem>
                        <DropdownMenu aria-label="Ferry Features">
                            <DropdownItem
                                onClick={() => push('/ferry')}
                                className="hover:bg-orange-500 hover:text-white transition-colors"
                            >
                                {t('common.book')}
                            </DropdownItem>
                            <DropdownItem
                                onClick={() => push('/history')}
                                className="hover:bg-orange-500 hover:text-white transition-colors"
                            >
                                {t('common.find_booking')}
                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>

                    <NavbarItem>
                        <Button 
                            variant="flat" 
                            className="bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 text-slate-800 font-medium transition-all" 
                            onClick={() => push('/car-rent')}
                        >
                            {'Rental Mobil'}
                        </Button>
                    </NavbarItem>

                    <NavbarItem>
                        <Button 
                            variant="solid" 
                            className="bg-orange-500 text-white font-bold shadow-lg shadow-orange-500/30 hover:bg-orange-600 transition-all"
                            onClick={onOpenLogin}
                        >
                            {t('profile.login')}
                        </Button>
                    </NavbarItem>
                </NavbarContent>
            </Navbar>

            <Modal isOpen={isOpenLogin} onOpenChange={onOpenChangeLogin}>
                <ModalContent>
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

            <Modal isOpen={isOpenRegister} onOpenChange={onOpenChangeRegister}>
                <ModalContent>
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

            <Modal isOpen={isOpenFind} onOpenChange={onOpenChangeFind}>
                <ModalContent>
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