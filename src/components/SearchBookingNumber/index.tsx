import { useTranslation } from "react-i18next"
import useForm, { FormProps } from "./forms/useForm";
import { FormProvider } from "react-hook-form";
import { Button, TextField, InputAdornment, CircularProgress } from "@mui/material";
import { useMutation } from "react-query";
import { FaTicketAlt } from "react-icons/fa";
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
            <div className="flex flex-col gap-5">
                <div className="flex flex-col gap-2">
                    <p>{t('home.booking_no')}</p>
                    <TextField
                        type="text"
                        variant="standard"
                        fullWidth
                        defaultValue={booking_no}
                        onChange={(e) => setValue('booking_no', e.target.value)}
                        helperText={errors?.booking_no?.message}
                        error={!!errors?.booking_no}
                        disabled={isLoading}
                        slotProps={{
                            input: {
                                startAdornment: (
                                    <InputAdornment position="start"><FaTicketAlt className="text-[#4267B2]" /></InputAdornment>
                                )
                            }
                        }}
                    />
                </div>
                <Button
                    variant="contained"
                    color="warning"
                    startIcon={isLoading ? <CircularProgress size={16} color="inherit" /> : undefined}
                    disabled={isLoading}
                    onClick={handleSubmit(onSubmit)}
                >
                    {t('home.find_booking_no')}
                </Button>
            </div>
        </FormProvider>
    )
}

export default SearchBookingNumber
