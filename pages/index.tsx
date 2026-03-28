import { useMetaTags } from "@hooks/common";
import { NextPageWithLayout } from "@interfaces/common";
import { buildSeoTags } from "@utils/common";
import Head from "next/head";
import { AppLayout } from "@layouts";
import HomeContainer from "@containers/HomeContainer";

const HomePage: NextPageWithLayout = () => {
    const seoTags = useMetaTags({
        title: 'Pesan Tiket Pesawat, Feri & Sewa Mobil di Batam',
        description: 'TiketQ — platform lengkap untuk pesan tiket pesawat, feri, dan sewa mobil di Batam. Harga terbaik, proses mudah, aman dan terpercaya.',
        keywords: 'tiket pesawat batam, feri batam, sewa mobil batam, tiketq, pesan tiket online batam, travel batam',
        ogTitle: 'TiketQ — Tiket Pesawat, Feri & Sewa Mobil Batam',
        ogDescription: 'Pesan tiket pesawat, feri, dan sewa mobil di Batam dengan mudah. Harga terbaik, layanan 24/7.',
        canonical: 'https://tiketq.com',
    })

    return (
        <>
            <Head>{buildSeoTags(seoTags)}</Head>
            <HomeContainer />
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
