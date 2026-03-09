import { Card, CardBody, CardHeader, DatePicker, Divider, Input, Select, SelectItem } from "@nextui-org/react"
import { useFieldArray, useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { FormProps } from "./forms/useForm";
import moment from "moment";
import { parseDate } from "@internationalized/date";

const CheckoutOrderChild = () => {

    const { setValue, formState: { errors }, control, watch } = useFormContext<FormProps>();

    const { t } = useTranslation();

    const { fields } = useFieldArray({
        control,
        name: 'childPassengers',
        keyName: 'childPassengerKey'
    })

    const options = [
        { key: 'Mr', label: t('checkout.mr') },
        { key: 'Ms', label: t('checkout.ms') },
    ];

    return (
        fields.map((field, index) => (
            <Card key={index} className="font-medium shadow-md border-none bg-white/50 backdrop-blur-md">
                <CardHeader className="text-primary font-bold">
                    {t('checkout.child', { count: index+1 })}
                </CardHeader>
                <Divider />
                <CardBody>
                    <div className="flex flex-col gap-6 w-full py-2">
                        <div className="flex flex-col gap-2">
                            <p className="text-sm font-semibold text-slate-700">{t('checkout.name_middle_name')}</p>
                            <div className="flex flex-row gap-3 w-full">
                                <Select
                                    className="max-w-[120px]"
                                    variant="underlined"
                                    selectionMode="single"
                                    placeholder={t('checkout.choose')}
                                    selectedKeys={[watch(`childPassengers.${index}.call`)]}
                                    errorMessage={errors?.childPassengers?.[index]?.call?.message}
                                    isInvalid={!!errors?.childPassengers?.[index]?.call}
                                    onChange={(e) => setValue(`childPassengers.${index}.call`, e.target.value)}
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
                                    variant="underlined"
                                    placeholder="Enter first/middle name"
                                    defaultValue={watch(`childPassengers.${index}.firstname`)}
                                    onValueChange={(value) => setValue(`childPassengers.${index}.firstname`, value)}
                                    errorMessage={errors?.childPassengers?.[index]?.firstname?.message}
                                    isInvalid={!!errors?.childPassengers?.[index]?.firstname}
                                    className="w-full"
                                />
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <p className="text-sm font-semibold text-slate-700">{t('checkout.last_name')}</p>
                            <Input
                                type="text"
                                variant="underlined"
                                placeholder="Enter last name"
                                defaultValue={watch(`childPassengers.${index}.lastname`)}
                                onValueChange={(value) => setValue(`childPassengers.${index}.lastname`, value)}
                                errorMessage={errors?.childPassengers?.[index]?.lastname?.message}
                                isInvalid={!!errors?.childPassengers?.[index]?.lastname}
                                className="w-full"
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <p className="text-sm font-semibold text-slate-700">{t('checkout.date_of_birth')}</p>
                            <DatePicker
                                onChange={(value) => setValue(`childPassengers.${index}.date_of_birth`, moment(value).format('YYYY-MM-DD'))}
                                variant="underlined"
                                showMonthAndYearPickers
                                errorMessage={errors?.childPassengers?.[index]?.date_of_birth?.message}
                                isInvalid={!!errors?.childPassengers?.[index]?.date_of_birth}
                                defaultValue={watch(`childPassengers.${index}.date_of_birth`) ? parseDate(watch(`childPassengers.${index}.date_of_birth`)) : null}
                            />
                        </div>
                    </div>
                </CardBody>
            </Card>
        ))
    )
}

export default CheckoutOrderChild