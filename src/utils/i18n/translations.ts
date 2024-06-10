type LocaleEnFile = { en: Record<string, string> };
type LocaleIdFile = { id: Record<string, string> };

const localeGroups = [
    'meta',
    'home',
    'footer',
    'tickets',
    'checkout',
    'profile'
];

const localeEnGroups = {};
localeGroups.map((group) => {
    // eslint-disable-next-line
    const localeGroup = require(`../../locales/${group}/en.json`)?.en as unknown as LocaleEnFile;
    Object.assign(localeEnGroups, localeGroup);
});

const localeIdGroups = {};
localeGroups.map((group) => {
    // eslint-disable-next-line
    const localeGroup = require(`../../locales/${group}/id.json`)?.id as unknown as LocaleIdFile;
    Object.assign(localeIdGroups, localeGroup);
});

const translations = {
    en: {
        ...localeEnGroups,
    },
    id: {
        ...localeIdGroups,
    },
};

export default translations;