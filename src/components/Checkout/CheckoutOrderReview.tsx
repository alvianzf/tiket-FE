import { Card, CardBody, CardHeader, Divider } from "@nextui-org/react"
import { useTranslation } from "react-i18next"
import CheckoutOrderReviewPassenger from "./CheckoutOrderReviewPassenger";
import { useFieldArray, useFormContext } from "react-hook-form";
import { FormProps } from "./forms/useForm";

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

    return (
        <>
            <div className="flex flex-col gap-10">
                <div className="flex flex-row flex-wrap gap-[30px]">
                    <div className="flex flex-col gap-[80px] w-[100%] md:w-[100%] lg:w-[100%]">
                        <div className="flex flex-col gap-4">
                            <p className="text-lg font-medium">{t('checkout.order_section_title')}</p>
                            <Card classNames={{
                                header: "font-medium"
                            }}>
                                <CardHeader>
                                    <div className="flex justify-between">
                                        {`${watch('firstname')} ${watch('lastname')}`}
                                    </div>
                                </CardHeader>
                                <Divider />
                                <CardBody>
                                    <div className="flex justify-between">
                                        <div className="flex flex-col">
                                            <p className="text-gray-500">{t('checkout.email')}</p>
                                            <p>{watch('email')}</p>
                                        </div>
                                        <div className="flex flex-col">
                                            <p className="text-gray-500">{t('checkout.phone_no')}</p>
                                            <p>{watch('phone')}</p>
                                        </div>
                                    </div>
                                </CardBody>
                            </Card>
                        </div>
                        <div className="flex flex-col gap-4">
                            <p className="text-lg font-medium">{t('checkout.detail_traveler')}</p>
                            {adultFields.map((_field, index) => (
                                <CheckoutOrderReviewPassenger 
                                    fullname={`${watch(`adultPassengers.${index}.firstname`)} ${watch(`adultPassengers.${index}.lastname`)}`} 
                                    date_of_birth={`${watch(`adultPassengers.${index}.date_of_birth`)}`} index={index+1} />

                            ))}
                            {childFields.map((_field, index) => (
                                <CheckoutOrderReviewPassenger 
                                    fullname={`${watch(`childPassengers.${index}.firstname`)} ${watch(`childPassengers.${index}.lastname`)}`} 
                                    date_of_birth={`${watch(`childPassengers.${index}.date_of_birth`)}`} index={index+1} />

                            ))}
                            {infantFields.map((_field, index) => (
                                <CheckoutOrderReviewPassenger 
                                    fullname={`${watch(`infantPassengers.${index}.firstname`)} ${watch(`infantPassengers.${index}.lastname`)}`} 
                                    date_of_birth={`${watch(`infantPassengers.${index}.date_of_birth`)}`} index={index+1} />

                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CheckoutOrderReview