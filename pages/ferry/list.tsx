import { useMetaTags } from "@hooks/common";
import { NextPageWithLayout } from "@interfaces/common";
import { buildSeoTags } from "@utils/common";
import Head from "next/head";
import { AppLayout } from "@layouts";
import FerryListContainer from "@containers/FerryListContainer";
import { ErrorBoundary } from "react-error-boundary";
import ContainerError from "@components/ContainerError";

const ListShipPage: NextPageWithLayout = () => {
    const seoTags = useMetaTags({ title: 'List Ship Page'})

    return (
        <>
            <Head>{buildSeoTags(seoTags)}</Head>
            <ErrorBoundary FallbackComponent={ContainerError}>
                <FerryListContainer />
            </ErrorBoundary>
        </>
    )
}

ListShipPage.getLayout = (page) => {
    return (
        <AppLayout>
            {page}
        </AppLayout>
    )
}

export default ListShipPage
