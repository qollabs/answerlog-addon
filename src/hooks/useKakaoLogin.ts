import { useCallback, useEffect } from 'react';

const KAKAO_SDK = 'https://developers.kakao.com/sdk/js/kakao.js';

export const useKakaoLogin = () => {
    const handleSuccess = useCallback(() => {
        window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_KEY);
    }, []);

    useEffect(() => {
        const script = document.createElement('script');

        script.src = KAKAO_SDK;
        script.onload = () => handleSuccess();

        document.body.appendChild(script);

        return () => script.remove();
    }, []);

    return useCallback(() => {
        window.Kakao.Auth.authorize({
            redirectUri: process.env.NEXT_PUBLIC_KAKAO_REDIRECT_LOGIN,
        });
    }, []);
};
