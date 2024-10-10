import { useMetaTags } from "@hooks/common";
import { NextPageWithLayout } from "@interfaces/common";
import { buildSeoTags } from "@utils/common";
import Head from "next/head";
import { AppLayout } from "@layouts";
import FerryPassengerContainer from "@containers/FerryPassengerContainer";

const PassengerShipPage: NextPageWithLayout = () => {
    const seoTags = useMetaTags({ title: 'Passenger Ship Page'})

    return (
        <>
            <Head>{buildSeoTags(seoTags)}</Head>
            <FerryPassengerContainer />
        </>
    )
}

PassengerShipPage.getLayout = (page) => {
    return (
        <AppLayout>
            {page}
        </AppLayout>
    )
}

export default PassengerShipPage
