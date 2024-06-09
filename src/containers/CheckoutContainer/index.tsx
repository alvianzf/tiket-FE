import Checkout from "@components/Checkout"
import Button from "@components/Button";
import { useTranslation } from "react-i18next";

const CheckoutContainer = () => {

    const { t } = useTranslation();

    return (
        <div className="flex flex-wrap justify-center my-10">
            <div className="flex flex-col gap-8 w-full px-5 max-w-[1024px]">
                <Checkout />
                <Button bgColor={"orange"} className="min-w-40">
                    {t('checkout.continue')}
                </Button>
            </div>
        </div>
    )
}

export default CheckoutContainer