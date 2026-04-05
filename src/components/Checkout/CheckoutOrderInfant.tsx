import { Card, CardBody, CardHeader, DatePicker, Divider, Input, Select, SelectItem } from "@nextui-org/react"
import { useFieldArray, useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { FormProps } from "./forms/useForm";
import moment from "moment";
import { parseDate } from "@internationalized/date";
import { Baby } from "lucide-react";
import { motion } from "framer-motion";

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
        <div className="flex flex-col gap-6">
            {fields.map((field, index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                >
                    <Card className="glass-card border-none bg-white/10 backdrop-blur-3xl shadow-xl rounded-[32px] overflow-hidden">
                        <CardHeader className="flex items-center gap-3 p-8 pb-4">
                            <div className="w-10 h-10 rounded-2xl bg-orange-500/10 flex items-center justify-center">
                                <Baby size={20} className="text-[#ff5a00]" />
                            </div>
                            <span className="text-lg font-black text-slate-800 tracking-tight">
                                {t('checkout.infant', { count: index+1 })}
                            </span>
                        </CardHeader>
                        <Divider className="bg-white/10 mx-8 w-auto" />
                        <CardBody className="p-8 pt-6">
                            <div className="flex flex-col gap-8 w-full">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                    <Select
                                        label={t('checkout.choose')}
                                        labelPlacement="outside"
                                        variant="underlined"
                                        selectionMode="single"
                                        placeholder="Title"
                                        selectedKeys={[watch(`infantPassengers.${index}.call`)]}
                                        errorMessage={errors?.infantPassengers?.[index]?.call?.message}
                                        isInvalid={!!errors?.infantPassengers?.[index]?.call}
                                        onChange={(e) => setValue(`infantPassengers.${index}.call`, e.target.value)}
                                        classNames={{
                                            label: "font-black uppercase tracking-[0.2em] text-slate-400 text-[10px]",
                                            trigger: "h-10 min-h-unit-10",
                                            value: "font-bold text-slate-700",
                                        }}
                                    >
                                        {options.map((item) => (
                                            <SelectItem key={item.key} value={item.key}>
                                                {item.label}
                                            </SelectItem>
                                        ))}
                                    </Select>
                                    <div className="md:col-span-2">
                                        <Input
                                            type="text"
                                            label={t('checkout.name_middle_name')}
                                            labelPlacement="outside"
                                            variant="underlined"
                                            placeholder="Enter first/middle name"
                                            defaultValue={watch(`infantPassengers.${index}.firstname`)}
                                            onValueChange={(value) => setValue(`infantPassengers.${index}.firstname`, value)}
                                            errorMessage={errors?.infantPassengers?.[index]?.firstname?.message}
                                            isInvalid={!!errors?.infantPassengers?.[index]?.firstname}
                                            classNames={{
                                                label: "font-black uppercase tracking-[0.2em] text-slate-400 text-[10px]",
                                                input: "font-bold text-slate-700",
                                            }}
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <Input
                                        type="text"
                                        label={t('checkout.last_name')}
                                        labelPlacement="outside"
                                        variant="underlined"
                                        placeholder="Enter last name"
                                        defaultValue={watch(`infantPassengers.${index}.lastname`)}
                                        onValueChange={(value) => setValue(`infantPassengers.${index}.lastname`, value)}
                                        errorMessage={errors?.infantPassengers?.[index]?.lastname?.message}
                                        isInvalid={!!errors?.infantPassengers?.[index]?.lastname}
                                        classNames={{
                                            label: "font-black uppercase tracking-[0.2em] text-slate-400 text-[10px]",
                                            input: "font-bold text-slate-700",
                                        }}
                                    />
                                    <DatePicker
                                        label={t('checkout.date_of_birth')}
                                        labelPlacement="outside"
                                        onChange={(value) => setValue(`infantPassengers.${index}.date_of_birth`, moment(value).format('YYYY-MM-DD'))}
                                        variant="underlined"
                                        showMonthAndYearPickers
                                        errorMessage={errors?.infantPassengers?.[index]?.date_of_birth?.message}
                                        isInvalid={!!errors?.infantPassengers?.[index]?.date_of_birth}
                                        defaultValue={watch(`infantPassengers.${index}.date_of_birth`) ? parseDate(watch(`infantPassengers.${index}.date_of_birth`)) : null}
                                        classNames={{
                                            label: "font-black uppercase tracking-[0.2em] text-slate-400 text-[10px]",
                                            input: "font-bold text-slate-700",
                                        }}
                                    />
                                </div>
                            </div>
                        </CardBody>
                    </Card>
                </motion.div>
            ))}
        </div>
    )
}

export default CheckoutOrderInfant