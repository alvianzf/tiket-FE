import { useMetaTags } from "@hooks/common";
import { NextPageWithLayout } from "@interfaces/common";
import { buildSeoTags } from "@utils/common";
import Head from "next/head";
import { AppLayout } from "@layouts";
import { useTranslation } from "react-i18next";
import FlightListContainer from "@containers/FlightListContainer";

const FlightListPage: NextPageWithLayout = () => {
    const { t } = useTranslation();
    const seoTags = useMetaTags({ title: t('meta.flight_list_title') })

    return (
        <>
            <Head>{buildSeoTags(seoTags)}</Head>
            <FlightListContainer />
        </>
    )
}

FlightListPage.getLayout = (page) => {
    return (
        <AppLayout>
            {page}
        </AppLayout>
    )
}

export default FlightListPage
