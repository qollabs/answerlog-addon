import styled, { keyframes } from 'styled-components';

import { Container } from '@Atoms/Container';
import { RowContainer } from '@Atoms/RowContainer';
import { Box } from '@Atoms/Box';
import { ORANGE2_BACKGROUND, WHITE_BACKGROUND } from '@Styles/themes';
import { TextSizePrefType } from '@Types/types';

export const FreeGiftContainer = styled(Container)``;

export const FreeGiftGiftCardContainer = styled(Container)`
    padding: 0 16px;
`;

export const FreeGiftNoRefundContainer = styled(RowContainer)`
    justify-content: flex-start;
`;

export const FreeGiftExclamationIcon = styled(Box)<{
    textSizePref: TextSizePrefType;
}>`
    width: ${({ textSizePref }) => iconSizePicker(textSizePref)};
    height: ${({ textSizePref }) => iconSizePicker(textSizePref)};
    align-items: center;
    justify-content: center;
    border-radius: 20px;
    ${ORANGE2_BACKGROUND}
`;

const iconSizePicker = (textSizePref: TextSizePrefType) => {
    switch (textSizePref) {
        case 'v0':
            return '18px';
        case 'v2':
            return '14px';
        case 'v1':
        default:
            return '16px';
    }
};

export const FreeGiftDetailImageContainer = styled(Container)<{
    spread: boolean;
}>`
    width: 100%;
    height: ${({ spread }) => (spread ? 'fit-content' : '100%')};
    overflow: ${({ spread }) => (spread ? 'visible' : 'hidden')};
    padding-bottom: ${({ spread }) => (spread ? '64px' : 'hidden')};
    position: relative;
`;

export const FreeGiftSpreadButtonBox = styled(Box)`
    width: 100%;
    height: auto;
    padding: 8px;
    position: absolute;
    bottom: 0;
    left: 0;
    background-color: (0, 0, 0, 0.1);
    backdrop-filter: blur(2px);
    box-shadow: 0 -10px 10px rgba(255, 255, 255, 0.2);
`;
