import { Container } from '@Atoms/Container';
import { RowContainer } from '@Atoms/RowContainer';
import styled, { css } from 'styled-components';

export const WithdrawContainer = styled(Container)`
    padding: 16px;
`;

export const WithdrawTitleContainer = styled(RowContainer)`
    justify-content: start;
`;

export const WithdrawContentContainer = styled(Container)`
    align-items: start;
`;
