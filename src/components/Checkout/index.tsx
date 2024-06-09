import { Tab, Tabs } from "@nextui-org/react"
import { useTranslation } from "react-i18next"
import CheckoutOrder from "./CheckoutOrder";
import { useState } from "react";
import CheckoutOrderReview from "./CheckoutOrderReview";

export type Key = string | number;

const Checkout = () => {

    const { t } = useTranslation();

    const [selected, setSelected] = useState<Key>("order");

    const handleSelectTab = (key: Key) => {
        setSelected(key);
    }

    return (
        <Tabs aria-label="Options" variant="underlined" selectedKey={selected} classNames={{
            cursor:"bg-[#ff5a00]",
            base: "justify-center"
        }} onSelectionChange={(key) => handleSelectTab(key)}>
            <Tab key="order" title={t('checkout.order')}>
                <CheckoutOrder handleSelectTab={() => handleSelectTab('review')}/>
            </Tab>
            <Tab key="review" title={t('checkout.review')}>
                <CheckoutOrderReview handlePreviousTab={() => handleSelectTab('order')} />
            </Tab>
        </Tabs>
    )
}

export default Checkout