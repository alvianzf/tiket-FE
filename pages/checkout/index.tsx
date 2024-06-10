import { useMetaTags } from "@hooks/common";
import { NextPageWithLayout } from "@interfaces/common";
import { buildSeoTags } from "@utils/common";
import Head from "next/head";
import { CheckoutLayout } from "@layouts";
import { useTranslation } from "react-i18next";
import CheckoutContainer from "@containers/CheckoutContainer";

const CheckoutPage: NextPageWithLayout = () => {
    const { t } = useTranslation();
    const seoTags = useMetaTags({ title: t('meta.checkout_title') })

    return (
        <>
            <Head>{buildSeoTags(seoTags)}</Head>
            <CheckoutContainer />
        </>
    )
}

CheckoutPage.getLayout = (page) => {
    return (
        <CheckoutLayout>
            {page}
        </CheckoutLayout>
    )
}

export default CheckoutPage
