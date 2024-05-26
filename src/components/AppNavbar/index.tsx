import Logo from "@icons/Logo";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button} from "@nextui-org/react";

const AppNavbar = () => {

    return (
        <Navbar>
            <NavbarBrand>
                <Logo />
            </NavbarBrand>
            <NavbarContent justify="end">
                <NavbarItem className="lg:flex">
                    <Link href="#">Login</Link>
                </NavbarItem>
                <NavbarItem>
                    <Button as={Link} href="#" variant="flat" className="btn-register">
                        Register
                    </Button>
                </NavbarItem>
            </NavbarContent>
        </Navbar>
    )
}

export default AppNavbar