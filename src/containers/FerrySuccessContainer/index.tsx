import { Card, CardContent } from "@mui/material";
import Button from "@components/ui/Button";
import FerryStepper from "@components/FerryStepper";
import NextImage from "next/image"
import { useTranslation } from "react-i18next";

const FerrySuccessContainer = () => {

    const { t } = useTranslation();

    return (
        <div className="flex flex-col gap-8 w-full items-center justify-center py-10">
            <div className="flex gap-2 w-full flex-col relative flex-nowrap items-center max-w-[1024px] px-4">
                <FerryStepper activeStep={3} />
            </div>
            <div className="flex gap-4 w-full flex-col relative flex-nowrap items-center max-w-[1280px] px-4">
                <Card className="p-6 w-full">
                    <CardContent>
                        <div className="flex flex-col text-center gap-8">
                            <div className="m-auto">
                                <NextImage src="/images/payment-success.png" width={200} height={200} alt="Payment Success"/>
                            </div>
                            <p className="text-orange text-lg font-medium">{t('checkout.payment_received')}</p>
                            <p>{t('checkout.order_no', { no : '00001' })}</p>
                            <p className="text-orange text-lg font-medium">{t('checkout.thankyou_for_your_payment')}</p>
                            <Button variant="cta" className="mx-auto">
                                {t('checkout.get_eticket')}
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

export default FerrySuccessContainer