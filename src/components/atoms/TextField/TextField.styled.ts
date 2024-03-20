import styled, { css } from 'styled-components';

import { Box } from '@Atoms/Box';
import { Container } from '@Atoms/Container';
import { textSizePicker, TextSizePreferenceType } from '@Styles/fonts';
import {
    BLACK,
    GRAY4,
    ORANGE2,
    ORANGE3,
    GRAY2,
    GRAY0,
    GRAY3,
} from '@Styles/colors';
import { RowContainer } from '@Atoms/RowContainer';
import {
    GRAY0_BACKGROUND,
    GRAY2_BACKGROUND,
    WHITE_BACKGROUND,
} from '@Styles/themes';

export type TextFieldStatusType = 'default' | 'error';

export const TextFieldWrapper = styled(Box)<{
    width?: string;
    disabled?: boolean;
}>`
    flex-direction: column;
    /* gap: 6px; */
    width: ${({ width }) => width || '100%'};
`;

export const TextFieldContainer = styled(RowContainer)<{
    status: TextFieldStatusType;
    isFocused: boolean;
    isTextarea?: boolean;
    disabled?: boolean;
    textSizePref?: TextSizePreferenceType;
}>`
    /* gap: 4px; */
    ${({ textSizePref }) => textSizePicker(textSizePref, 'b1')}
    padding: 16px 8px;
    border: 1px solid ${GRAY3};
    ${WHITE_BACKGROUND}
    ${({ isTextarea }) =>
        isTextarea &&
        css`
            padding: 9px 12px;
            height: fit-content;
            ${GRAY0_BACKGROUND}/* border-color:${GRAY0}; */
        `}
    border-radius: 8px;
    border-color: ${({ isFocused }) => isFocused && ORANGE2};
    border-color: ${({ status }) => status === 'error' && ORANGE3};
    ${({ disabled }) =>
        disabled &&
        css`
            ${GRAY2_BACKGROUND}
            opacity: 0.4;
        `}
`;

export const TextFieldTitleBox = styled(Box)<{
    textSizePref?: TextSizePreferenceType;
}>`
    color: ${GRAY4};
    margin-right: 8px;
    ${({ textSizePref }) => textSizePicker(textSizePref, 'b1')}
`;

export const TextFieldSubContainer = styled(RowContainer)`
    align-items: flex-start;
    /* gap: 8px; */
    margin-top: 8px;
`;

export const BaseTextField = styled.input<{
    alignRight?: boolean;
    textSizePref?: TextSizePreferenceType;
}>`
    appearance: none;
    -moz-appearance: none;
    -webkit-appearance: none;
    border: none;
    padding: 0;
    background: none;
    width: 100%;
    flex: 1;
    ${({ textSizePref }) => textSizePicker(textSizePref, 'b1')}
    text-align: ${({ alignRight }) => alignRight && 'end'};
    &::placeholder {
        color: ${GRAY2};
    }
    &:focus {
        outline: none;
    }
    &::-webkit-inner-spin-button {
        appearance: none;
        -moz-appearance: none;
        -webkit-appearance: none;
    }
`;

export const BaseTextArea = styled.textarea<{
    height: string;
    status: TextFieldStatusType;
    textSizePref?: TextSizePreferenceType;
}>`
    appearance: none;
    -moz-appearance: none;
    -webkit-appearance: none;
    resize: vertical;
    border: none;
    resize: none;
    width: 100%;
    background: none;
    height: ${({ height }) => height};
    padding: 0px;
    ${({ textSizePref }) => textSizePicker(textSizePref, 'b1')}
    &::placeholder {
        color: ${GRAY4};
    }
    &:focus {
        outline: none;
    }
    &::-webkit-inner-spin-button {
        appearance: none;
        -moz-appearance: none;
        -webkit-appearance: none;
    }
`;

export const LabelBox = styled(Box)<{
    status: TextFieldStatusType;
    textSizePref?: TextSizePreferenceType;
}>`
    align-items: center;
    /* gap: 4px; */
    ${({ textSizePref }) => textSizePicker(textSizePref, 'b2')}
    color: ${({ status }) => handleStatusColor(status)};
`;

export const SupportBox = styled(Box)`
    width: fit-content;
    /* gap: 4px; */
    margin-left: 4px;
`;

export const SupportTextBox = styled(Box)<{
    status: TextFieldStatusType;
    textSizePref?: TextSizePreferenceType;
}>`
    justify-content: flex-end;
    white-space: nowrap;
    margin-left: 8px;
    ${({ textSizePref }) => textSizePicker(textSizePref, 'b2')}
    color: ${({ status }) => handleStatusColor(status)};
`;

export const SupportIconButton = styled.button`
    cursor: pointer;
    border: none;
    background: none;
    padding: 0;
    width: 20px;
    height: 20px;
    margin-left: 4px;
    border-radius: 50%;
    svg {
        path {
            fill: ${GRAY4};
        }
    }
    :active {
        background: none;
        svg {
            path {
                fill: ${BLACK};
            }
        }
    }
`;

export const HelpTextBox = styled(Container)<{
    status: TextFieldStatusType;
    textSizePref?: TextSizePreferenceType;
}>`
    flex: 1;
    align-items: flex-start;
    ${({ textSizePref }) => textSizePicker(textSizePref, 'b2')}
    color: ${({ status }) => handleStatusColor(status)};
`;

export const TagsBox = styled(Box)<{ hasTags?: boolean }>`
    flex-flow: wrap;
    flex: 1;
`;

const handleStatusColor = (status: TextFieldStatusType) => {
    switch (status) {
        case 'error':
            return ORANGE3;
        case 'default':
        default:
            return GRAY4;
    }
};
