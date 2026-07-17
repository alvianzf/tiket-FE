import { NextPageWithLayout } from "@interfaces/common";
import Head from "next/head";
import { AppLayout } from "@layouts";
import { Card, CardContent } from "@mui/material";
import { useTranslation } from "react-i18next";
import { Mail, MessageCircle, Phone, Clock, MapPin } from "lucide-react";

const ContactPage: NextPageWithLayout = () => {
    const { t } = useTranslation();

    const channels = [
        { icon: <Mail size={20} className="text-[#ff5a00]" />, label: t('pages.contact.email_label'), value: t('pages.contact.email_value'), href: `mailto:${t('pages.contact.email_value')}` },
        { icon: <MessageCircle size={20} className="text-[#ff5a00]" />, label: t('pages.contact.whatsapp_label'), value: t('pages.contact.whatsapp_value'), href: `https://wa.me/${t('pages.contact.whatsapp_value').replace(/[^0-9]/g, '')}` },
        { icon: <Phone size={20} className="text-[#ff5a00]" />, label: t('pages.contact.phone_label'), value: t('pages.contact.phone_value'), href: `tel:${t('pages.contact.phone_value').replace(/\s/g, '')}` },
    ];

    const details = [
        { icon: <Clock size={20} className="text-primary" />, label: t('pages.contact.hours_label'), value: t('pages.contact.hours_value') },
        { icon: <MapPin size={20} className="text-primary" />, label: t('pages.contact.address_label'), value: t('pages.contact.address_value') },
    ];

    return (
        <div className="min-h-screen py-14 px-5">
            <Head>
                <title>{`${t('pages.contact.title')} — TiketQ`}</title>
            </Head>

            <div className="max-w-[860px] mx-auto flex flex-col gap-10">
                <header className="text-center space-y-3">
                    <h1 className="text-4xl font-extrabold text-slate-800 tracking-tight">{t('pages.contact.title')}</h1>
                    <p className="text-slate-500 font-medium max-w-2xl mx-auto leading-relaxed">{t('pages.contact.subtitle')}</p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    {channels.map((c) => (
                        <a key={c.label} href={c.href} target="_blank" rel="noopener noreferrer" className="block">
                            <Card className="rounded-2xl h-full hover:shadow-lg transition-shadow">
                                <CardContent className="p-6 space-y-2">
                                    <div className="w-11 h-11 rounded-xl bg-orange-500/10 flex items-center justify-center">{c.icon}</div>
                                    <p className="font-bold text-slate-800 text-sm">{c.label}</p>
                                    <p className="text-slate-600 text-sm break-words">{c.value}</p>
                                </CardContent>
                            </Card>
                        </a>
                    ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {details.map((d) => (
                        <Card key={d.label} className="rounded-2xl">
                            <CardContent className="p-6 flex items-center gap-4">
                                <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">{d.icon}</div>
                                <div>
                                    <p className="font-bold text-slate-800 text-sm">{d.label}</p>
                                    <p className="text-slate-600 text-sm">{d.value}</p>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                <Card className="rounded-2xl bg-orange-500/5 border border-orange-500/20">
                    <CardContent className="p-6">
                        <p className="text-slate-600 text-sm leading-relaxed">{t('pages.contact.cs_note')}</p>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

ContactPage.getLayout = (page) => <AppLayout>{page}</AppLayout>;

export default ContactPage;
