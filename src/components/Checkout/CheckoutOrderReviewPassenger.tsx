import Button from "@components/Button";
import { Card, CardBody, CardFooter, CardHeader, DatePicker, Divider, Input, Select, SelectItem } from "@nextui-org/react"
import { useState } from "react";
import { useTranslation } from "react-i18next"

interface Props {
    fullname: string;
    date_of_birth: string;
    index: number;
}

const CheckoutOrderReviewPassenger = ({ fullname, date_of_birth, index } : Props) => {

    const { t } = useTranslation();

    const [edit, setEdit] = useState(false);

    const options = [
        { key: 'mr', label: t('checkout.mr') },
        { key: 'mrs', label: t('checkout.mrs') },
        { key: 'ms', label: t('checkout.ms') },
    ];

    return (
        edit ? (
            <Card classNames={{
                header: "font-medium"
            }}>
                <CardHeader>
                    {t('checkout.person', { number: index})}
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
                <CardFooter>
                    <Button bgColor={"blue"} className="w-full" onClick={() => setEdit(false)}>
                        {t('checkout.save')}
                    </Button>
                </CardFooter>
            </Card>
        ): (
            <Card classNames={{
                header: "font-medium"
            }}>
                <CardHeader>
                    <div className="flex w-full items-center justify-between">
                        <p>{fullname}</p>
                        {/* <BaseButton color="primary" variant="light" onClick={() => setEdit(true)}>
                            {t('checkout.change_details')}
                        </BaseButton> */}
                    </div>
                </CardHeader>
                <Divider />
                <CardBody>
                    <div className="flex justify-between">
                        <div className="flex flex-col">
                            <p className="text-gray-500">{t('checkout.date_of_birth')}</p>
                            <p>{date_of_birth}</p>
                        </div>
                    </div>
                </CardBody>
            </Card>
        )
    )
}

export default CheckoutOrderReviewPassenger