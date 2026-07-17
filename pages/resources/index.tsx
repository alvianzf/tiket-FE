import { NextPageWithLayout } from "@interfaces/common";
import Head from "next/head";
import { AppLayout } from "@layouts";
import { Card, CardContent } from "@mui/material";
import { useTranslation } from "react-i18next";
import { Lock, FileText, RotateCcw, HelpCircle } from "lucide-react";

const ResourcesPage: NextPageWithLayout = () => {
    const { t } = useTranslation();

    const sections = [
        { icon: <Lock size={20} className="text-primary" />, title: t('pages.resources.privacy_title'), body: t('pages.resources.privacy_body') },
        { icon: <FileText size={20} className="text-primary" />, title: t('pages.resources.terms_title'), body: t('pages.resources.terms_body') },
        { icon: <RotateCcw size={20} className="text-primary" />, title: t('pages.resources.refund_title'), body: t('pages.resources.refund_body') },
        { icon: <HelpCircle size={20} className="text-primary" />, title: t('pages.resources.faq_title'), body: t('pages.resources.faq_body') },
    ];

    return (
        <div className="min-h-screen py-14 px-5">
            <Head>
                <title>{`${t('pages.resources.title')} — TiketQ`}</title>
            </Head>

            <div className="max-w-[860px] mx-auto flex flex-col gap-10">
                <header className="text-center space-y-3">
                    <h1 className="text-4xl font-extrabold text-slate-800 tracking-tight">{t('pages.resources.title')}</h1>
                    <p className="text-slate-500 font-medium max-w-2xl mx-auto leading-relaxed">{t('pages.resources.subtitle')}</p>
                </header>

                <div className="flex flex-col gap-5">
                    {sections.map((s) => (
                        <Card key={s.title} className="rounded-2xl">
                            <CardContent className="p-6 space-y-2">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">{s.icon}</div>
                                    <h2 className="text-lg font-bold text-slate-800">{s.title}</h2>
                                </div>
                                <p className="text-slate-600 text-sm leading-relaxed">{s.body}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
};

ResourcesPage.getLayout = (page) => <AppLayout>{page}</AppLayout>;

export default ResourcesPage;
