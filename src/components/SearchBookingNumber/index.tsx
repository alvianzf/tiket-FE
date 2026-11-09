import { useTranslation } from "react-i18next"
import useForm, { FormProps } from "./forms/useForm";
import { FormProvider } from "react-hook-form";
import Button from "@components/ui/Button";
import TextField from "@components/ui/TextField";
import { useMutation } from "react-query";
import { Ticket } from "lucide-react";
import { checkBookFlight } from "@api/bookFlight";
import { useRouter } from "next/router";

interface Props {
    onOpenChangeFind: () => void;
}

const SearchBookingNumber = ({ onOpenChangeFind } : Props) => {

    const { t } = useTranslation();

    const methods = useForm();

    const { setValue, watch, formState: { errors }, handleSubmit } = methods;

    const booking_no = watch('booking_no');

    const { push } = useRouter();

    const { mutate, isLoading } = useMutation(checkBookFlight, {
        onSuccess: (data) => {
            if(data.rc === '00') {
                push({
                    pathname: '/eticket',
                    query: {
                        bookingno: data.data.bookingCode
                    }
                }).then(() => {
                    onOpenChangeFind();
                });
            } else {
                onOpenChangeFind();
            }
        },
        onError: () => {
            onOpenChangeFind();
        }
    })

    const onSubmit = (data: FormProps) => {
        mutate(data.booking_no);
    }

    return (
        <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
                <TextField
                    label={t('home.booking_no')}
                    fullWidth
                    startIcon={<Ticket size={18} />}
                    value={booking_no || ""}
                    onChange={(e) => setValue('booking_no', e.target.value)}
                    error={errors?.booking_no?.message}
                    disabled={isLoading}
                />
                <Button type="submit" variant="cta" isLoading={isLoading} fullWidth>
                    {t('home.find_booking_no')}
                </Button>
            </form>
        </FormProvider>
    )
}

export default SearchBookingNumber
