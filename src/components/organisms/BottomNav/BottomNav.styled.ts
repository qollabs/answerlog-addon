import { RowContainer } from '@Atoms/RowContainer';
import { GRAY3, ORANGE2 } from '@Styles/colors';
import { Caption1 } from '@Styles/fonts';
import { WHITE_BACKGROUND } from '@Styles/themes';
import styled from 'styled-components';

export const BottomNavWrapper = styled(RowContainer)`
    justify-content: space-around;
    height: 80px;
    padding-bottom: 16px;
    ${WHITE_BACKGROUND}
    box-shadow: 0px -10px 10px rgba(0, 0, 0, 0.05);
`;

export const BottomNavButton = styled.div<{ active?: boolean }>`
    cursor: pointer;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    /* gap: 4px; */
    width: 64px;
    height: 64px;
    ${Caption1}
    color: ${({ active }) => (active ? ORANGE2 : GRAY3)};
    svg {
        path {
            fill: ${({ active }) => (active ? ORANGE2 : GRAY3)};
        }
    }
`;
