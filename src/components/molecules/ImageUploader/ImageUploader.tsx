/* eslint-disable */

import { ChangeEvent, useState, useRef } from 'react';
import { ImageUploaderInput, ImageUploaderLabel } from './ImageUploader.styled';
import Image from 'next/image';
import SmileOutlined from '@Images/icons/smile_outlined.svg';
import { ImageType } from '@Types/types';
import { BLACK } from '@Styles/colors';
import { useFlutter } from '@Hooks/useFlutter';
import { mobileDetector } from '@Functions/browserDetector';
import { BaseModal } from '@Molecules/BaseModal';
import ExclamationImage from '@Images/exclamation_mandarin.png';
import { Text } from '@Atoms/Typography';
import { Button } from '@Atoms/Button';
import { Gap } from '@Styles/App.styled';
import { useActionOnTouch } from '@Hooks/useActionOnTouch';

export type ImageUploaderShapeType = 'square' | 'round';

interface ImageUploaderProp {
    targetImage: ImageType | null;
    setTargetImage: (param: ImageType | null) => void;
    width?: string;
    height?: string;
    shape?: ImageUploaderShapeType;
    outline?: boolean;
    disabled?: boolean;
    children?: React.ReactNode;
}

export const ImageUploader = ({
    targetImage,
    setTargetImage,
    width,
    height,
    shape = 'round',
    outline,
    disabled,
    children,
}: ImageUploaderProp) => {
    const { grantCameraPermission } = useFlutter();

    const [showInvalidFileTypeModal, setShowInvalidFileTypeModal] =
        useState(false);

    const fileInputRef = useRef<HTMLInputElement>(null);

    const beforeImageUpload = async () => {
        if (!fileInputRef?.current || disabled) return;
        fileInputRef.current.value = '';
        const isPermitted = await grantCameraPermission();
        if (isPermitted) {
            fileInputRef.current.click();
        }
    };

    const onChangeImageInput = async (event: ChangeEvent<HTMLInputElement>) => {
        if (!event.target.files) return;
        event.preventDefault();
        let file = event.target.files[0];
        if (!file) return;
        const fileType =
            file.type.split('/')[0] ||
            file.name.split('.').pop()?.toLowerCase();
        let reader = new FileReader();
        let convertedFile: File | null = null;
        reader.onloadend = () => {
            if (
                fileType === 'image' ||
                fileType === 'heic' ||
                fileType === 'heif'
            ) {
                setTargetImage({
                    name: convertedFile ? convertedFile.name : file.name,
                    file: convertedFile || file,
                    previewURL: reader.result,
                });
            } else {
                setShowInvalidFileTypeModal(true);
            }
        };
        if (fileType === 'heic' || fileType === 'heif') {
            if (!window) return;
            // ssr에서 window가 나오기 전에 import되어 error가 난다.
            // next dynamic을 어떻게 써야 할지.. 자꾸 component는 함수가 아니라네..
            const heic2any = require('heic2any');
            const convertedBlob = await heic2any({
                blob: file,
                toType: 'image/png',
            });
            convertedFile = new File(
                [convertedBlob],
                `${file.name.split('.')[0]}.${convertedBlob.type
                    .split('/')
                    .pop()
                    ?.toLowerCase()}`,
                {
                    type: convertedBlob.type,
                },
            );
            reader.readAsDataURL(convertedFile);
        } else {
            reader.readAsDataURL(file);
        }
    };

    const chooseImageAgain = async () => {
        setShowInvalidFileTypeModal(false);
        if (!fileInputRef?.current) return;
        fileInputRef.current.value = '';
        await beforeImageUpload();
    };
    return (
        <>
            <ImageUploaderLabel
                width={width}
                height={height}
                shape={shape}
                outline={outline}
                onClick={() => beforeImageUpload()}
            >
                {targetImage ? (
                    <Image
                        src={targetImage.previewURL as string}
                        alt="profile"
                        layout="fill"
                        objectFit="cover"
                    />
                ) : !children ? (
                    <SmileOutlined
                        width={width || '100px'}
                        height={height || '100px'}
                        color={BLACK}
                    />
                ) : (
                    children
                )}
            </ImageUploaderLabel>
            <ImageUploaderInput
                id="image-uploader-input"
                type="file"
                accept="image/* .heic .heif .tiff"
                disabled={disabled}
                onChange={onChangeImageInput}
                ref={fileInputRef}
            />
            <BaseModal
                show={showInvalidFileTypeModal}
                closeOnClickOutside
                onClose={() => setShowInvalidFileTypeModal(false)}
                customImage={ExclamationImage}
            >
                <Text>해당 파일은 이미지가 아니에요</Text>
                <Text>이미지 파일만을 선택해주세요</Text>
                <Gap height="32px" />
                <Button height="48px" onClickButton={() => chooseImageAgain()}>
                    다시 선택하기
                </Button>
            </BaseModal>
        </>
    );
};
