import { useMetaTags } from "@hooks/common";
import { NextPageWithLayout } from "@interfaces/common";
import { buildSeoTags } from "@utils/common";
import Head from "next/head";
import { AppLayout } from "@layouts";
import FerrySuccessContainer from "@containers/FerrySuccessContainer";

const SuccessShipPage: NextPageWithLayout = () => {
    const seoTags = useMetaTags({ title: 'Success Ship Page'})

    return (
        <>
            <Head>{buildSeoTags(seoTags)}</Head>
            <FerrySuccessContainer />
        </>
    )
}

SuccessShipPage.getLayout = (page) => {
    return (
        <AppLayout>
            {page}
        </AppLayout>
    )
}

export default SuccessShipPage
