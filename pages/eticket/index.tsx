import { useMetaTags } from "@hooks/common";
import { NextPageWithLayout } from "@interfaces/common";
import { buildSeoTags } from "@utils/common";
import Head from "next/head";
import { AppLayout } from "@layouts";
import { useTranslation } from "react-i18next";
import EticketContainer from "@containers/EticketContainer";

const EticketPage: NextPageWithLayout = () => {
    const { t } = useTranslation();
    const seoTags = useMetaTags({ title: t('meta.order_title') })

    return (
        <>
            <Head>{buildSeoTags(seoTags)}</Head>
            <EticketContainer />
        </>
    )
}

EticketPage.getLayout = (page) => {
    return (
        <AppLayout>
            {page}
        </AppLayout>
    )
}

export default EticketPage
