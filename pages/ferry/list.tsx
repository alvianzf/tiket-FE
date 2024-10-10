import { useMetaTags } from "@hooks/common";
import { NextPageWithLayout } from "@interfaces/common";
import { buildSeoTags } from "@utils/common";
import Head from "next/head";
import { AppLayout } from "@layouts";
import FerryListContainer from "@containers/FerryListContainer";

const ListShipPage: NextPageWithLayout = () => {
    const seoTags = useMetaTags({ title: 'List Ship Page'})

    return (
        <>
            <Head>{buildSeoTags(seoTags)}</Head>
            <FerryListContainer />
        </>
    )
}

ListShipPage.getLayout = (page) => {
    return (
        <AppLayout>
            {page}
        </AppLayout>
    )
}

export default ListShipPage
