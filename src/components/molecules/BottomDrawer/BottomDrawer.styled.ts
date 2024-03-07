import styled, { css, keyframes } from 'styled-components';

import { Container } from '@Atoms/Container';
import {
    GRAY4_BACKGROUND,
    MANDARIN1_BACKGROUND,
    MANDARIN2_BACKGROUND,
    ORANGE0_BACKGROUND,
    ORANGE1_BACKGROUND,
    WHITE_BACKGROUND,
} from '@Styles/themes';
import { MANDARIN2, ORANGE1 } from '@Styles/colors';

const drawUp = keyframes`
    0%{
        bottom: -64vh;
        opacity: 0.3;
    }
    100%{
        bottom: 0px;
        opacity: 1;
    }
`;

const drawDown = keyframes`
0%{
    bottom: 0px;
    opacity: 1;
}
100%{
    bottom: -64vh;
    opacity: 0.3;
}
`;

export const DrawerContainer = styled(Container)<{
    height?: string;
    show: boolean;
    changedHeight?: string;
}>`
    width: 100%;
    max-width: 420px;
    min-height: ${({ height, changedHeight }) =>
        changedHeight ? '0px' : height || '36vh'};
    max-height: ${({ height }) => height || '64vh'};
    height: ${({ changedHeight }) => changedHeight && changedHeight};
    padding: 0 16px 32px 16px;
    border-radius: 16px 16px 0px 0px;
    ${WHITE_BACKGROUND}
    position: fixed;
    bottom: ${({ show }) => (show ? '0px' : '-64vh')};
    overflow-y: hidden;
    ${({ show }) =>
        show
            ? css`
                  animation: ${drawUp} 0.3s linear;
              `
            : css`
                  animation: ${drawDown} 0.1s linear;
              `}
`;
export const DragBarContainer = styled(Container)`
    width: fit-content;
`;

// export const DrawerContainer = styled(Container)<{
//     height?: string;
//     show: boolean;
//     changedHeight?: string;
// }>`
//     width: 100%;
//     max-width: 420px;
//     min-height: ${({ height, changedHeight }) =>
//         changedHeight ? '0px' : height || '36vh'};
//     max-height: ${({ height }) => height || '64vh'};
//     height: ${({ changedHeight }) => changedHeight && changedHeight};
//     padding: 0 16px 32px 16px;
//     border-radius: 16px 16px 0px 0px;
//     ${WHITE_BACKGROUND}
//     position: fixed;
//     bottom: ${({ show }) => (show ? '0px' : '-64vh')};
//     ${({ show }) =>
//         show
//             ? css`
//                   animation: ${drawUp} 0.3s linear;
//               `
//             : css`
//                   animation: ${drawDown} 0.1s linear;
//               `}
// `;
// export const DragBarContainer = styled(Container)`
//     width: fit-content;
// `;

export const DrawerBar = styled.div`
    ${GRAY4_BACKGROUND}
    width: 168px;
    height: 4px;
    border-radius: 4px;
`;
export const DrawerChildrenContainer = styled(Container)`
    height: 100%;
    overflow-y: overlay;
    padding: 0 4px;
    scrollbar-width: 4px;
    -webkit-scrollbar-width: 4px;
    scrollbar-color: ${MANDARIN2} ${ORANGE1};
    &::-webkit-scrollbar {
        width: 4px;
    }
    &::-webkit-scrollbar-thumb {
        border-radius: 4px;
        ${MANDARIN2_BACKGROUND}
    }

    &::-webkit-scrollbar-track {
        border-radius: 4px;
        ${ORANGE1_BACKGROUND}
    }
`;
