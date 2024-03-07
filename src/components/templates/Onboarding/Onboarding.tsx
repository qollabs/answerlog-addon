import { RadioValue } from '@Atoms/Radio';
import { useLocalstorage } from '@Hooks/useLocalStorage';
import { useSessionstorage } from '@Hooks/useSessionStorage';
import { MainLayout } from '@Organisms/MainLayout';
import { ImageType, GenderType } from '@Types/types';
import { useState } from 'react';
import { OnboardingContainer } from './Onboarding.styled';
import { OnboardingBirth } from './OnboardingComponents/OnboardingBirth';
import { OnboardingName } from './OnboardingComponents/OnboardingName';
import { OnboardingProfileImage } from './OnboardingComponents/OnboardingProfileImage';
import { OnboardingSubmit } from './OnboardingComponents/OnboardingSubmit';
import { useRouter } from 'next/router';
import { useInput } from '@Hooks/useInput';
import { OnboardingCoupon } from './OnboardingComponents/OnboardingCoupon';

export const Onboarding = () => {
    const router = useRouter();
    const [accessToken, setAccessToken, removeAccessToken] =
        useLocalstorage('accessToken');
    const [refreshToken, setRefreshToken, removeRefreshToken] =
        useLocalstorage('refreshToken');

    const [step, setStep] = useState<number>(0);
    const [name, onChangeName, setName] = useInput('');
    const [gender, setGender] = useState<RadioValue>('');
    const [birth, setBirth] = useState<string>('');
    const [profileImage, setProfileImage] = useState<ImageType | null>(null);
    const [couponId, setCouponId] = useState<string | null>(null);

    const goNextStep = (nextStep?: number) => {
        setStep(nextStep || step + 1);
    };
    const goBack = (step: number) => {
        if (step === 0) {
            removeAccessToken();
            removeRefreshToken();
            router.push('/register');
        } else {
            setStep(step - 1);
        }
    };
    return (
        <MainLayout
            title=""
            hideBottomNav
            hideBackButton={step === 4}
            goBackHandler={() => goBack(step)}
            hideTopNav={step === 4}
            whiteBackground
            hideActionIcons
        >
            {step === 0 && (
                <OnboardingName
                    name={name}
                    onChangeName={onChangeName}
                    gender={gender}
                    setGender={setGender}
                    goNextStep={goNextStep}
                />
            )}
            {step === 1 && (
                <OnboardingBirth
                    birth={birth}
                    setBirth={setBirth}
                    goNextStep={goNextStep}
                />
            )}
            {step === 2 && (
                <OnboardingProfileImage
                    profileImage={profileImage}
                    setProfileImage={setProfileImage}
                    goNextStep={goNextStep}
                />
            )}
            {step === 3 && (
                <OnboardingCoupon
                    couponId={couponId}
                    setCouponId={setCouponId}
                    goNextStep={goNextStep}
                />
            )}
            {step === 4 && (
                <OnboardingSubmit
                    name={name}
                    gender={gender as GenderType}
                    birth={birth}
                    profileImage={profileImage}
                    couponId={couponId}
                />
            )}
        </MainLayout>
    );
};
