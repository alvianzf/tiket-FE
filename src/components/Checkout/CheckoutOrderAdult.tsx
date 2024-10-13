import { Card, CardBody, CardHeader, Divider, Input, Select, SelectItem } from "@nextui-org/react"
import { useFieldArray, useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { FormProps } from "./forms/useForm";
// Remove the import for DatePicker as it's causing issues
// import { DatePicker } from "@internationalized/date";

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

    const handleDateChange = (value: string, index: number) => {
        setValue(`adultPassengers.${index}.date_of_birth`, value);
    };

    return (
        <>
            {fields.map((field, index) => (
                <Card key={field.adultPassengerKey} className="font-medium">
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
                                            <SelectItem key={item.key} value={item.key}>
                                                {item.label}
                                            </SelectItem>
                                        ))}
                                    </Select>
                                    <Input
                                        type="text"
                                        variant="bordered"
                                        value={watch(`adultPassengers.${index}.firstname`)}
                                        onValueChange={(value) => setValue(`adultPassengers.${index}.firstname`, value)}
                                        isInvalid={!!errors?.adultPassengers?.[index]?.firstname}
                                        errorMessage={errors?.adultPassengers?.[index]?.firstname?.message}
                                        className="rounded-none w-full"
                                    />
                                </div>
                            </div>
                            <div className="flex flex-row gap-2 items-center">
                                <p className="w-[50%]">{t('checkout.last_name')}</p>
                                <Input
                                    type="text"
                                    variant="bordered"
                                    value={watch(`adultPassengers.${index}.lastname`)}
                                    onValueChange={(value) => setValue(`adultPassengers.${index}.lastname`, value)}
                                    isInvalid={!!errors?.adultPassengers?.[index]?.lastname}
                                    errorMessage={errors?.adultPassengers?.[index]?.lastname?.message}
                                    className="rounded-none w-full"
                                />
                            </div>
                            <div className="flex flex-row gap-2 items-center">
                                <p className="w-[50%]">{t('checkout.date_of_birth')}</p>
                                <Input
                                    type="date"
                                    variant="bordered"
                                    placeholder={t('checkout.select_date')}
                                    value={watch(`adultPassengers.${index}.date_of_birth`)}
                                    onValueChange={(value) => handleDateChange(value, index)}
                                    isInvalid={!!errors?.adultPassengers?.[index]?.date_of_birth}
                                    errorMessage={errors?.adultPassengers?.[index]?.date_of_birth?.message}
                                    className="rounded-none w-full"
                                />
                            </div>
                        </div>
                    </CardBody>
                </Card>
            ))}
        </>
    )
}

export default CheckoutOrderAdult
