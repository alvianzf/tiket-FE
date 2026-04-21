import { useMetaTags } from "@hooks/common";
import { NextPageWithLayout } from "@interfaces/common";
import { buildSeoTags } from "@utils/common";
import Head from "next/head";
import { AppLayout } from "@layouts";
import { useTranslation } from "react-i18next";
import SuccessPaymentContainer from "@containers/SuccessPaymentContainer";

const CheckoutSuccessPaymentPage: NextPageWithLayout = () => {
    const { t } = useTranslation();
    const seoTags = useMetaTags({ title: t('meta.checkout_payment_title') })

    return (
        <>
            <Head>{buildSeoTags(seoTags)}</Head>
            <SuccessPaymentContainer />
        </>
    )
}

CheckoutSuccessPaymentPage.getLayout = (page) => {
    return (
        <AppLayout>
            {page}
        </AppLayout>
    )
}

export default CheckoutSuccessPaymentPage
