import FerryFind from "@components/FerryFind";
import FerryPartners from "@components/FerryPartners"
import PaymentPartners from "@components/PaymentPartners"
import Image from "next/image";
import { useTranslation } from "react-i18next";

const FerryFindContainer = () => {

    const { t } = useTranslation();

    return (
        <>
        <div className="flex flex-col min-h-screen">
            <div className="flex flex-wrap justify-center min-h-[500px] ferry-app relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white/20 z-0"></div>
                <div className="flex flex-wrap justify-center lg:justify-end items-center w-full py-12 px-6 lg:px-20 relative z-10 max-w-[1440px]">
                    <div className="animate-fade-in-up">
                        <FerryFind />
                    </div>
                </div>
            </div>
            
            <div className="flex flex-wrap justify-center -mt-12 relative z-20 px-4">
                <div className="glass-card flex flex-wrap w-full gap-8 p-8 max-w-[1280px] bg-white/40 shadow-2xl items-center justify-around border-white/40 backdrop-blur-2xl">
                    <div className="flex-1 min-w-[300px]">
                        <FerryPartners />
                    </div>
                    <div className="w-px h-12 bg-slate-300/30 hidden lg:block"></div>
                    <div className="flex-1 min-w-[300px]">
                        <PaymentPartners />
                    </div>
                </div>
            </div>
            
            <div className="flex justify-center py-24 bg-gradient-to-b from-white to-slate-50">
                <div className="flex flex-col w-full gap-16 max-w-[1280px] px-6">
                    <div className="text-center space-y-4">
                        <h2 className="text-4xl font-bold text-slate-900 tracking-tight">
                            {t('home.why_book_title')}
                        </h2>
                        <div className="w-24 h-1 bg-orange-500 mx-auto rounded-full"></div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        <div className="glass-card p-8 bg-white/60 hover:scale-105 transition-all text-center space-y-4 group">
                            <div className="w-20 h-20 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto group-hover:bg-blue-500 group-hover:rotate-6 transition-all duration-300">
                                <Image src="/images/secure-transactions.png" alt="Secure" width={60} height={60} className="group-hover:brightness-0 group-hover:invert transition-all"/>
                            </div>
                            <h3 className="text-xl font-bold text-slate-800">{t('home.secure_transaction')}</h3>
                            <p className="text-slate-600 leading-relaxed">{t('home.secure_transaction_description')}</p>
                        </div>
                        
                        <div className="glass-card p-8 bg-white/60 hover:scale-105 transition-all text-center space-y-4 group">
                            <div className="w-20 h-20 bg-indigo-100 rounded-2xl flex items-center justify-center mx-auto group-hover:bg-indigo-500 group-hover:rotate-6 transition-all duration-300">
                                <Image src="/images/support.png" alt="Support" width={60} height={60} className="group-hover:brightness-0 group-hover:invert transition-all"/>
                            </div>
                            <h3 className="text-xl font-bold text-slate-800">{t('home.assistance_and_support')}</h3>
                            <p className="text-slate-600 leading-relaxed">{t('home.assistance_and_support_description')}</p>
                        </div>
                        
                        <div className="glass-card p-8 bg-white/60 hover:scale-105 transition-all text-center space-y-4 group">
                            <div className="w-20 h-20 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto group-hover:bg-orange-500 group-hover:rotate-6 transition-all duration-300">
                                <Image src="/images/various-payment.png" alt="Payment" width={60} height={60} className="group-hover:brightness-0 group-hover:invert transition-all"/>
                            </div>
                            <h3 className="text-xl font-bold text-slate-800">{t('home.various_payment_option')}</h3>
                            <p className="text-slate-600 leading-relaxed">{t('home.various_payment_option_description')}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default FerryFindContainer