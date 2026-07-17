import { defaultQueryOption, getApiUrl } from "@api/baseApi";
import { AppPropsWithLayout } from "@interfaces/common";
import Head from "next/head";
import { useState, useEffect } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { Hydrate, QueryClient, QueryClientProvider, QueryErrorResetBoundary } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import '@utils/i18n';
import { useTranslation } from "react-i18next";
import { CacheProvider, EmotionCache } from "@emotion/react";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import theme from "@theme/theme";
import createEmotionCache from "@theme/createEmotionCache";
import "@styles/global.css"
import io from 'socket.io-client';

import ChatBot from '@components/ChatBot';

const clientSideEmotionCache = createEmotionCache();

export interface MyAppProps extends AppPropsWithLayout {
    emotionCache?: EmotionCache;
}

export default function App({ Component, pageProps, emotionCache = clientSideEmotionCache }: MyAppProps) {
    const { t } = useTranslation();
    const getLayout = Component.getLayout ?? ((page) => page);
    const [queryClient] = useState(() => new QueryClient(defaultQueryOption))

    useEffect(() => {
        // Connect to the backend socket server using unified dynamic API URL resolution
        const apiUrl = getApiUrl();

        let socketUrl = 'http://localhost:3001';
        try {
            // Securely extract only the protocol + host origin (stripping sub-paths like /api)
            const urlObj = new URL(apiUrl);
            socketUrl = urlObj.origin;
        } catch (e) {
            socketUrl = apiUrl;
        }

        const socket = io(socketUrl);

        socket.on('connect', () => {
            socket.emit('visitor_connected');
        });

        return () => {
            socket.disconnect();
        };
    }, []);

    return (
        <CacheProvider value={emotionCache}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <LocalizationProvider dateAdapter={AdapterMoment}>
                    <Head>
                        <title>{t('meta.title')}</title>
                        <meta name="viewport" content="initial-scale=1, width=device-width" />
                    </Head>
                    <QueryClientProvider client={queryClient}>
                        <Hydrate state={pageProps.dehydratedState}>
                            <QueryErrorResetBoundary>
                                {({ reset }) => (
                                    <ErrorBoundary
                                        fallbackRender={({ error, resetErrorBoundary }) => (
                                            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "100vh", p: 5, textAlign: "center", gap: 2 }}>
                                                <Typography variant="h4" color="error" sx={{ fontWeight: 700 }}>Something went wrong</Typography>
                                                <Typography color="text.secondary">{error.message}</Typography>
                                                <Button variant="contained" onClick={resetErrorBoundary}>Try again</Button>
                                            </Box>
                                        )}
                                        onReset={reset}
                                    >
                                        <ReactQueryDevtools initialIsOpen={false} />
                                        {getLayout(<Component {...pageProps}/>)}
                                        <ChatBot />
                                    </ErrorBoundary>
                                )}
                            </QueryErrorResetBoundary>
                        </Hydrate>
                    </QueryClientProvider>
                </LocalizationProvider>
            </ThemeProvider>
        </CacheProvider>
    );
}
