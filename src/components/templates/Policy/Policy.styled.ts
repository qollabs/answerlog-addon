import { Container } from '@Atoms/Container';
import { RowContainer } from '@Atoms/RowContainer';
import styled, { css } from 'styled-components';

export const PolicyContainer = styled(Container)`
    padding: 16px;
`;

export const PolicyTitleContainer = styled(RowContainer)`
    justify-content: start;
`;

export const PolicyContentContainer = styled(Container)`
    align-items: start;
`;

export const PolicyContentParagraphContainer = styled(Container)`
    align-items: start;
    gap: 4px;
`;
