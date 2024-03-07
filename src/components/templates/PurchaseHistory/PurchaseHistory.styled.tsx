import { Box } from '@Atoms/Box';
import { Container } from '@Atoms/Container';
import { RowContainer } from '@Atoms/RowContainer';
import { GRAY2 } from '@Styles/colors';
import { WHITE_BACKGROUND } from '@Styles/themes';
import styled from 'styled-components';

export const PurchaseHistoryContainer = styled(Container)``;

export const PurchaseHistoryOrderConatiner = styled(Container)`
    ${WHITE_BACKGROUND}
    padding:16px;
    margin-bottom: 16px;
`;

export const PurchaseHistoryOrderHeadContainer = styled(RowContainer)`
    padding-bottom: 8px;
    border-bottom: 1px solid ${GRAY2};
`;

export const PurchaseHistoryOrderBodyContainer = styled(RowContainer)`
    padding-top: 16px;
    justify-content: flex-start;
`;

export const PurchaseHistoryOrderImageBox = styled(Box)`
    width: 88px;
    min-width: 88px;
    height: 88px;
    border-radius: 4px;
    overflow: hidden;
    position: relative;
    border: 1px solid ${GRAY2};
`;

export const PurchaseHistoryOrderInfoContainer = styled(Container)`
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
