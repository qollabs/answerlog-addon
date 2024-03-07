import { asyncStateReducer } from '@Functions/asyncStateReducer';
import { mobileDetector } from '@Functions/browserDetector';
import { useLocalstorage } from '@Hooks/useLocalStorage';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useCallback, useReducer, useState } from 'react';

// 제작중

interface UseFlutterReturnProps {
    getFcmToken: (accessToken: string) => void;
    getAccessToken: () => void;
    grantCameraPermission: () => Promise<boolean>;
    grantMicPermission: () => Promise<boolean>;
    openExternalBrowser: (url: string) => void;
    activatePhoneCall: (phoneNumber: string) => void;
    loadingFlutter: boolean;
    errorFlutter: boolean;
}

export const useFlutter = (dependencies: any[] = []): UseFlutterReturnProps => {
    const router = useRouter();
    const [accessToken, setAccessToken, removeAccessToken] =
        useLocalstorage('accessToken');

    const [{ loading, error }, dispatch] = useReducer(asyncStateReducer, {
        loading: true,
        error: false,
    });

    const [isCameraAlreadyPermitted, setIsCameraAlreadyPermitted] =
        useState(false);
    const [isMicAlreadyPermitted, setIsMicAlreadyPermitted] = useState(false);

    const getFcmToken = useCallback(async (accessToken: string) => {
        if (!window?.flutter_inappwebview) return;
        dispatch({ type: 'LOADING' });
        const resGetFcm = await window.flutter_inappwebview.callHandler(
            'callFlutter',
            {
                code: 'init',
                value: { accessToken },
            },
        );
        if (
            resGetFcm === '' ||
            resGetFcm === null ||
            resGetFcm === undefined ||
            (resGetFcm !== null &&
                typeof resGetFcm === 'object' &&
                !Object.keys(resGetFcm).length)
        ) {
        } else {
            const parsedResult = JSON.parse(resGetFcm);
            const { code, os, fcmToken } = parsedResult;
            const resPush = await axios.post(
                '/api/user/push',
                {
                    os: os,
                    fcm_token: fcmToken,
                },
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                },
            );
        }
        dispatch({ type: 'SUCCESS' });
    }, dependencies);

    const getAccessToken = useCallback(() => {
        if (!window?.flutter_inappwebview) return;
        dispatch({ type: 'LOADING' });
        window.flutter_inappwebview
            .callHandler('callFlutter', {
                code: 'accessToken',
                value: '',
            })
            .then(function (result: any) {
                if (
                    result === '' ||
                    result === null ||
                    result === undefined ||
                    (result !== null &&
                        typeof result === 'object' &&
                        !Object.keys(result).length)
                ) {
                } else {
                    const parsedResult = JSON.parse(result);
                    const { accessToken: accessTokenFromFlutter } =
                        parsedResult;
                    if (accessTokenFromFlutter) {
                        setAccessToken(accessTokenFromFlutter);
                    } else {
                    }
                }
                dispatch({ type: 'SUCCESS' });
            })
            .catch((error: any) => {
                dispatch({ type: 'ERROR', error });
                router.reload();
            });
    }, dependencies);

    // for android only
    const grantCameraPermission = useCallback(async (): Promise<boolean> => {
        let isPermitted: boolean = false;
        if (
            isCameraAlreadyPermitted ||
            mobileDetector() !== 'android' ||
            !window?.flutter_inappwebview
        ) {
            isPermitted = true;
        } else {
            dispatch({ type: 'LOADING' });
            const resPermit = await window.flutter_inappwebview.callHandler(
                'callFlutter',
                {
                    code: 'permission',
                    value: { permission: 'camera' },
                },
            );
            if (
                resPermit === '' ||
                resPermit === null ||
                resPermit === undefined ||
                (resPermit !== null &&
                    typeof resPermit === 'object' &&
                    !Object.keys(resPermit).length)
            ) {
            } else {
                const parsedResult = JSON.parse(resPermit);
                const { code, permissionStatus } = parsedResult;
                if (permissionStatus === 'granted') {
                    isPermitted = true;
                    setIsCameraAlreadyPermitted(true);
                }
            }
            dispatch({ type: 'SUCCESS' });
        }
        return isPermitted;
    }, dependencies);

    const grantMicPermission = useCallback(async (): Promise<boolean> => {
        let isPermitted: boolean = false;
        if (
            isMicAlreadyPermitted ||
            mobileDetector() === 'other' ||
            !window?.flutter_inappwebview
        ) {
            isPermitted = true;
        } else {
            dispatch({ type: 'LOADING' });
            const resPermit = await window.flutter_inappwebview.callHandler(
                'callFlutter',
                {
                    code: 'permission',
                    value: { permission: 'microphone' },
                },
            );
            if (
                resPermit === '' ||
                resPermit === null ||
                resPermit === undefined ||
                (resPermit !== null &&
                    typeof resPermit === 'object' &&
                    !Object.keys(resPermit).length)
            ) {
            } else {
                const parsedResult = JSON.parse(resPermit);
                const { code, permissionStatus } = parsedResult;

                if (permissionStatus === 'granted') {
                    isPermitted = true;
                    setIsMicAlreadyPermitted(true);
                }
            }
            dispatch({ type: 'SUCCESS' });
        }
        return isPermitted;
    }, dependencies);

    const openExternalBrowser = useCallback(async (url: string) => {
        if (!window?.flutter_inappwebview) return false;
        dispatch({ type: 'LOADING' });
        const resOpen = await window.flutter_inappwebview.callHandler(
            'callFlutter',
            {
                code: 'externalBrowser',
                value: { url },
            },
        );
        if (
            resOpen === '' ||
            resOpen === null ||
            resOpen === undefined ||
            (resOpen !== null &&
                typeof resOpen === 'object' &&
                !Object.keys(resOpen).length)
        ) {
            window.location.href = url;
        }
        dispatch({ type: 'SUCCESS' });
    }, dependencies);

    const activatePhoneCall = useCallback(async (phoneNumber: string) => {
        if (!window?.flutter_inappwebview) return false;
        dispatch({ type: 'LOADING' });
        const resOpen = await window.flutter_inappwebview.callHandler(
            'callFlutter',
            {
                code: 'externalBrowser',
                value: { url: `tel:${phoneNumber}` },
            },
        );
        if (
            resOpen === '' ||
            resOpen === null ||
            resOpen === undefined ||
            (resOpen !== null &&
                typeof resOpen === 'object' &&
                !Object.keys(resOpen).length)
        ) {
            alert('phone call error');
        }
        dispatch({ type: 'SUCCESS' });
    }, dependencies);

    return {
        getFcmToken,
        getAccessToken,
        grantCameraPermission,
        grantMicPermission,
        openExternalBrowser,
        activatePhoneCall,
        loadingFlutter: loading,
        errorFlutter: error,
    };

    // access token 없을 때 가져오기
};
