import { Button, Card, CardBody, CardFooter, CardHeader, DatePicker, Input, Select, SelectItem } from "@nextui-org/react";
import { useTranslation } from "react-i18next"

const PersonalDataForm = () => {
    const { t } = useTranslation();

    const genderOptions = [
        { key: 'male', label: t('profile.male') },
        { key: 'female', label: t('profile.female') }
    ];

    return (
        <Card>
            <CardHeader>
                <p>{t('profile.personal_data')}</p>
            </CardHeader>
            <CardBody>
                <div className="flex flex-col gap-3">
                    <div className="flex flex-col gap-2">
                        <p>{t('profile.fullname')}</p>
                        <Input type="text" variant={"bordered"} />
                    </div>
                    <div className="flex flex-row gap-4">
                        <div className="flex flex-col gap-2 w-[48%]">
                            <p>{t('profile.date_of_birth')}</p>
                            <DatePicker variant="underlined" />
                        </div>
                        <div className="flex flex-col gap-2 w-[50%]">
                            <p>{t('profile.gender')}</p>
                            <Select
                                variant="bordered"
                                radius="sm" 
                                placeholder={t('profile.choose_gender')}
                            >
                                {genderOptions.map((item) => (
                                        <SelectItem key={item.key}>
                                            {item.label}
                                        </SelectItem>
                                    ))
                                }
                            </Select>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <p>{t('profile.city_of_residence')}</p>
                        <Input type="text" variant={"bordered"} />
                    </div>
                </div>
            </CardBody>
            <CardFooter>
                <div className="flex flex-row gap-2 justify-end w-full">
                    <Button color="primary" variant="bordered" className="max-w-fit border rounded-sm data-[hover=true]:bg-transparent">
                        {t('profile.cancel')}
                    </Button>
                    <Button color="primary" variant="bordered" className="max-w-fit rounded-sm bg-[#ff5a00] border-[#ff5a00] text-white">
                        {t('profile.save')}
                    </Button>  
                </div>
            </CardFooter>
        </Card> 
    )
}

export default PersonalDataForm