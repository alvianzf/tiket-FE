import { NextPageWithLayout } from "@interfaces/common";
import Head from "next/head";
import { AppLayout } from "@layouts";
import { Card, CardContent } from "@mui/material";
import { useTranslation } from "react-i18next";
import { Plane, Ship, Car, ShieldCheck, Sparkles, BadgeCheck } from "lucide-react";

const AboutPage: NextPageWithLayout = () => {
    const { t } = useTranslation();

    const offerings = [
        { icon: <Plane size={22} className="text-[#ff5a00]" />, title: t('pages.about.offer_flights'), body: t('pages.about.offer_flights_desc') },
        { icon: <Ship size={22} className="text-[#ff5a00]" />, title: t('pages.about.offer_ferry'), body: t('pages.about.offer_ferry_desc') },
        { icon: <Car size={22} className="text-[#ff5a00]" />, title: t('pages.about.offer_car'), body: t('pages.about.offer_car_desc') },
    ];

    const reasons = [
        { icon: <BadgeCheck size={22} className="text-primary" />, title: t('pages.about.why_1_title'), body: t('pages.about.why_1_body') },
        { icon: <Sparkles size={22} className="text-primary" />, title: t('pages.about.why_2_title'), body: t('pages.about.why_2_body') },
        { icon: <ShieldCheck size={22} className="text-primary" />, title: t('pages.about.why_3_title'), body: t('pages.about.why_3_body') },
    ];

    return (
        <div className="min-h-screen py-14 px-5">
            <Head>
                <title>{`${t('pages.about.title')} — TiketQ`}</title>
            </Head>

            <div className="max-w-[960px] mx-auto flex flex-col gap-12">
                <header className="text-center space-y-3">
                    <h1 className="text-4xl font-extrabold text-slate-800 tracking-tight">{t('pages.about.title')}</h1>
                    <p className="text-slate-500 font-medium max-w-2xl mx-auto leading-relaxed">{t('pages.about.subtitle')}</p>
                </header>

                <Card className="rounded-3xl">
                    <CardContent className="p-8 space-y-3">
                        <h2 className="text-xl font-bold text-slate-800">{t('pages.about.mission_title')}</h2>
                        <p className="text-slate-600 leading-relaxed">{t('pages.about.mission_body')}</p>
                    </CardContent>
                </Card>

                <section className="space-y-5">
                    <h2 className="text-xl font-bold text-slate-800">{t('pages.about.offer_title')}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                        {offerings.map((o) => (
                            <Card key={o.title} className="rounded-2xl h-full">
                                <CardContent className="p-6 space-y-2">
                                    <div className="w-11 h-11 rounded-xl bg-orange-500/10 flex items-center justify-center">{o.icon}</div>
                                    <h3 className="font-bold text-slate-800">{o.title}</h3>
                                    <p className="text-slate-500 text-sm leading-relaxed">{o.body}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </section>

                <section className="space-y-5">
                    <h2 className="text-xl font-bold text-slate-800">{t('pages.about.why_title')}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                        {reasons.map((r) => (
                            <Card key={r.title} className="rounded-2xl h-full">
                                <CardContent className="p-6 space-y-2">
                                    <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center">{r.icon}</div>
                                    <h3 className="font-bold text-slate-800">{r.title}</h3>
                                    <p className="text-slate-500 text-sm leading-relaxed">{r.body}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
};

AboutPage.getLayout = (page) => <AppLayout>{page}</AppLayout>;

export default AboutPage;
