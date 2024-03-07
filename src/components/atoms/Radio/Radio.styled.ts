import styled, { css } from 'styled-components';

import { Text } from '@Atoms/Typography';
import { ORANGE2, GRAY4, ColorType, colorPicker, BLACK } from '@Styles/colors';
import {
    ORANGE2_BACKGROUND,
    GRAY1_BACKGROUND,
    GRAY2_BACKGROUND,
    ORANGE0_BACKGROUND,
    GRAY0_BACKGROUND,
    ABSOLUTE_CENTER,
} from '@Styles/themes';
import {
    Body1,
    textSizePicker,
    TextSizePreferenceType,
    TextSizeType,
} from '@Styles/fonts';
import { Box } from '@Atoms/Box';

export const RadioContainer = styled(Box)<{
    width?: string;
    selected?: boolean;
    noBackground?: boolean;
}>`
    align-items: center;
    border-radius: 8px;
    height: 56px;
    width: ${({ width }) => width ?? '100%'};
    ${({ selected }) => (selected ? ORANGE0_BACKGROUND : GRAY0_BACKGROUND)}
    ${({ noBackground }) =>
        noBackground &&
        css`
            height: fit-content;
            background: none;
        `}
`;

export const RadioLabelText = styled.div<{
    labelSize?: TextSizeType;
    labelColor?: ColorType;
    textSizePref?: TextSizePreferenceType;
    selected?: boolean;
}>`
    margin-left: 10px;
    ${({ labelSize, textSizePref }) =>
        labelSize
            ? textSizePicker(textSizePref, labelSize)
            : textSizePicker(textSizePref, 'b1')}
    color: ${({ labelColor }) =>
        labelColor ? colorPicker(labelColor) : BLACK};
    color: ${({ selected }) => selected && ORANGE2};
`;

export const Label = styled.label``;

export const RadioInput = styled.input<{ noBackground?: boolean }>`
    display: none;
    & + ${Label} {
        position: relative;
        cursor: pointer;
        display: flex;
        align-items: center;
        width: 100%;
        height: 100%;
        padding: 16px;
        border-radius: 8px;
        ${({ noBackground }) => noBackground && 'padding: 0px;'}
    }
    &:not(:checked) + ${Label} .base-radio {
        &:after {
            opacity: 0;
            transform: scale(0);
        }
    }
    &:checked + ${Label} .base-radio {
        &:before {
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

export const BaseRadioBox = styled.div<{ noBackground?: boolean }>`
    width: 24px;
    height: 24px;
    border-radius: 50%;
    position: relative;
    // Box Style
    &:before {
        content: '';
        display: flex;
        box-sizing: border-box;
        -moz-box-sizing: border-box;
        -webkit-box-sizing: border-box;
        width: 16px;
        height: 16px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) !important;
        border: 2px solid ${GRAY4};
        border-radius: 50%;
    }
    // Check Style
    &:after {
        content: '';
        display: flex;
        justify-content: center;
        align-items: center;
        width: 8px;
        height: 8px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) !important;
        border-radius: 50%;
        transition: all 100ms;
        ${ORANGE2_BACKGROUND}
    }
`;

export const RadioEditableTextInput = styled.input<{
    labelSize?: TextSizeType;
    labelColor?: ColorType;
    textSizePref?: TextSizePreferenceType;
    selected?: boolean;
}>`
    border: 0;
    padding: 0;
    padding-left: 4px;
    max-width: 70%;
    outline: none;
    background: none;
    ${({ labelSize, textSizePref }) =>
        labelSize
            ? textSizePicker(textSizePref, labelSize)
            : textSizePicker(textSizePref, 'b1')}
    color: ${({ labelColor }) =>
        labelColor ? colorPicker(labelColor) : BLACK};

    ${({ selected }) =>
        !selected &&
        css`
            opacity: 0.4;
        `}

    &::placeholder {
        opacity: 0.4;
    }
`;
