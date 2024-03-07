import styled from 'styled-components';

import { Box } from '@Atoms/Box';
import { WHITE_BACKGROUND } from '@Styles/themes';
import { Container } from '@Atoms/Container';

export const BaseModalContainer = styled(Box)<{
    height?: string;
}>`
    ${WHITE_BACKGROUND}
    width: 87.5vw;
    max-width: 420px;
    height: ${({ height }) => height || 'fit-content'};
    max-height: 90vh;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 36px 16px;
    border-radius: 8px;
`;

export const BaseModalChildrenContainer = styled(Container)`
    width: 100%;
    overflow: overlay;
`;
