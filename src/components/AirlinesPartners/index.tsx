import BatikAir from "@icons/BatikAir";
import Citilink from "@icons/Citilink";
import Garuda from "@icons/Garuda";
import LionAir from "@icons/LionAir";
import Sriwijaya from "@icons/Sriwijaya";
import { useTranslation } from "react-i18next"

const AirlinesPartners = () => {
    const { t } = useTranslation();

    return (
        <div className="flex flex-col lg:w-6/12 md:w-6/12 gap-3 sm:w-full w-full">
            <div className="flex flex-col items-center">
                <p className="text-lg font-medium">{t('home.airlines_partners')}</p>
                <p>{t('home.airlines_partners_description')}</p>
            </div>
            <div className="flex flex-row gap-3 flex-wrap justify-center items-center">
                <Citilink width={70} height={70}/>
                <Garuda width={70} height={70}/>
                <LionAir width={70} height={70}/>
                <Sriwijaya width={70} height={70} />
                <BatikAir width={70} height={70}/>
            </div>
        </div>
    )
}

export default AirlinesPartners