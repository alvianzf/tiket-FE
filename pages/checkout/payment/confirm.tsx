import { useMetaTags } from "@hooks/common";
import { NextPageWithLayout } from "@interfaces/common";
import { buildSeoTags } from "@utils/common";
import Head from "next/head";
import { CheckoutLayout } from "@layouts";
import { useTranslation } from "react-i18next";
import ConfirmPaymentContainer from "@containers/ConfirmPaymentContainer";

const CheckoutConfirmPaymentPage: NextPageWithLayout = () => {
    const { t } = useTranslation();
    const seoTags = useMetaTags({ title: t('meta.checkout_payment_title') })

    return (
        <>
            <Head>{buildSeoTags(seoTags)}</Head>
            <ConfirmPaymentContainer />
        </>
    )
}

CheckoutConfirmPaymentPage.getLayout = (page) => {
    return (
        <CheckoutLayout>
            {page}
        </CheckoutLayout>
    )
}

export default CheckoutConfirmPaymentPage
