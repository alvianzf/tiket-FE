import { useMetaTags } from "@hooks/common";
import { NextPageWithLayout } from "@interfaces/common";
import { buildSeoTags } from "@utils/common";
import Head from "next/head";
import { AppLayout } from "@layouts";
import CarRentContainer from "@containers/CarRentContainer";

const CarRentalPage: NextPageWithLayout = () => {
    const seoTags = useMetaTags({ title: 'Sewa Mobil – TiketQ' });

    return (
        <>
            <Head>{buildSeoTags(seoTags)}</Head>
            <CarRentContainer />
        </>
    )
}

CarRentalPage.getLayout = (page) => {
    return (
        <AppLayout>
            {page}
        </AppLayout>
    )
}

export default CarRentalPage
