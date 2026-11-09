import { useMetaTags } from "@hooks/common";
import { NextPageWithLayout } from "@interfaces/common";
import { buildSeoTags } from "@utils/common";
import Head from "next/head";
import { AppLayout } from "@layouts";
import HotelListContainer from "@containers/HotelListContainer";

const HotelsPage: NextPageWithLayout = () => {
    const seoTags = useMetaTags({
        title: "Hotels & Stays in Batam | TiketQ",
        description: "Handpicked Batam hotels and stays, confirmed by our concierge team.",
        keywords: "batam hotel, batam stay, batam accommodation",
        ogTitle: "Hotels & Stays in Batam",
        ogDescription: "Handpicked Batam hotels and stays.",
        canonical: "https://tiketq.com/hotels",
    });

    return (
        <>
            <Head>{buildSeoTags(seoTags)}</Head>
            <HotelListContainer />
        </>
    );
};

HotelsPage.getLayout = (page) => <AppLayout>{page}</AppLayout>;

export default HotelsPage;
