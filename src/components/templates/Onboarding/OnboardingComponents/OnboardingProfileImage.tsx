import Image from 'next/image';

import ImageIcon from '@Images/icons/image.svg';
import { Button } from '@Atoms/Button';
import { Text } from '@Atoms/Typography';
import { BottomButtonContainer } from '@Organisms/MainLayout';
import { ImageType } from '@Types/types';
import {
    OnboardingContainer,
    OnboardingContentContainer,
    OnboardingHeadContainer,
    OnboardingProfileImageContainer,
    OnboardingProfileImageDefaultContainer,
} from '../Onboarding.styled';
import { IconButton } from '@Atoms/IconButton';
import { Gap } from '@Styles/App.styled';
import { ImageUploader } from '@Molecules/ImageUploader';
import { GRAY2 } from '@Styles/colors';

interface OnboardingProfileImageProp {
    profileImage: ImageType | null;
    setProfileImage: (profileImage: ImageType | null) => void;
    goNextStep: (nextStep?: number) => void;
}

export const OnboardingProfileImage = ({
    profileImage,
    setProfileImage,
    goNextStep,
}: OnboardingProfileImageProp) => {
    const goNextWithoutImage = () => {
        setProfileImage(null);
        goNextStep();
    };

    return (
        <OnboardingContainer>
            <OnboardingHeadContainer>
                <Text size="h1">프로필 사진을 추가해주세요</Text>
                <Gap height="16px" />
                <Text size="b1" color="gray4">
                    하단의 회색 원을 눌러 <br />
                    상대방에게 보여질 나의 사진을 선택해주세요!
                </Text>
            </OnboardingHeadContainer>

            <OnboardingContentContainer>
                <OnboardingProfileImageContainer>
                    <ImageUploader
                        width="240px"
                        height="240px"
                        targetImage={profileImage}
                        setTargetImage={setProfileImage}
                    >
                        <OnboardingProfileImageDefaultContainer>
                            <ImageIcon
                                width="40px"
                                height="40px"
                                color={GRAY2}
                            />
                            <Gap height="16px" />
                            <Text color="gray3" size="b2">
                                사진 선택하기
                            </Text>
                        </OnboardingProfileImageDefaultContainer>
                    </ImageUploader>
                    <Gap height="16px" />
                    <IconButton onClickButton={() => goNextWithoutImage()}>
                        <Text size="b2" color="orange2">
                            건너뛰기
                        </Text>
                    </IconButton>
                </OnboardingProfileImageContainer>
            </OnboardingContentContainer>

            <BottomButtonContainer>
                <Button
                    onClickButton={() => goNextStep()}
                    disabled={!profileImage}
                >
                    다음
                </Button>
            </BottomButtonContainer>
        </OnboardingContainer>
    );
};
