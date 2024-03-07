import Router, { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { MainLayout } from '@Organisms/MainLayout';
import { TextSizeSetting } from './RegisterComponents/TextSizeSetting';
import { useSessionstorage } from '@Hooks/useSessionStorage';
import { useLocalstorage } from '@Hooks/useLocalStorage';
import { RegisterPhoneNumber } from './RegisterComponents/RegisterPhoneNumber';

export const Register = () => {
    const router = useRouter();
    const { phone } = router.query;

    const [accessToken, setAccessToken, removeAccessToken] =
        useLocalstorage('accessToken');
    const [refreshToken, setRefreshToken, removeRefreshToken] =
        useLocalstorage('refreshToken');
    const [
        appleIdBeforeLogin,
        setAppleIdBeforeLogin,
        removeAppleIdBeforeLogin,
    ] = useSessionstorage<string>('appleIdBeforeLogin');

    const [step, setStep] = useState<number>(0);

    const goNextStep = (nextStep?: number) => {
        setStep(nextStep || step + 1);
    };

    const goBack = (step: number) => {
        if (step === 0) {
            removeAccessToken();
            removeRefreshToken();
            removeAppleIdBeforeLogin();
            Router.push('/login');
        } else {
            setStep(step - 1);
        }
    };

    return (
        <MainLayout
            title=""
            hideBottomNav
            goBackHandler={() => goBack(step)}
            whiteBackground
            hideActionIcons
        >
            {step === 0 && <TextSizeSetting goNextStep={goNextStep} />}
            {step === 1 && <RegisterPhoneNumber goNextStep={goNextStep} />}
        </MainLayout>
    );
};
