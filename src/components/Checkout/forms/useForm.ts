import { useTranslation } from 'react-i18next';
import * as yup from 'yup';
import { useForm as useFormReactHook } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

export interface Passenger {
    firstname: string;
    lastname: string;
    call: string;
    date_of_birth: string;
}

export interface FormProps {
    firstname: string;
    lastname: string;
    flight: string;
    from: string;
    to: string;
    date: string;
    adult: number;
    child: number;
    infant: number;
    email: string;
    phone: string;
    adultPassengers: Passenger[];
    childPassengers: Passenger[];
    infantPassengers: Passenger[];
}

export const DEFAULT_VALUES: FormProps = {
    flight: '',
    from: '',
    to: '',
    date: '',
    adult: 0,
    child: 0,
    infant: 0,
    email: '',
    phone: '',
    adultPassengers: [],
    firstname: '',
    lastname: '',
    childPassengers: [],
    infantPassengers: []
};

const useForm = () => {
    const { t } = useTranslation();

    const schema = yup
        .object({
            firstname: yup.string().required(t('form.required')),
            lastname: yup.string().required(t('form.required')),
            flight: yup.string().required(t('form.required')),
            from: yup.string().required(t('form.required')),
            to: yup.string().required(t('form.required')),
            date: yup.string().required(t('form.required')),
            adult: yup.number().required(t('form.required')),
            child: yup.number().required(t('form.required')),
            infant: yup.number().required(t('form.required')),
            email: yup.string().email().required(t('form.required')),
            phone: yup.string().required(t('form.required')),
            adultPassengers: yup.array().of(yup.object().shape({
                firstname: yup.string().required(t('form.required')),
                lastname: yup.string().required(t('form.required')),
                call: yup.string().required(t('form.required')),
                date_of_birth: yup.string().required(t('form.required'))
            })).required().min(1),
            childPassengers: yup.array().of(yup.object().shape({
                firstname: yup.string().required(t('form.required')),
                lastname: yup.string().required(t('form.required')),
                call: yup.string().required(t('form.required')),
                date_of_birth: yup.string().required(t('form.required'))
            })).required(),
            infantPassengers: yup.array().of(yup.object().shape({
                firstname: yup.string().required(t('form.required')),
                lastname: yup.string().required(t('form.required')),
                call: yup.string().required(t('form.required')),
                date_of_birth: yup.string().required(t('form.required'))
            })).required(),
        })
        .required();

    const methods = useFormReactHook<FormProps>({
        defaultValues: DEFAULT_VALUES,
        resolver: yupResolver(schema),
      });

    return methods
}

export default useForm