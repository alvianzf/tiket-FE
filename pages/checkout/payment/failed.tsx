import { useMetaTags } from "@hooks/common";
import { NextPageWithLayout } from "@interfaces/common";
import { buildSeoTags } from "@utils/common";
import Head from "next/head";
import { AppLayout } from "@layouts";
import { useTranslation } from "react-i18next";
import FailedPaymentContainer from "@containers/FailedPaymentContainer";

const CheckoutFailedPaymentPage: NextPageWithLayout = () => {
    const { t } = useTranslation();
    const seoTags = useMetaTags({ title: t('meta.checkout_payment_title') })

    return (
        <>
            <Head>{buildSeoTags(seoTags)}</Head>
            <FailedPaymentContainer />
        </>
    )
}

CheckoutFailedPaymentPage.getLayout = (page) => {
    return (
        <AppLayout>
            {page}
        </AppLayout>
    )
}

export default CheckoutFailedPaymentPage
