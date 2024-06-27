import { Card, CardBody, CardHeader, Divider, Button as BaseButton } from "@nextui-org/react"
import { useTranslation } from "react-i18next"
import Button from "@components/Button";
import { GetBookFlightResponse } from "@api/bookFlight/types";
import { useRouter } from "next/router";

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

    const handleOnPayment = () => {
        push({
            pathname: '/checkout/payment/confirm',
            query: {
                ...query
            }
        })
    }

    const total = parseInt(flight?.data?.nominal ?? '0') + parseInt(flight?.data?.comission ?? '0')

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
                            <p>{'Bank Central Asia'}</p>
                            <div className="flex flex-row justify-between gap-5 items-center">
                                <p>{t('checkout.account_number')}</p>
                                <div className="flex flex-row gap-3 items-center">
                                    <p className="text-primary">{'5543213'}</p>
                                    <BaseButton color="primary" variant="light" onClick={copyToClipboard('5543213')}>
                                        {t('checkout.copy')}
                                    </BaseButton>
                                </div>
                            </div>
                            <div className="flex flex-row justify-between gap-5">
                                <p>{t('checkout.recipient_name')}</p>
                                <div className="flex flex-row gap-3 items-center">
                                    <p className="text-primary">{'PT Tiketq'}</p>
                                    <div className="w-[80px]"/>
                                </div>
                            </div>
                            <div className="flex flex-row justify-between gap-5 items-center">
                                <p className="text-orange font-medium">{t('checkout.transfer_amount')}</p>
                                <div className="flex flex-row gap-3 items-center">
                                    <p className="text-orange font-medium">{`${new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR"}).format(total ?? 0)}`}</p>
                                    <BaseButton color="primary" variant="light" onClick={copyToClipboard('1800000')}>
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
                            <Button bgColor={"orange"} isLoading={isLoading} disabled={isLoading} onClick={handleOnPayment}>
                                {t('checkout.already_payment')}
                            </Button>
                        </div>
                    </CardBody>
                </Card>
            </div> 
        </>
    )
}

export default PaymentWaiting