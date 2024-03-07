import { useFlutter } from '@Hooks/useFlutter';
import {
    QrCodeScannerContainer,
    QrCodeScannerFrame,
    QrCodeScannerInactivatedContainer,
} from './QrCodeScanner.styled';
import { useEffect, useRef, useState } from 'react';
import { Text } from '@Atoms/Typography';
import { Gap } from '@Styles/App.styled';
import { Button } from '@Atoms/Button';
import QrScanner from 'qr-scanner';

interface QrCodeScannerProps {
    qrResultData: string;
    setQrResultData: (qrResultData: string) => void;
    activateFrame: boolean;
    options?: {
        onDecodeError?: (error: Error | string) => void;
        calculateScanRegion?: (video: HTMLVideoElement) => QrScanner.ScanRegion;
        preferredCamera?: QrScanner.FacingMode | QrScanner.DeviceId;
        maxScansPerSecond?: number;
        highlightScanRegion?: boolean;
        highlightCodeOutline?: boolean;
        overlay?: HTMLDivElement;
        returnDetailedScanResult?: true;
    };
}

export const QrCodeScanner = ({
    qrResultData,
    setQrResultData,
    activateFrame,
    options = {
        preferredCamera: 'environment',
        maxScansPerSecond: 5,
        highlightScanRegion: true,
    },
}: QrCodeScannerProps) => {
    const { grantCameraPermission } = useFlutter();

    const [isScannerActivated, setIsScannerActivated] = useState(false);

    const qrRef = useRef<HTMLVideoElement>(null);

    // activate qr frame
    useEffect(() => {
        let qrScanner: QrScanner;
        if (!activateFrame) return () => qrScanner?.destroy();
        if (qrRef.current && isScannerActivated) {
            qrScanner = new QrScanner(
                qrRef.current,
                (result) => {
                    setQrResultData(result.data);
                },
                options,
            );
            qrScanner.start();
        } else if (!isScannerActivated) {
            activateScanner();
        }
        return () => qrScanner?.destroy();
    }, [isScannerActivated, activateFrame]);

    const activateScanner = async () => {
        const isCameraPermitted = await grantCameraPermission();
        if (isCameraPermitted) {
            setIsScannerActivated(true);
        } else {
            setIsScannerActivated(false);
        }
    };

    return (
        <QrCodeScannerContainer>
            {isScannerActivated ? (
                <QrCodeScannerFrame ref={qrRef} />
            ) : (
                <QrCodeScannerInactivatedContainer>
                    <Text textAlign="center">QR코드가 활성화되지 않았어요</Text>
                    <Gap height="4px" />
                    <Text textAlign="center">
                        어플리케이션의 접근 권한을 확인하세요
                    </Text>
                    <Gap height="16px" />
                    <Button
                        width="60%"
                        height="48px"
                        onClickButton={() => activateScanner()}
                    >
                        다시 시도하기
                    </Button>
                </QrCodeScannerInactivatedContainer>
            )}
        </QrCodeScannerContainer>
    );
};
