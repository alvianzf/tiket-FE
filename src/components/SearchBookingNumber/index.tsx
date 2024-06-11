import { useTranslation } from "react-i18next"
import useForm, { FormProps } from "./forms/useForm";
import { FormProvider } from "react-hook-form";
import { Button, Input } from "@nextui-org/react";
import { useMutation } from "react-query";
import { checkBookFlight } from "@api/bookFlight";
import { useRouter } from "next/router";

const SearchBookingNumber = () => {

    const { t } = useTranslation();

    const methods = useForm();

    const { setValue, watch, formState: { errors }, handleSubmit } = methods;

    const booking_no = watch('booking_no');

    const { push } = useRouter();

    const { mutate, isLoading } = useMutation(checkBookFlight, {
        onSuccess: (data) => {
            if(data.result === 'ok') {
                push({
                    pathname: '/eticket',
                    query: {
                        bookingno: data.kodebooking
                    }
                })
            }
        }
    })

    const onSubmit = (data: FormProps) => {
        mutate({
            kodebooking: data.booking_no
        });
    }

    return (
        <FormProvider {...methods}>
            <div className="flex flex-col gap-5">
                <div className="flex flex-col gap-2">
                    <p>{t('home.booking_no')}</p>
                    <Input
                        type="text"
                        variant="bordered"
                        defaultValue={booking_no}
                        onValueChange={(value) => setValue('booking_no', value)}
                        errorMessage={errors?.booking_no?.message}
                        isInvalid={!!errors?.booking_no}
                        disabled={isLoading}
                        classNames={{
                            inputWrapper: "rounded-none",
                            mainWrapper: "w-full"
                        }}
                    />
                </div>
                <Button className="bg-[#ff5a00] text-white" isLoading={isLoading} disabled={isLoading} onClick={handleSubmit(onSubmit)}>
                    {t('home.find_booking_no')}
                </Button>
            </div>
        </FormProvider>
    )
}

export default SearchBookingNumber