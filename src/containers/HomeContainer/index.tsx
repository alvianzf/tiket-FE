import AirlinesPartners from "@components/AirlinesPartners"
import PaymentPartners from "@components/PaymentPartners"
import SearchFlight from "@components/SearchFlight";
import Image from "next/image";
import { useTranslation } from "react-i18next";

const HomeContainer = () => {

    const { t } = useTranslation();

    return (
        <>
            <div className="flex flex-wrap justify-center min-h-[400px] home-app">
                <div className="flex flex-wrap justify-center items-center w-full py-[40px]">
                    <SearchFlight />
                </div>
            </div>
            <div className="flex flex-wrap justify-center my-10">
                <div className="flex flex-wrap w-full gap-4 lg:gap-0 md:gap-0 sm:gap-0 max-w-[1368px]">
                    <AirlinesPartners />
                    <PaymentPartners />
                </div>
            </div>
            <div className="flex justify-center bg-blue py-10">
                <div className="flex flex-col w-full gap-8 max-w-[1368px]">
                    <p className="text-center text-white font-medium">{t('home.why_book_title')}</p>
                    <div className="flex flex-row flex-wrap justify-between">
                        <div className="flex flex-col lg:w-3/12 md:w-2/16 gap-3 sm:w-full w-full text-center items-center text-white">
                            <Image src={"/images/secure-transactions.png"} alt={"Secure Transactions"} width={200} height={200}/>
                            <p>{t('home.secure_transaction')}</p>
                            <p>{t('home.secure_transaction_description')}</p>
                        </div>
                        <div className="flex flex-col lg:w-3/12 md:w-2/16 gap-3 sm:w-full w-full text-center items-center text-white">
                            <Image src={"/images/support.png"} alt={"Support"} width={200} height={200}/>
                            <p>{t('home.assistance_and_support')}</p>
                            <p>{t('home.assistance_and_support_description')}</p>
                        </div>
                        <div className="flex flex-col lg:w-3/12 md:w-2/16 gap-3 sm:w-full w-full text-center items-center text-white">
                            <Image src={"/images/various-payment.png"} alt={"Various Payment"} width={200} height={200}/>
                            <p>{t('home.various_payment_option')}</p>
                            <p>{t('home.various_payment_option_description')}</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default HomeContainer