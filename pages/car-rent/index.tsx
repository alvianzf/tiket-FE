import { useMetaTags } from "@hooks/common";
import { NextPageWithLayout } from "@interfaces/common";
import { buildSeoTags } from "@utils/common";
import Head from "next/head";
import { AppLayout } from "@layouts";
import CarRentContainer from "@containers/CarRentContainer";

const CarRentPage: NextPageWithLayout = () => {
    const seoTags = useMetaTags({ title: 'Rental Mobil'})

    return (
        <>
            <Head>{buildSeoTags(seoTags)}</Head>
            <CarRentContainer />
        </>
    )
}

CarRentPage.getLayout = (page) => {
    return (
        <AppLayout>
            {page}
        </AppLayout>
    )
}

export default CarRentPage
