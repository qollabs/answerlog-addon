import { MobileBrowserType, WebBrowserType } from '@Types/types';

export const webDetector = (): WebBrowserType | undefined => {
    if (!window?.navigator?.userAgent) return;
    const agent = window.navigator.userAgent.toLowerCase();
    let browserName: WebBrowserType;
    switch (true) {
        case agent.indexOf('edge') > -1:
            browserName = 'edge';
            break;
        case agent.indexOf('edg/') > -1:
            browserName = 'edge-chromium';
            break;
        case agent.indexOf('opr') > -1:
            browserName = 'opera';
            break;
        case agent.indexOf('chrome') > -1:
            browserName = 'chrome';
            break;
        case agent.indexOf('trident') > -1:
            browserName = 'ie';
            break;
        case agent.indexOf('firefox') > -1:
            browserName = 'firefox';
            break;
        case agent.indexOf('safari') > -1:
            browserName = 'safari';
            break;
        default:
            browserName = 'other';
            break;
    }
    return browserName;
};

export const mobileDetector = (): MobileBrowserType | undefined => {
    if (!window?.navigator?.userAgent) return;
    let browserName: MobileBrowserType;
    switch (true) {
        case /android/i.test(navigator.userAgent):
            browserName = 'android';
            break;
        case /iphone|ipod|ipad/i.test(navigator.userAgent):
            browserName = 'ios';
            break;
        default:
            browserName = 'other';
            break;
    }
    return browserName;
};
