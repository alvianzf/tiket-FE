import { useMetaTags } from "@hooks/common";
import { NextPageWithLayout } from "@interfaces/common";
import { buildSeoTags } from "@utils/common";
import Head from "next/head";
import { AppLayout } from "@layouts";
import { useTranslation } from "react-i18next";
import DanaTransactionStatusContainer from "@containers/DanaTransactionStatusContainer";

const DanaTransactionStatusPage: NextPageWithLayout = () => {
    const { t } = useTranslation();
    const seoTags = useMetaTags({ title: t('checkout.checking_payment', 'Checking your payment…') })

    return (
        <>
            <Head>{buildSeoTags(seoTags)}</Head>
            <DanaTransactionStatusContainer />
        </>
    )
}

DanaTransactionStatusPage.getLayout = (page) => {
    return (
        <AppLayout>
            {page}
        </AppLayout>
    )
}

export default DanaTransactionStatusPage
