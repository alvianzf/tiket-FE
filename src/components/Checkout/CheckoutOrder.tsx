import { Card, CardBody, CardHeader, DatePicker, Divider, Input, Select, SelectItem } from "@nextui-org/react"
import { useTranslation } from "react-i18next"
import CheckoutOrderSummary from "./CheckoutOrderSummary"
import Button from "@components/Button";

interface Props {
    handleSelectTab: () => void;
}

const CheckoutOrder = ({ handleSelectTab }: Props) => {

    const { t } = useTranslation();

    const options = [
        { key: 'mr', label: t('checkout.mr') },
        { key: 'mrs', label: t('checkout.mrs') },
        { key: 'ms', label: t('checkout.ms') },
    ];

    return (
        <div className="flex flex-col gap-10">
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
                                        <div className="flex flex-row gap-2 w-full">
                                            <Select
                                                className="max-w-xs"
                                                variant="bordered"
                                                radius="sm"
                                                selectionMode="single"
                                                defaultSelectedKeys={["mr"]}
                                            >
                                                {options.map((item) => (
                                                        <SelectItem key={item.key}>
                                                            {item.label}
                                                        </SelectItem>
                                                    ))
                                                }
                                            </Select>
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
                                        <p className="w-[50%]">{t('checkout.date_of_birth')}</p>
                                        <DatePicker
                                            variant="underlined"
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
            <Button bgColor={"orange"} className="min-w-40" onClick={handleSelectTab}>
                {t('checkout.continue')}
            </Button>
        </div>
    )
}

export default CheckoutOrder