import { Card, CardBody, CardHeader, Divider, RadioGroup } from "@nextui-org/react"
import { useTranslation } from "react-i18next"
import PaymentRadio from "./PaymentRadio";
import BankBca from "@icons/BankBca";
import BankMandiri from "@icons/BankMandiri";
import BankBni from "@icons/BankBni";
import Dana from "@icons/Dana";
import Button from "@components/Button";

interface Props {
    handleChoosePayment: () => void;
}

const PaymentForm = ({ handleChoosePayment } : Props) => {

    const { t } = useTranslation();

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
                        <RadioGroup>
                            <PaymentRadio value="bca">
                                <div className="flex flex-row items-center gap-5">
                                    <BankBca width={30} height={30}/>
                                    <p>{'BCA'}</p>
                                </div>
                            </PaymentRadio>
                            <PaymentRadio value="mandiri">
                                <div className="flex flex-row items-center gap-5">
                                    <BankMandiri width={30} height={30}/>
                                    <p>{'Mandiri'}</p>
                                </div>
                            </PaymentRadio>
                            <PaymentRadio value="bni">
                                <div className="flex flex-row items-center gap-5">
                                    <BankBni width={30} height={30}/>
                                    <p>{'BNI'}</p>
                                </div>
                            </PaymentRadio>
                            <PaymentRadio value="dana">
                                <div className="flex flex-row items-center gap-5">
                                    <Dana width={30} height={30}/>
                                    <p>{'Dana'}</p>
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
                                <p className="text-lg font-medium text-orange">{'Rp 1.800.000'}</p>
                            </div>
                            <div className="flex flex-col gap-2">
                                <div className="flex flex-row justify-between">
                                    <p>{t('checkout.insurance')}</p>
                                    <p>{'Rp 1.800.000'}</p>
                                </div>
                                <div className="flex flex-row justify-between">
                                    <p>{t('checkout.insurance')}</p>
                                    <p>{'Rp 1.800.000'}</p>
                                </div>
                                <div className="flex flex-row justify-between">
                                    <p>{t('checkout.insurance')}</p>
                                    <p>{'Rp 1.800.000'}</p>
                                </div>
                            </div>
                        </div>
                    </CardBody>
                </Card>
            </div>

            <Button bgColor={"orange"} onClick={handleChoosePayment}>
                {t('checkout.choose_payment')}
            </Button>
        </>
    )
}

export default PaymentForm