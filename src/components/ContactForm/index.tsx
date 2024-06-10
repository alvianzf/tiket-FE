import { Button, Card, CardBody, CardFooter, CardHeader, Input } from "@nextui-org/react";
import { useTranslation } from "react-i18next"

const ContactForm = () => {
    const { t } = useTranslation();

    return (
        <Card>
            <CardHeader>
                <p>{t('profile.contact')}</p>
            </CardHeader>
            <CardBody>
                <div className="flex flex-col gap-3">
                    <div className="flex flex-col gap-2">
                        <p>{t('profile.email')}</p>
                        <Input type="text" variant={"bordered"} />
                    </div>
                    <div className="flex flex-col gap-2">
                        <p>{t('profile.phone_number')}</p>
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

export default ContactForm