import styled, { css } from 'styled-components';

import {
    textSizePicker,
    TextSizePreferenceType,
    TextSizeType,
} from '@Styles/fonts';
import {
    BLACK_BACKGROUND,
    GRAY0_BACKGROUND,
    GRAY1_BACKGROUND,
    MANDARIN2_BACKGROUND,
    ORANGE1_BACKGROUND,
    ORANGE2_BACKGROUND,
    WHITE_BACKGROUND,
} from '@Styles/themes';
import {
    BLACK,
    GRAY1,
    GRAY2,
    GRAY3,
    GRAY4,
    GRAY5,
    ORANGE3,
    WHITE,
} from '@Styles/colors';

export const ButtonColorTypeArray = [
    'orange',
    'mandarin',
    'pink',
    'gray',
    'white',
    'black',
    'white-border',
    'gray-border',
] as const;
export type ButtonColorType = (typeof ButtonColorTypeArray)[number];

export const ButtonShapeTypeArray = ['round', 'square'] as const;
export type ButtonShapeType = 'round' | 'square' | 'full-circle';

export const ButtonContainer = styled.button<{
    width?: string;
    height?: string;
    color?: ButtonColorType;
    shape?: ButtonShapeType;
    textSizePref?: TextSizePreferenceType;
    textSize?: TextSizeType;
}>`
    border: none;
    cursor: pointer;
    -webkit-transition: all 150ms ease;
    transition: all 150ms ease;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);

    display: flex;
    justify-content: center;
    align-items: center;
    ${({ textSizePref, textSize }) => textSizePicker(textSizePref, textSize)}
    ${({ color }) => handleButtonColorType(color)}

    width: ${({ width }) => width ?? '100%'};
    min-height: ${({ height }) => height ?? '56px'};
    height: ${({ height }) => height ?? '56px'};
    ${({ shape }) => handleButtonShapeType(shape)};
    padding: 0px;

    :active {
        opacity: 0.8;
    }
    :disabled {
        opacity: 0.3;
    }
`;

export const Children = styled.span<{
    forcedTextPref?: TextSizePreferenceType;
}>`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    ${({ forcedTextPref }) => forcedTextPref && textSizePicker(forcedTextPref)}
`;

const handleButtonColorType = (color?: ButtonColorType) => {
    switch (color) {
        case 'pink':
            return css`
                ${ORANGE1_BACKGROUND}
                color: ${ORANGE3};
            `;
        case 'mandarin':
            return css`
                ${MANDARIN2_BACKGROUND}
                color: white;
            `;
        case 'gray':
            return css`
                ${GRAY1_BACKGROUND}
                color: ${GRAY5};
            `;
        case 'white':
            return css`
                ${WHITE_BACKGROUND}
                color: ${BLACK};
            `;
        case 'white-border':
            return css`
                ${WHITE_BACKGROUND}
                color: ${GRAY4};
                border: 1px solid ${GRAY4};
            `;
        case 'gray-border':
            return css`
                ${GRAY1_BACKGROUND}
                color: ${GRAY5};
                border: 1px solid ${GRAY2};
            `;
        case 'black':
            return css`
                ${BLACK_BACKGROUND}
                color: ${WHITE};
            `;
        case 'orange':
        default:
            return css`
                ${ORANGE2_BACKGROUND}
                color: white;
            `;
    }
};

const handleButtonShapeType = (shape?: ButtonShapeType) => {
    switch (shape) {
        case 'full-circle':
            return css`
                border-radius: 100%;
            `;
        case 'square':
            return css`
                border-radius: 8px;
            `;
        case 'round':
        default:
            return css`
                border-radius: 28px;
            `;
    }
};
