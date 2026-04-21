import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Tab, Tabs, Button as BaseButton, useDisclosure } from "@nextui-org/react"
import { useTranslation } from "react-i18next"
import CheckoutOrder from "./CheckoutOrder";
import { useEffect, useState } from "react";
import CheckoutOrderReview from "./CheckoutOrderReview";
import { FormProvider } from "react-hook-form";
import useForm, { DEFAULT_VALUES, FormProps, Passenger } from "./forms/useForm";
import Button from "@components/Button";
import { useRouter } from "next/router";
import { useMutation } from "react-query";
import { bookFlight } from "@api/bookFlight";
import buildRequest from "./forms/buildRequest";
import { Flight } from "@api/searchFlights/types";
import { motion, AnimatePresence } from "framer-motion";
import { Info, CreditCard, ShieldCheck } from "lucide-react";

export type Key = string | number;

interface Props {
    flightData?: Flight;
    isLoading: boolean;
}

const Checkout = ({ flightData, isLoading }: Props) => {

    const { t } = useTranslation();

    const { query, push } = useRouter();

    const from = query?.from as unknown as string;
    const to = query?.to as unknown as string;
    const date = query?.date as unknown as string;
    const adult = query?.adult as unknown as string;
    const child = query?.child as unknown as string;
    const infant = query?.infant as unknown as string;

    const [selected, setSelected] = useState<Key>("order");
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    
    const methods = useForm();
    const { handleSubmit } = methods;

    const handleSelectTab = async (key: Key) => {
        const isValid = await methods.trigger();
        if(isValid) {
            setSelected(key);
            return
        }
    };

    const generatePassengers = (total: number): Passenger[] => {
        return Array(total).fill(null).map(() => ({
            firstname: '',
            lastname: '',
            call: '',
            date_of_birth: ''
        }));
    };

    useEffect(
        () => {
            if(flightData) {
                methods.reset({
                    ...DEFAULT_VALUES,
                    searchId: flightData.searchId,
                    from,
                    to,
                    date,
                    adult: parseInt(adult),
                    child: parseInt(child),
                    infant: parseInt(infant),
                    adultPassengers: generatePassengers(parseInt(adult)),
                    childPassengers: generatePassengers(parseInt(child)),
                    infantPassengers: generatePassengers(parseInt(infant))
                })
            }
        },
        [flightData, methods, from, to, date, adult, child, infant]
    );

    const { mutate, isLoading: isMutating } = useMutation(bookFlight, {
        onSuccess: (data) => {
            if(data.rc === "00") {
                push({
                    pathname: '/checkout/payment',
                    query: {
                        bookingno: data.data.bookingCode
                    }
                })
                return
            }
        },
        onError: () => {
            // Handle error
        }
    })

    const onSubmit = (data: FormProps) => {
        const request = buildRequest(data);
        mutate(request)
    }

    return (
        <div className="flex flex-col gap-10">
            <FormProvider {...methods}>
                <div className="flex justify-center">
                    <Tabs 
                        aria-label="Checkout Steps" 
                        variant="underlined" 
                        selectedKey={selected} 
                        classNames={{
                            cursor:"bg-cta h-1 rounded-full",
                            base: "justify-center",
                            tabList: "gap-12 border-b border-primary/10 pb-0",
                            tab: "max-w-fit px-0 h-14",
                            tabContent: "group-data-[selected=true]:text-cta font-black uppercase tracking-[0.2em] text-xs"
                        }} 
                        onSelectionChange={handleSelectTab}
                    >
                        <Tab 
                            key="order" 
                            title={
                                <div className="flex items-center gap-2">
                                    <Info size={14} className="mb-0.5" />
                                    <span>{t('checkout.order')}</span>
                                </div>
                            }
                        >
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                className="pt-8"
                            >
                                <CheckoutOrder />
                            </motion.div>
                        </Tab>
                        <Tab 
                            key="review" 
                            title={
                                <div className="flex items-center gap-2">
                                    <ShieldCheck size={14} className="mb-0.5" />
                                    <span>{t('checkout.review')}</span>
                                </div>
                            }
                        >
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="pt-8"
                            >
                                <CheckoutOrderReview  />
                            </motion.div>
                        </Tab>
                    </Tabs>
                </div>
            </FormProvider>

            <AnimatePresence mode="wait">
                {selected === 'order' && (
                    <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="flex justify-center mt-4"
                    >
                        <Button 
                            dsVariant="cta" 
                            className="h-14 px-16 text-lg font-bold shadow-md rounded-ds-sm min-w-64" 
                            onClick={() => handleSelectTab('review')} 
                            disabled={isLoading} 
                            isLoading={isLoading}
                        >
                            {t('checkout.continue')}
                        </Button>
                    </motion.div>
                )}
                {selected === 'review' && (
                    <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="flex flex-col items-center gap-4 mt-4"
                    >
                        <Button 
                            dsVariant="cta" 
                            className="h-14 px-16 text-lg font-bold shadow-md rounded-ds-sm min-w-64" 
                            disabled={isMutating} 
                            isLoading={isMutating} 
                            onClick={onOpen}
                        >
                            <CreditCard className="mr-2" size={20} />
                            {t('checkout.continue_payment')}
                        </Button>
                        <BaseButton 
                            variant="light" 
                            className="font-bold text-slate-400 hover:text-slate-600 transition-colors tracking-widest uppercase text-xs"
                            disabled={isMutating} 
                            isLoading={isMutating} 
                            onClick={() => setSelected('order')}
                        >
                            {t('checkout.back')}
                        </BaseButton>
                    </motion.div>
                )}
            </AnimatePresence>

            <Modal 
                isOpen={isOpen} 
                onOpenChange={onOpenChange}
                backdrop="blur"
                classNames={{
                    backdrop: "bg-black/30 backdrop-blur-md",
                    wrapper: "z-[9999]",
                    base: "glass-card bg-white/95 backdrop-blur-3xl border-none shadow-2xl rounded-ds-lg overflow-hidden p-4",
                }}
            >
                <ModalContent>
                {(onClose) => (
                    <>
                    <ModalHeader className="flex flex-col gap-2 pt-8">
                        <div className="bg-primary/10 w-16 h-16 rounded-ds-md flex items-center justify-center mb-2">
                            <ShieldCheck size={32} className="text-primary" />
                        </div>
                        <h2 className="text-2xl font-black text-dark tracking-tight">{t('checkout.confirm_order')}</h2>
                    </ModalHeader>
                    <ModalBody className="pb-8">
                        <p className="text-slate-500 font-medium leading-relaxed"> 
                            {t('checkout.confirm_order_desc')}
                        </p>
                    </ModalBody>
                    <ModalFooter className="flex flex-col md:flex-row gap-3 pt-0 pb-8">
                        <BaseButton 
                            variant="flat" 
                            className="font-bold rounded-ds-sm h-12 flex-1 bg-slate-100 text-slate-500"
                            disabled={isMutating} 
                            isLoading={isMutating} 
                            onClick={onClose}
                        >
                            {t('checkout.cancel')}
                        </BaseButton>
                        <Button 
                            dsVariant="cta" 
                            className="h-12 px-8 font-bold shadow-md rounded-ds-sm flex-1" 
                            disabled={isMutating} 
                            isLoading={isMutating} 
                            onClick={handleSubmit(onSubmit)}
                        >
                            {t('checkout.continue_payment')}
                        </Button>
                    </ModalFooter>
                    </>
                )}
                </ModalContent>
            </Modal>
        </div>
    )
}

export default Checkout