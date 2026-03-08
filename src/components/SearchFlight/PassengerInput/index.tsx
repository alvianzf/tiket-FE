import IconMinus from "@icons/IconMinus";
import IconPlus from "@icons/IconPlus";
import { Button, Input } from "@nextui-org/react";
import { useState, useRef, useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { FormProps } from "../forms/useForm";
import { FaUsers } from "react-icons/fa";

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

    // Click outside handler
    const dropdownRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setOpen(false);
            }
        };

        if (open) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [open]);
    
    return (
        <div className="w-full flex flex-col gap-2 relative" ref={dropdownRef}>
            <p className="font-medium text-slate-800">{t('tickets.no_of_passengers')}</p>
            <Input type="string" 
                placeholder={`${adult} ${t('tickets.adult')}, ${child} ${t('tickets.child')}, ${infant} ${t('tickets.infant')}`} 
                variant="underlined"
                readOnly
                startContent={<FaUsers className="text-[#3C9DFF] mr-2" />}
                onClick={handleOpen}
            />
            {open && (
                <div className="absolute top-[100%] left-0 mt-2 w-max min-w-[320px] z-[9999] glass-card shadow-2xl rounded-2xl p-6 border border-white/20 bg-white/40 backdrop-blur-xl animate-in fade-in zoom-in-95 duration-200">
                    <div className="flex flex-col gap-6">
                        <div className="flex flex-col gap-5">
                            <div className="flex flex-row justify-between items-center gap-6">
                                <div className="flex flex-col">
                                    <p className="font-bold text-slate-800">{t('tickets.adult')}</p>
                                    <p className="text-sm text-slate-600">{t('tickets.adult_desc')}</p>
                                </div>
                                <div className="flex flex-row gap-4 items-center bg-white/50 rounded-full px-2 py-1 border border-white/60">
                                    <Button isIconOnly size="sm" variant="light" className="text-slate-800 hover:bg-slate-200/50" onClick={handleDecreaseAdultTotal}>
                                        <IconMinus width={16} height={16}/>
                                    </Button>   
                                    <p className="text-slate-800 font-bold w-4 text-center">{adult}</p>
                                    <Button isIconOnly size="sm" variant="light" className="text-slate-800 hover:bg-slate-200/50" onClick={handleIncreaseAdultTotal}>
                                        <IconPlus width={16} height={16}/>
                                    </Button>   
                                </div>
                            </div>
                            
                            <div className="flex flex-row justify-between items-center gap-6">
                                <div className="flex flex-col">
                                    <p className="font-bold text-slate-800">{t('tickets.child')}</p>
                                    <p className="text-sm text-slate-600">{t('tickets.child_desc')}</p>
                                </div>
                                <div className="flex flex-row gap-4 items-center bg-white/50 rounded-full px-2 py-1 border border-white/60">
                                    <Button isIconOnly size="sm" variant="light" className="text-slate-800 hover:bg-slate-200/50" onClick={handleDecreaseChildTotal}>
                                        <IconMinus width={16} height={16}/>
                                    </Button>   
                                    <p className="text-slate-800 font-bold w-4 text-center">{child}</p>
                                    <Button isIconOnly size="sm" variant="light" className="text-slate-800 hover:bg-slate-200/50" onClick={handleIncreaseChildTotal}>
                                        <IconPlus width={16} height={16}/>
                                    </Button>   
                                </div>
                            </div>
                            
                            <div className="flex flex-row justify-between items-center gap-6">
                                <div className="flex flex-col">
                                    <p className="font-bold text-slate-800">{t('tickets.infant')}</p>
                                    <p className="text-sm text-slate-600">{t('tickets.infant_desc')}</p>
                                </div>
                                <div className="flex flex-row gap-4 items-center bg-white/50 rounded-full px-2 py-1 border border-white/60">
                                    <Button isIconOnly size="sm" variant="light" className="text-slate-800 hover:bg-slate-200/50" onClick={handleDecreaseInfantTotal}>
                                        <IconMinus width={16} height={16}/>
                                    </Button>   
                                    <p className="text-slate-800 font-bold w-4 text-center">{infant}</p>
                                    <Button isIconOnly size="sm" variant="light" className="text-slate-800 hover:bg-slate-200/50" onClick={handleIncreaseInfantTotal}>
                                        <IconPlus width={16} height={16}/>
                                    </Button>   
                                </div>
                            </div>
                        </div>
                        <Button 
                            className="w-full font-bold shadow-lg shadow-primary/30" 
                            color="primary" 
                            onClick={handleClose}
                        >
                            {t('tickets.done')}
                        </Button> 
                    </div>
                </div>
            )}
        </div>

    )
}

export default PassengerInput