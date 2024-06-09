import { useMetaTags } from "@hooks/common";
import { NextPageWithLayout } from "@interfaces/common";
import { buildSeoTags } from "@utils/common";
import Head from "next/head";
import { CheckoutLayout } from "@layouts";
import { useTranslation } from "react-i18next";
import PaymentContainer from "@containers/PaymentContainer";

const CheckoutPaymentPage: NextPageWithLayout = () => {
    const { t } = useTranslation();
    const seoTags = useMetaTags({ title: t('meta.checkout_payment_title') })

    return (
        <>
            <Head>{buildSeoTags(seoTags)}</Head>
            <PaymentContainer />
        </>
    )
}

CheckoutPaymentPage.getLayout = (page) => {
    return (
        <CheckoutLayout>
            {page}
        </CheckoutLayout>
    )
}

export default CheckoutPaymentPage
