
import { Button, Input } from "@nextui-org/react";
import { useTranslation } from "react-i18next";
import { FaEnvelope, FaLock } from "react-icons/fa";

interface Props {
    onOpenLogin: () => void;
}

const RegisterForm = ({ onOpenLogin } : Props) => {

    const { t } = useTranslation();

    return (
        <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-2">
                <p className="font-medium text-slate-700">{t('profile.email_or_phone')}</p>
                <Input 
                    type="text" 
                    variant="underlined" 
                    placeholder={t('profile.email_or_phone_placeholder')}
                    startContent={<FaEnvelope className="text-[#4267B2] mr-2" />}
                />
            </div>
            <div className="flex flex-col gap-2">
                <p className="font-medium text-slate-700">{t('profile.password')}</p>
                <Input 
                    type="password" 
                    variant="underlined" 
                    startContent={<FaLock className="text-[#4267B2] mr-2" />}
                />
            </div>
            <Button color="primary" variant="solid" className="w-full rounded-sm bg-[#ff5a00] border-[#ff5a00] text-white">
                {t('profile.register')}
            </Button>
            <Button color="primary" variant="light" className="w-full rounded-sm" onClick={onOpenLogin}>
                {t('profile.login')}
            </Button>  
        </div>
    )
}

export default RegisterForm