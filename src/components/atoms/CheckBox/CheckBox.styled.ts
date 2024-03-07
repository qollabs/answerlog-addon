import styled, { css } from 'styled-components';

import { Text } from '@Atoms/Typography';
import { ORANGE2, colorPicker, ColorType, GRAY4, BLACK } from '@Styles/colors';
import {
    ORANGE2_BACKGROUND,
    GRAY1_BACKGROUND,
    GRAY2_BACKGROUND,
    ORANGE0_BACKGROUND,
    GRAY0_BACKGROUND,
} from '@Styles/themes';
import {
    textSizePicker,
    TextSizePreferenceType,
    TextSizeType,
} from '@Styles/fonts';
import { Box } from '@Atoms/Box';

export const CheckBoxContainer = styled(Box)<{
    width?: string;
    checked?: boolean;
    noBackground?: boolean;
}>`
    align-items: center;
    /* gap: 10px; */
    border-radius: 8px;
    height: 56px;
    width: ${({ width }) => width ?? '100%'};
    ${({ checked }) => (checked ? ORANGE0_BACKGROUND : GRAY0_BACKGROUND)}
    ${({ noBackground }) =>
        noBackground &&
        css`
            height: fit-content;
            background: none;
        `}
`;

export const CheckBoxLabelText = styled.div<{
    labelSize?: TextSizeType;
    labelColor?: ColorType;
    textSizePref?: TextSizePreferenceType;
    checked?: boolean;
}>`
    ${({ labelSize, textSizePref }) =>
        labelSize
            ? textSizePicker(textSizePref, labelSize)
            : textSizePicker(textSizePref, 'b1')}
    color: ${({ labelColor }) =>
        labelColor ? colorPicker(labelColor) : BLACK};
    color: ${({ checked }) => checked && ORANGE2};
`;

export const Label = styled.label`
    width: 100%;
`;

export const CheckBoxInput = styled.input<{ noBackground?: boolean }>`
    display: none;
    & + ${Label} {
        position: relative;
        cursor: pointer;
        display: flex;
        align-items: center;
        width: 100%;
        height: 100%;
        padding: 16px;
        /* gap: 6px; */
        border-radius: 8px;
        ${({ noBackground }) => noBackground && 'padding: 0px;'}
    }
    &:not(:checked) + ${Label} .base-checkbox {
        &:after {
            opacity: 0;
            transform: scale(0);
        }
    }
    &:checked + ${Label} .base-checkbox {
        &:before {
            ${ORANGE2_BACKGROUND}
            border: 2px solid ${ORANGE2};
        }
        &:after {
            opacity: 1;
            transform: scale(1);
        }
    }
    &:disabled + ${Label} {
        opacity: 0.4;
        :active {
            background: none;
        }
    }
`;

export const BaseCheckBox = styled.div<{
    isAll?: boolean;
    noBackground?: boolean;
}>`
    width: 24px;
    height: 24px;
    margin-right: 10px;
    border-radius: 4px;
    // Box Style
    &:before {
        content: '';
        display: flex;
        position: absolute;
        left: 19px;
        top: 19px;
        width: 14px;
        height: 14px;
        border: 2px solid ${GRAY4};
        border-radius: 2px;
        ${({ noBackground }) =>
            noBackground &&
            css`
                left: 3px;
                top: 3px;
            `}
    }
    // Check Style
    &:after {
        ${({ isAll }) => (isAll ? `content: '\u2013'` : `content: '\u2713'`)};
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        top: 19px;
        left: 19px;
        width: 18px;
        height: 18px;
        font-size: 16px !important;
        font-weight: 600;
        color: #ffffff !important;
        transition: all 100ms;
        ${({ noBackground }) =>
            noBackground &&
            css`
                left: 3px;
                top: 3px;
            `}
    }
`;
