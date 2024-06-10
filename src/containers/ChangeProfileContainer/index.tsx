
import ContactForm from "@components/ContactForm";
import PersonalDataForm from "@components/PersonalDataForm";
import { useTranslation } from "react-i18next"

const ChangeProfileContainer = () => {

    const { t } = useTranslation();

    return (
        <div className="flex flex-wrap justify-center my-10">
            <div className="flex flex-col gap-4 w-full px-5 max-w-[1024px]">
                <p className="text-2xl font-medium">{t('profile.title')}</p>
                <PersonalDataForm />
                <ContactForm />
            </div>
        </div>
    )
}

export default ChangeProfileContainer