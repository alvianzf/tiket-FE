import { useMetaTags } from "@hooks/common";
import { NextPageWithLayout } from "@interfaces/common";
import { buildSeoTags } from "@utils/common";
import Head from "next/head";
import { AppLayout } from "@layouts";
import ShipContainer from "@containers/ShipContainer";

const HomePage: NextPageWithLayout = () => {
    const seoTags = useMetaTags({
        title: 'Tiket Feri Batam - Malaysia - Singapura | TiketQ',
        description: 'Pesan tiket feri Batam ke Malaysia & Singapura dengan mudah dan aman. Jadwal lengkap, harga terbaik, konfirmasi instan.',
        keywords: 'tiket feri batam, feri batam singapura, feri batam malaysia, tiketq, pesan feri online',
        ogTitle: 'TiketQ — Tiket Feri Batam, Malaysia & Singapura',
        ogDescription: 'Pesan tiket feri Batam ke Malaysia & Singapura dengan mudah dan aman. Harga terbaik, layanan 24/7.',
        canonical: 'https://tiketq.com',
    })

    return (
        <>
            <Head>{buildSeoTags(seoTags)}</Head>
            <ShipContainer />
        </>
    )
}

HomePage.getLayout = (page) => {
    return (
        <AppLayout>
            {page}
        </AppLayout>
    )
}

export default HomePage
