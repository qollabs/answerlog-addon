import { Box } from '@Atoms/Box';
import { RowContainer } from '@Atoms/RowContainer';
import { ORANGE2_BACKGROUND } from '@Styles/themes';
import styled, { css } from 'styled-components';

export const TopNavContainer = styled(RowContainer)`
    height: 72px;
    padding: 0 16px;
    align-items: center;
    ${ORANGE2_BACKGROUND}
`;
