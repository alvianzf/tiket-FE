import PaymentRadio from "@components/Payment/PaymentRadio";
import BankBca from "@icons/BankBca";
import BankBni from "@icons/BankBni";
import BankMandiri from "@icons/BankMandiri";
import { Button, Card, CardBody, CardHeader, RadioGroup } from "@nextui-org/react";
import { useTranslation } from "react-i18next";

const FerryPaymentContainer = () => {

    const { t } = useTranslation();

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
                            <div className="flex flex-col items-center w-[20%]">
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
                <Card className="p-6 w-full">
                    <CardHeader className="text-center w-full">
                        <p className="text-center text-orange w-full">Selesaikan Pembayaran dalam 00:59:45</p>
                    </CardHeader>
                    <CardBody>
                        <div className="flex flex-col gap-4">
                            <div className="flex flex-col gap-2">
                                <p className="font-bold">Bank Transfer</p>
                                <p>Pilih Rekening Tujuan</p>
                                <div className="flex flex-row gap-2">
                                    <div className="flex flex-col w-[50%]">
                                    <RadioGroup>
                                        <PaymentRadio value="bca">
                                            <div className="flex flex-row items-center gap-5">
                                                <BankBca width={30} height={30}/>
                                                <p>{'BCA - Abdul Rahman 0613336939'}</p>
                                            </div>
                                        </PaymentRadio>
                                        <PaymentRadio value="bni">
                                            <div className="flex flex-row items-center gap-5">
                                                <BankMandiri width={30} height={30}/>
                                                <p>{'BNI - Abdul Rahman 2100900774'}</p>
                                            </div>
                                        </PaymentRadio>
                                        <PaymentRadio value="bri">
                                            <div className="flex flex-row items-center gap-5">
                                                <BankBni width={30} height={30}/>
                                                <p>{'BRI - Abdul Rahman 033101073801501'}</p>
                                            </div>
                                        </PaymentRadio>
                                    </RadioGroup>
                                    </div>
                                    <div className="flex flex-col w-[50%]">
                                        <Card>
                                            <CardHeader>
                                                <p className="font-bold">No Pesanan : 0001</p>
                                            </CardHeader>
                                            <CardBody>
                                                <div className="flex flex-col gap-4">
                                                    <div className="flex flex-row justify-between">
                                                        <i>Pelayaran</i>
                                                        <p>19 July 2024</p>
                                                    </div>
                                                    <div className="flex flex-row items-center justify-between">
                                                        <p className="font-bold">BC Ferry Terminal</p>
                                                        <hr className="border-1 border-black w-[20%]"/>
                                                        <p className="font-bold">Harbourfront</p>
                                                    </div>
                                                    <i>Data Penumpang</i>
                                                    <div className="flex flex-col gap-2">
                                                        <div className="flex flex-row justify-end text-right gap-2">
                                                            <p className="font-bold">Mr. Asrul Sani</p>
                                                            <p>-</p>
                                                            <i>Adult</i>
                                                        </div>
                                                        <div className="flex flex-row justify-end text-right gap-2">
                                                            <p className="font-bold">Mr. Asrul Sani</p>
                                                            <p>-</p>
                                                            <i>Adult</i>
                                                        </div>
                                                        <div className="flex flex-row justify-end text-right gap-2">
                                                            <p className="font-bold">Mr. Asrul Sani</p>
                                                            <p>-</p>
                                                            <i>Adult</i>
                                                        </div>
                                                    </div>
                                                </div>
                                            </CardBody>
                                        </Card>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col gap-4">
                                <p className="font-bold text-[24px]">Rincian Harga</p>
                                <div className="flex flex-col gap-2 border p-4">
                                    <div className="flex flex-row justify-between">
                                        <p className="font-bold text-[20px]">Harga Yang Anda Bayar</p>
                                        <p className="text-orange font-bold text-[26px]">Rp 1.828.000</p>
                                    </div>
                                    <div className="flex flex-row justify-between">
                                        <p className="font-bold text-[20px]">Tiket Ferry x3</p>
                                        <p className="font-bold text-[20px]">Rp 1.731.000</p>
                                    </div>
                                    <div className="flex flex-row justify-between">
                                        <p className="font-bold text-[20px]">+ Asuransi Perjalanan</p>
                                        <p className="font-bold text-[20px]">Rp 87.000</p>
                                    </div>
                                    <div className="flex flex-row justify-between">
                                        <p className="font-bold text-[20px]">+ Biaya Layanan</p>
                                        <p className="font-bold text-[20px]">Rp 10.000</p>
                                    </div>
                                </div>
                            </div>
                            <Button className={'button-orange'}>
                                {'Verifikasi Pembayaran'}
                            </Button> 
                        </div>
                    </CardBody>
                </Card>
            </div>
        </div>
    )
}

export default FerryPaymentContainer