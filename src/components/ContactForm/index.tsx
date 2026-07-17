import { Button, Card, CardActions, CardContent, CardHeader, TextField } from "@mui/material";
import { useTranslation } from "react-i18next"

const ContactForm = () => {
    const { t } = useTranslation();

    return (
        <Card>
            <CardHeader title={<p>{t('profile.contact')}</p>} />
            <CardContent>
                <div className="flex flex-col gap-3">
                    <div className="flex flex-col gap-2">
                        <p className="font-medium text-slate-700">{t('profile.email')}</p>
                        <TextField type="email" variant="standard" placeholder="Enter email address" fullWidth slotProps={{ htmlInput: { inputMode: "email" } }} />
                    </div>
                    <div className="flex flex-col gap-2">
                        <p className="font-medium text-slate-700">{t('profile.phone_number')}</p>
                        <TextField type="tel" variant="standard" placeholder="Enter phone number" fullWidth slotProps={{ htmlInput: { inputMode: "tel" } }} />
                    </div>
                </div>
            </CardContent>
            <CardActions>
                <div className="flex flex-row gap-2 justify-end w-full">
                    <Button color="primary" variant="outlined" className="max-w-fit">
                        {t('profile.cancel')}
                    </Button>
                    <Button color="warning" variant="contained" className="max-w-fit">
                        {t('profile.save')}
                    </Button>
                </div>
            </CardActions>
        </Card>
    )
}

export default ContactForm