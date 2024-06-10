
import { Button, Card, CardBody, Image } from "@nextui-org/react";
import { useTranslation } from "react-i18next"

const OrderContainer = () => {

    const { t } = useTranslation();

    return (
        <div className="flex flex-wrap justify-center my-10">
            <div className="flex flex-col gap-4 w-full px-5 max-w-[1024px]">
                <p className="text-2xl font-medium">{t('profile.order_title')}</p>
                <Card>
                    <CardBody>
                        <div className="flex flex-row gap-10">
                            <div className="w-[25%]">
                                <Image src="/images/no-orders.png" width={500} height={500}/>
                            </div>
                            <div className="flex flex-col gap-5">
                                <div className="flex flex-col gap-5">
                                    <p>{t('profile.no_orders_yet_title')}</p>
                                    <p>{t('profile.no_orders_yet_description')}</p>
                                </div>
                                <Button color="primary" variant="light" className="max-w-fit min-w-fit p-0 data-[hover=true]:bg-transparent">
                                    {t('profile.home')}
                                </Button>  
                            </div>
                        </div>
                    </CardBody>
                </Card>    
            </div>
        </div>
    )
}

export default OrderContainer