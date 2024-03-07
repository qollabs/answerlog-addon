import { FC, ReactNode, useRef } from 'react';
import Image from 'next/image';
import { Text } from '@Atoms/Typography';
import { Backdrop } from '@Atoms/Backdrop';
import {
    BaseModalChildrenContainer,
    BaseModalContainer,
} from './BaseModal.styled';
import { useBodyScrollLock } from '@Hooks/useBodyScrollLock';
import { Container } from '@Atoms/Container';
import { Gap } from '@Styles/App.styled';
import DefaultProfileImage from '@Images/answerlog_icon_logo.png';
import { ButtonColorType } from '@Atoms/Button/Button.styled';
import { RowContainer } from '@Atoms/RowContainer';
import { Button } from '@Atoms/Button';
import { useOnClickOutside } from '@Hooks/useOnClickOutside';

interface BaseModalProp {
    show: boolean;
    title?: string | ReactNode;
    height?: string;
    hideImage?: boolean;
    customImage?: StaticImageData | string;
    onClose?: () => void;
    closeOnClickOutside?: boolean;
    className?: string;
    lockScroll?: boolean;
    buttonText?: string;
    buttonColor?: ButtonColorType;
    onClickButton?: () => void;
    disableButton?: boolean;
    button2Text?: string;
    button2Color?: ButtonColorType;
    onClickButton2?: () => void;
    disableButton2?: boolean;
}

export const BaseModal: FC<BaseModalProp> = ({
    show,
    title,
    height,
    hideImage,
    customImage,
    onClose,
    closeOnClickOutside,
    lockScroll,
    className,
    children,
    buttonText,
    buttonColor = 'orange',
    onClickButton,
    disableButton,
    button2Text,
    button2Color = 'orange',
    onClickButton2,
    disableButton2,
}) => {
    useBodyScrollLock(lockScroll);
    const modalRef = useOnClickOutside<HTMLDivElement>(onClose);

    return (
        <Backdrop show={show}>
            <BaseModalContainer
                height={height}
                className={className}
                ref={closeOnClickOutside && show ? modalRef : undefined}
            >
                {title && (
                    <Container>
                        <Text size="h2">{title}</Text>
                        <Gap height="32px" />
                    </Container>
                )}
                {!hideImage && (
                    <Container>
                        <Image
                            src={customImage || DefaultProfileImage}
                            alt=""
                            width={80}
                            height={80}
                        />
                        <Gap height="32px" />
                    </Container>
                )}
                <BaseModalChildrenContainer>
                    {children}
                </BaseModalChildrenContainer>
                {buttonText && (
                    <>
                        <Gap height="32px" />
                        <RowContainer>
                            <Button
                                height="48px"
                                color={buttonColor}
                                onClickButton={onClickButton}
                                disabled={disableButton}
                            >
                                {buttonText}
                            </Button>
                            {button2Text && (
                                <>
                                    <Gap width="8px" />
                                    <Button
                                        height="48px"
                                        color={button2Color}
                                        onClickButton={onClickButton2}
                                        disabled={disableButton2}
                                    >
                                        {button2Text}
                                    </Button>
                                </>
                            )}
                        </RowContainer>
                    </>
                )}
            </BaseModalContainer>
        </Backdrop>
    );
};
