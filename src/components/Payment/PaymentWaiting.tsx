import { Card, CardBody, CardHeader, Divider, Button as BaseButton } from "@nextui-org/react"
import { useTranslation } from "react-i18next"
import Button from "@components/Button";
import { GetBookFlightResponse } from "@api/bookFlight/types";
import { useRouter } from "next/router";
import { useEffect, useMemo } from "react";

interface Props {
    flight?: GetBookFlightResponse;
    isLoading: boolean;
}

const PaymentWaiting = ({ flight, isLoading } : Props) => {

    const { t } = useTranslation();

    const copyToClipboard = (text: string) => async () => {
        await navigator.clipboard.writeText(text);
    };

    const { query, push } = useRouter();

    useEffect(
        () => {
            if(!query.payment && !query.bookingno) {
                push({
                    pathname: '/checkout/payment',
                    query: {
                        ...query
                    }
                })
            }
        },
        []
    )

    const total = parseInt(flight?.data?.nominal ?? '0');

    const handleOnPayment = () => {
        // Redirect to home
        push('/');
    };

    const handleGetTicket = () => {
        push({
            pathname: '/eticket',
            query: {
                bookingno: flight?.data.bookingCode 
            }
        })
    }

    const paymentAccountDetail = useMemo(
        () => {
            if(query.payment === 'bca') {
                return {
                    bank: 'BCA',
                    code: '0613336939'
                }
            }

            if(query.payment === 'bni') {
                return {
                    bank: 'BNI',
                    code: '2100900774'
                }
            }

            if(query.payment === 'bri') {
                return {
                    bank: 'BRI',
                    code: '033101073801501'
                }
            }
        },
        []
    )
    

    return (
        <>
            <div className="flex flex-col gap-4">
                <Card classNames={{
                    header: "font-medium"
                }}>
                    <CardHeader>
                        {t('checkout.payment_instruction')}
                    </CardHeader>
                    <Divider />
                    <CardBody>
                        <div className="flex flex-col gap-5">
                            <p>{paymentAccountDetail?.bank}</p>
                            <div className="flex flex-row justify-between gap-5 items-center">
                                <p>{t('checkout.account_number')}</p>
                                <div className="flex flex-row gap-3 items-center">
                                    <p className="text-primary">{paymentAccountDetail?.code}</p>
                                    <BaseButton color="primary" variant="light" onClick={copyToClipboard(paymentAccountDetail?.code ?? '')}>
                                        {t('checkout.copy')}
                                    </BaseButton>
                                </div>
                            </div>
                            <div className="flex flex-row justify-between gap-5">
                                <p>{t('checkout.recipient_name')}</p>
                                <div className="flex flex-row gap-3 items-center">
                                    <p className="text-primary">{'Abdul Rahman'}</p>
                                    <div className="w-[80px]"/>
                                </div>
                            </div>
                            <div className="flex flex-row justify-between gap-5 items-center">
                                <p className="text-orange font-medium">{t('checkout.transfer_amount')}</p>
                                <div className="flex flex-row gap-3 items-center">
                                    <p className="text-orange font-medium">{`${new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR"}).format(total ?? 0)}`}</p>
                                    <BaseButton color="primary" variant="light" onClick={copyToClipboard(total.toString() ?? '')}>
                                        {t('checkout.copy')}
                                    </BaseButton>
                                </div>
                            </div>
                        </div>
                    </CardBody>
                </Card>           
            </div>
            <div className="flex flex-col gap-4">
                <Card classNames={{
                    header: "font-medium"
                }}>
                    <CardHeader>
                        {t('checkout.have_you_pay_yet')}
                    </CardHeader>
                    <Divider />
                    <CardBody>
                        <div className="flex flex-col gap-5">
                            <p>{t('checkout.once_payment_description')}</p>
                            {flight?.data.status === 'ISSUED' ? (
                                <Button bgColor={"orange"} isLoading={isLoading} disabled={isLoading} onClick={handleGetTicket}>
                                    {t('checkout.get_eticket')}
                                </Button>
                            ) : (
                                <Button bgColor={"orange"} isLoading={isLoading} disabled={isLoading} onClick={handleOnPayment}>
                                    {t('checkout.already_payment')}
                                </Button>
                            )}
                        </div>
                    </CardBody>
                </Card>
            </div> 
        </>
    )
}

export default PaymentWaiting
