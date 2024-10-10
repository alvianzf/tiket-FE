import { useMetaTags } from "@hooks/common";
import { NextPageWithLayout } from "@interfaces/common";
import { buildSeoTags } from "@utils/common";
import Head from "next/head";
import { AppLayout } from "@layouts";
import FerryFailedContainer from "@containers/FerryFailedContainer";

const FailedShipPage: NextPageWithLayout = () => {
    const seoTags = useMetaTags({ title: 'Success Ship Page'})

    return (
        <>
            <Head>{buildSeoTags(seoTags)}</Head>
            <FerryFailedContainer />
        </>
    )
}

FailedShipPage.getLayout = (page) => {
    return (
        <AppLayout>
            {page}
        </AppLayout>
    )
}

export default FailedShipPage
