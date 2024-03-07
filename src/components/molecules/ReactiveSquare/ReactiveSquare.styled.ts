import { Box } from '@Atoms/Box';
import { Container } from '@Atoms/Container';
import { WHITE } from '@Styles/colors';
import styled, { css } from 'styled-components';

export const ReactiveSquareOuterBox = styled(Box)<{
    width?: string;
    backgroundColor?: string;
    borderRadius?: string;
}>`
    width: ${({ width }) => width || '100%'};
    padding-bottom: 100%;
    background-color: ${({ backgroundColor }) => backgroundColor || WHITE};
    border-radius: ${({ borderRadius }) => borderRadius || '0'};
    position: relative;
`;

export const ReactiveSquareInnerContainer = styled(Container)<{
    padding?: string;
    borderRadius?: string;
    hideOverflow?: boolean;
}>`
    position: absolute;
    ${({ padding }) => css`
        width: calc(100% - (${padding || '0px'} * 2));
        height: calc(100% - (${padding || '0px'} * 2));
    `}
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: ${({ borderRadius }) => borderRadius || '0'};
    overflow: ${({ hideOverflow }) => (hideOverflow ? 'hidden' : 'visible')};
`;
