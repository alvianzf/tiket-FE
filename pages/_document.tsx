import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;700;800;900&family=JetBrains+Mono:wght@400;600&display=swap" rel="stylesheet" />
        {/* Favicon */}
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="shortcut icon" href="/favicon.svg" />
        <link rel="apple-touch-icon" href="/brand.svg" />
        <meta name="theme-color" content="#ff5a00" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
