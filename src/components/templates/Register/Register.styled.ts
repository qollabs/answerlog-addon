import styled from 'styled-components';

import { Container } from '@Atoms/Container';
import { YELLOW1_BACKGROUND } from '@Styles/themes';

export const RegisterContainer = styled(Container)`
    justify-content: space-between;
    height: 100%;
`;

export const RegisterHeadContainer = styled(Container)`
    align-items: flex-start;
    padding: 16px 32px;
    /* gap: 12px; */
`;

export const RegisterContentContainer = styled(Container)`
    justify-content: flex-start;
    /* gap: 32px; */
    flex: 1;
    padding: 16px 40px;
    align-items: flex-start;
`;

export const TextSizeButtonContainer = styled(Container)`
    /* gap: 16px; */
`;

export const TextSizeSelectContainer = styled(Container)`
    justify-content: flex-start;
    /* gap: 32px; */
    flex: 1;
    padding: 0px 32px 32px 32px;
`;

export const TextSizeExampleBox = styled(Container)`
    justify-content: center;
    height: 80px;
    padding: 16px 32px;
    ${YELLOW1_BACKGROUND}
`;
