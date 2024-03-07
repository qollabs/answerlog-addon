import { Box } from '@Atoms/Box';
import { Container } from '@Atoms/Container';
import { RowContainer } from '@Atoms/RowContainer';
import { ORANGE2 } from '@Styles/colors';
import {
    GRAY1_BACKGROUND,
    GRAY2_BACKGROUND,
    MANDARIN1_BACKGROUND,
    MANDARIN2_BACKGROUND,
    ORANGE1_BACKGROUND,
    ORANGE2_BACKGROUND,
    TEXT_ELLIPSIS,
    TEXT_ELLIPSIS_LINE_CLAMP_3,
} from '@Styles/themes';
import styled, { css } from 'styled-components';

export const ReportDetailContainer = styled(Container)`
    padding: 32px 16px 16px 16px;
    height: 100%;
`;

export const ReportDetailTitleContainer = styled(RowContainer)`
    & > span {
        display: inline-block;
        max-width: 80%;
    }
`;

export const ReportDetailSlideContainer = styled(Container)`
    height: 100%;
    overflow: hidden;

    & .swiper {
        width: 100%;
        height: 100%;
        --swiper-theme-color: ${ORANGE2};
        .swiper-slide {
            height: 90%;
            display: flex;
            align-items: center;
        }
        .swiper-pagination {
        }
    }
`;

export const ReportDetailCardContainer = styled(Container)<{
    isActive?: boolean;
}>`
    ${({ isActive }) =>
        isActive
            ? css`
                  ${MANDARIN2_BACKGROUND}
                  height:100%;
                  & .report-detail-card-content {
                      opacity: 1;
                  }
              `
            : css`
                  ${GRAY2_BACKGROUND}
                  height:80%;
                  & .report-detail-card-content {
                      opacity: 0;
                  }
              `}
    transition:0.3s;
    border-radius: 16px;
    padding: 16px;
`;

export const ReportDetailCardContentContainer = styled(Container)`
    height: 100%;
    overflow-y: overlay;
`;
export const ReportDetailEmptyContainer = styled(Container)`
    height: 100%;
    align-items: center;
    justify-content: center;
`;

export const ReportDetailChoiceContainer = styled(Container)`
    height: 100%;
`;

export const ReportDetailMultipleAnswerContainer = styled(Container)`
    align-items: flex-end;
`;

export const ReportDetailSubjectiveContainer = styled(Container)`
    height: 100%;
`;

export const ReportDetailSubjectiveAnswerContainer = styled(Container)`
    width: 80%;
    align-items: flex-end;
`;

export const ReportDetailSubjectiveAnswerSquare = styled(Container)<{
    spread?: boolean;
}>`
    ${MANDARIN1_BACKGROUND}
    align-items:center;
    justify-content: center;
    padding: 8px 16px;
    border-radius: 16px;
    ${({ spread }) =>
        !spread
            ? css`
                  & > span {
                      ${TEXT_ELLIPSIS_LINE_CLAMP_3}
                  }
              `
            : css``}
`;

export const ReportDetailSubjectiveLikeContainer = styled(RowContainer)`
    justify-content: center;
    align-items: center;
`;
