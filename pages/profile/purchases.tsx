import { useMetaTags } from "@hooks/common";
import { NextPageWithLayout } from "@interfaces/common";
import { buildSeoTags } from "@utils/common";
import Head from "next/head";
import { AppLayout } from "@layouts";
import { useTranslation } from "react-i18next";
import PurchaseContainer from "@containers/PurchaseContainer";

const PurchasesPage: NextPageWithLayout = () => {
    const { t } = useTranslation();
    const seoTags = useMetaTags({ title: t('meta.purchase_title') })

    return (
        <>
            <Head>{buildSeoTags(seoTags)}</Head>
            <PurchaseContainer />
        </>
    )
}

PurchasesPage.getLayout = (page) => {
    return (
        <AppLayout>
            {page}
        </AppLayout>
    )
}

export default PurchasesPage
