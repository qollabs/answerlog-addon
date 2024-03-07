/* eslint-disable */

import { Button } from '@Atoms/Button';
import { Radio, RadioValue } from '@Atoms/Radio';
import { AudioPlayer } from '@Molecules/AudioPlayer';
import { AudioRecorder } from '@Organisms/AudioRecorder';
import { ProgressBar } from '@Molecules/ProgressBar';
import { Select } from '@Molecules/Select';
import { SelectValue } from '@Molecules/Select/Select';
import { MainLayout } from '@Organisms/MainLayout';
import { AppContext } from '@Pages/_app';
import { Gap } from '@Styles/App.styled';
import { useState, useEffect, useContext, useRef } from 'react';
import { TestContainer } from './Test.styled';
import { Text } from '@Atoms/Typography';
import { Divider } from '@Atoms/Divider';
import { ImageUploader } from '@Molecules/ImageUploader';
import { useRouter } from 'next/router';
import { useRequest } from '@Hooks/useRequest';
import { Question } from '@Organisms/Question';
import { dummyQna } from '@Constants/dummyObjects';
import { MenuSelector } from '@Molecules/MenuSelector';
import { Answer } from '@Organisms/Answer';
import { AudioType } from '@Types/types';
import { TextField } from '@Atoms/TextField';
import { BaseModal } from '@Molecules/BaseModal';
import { BottomDrawer } from '@Molecules/BottomDrawer';
import QrScanner from 'qr-scanner';
import { mobileDetector } from '@Functions/browserDetector';
import { useFlutter } from '@Hooks/useFlutter';
import { useAsyncEffect } from '@Hooks/useAsyncEffect';
import { QrCodeScanner } from '@Molecules/QrCodeScanner';
import { ChatInput } from '@Molecules/ChatInput';
import { qrDataTranslator } from '@Functions/codeTranslator';

export const Test = () => {
    const { request } = useRequest();
    const router = useRouter();
    const { isInputFocused, setIsInputFocused, myDatabaseId } =
        useContext(AppContext);
    const { grantCameraPermission, activatePhoneCall } = useFlutter();

    const [audioFile, setAudioFile] = useState<AudioType>();
    const [activateQR, setActivateQR] = useState(false);
    const [qrContent, setQrContent] = useState('');

    const [selectedRadio, setSelectedRadio] = useState<RadioValue>('');

    const qrRef = useRef<HTMLVideoElement>(null);

    return (
        <MainLayout hideBottomNav={isInputFocused}>
            <TestContainer>
                <Button onClickButton={() => activatePhoneCall('01073031761')}>
                    전화걸기 테스트
                </Button>
            </TestContainer>
        </MainLayout>
    );
};
