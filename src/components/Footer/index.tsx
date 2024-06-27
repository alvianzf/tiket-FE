import Facebook from "@icons/Facebook";
import Instagram from "@icons/Instagram";
import Twitter from "@icons/Twitter";
import { useTranslation } from "react-i18next"

const Footer = () => {
    const { t } = useTranslation();

    return (
        <div className="flex justify-center my-10 mx-[40px] lg:mx-0 md:mx-[40px]">
            <div className="flex flex-col w-full gap-8 px-5 max-w-[1024px]">
                <div className="flex flex-row flex-wrap justify-between">
                    <div className="flex flex-col lg:w-3/12 md:w-2/16 gap-3 sm:w-full w-ful mb-[25px]">
                        <p className="font-bold">{t('footer.contact_us')}</p>
                        <a href="#">{t('footer.customer_service')}</a>
                        <a href="#">{t('footer.service_protection')}</a>
                        <a href="#">{t('footer.feedback')}</a>
                    </div>
                    <div className="flex flex-col lg:w-3/12 md:w-2/16 gap-3 sm:w-full w-full mb-[25px]">
                        <p className="font-bold">{t('footer.about_us_title')}</p>
                        <a href="#">{t('footer.about_us')}</a>
                        <a href="#">{t('footer.news')}</a>
                        <a href="#">{t('footer.resouces_and_policies')}</a>
                    </div>
                    <div className="flex flex-col lg:w-3/12 md:w-2/16 gap-3 sm:w-full w-full mb-[25px]">
                        <p className="font-bold">{t('footer.get_the_app')}</p>
                        <a href="#">{t('footer.android_app')}</a>
                        <a href="#">{t('footer.iphone_app')}</a>
                    </div>
                </div>
                <div className="flex flex-row justify-center gap-3">
                    <Facebook width={30} height={30} />
                    <Twitter width={30} height={30} />
                    <Instagram width={30} height={30} />
                </div>
                <hr />
                <div className="flex flex-col text-center">
                    <p>{t('footer.copyright')}</p>
                    <p>{t('footer.company_name')}</p>
                </div>
            </div>
        </div>
    )
}

export default Footer