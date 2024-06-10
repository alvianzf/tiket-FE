import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Tab, Tabs, Button as BaseButton, useDisclosure } from "@nextui-org/react"
import { useTranslation } from "react-i18next"
import CheckoutOrder from "./CheckoutOrder";
import { useEffect, useState } from "react";
import CheckoutOrderReview from "./CheckoutOrderReview";
import { FindPrice } from "@api/findPrice/types";
import { FormProvider } from "react-hook-form";
import useForm, { DEFAULT_VALUES, Passenger } from "./forms/useForm";
import Button from "@components/Button";
import { useRouter } from "next/router";

export type Key = string | number;

interface Props {
    flightPrice?: FindPrice;
    isLoading: boolean;
}

const Checkout = ({ flightPrice, isLoading }: Props) => {

    const { t } = useTranslation();

    const [selected, setSelected] = useState<Key>("order");
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const { push } = useRouter();
    
    const methods = useForm();
    const { handleSubmit } = methods;

    const handleSelectTab = async (key: Key) => {
        const isValid = await methods.trigger();
        if(isValid) {
            setSelected(key);
            return
        }
    };

    const generateAdultPassengers = (total: number) => {
        const passengers: Passenger[] = [];

        for (let i = 0; i < total; i++) {
            passengers.push({
                firstname: '',
                lastname: '',
                call: '',
                date_of_birth: ''
            })
        }

        return passengers
    };

    const generateChildPassengers = (total: number) => {
        const passengers: Passenger[] = [];

        for (let i = 0; i < total; i++) {
            passengers.push({
                firstname: '',
                lastname: '',
                call: '',
                date_of_birth: ''
            })
        }

        return passengers
    };

    const generateInfantPassengers = (total: number) => {
        const passengers: Passenger[] = [];

        for (let i = 0; i < total; i++) {
            passengers.push({
                firstname: '',
                lastname: '',
                call: '',
                date_of_birth: ''
            })
        }

        return passengers
    };

    useEffect(
        () => {
            if(flightPrice) {
                methods.reset({
                    ...DEFAULT_VALUES,
                    flight: flightPrice.flight_code,
                    from: flightPrice.flight_from,
                    to: flightPrice.flight_to,
                    date: flightPrice.flight_date,
                    adult: flightPrice.adult,
                    child: flightPrice.child,
                    infant: flightPrice.infant,
                    adultPassengers: generateAdultPassengers(flightPrice.adult),
                    childPassengers: generateChildPassengers(flightPrice.child),
                    infantPassengers: generateInfantPassengers(flightPrice.infant)
                })
            }
        },
        [flightPrice, methods]
    );

    const onSubmit = () => {
        push({
            pathname: '/checkout/payment',
            query: {
                bookingno: '123456'
            }
        })
    }

    return (
        <div className="flex flex-col gap-5">
            <FormProvider {...methods}>
                <Tabs aria-label="Options" variant="underlined" selectedKey={selected} classNames={{
                    cursor:"bg-[#ff5a00]",
                    base: "justify-center"
                }} onSelectionChange={(key) => handleSelectTab(key)}>
                    <Tab key="order" title={t('checkout.order')}>
                        <CheckoutOrder flightPrice={flightPrice} isLoading={isLoading}/>
                    </Tab>
                    <Tab key="review" title={t('checkout.review')}>
                        <CheckoutOrderReview  flightPrice={flightPrice} isLoading={isLoading} />
                    </Tab>
                </Tabs>
            </FormProvider>
            {selected === 'order' && (
                <Button bgColor={"orange"} className="min-w-40" onClick={() => handleSelectTab('review')} disabled={isLoading} isLoading={isLoading}>
                    {t('checkout.continue')}
                </Button>
            )}
            {selected === 'review' && (
                <div className="flex flex-col gap-5">
                    <Button bgColor={"orange"} className="min-w-40" onClick={onOpen}>
                        {t('checkout.continue_payment')}
                    </Button>
                    <BaseButton color="primary" variant="light" onClick={() => handleSelectTab('order')}>
                        {t('checkout.back')}
                    </BaseButton>
                </div>
            )}
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                {(onClose) => (
                    <>
                    <ModalHeader className="flex flex-col gap-1">{t('checkout.confirm_order')}</ModalHeader>
                    <ModalBody>
                        <p> 
                        {t('checkout.confirm_order_desc')}
                        </p>
                    </ModalBody>
                    <ModalFooter>
                        <BaseButton color="danger" variant="light" onPress={onClose}>
                            {t('checkout.cancel')}
                        </BaseButton>
                        <Button bgColor={"orange"} className="min-w-40" onClick={handleSubmit(onSubmit)}>
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