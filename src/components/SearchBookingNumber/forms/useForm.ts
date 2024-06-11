import { useTranslation } from 'react-i18next';
import * as yup from 'yup';
import { useForm as useFormReactHook } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

export interface FormProps {
    booking_no: string;
}

export const DEFAULT_VALUES: FormProps = {
    booking_no: ''
};

const useForm = () => {
    const { t } = useTranslation();

    const schema = yup
        .object({
            booking_no: yup.string().required(t('form.required')),
        })
        .required();

    const methods = useFormReactHook<FormProps>({
        defaultValues: DEFAULT_VALUES,
        resolver: yupResolver(schema),
      });

    return methods
}

export default useForm