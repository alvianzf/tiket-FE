import React from "react";
import { useTranslation } from "react-i18next";
import { useQueryGetAirlines } from '@queries/airlines';
import LionAir from "@icons/LionAir";
import Garuda from "@icons/Garuda";
import Citilink from "@icons/Citilink";
import Sriwijaya from "@icons/Sriwijaya";
import BatikAir from "@icons/BatikAir";

interface AirlineData {
    airlineCode: string;
    airlineName: string;
}

const AirlinesPartners = () => {
    const { t } = useTranslation();

    const { data: airlines, isFetching } = useQueryGetAirlines({
        enabled: true
    });

    const getAirlineIcon = (code: string) => {
        switch (code) {
            case 'LIO':
                return <LionAir width={90} height={30} />;
            case 'GAR':
                return <Garuda width={90} height={28} />;
            case 'CIT':
                return <Citilink width={95} height={24} />;
            case 'SRI':
                return <Sriwijaya width={90} height={28} />;
            case 'PLA':
            case 'BTK':
                return <BatikAir width={90} height={30} />;
            default:
                return null;
        }
    }

    return (
        <div className="flex flex-col gap-4 items-center">
            <div className="flex flex-col items-center text-center space-y-1">
                <p className="text-lg font-medium text-slate-700">
                    {t('home.airlines_partners')}
                </p>
                <p className="text-xs text-slate-500 max-w-xs">
                    {t('home.airlines_partners_description')}
                </p>
            </div>
            
            <div className="flex flex-row gap-8 flex-wrap justify-center items-center mt-4">
                {isFetching ? (
                    Array.from({ length: 5 }).map((_, i) => (
                        <div key={i} className="w-24 h-10 rounded-lg bg-white/30 animate-pulse" />
                    ))
                ) : (
                    airlines?.data?.map((airline: AirlineData, index: number) => {
                        const icon = getAirlineIcon(airline.airlineCode);
                        if (!icon) return null;
                        
                        return (
                            <div 
                                key={index} 
                                className="w-28 h-12 transition-all duration-300 hover:scale-110 cursor-pointer flex items-center justify-center filter grayscale hover:grayscale-0 opacity-70 hover:opacity-100"
                                title={airline.airlineName}
                            >
                                {icon}
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    )
}

export default AirlinesPartners;