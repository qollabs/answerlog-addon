import { Container } from '@Atoms/Container';
import { RowContainer } from '@Atoms/RowContainer';
import styled, { css } from 'styled-components';

export const HomeContainer = styled(Container)`
    padding: 16px;
`;

export const HomeTitleContainer = styled(RowContainer)`
    justify-content: start;
`;

export const HomeContentContainer = styled(Container)``;

export const HomeInfoContainer = styled(Container)`
    align-items: start;
    gap: 2px;
`;
