import FerryCard from "@components/FerryCard";
import { Card, CardBody, Spinner } from "@nextui-org/react";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/router";
import { useQuerySearchFerryTrips } from "@queries/ferry";

const FerryListContainer = () => {

    const { t } = useTranslation();
    const { query } = useRouter();

    const embarkation = query?.embarkation as string ?? '';
    const destination = query?.destination as string ?? '';
    const tripdate = query?.tripdate as string ?? '';

    const { data: trips, isFetching, isError } = useQuerySearchFerryTrips(
        { embarkation, destination, tripdate },
        { enabled: !!embarkation && !!destination && !!tripdate }
    );

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const tripList: any[] = (trips as any) ?? [];

    return (
        <div className="flex flex-col gap-8 w-full items-center justify-center">
            <div className="flex gap-2 w-full flex-col relative flex-nowrap items-center max-w-[1024px]">
                <Card className="px-4 w-full mt-[40px]">
                    <CardBody>
                        <div className="flex flex-row items-center w-full gap-2">
                            <div className="flex flex-col items-center gap-1 w-[20%]">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="#4267b2" width="20px" height="20px" viewBox="0 0 512 512" stroke="#4267b2">
                                    <g id="SVGRepo_bgCarrier" strokeWidth="0"/>
                                    <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"/>
                                    <g id="SVGRepo_iconCarrier">
                                        <path d="M256 8C119.033 8 8 119.033 8 256s111.033 248 248 248 248-111.033 248-248S392.967 8 256 8zm80 248c0 44.112-35.888 80-80 80s-80-35.888-80-80 35.888-80 80-80 80 35.888 80 80z"/>
                                    </g>
                                </svg>
                                <span>{t('tickets.select_schedule')}</span>
                            </div>
                            <div className="flex flex-col items-center w-[20%] opacity-55">
                                <hr className="border-1 border-black w-[50%]" />
                            </div>
                            <div className="flex flex-col items-center w-[20%] opacity-55">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="#4267b2" width="20px" height="20px" viewBox="0 0 512 512" stroke="#4267b2">
                                    <g id="SVGRepo_bgCarrier" strokeWidth="0"/>
                                    <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"/>
                                    <g id="SVGRepo_iconCarrier">
                                        <path d="M256 8C119.033 8 8 119.033 8 256s111.033 248 248 248 248-111.033 248-248S392.967 8 256 8zm80 248c0 44.112-35.888 80-80 80s-80-35.888-80-80 35.888-80 80-80 80 35.888 80 80z"/>
                                    </g>
                                </svg>
                                <span>{t('tickets.ordering_details')}</span>
                            </div>
                            <div className="flex flex-col items-center w-[20%] opacity-55">
                                <hr className="border-1 border-black w-[50%]" />
                            </div>
                            <div className="flex flex-col items-center w-[20%] opacity-55">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="#4267b2" width="20px" height="20px" viewBox="0 0 512 512" stroke="#4267b2">
                                    <g id="SVGRepo_bgCarrier" strokeWidth="0"/>
                                    <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"/>
                                    <g id="SVGRepo_iconCarrier">
                                        <path d="M256 8C119.033 8 8 119.033 8 256s111.033 248 248 248 248-111.033 248-248S392.967 8 256 8zm80 248c0 44.112-35.888 80-80 80s-80-35.888-80-80 35.888-80 80-80 80 35.888 80 80z"/>
                                    </g>
                                </svg>
                                <span>{t('tickets.payment')}</span>
                            </div>
                        </div>
                    </CardBody>
                </Card>
            </div>
            <div className="flex gap-2 w-full flex-col relative flex-nowrap items-center max-w-[1280px]">
                {isFetching && (
                    <div className="flex justify-center py-20">
                        <Spinner size="lg" color="warning" />
                    </div>
                )}
                {isError && (
                    <div className="flex justify-center py-10">
                        <p className="text-red-500">{t('tickets.error_loading_trips')}</p>
                    </div>
                )}
                {!isFetching && !isError && tripList.length === 0 && (
                    <div className="flex justify-center py-10">
                        <p className="text-slate-500">{t('tickets.no_trips_found')}</p>
                    </div>
                )}
                {!isFetching && tripList.map((trip) => (
                    <FerryCard
                        key={trip.tripID}
                        trip={trip}
                        embarkation={embarkation}
                        destination={destination}
                        tripdate={tripdate}
                    />
                ))}
            </div>
        </div>
    )
}

export default FerryListContainer