import { Container } from '@Atoms/Container';
import { RowContainer } from '@Atoms/RowContainer';
import { Text } from '@Atoms/Typography';
import { WHITE, ORANGE2 } from '@Styles/colors';
import { WHITE_BACKGROUND } from '@Styles/themes';
import styled, { css } from 'styled-components';

export const CardSectionContainer = styled(Container)<{
    deepShadow?: boolean;
    width?: string;
    height?: string;
    overflow?: string;
}>`
    border-radius: 16px;
    ${WHITE_BACKGROUND}
    width: ${({ width }) => width || '100%'};
    height: ${({ height }) => height || 'auto'};

    ${({ overflow }) =>
        !overflow ? `overflow: hidden;` : `overflow:${overflow};`}
    box-shadow: ${({ deepShadow }) =>
        deepShadow
            ? '0px 4px 10px 4px rgba(0,0,0,0.1)'
            : '0px 4px 4px 0px rgba(0,0,0,0.05)'};
`;

export const CardSectionTitleContainer = styled(RowContainer)<{
    orangeTitle?: boolean;
}>`
    padding: 16px;
    border-radius: 16px 16px 0 0;
    ${({ orangeTitle }) =>
        orangeTitle &&
        css`
            background-color: ${ORANGE2};
            & > span {
                color: ${WHITE};
            }
        `};
`;

export const CardSectionSubtitleText = styled(Text)`
    align-self: flex-start;
`;

export const CardSectionContentContainer = styled(Container)<{
    alignItems?: string;
}>`
    padding: 16px;
    border-radius: 0 0 16px 16px;
    height: 100%;
    align-items: ${({ alignItems }) => alignItems || 'center'};
`;
