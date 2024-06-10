import { Button, Card, CardBody, Image } from "@nextui-org/react";
import { useTranslation } from "react-i18next"

const PurchaseContainer = () => {

    const { t } = useTranslation();

    return (
        <div className="flex flex-wrap justify-center my-10">
            <div className="flex flex-col gap-4 w-full px-5 max-w-[1024px]">
                <p className="text-2xl font-medium">{t('profile.purchase_title')}</p>
                <Card>
                    <CardBody>
                        <div className="flex flex-row gap-10">
                            <div className="w-[25%]">
                                <Image src="/images/no-purchases.png" width={500} height={500}/>
                            </div>
                            <div className="flex flex-col gap-5">
                                <div className="flex flex-col gap-5">
                                    <p>{t('profile.no_purchases_yet_title')}</p>
                                    <p>{t('profile.no_purchases_yet_description')}</p>
                                </div>
                                <Button color="primary" variant="light" className="max-w-fit p-0 data-[hover=true]:bg-transparent">
                                    {t('profile.make_a_new_purchase')}
                                </Button>  
                            </div>
                        </div>
                    </CardBody>
                </Card>    
            </div>
        </div>
    )
}

export default PurchaseContainer