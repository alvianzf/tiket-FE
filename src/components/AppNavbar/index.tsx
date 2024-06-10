import LoginForm from "@components/LoginForm";
import RegisterForm from "@components/RegisterForm";
import Logo from "@icons/Logo";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button, Modal, ModalContent, ModalHeader, ModalBody, useDisclosure} from "@nextui-org/react";
import { useTranslation } from "react-i18next";

const AppNavbar = () => {

    const { t } = useTranslation();

    const { isOpen: isOpenLogin, onOpen: onOpenLogin, onOpenChange: onOpenChangeLogin } = useDisclosure();

    const { isOpen: isOpenRegister, onOpen: onOpenRegister, onOpenChange: onOpenChangeRegister } = useDisclosure();


    return (
        <>
            <Navbar isBlurred={false} maxWidth="xl" classNames={{
                base: "bg-transparent"
            }}>
                <NavbarBrand>
                    <Logo />
                </NavbarBrand>
                <NavbarContent justify="end">
                    <NavbarItem className="lg:flex">
                        <Button variant="light" className="text-white" onClick={onOpenLogin}>
                            {t('profile.login')}
                        </Button>
                    </NavbarItem>
                    <NavbarItem>
                        <Button as={Link} href="#" variant="flat" className="btn-register" onClick={onOpenRegister}>
                            Register
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
        </>
    )
}

export default AppNavbar