import { useMetaTags } from "@hooks/common";
import { NextPageWithLayout } from "@interfaces/common";
import { buildSeoTags } from "@utils/common";
import Head from "next/head";
import { AppLayout } from "@layouts";
import ShipContainer from "@containers/ShipContainer";

const ShipPage: NextPageWithLayout = () => {
    const seoTags = useMetaTags({ title: 'Book Ship Page'})

    return (
        <>
            <Head>{buildSeoTags(seoTags)}</Head>
            <ShipContainer />
        </>
    )
}

ShipPage.getLayout = (page) => {
    return (
        <AppLayout>
            {page}
        </AppLayout>
    )
}

export default ShipPage
