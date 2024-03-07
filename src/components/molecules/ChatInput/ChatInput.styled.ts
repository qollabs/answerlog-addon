import { RowContainer } from '@Atoms/RowContainer';
import { mobileDetector } from '@Functions/browserDetector';
import { BLACK, GRAY2, GRAY3, GRAY4, ORANGE2 } from '@Styles/colors';
import { textSizePicker } from '@Styles/fonts';
import {
    GRAY1_BACKGROUND,
    ORANGE1_BACKGROUND,
    WHITE_BACKGROUND,
} from '@Styles/themes';
import { TextSizePrefType } from '@Types/types';
import styled, { css } from 'styled-components';

export const ChatInputContainer = styled(RowContainer)<{ isFocused: boolean }>`
    width: 100%;
    justify-content: flex-end;
    ${GRAY1_BACKGROUND}
    width: 100%;
    padding: 10px 16px;
    border-radius: 30px;
    ${({ isFocused }) =>
        isFocused &&
        css`
            border-radius: 0;
            position: fixed;
            width: 100vw;
            bottom: 0;
            left: 0;
            z-index: 999;
        `}
`;

export const BaseChatInput = styled.textarea<{ pref: TextSizePrefType }>`
    padding: 0;
    border: 0;
    background: transparent;
    width: 100%;
    resize: none;
    color: ${BLACK};
    caret-color: ${ORANGE2};
    ${({ pref }) => textSizePicker(pref, 'b2')}
    &:focus {
        outline: none;
    }
    &::placeholder {
        color: ${GRAY4};
    }
    &::-webkit-inner-spin-button {
        appearance: none;
        -moz-appearance: none;
        -webkit-appearance: none;
    }
`;

export const ChatInputSubmitButton = styled.button`
    width: 24px;
    height: 24px;
    border: 0;
    position: relative;
    & > svg {
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
    }
`;
