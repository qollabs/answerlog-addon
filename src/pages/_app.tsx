import '../styles/globals.css';
import Head from 'next/head';
import type { AppProps } from 'next/app';
import { AppContainer } from '@Styles/App.styled';
import { createContext } from 'react';

interface AppContextProp {}

export const AppContext = createContext<AppContextProp>({});

const MyApp = ({ Component, pageProps }: AppProps) => {
    return (
        <AppContainer>
            <Head>
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0 user-scalable=no"
                />
            </Head>
            {/* <Script
                strategy="afterInteractive"
                src={`https://www.googletagmanager.com/gtag/js?id=${ga.GA_TRACKING_ID}`}
            />
            <Script
                id="gtag-init"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                    __html: `
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', '${ga.GA_TRACKING_ID}', {
                    page_path: window.location.pathname,
                    });
                `,
                }}
            /> */}
            <AppContext.Provider value={{}}>
                <Component {...pageProps} />
            </AppContext.Provider>
        </AppContainer>
    );
};

export default MyApp;
