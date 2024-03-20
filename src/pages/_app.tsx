import '../styles/globals.css';
import Head from 'next/head';
import type { AppProps } from 'next/app';
import { AppContainer } from '@Styles/App.styled';
import { createContext, useEffect, useState } from 'react';
import Script from 'next/script';
import * as ga from '../lib/ga/gtag';
import { TextSizePreferenceType } from '@Styles/fonts';

interface AppContextProp {
    textSizePref: TextSizePreferenceType;
    setTextSizePref: (textSizePref: TextSizePreferenceType) => void;
    isInputFocused: boolean;
    setIsInputFocused: (isInputFocused: boolean) => void;
}

export const AppContext = createContext<AppContextProp>({
    textSizePref: 'v1',
    setTextSizePref: (textSizePref: TextSizePreferenceType) => {},
    isInputFocused: false,
    setIsInputFocused: (isInputFocused: boolean) => {},
});

const MyApp = ({ Component, pageProps }: AppProps) => {
    const [textSizePref, setTextSizePref] =
        useState<TextSizePreferenceType>('v1');
    const [isInputFocused, setIsInputFocused] = useState(false);

    // attatch eventListener about input
    useEffect(() => {
        document.addEventListener('click', checkIsInputFocused);

        return () => {
            document.removeEventListener('click', checkIsInputFocused);
        };
    }, []);

    const checkIsInputFocused = (e: any) => {
        // textarea 이거나
        // input 중에서 type === text이거나
        // .radio-editable || .chat-input 이거나
        setTimeout(() => {
            const elementName = e.target.nodeName.toLowerCase();
            const elementType = e.target.type?.toLowerCase();
            if (elementName === 'textarea') {
                setIsInputFocused(true);
            } else if (
                elementName === 'input' &&
                (elementType === 'text' ||
                    elementType === 'number' ||
                    elementType === 'password')
            ) {
                setIsInputFocused(true);
            } else if (
                e.target.matches('.radio-editable') ||
                e.target.matches('.chat-input')
            ) {
                setIsInputFocused(true);
            } else {
                setIsInputFocused(false);
            }
        }, 100);
    };
    return (
        <AppContainer>
            <Head>
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0 user-scalable=no"
                />
            </Head>
            <Script
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
            />
            <AppContext.Provider
                value={{
                    textSizePref,
                    setTextSizePref,
                    isInputFocused,
                    setIsInputFocused,
                }}
            >
                <Component {...pageProps} />
            </AppContext.Provider>
        </AppContainer>
    );
};

export default MyApp;
