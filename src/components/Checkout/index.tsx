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
                    adultPassengers: generateAdultPassengers(parseInt(adult)),
                    childPassengers: generateChildPassengers(parseInt(child)),
                    infantPassengers: generateInfantPassengers(parseInt(infant))
                })
            }
        },
        [flightData, methods]
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

        }
    })

    const onSubmit = (data: FormProps) => {
        const request = buildRequest(data);
        mutate(request)
    }

    return (
        <div className="flex flex-col gap-5">
            <FormProvider {...methods}>
                <Tabs aria-label="Options" variant="underlined" selectedKey={selected} classNames={{
                    cursor:"bg-[#ff5a00]",
                    base: "justify-center"
                }} onSelectionChange={(key) => handleSelectTab(key)}>
                    <Tab key="order" title={t('checkout.order')}>
                        <CheckoutOrder />
                    </Tab>
                    <Tab key="review" title={t('checkout.review')}>
                        <CheckoutOrderReview  />
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
                    <Button bgColor={"orange"} className="min-w-40" disabled={isMutating} isLoading={isMutating} onClick={onOpen}>
                        {t('checkout.continue_payment')}
                    </Button>
                    <BaseButton color="primary" variant="light" disabled={isMutating} isLoading={isMutating} onClick={() => setSelected('order')}>
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
                        <BaseButton color="danger" variant="light" disabled={isMutating} isLoading={isMutating} onPress={onClose}>
                            {t('checkout.cancel')}
                        </BaseButton>
                        <Button bgColor={"orange"} className="min-w-40" disabled={isMutating} isLoading={isMutating} onClick={handleSubmit(onSubmit)}>
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