import { Box } from '@Atoms/Box';
import { Container } from '@Atoms/Container';
import { RowContainer } from '@Atoms/RowContainer';
import {
    GRAY0,
    GRAY1,
    GRAY2,
    GRAY3,
    GRAY4,
    GRAY5,
    ORANGE2,
    WHITE,
} from '@Styles/colors';
import {
    GRAY1_BACKGROUND,
    ORANGE0_BACKGROUND,
    ORANGE2_BACKGROUND,
    WHITE_BACKGROUND,
} from '@Styles/themes';
import styled, { css, keyframes } from 'styled-components';

export const MallDetailContainer = styled(Container)`
    padding: 16px;
    padding-bottom: 0;
`;

export const MallDetailMainContainer = styled(Container)`
    ${WHITE_BACKGROUND}
    padding: 16px;
    border-radius: 22px;
`;

export const MallDetailMainTitleContainer = styled(Container)`
    align-items: flex-start;
`;

export const MallDetailMainPriceContainer = styled(RowContainer)`
    justify-content: flex-start;
`;

export const MallDetailSlideBox = styled.div`
    width: 100%;
    border-radius: 10px;
    overflow: hidden;
    .swiper {
        width: 100%;
        --swiper-theme-color: ${ORANGE2};
        .swiper-slide {
            width: 100%;
        }
    }
`;

export const MallDetailSlideImage = styled.div<{ backgroundUrl: string }>`
    width: 100%;
    padding-bottom: 100%;
    border-radius: 10px;
    background-image: url(${({ backgroundUrl }) => backgroundUrl});
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
`;

export const MallDetailMainContentContainer = styled(Container)`
    padding: 16px 0;
    padding-bottom: 0;
    align-items: flex-start;
`;

export const MallDetailMainChipContainer = styled(RowContainer)`
    width: 100%;
    justify-content: flex-start;
    overflow: overlay;
`;

export const MallDetailMainChip = styled(Box)`
    justify-content: center;
    align-items: center;
    padding: 7px 12px;
    border-radius: 16px;
    margin-right: 8px;
    ${ORANGE0_BACKGROUND}
    white-space: nowrap;
`;

export const MallDetailMenuContainer = styled(RowContainer)`
    width: 100%;
    border-bottom: 2px solid ${ORANGE2};
`;

export const MallDetailMenu = styled(Box)<{ selected: boolean }>`
    width: 50%;
    justify-content: center;
    align-items: center;
    padding: 18px 0;
    border-radius: 6px 6px 0 0;
    background-color: ${({ selected }) => (selected ? ORANGE2 : GRAY0)};
    span {
        color: ${({ selected }) => (selected ? WHITE : GRAY5)};
    }
`;

export const MallDetailDetailContainer = styled(Container)<{
    spreadDetailPage: boolean;
}>`
    width: 100%;
    position: relative;
    ${({ spreadDetailPage }) =>
        !spreadDetailPage &&
        css`
            max-height: 600px;
            overflow: hidden;
        `}
`;
export const MallDetailDetailButtonContainer = styled(Container)<{
    spreadDetailPage: boolean;
}>`
    background-color: rgba(252, 249, 244, 0.6);
    padding: 8px 16px;
    ${({ spreadDetailPage }) =>
        !spreadDetailPage &&
        css`
            position: absolute;
            bottom: 0;
            z-index: 666;
            box-shadow: 0 0 8px 8px rgba(252, 249, 244, 0.6);
        `}
`;

export const MallDetailPageImage = styled.img`
    width: 100%;
`;

export const MallDetailInfoContainer = styled(Container)`
    width: 100%;
    padding: 0 16px;
`;

export const MallDetailInfoRow = styled(RowContainer)`
    & > *:first-child {
        flex: 3;
    }
    & > *:last-child {
        flex: 7;
    }
    align-items: flex-start;
`;

export const MallDetailModalRow = styled(RowContainer)`
    & > *:first-child {
        flex: 3.5;
    }
    & > *:last-child {
        flex: 6.5;
        align-items: flex-start;
    }
    align-items: flex-start;
`;

export const MallDetailPurchaseButtonContainer = styled(RowContainer)`
    position: sticky;
    max-width: 420px;
    bottom: 0;
    padding: 16px 0;
    z-index: 777;
    ${ORANGE0_BACKGROUND}
`;
const selectOpen = keyframes`
    0%{
        border-radius : 30px;
        max-height:56px;
    }
    30%{
        border-radius: 20px;
        max-height:56px;
    }
    100%{
        max-height:300px;
    }
`;
const selectClose = keyframes`
    0%{
        border-radius : 20px;
        max-height:300px;
    }
    70%{
        border-radius: 20px;
        max-height:56px;
    }
    100%{
        border-radius: 30px;
    }
`;
export const MallDetailDrawerOptionContainer = styled.div<{
    enableSelect: boolean;
}>`
    width: 100%;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    border-radius: ${({ enableSelect }) => (!enableSelect ? `30px` : `20px`)};
    margin-bottom: 8px;
    transition: 0.5s;
`;

export const MallDetailOptionButtonBox = styled.div`
    width: 100%;
    min-height: 56px;
    height: 56px;
    padding: 0 18px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    ${ORANGE2_BACKGROUND}

    span {
        color: ${WHITE};
    }
`;

export const MallDetailDrawerSelectContainer = styled(Container)<{
    enableSelect: boolean;
}>`
    padding: ${({ enableSelect }) => (!enableSelect ? `0` : `16px`)};
    ${ORANGE0_BACKGROUND}
    overflow:overlay;
    max-height: ${({ enableSelect }) => (!enableSelect ? `0px` : `160px`)};
    transition: 0.5s;
`;

export const MallDetailDrawerSelectBox = styled(Box)`
    width: 100%;
    height: 56px;
    justify-content: flex-start;
    align-items: center;
    ${WHITE_BACKGROUND}
    padding: 16px;
    border: 1px solid ${ORANGE2};
    box-sizing: border-box;
    border-radius: 30px;
    margin-bottom: 8px;
    :last-child {
        margin-bottom: 0;
    }
`;

export const MallDetailDrawerSelectedContainer = styled(RowContainer)`
    width: 100%;
    height: 56px;
    padding: 0 16px;
    justify-content: space-between;
    align-items: center;
    border: 1px solid ${ORANGE2};
    border-radius: 30px;
    box-sizing: border-box;
    margin-bottom: 8px;
    :last-child {
        margin-bottom: 0;
    }
    overflow: hidden;
`;

export const MallDetailQuantityContainer = styled(RowContainer)`
    width: 80px;
    min-width: 80px;
    justify-content: space-between;
    ${GRAY1_BACKGROUND}
    padding:2px;
    border-radius: 14px;
`;

export const MallDetailSumUpContainer = styled(RowContainer)`
    justify-content: space-between;
    padding: 0 16px;
`;

export const MallDetailSumUpInnerContainer = styled(RowContainer)`
    width: fit-content;
`;

export const MallDetailPurchaseContainer = styled(RowContainer)``;

export const MallDetailCheckContainer = styled(Container)`
    span {
        text-align: center;
    }
`;

export const MallDetailModalButtonContainer = styled(RowContainer)``;
