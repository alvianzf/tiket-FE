import { Card, Image, Skeleton } from "@nextui-org/react";
import { useTranslation } from "react-i18next";
import { useQueryGetAirlines } from '@queries/airlines';

const AirlinesPartners = () => {
    const { t } = useTranslation();

    const { data: airlines, isFetching } = useQueryGetAirlines({
        enabled: true
    });

    const imageUrl = (code: string) => {
        if(code === 'LIO') {
            return 'http://117.102.64.238:1212/assets/maskapai/TPJT.png';
        }

        if(code === 'GAR') {
            return 'http://117.102.64.238:1212/assets/maskapai/TPGA.png';
        }

        if(code === 'CIT') {
            return 'http://117.102.64.238:1212/assets/maskapai/TPQG.png';
        }

        if(code === 'PLA') {
            return 'http://117.102.64.238:1212/assets/maskapai/TPIP.png';
        }

        if(code === 'SRI') {
            return 'http://117.102.64.238:1212/assets/maskapai/TPSJ.png';
        }
    }

    return (
        <div className="flex flex-col lg:w-6/12 md:w-6/12 gap-3 sm:w-full w-full">
            <div className="flex flex-col items-center">
                <p className="text-lg font-medium">{t('home.airlines_partners')}</p>
                <p>{t('home.airlines_partners_description')}</p>
            </div>
            <div className="flex flex-row gap-3 flex-wrap items-center">
                {isFetching && (
                    <>
                        <Card>
                            <Skeleton >
                                <div className="h-[50px] w-[50px] bg-secondary"/>
                            </Skeleton>
                        </Card>
                        <Card>
                            <Skeleton >
                                <div className="h-[50px] w-[50px] bg-secondary"/>
                            </Skeleton>
                        </Card>
                        <Card>
                            <Skeleton >
                                <div className="h-[50px] w-[50px] bg-secondary"/>
                            </Skeleton>
                        </Card>
                        <Card>
                            <Skeleton >
                                <div className="h-[50px] w-[50px] bg-secondary"/>
                            </Skeleton>
                        </Card>
                        <Card>
                            <Skeleton >
                                <div className="h-[50px] w-[50px] bg-secondary"/>
                            </Skeleton>
                        </Card>
                        <Card>
                            <Skeleton >
                                <div className="h-[50px] w-[50px] bg-secondary"/>
                            </Skeleton>
                        </Card>
                        <Card>
                            <Skeleton >
                                <div className="h-[50px] w-[50px] bg-secondary"/>
                            </Skeleton>
                        </Card>
                        <Card>
                            <Skeleton >
                                <div className="h-[50px] w-[50px] bg-secondary"/>
                            </Skeleton>
                        </Card>
                        <Card>
                            <Skeleton >
                                <div className="h-[50px] w-[50px] bg-secondary"/>
                            </Skeleton>
                        </Card>
                        <Card>
                            <Skeleton >
                                <div className="h-[50px] w-[50px] bg-secondary"/>
                            </Skeleton>
                        </Card>
                        <Card>
                            <Skeleton >
                                <div className="h-[50px] w-[50px] bg-secondary"/>
                            </Skeleton>
                        </Card>
                        <Card>
                            <Skeleton >
                                <div className="h-[50px] w-[50px] bg-secondary"/>
                            </Skeleton>
                        </Card>

                    </>
                )}
                {airlines?.data?.map((airline, index) => (
                    <Image width={50} height={50} src={imageUrl(airline.airlineCode)} alt={airline.airlineCode} key={index}/>
                ))}
            </div>
        </div>
    )
}

export default AirlinesPartners