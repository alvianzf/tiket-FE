import i18n from 'i18next';
import 'intl-pluralrules';
import { initReactI18next } from 'react-i18next';
import translations from './translations';

export const localeOptions: Record<string, string> = {
    en: 'en_US',
    id: 'id_ID',
};

const resources = {
    en: { translation: translations.en },
    id: { translation: translations.id },
};

i18n
    .use(initReactI18next)
    .init({
        resources,
        lng: 'id',
        keySeparator: '.',
        interpolation: {
            escapeValue: false,
            prefix: '%{',
            suffix: '}',
        },
    })

export default i18n;