import Facebook from "@icons/Facebook";
import Instagram from "@icons/Instagram";
import Twitter from "@icons/Twitter";
import Link from "next/link";
import { useTranslation } from "react-i18next"

const Footer = () => {
    const { t } = useTranslation();

    const navLinks = [
        { label: t('footer.nav_flights'), href: '/' },
        { label: t('footer.nav_ferry'), href: '/ferry' },
        { label: t('footer.nav_car'), href: '/car-rental' },
        { label: t('footer.nav_history'), href: '/history' },
    ];

    const linkClass = "text-slate-600 hover:text-primary text-sm transition-colors";

    return (
        <div className="flex justify-center mt-20 mb-10 mx-[40px] lg:mx-0">
            <div className="flex flex-col w-full gap-12 px-6 max-w-[1200px]">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                    <div className="flex flex-col gap-4">
                        <p className="font-extrabold text-dark tracking-tight text-lg">Tiket<span className="text-primary">Q</span></p>
                        <p className="text-slate-500 text-sm leading-relaxed max-w-xs">{t('footer.description') || "Premium travel booking experience with the best prices and services."}</p>
                    </div>
                    <div className="flex flex-col gap-3">
                        <p className="font-bold text-dark uppercase tracking-wider text-xs">{t('footer.nav_title')}</p>
                        {navLinks.map((item) => (
                            <Link key={item.href} href={item.href} className={linkClass}>{item.label}</Link>
                        ))}
                    </div>
                    <div className="flex flex-col gap-3">
                        <p className="font-bold text-dark uppercase tracking-wider text-xs">{t('footer.about_us_title')}</p>
                        <Link href="/about" className={linkClass}>{t('footer.about_us')}</Link>
                        <Link href="/resources" className={linkClass}>{t('footer.resouces_and_policies')}</Link>
                    </div>
                    <div className="flex flex-col gap-3">
                        <p className="font-bold text-dark uppercase tracking-wider text-xs">{t('footer.contact_us')}</p>
                        <Link href="/contact" className={linkClass}>{t('footer.customer_service')}</Link>
                        <Link href="/contact" className={linkClass}>{t('footer.service_protection')}</Link>
                        <Link href="/contact" className={linkClass}>{t('footer.feedback')}</Link>
                    </div>
                </div>

                <hr className="border-slate-200" />
                <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-slate-400 text-xs font-medium">
                    <p>{t('footer.copyright')}</p>
                    <div className="flex items-center gap-6">
                        <div className="flex flex-row gap-4">
                            <a href="#" aria-label="Facebook" className="text-slate-400 hover:text-primary transition-colors">
                                <Facebook width={20} height={20} />
                            </a>
                            <a href="#" aria-label="Twitter" className="text-slate-400 hover:text-primary transition-colors">
                                <Twitter width={20} height={20} />
                            </a>
                            <a href="#" aria-label="Instagram" className="text-slate-400 hover:text-primary transition-colors">
                                <Instagram width={20} height={20} />
                            </a>
                        </div>
                        <p>{t('footer.company_name')}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer
