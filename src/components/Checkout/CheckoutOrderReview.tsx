import { Card, CardBody, CardHeader, Divider, Button as BaseButton, useDisclosure, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@nextui-org/react"
import { useTranslation } from "react-i18next"
import CheckoutOrderSummary from "./CheckoutOrderSummary"
import Button from "@components/Button";
import CheckoutOrderReviewPassenger from "./CheckoutOrderReviewPassenger";

interface Props {
    handlePreviousTab: () => void;
}

const CheckoutOrderReview = ({ handlePreviousTab }: Props) => {

    const { t } = useTranslation();

    const {isOpen, onOpen, onOpenChange} = useDisclosure();

    return (
        <>
            <div className="flex flex-col gap-10">
                <div className="flex flex-row flex-wrap gap-[30px]">
                    <div className="flex flex-col gap-[80px] w-[100%] md:w-[60%] lg:w-[60%]">
                        <div className="flex flex-col gap-4">
                            <p className="text-lg font-medium">{t('checkout.order_section_title')}</p>
                            <Card classNames={{
                                header: "font-medium"
                            }}>
                                <CardHeader>
                                    <div className="flex justify-between">
                                        {'John Doe'}
                                    </div>
                                </CardHeader>
                                <Divider />
                                <CardBody>
                                    <div className="flex justify-between">
                                        <div className="flex flex-col">
                                            <p className="text-gray-500">{t('checkout.email')}</p>
                                            <p>{'johndoe@gmail.com'}</p>
                                        </div>
                                        <div className="flex flex-col">
                                            <p className="text-gray-500">{t('checkout.phone_no')}</p>
                                            <p>{'123456789'}</p>
                                        </div>
                                    </div>
                                </CardBody>
                            </Card>
                        </div>
                        <div className="flex flex-col gap-4">
                            <p className="text-lg font-medium">{t('checkout.detail_traveler')}</p>
                            <CheckoutOrderReviewPassenger />
                        </div>
                    </div>
                    <div className="w-[100%] md:w-[36%] lg:w-[36%]">
                        <CheckoutOrderSummary />
                    </div>
                </div>
                <div className="flex flex-col gap-5">
                    <Button bgColor={"orange"} className="min-w-40" onClick={onOpen}>
                        {t('checkout.continue_payment')}
                    </Button>
                    <BaseButton color="primary" variant="light" onClick={handlePreviousTab}>
                        {t('checkout.back')}
                    </BaseButton>
                </div>
            </div>
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
                        <Button bgColor={"orange"} className="min-w-40">
                            {t('checkout.continue_payment')}
                        </Button>
                    </ModalFooter>
                    </>
                )}
                </ModalContent>
            </Modal>
        </>
    )
}

export default CheckoutOrderReview