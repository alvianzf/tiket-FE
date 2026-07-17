import { Html, Head, Main, NextScript, DocumentContext, DocumentInitialProps } from "next/document";
import Document from "next/document";
import createEmotionServer from "@emotion/server/create-instance";
import createEmotionCache from "@theme/createEmotionCache";
import { AppType } from "next/app";
import { MyAppProps } from "./_app";

interface MyDocumentProps extends DocumentInitialProps {
  emotionStyleTags: React.JSX.Element[];
}

export default function MyDocument({ emotionStyleTags }: MyDocumentProps) {
  return (
    <Html lang="en">
      <Head>
        <meta name="emotion-insertion-point" content="" />
        {emotionStyleTags}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;700;800;900&family=JetBrains+Mono:wght@400;600&display=swap" rel="stylesheet" />
        {/* Favicon */}
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="shortcut icon" href="/favicon.svg" />
        <link rel="apple-touch-icon" href="/brand.svg" />
        <meta name="theme-color" content="#ff5a00" />
        {/* PWA */}
        <link rel="manifest" href="/manifest.json" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="TiketQ" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

// SSR emotion extraction so MUI styles are present on first paint (no FOUC).
MyDocument.getInitialProps = async (ctx: DocumentContext) => {
  const originalRenderPage = ctx.renderPage;
  const cache = createEmotionCache();
  const { extractCriticalToChunks } = createEmotionServer(cache);

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: (App: React.ComponentType<React.ComponentProps<AppType> & MyAppProps>) =>
        function EnhanceApp(props) {
          return <App emotionCache={cache} {...props} />;
        },
    });

  const initialProps = await Document.getInitialProps(ctx);
  const emotionStyles = extractCriticalToChunks(initialProps.html);
  const emotionStyleTags = emotionStyles.styles.map((style) => (
    <style
      data-emotion={`${style.key} ${style.ids.join(" ")}`}
      key={style.key}
      dangerouslySetInnerHTML={{ __html: style.css }}
    />
  ));

  return { ...initialProps, emotionStyleTags };
};
