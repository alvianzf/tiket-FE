import { Button, Input } from "@nextui-org/react";
import { useTranslation } from "react-i18next"

const LoginForm = () => {

    const { t } = useTranslation();

    return (
        <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-2">
                <p>{t('profile.email_or_phone')}</p>
                <Input type="text" variant={"bordered"} placeholder={t('profile.email_or_phone_placeholder')}/>
            </div>
            <div className="flex flex-col gap-2">
                <p>{t('profile.password')}</p>
                <Input type="password" variant={"bordered"} />
            </div>
            <Button color="primary" variant="solid" className="w-full rounded-sm bg-[#ff5a00] border-[#ff5a00] text-white">
                {t('profile.login')}
            </Button>
            <Button color="primary" variant="light" className="w-full rounded-sm">
                {t('profile.forgot_password')}
            </Button>  
        </div>
    )
}

export default LoginForm