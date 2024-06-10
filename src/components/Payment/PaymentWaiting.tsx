import { Card, CardBody, CardHeader, Divider, Button as BaseButton } from "@nextui-org/react"
import { useTranslation } from "react-i18next"
import Button from "@components/Button";

interface Props {
    handleAlreadyPayment: () => void;
}

const PaymentWaiting = ({ handleAlreadyPayment } : Props) => {

    const { t } = useTranslation();

    const copyToClipboard = (text: string) => async () => {
        await navigator.clipboard.writeText(text);
    };

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
                                    <p className="text-orange font-medium">{'Rp 1.800.000'}</p>
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
                            <Button bgColor={"orange"} onClick={handleAlreadyPayment}>
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