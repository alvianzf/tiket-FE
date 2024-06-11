import { PaymentSuccess } from "@components/Payment";
import { useQueryCheckBookFlight } from "@queries/bookFlight";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useTranslation } from "react-i18next"

const SuccessPaymentContainer = () => {

    const { t } = useTranslation();

    const { query, isReady, push } = useRouter();

    const bookingno = query?.bookingno as unknown as string;

    useEffect(
        () => {
            if(!bookingno && isReady) {
                push('/');
                return
            }
        },
    )

    const { data } = useQueryCheckBookFlight({
        enabled: !!bookingno,
        request: {
            kodebooking: bookingno
        }
    });

    return (
        <div className="flex flex-wrap justify-center my-10">
            <div className="flex flex-col gap-8 w-full px-5 max-w-[1024px]">
                <div className="flex flex-col gap-10">
                    <p className="text-lg font-medium text-center">{t('checkout.payment')}</p>
                    <div className="flex flex-row flex-wrap gap-[30px]">
                        <div className="flex flex-col gap-[15px] w-[100%] md:w-[100%] lg:w-[100%]">
                            <PaymentSuccess flight={data} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SuccessPaymentContainer