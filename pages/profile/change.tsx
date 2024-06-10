import { useMetaTags } from "@hooks/common";
import { NextPageWithLayout } from "@interfaces/common";
import { buildSeoTags } from "@utils/common";
import Head from "next/head";
import { AppLayout } from "@layouts";
import { useTranslation } from "react-i18next";
import ChangeProfileContainer from "@containers/ChangeProfileContainer";

const ChangeProfilePage: NextPageWithLayout = () => {
    const { t } = useTranslation();
    const seoTags = useMetaTags({ title: t('meta.change_profile') })

    return (
        <>
            <Head>{buildSeoTags(seoTags)}</Head>
            <ChangeProfileContainer />
        </>
    )
}

ChangeProfilePage.getLayout = (page) => {
    return (
        <AppLayout>
            {page}
        </AppLayout>
    )
}

export default ChangeProfilePage
