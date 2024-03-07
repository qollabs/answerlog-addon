import { Box } from '@Atoms/Box';
import { Container } from '@Atoms/Container';
import { RowContainer } from '@Atoms/RowContainer';
import { GRAY0, GRAY2, GRAY3, ORANGE2, WHITE } from '@Styles/colors';
import { ORANGE2_BACKGROUND, WHITE_BACKGROUND } from '@Styles/themes';
import styled, { css } from 'styled-components';

export const PHDetailContainer = styled(Container)``;

export const PHDetailSectionContainer = styled(Container)`
    ${WHITE_BACKGROUND}
    padding:16px;
`;

export const PHDetailOrderIdContainer = styled(RowContainer)`
    justify-content: flex-start;
`;

export const PHDetailProgressBarContainer = styled(RowContainer)`
    justify-content: center;
    position: relative;
`;

export const PHDetailCancelInfoContainer = styled(Container)``;

export const PHDetailCancelInfoRow = styled(RowContainer)`
    justify-content: flex-start;
`;

export const PHDetailSectionTitleContainer = styled(Container)`
    padding-bottom: 16px;
    align-items: flex-start;
`;

export const PHDetailContentsContainer = styled(Container)`
    padding: 16px 0;
    align-items: flex-start;
`;

export const PHDetailGiftContainer = styled(RowContainer)`
    padding-bottom: 8px;
    border-bottom: 1px solid ${GRAY3};
    margin-bottom: 8px;
    &:last-child {
        margin: 0;
    }
`;

export const PHDetailImageBox = styled(Box)`
    width: 80px;
    height: 80px;
    border: 1px solid ${GRAY0};
    border-radius: 8px;
    position: relative;
    overflow: hidden;
`;
export const PHDetailGiftInfoContainer = styled(Container)`
    align-items: flex-end;
    & > span {
        display: inline-block;
        max-width: 200px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
`;
export const PHDetailLocationContainer = styled(Container)`
    align-items: flex-start;
    & span {
        margin-bottom: 8px;
    }
`;

export const PHDetailPriceContainer = styled(RowContainer)`
    justify-content: space-between;
`;

export const PHDetailAccountContainer = styled(RowContainer)``;
export const PHDetailBankSelectButton = styled.div`
    cursor: pointer;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 56px;
    padding: 0px 8px;
    border: 1px solid ${GRAY3};
    border-radius: 8px;
    color: ${GRAY2};
    svg {
        path {
            fill: ${GRAY2};
        }
    }
`;

export const PHDetailBankCodeContainer = styled(RowContainer)`
    width: 100%;
    justify-content: flex-start;
    flex-wrap: wrap;
`;

export const PHDetailBankCodeBox = styled(Box)<{ chosen: boolean }>`
    width: 33%;
    height: 40px;
    padding: 4px;
    justify-content: center;
    align-items: center;
    border-left: 1px solid ${ORANGE2};
    border-bottom: 1px solid ${ORANGE2};
    & > span {
        text-align: center;
    }
    &:nth-child(-n + 3) {
        border-top: 1px solid ${ORANGE2};
    }
    &:nth-child(3n) {
        border-right: 1px solid ${ORANGE2};
    }
    &:last-child {
        border-right: 1px solid ${ORANGE2};
    }
    ${({ chosen }) =>
        chosen &&
        css`
            ${ORANGE2_BACKGROUND}
            span {
                color: ${WHITE};
            }
        `}
`;

export const PHDetailCancelButtonContainer = styled(RowContainer)``;

export const PHDetailCancelAlertContainer = styled(RowContainer)`
    justify-content: flex-start;
    align-items: flex-start;
`;
export const PHDetailIconBox = styled(Box)`
    width: 16px;
    height: 16px;
    border-radius: 100%;
    ${ORANGE2_BACKGROUND}
    justify-content:center;
    align-items: center;
`;

export const PHDetailCancelTextContainer = styled(Container)`
    align-items: flex-start;
`;

export const PHDetailModalButtonContainer = styled(RowContainer)``;
