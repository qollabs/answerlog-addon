import Router from 'next/router';
import { Button } from '@Atoms/Button';
import { Text } from '@Atoms/Typography';
import HeartIcon from '@Images/Heart.svg';
import { MainLayout } from '@Organisms/MainLayout';
import {
    WaitingTextButton,
    WaitingContainer,
    WaitingContentContainer,
    WaitingIconBox,
    WaitingTextContainer,
    WaitingButtonContainer,
} from './Waiting.styled';
import { useEffect, useState } from 'react';
import { useRequest } from '@Hooks/useRequest';
import { Gap } from '@Styles/App.styled';
import { useActionOnTouch } from '@Hooks/useActionOnTouch';
import { useFlutter } from '@Hooks/useFlutter';

export const Waiting = () => {
    const { actionOnTouchEnd } = useActionOnTouch();
    const { openExternalBrowser } = useFlutter();

    const kakaoShare = () => {
        if (!window.Kakao.isInitialized()) {
            window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_KEY);
        }

        window.Kakao.Share.sendDefault({
            objectType: 'feed',
            content: {
                title: '함께 "앤서록" 해요!',
                description:
                    '앤서록 초대가 도착했어요. 메시지를 눌러 초대를 받아주세요.',
                imageUrl:
                    'https://qollabs-answerlog.s3.ap-northeast-2.amazonaws.com/logo.png',
                link: {
                    mobileWebUrl:
                        'https://answerlog.vercel.app/login?phone=kakao-share',
                    webUrl: 'https://answerlog.vercel.app/login?phone=kakao-share',
                    androidExecutionParams:
                        'https://answerlog.vercel.app/login?phone=kakao-share',
                    iosExecutionParams:
                        'https://answerlog.vercel.app/login?phone=kakao-share',
                },
            },
        });
    };

    return (
        <MainLayout
            showLogo
            hideBackButton
            hideBottomNav
            hideActionIcons
            whiteBackground
        >
            <WaitingContainer>
                <WaitingContentContainer>
                    <WaitingIconBox>
                        <HeartIcon />
                    </WaitingIconBox>
                    <WaitingTextContainer>
                        <Text size="h2">
                            상대방이 초대를 수락하면 <br /> 시작할 수 있어요!
                        </Text>
                        <Gap height="16px" />
                        <Text size="b1" color="gray4">
                            상대방의 전화번호로 문자 초대장이 갔어요.
                            <br /> 초대를 받을 수 있도록 알려주세요.
                            <br />
                            <Text size="b2" color="gray2">
                                <br />
                                초대를 보낸 사람에게만 공유해주세요!
                            </Text>
                        </Text>
                        <Gap height="16px" />
                        <WaitingTextButton
                            onClick={kakaoShare}
                            onTouchEnd={(e) => actionOnTouchEnd(e, kakaoShare)}
                        >
                            <Text color="orange2">
                                <span role="img" aria-label="right-point">
                                    👉{' '}
                                </span>
                                카카오톡으로 초대 알리기
                                <span role="img" aria-label="right-point">
                                    {' '}
                                    👈
                                </span>
                            </Text>
                        </WaitingTextButton>
                    </WaitingTextContainer>
                </WaitingContentContainer>
                <WaitingButtonContainer>
                    <Button
                        color="mandarin"
                        onClickButton={() => {
                            window.location.href = '/';
                        }}
                    >
                        서비스로 돌아가기
                    </Button>
                    <Gap height="16px" />
                    <Button onClickButton={() => Router.push('/invite')}>
                        다른 초대 보내기
                    </Button>
                </WaitingButtonContainer>
            </WaitingContainer>
        </MainLayout>
    );
};
