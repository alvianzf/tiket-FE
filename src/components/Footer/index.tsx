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
                
                {/* AI Banner in Footer */}
                <div className="my-10 p-6 rounded-2xl bg-gradient-to-r from-orange-500/10 to-primary/10 border border-orange-500/20 flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex flex-col md:flex-row items-center gap-4 text-center md:text-left w-full">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-primary to-orange-500 flex items-center justify-center shadow-lg shadow-orange-500/30 text-white shrink-0">
                             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path></svg>
                        </div>
                        <div className="flex-1">
                            <p className="text-dark font-bold text-lg">Coba TiketQ AI Assistant Sekarang</p>
                            <p className="text-slate-500 text-sm mt-1">Pesan tiket penerbangan dan kapal ferry semudah ngobrol dengan teman.</p>
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