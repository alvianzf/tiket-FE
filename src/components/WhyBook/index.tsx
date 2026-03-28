import { useTranslation } from "react-i18next";

const WhyBook = () => {
    const { t } = useTranslation();

    const features = [
        {
            title: t('home.secure_transaction'),
            description: t('home.secure_transaction_description'),
            icon: "/images/secure-transactions.png",
            bgColor: "bg-blue-400/20",
            hoverIconBg: "group-hover:bg-blue-500",
        },
        {
            title: t('home.assistance_and_support'),
            description: t('home.assistance_and_support_description'),
            icon: "/images/support.png",
            bgColor: "bg-indigo-400/20",
            hoverIconBg: "group-hover:bg-indigo-500",
        },
        {
            title: t('home.various_payment_option'),
            description: t('home.various_payment_option_description'),
            icon: "/images/various-payment.png",
            bgColor: "bg-orange-400/20",
            hoverIconBg: "group-hover:bg-orange-500",
        }
    ];

    return (
        <div className="flex justify-center py-24 bg-blue relative overflow-hidden">
            {/* Decorative background elements */}
            <div className="absolute top-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -ml-48 -mt-48 animate-pulse"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl -mr-48 -mb-48"></div>
            
            <div className="flex flex-col w-full gap-16 max-w-[1280px] px-6 relative z-10">
                <div className="text-center space-y-4">
                    <h2 className="text-4xl font-bold text-white tracking-tight">
                        {t('home.why_book_title')}
                    </h2>
                    <div className="w-24 h-1 bg-secondary mx-auto rounded-full shadow-[0_0_10px_rgba(0,213,255,0.5)]"></div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {features.map((feature, index) => (
                        <div key={index} className="glass-card p-8 bg-white/10 border-white/20 hover:bg-white/15 hover:scale-105 transition-all text-center space-y-6 group shadow-xl">
                            <div className={`w-24 h-24 ${feature.bgColor} rounded-3xl flex items-center justify-center mx-auto ${feature.hoverIconBg} group-hover:rotate-6 transition-all duration-500 shadow-inner`}>
                                <img 
                                    src={feature.icon} 
                                    alt={feature.title} 
                                    width={60} 
                                    height={60} 
                                    className="group-hover:brightness-0 group-hover:invert transition-all duration-300 drop-shadow-lg"
                                />
                            </div>
                            <div className="space-y-3">
                                <h3 className="text-2xl font-bold text-white group-hover:text-secondary transition-colors">
                                    {feature.title}
                                </h3>
                                <p className="text-white/80 leading-relaxed font-light text-lg">
                                    {feature.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default WhyBook;
