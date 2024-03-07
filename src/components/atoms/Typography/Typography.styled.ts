import styled, { css } from 'styled-components';

import { ColorType, colorPicker } from '@Styles/colors';
import {
    TextSizeType,
    textSizePicker,
    TextSizePreferenceType,
} from '@Styles/fonts';
import { Container } from '@Atoms/Container';

export const BaseText = styled.span<{
    size?: TextSizeType;
    color?: ColorType;
    textAlign?: string;
    textDecoration?: string;
    bold?: boolean;
    underline?: boolean;
    pref?: TextSizePreferenceType;
}>`
    height: fit-content;
    z-index: 0;
    color: ${({ color }) => colorPicker(color)};
    ${({ pref, size }) => textSizePicker(pref, size)}
    text-align: ${({ textAlign }) => textAlign ?? 'left'};
    text-decoration: ${({ textDecoration }) => textDecoration ?? 'none'};
    ${({ underline, color }) =>
        underline &&
        css`
            text-decoration: underline;
            text-underline-offset: 4px;
        `}
    ${({ bold }) =>
        bold &&
        css`
            font-weight: bold;
        `}
`;

export const TextBox = styled(Container)`
    width: 100%;
    align-items: flex-start;
`;
