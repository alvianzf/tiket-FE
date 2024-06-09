import { PaymentConfirmation, PaymentForm, PaymentSummary, PaymentWaiting } from "@components/Payment";
import { useState } from "react";
import { useTranslation } from "react-i18next"

type PaymentStep = 'choose' | 'waiting' | 'confirmation' | 'success' | 'error'

const PaymentContainer = () => {

    const { t } = useTranslation();

    const [step, setSteps] = useState<PaymentStep>('choose');

    const handleChoosePayment = () => {
        setSteps('waiting');
    }

    const handleAlreadyPayment = () => {
        setSteps('confirmation');
    }

    const handleCompletePayment = () => {
        setSteps('success');
    }

    return (
        <div className="flex flex-wrap justify-center my-10">
            <div className="flex flex-col gap-8 w-full px-5 max-w-[1024px]">
                <div className="flex flex-col gap-10">
                    <p className="text-lg font-medium text-center">{t('checkout.payment')}</p>
                    <div className="flex flex-row flex-wrap gap-[30px]">
                        <div className="flex flex-col gap-[15px] w-[100%] md:w-[60%] lg:w-[60%]">
                            {step === 'choose' && (
                                <PaymentForm handleChoosePayment={handleChoosePayment}/>
                            )}
                            {step === 'waiting' && (
                                <PaymentWaiting handleAlreadyPayment={handleAlreadyPayment} />
                            )}
                            {step === 'confirmation' && (
                                <PaymentConfirmation handleCompletePayment={handleCompletePayment} />
                            )}
                        </div>
                        <div className="w-[100%] md:w-[36%] lg:w-[36%]">
                            <PaymentSummary />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PaymentContainer