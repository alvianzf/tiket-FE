import React from "react";
import { Card, Image, Skeleton } from "@nextui-org/react";
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
        <div className="flex flex-col lg:w-6/12 md:w-6/12 gap-6 sm:w-full w-full glass-card p-8 bg-white/10">
            <div className="flex flex-col items-center text-center space-y-2">
                <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
                    {t('home.airlines_partners')}
                </h3>
                <p className="text-slate-500 max-w-md">
                    {t('home.airlines_partners_description')}
                </p>
            </div>
            
            <div className="flex flex-row gap-4 flex-wrap justify-center items-center">
                {isFetching ? (
                    Array.from({ length: 8 }).map((_, i) => (
                        <Card key={i} className="w-16 h-16 glass-card border-none bg-white/20">
                            <Skeleton className="rounded-lg h-full w-full" />
                        </Card>
                    ))
                ) : (
                    airlines?.data?.map((airline: AirlineData, index: number) => {
                        const url = imageUrl(airline.airlineCode);
                        if (!url) return null;
                        
                        return (
                            <div 
                                key={index} 
                                className="w-16 h-16 p-2 glass-card hover:scale-110 transition-transform cursor-pointer flex items-center justify-center bg-white/30"
                            >
                                <Image 
                                    width={48} 
                                    height={48} 
                                    src={url} 
                                    alt={airline.airlineName}
                                    className="object-contain"
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