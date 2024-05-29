import { useMetaTags } from "@hooks/common";
import { NextPageWithLayout } from "@interfaces/common";
import { buildSeoTags } from "@utils/common";
import Head from "next/head";
import { AppLayout } from "@layouts";
import { useTranslation } from "react-i18next";
import TicketListContainer from "@containers/TicketListContainer";

const TicketListPage: NextPageWithLayout = () => {
    const { t } = useTranslation();
    const seoTags = useMetaTags({ title: t('meta.ticket_list_title') })

    return (
        <>
            <Head>{buildSeoTags(seoTags)}</Head>
            <TicketListContainer />
        </>
    )
}

TicketListPage.getLayout = (page) => {
    return (
        <AppLayout>
            {page}
        </AppLayout>
    )
}

export default TicketListPage
