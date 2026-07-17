import { Card, Divider } from "@mui/material"
import { useTranslation } from "react-i18next"
import CheckoutOrderReviewPassenger from "./CheckoutOrderReviewPassenger";
import { useFieldArray, useFormContext } from "react-hook-form";
import { FormProps } from "./forms/useForm";
import { Mail, Phone, ClipboardCheck } from "lucide-react";
import { motion } from "framer-motion";

const CheckoutOrderReview = () => {

    const { t } = useTranslation();

    const { watch, control } = useFormContext<FormProps>();

    const { fields: adultFields } = useFieldArray({
        control,
        name: 'adultPassengers',
        keyName: 'adultPassengerKey'
    });

    const { fields: childFields } = useFieldArray({
        control,
        name: 'childPassengers',
        keyName: 'childPassengerKey'
    });

    const { fields: infantFields } = useFieldArray({
        control,
        name: 'infantPassengers',
        keyName: 'infantPassengerKey'
    });

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <div className="flex flex-col gap-12">
            <motion.div
                initial="hidden"
                animate="visible"
                variants={containerVariants}
                className="flex flex-col gap-12"
            >
                {/* Contact Summary */}
                <motion.div variants={itemVariants} className="flex flex-col gap-6">
                    <div className="flex items-center gap-3">
                        <div className="w-1.5 h-6 bg-primary rounded-full"></div>
                        <p className="text-xl font-extrabold text-dark tracking-tight">{t('checkout.order_section_title')}</p>
                    </div>

                    <Card className="shadow-md overflow-hidden">
                        <div className="flex items-center gap-3 p-8 pb-4">
                            <div className="w-10 h-10 rounded-ds-md bg-primary/10 flex items-center justify-center">
                                <ClipboardCheck size={20} className="text-primary" />
                            </div>
                            <span className="text-lg font-bold text-dark tracking-tight">
                                {watch('firstname')} {watch('lastname')}
                            </span>
                        </div>
                        <Divider sx={{ mx: 4, borderColor: "rgba(255,255,255,0.1)" }} />
                        <div className="p-8 pt-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="flex items-center gap-4 group">
                                    <div className="w-12 h-12 rounded-ds-md bg-slate-100 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                                        <Mail size={18} className="text-slate-400 group-hover:text-primary" />
                                    </div>
                                    <div className="flex flex-col">
                                        <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 font-sans mb-0.5">{t('checkout.email')}</p>
                                        <p className="font-semibold text-dark">{watch('email') || '-'}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 group">
                                    <div className="w-12 h-12 rounded-ds-md bg-slate-100 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                                        <Phone size={18} className="text-slate-400 group-hover:text-primary" />
                                    </div>
                                    <div className="flex flex-col">
                                        <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 font-sans mb-0.5">{t('checkout.phone_no')}</p>
                                        <p className="font-mono font-semibold text-dark">{watch('phone') || '-'}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Card>
                </motion.div>

                {/* Travelers Summary */}
                <motion.div variants={itemVariants} className="flex flex-col gap-6">
                    <div className="flex items-center gap-3">
                        <div className="w-1.5 h-6 bg-primary rounded-full"></div>
                        <p className="text-xl font-extrabold text-dark tracking-tight">{t('checkout.detail_traveler')}</p>
                    </div>

                    <div className="flex flex-col gap-4">
                        {adultFields.map((field, index) => (
                            <motion.div key={field.adultPassengerKey} variants={itemVariants}>
                                <CheckoutOrderReviewPassenger
                                    fullname={`${watch(`adultPassengers.${index}.call`)}. ${watch(`adultPassengers.${index}.firstname`)} ${watch(`adultPassengers.${index}.lastname`)}`}
                                    date_of_birth={`${watch(`adultPassengers.${index}.date_of_birth`)}`}
                                    index={index + 1}
                                />
                            </motion.div>
                        ))}
                        {childFields.map((field, index) => (
                            <motion.div key={field.childPassengerKey} variants={itemVariants}>
                                <CheckoutOrderReviewPassenger
                                    fullname={`${watch(`childPassengers.${index}.call`)}. ${watch(`childPassengers.${index}.firstname`)} ${watch(`childPassengers.${index}.lastname`)}`}
                                    date_of_birth={`${watch(`childPassengers.${index}.date_of_birth`)}`}
                                    index={index + 1}
                                />
                            </motion.div>
                        ))}
                        {infantFields.map((field, index) => (
                            <motion.div key={field.infantPassengerKey} variants={itemVariants}>
                                <CheckoutOrderReviewPassenger
                                    fullname={`${watch(`infantPassengers.${index}.call`)}. ${watch(`infantPassengers.${index}.firstname`)} ${watch(`infantPassengers.${index}.lastname`)}`}
                                    date_of_birth={`${watch(`infantPassengers.${index}.date_of_birth`)}`}
                                    index={index + 1}
                                />
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </motion.div>
        </div>
    )
}

export default CheckoutOrderReview