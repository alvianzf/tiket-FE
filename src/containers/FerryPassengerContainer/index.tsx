import FerryPassenger from "@components/FerryPassenger";
import { Button, Card, CardBody, CardHeader, Input } from "@nextui-org/react";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";

const FerryPassengerContainer = () => {

    const { t } = useTranslation();

    const { push } = useRouter();

    return (
        <div className="flex flex-col gap-8 w-full items-center justify-center">
            <div className="flex gap-2 w-full flex-col relative flex-nowrap items-center max-w-[1024px]">
                <Card className="px-4 w-full mt-[40px]">
                    <CardBody>
                        <div className="flex flex-row items-center w-full gap-2">
                            <div className="flex flex-col items-center gap-1 w-[20%]">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="#4267b2" width="20px" height="20px" viewBox="0 0 512 512" stroke="#4267b2">
                                    <g id="SVGRepo_bgCarrier" stroke-width="0"/>
                                    <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"/>
                                    <g id="SVGRepo_iconCarrier">
                                        <path d="M256 8C119.033 8 8 119.033 8 256s111.033 248 248 248 248-111.033 248-248S392.967 8 256 8zm80 248c0 44.112-35.888 80-80 80s-80-35.888-80-80 35.888-80 80-80 80 35.888 80 80z"/>
                                    </g>
                                </svg>
                                <span>{t('tickets.select_schedule')}</span>
                            </div>
                            <div className="flex flex-col items-center w-[20%]">
                                <hr className="border-1 border-black w-[50%]" />
                            </div>
                            <div className="flex flex-col items-center w-[20%]">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="#4267b2" width="20px" height="20px" viewBox="0 0 512 512" stroke="#4267b2">
                                    <g id="SVGRepo_bgCarrier" stroke-width="0"/>
                                    <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"/>
                                    <g id="SVGRepo_iconCarrier">
                                        <path d="M256 8C119.033 8 8 119.033 8 256s111.033 248 248 248 248-111.033 248-248S392.967 8 256 8zm80 248c0 44.112-35.888 80-80 80s-80-35.888-80-80 35.888-80 80-80 80 35.888 80 80z"/>
                                    </g>
                                </svg>
                                <span>{t('tickets.ordering_details')}</span>
                            </div>
                            <div className="flex flex-col items-center w-[20%]">
                                <hr className="border-1 border-black w-[50%]" />
                            </div>
                            <div className="flex flex-col items-center w-[20%] opacity-55">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="#4267b2" width="20px" height="20px" viewBox="0 0 512 512" stroke="#4267b2">
                                    <g id="SVGRepo_bgCarrier" stroke-width="0"/>
                                    <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"/>
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
            <div className="flex gap-4 w-full flex-col relative flex-nowrap items-center max-w-[1280px]">
                <FerryPassenger />
                <FerryPassenger />
                <Card className="p-4 w-full">
                    <CardHeader>
                        <span className="text-[24px] font-bold">Booking Requirements</span>
                    </CardHeader>
                    <CardBody>
                        <div className="flex flex-row gap-4">
                            <div className="flex flex-col gap-2 w-[50%]">
                                <div className="flex flex-col gap-2">
                                    <p>{'Email Address'}</p>
                                    <Input
                                        type="text"
                                        variant="bordered"
                                        classNames={{
                                            inputWrapper: "rounded-none",
                                            mainWrapper: "w-full"
                                        }}
                                    />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <p>{'Mobile Phone'}</p>
                                    <Input
                                        type="text"
                                        variant="bordered"
                                        classNames={{
                                            inputWrapper: "rounded-none",
                                            mainWrapper: "w-full"
                                        }}
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col gap-2 w-[50%]">
                                <div className="flex flex-col gap-2">
                                    <p>{'Confirmation Email Address'}</p>
                                    <Input
                                        type="text"
                                        variant="bordered"
                                        classNames={{
                                            inputWrapper: "rounded-none",
                                            mainWrapper: "w-full"
                                        }}
                                    />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <p>{'Whatsapp No.'}</p>
                                    <Input
                                        type="text"
                                        variant="bordered"
                                        classNames={{
                                            inputWrapper: "rounded-none",
                                            mainWrapper: "w-full"
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    </CardBody>
                </Card>
                <div className="flex flex-row justify-between w-full">
                    <Button className={'button-grey'} onClick={() => push('/ferry/list')}>
                        {'Back'}
                    </Button> 
                    <Button className={'button-orange'} onClick={() => push('/ferry/payment')}>
                        {'Next'}
                    </Button> 
                </div>
            </div>
        </div>
    )
}

export default FerryPassengerContainer