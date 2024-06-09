import { Card, CardBody, Tab, Tabs } from "@nextui-org/react"
import { useTranslation } from "react-i18next"
import CheckoutOrder from "./CheckoutOrder";

const Checkout = () => {

    const { t } = useTranslation();

    return (
        <Tabs aria-label="Options" variant="underlined" classNames={{
            cursor:"bg-[#ff5a00]",
            base: "justify-center"
        }}>
            <Tab key="order" title={t('checkout.order')}>
                <CheckoutOrder />
            </Tab>
            <Tab key="review" title={t('checkout.review')}>
                <Card>
                    <CardBody>
                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                    </CardBody>
                </Card>  
            </Tab>
        </Tabs>
    )
}

export default Checkout