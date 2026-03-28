import { Button, Image } from "@nextui-org/react";
import NextImage from "next/image";
import { useTranslation } from "react-i18next";

const PurchaseContainer = () => {
    const { t } = useTranslation();

    return (
        <div className="flex flex-wrap justify-center my-10 min-h-[60vh] items-center">
            <div className="flex flex-col gap-8 w-full px-5 max-w-[1024px]">
                <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
                    {t('profile.purchase_title')}
                </h1>
                
                <div className="glass-card overflow-hidden bg-white/10 p-8 md:p-12 shadow-2xl relative">
                    {/* Decorative blur elements for premium feel */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl -ml-32 -mb-32"></div>
                    
                    <div className="flex flex-col md:flex-row gap-12 items-center relative z-10">
                        <div className="w-full md:w-1/2 flex justify-center">
                            <div className="relative group">
                                <div className="absolute inset-0 bg-blue-400/20 rounded-full blur-2xl group-hover:bg-blue-400/30 transition-all duration-500"></div>
                                <Image 
                                    as={NextImage}
                                    src="/images/no-purchases.png" 
                                    width={350} 
                                    height={350} 
                                    alt="No purchases yet"
                                    className="relative z-10 drop-shadow-2xl animate-float"
                                />
                            </div>
                        </div>
                        
                        <div className="flex flex-col gap-6 text-center md:text-left md:w-1/2">
                            <div className="space-y-4">
                                <h2 className="text-3xl font-bold text-slate-800">
                                    {t('profile.no_purchases_yet_title')}
                                </h2>
                                <p className="text-lg text-slate-600 leading-relaxed">
                                    {t('profile.no_purchases_yet_description')}
                                </p>
                            </div>
                            
                            <div className="pt-4">
                                <Button 
                                    color="primary" 
                                    size="lg"
                                    className="button-blue px-8 font-bold shadow-lg shadow-blue-500/30 hover:scale-105 transition-all"
                                    onClick={() => window.location.href = '/'}
                                >
                                    {t('profile.make_a_new_purchase')}
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PurchaseContainer;