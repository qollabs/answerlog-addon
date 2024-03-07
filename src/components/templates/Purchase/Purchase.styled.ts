import { Box } from '@Atoms/Box';
import { Container } from '@Atoms/Container';
import { RowContainer } from '@Atoms/RowContainer';
import { Text } from '@Atoms/Typography';
import {
    BLACK,
    GRAY0,
    GRAY1,
    GRAY2,
    GRAY3,
    GRAY4,
    GRAY5,
    ORANGE2,
    WHITE,
    colorPicker,
} from '@Styles/colors';
import { TextSizePreferenceType, textSizePicker } from '@Styles/fonts';
import { ORANGE2_BACKGROUND, WHITE_BACKGROUND } from '@Styles/themes';
import { TextSizePrefType } from '@Types/types';
import styled, { css, keyframes } from 'styled-components';

export const PurchaseContainer = styled(Container)``;

export const PurchaseGiftContainer = styled(RowContainer)`
    padding: 16px 0;
    border-top: 1px solid ${GRAY1};
    position: relative;
    &:first-child {
        border: 0;
        padding-top: 0;
    }
`;
export const PurchaseGiftSoldoutContainer = styled(Container)`
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 1;
    justify-content: center;
    align-items: center;
    background-color: rgba(43, 41, 38, 0.7);
    & * {
        color: ${WHITE};
    }
`;

export const PurchaseGiftImageBox = styled(Box)`
    min-width: 118px;
    height: 118px;
    border-radius: 28px;
    overflow: hidden;
    position: relative;
    border: 1px solid ${GRAY2};
`;

export const PurchaseGiftRightContainer = styled(Container)`
    height: 100%;
    align-items: flex-end;
    justify-content: space-between;
    /* option length */
    & > span > span > span {
        display: inline-block;
        max-width: 120px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
`;

export const PurchaseGiftInfoContaier = styled(Container)`
    align-items: flex-end;
    /* name length */
    & > span {
        display: inline-block;
        max-width: 204px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
`;

export const PurchaseGiftCaretContainer = styled(RowContainer)`
    justify-content: center;
    align-items: center;
    padding: 2px 0;
`;

export const PurchasePointContainer = styled(RowContainer)`
    justify-content: flex-start;
`;

export const PurchasePointIconBox = styled(Box)`
    width: 16px;
    height: 16px;
    border-radius: 100%;
    ${ORANGE2_BACKGROUND}
    justify-content:center;
    align-items: center;
`;

export const PurchaseSumupTitleContainer = styled(RowContainer)`
    padding-bottom: 20px;
    justify-content: space-between;
`;

export const PurchaseSumupContentsContainer = styled(Container)``;

export const PurchaseSumupCaretContainer = styled(RowContainer)`
    width: fit-content;
`;

export const PurcahseSumupDetailContainer = styled(Container)`
    padding: 16px 0;
`;
export const PurchaseSumupDetailRowContainer = styled(RowContainer)`
    justify-content: space-between;
`;

export const PurchaseAgreementContainer = styled(Container)``;

export const PurchaseAgreementMainContainer = styled(RowContainer)`
    padding: 16px 0;
    justify-content: flex-start;
    align-items: center;
`;

export const PurchaseAgreementSubContainer = styled(RowContainer)`
    justify-content: flex-start;
    align-items: center;
`;

export const PurchaseSubmitBox = styled(Box)<{ isInputFocused: boolean }>`
    ${WHITE_BACKGROUND}
    width: 100%;
    padding: 16px;
    ${({ isInputFocused }) =>
        !isInputFocused &&
        css`
            position: sticky;
            bottom: 0;
            left: 0;
        `}
`;

export const PurchaseModalContainer = styled(Container)`
    span {
        text-align: center;
    }
`;
