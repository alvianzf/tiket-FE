import { PaymentSummary } from "@components/Payment";
import DanaPayment from "@components/Payment/DanaPayment";
import { useQueryCheckBookFlight } from "@queries/bookFlight";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useTranslation } from "react-i18next"

const PaymentContainer = () => {

    const { t } = useTranslation();

    const { query, isReady, push, pathname } = useRouter();

    const bookingno = query?.bookingno as unknown as string;

    useEffect(
        () => {
            // Guard only the active route: during AnimatePresence exit transitions this
            // page stays mounted while router.query/pathname already belong to the next
            // route, and a dep-less redirect here livelocks pushing '/' (prod incident).
            if (!isReady || pathname !== '/checkout/payment') return;
            if (!bookingno) {
                push('/');
            }
        },
        [bookingno, isReady, pathname, push]
    )

    const { data, isFetching } = useQueryCheckBookFlight({
        enabled: !!bookingno,
        request: bookingno
    });

    return (
        <div className="flex flex-wrap justify-center my-10">
            <div className="flex flex-col gap-8 w-full px-5 max-w-[1024px]">
                <div className="flex flex-col gap-10">
                    <p className="text-lg font-medium text-center">{t('checkout.payment')}</p>
                    <div className="flex flex-row flex-wrap gap-[30px]">
                        <div className="flex flex-col gap-[15px] w-[100%] md:w-[60%] lg:w-[60%]">
                            <DanaPayment isLoading={isFetching} bookingNo={data?.data?.bookingCode} amount={parseInt(data?.data?.nominal ?? "0")} successPath="/eticket"/>
                        </div>
                        <div className="w-[100%] md:w-[36%] lg:w-[36%]">
                            <PaymentSummary isLoading={isFetching} flight={data}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PaymentContainer