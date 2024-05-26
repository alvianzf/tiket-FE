import { useMetaTags } from "@hooks/common";
import { NextPageWithLayout } from "@interfaces/common";
import { buildSeoTags } from "@utils/common";
import Head from "next/head";
import { AppLayout } from "@layouts";

const HomePage: NextPageWithLayout = () => {
    const seoTags = useMetaTags({ title: 'HomePage'})

    return (
        <>
            <Head>{buildSeoTags(seoTags)}</Head>
        </>
    )
}

HomePage.getLayout = (page) => {
    return (
        <AppLayout>
            {page}
        </AppLayout>
    )
}

export default HomePage
