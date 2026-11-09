import { useMetaTags } from "@hooks/common";
import { NextPageWithLayout } from "@interfaces/common";
import { buildSeoTags } from "@utils/common";
import Head from "next/head";
import { AppLayout } from "@layouts";
import ActivityListContainer from "@containers/ActivityListContainer";

const ActivitiesPage: NextPageWithLayout = () => {
    const seoTags = useMetaTags({
        title: "Batam Activities & Tours | TiketQ",
        description: "Golf, diving, island hopping, and more Batam experiences, confirmed by our concierge team.",
        keywords: "batam activities, batam tours, batam golf, batam diving",
        ogTitle: "Batam Activities & Tours",
        ogDescription: "Golf, diving, island hopping, and more.",
        canonical: "https://tiketq.com/activities",
    });

    return (
        <>
            <Head>{buildSeoTags(seoTags)}</Head>
            <ActivityListContainer />
        </>
    );
};

ActivitiesPage.getLayout = (page) => <AppLayout>{page}</AppLayout>;

export default ActivitiesPage;
