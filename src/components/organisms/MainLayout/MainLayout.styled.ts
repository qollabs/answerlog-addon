import styled from 'styled-components';

import { Container } from '@Atoms/Container';
import { WHITE_BACKGROUND, YELLOW1_BACKGROUND } from '@Styles/themes';

export const MainLayoutWrapper = styled(Container)`
    justify-content: space-between;
    height: 100%;
`;

export const MainLayoutContainer = styled(Container)<{
    whiteBackground?: boolean;
}>`
    justify-content: flex-start;
    flex: 1;
    overflow-y: overlay;
    overflow-x: hidden;
    ${({ whiteBackground }) =>
        whiteBackground ? WHITE_BACKGROUND : YELLOW1_BACKGROUND}
`;

export const BottomButtonContainer = styled(Container)`
    /* gap: 16px; */
    padding: 16px 40px 48px 40px;
`;
