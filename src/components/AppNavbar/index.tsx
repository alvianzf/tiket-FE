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
                base: "bg-transparent",
                content: "gap-1"
            }}>
                <NavbarBrand onClick={() => push('/')}>
                    <Logo />
                </NavbarBrand>
                <NavbarContent justify="end">
                    <Dropdown className="w-fit min-w-fit">
                        <NavbarItem>
                            <DropdownTrigger>
                                <Button
                                    disableRipple
                                    className="bg-transparent data-[hover=true]:bg-transparent text-white min-w-fit"                   
                                    radius="sm"
                                    variant="light"
                                >
                                    {language === 'id' ? 
                                        (
                                            <ReactCountryFlag countryCode="ID" svg/>
                                        ) : (
                                            <ReactCountryFlag countryCode="US" svg/>
                                        )
                                    }
                                </Button>
                            </DropdownTrigger>
                        </NavbarItem>
                        <DropdownMenu
                            aria-label="ACME features"
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
                        <Button variant="light" className="text-white" onClick={onOpenFind}>
                            {t('home.find_booking_no')}
                        </Button>
                    </NavbarItem>
                    {/* <NavbarItem className="lg:flex">
                        <Button variant="light" className="text-white" onClick={onOpenLogin}>
                            {t('profile.login')}
                        </Button>
                    </NavbarItem>
                    <NavbarItem>
                        <Button variant="flat" className="btn-register" onClick={onOpenRegister}>
                            {t('profile.register')}
                        </Button>
                    </NavbarItem> */}
                    {/* <Dropdown className="w-fit min-w-fit">
                        <NavbarItem>
                            <DropdownTrigger>
                                <Button
                                    disableRipple
                                    className="bg-transparent data-[hover=true]:bg-transparent text-white min-w-fit"                   
                                    radius="sm"
                                    variant="light"
                                >
                                    {t('profile.title')}
                                </Button>
                            </DropdownTrigger>
                        </NavbarItem>
                        <DropdownMenu
                            aria-label="ACME features"
                            className="w-fit"
                            itemClasses={{
                                base: "gap-2",
                            }}
                        >
                            <DropdownItem
                                key="changeprofile"
                                onClick={() => push('/profile/change')}
                                startContent={<IconProfile width={14} height={14}/>}
                            >
                                {t('profile.change_profile')}
                            </DropdownItem>
                            <DropdownItem
                                key="purchase"
                                onClick={() => push('/profile/purchases')}
                                startContent={<IconReceipt width={14} height={14} />}
                            >
                                {t('profile.purchase_title')}
                            </DropdownItem>
                            <DropdownItem
                                key="order"
                                onClick={() => push('/profile/orders')}
                                startContent={<IconReceipt width={14} height={14} />}
                            >
                                {t('profile.order_title')}
                            </DropdownItem>
                            <DropdownItem
                                key="logout"
                                startContent={<IconLogout width={14} height={14} />}
                            >
                                {t('profile.logout')}
                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown> */}
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
                                <SearchBookingNumber />
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    )
}

export default AppNavbar