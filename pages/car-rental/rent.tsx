import { useMetaTags } from "@hooks/common";
import { NextPageWithLayout } from "@interfaces/common";
import { buildSeoTags } from "@utils/common";
import Head from "next/head";
import { AppLayout } from "@layouts";
import CarRentalFormContainer from "@containers/CarRentalFormContainer";

const CarRentalRentPage: NextPageWithLayout = () => {
    const seoTags = useMetaTags({ title: 'Rental Request – TiketQ' });

    return (
        <>
            <Head>{buildSeoTags(seoTags)}</Head>
            <CarRentalFormContainer />
        </>
    );
};

CarRentalRentPage.getLayout = (page) => (
    <AppLayout>{page}</AppLayout>
);

export default CarRentalRentPage;
