import IconMinus from "@icons/IconMinus";
import IconPlus from "@icons/IconPlus";
import { Button, Input } from "@nextui-org/react";
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { FormProps } from "../forms/useForm";

const PassengerInput = () => {
    const { t } = useTranslation();

    const [open, setOpen] = useState<boolean>(false);   

    const { setValue, watch } = useFormContext<FormProps>();

    const adult = parseInt(watch('adult'));
    const child = parseInt(watch('child'));
    const infant = parseInt(watch('infant'));

    const handleIncreaseAdultTotal = () => {
        setValue('adult', (adult + 1).toString());
    }

    const handleDecreaseAdultTotal = () => {
        if(adult === 1) {
            return
        }
        setValue('adult', (adult - 1).toString());
    }

    const handleIncreaseChildTotal = () => {
        setValue('child', (child + 1).toString());
    }

    const handleDecreaseChildTotal = () => {
        if(child === 0) {
            return
        }
        setValue('child', (child - 1).toString());
    }

    const handleIncreaseInfantTotal = () => {
        setValue('infant', (infant + 1).toString());
    }

    const handleDecreaseInfantTotal = () => {
        if(infant === 0) {
            return
        }
        setValue('infant', (infant - 1).toString());
    }

    const handleOpen = () => setOpen(true);

    const handleClose = () => setOpen(false);
    
    return (
        <div className="w-full flex flex-col gap-2">
            <p className="font-medium">{t('tickets.no_of_passengers')}</p>
            <Input type="string" 
                placeholder={`${adult} ${t('tickets.adult')}, ${child} ${t('tickets.child')}, ${infant} ${t('tickets.infant')}`} 
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
                                    <p className="text-orange">{adult}</p>
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
                                    <p className="text-orange">{child}</p>
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
                                    <p className="text-orange">{infant}</p>
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