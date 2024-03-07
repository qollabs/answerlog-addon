import { Box } from '@Atoms/Box';
import { RowContainer } from '@Atoms/RowContainer';
import { BLACK, GRAY2, GRAY3, ORANGE2 } from '@Styles/colors';
import { TextSizeType, textSizePicker } from '@Styles/fonts';
import {
    GRAY0_BACKGROUND,
    GRAY1_BACKGROUND,
    WHITE_BACKGROUND,
} from '@Styles/themes';
import { TextSizePrefType } from '@Types/types';
import styled from 'styled-components';

export const TextFieldRoundContainer = styled(RowContainer)`
    flex: 1 0 0;
`;

export const TextFieldRoundTitleContainer = styled(RowContainer)<{
    width?: string;
}>`
    width: ${({ width }) => width || 'fit-content'};
    justify-content: flex-start;
    margin-right: 8px;
`;

export const TextFieldRoundInput = styled.input<{
    pref: TextSizePrefType;
    textSize: TextSizeType;
}>`
    flex: 1 0 0;
    padding: 8px 16px;
    border-radius: 50px;
    border: 1px solid ${GRAY3};
    color: ${BLACK};
    caret-color: ${ORANGE2};
    ${({ pref, textSize }) => textSizePicker(pref, textSize)}
    &:focus {
        outline: none;
        border: 1px solid ${ORANGE2};
    }
    &:disabled {
        ${GRAY1_BACKGROUND}
    }
    &::placeholder {
        color: ${GRAY3};
    }
    &::-webkit-inner-spin-button {
        appearance: none;
        -moz-appearance: none;
        -webkit-appearance: none;
    }
`;
