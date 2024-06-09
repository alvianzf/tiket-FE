import { Card, CardBody, CardHeader, Divider, Input } from "@nextui-org/react"
import { useTranslation } from "react-i18next"
import CheckoutOrderSummary from "./CheckoutOrderSummary"

const CheckoutOrder = () => {

    const { t } = useTranslation()

    return (
        <div className="flex flex-row flex-wrap gap-[30px]">
            <div className="flex flex-col gap-[80px] w-[100%] md:w-[60%] lg:w-[60%]">
                <div className="flex flex-col gap-4">
                    <p className="text-lg font-medium">{t('checkout.order_section_title')}</p>
                    <Card classNames={{
                        header: "font-medium"
                    }}>
                        <CardHeader>
                            {t('checkout.order_section_description')}
                        </CardHeader>
                        <Divider />
                        <CardBody>
                            <div className="flex flex-col gap-5 w-full">
                                <div className="flex flex-row gap-2 items-center">
                                    <p className="w-[50%]">{t('checkout.name_middle_name')}</p>
                                    <Input
                                        type="text"
                                        variant="bordered"
                                        classNames={{
                                            inputWrapper: "rounded-none",
                                            mainWrapper: "w-full"
                                        }}
                                    />
                                </div>
                                <div className="flex flex-row gap-2 items-center">
                                    <p className="w-[50%]">{t('checkout.last_name')}</p>
                                    <Input
                                        type="text"
                                        variant="bordered"
                                        classNames={{
                                            inputWrapper: "rounded-none",
                                            mainWrapper: "w-full"
                                        }}
                                    />
                                </div>
                                <div className="flex flex-row gap-2 items-center">
                                    <p className="w-[50%]">{t('checkout.phone_no')}</p>
                                    <Input
                                        type="text"
                                        variant="bordered"
                                        classNames={{
                                            inputWrapper: "rounded-none",
                                            mainWrapper: "w-full"
                                        }}
                                    />
                                </div>
                                <div className="flex flex-row gap-2 items-center">
                                    <p className="w-[50%]">{t('checkout.email')}</p>
                                    <Input
                                        type="text"
                                        variant="bordered"
                                        classNames={{
                                            inputWrapper: "rounded-none",
                                            mainWrapper: "w-full"
                                        }}
                                    />
                                </div>
                            </div>
                        </CardBody>
                    </Card>
                </div>
                <div className="flex flex-col gap-4">
                    <p className="text-lg font-medium">{t('checkout.detail_traveler')}</p>
                    <Card classNames={{
                        header: "font-medium"
                    }}>
                        <CardHeader>
                            {t('checkout.person', { number: 1})}
                        </CardHeader>
                        <Divider />
                        <CardBody>
                            <div className="flex flex-col gap-5 w-full">
                                <div className="flex flex-row gap-2 items-center">
                                    <p className="w-[50%]">{t('checkout.name_middle_name')}</p>
                                    <Input
                                        type="text"
                                        variant="bordered"
                                        classNames={{
                                            inputWrapper: "rounded-none",
                                            mainWrapper: "w-full"
                                        }}
                                    />
                                </div>
                                <div className="flex flex-row gap-2 items-center">
                                    <p className="w-[50%]">{t('checkout.last_name')}</p>
                                    <Input
                                        type="text"
                                        variant="bordered"
                                        classNames={{
                                            inputWrapper: "rounded-none",
                                            mainWrapper: "w-full"
                                        }}
                                    />
                                </div>
                            </div>
                        </CardBody>
                    </Card>
                </div>
            </div>
            <div className="w-[100%] md:w-[36%] lg:w-[36%]">
                <CheckoutOrderSummary />
            </div>
        </div>
    )
}

export default CheckoutOrder