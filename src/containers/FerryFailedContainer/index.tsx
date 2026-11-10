import { Card, CardContent } from "@mui/material";
import Button from "@components/ui/Button";
import FerryStepper from "@components/FerryStepper";
import NextImage from "next/image"
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";

const FerryFailedContainer = () => {

    const { t } = useTranslation();
    const { back } = useRouter();

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
                            <NextImage src="/images/payment-failed.png" width={200} height={200} alt="Payment Failed"/>
                        </div>
                        <p className="text-orange text-lg font-medium">{t('checkout.payment_failed')}</p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button variant="cta" onClick={() => back()}>
                                {t('checkout.try_again', 'Try Again')}
                            </Button>
                            <Button variant="outline" href="/">
                                {t('checkout.home')}
                            </Button>
                        </div>
                    </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

export default FerryFailedContainer
