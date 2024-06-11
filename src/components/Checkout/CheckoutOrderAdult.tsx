import { Card, CardBody, CardHeader, DatePicker, Divider, Input, Select, SelectItem } from "@nextui-org/react"
import { useFieldArray, useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { FormProps } from "./forms/useForm";
import moment from "moment";
import { parseDate } from "@internationalized/date";

const CheckoutOrderAdult = () => {

    const { setValue, formState: { errors }, control, watch } = useFormContext<FormProps>();

    const { t } = useTranslation();

    const { fields } = useFieldArray({
        control,
        name: 'adultPassengers',
        keyName: 'adultPassengerKey'
    })

    const options = [
        { key: 'Mr', label: t('checkout.mr') },
        { key: 'Mrs', label: t('checkout.mrs') },
        { key: 'Ms', label: t('checkout.ms') },
    ];

    return (
        fields.map((field, index) => (
            <Card key={index} classNames={{
                header: "font-medium"
            }}>
                <CardHeader>
                    {t('checkout.adult', { count: index+1 })}
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
                                    selectedKeys={[watch(`adultPassengers.${index}.call`)]}
                                    errorMessage={errors?.adultPassengers?.[index]?.call?.message}
                                    isInvalid={!!errors?.adultPassengers?.[index]?.call}
                                    onChange={(e) => setValue(`adultPassengers.${index}.call`, e.target.value)}
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
                                    defaultValue={watch(`adultPassengers.${index}.firstname`)}
                                    onValueChange={(value) => setValue(`adultPassengers.${index}.firstname`, value)}
                                    errorMessage={errors?.adultPassengers?.[index]?.firstname?.message}
                                    isInvalid={!!errors?.adultPassengers?.[index]?.firstname}
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
                                defaultValue={watch(`adultPassengers.${index}.lastname`)}
                                onValueChange={(value) => setValue(`adultPassengers.${index}.lastname`, value)}
                                errorMessage={errors?.adultPassengers?.[index]?.lastname?.message}
                                isInvalid={!!errors?.adultPassengers?.[index]?.lastname}
                                classNames={{
                                    inputWrapper: "rounded-none",
                                    mainWrapper: "w-full"
                                }}
                            />
                        </div>
                        <div className="flex flex-row gap-2 items-center">
                            <p className="w-[50%]">{t('checkout.date_of_birth')}</p>
                            <DatePicker
                                onChange={(value) => setValue(`adultPassengers.${index}.date_of_birth`, moment(value).format('YYYY-MM-DD'))}
                                variant="underlined"
                                showMonthAndYearPickers
                                errorMessage={errors?.adultPassengers?.[index]?.date_of_birth?.message}
                                isInvalid={!!errors?.adultPassengers?.[index]?.date_of_birth}
                                defaultValue={watch(`adultPassengers.${index}.date_of_birth`) ? parseDate(watch(`adultPassengers.${index}.date_of_birth`)) : null}
                            />
                        </div>
                    </div>
                </CardBody>
            </Card>
        ))
    )
}

export default CheckoutOrderAdult