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
import { I18nProvider } from "@react-aria/i18n";
import "@styles/global.css"

export default function App({ Component, pageProps }: AppPropsWithLayout) {
    const { t, i18n } = useTranslation();
    const getLayout = Component.getLayout ?? ((page) => page);
    const [queryClient] = useState(() => new QueryClient(defaultQueryOption))

    // Match NextUI DatePicker locale to i18n language
    const locale = i18n.language === 'en' ? 'en-GB' : 'id-ID';

    return (
        <I18nProvider locale={locale}>
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
                                        <div className="flex flex-col items-center justify-center min-h-screen p-10 text-center gap-4">
                                            <h1 className="text-2xl font-bold text-red-600">Something went wrong</h1>
                                            <p className="text-slate-600">{error.message}</p>
                                            <button 
                                                className="px-6 py-2 bg-primary text-white rounded-lg"
                                                onClick={resetErrorBoundary}
                                            >
                                                Try again
                                            </button>
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
        </I18nProvider>
    );
}
