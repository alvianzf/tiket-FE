import { useTranslation } from 'react-i18next';
import * as yup from 'yup';
import { useForm as useFormReactHook } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

export interface FormProps {
    fullName: string;
    phone: string;
    email: string;
    checkIn: string;
    checkOut: string;
    guests: number;
}

export const DEFAULT_VALUES: FormProps = {
    fullName: '',
    phone: '',
    email: '',
    checkIn: '',
    checkOut: '',
    guests: 1,
};

const useForm = () => {
    const { t } = useTranslation();

    const schema = yup
        .object({
            fullName: yup.string().required(t('form.required')),
            phone: yup.string().required(t('form.required')),
            email: yup.string().email(t('form.invalid_email')).required(t('form.required')),
            checkIn: yup.string().required(t('form.required')),
            checkOut: yup.string().required(t('form.required')),
            guests: yup.number().min(1).required(t('form.required')),
        })
        .required();

    const methods = useFormReactHook<FormProps>({
        defaultValues: DEFAULT_VALUES,
        resolver: yupResolver(schema),
    });

    return methods;
};

export default useForm;
