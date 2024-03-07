import styled, { keyframes } from 'styled-components';

import { Container } from '@Atoms/Container';
import { ABSOLUTE_COVER, WHITE_BACKGROUND } from '@Styles/themes';
import { RowContainer } from '@Atoms/RowContainer';
import { GRAY2 } from '@Styles/colors';
import { Box } from '@Atoms/Box';

export const CouponContainer = styled(Container)`
    padding: 16px;
`;

export const CouponEachContainer = styled(Container)`
    ${WHITE_BACKGROUND}
    padding:16px;
    margin-bottom: 16px;
    position: relative;
`;

export const CouponEachBlockContainer = styled(Container)`
    background-color: rgba(43, 41, 38, 0.7);
    & > span {
        color: white;
    }
    ${ABSOLUTE_COVER}
    z-index:333;
    justify-content: center;
`;

export const CouponEachHeadContainer = styled(RowContainer)`
    padding-bottom: 8px;
    border-bottom: 1px solid ${GRAY2};
`;

export const CouponEachBodyContainer = styled(RowContainer)`
    padding-top: 16px;
    justify-content: flex-start;
`;

export const CouponEachImageBox = styled(Box)`
    width: 88px;
    min-width: 88px;
    height: 88px;
    border-radius: 4px;
    overflow: hidden;
    position: relative;
    border: 1px solid ${GRAY2};
`;

export const CouponEachInfoContainer = styled(Container)`
    align-items: flex-start;
    overflow: hidden;
    & span {
        display: inline-block;
        max-width: 220px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
`;
