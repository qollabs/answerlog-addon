import styled, { css } from 'styled-components';

import { RowContainer } from '@Atoms/RowContainer';
import { Box } from '@Atoms/Box';
import { Heading2 } from '@Styles/fonts';
import { WHITE_BACKGROUND, YELLOW1_BACKGROUND } from '@Styles/themes';
import { Container } from '@Atoms/Container';

export const TopNavWrapper = styled(Container)<{
    whiteBackground?: boolean;
}>`
    position: relative;
    box-shadow: 0px 10px 10px rgba(0, 0, 0, 0.03);
    z-index: 999;
    ${({ whiteBackground }) =>
        whiteBackground ? WHITE_BACKGROUND : YELLOW1_BACKGROUND}
`;

export const TopNavMainContainer = styled(RowContainer)`
    padding: 16px;
    min-height: 72px;
    height: 72px;
`;

export const TopNavTitleBox = styled(Box)`
    align-items: center;
    /* gap: 8px; */
    ${Heading2}
`;

export const TopNavIconContainer = styled(RowContainer)`
    width: fit-content;
    gap: 16px;
`;

export const TopNavButton = styled.button<{ active: boolean }>`
    display: flex;
    flex-direction: column;
    width: fit-content;
    align-items: center;
    ${({ active }) =>
        !active &&
        css`
            opacity: 0;
            pointer-events: none;
        `}
`;
