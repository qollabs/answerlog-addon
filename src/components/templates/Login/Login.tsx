import { useEffect, useReducer, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import axios from 'axios';

import AnswerlogLogo from '@Images/answerlog_logo_white.svg';
import AppleLogo from '@Images/apple_logo.png';
import KakaoLogo from '@Images/kakao_logo.png';
import {
    LoginButton,
    LoginContainer,
    LoginDivider,
    LoginInnerBox,
    LoginLogoBox,
} from './Login.styled';
import { Divider } from '@Atoms/Divider';
import { Text } from '@Atoms/Typography';
import { MorphBackground } from './Morph';
import { Fade } from '@Organisms/Fade';
import { Button } from '@Atoms/Button';
import { useKakaoLogin } from '@Hooks/useKakaoLogin';
import { useAppleLogin } from '@Hooks/useAppleLogin';
import { useAsyncEffect } from '@Hooks/useAsyncEffect';
import { useSessionstorage } from '@Hooks/useSessionStorage';
import { Gap } from '@Styles/App.styled';
import { BaseModal } from '@Molecules/BaseModal';
import { RowContainer } from '@Atoms/RowContainer';
import { Container } from '@Atoms/Container';
import { useLocalstorage } from '@Hooks/useLocalStorage';
import { CountryCodeType } from '@Types/types';
import * as ga from '../../../lib/ga/gtag';
import { useFlutter } from '@Hooks/useFlutter';
import { asyncStateReducer } from '@Functions/asyncStateReducer';
import ExclamationImage from '@Images/exclamation_mandarin.png';
import { mobileDetector } from '@Functions/browserDetector';
import { qollabs } from '@Constants/globalConstants';

export const Login = () => {
    const { getFcmToken, openExternalBrowser } = useFlutter();
    const router = useRouter();
    const { phone } = router.query;

    const kakaoLogin = useKakaoLogin();
    const appleLogin = useAppleLogin();
    const [accessToken, setAccessToken, removeAccessToken] =
        useLocalstorage<string>('accessToken');
    const [refreshToken, setRefreshToken, removeRefreshToken] =
        useLocalstorage<string>('refreshToken');
    const [
        appleIdBeforeLogin,
        setAppleIdBeforeLogin,
        removeAppleIdBeforeLogin,
    ] = useSessionstorage<string>('appleIdBeforeLogin');

    const [showAppLinkModal, setShowAppLinkModal] = useState<boolean>(false);
    const [deviceOS, setDeviceOS] = useState<string>();
    const [showLoginOnProcessModal, setShowLoginOnProcessModal] =
        useState(false);

    const [{ loading: oauthLoading, error: oauthError }, dispatch] = useReducer(
        asyncStateReducer,
        {
            loading: false,
            error: false,
        },
    );

    // useEffect(() => {
    //     if (!phone) return;
    //     if (/android/i.test(navigator.userAgent)) {
    //         setDeviceOS('android');
    //         setShowAppLinkModal(true);
    //     } else if (/iphone|ipod|ipad/i.test(navigator.userAgent)) {
    //         setDeviceOS('ios');
    //         setShowAppLinkModal(true);
    //     }
    // }, [phone]);

    useEffect(() => {
        if (!phone) return;
        if (mobileDetector() === 'android') {
            setDeviceOS('android');
            setShowAppLinkModal(true);
        } else if (mobileDetector() === 'ios') {
            setDeviceOS('ios');
            setShowAppLinkModal(true);
        }
    }, [phone]);

    useAsyncEffect(async () => {
        // oauth auto login
        const param = window.location.href;
        if (param && param.includes('code')) {
            dispatch({ type: 'LOADING' });
            const code = param.split('code=')[1].split('&id_token=')[0];
            const type = param.includes('&id_token=') ? 'apple' : 'kakao';
            const redirectURI = param.includes('&id_token=')
                ? process.env.NEXT_PUBLIC_APPLE_REDIRECT_URI
                : process.env.NEXT_PUBLIC_KAKAO_REDIRECT_LOGIN;
            try {
                const resExternalLogin = await axios.post(
                    '/api/auth/external_login',
                    {
                        type,
                        redirect_uri: redirectURI,
                        code,
                    },
                );
                if (type === 'kakao') {
                    setAccessToken(resExternalLogin.data.access_token);
                    setRefreshToken(resExternalLogin.data.refresh_token);
                    // flutter
                    getFcmToken(resExternalLogin.data.access_token);
                } else {
                    // 애플아이디로 로그인할 때, 자꾸 오류가 나서 애플 정보를 받기만 하고 데이터에 넣지 않았다. 그냥 전화번호 로그인이랑 똑같음
                    // 나중에 넣어야 함
                    // 예를 들어, 저장되어있는 user중에 애플 아이디가 있다면 그 정보를 그대로 가져오면서 accessToken 등을 준다.
                    // 그래서 accessToken이 있다면 이미 예전에 전화번호를 등록하여 생성된 유저임. 그렇기 때문에 바로 토큰을 처리하고 홈으로 옮김. 그렇지 않다면 appleIdBeforeLogin을 저장한채로 register로 이동
                    // 만약 해당 appleId를 가진 user가 복수 명일 경우, appleIdBeforeLogin을 넣고 register로 옮김
                    // setAppleIdBeforeLogin(resExternalLogin.data.apple_id);
                }

                if (type === 'apple') {
                    router.push('/register');
                } else {
                    window.location.href = '/';
                }
                dispatch({ type: 'SUCCESS' });
            } catch (e) {
                console.log('Oauth error', e);
                dispatch({ type: 'ERROR', error: true });
            }
        }
    }, []);

    const goLogin = () => {
        ga.event({
            action: 'login',
            params: {
                method: 'phone number',
            },
        });
        removeAppleIdBeforeLogin();
        router.push('/register');
    };

    const goKakaoLogin = () => {
        ga.event({
            action: 'login',
            params: {
                method: 'kakao',
            },
        });
        removeAccessToken();
        removeRefreshToken();
        kakaoLogin();
    };

    const goAppleLogin = () => {
        ga.event({
            action: 'login',
            params: {
                method: 'apple',
            },
        });
        removeAccessToken();
        removeRefreshToken();
        appleLogin();
    };

    return (
        <LoginContainer>
            <LoginLogoBox>
                <Fade direction="" delay={0.2}>
                    <MorphBackground />
                </Fade>
                <Fade direction="" delay={0.7}>
                    <AnswerlogLogo width="164" heigth="24" />
                </Fade>
            </LoginLogoBox>
            <Fade direction="" delay={0.2}>
                <LoginInnerBox>
                    <LoginButton onClickButton={() => goKakaoLogin()}>
                        <Image
                            src={KakaoLogo}
                            alt="kakao logo"
                            width={20}
                            height={20}
                        />
                        &nbsp;&nbsp;카카오 계정으로 시작하기
                    </LoginButton>
                    <Gap height="8px" />
                    <LoginButton onClickButton={() => goAppleLogin()}>
                        <Image
                            src={AppleLogo}
                            alt="apple logo"
                            width={14}
                            height={16}
                        />
                        &nbsp;&nbsp;애플 계정으로 시작하기
                    </LoginButton>
                    <LoginDivider>
                        <Divider />
                        <Text size="c1" color="gray3">
                            &nbsp;&nbsp;&nbsp;&nbsp;또는&nbsp;&nbsp;&nbsp;&nbsp;
                        </Text>
                        <Divider />
                    </LoginDivider>
                    <Button onClickButton={() => goLogin()}>
                        전화번호로 시작하기
                    </Button>

                    <Gap height="16px" />
                    <Text size="c1" color="gray4">
                        {`상호명 : ${qollabs.title} | 대표자명 : ${qollabs.ceo} |
                        사업자등록번호 : ${qollabs.companyRegistrationNumber} | 주소 : ${qollabs.address} | 유선번호 : ${qollabs.phoneNumber} |
                        통신판매업 신고번호 : ${qollabs.mailOrderBusinessReportNumber}`}
                    </Text>
                </LoginInnerBox>
            </Fade>
            <BaseModal show={oauthLoading}>
                <Text>로그인 중이에요</Text>
                <Gap height="16px" />
                <Text>잠시만 기다려주세요</Text>
            </BaseModal>
            <BaseModal
                show={oauthError}
                customImage={ExclamationImage}
                buttonText="다시 해보기"
                onClickButton={() => router.reload()}
                button2Text="문의하기"
                button2Color="gray"
                onClickButton2={() =>
                    openExternalBrowser('https://pf.kakao.com/_nxeBrxj/chat')
                }
            >
                <Text textAlign="center">로그인 도중 문제가 발생하였어요</Text>
                <Gap height="16px" />
                <Text>잠시 후 다시 시도해주세요</Text>
            </BaseModal>
            <BaseModal
                show={showAppLinkModal}
                onClose={() => setShowAppLinkModal(false)}
            >
                <Container>
                    <Text>앱으로 실행하시겠습니까?</Text>
                    <Gap height="16px" />
                    <Text size="c1" textAlign="center">
                        앱이 설치되어 있지 않다면 앱 설치 화면으로 이동합니다.
                    </Text>
                    <Gap height="16px" />
                    <RowContainer>
                        <Button
                            height="40px"
                            color="gray"
                            onClickButton={() => setShowAppLinkModal(false)}
                        >
                            취소
                        </Button>
                        <Gap width="16px" />
                        {deviceOS === 'android' && (
                            <a
                                className="applink"
                                href="intent://main/#Intent;scheme=answerlog;end"
                                style={{ width: '100%' }}
                            >
                                <Button
                                    height="40px"
                                    onClickButton={() => {
                                        setTimeout(() => {
                                            window.location.href =
                                                'https://play.google.com/store/apps/details?id=com.sabuzak_m&hl=ko';
                                        }, 1500);
                                    }}
                                >
                                    확인
                                </Button>
                            </a>
                        )}
                        {deviceOS === 'ios' && (
                            <Button
                                height="40px"
                                onClickButton={() => {
                                    window.location.href = 'answerlog://';
                                    setTimeout(() => {
                                        window.location.href =
                                            'https://apps.apple.com/us/app/%EC%95%A4%EC%84%9C%EB%A1%9D-%EA%B0%80%EC%A1%B1%EB%AC%B8%EB%8B%B5-%EB%B0%8F-%EB%94%94%EC%A7%80%ED%84%B8-%EC%BB%A8%ED%85%90%EC%B8%A0-%ED%81%90%EB%A0%88%EC%9D%B4%EC%85%98-%EC%95%B1/id6448796716';
                                    }, 1500);
                                }}
                            >
                                확인
                            </Button>
                        )}
                    </RowContainer>
                </Container>
            </BaseModal>
        </LoginContainer>
    );
};
