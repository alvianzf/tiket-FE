import { useMemo } from "react";

interface Props {
    title: string;
    description?: string;
    keywords?: string;
    ogTitle?: string;
    ogDescription?: string;
    ogImage?: string;
    ogUrl?: string;
    canonical?: string;
    noIndex?: boolean;
}

export interface MetaTag {
    name?: string;
    property?: string;
    content?: string;
    rel?: string;
    href?: string;
}

export interface ReturnProps {
    title: string;
    metaTags: Array<MetaTag>;
    canonical?: string;
}

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://tiketq.com';
const DEFAULT_OG_IMAGE = `${SITE_URL}/images/og-default.png`;
const SITE_NAME = 'TiketQ';

const useMetaTags = ({
    title,
    description = 'TiketQ — pesan tiket pesawat, feri, dan sewa mobil di Batam dengan mudah, cepat, dan aman.',
    keywords = 'tiket pesawat batam, feri batam, sewa mobil batam, tiketq, pesan tiket online',
    ogTitle,
    ogDescription,
    ogImage,
    ogUrl,
    canonical,
    noIndex = false,
}: Props): ReturnProps => {
    return useMemo(() => {
        const pageTitle = `${title} | ${SITE_NAME}`;
        const resolvedOgTitle = ogTitle ?? pageTitle;
        const resolvedOgDesc = ogDescription ?? description;
        const resolvedOgImage = ogImage ?? DEFAULT_OG_IMAGE;
        const resolvedOgUrl = ogUrl ?? (typeof window !== 'undefined' ? window.location.href : SITE_URL);
        const resolvedCanonical = canonical ?? resolvedOgUrl;

        return {
            title: pageTitle,
            canonical: resolvedCanonical,
            metaTags: [
                // Standard
                { name: 'title', content: pageTitle },
                { name: 'description', content: description },
                { name: 'keywords', content: keywords },
                { name: 'author', content: SITE_NAME },
                { name: 'viewport', content: 'width=device-width, initial-scale=1' },
                ...(noIndex ? [{ name: 'robots', content: 'noindex, nofollow' }] : [{ name: 'robots', content: 'index, follow' }]),

                // Open Graph
                { property: 'og:type', content: 'website' },
                { property: 'og:site_name', content: SITE_NAME },
                { property: 'og:title', content: resolvedOgTitle },
                { property: 'og:description', content: resolvedOgDesc },
                { property: 'og:image', content: resolvedOgImage },
                { property: 'og:url', content: resolvedOgUrl },
                { property: 'og:locale', content: 'id_ID' },
                { property: 'og:locale:alternate', content: 'en_US' },

                // Twitter Card
                { name: 'twitter:card', content: 'summary_large_image' },
                { name: 'twitter:title', content: resolvedOgTitle },
                { name: 'twitter:description', content: resolvedOgDesc },
                { name: 'twitter:image', content: resolvedOgImage },

                // Geo
                { name: 'geo.region', content: 'ID-RI' },
                { name: 'geo.placename', content: 'Batam, Riau Islands, Indonesia' },
                { name: 'geo.position', content: '1.1301;104.0529' },
                { name: 'ICBM', content: '1.1301, 104.0529' },
            ].filter(Boolean),
        };
    }, [title, description, keywords, ogTitle, ogDescription, ogImage, ogUrl, canonical, noIndex]);
};

export default useMetaTags;
