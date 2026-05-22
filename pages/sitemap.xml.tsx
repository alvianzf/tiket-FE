import { GetServerSideProps } from 'next';

const generateSiteMap = () => {
    // You can fetch dynamic routes here if you have them, e.g. from an API
    return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     <url>
       <loc>https://tiketq.com/</loc>
       <changefreq>daily</changefreq>
       <priority>1.0</priority>
     </url>
     <url>
       <loc>https://tiketq.com/ferry</loc>
       <changefreq>daily</changefreq>
       <priority>0.8</priority>
     </url>
     <url>
       <loc>https://tiketq.com/car-rental</loc>
       <changefreq>daily</changefreq>
       <priority>0.8</priority>
     </url>
   </urlset>
 `;
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
    const sitemap = generateSiteMap();

    res.setHeader('Content-Type', 'text/xml');
    res.write(sitemap);
    res.end();

    return {
        props: {},
    };
};

export default function SiteMap() {
    // getServerSideProps will do the heavy lifting
}
