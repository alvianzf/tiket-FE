import { Button, Card, CardActions, CardContent, CardHeader, MenuItem, TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { useTranslation } from "react-i18next"

const PersonalDataForm = () => {
    const { t } = useTranslation();

    const genderOptions = [
        { key: 'male', label: t('profile.male') },
        { key: 'female', label: t('profile.female') }
    ];

    return (
        <Card>
            <CardHeader title={<p>{t('profile.personal_data')}</p>} />
            <CardContent>
                <div className="flex flex-col gap-3">
                    <div className="flex flex-col gap-2">
                        <p className="font-medium text-slate-700">{t('profile.fullname')}</p>
                        <TextField type="text" variant="standard" placeholder="Enter full name" fullWidth />
                    </div>
                    <div className="flex flex-row gap-4">
                        <div className="flex flex-col gap-2 w-[48%]">
                            <p className="font-medium text-slate-700">{t('profile.date_of_birth')}</p>
                            <DatePicker slotProps={{ textField: { variant: "standard", size: "small", fullWidth: true } }} />
                        </div>
                        <div className="flex flex-col gap-2 w-[50%]">
                            <p className="font-medium text-slate-700">{t('profile.gender')}</p>
                            <TextField
                                select
                                variant="standard"
                                fullWidth
                                defaultValue=""
                                slotProps={{
                                    select: {
                                        displayEmpty: true,
                                        renderValue: (value) =>
                                            value === "" ? (
                                                <span className="text-slate-400">{t('profile.choose_gender')}</span>
                                            ) : (
                                                genderOptions.find((item) => item.key === value)?.label
                                            ),
                                    },
                                }}
                            >
                                {genderOptions.map((item) => (
                                        <MenuItem key={item.key} value={item.key}>
                                            {item.label}
                                        </MenuItem>
                                    ))
                                }
                            </TextField>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <p className="font-medium text-slate-700">{t('profile.city_of_residence')}</p>
                        <TextField type="text" variant="standard" placeholder="Enter city" fullWidth />
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

export default PersonalDataForm