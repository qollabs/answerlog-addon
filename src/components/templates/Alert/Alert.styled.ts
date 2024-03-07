import { Box } from '@Atoms/Box';
import { Container } from '@Atoms/Container';
import { RowContainer } from '@Atoms/RowContainer';
import { ABSOLUTE_CENTER, ORANGE_UNSELECTED_BACKGROUND } from '@Styles/themes';
import styled from 'styled-components';

export const AlertContainer = styled(Container)`
    padding: 56px 16px;
`;

export const AlertSubContainer = styled(Container)`
    margin-bottom: 64px;
    &:last-child {
        margin-bottom: 0;
    }
`;

export const AlertTitleContainer = styled(Container)`
    align-items: flex-start;
`;
export const AlertContentContainer = styled(RowContainer)`
    padding: 4px 0;
    height: fit-content;
    margin-bottom: 24px;
    &:last-child {
        margin-bottom: 0;
    }
`;

export const AlertIconBox = styled(Box)`
    width: 56px;
    min-width: 56px;
    height: 56px;
    border-radius: 16px;
    ${ORANGE_UNSELECTED_BACKGROUND}
    position: relative;
    margin-right: 12px;
    & > svg {
        ${ABSOLUTE_CENTER}
    }
`;

export const AlertContentTextContainer = styled(Container)`
    height: fit-content;
    padding: 4px 0;
    align-items: flex-start;
    justify-content: space-between;
`;
