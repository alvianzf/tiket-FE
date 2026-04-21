import Facebook from "@icons/Facebook";
import Instagram from "@icons/Instagram";
import Twitter from "@icons/Twitter";
import { useTranslation } from "react-i18next"

const Footer = () => {
    const { t } = useTranslation();

    return (
        <div className="flex justify-center mt-20 mb-10 mx-[40px] lg:mx-0">
            <div className="flex flex-col w-full gap-12 px-6 max-w-[1200px]">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                    <div className="flex flex-col gap-4">
                        <p className="font-extrabold text-dark tracking-tight text-lg">Tiket<span className="text-primary">Q</span></p>
                        <p className="text-slate-500 text-sm leading-relaxed max-w-xs">{t('footer.description') || "Premium travel booking experience with the best prices and services."}</p>
                    </div>
                    <div className="flex flex-col gap-3">
                        <p className="font-bold text-dark uppercase tracking-wider text-xs">{t('footer.contact_us')}</p>
                        <a href="#" className="text-slate-600 hover:text-primary text-sm transition-colors">{t('footer.customer_service')}</a>
                        <a href="#" className="text-slate-600 hover:text-primary text-sm transition-colors">{t('footer.service_protection')}</a>
                        <a href="#" className="text-slate-600 hover:text-primary text-sm transition-colors">{t('footer.feedback')}</a>
                    </div>
                    <div className="flex flex-col gap-3">
                        <p className="font-bold text-dark uppercase tracking-wider text-xs">{t('footer.about_us_title')}</p>
                        <a href="#" className="text-slate-600 hover:text-primary text-sm transition-colors">{t('footer.about_us')}</a>
                        <a href="#" className="text-slate-600 hover:text-primary text-sm transition-colors">{t('footer.news')}</a>
                        <a href="#" className="text-slate-600 hover:text-primary text-sm transition-colors">{t('footer.resouces_and_policies')}</a>
                    </div>
                    <div className="flex flex-col gap-4">
                        <p className="font-bold text-dark uppercase tracking-wider text-xs">{t('footer.get_the_app')}</p>
                        <div className="flex flex-col gap-2">
                             <a href="#" className="text-slate-600 hover:text-primary text-sm transition-colors">{t('footer.android_app')}</a>
                             <a href="#" className="text-slate-600 hover:text-primary text-sm transition-colors">{t('footer.iphone_app')}</a>
                        </div>
                        <div className="flex flex-row gap-4 mt-2">
                            <div className="text-slate-400 hover:text-primary transition-colors cursor-pointer">
                                <Facebook width={24} height={24} />
                            </div>
                            <div className="text-slate-400 hover:text-primary transition-colors cursor-pointer">
                                <Twitter width={24} height={24} />
                            </div>
                            <div className="text-slate-400 hover:text-primary transition-colors cursor-pointer">
                                <Instagram width={24} height={24} />
                            </div>
                        </div>
                    </div>
                </div>
                <hr className="border-slate-200" />
                <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-slate-400 text-xs font-medium">
                    <p>{t('footer.copyright')}</p>
                    <p>{t('footer.company_name')}</p>
                </div>
            </div>
        </div>
    )
}

export default Footer