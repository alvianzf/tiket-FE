import { GetBookFlightResponse } from "@api/bookFlight/types";
import Button from "@components/Button";
import { Image } from "@nextui-org/react";
import { useTranslation } from "react-i18next";

interface Props {
    flight?: GetBookFlightResponse;
}

const PaymentSuccess = ({ flight } :Props) => {

    const { t } = useTranslation();

    return (
        <div className="flex flex-col text-center gap-8">
            <div className="m-auto">
                <Image src="/images/payment-success.png" width={200} height={200}/>
            </div>
            <p className="text-orange text-lg font-medium">{t('checkout.payment_received')}</p>
            <p>{t('checkout.order_no', { no : flight?.data.bookingCode })}</p>
            <p className="text-orange text-lg font-medium">{t('checkout.thankyou_for_your_payment')}</p>
            <Button bgColor={"orange"}>
                {t('checkout.get_eticket')}
            </Button>
        </div>      
    )
}

export default PaymentSuccess