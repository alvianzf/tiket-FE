import { Input } from "@nextui-org/react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const DestinationInput = () => {

    const { t } = useTranslation();

    const [open, setOpen] = useState<boolean>(false);    

    const handleOpen = () => setOpen(true);

    const handleClose = () => setOpen(false);

    return (
        <div className="w-full relative">
            <Input type="string"
                classNames={{
                    label: "font-medium"
                }} 
                labelPlacement="outside" 
                label={t('tickets.to')} 
                placeholder={t('tickets.to_placeholder')} 
                variant="underlined"
                onClick={handleOpen}
            />
            {open && (
                <div className="absolute bg-white w-max z-[9999] shadow-md">
                    <div className="flex p-[20px] flex-col gap-3">
                        <p className="text-orange">{t('tickets.popular_city')}</p>
                        <div className="grid grid-cols-3 gap-4">
                            <p onClick={handleClose}>Jakarta</p>
                            <p>Batam</p>
                            <p>Surabaya</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default DestinationInput