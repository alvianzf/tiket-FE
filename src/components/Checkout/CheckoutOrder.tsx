import { Card, CardBody, CardHeader, Divider, Input } from "@nextui-org/react";
import { useTranslation } from "react-i18next";
import { useFormContext } from "react-hook-form";
import { FormProps } from "./forms/useForm";
import CheckoutOrderAdult from "./CheckoutOrderAdult";
import CheckoutOrderChild from "./CheckoutOrderChild";
import CheckoutOrderInfant from "./CheckoutOrderInfant";
import { User, Phone, Mail, FileText } from "lucide-react";

const CheckoutOrder = () => {

    const { watch, setValue, formState: { errors } } = useFormContext<FormProps>();

    const { t } = useTranslation();

    return (
        <div className="flex flex-col gap-12">
            <div className="flex flex-col gap-6">
                <div className="flex items-center gap-3">
                    <div className="w-1.5 h-6 bg-orange-500 rounded-full"></div>
                    <p className="text-xl font-extrabold text-slate-800 tracking-tight">{t('checkout.order_section_title')}</p>
                </div>
                
                <Card className="glass-card border-none bg-white/10 backdrop-blur-3xl shadow-xl rounded-[32px] overflow-hidden">
                    <CardHeader className="flex flex-col items-start gap-1 p-8 pb-4">
                        <div className="flex items-center gap-2 text-slate-400 font-black uppercase tracking-[0.2em] text-xs">
                            <FileText size={14} />
                            <span>{t('checkout.order_section_description')}</span>
                        </div>
                    </CardHeader>
                    <Divider className="bg-white/10 mx-8 w-auto" />
                    <CardBody className="p-8 pt-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
                            <Input
                                type="text"
                                label={t('checkout.name_middle_name')}
                                labelPlacement="outside"
                                variant="underlined"
                                placeholder="E.g. John"
                                value={watch('firstname')}
                                onValueChange={(value) => setValue('firstname', value)}
                                errorMessage={errors?.firstname?.message}
                                isInvalid={!!errors?.firstname}
                                startContent={<User size={18} className="text-slate-400 mr-2" />}
                                classNames={{
                                    label: "font-black uppercase tracking-[0.2em] text-slate-400 text-[10px]",
                                    input: "font-bold text-slate-700",
                                }}
                            />
                            <Input
                                type="text"
                                label={t('checkout.last_name')}
                                labelPlacement="outside"
                                variant="underlined"
                                placeholder="E.g. Doe"
                                value={watch('lastname')}
                                onValueChange={(value) => setValue('lastname', value)}
                                errorMessage={errors?.lastname?.message}
                                isInvalid={!!errors?.lastname}
                                startContent={<User size={18} className="text-slate-400 mr-2" />}
                                classNames={{
                                    label: "font-black uppercase tracking-[0.2em] text-slate-400 text-[10px]",
                                    input: "font-bold text-slate-700",
                                }}
                            />
                            <Input
                                type="text"
                                label={t('checkout.phone_no')}
                                labelPlacement="outside"
                                variant="underlined"
                                placeholder="E.g. +62812345678"
                                value={watch('phone')}
                                onValueChange={(value) => setValue('phone', value)}
                                errorMessage={errors?.phone?.message}
                                isInvalid={!!errors?.phone}
                                startContent={<Phone size={18} className="text-slate-400 mr-2" />}
                                classNames={{
                                    label: "font-black uppercase tracking-[0.2em] text-slate-400 text-[10px]",
                                    input: "font-bold text-slate-700",
                                }}
                            />
                            <Input
                                type="text"
                                label={t('checkout.email')}
                                labelPlacement="outside"
                                variant="underlined"
                                placeholder="E.g. john.doe@example.com"
                                value={watch('email')}
                                onValueChange={(value) => setValue('email', value)}
                                errorMessage={errors?.email?.message}
                                isInvalid={!!errors?.email}
                                startContent={<Mail size={18} className="text-slate-400 mr-2" />}
                                classNames={{
                                    label: "font-black uppercase tracking-[0.2em] text-slate-400 text-[10px]",
                                    input: "font-bold text-slate-700",
                                }}
                            />
                        </div>
                    </CardBody>
                </Card>
            </div>

            <div className="flex flex-col gap-8">
                <div className="flex items-center gap-3">
                    <div className="w-1.5 h-6 bg-orange-500 rounded-full"></div>
                    <p className="text-xl font-extrabold text-slate-800 tracking-tight">{t('checkout.detail_traveler')}</p>
                </div>
                
                <div className="flex flex-col gap-6">
                    <CheckoutOrderAdult />
                    <CheckoutOrderChild />
                    <CheckoutOrderInfant />
                </div>
            </div>
        </div>
    )
}

export default CheckoutOrder