import { useMetaTags } from "@hooks/common";
import { NextPageWithLayout } from "@interfaces/common";
import { buildSeoTags } from "@utils/common";
import Head from "next/head";
import { AppLayout } from "@layouts";
import { useTranslation } from "react-i18next";
import OrderContainer from "@containers/OrderContainer";

const OrdersPage: NextPageWithLayout = () => {
    const { t } = useTranslation();
    const seoTags = useMetaTags({ title: t('meta.order_title') })

    return (
        <>
            <Head>{buildSeoTags(seoTags)}</Head>
            <OrderContainer />
        </>
    )
}

OrdersPage.getLayout = (page) => {
    return (
        <AppLayout>
            {page}
        </AppLayout>
    )
}

export default OrdersPage
