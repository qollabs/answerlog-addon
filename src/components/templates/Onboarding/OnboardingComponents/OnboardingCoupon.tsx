import { useContext, useEffect, useRef, useState } from 'react';
import {
    OnboardingContainer,
    OnboardingContentContainer,
    OnboardingCouponContainer,
    OnboardingHeadContainer,
} from '../Onboarding.styled';
import { Text } from '@Atoms/Typography';
import { Gap } from '@Styles/App.styled';
import { IconButton } from '@Atoms/IconButton';
import { BottomButtonContainer } from '@Organisms/MainLayout';
import { Button } from '@Atoms/Button';
import { RowContainer } from '@Atoms/RowContainer';
import { useInput } from '@Hooks/useInput';
import { TextField } from '@Atoms/TextField';
import QrScanner from 'qr-scanner';
import {
    couponCodeTranslator,
    qrDataTranslator,
} from '@Functions/codeTranslator';
import { useFlutter } from '@Hooks/useFlutter';
import { QrCodeScanner } from '@Molecules/QrCodeScanner';

interface OnboardingCouponProp {
    couponId: string | null;
    setCouponId: (couponId: string | null) => void;
    goNextStep: (nextStep?: number) => void;
}

type IssueMethodType = 'qr-code' | 'text-input';

export const OnboardingCoupon = ({
    couponId,
    setCouponId,
    goNextStep,
}: OnboardingCouponProp) => {
    const { grantCameraPermission } = useFlutter();

    const [issueMethod, setIssueMethod] = useState<IssueMethodType>('qr-code');
    const [qrResultData, setQrResultData] = useState('');
    const [isQrScanDone, setIsQrScanDone] = useState(false);
    const [typedCouponCode, onChangeTypedCouponCode, setTypedCouponCode] =
        useInput('');

    const qrRef = useRef<HTMLVideoElement>(null);

    // refresh coupon id
    useEffect(() => {
        setCouponId('');
        if (issueMethod === 'qr-code') {
            setTypedCouponCode('');
        } else {
            setIsQrScanDone(false);
        }
    }, [issueMethod]);

    // after reading qr code
    useEffect(() => {
        if (!qrResultData) return;
        setCouponId(qrDataTranslator(qrResultData));
        setIsQrScanDone(true);
    }, [qrResultData]);

    // translate typed coupon code into coupon id
    useEffect(() => {
        setCouponId(couponCodeTranslator(typedCouponCode));
    }, [typedCouponCode]);

    const beforeShowQrScanner = () => {};

    const goNextWithoutCouponCode = () => {
        setCouponId(null);
        goNextStep();
    };
    return (
        <OnboardingContainer>
            <OnboardingHeadContainer>
                <Text size="h1">쿠폰이 있으신가요?</Text>
                <Gap height="16px" />
                <Text size="b1" color="gray4">
                    QR 코드를 스캔하거나 <br />
                    코드를 직접 입력하여 <br />
                    쿠폰을 미리 등록하세요
                </Text>
            </OnboardingHeadContainer>
            <OnboardingContentContainer>
                <OnboardingCouponContainer>
                    <RowContainer>
                        <Button
                            onClickButton={() =>
                                issueMethod === 'qr-code'
                                    ? setIssueMethod('text-input')
                                    : setIssueMethod('qr-code')
                            }
                        >
                            {issueMethod === 'qr-code' ? '직접 입력' : 'QR코드'}
                        </Button>
                        <Gap width="8px" />
                        <Button
                            color="mandarin"
                            onClickButton={() => goNextWithoutCouponCode()}
                        >
                            건너 뛰기
                        </Button>
                    </RowContainer>
                    <Gap height="16px" />
                    {issueMethod === 'qr-code' ? (
                        !isQrScanDone ? (
                            <QrCodeScanner
                                activateFrame={issueMethod === 'qr-code'}
                                qrResultData={qrResultData}
                                setQrResultData={setQrResultData}
                                options={{
                                    preferredCamera: 'environment',
                                    maxScansPerSecond: 5,
                                    highlightScanRegion: false,
                                }}
                            />
                        ) : (
                            <Text size="h2">등록되었어요</Text>
                        )
                    ) : (
                        <TextField
                            placeholder="쿠폰 코드를 입력하세요"
                            onChange={(e) => {
                                setIsQrScanDone(false);
                                onChangeTypedCouponCode(e);
                            }}
                        />
                    )}
                </OnboardingCouponContainer>
            </OnboardingContentContainer>
            <BottomButtonContainer>
                <Button onClickButton={() => goNextStep()} disabled={!couponId}>
                    다음
                </Button>
            </BottomButtonContainer>
        </OnboardingContainer>
    );
};
