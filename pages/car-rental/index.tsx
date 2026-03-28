import { useMetaTags } from "@hooks/common";
import { NextPageWithLayout } from "@interfaces/common";
import { buildSeoTags } from "@utils/common";
import Head from "next/head";
import { AppLayout } from "@layouts";
import CarRentContainer from "@containers/CarRentContainer";

const CarRentalPage: NextPageWithLayout = () => {
    const seoTags = useMetaTags({
        title: 'Sewa Mobil di Batam – Harga Terbaik dengan Driver',
        description: 'Sewa mobil di Batam dengan driver, BBM, dan asuransi. Armada bersih kondisi top, siap antar jemput seluruh Batam. Pesan sekarang di TiketQ.',
        keywords: 'sewa mobil batam, rental mobil batam, sewa mobil batam dengan driver, rental mobil batam murah, tiketq sewa mobil',
        ogTitle: 'Sewa Mobil Batam – TiketQ',
        ogDescription: 'Armada lengkap dari City Car hingga Minibus. Semua kondisi top, dengan driver dan BBM. Siap antar jemput seluruh Batam.',
        canonical: 'https://tiketq.com/car-rental',
    });

    return (
        <>
            <Head>{buildSeoTags(seoTags)}</Head>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "LocalBusiness",
                        "name": "TiketQ Sewa Mobil Batam",
                        "description": "Jasa sewa mobil di Batam dengan driver dan BBM. Armada lengkap, kondisi top.",
                        "url": "https://tiketq.com/car-rental",
                        "telephone": "+62-778-000-0000",
                        "address": {
                            "@type": "PostalAddress",
                            "addressLocality": "Batam",
                            "addressRegion": "Kepulauan Riau",
                            "addressCountry": "ID"
                        },
                        "geo": {
                            "@type": "GeoCoordinates",
                            "latitude": "1.1301",
                            "longitude": "104.0529"
                        },
                        "areaServed": {
                            "@type": "City",
                            "name": "Batam"
                        },
                        "priceRange": "Rp350.000 – Rp1.200.000 / day",
                        "openingHours": "Mo-Su 00:00-23:59",
                        "hasOfferCatalog": {
                            "@type": "OfferCatalog",
                            "name": "Armada Kendaraan",
                            "itemListElement": [
                                { "@type": "Offer", "itemOffered": { "@type": "Product", "name": "City Car" } },
                                { "@type": "Offer", "itemOffered": { "@type": "Product", "name": "Sedan" } },
                                { "@type": "Offer", "itemOffered": { "@type": "Product", "name": "SUV" } },
                                { "@type": "Offer", "itemOffered": { "@type": "Product", "name": "MPV" } },
                                { "@type": "Offer", "itemOffered": { "@type": "Product", "name": "Minibus" } },
                                { "@type": "Offer", "itemOffered": { "@type": "Product", "name": "Van" } }
                            ]
                        }
                    })
                }}
            />
            <CarRentContainer />
        </>
    );
};

CarRentalPage.getLayout = (page) => <AppLayout>{page}</AppLayout>;

export default CarRentalPage;
