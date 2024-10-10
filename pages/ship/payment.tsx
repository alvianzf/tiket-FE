import { useMetaTags } from "@hooks/common";
import { NextPageWithLayout } from "@interfaces/common";
import { buildSeoTags } from "@utils/common";
import Head from "next/head";
import { AppLayout } from "@layouts";
import FerryPaymentContainer from "@containers/FerryPaymentContainer";

const PaymentShipPage: NextPageWithLayout = () => {
    const seoTags = useMetaTags({ title: 'Passenger Ship Page'})

    return (
        <>
            <Head>{buildSeoTags(seoTags)}</Head>
            <FerryPaymentContainer />
        </>
    )
}

PaymentShipPage.getLayout = (page) => {
    return (
        <AppLayout>
            {page}
        </AppLayout>
    )
}

export default PaymentShipPage
