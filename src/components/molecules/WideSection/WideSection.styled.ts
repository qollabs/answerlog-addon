import { Box } from '@Atoms/Box';
import { Container } from '@Atoms/Container';
import { ORANGE2 } from '@Styles/colors';
import { WHITE_BACKGROUND } from '@Styles/themes';
import styled from 'styled-components';

export const WideSectionContainer = styled(Container)<{ height?: string }>`
    padding: 22px 16px;
    height: ${({ height }) => height || 'fit-content'};
    ${WHITE_BACKGROUND}
`;

export const WideSectionTitleBox = styled(Box)`
    width: 100%;
    padding-bottom: 22px;
    border-bottom: 2px solid ${ORANGE2};
    margin-bottom: 16px;
    align-items: flex-start;
    justify-content: flex-start;
`;
export const WideSectionContentContainer = styled(Container)``;
