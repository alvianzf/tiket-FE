import { Card, CardBody, CardHeader, Divider, RadioGroup } from "@nextui-org/react"
import { useTranslation } from "react-i18next"
import PaymentRadio from "./PaymentRadio";
import BankBca from "@icons/BankBca";
import BankMandiri from "@icons/BankMandiri";
import BankBni from "@icons/BankBni";
import Button from "@components/Button";
import { GetBookFlightResponse } from "@api/bookFlight/types";
import { useRouter } from "next/router";
import { useState } from "react";

interface Props {
    isLoading: boolean;
    flight?: GetBookFlightResponse;
}

const PaymentForm = ({ isLoading, flight } : Props) => {

    const { t } = useTranslation();
    const [payment,setPayment] = useState<string>('');

    const { push, query } = useRouter();

    const handleOnPayment = () => {
        push({
            pathname: '/checkout/payment/waiting',
            query: {
                ...query,
                payment
            }
        })
    };

    const total = parseInt(flight?.data?.nominal ?? '0') + parseInt(flight?.data?.comission ?? '0')

    return (
        <>
            <div className="flex flex-col gap-4">
                <Card classNames={{
                    header: "font-medium"
                }}>
                    <CardHeader>
                        {t('checkout.choose_payment')}
                    </CardHeader>
                    <Divider />
                    <CardBody>
                        <RadioGroup value={payment} onValueChange={setPayment}>
                            <PaymentRadio value="bca">
                                <div className="flex flex-row items-center gap-5">
                                    <BankBca width={30} height={30}/>
                                    <p>{'BCA - Abdul Rahman 0613336939'}</p>
                                </div>
                            </PaymentRadio>
                            <PaymentRadio value="bni">
                                <div className="flex flex-row items-center gap-5">
                                    <BankMandiri width={30} height={30}/>
                                    <p>{'BNI - Abdul Rahman 2100900774'}</p>
                                </div>
                            </PaymentRadio>
                            <PaymentRadio value="bri">
                                <div className="flex flex-row items-center gap-5">
                                    <BankBni width={30} height={30}/>
                                    <p>{'BRI - Abdul Rahman 033101073801501'}</p>
                                </div>
                            </PaymentRadio>
                        </RadioGroup>
                    </CardBody>
                </Card>           
            </div>
            <div className="flex flex-col gap-4">
                <Card classNames={{
                    header: "font-medium"
                }}>
                    <CardHeader>
                        {t('checkout.order_summary')}
                    </CardHeader>
                    <Divider />
                    <CardBody>
                        <div className="flex flex-col gap-5">
                            <div className="flex flex-row justify-between">
                                <p className="text-lg font-medium text-orange">{t('checkout.total')}</p>
                                <p className="text-lg font-medium text-orange">{`${new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR"}).format(total ?? 0)}`}</p>
                            </div>
                            <div className="flex flex-col gap-2">
                                <div className="flex flex-row justify-between">
                                    <p>{t('checkout.tax')}</p>
                                    <p>{`${new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR"}).format(parseInt(flight?.data.comission ?? '0') ?? 0)}`}</p>
                                </div>
                            </div>
                        </div>
                    </CardBody>
                </Card>
            </div>

            <Button bgColor={"orange"} isLoading={isLoading} disabled={isLoading} onClick={handleOnPayment}>
                {t('checkout.choose_payment')}
            </Button>
        </>
    )
}

export default PaymentForm