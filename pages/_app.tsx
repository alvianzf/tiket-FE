import { defaultQueryOption } from "@api/baseApi";
import { AppPropsWithLayout } from "@interfaces/common";
import Head from "next/head";
import { useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { Hydrate, QueryClient, QueryClientProvider, QueryErrorResetBoundary } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import '@utils/i18n';
import { useTranslation } from "react-i18next";
import { NextUIProvider } from "@nextui-org/react";
import "@styles/global.css"

export default function App({ Component, pageProps }: AppPropsWithLayout) {
    const { t } = useTranslation();
    const getLayout = Component.getLayout ?? ((page) => page);
    const [queryClient] = useState(() => new QueryClient(defaultQueryOption))

    return (
        <NextUIProvider>
            <Head>
                <title>{t('meta.title')}</title>
            </Head>
            <QueryClientProvider client={queryClient}>
                <Hydrate state={pageProps.dehydratedState}>
                    <QueryErrorResetBoundary>
                        {({ reset }) => (
                            <ErrorBoundary
                                fallbackRender={({ error, resetErrorBoundary }) => (
                                    <div>
                                        {error}
                                        {resetErrorBoundary}
                                    </div>
                                )}
                                onReset={reset}
                            >
                                <ReactQueryDevtools initialIsOpen={false} />
                                {getLayout(<Component {...pageProps}/>)}
                            </ErrorBoundary>
                        )}
                    </QueryErrorResetBoundary>
                </Hydrate>
            </QueryClientProvider>
        </NextUIProvider>
    );
}
