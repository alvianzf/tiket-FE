
import { Button, InputAdornment, TextField } from "@mui/material";
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
                <TextField
                    type="text"
                    variant="standard"
                    placeholder={t('profile.email_or_phone_placeholder')}
                    fullWidth
                    slotProps={{
                        input: {
                            startAdornment: (
                                <InputAdornment position="start">
                                    <FaEnvelope className="text-[#4267B2]" />
                                </InputAdornment>
                            ),
                        },
                    }}
                />
            </div>
            <div className="flex flex-col gap-2">
                <p className="font-medium text-slate-700">{t('profile.password')}</p>
                <TextField
                    type="password"
                    variant="standard"
                    fullWidth
                    slotProps={{
                        input: {
                            startAdornment: (
                                <InputAdornment position="start">
                                    <FaLock className="text-[#4267B2]" />
                                </InputAdornment>
                            ),
                        },
                    }}
                />
            </div>
            <Button color="warning" variant="contained" fullWidth>
                {t('profile.register')}
            </Button>
            <Button color="primary" variant="text" fullWidth onClick={onOpenLogin}>
                {t('profile.login')}
            </Button>
        </div>
    )
}

export default RegisterForm