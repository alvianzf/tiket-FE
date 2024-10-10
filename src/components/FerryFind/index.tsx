import { Button, Input } from "@nextui-org/react";
import { useTranslation } from "react-i18next"

const FerryFind = () => {
    const { t } = useTranslation();

    return (
        <div className="w-[25%] bg-white p-[15px] rounded">
            <div className="flex flex-col gap-4 w-full">
                <p>Please provide us your booking number and passport number to retrieve your booking details.</p>
                <div className="w-full flex flex-col gap-2">
                    <p>{'Booking No.'}</p>
                    <Input type="text" variant={"bordered"} placeholder={'Booking Numbers'}/>
                </div>
                <div className="w-full flex flex-col gap-2">
                    <p>{'Passport No.'}</p>
                    <Input type="text" variant={"bordered"} placeholder={'Passport Numbers'}/>
                </div>
                
                <Button className="button-orange w-full">
                    {t('tickets.search')}
                </Button> 
            </div>
        </div>
    )
}

export default FerryFind