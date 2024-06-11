import { Card, CardBody, CardHeader, DatePicker, Divider, Input, Select, SelectItem } from "@nextui-org/react"
import { useFieldArray, useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { FormProps } from "./forms/useForm";
import moment from "moment";
import { parseDate } from "@internationalized/date";

const CheckoutOrderInfant = () => {

    const { setValue, formState: { errors }, control, watch } = useFormContext<FormProps>();

    const { t } = useTranslation();

    const { fields } = useFieldArray({
        control,
        name: 'infantPassengers',
        keyName: 'infantPassengerKey'
    })

    const options = [
        { key: 'Mr', label: t('checkout.mr') },
        { key: 'Ms', label: t('checkout.ms') },
    ];

    return (
        fields.map((field, index) => (
            <Card key={index} classNames={{
                header: "font-medium"
            }}>
                <CardHeader>
                    {t('checkout.infant', { count: index+1 })}
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
                                    placeholder={t('checkout.choose')}
                                    selectedKeys={[watch(`infantPassengers.${index}.call`)]}
                                    errorMessage={errors?.infantPassengers?.[index]?.call?.message}
                                    isInvalid={!!errors?.infantPassengers?.[index]?.call}
                                    onChange={(e) => setValue(`infantPassengers.${index}.call`, e.target.value)}
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
                                    defaultValue={watch(`infantPassengers.${index}.firstname`)}
                                    onValueChange={(value) => setValue(`infantPassengers.${index}.firstname`, value)}
                                    errorMessage={errors?.infantPassengers?.[index]?.firstname?.message}
                                    isInvalid={!!errors?.infantPassengers?.[index]?.firstname}
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
                                defaultValue={watch(`infantPassengers.${index}.lastname`)}
                                onValueChange={(value) => setValue(`infantPassengers.${index}.lastname`, value)}
                                errorMessage={errors?.infantPassengers?.[index]?.lastname?.message}
                                isInvalid={!!errors?.infantPassengers?.[index]?.lastname}
                                classNames={{
                                    inputWrapper: "rounded-none",
                                    mainWrapper: "w-full"
                                }}
                            />
                        </div>
                        <div className="flex flex-row gap-2 items-center">
                            <p className="w-[50%]">{t('checkout.date_of_birth')}</p>
                            <DatePicker
                                onChange={(value) => setValue(`infantPassengers.${index}.date_of_birth`, moment(value).format('YYYY-MM-DD'))}
                                variant="underlined"
                                showMonthAndYearPickers
                                errorMessage={errors?.infantPassengers?.[index]?.date_of_birth?.message}
                                isInvalid={!!errors?.infantPassengers?.[index]?.date_of_birth}
                                defaultValue={watch(`infantPassengers.${index}.date_of_birth`) ? parseDate(watch(`infantPassengers.${index}.date_of_birth`)) : null}
                            />
                        </div>
                    </div>
                </CardBody>
            </Card>
        ))
    )
}

export default CheckoutOrderInfant