import { useTranslation } from "react-i18next";

const FerryPartners = () => {
    const { t } = useTranslation();


    return (
        <div className="flex flex-col lg:w-6/12 md:w-6/12 gap-3 sm:w-full w-full">
            <div className="flex flex-col items-center">
                <p className="text-lg font-medium">{t('home.ferry_partners')}</p>
                <p>{t('home.ferry_partners_description')}</p>
            </div>
            <div className="flex flex-row gap-3 flex-wrap items-center">
                
            </div>
        </div>
    )
}

export default FerryPartners