import styled, { css } from 'styled-components';

import { Container } from '@Atoms/Container';
import { GRAY2, ORANGE2, WHITE } from '@Styles/colors';
import { RowContainer } from '@Atoms/RowContainer';
import {
    GRAY1_BACKGROUND,
    TEXT_ELLIPSIS,
    WHITE_BACKGROUND,
} from '@Styles/themes';
import { Box } from '@Atoms/Box';

// MallNav start

export const MallNavContainer = styled(RowContainer)``;

export const MallMenuButton = styled.div<{ selected?: boolean }>`
    width: 28%;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 12px 0;
    opacity: 0.4;
    ${({ selected }) =>
        selected &&
        css`
            box-shadow: 0 4px 0px -2px ${ORANGE2};
            color: ${ORANGE2};
            opacity: 1;
        `};
`;
// MallNav end

export const MallContainer = styled(Container)`
    height: 100%;
`;

// MallRecommended start

export const MallRecommendedContainer = styled(Container)`
    height: 100%;
    & > .swiper {
        width: 100%;
        height: 100%;
        --swiper-theme-color: ${ORANGE2};
        .swiper-slide {
            padding: 16px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
        }
        .swiper-pagination {
        }
    }
`;
// MallRecommended end

// MallInterested start

export const MallInterestedContainer = styled(RowContainer)`
    padding: 16px;
    flex-wrap: wrap;
    align-items: flex-start;
    min-height: 100%;
`;

export const MallInterestedEmptyContainer = styled(Container)`
    height: 100%;
    justify-content: center;
    padding: 16px;
`;

export const MallInterestedGiftContainer = styled(Container)`
    width: 48%;
    border-radius: 4px;
    ${WHITE_BACKGROUND}
    margin-bottom:16px;
    &:nth-last-child(2),
    &:last-child {
        margin-bottom: 0;
    }
    overflow: hidden;
`;

export const MallInterestedGiftContentContainer = styled(RowContainer)`
    align-items: flex-start;
    padding: 8px;
`;

export const MallInterestedGiftTextContainer = styled(Container)`
    align-items: flex-start;
    overflow: hidden;
    & > span {
        max-width: 70%;
        ${TEXT_ELLIPSIS}
    }
`;

// MallInterested end

// MallCart start
export const MallCartContainer = styled(Container)`
    height: 100%;
    overflow: overlay;
`;
export const MallCartEmptyContainer = styled(Container)`
    height: 100%;
    justify-content: center;
    align-items: center;
    padding: 32px;
    span {
        text-align: center;
    }
`;

export const MallCartHeaderContainer = styled(RowContainer)`
    padding: 16px;
    justify-content: space-between;
    ${WHITE_BACKGROUND}
    border-bottom:2px solid ${ORANGE2}
`;

export const MallCartTextBorderBox = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: fit-content;
    height: fit-content;
    padding: 4px;
    border: 1px solid ${GRAY2};
    border-radius: 4px;
`;

export const MallCartBodyContainer = styled(Container)``;

export const MallCartItemContainer = styled(Container)`
    align-items: flex-start;
    ${WHITE_BACKGROUND}
    padding:16px;
    margin-bottom: 10px;
    position: relative;
`;

export const MallCartItemSoldoutContainer = styled(Container)`
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
export const MallCartItemSoldoutButtonContainer = styled(RowContainer)`
    justify-content: center;
`;

export const MallCartItemContentContainer = styled(RowContainer)`
    justify-content: space-between;
`;

export const MallCartItemLeftContainer = styled(Container)`
    width: 118px;
    align-items: flex-start;
`;

export const MallCartItemImageBox = styled.div`
    width: 118px;
    height: 118px;
    border-radius: 28px;
    overflow: hidden;
    position: relative;
    border: 1px solid ${GRAY2};
`;

export const MallCartItemQuantityContainer = styled(RowContainer)`
    width: 118px;
    justify-content: space-between;
    ${GRAY1_BACKGROUND}
    padding: 2px;
    border-radius: 28px;
`;

export const MallCartItemRightContainer = styled(Container)`
    height: 100%;
    align-items: flex-end;
    justify-content: space-between;
`;

export const MallCartItemDetailContainer = styled(Container)`
    align-items: flex-end;
`;

export const MallCartItemPurchaseContainer = styled(RowContainer)`
    align-items: flex-end;
`;

export const MallCartSumupContainer = styled(Container)`
    ${WHITE_BACKGROUND}
    border-top: 2px solid ${ORANGE2};
    padding: 16px;
`;

export const MallCartSumupDetailContainer = styled(Container)`
    padding-bottom: 16px;
    border-bottom: 1px solid ${GRAY2};
    align-items: flex-start;
`;

export const MallCartSumupDetailInnerContainer = styled(RowContainer)``;

export const MallCartSumupTotalContainer = styled(RowContainer)`
    padding: 22px 0;
    border-bottom: 1px solid ${GRAY2};
`;

export const MallCartSelectedPurchaseBox = styled(Box)`
    ${WHITE_BACKGROUND}
    width: 100%;
    padding: 16px;
    position: sticky;
    bottom: 0;
    left: 0;
`;

export const MallCartModalContainer = styled(Container)`
    span {
        text-align: center;
    }
`;

// MallCart end
