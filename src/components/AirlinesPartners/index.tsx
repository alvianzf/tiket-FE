import React from "react";
import { Image } from "@nextui-org/react";
import { useTranslation } from "react-i18next";
import { useQueryGetAirlines } from '@queries/airlines';

interface AirlineData {
    airlineCode: string;
    airlineName: string;
}

const AirlinesPartners = () => {
    const { t } = useTranslation();

    const { data: airlines, isFetching } = useQueryGetAirlines({
        enabled: true
    });

    const imageUrl = (code: string) => {
        const baseUrl = 'http://117.102.64.238:1212/assets/maskapai';
        const mapping: Record<string, string> = {
            'LIO': 'TPJT.png',
            'GAR': 'TPGA.png',
            'CIT': 'TPQG.png',
            'PLA': 'TPIP.png',
            'SRI': 'TPSJ.png'
        };
        
        return mapping[code] ? `${baseUrl}/${mapping[code]}` : '';
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
            
            <div className="flex flex-row gap-3 flex-wrap justify-center items-center">
                {isFetching ? (
                    Array.from({ length: 5 }).map((_, i) => (
                        <div key={i} className="w-12 h-12 rounded-lg bg-white/30 animate-pulse" />
                    ))
                ) : (
                    airlines?.data?.map((airline: AirlineData, index: number) => {
                        const url = imageUrl(airline.airlineCode);
                        if (!url) return null;
                        
                        return (
                            <div 
                                key={index} 
                                className="w-14 h-14 p-2 transition-transform hover:scale-110 cursor-pointer flex items-center justify-center"
                            >
                                <Image 
                                    width={40} 
                                    height={40} 
                                    src={url} 
                                    alt={airline.airlineName}
                                    className="object-contain filter grayscale hover:grayscale-0 transition-all"
                                />
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    )
}

export default AirlinesPartners;