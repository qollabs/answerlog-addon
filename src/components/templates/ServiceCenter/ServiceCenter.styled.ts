import styled from 'styled-components';

import { Container } from '@Atoms/Container';
import { WHITE_BACKGROUND } from '@Styles/themes';
import { RowContainer } from '@Atoms/RowContainer';

export const ServiceCenterWrapper = styled(Container)`
    height: 100%;
    padding: 16px;
`;

export const ServiceCenterContainer = styled(Container)`
    align-items: flex-start;
    /* gap: 16px; */
    ${WHITE_BACKGROUND}
    padding: 16px;
    border-radius: 8px;
`;

export const ServiceCenterLinkContainer = styled(RowContainer)`
    justify-content: flex-start;
`;
