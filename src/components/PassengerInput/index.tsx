import IconMinus from "@icons/IconMinus";
import IconPlus from "@icons/IconPlus";
import { Button, Input } from "@nextui-org/react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const PassengerInput = () => {
    const { t } = useTranslation();

    const [open, setOpen] = useState<boolean>(false); 
    const [adultTotal, setAdultTotal] = useState<number>(1);   
    const [childTotal, setChildTotal] = useState<number>(0);   
    const [infantTotal, setInfantTotal] = useState<number>(0);

    const handleIncreaseAdultTotal = () => {
        setAdultTotal((prevState) => prevState + 1)
    }

    const handleDecreaseAdultTotal = () => {
        if(adultTotal === 1) {
            return
        }
        setAdultTotal((prevState) => prevState - 1)
    }

    const handleIncreaseChildTotal = () => {
        setChildTotal((prevState) => prevState + 1)
    }

    const handleDecreaseChildTotal = () => {
        if(childTotal === 0) {
            return
        }
        setChildTotal((prevState) => prevState - 1)
    }

    const handleIncreaseInfantTotal = () => {
        setInfantTotal((prevState) => prevState + 1)
    }

    const handleDecreaseInfantTotal = () => {
        if(infantTotal === 0) {
            return
        }
        setInfantTotal((prevState) => prevState - 1)
    }

    const handleOpen = () => setOpen(true);

    const handleClose = () => setOpen(false);
    
    return (
        <div className="w-full relative">
            <Input type="string" 
                classNames={{
                    label: "font-medium"
                }} 
                labelPlacement="outside" 
                label={t('tickets.no_of_passengers')} 
                placeholder={`${adultTotal} ${t('tickets.adult')}, ${childTotal} ${t('tickets.child')}, ${infantTotal} ${t('tickets.infant')}`} 
                variant="underlined"
                readOnly
                onClick={handleOpen}
            />
            {open && (
                <div className="absolute bg-white w-max z-[9999] shadow-md">
                    <div className="flex p-[20px] flex-col gap-3">
                        <div className="flex flex-col gap-4">
                            <div className="flex flex-row justify-between gap-4">
                                <div className="flex flex-col">
                                    <p className="text-orange">{t('tickets.adult')}</p>
                                    <p>{t('tickets.adult_desc')}</p>
                                </div>
                                <div className="flex flex-row gap-3 items-center">
                                    <Button isIconOnly variant="light" onClick={handleIncreaseAdultTotal}>
                                        <IconPlus width={20} height={20}/>
                                    </Button>   
                                    <p className="text-orange">{adultTotal}</p>
                                    <Button isIconOnly variant="light" onClick={handleDecreaseAdultTotal}>
                                        <IconMinus width={20} height={20}/>
                                    </Button>   
                                </div>
                            </div>
                            <div className="flex flex-row justify-between gap-4">
                                <div className="flex flex-col">
                                    <p className="text-orange">{t('tickets.child')}</p>
                                    <p>{t('tickets.child_desc')}</p>
                                </div>
                                <div className="flex flex-row gap-3 items-center">
                                    <Button isIconOnly variant="light" onClick={handleIncreaseChildTotal}>
                                        <IconPlus width={20} height={20}/>
                                    </Button>   
                                    <p className="text-orange">{childTotal}</p>
                                    <Button isIconOnly variant="light" onClick={handleDecreaseChildTotal}>
                                        <IconMinus width={20} height={20}/>
                                    </Button>   
                                </div>
                            </div>
                            <div className="flex flex-row justify-between gap-4">
                                <div className="flex flex-col">
                                    <p className="text-orange">{t('tickets.infant')}</p>
                                    <p>{t('tickets.infant_desc')}</p>
                                </div>
                                <div className="flex flex-row gap-3 items-center">
                                    <Button isIconOnly variant="light" onClick={handleIncreaseInfantTotal}>
                                        <IconPlus width={20} height={20}/>
                                    </Button>   
                                    <p className="text-orange">{infantTotal}</p>
                                    <Button isIconOnly variant="light" onClick={handleDecreaseInfantTotal}>
                                        <IconMinus width={20} height={20}/>
                                    </Button>   
                                </div>
                            </div>
                            <Button className="button-blue" onClick={handleClose}>
                                {t('tickets.done')}
                            </Button> 
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default PassengerInput