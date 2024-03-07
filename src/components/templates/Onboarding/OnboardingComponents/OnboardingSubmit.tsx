import { useContext, useEffect } from 'react';
import Image from 'next/image';

import OnboardingLoader from '@Images/register_loader.png';
import {
    OnboardingLoadingBottom,
    OnboardingLoadingContainer,
    OnboardingLoadingMid,
    OnboardingLoadingTop,
    OnboardingSubmitContainer,
    OnboardingSubmitTextBox,
} from '../Onboarding.styled';
import { Text } from '@Atoms/Typography';
import {
    ImageType,
    GenderType,
    TextSizePrefBeforeLoginType,
    TextSizePrefType,
} from '@Types/types';
import { useRequest } from '@Hooks/useRequest';
import { useAsyncEffect } from '@Hooks/useAsyncEffect';
import { useSessionstorage } from '@Hooks/useSessionStorage';
import { AppContext } from '@Pages/_app';
import {
    genderCodeReverseTranslator,
    textSizePrefCodeReverseTranslator,
} from '@Functions/codeTranslator';
import { Gap } from '@Styles/App.styled';
import { useImageCompressAndUpload } from '@Hooks/useImageCompressAndUpload';

interface ReqOnboardType {
    font_preference: number;
    name: string;
    gender: number;
    birth_date: string;
    profile_image_url: string | null;
}

interface OnboardingSubmitProp {
    name: string;
    gender: GenderType;
    birth: string;
    profileImage: ImageType | null;
    couponId: string | null;
}

export const OnboardingSubmit = ({
    name,
    gender,
    birth,
    profileImage,
    couponId,
}: OnboardingSubmitProp) => {
    const { request } = useRequest();
    const { compressAndUploadToS3 } = useImageCompressAndUpload();

    const { myDatabaseId } = useContext(AppContext);

    const [textSizePrefBeforeLogin] =
        useSessionstorage<TextSizePrefBeforeLoginType>(
            'textSizePrefBeforeLogin',
        );

    useAsyncEffect(async () => {
        const reqOnboard: ReqOnboardType = {
            font_preference: textSizePrefCodeReverseTranslator(
                textSizePrefBeforeLogin as TextSizePrefType,
            ),
            name: name,
            gender: genderCodeReverseTranslator(gender),
            birth_date: birth,
            profile_image_url:
                profileImage && profileImage.file
                    ? await compressAndUploadToS3(
                          'profile-image',
                          profileImage.file,
                          {
                              maxWidthOrHeight: 200,
                          },
                      )
                    : profileImage
                    ? (profileImage.previewURL as string)
                    : null,
        };

        const resOnboard = await request({
            url: '/api/user/onboard',
            method: 'POST',
            data: reqOnboard,
        });

        if (resOnboard) {
            const resUserInfo = await request({
                url: '/api/user',
                method: 'GET',
            });

            if (resUserInfo) {
                setTimeout(() => {
                    if (couponId) {
                        window.location.href = `/coupon?coupon_id=${couponId}`;
                    } else {
                        window.location.href = '/';
                    }
                    // 온보딩 이후 초대 없이 바로 대랜딩으로 이동?
                }, 4000);
            } else {
                console.log('failed to get user data');
            }
        } else {
            console.log('failed to onboard');
        }
    }, []);

    return (
        <OnboardingSubmitContainer>
            <OnboardingLoadingContainer>
                <OnboardingLoadingTop>
                    <Image src={OnboardingLoader} alt="" layout="fill" />
                </OnboardingLoadingTop>
                <OnboardingLoadingMid>
                    <Image src={OnboardingLoader} alt="" />
                </OnboardingLoadingMid>
                <OnboardingLoadingBottom>
                    <Image src={OnboardingLoader} alt="" />
                </OnboardingLoadingBottom>
            </OnboardingLoadingContainer>
            <Gap height="72px" />
            <OnboardingSubmitTextBox>
                <Text size="h2">{name}님, 환영합니다!</Text>
                <Gap height="12px" />
                <Text color="gray2" size="b2">
                    앤서록을 준비 중입니다...
                    <br />
                    잠시만 기다려주세요
                </Text>
            </OnboardingSubmitTextBox>
        </OnboardingSubmitContainer>
    );
};
