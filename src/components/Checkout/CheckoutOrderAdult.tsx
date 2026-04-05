import { Card, CardBody, CardHeader, Divider, Input, Select, SelectItem } from "@nextui-org/react"
import { useFieldArray, useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { FormProps } from "./forms/useForm";
import { User, Calendar } from "lucide-react";
import { motion } from "framer-motion";

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
        <div className="flex flex-col gap-6">
            {fields.map((field, index) => (
                <motion.div
                    key={field.adultPassengerKey}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                >
                    <Card className="glass-card border-none bg-white/10 backdrop-blur-3xl shadow-xl rounded-[32px] overflow-hidden">
                        <CardHeader className="flex items-center gap-3 p-8 pb-4">
                            <div className="w-10 h-10 rounded-2xl bg-orange-500/10 flex items-center justify-center">
                                <User size={20} className="text-[#ff5a00]" />
                            </div>
                            <span className="text-lg font-black text-slate-800 tracking-tight">
                                {t('checkout.adult', { count: index+1 })}
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
                                        selectedKeys={[watch(`adultPassengers.${index}.call`)]}
                                        errorMessage={errors?.adultPassengers?.[index]?.call?.message}
                                        isInvalid={!!errors?.adultPassengers?.[index]?.call}
                                        onChange={(e) => setValue(`adultPassengers.${index}.call`, e.target.value)}
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
                                            value={watch(`adultPassengers.${index}.firstname`)}
                                            onValueChange={(value) => setValue(`adultPassengers.${index}.firstname`, value)}
                                            isInvalid={!!errors?.adultPassengers?.[index]?.firstname}
                                            errorMessage={errors?.adultPassengers?.[index]?.firstname?.message}
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
                                        value={watch(`adultPassengers.${index}.lastname`)}
                                        onValueChange={(value) => setValue(`adultPassengers.${index}.lastname`, value)}
                                        isInvalid={!!errors?.adultPassengers?.[index]?.lastname}
                                        errorMessage={errors?.adultPassengers?.[index]?.lastname?.message}
                                        classNames={{
                                            label: "font-black uppercase tracking-[0.2em] text-slate-400 text-[10px]",
                                            input: "font-bold text-slate-700",
                                        }}
                                    />
                                    <Input
                                        type="date"
                                        label={t('checkout.date_of_birth')}
                                        labelPlacement="outside"
                                        variant="underlined"
                                        placeholder={t('checkout.select_date')}
                                        value={watch(`adultPassengers.${index}.date_of_birth`)}
                                        onValueChange={(value) => handleDateChange(value, index)}
                                        isInvalid={!!errors?.adultPassengers?.[index]?.date_of_birth}
                                        errorMessage={errors?.adultPassengers?.[index]?.date_of_birth?.message}
                                        startContent={<Calendar size={18} className="text-slate-400 mr-1" />}
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

export default CheckoutOrderAdult
