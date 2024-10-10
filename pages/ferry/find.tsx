import { useMetaTags } from "@hooks/common";
import { NextPageWithLayout } from "@interfaces/common";
import { buildSeoTags } from "@utils/common";
import Head from "next/head";
import { AppLayout } from "@layouts";
import FerryFindContainer from "@containers/FerryFindContainer";

const FindBookShipPage: NextPageWithLayout = () => {
    const seoTags = useMetaTags({ title: 'Find Book Ship Page'})

    return (
        <>
            <Head>{buildSeoTags(seoTags)}</Head>
            <FerryFindContainer />
        </>
    )
}

FindBookShipPage.getLayout = (page) => {
    return (
        <AppLayout>
            {page}
        </AppLayout>
    )
}

export default FindBookShipPage
