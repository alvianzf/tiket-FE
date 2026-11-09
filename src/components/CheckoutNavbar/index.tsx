import Logo from "@icons/Logo";

// Deliberately minimal — no nav links, no burger, no bottom tab bar — to
// avoid distracting the traveler mid-payment. Same solid header surface and
// logo treatment as AppNavbar so it reads as "the same app", not a
// different skin.
const CheckoutNavbar = () => {
    return (
        <div className="app-header flex items-center justify-center h-14 lg:h-16">
            <Logo className="h-7 lg:h-8 w-auto" />
        </div>
    );
};

export default CheckoutNavbar;
