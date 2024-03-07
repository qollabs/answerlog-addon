import { ABSOLUTE_CENTER, WHITE_BACKGROUND } from '@Styles/themes';
import styled, { css } from 'styled-components';
import { ORANGE2 } from '@Styles/colors';

export const BaseImageBox = styled.div<{
    width: string;
    height: string;
    borderRadius: string;
    border?: boolean;
    borderThickness: string;
    transparent?: boolean;
    backgroundColor?: string;
}>`
    width: ${({ width }) => width};
    min-width: ${({ width }) => width};
    height: ${({ height }) => height};
    min-height: ${({ height }) => height};
    border: ${({ border, borderThickness }) =>
        border ? `${borderThickness} solid ${ORANGE2}` : 0};
    border-radius: ${({ borderRadius }) => borderRadius};
    ${({ transparent, backgroundColor }) =>
        transparent
            ? 'background:transparent;'
            : backgroundColor
            ? `background-color:${backgroundColor};`
            : WHITE_BACKGROUND}
    position: relative;
    overflow: hidden;
    & > svg {
        ${ABSOLUTE_CENTER}
    }
`;
