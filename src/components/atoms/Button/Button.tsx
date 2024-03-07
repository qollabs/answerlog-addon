import { AppContext } from '@Pages/_app';
import { MouseEventHandler, TouchEventHandler, useContext } from 'react';

import {
    ButtonColorType,
    ButtonContainer,
    ButtonShapeType,
    Children,
} from './Button.styled';
import { TextSizePreferenceType, TextSizeType } from '@Styles/fonts';
import { useActionOnTouch } from '@Hooks/useActionOnTouch';

interface ButtonProp {
    onClickButton?: () => void;
    width?: string;
    height?: string;
    disabled?: boolean;
    color?: ButtonColorType;
    shape?: ButtonShapeType;
    children?: React.ReactNode;
    className?: string;
    forcedTextPref?: TextSizePreferenceType;
    textSize?: TextSizeType;
}

export const Button = ({
    onClickButton,
    width,
    height,
    disabled,
    color = 'orange',
    shape = 'round',
    className,
    children,
    forcedTextPref,
    textSize,
}: ButtonProp) => {
    const { textSizePref } = useContext(AppContext);
    const { actionOnTouchEnd } = useActionOnTouch();
    return (
        <ButtonContainer
            onClick={onClickButton}
            onTouchEnd={(e) => {
                if (!disabled) actionOnTouchEnd(e, onClickButton);
            }}
            className={className}
            width={width}
            height={height}
            color={color}
            shape={shape}
            disabled={disabled}
            textSizePref={textSizePref}
            textSize={textSize || 'b1'}
        >
            <Children forcedTextPref={forcedTextPref}>{children}</Children>
        </ButtonContainer>
    );
};
