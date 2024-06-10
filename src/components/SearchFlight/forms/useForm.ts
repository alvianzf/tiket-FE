import { useTranslation } from 'react-i18next';
import * as yup from 'yup';
import { useForm as useFormReactHook } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import moment from 'moment';

export interface FormProps {
    from: string;
    to: string;
    date: string;
    adult: string;
    child: string;
    infant: string;
    class: string;
}

export const DEFAULT_VALUES: FormProps = {
    child: '0',
    class: 'economy',
    from: '',
    to: '',
    date: moment().add(1,'days').format('YYYY-MM-DD'),
    adult: '1',
    infant: '0'
};

const useForm = () => {
    const { t } = useTranslation();

    const schema = yup
        .object({
            from: yup.string().required(t('form.required')),
            to: yup.string().required(t('form.required')),
            adult: yup.string().required(t('form.required')),
            child: yup.string().required(t('form.required')),
            infant: yup.string().required(t('form.required')),
            class: yup.string().required(t('form.required')),
            date: yup.string().required(t('form.required')),
        })
        .required();

    const methods = useFormReactHook<FormProps>({
        defaultValues: DEFAULT_VALUES,
        resolver: yupResolver(schema),
      });

    return methods
}

export default useForm