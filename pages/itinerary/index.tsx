import { useMetaTags } from "@hooks/common";
import { NextPageWithLayout } from "@interfaces/common";
import { buildSeoTags } from "@utils/common";
import Head from "next/head";
import { AppLayout } from "@layouts";
import ItineraryBuilderContainer from "@containers/ItineraryBuilderContainer";

const ItineraryPage: NextPageWithLayout = () => {
    const seoTags = useMetaTags({
        title: "ItinerQ – Build Your Batam Trip | TiketQ",
        description: "Drag and drop Batam destinations into your own itinerary, see cost and time add up instantly, or ask our AI assistant for ideas.",
        keywords: "batam itinerary, batam trip planner, itinerq, batam destinations",
        ogTitle: "ItinerQ – Build Your Batam Trip",
        ogDescription: "Plan your Batam trip stop by stop.",
        canonical: "https://tiketq.com/itinerary",
    });

    return (
        <>
            <Head>{buildSeoTags(seoTags)}</Head>
            <ItineraryBuilderContainer />
        </>
    );
};

ItineraryPage.getLayout = (page) => <AppLayout>{page}</AppLayout>;

export default ItineraryPage;
