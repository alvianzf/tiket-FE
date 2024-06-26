import { Card, CardBody, CardHeader, Divider, Input } from "@nextui-org/react"
import { useTranslation } from "react-i18next"
import CheckoutOrderSummary from "./CheckoutOrderSummary"
import { useFormContext } from "react-hook-form";
import { FormProps } from "./forms/useForm";
import CheckoutOrderAdult from "./CheckoutOrderAdult";
import CheckoutOrderChild from "./CheckoutOrderChild";
import CheckoutOrderInfant from "./CheckoutOrderInfant";
import { Flight } from "@api/searchFlights/types";

interface Props {
    flightData?: Flight;
    isLoading: boolean;
}

const CheckoutOrder = ({ isLoading, flightData }: Props) => {

    const { watch, setValue, formState: { errors } } = useFormContext<FormProps>();

    const { t } = useTranslation();

    return (
        <div className="flex flex-col gap-10">
            <div className="flex flex-row flex-wrap gap-[30px]">
                <div className="flex flex-col gap-[80px] w-[100%] md:w-[60%] lg:w-[60%]">
                    <div className="flex flex-col gap-4">
                        <p className="text-lg font-medium">{t('checkout.order_section_title')}</p>
                        <Card classNames={{
                            header: "font-medium"
                        }}>
                            <CardHeader>
                                {t('checkout.order_section_description')}
                            </CardHeader>
                            <Divider />
                            <CardBody>
                                <div className="flex flex-col gap-5 w-full">
                                    <div className="flex flex-row gap-2 items-center">
                                        <p className="w-[50%]">{t('checkout.name_middle_name')}</p>
                                        <Input
                                            type="text"
                                            variant="bordered"
                                            defaultValue={watch('firstname')}
                                            onValueChange={(value) => setValue('firstname', value)}
                                            errorMessage={errors?.firstname?.message}
                                            isInvalid={!!errors?.firstname}
                                            classNames={{
                                                inputWrapper: "rounded-none",
                                                mainWrapper: "w-full"
                                            }}
                                        />
                                    </div>
                                    <div className="flex flex-row gap-2 items-center">
                                        <p className="w-[50%]">{t('checkout.last_name')}</p>
                                        <Input
                                            type="text"
                                            variant="bordered"
                                            defaultValue={watch('lastname')}
                                            onValueChange={(value) => setValue('lastname', value)}
                                            errorMessage={errors?.lastname?.message}
                                            isInvalid={!!errors?.lastname}
                                            classNames={{
                                                inputWrapper: "rounded-none",
                                                mainWrapper: "w-full"
                                            }}
                                        />
                                    </div>
                                    <div className="flex flex-row gap-2 items-center">
                                        <p className="w-[50%]">{t('checkout.phone_no')}</p>
                                        <Input
                                            type="text"
                                            variant="bordered"
                                            defaultValue={watch('phone')}
                                            onValueChange={(value) => setValue('phone', value)}
                                            errorMessage={errors?.phone?.message}
                                            isInvalid={!!errors?.phone}
                                            classNames={{
                                                inputWrapper: "rounded-none",
                                                mainWrapper: "w-full"
                                            }}
                                        />
                                    </div>
                                    <div className="flex flex-row gap-2 items-center">
                                        <p className="w-[50%]">{t('checkout.email')}</p>
                                        <Input
                                            type="text"
                                            variant="bordered"
                                            defaultValue={watch('email')}
                                            onValueChange={(value) => setValue('email', value)}
                                            errorMessage={errors?.email?.message}
                                            isInvalid={!!errors?.email}
                                            classNames={{
                                                inputWrapper: "rounded-none",
                                                mainWrapper: "w-full"
                                            }}
                                        />
                                    </div>
                                </div>
                            </CardBody>
                        </Card>
                    </div>
                    <div className="flex flex-col gap-4">
                        <p className="text-lg font-medium">{t('checkout.detail_traveler')}</p>
                        {/* Adult Section */}
                        <CheckoutOrderAdult />
                        <CheckoutOrderChild />
                        <CheckoutOrderInfant />
                    </div>
                </div>
                <div className="w-[100%] md:w-[36%] lg:w-[36%]">
                    <CheckoutOrderSummary flightData={flightData} isLoading={isLoading}/>
                </div>
            </div>
        </div>
    )
}

export default CheckoutOrder