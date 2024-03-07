// import { Container } from '@Atoms/Container';
// import { RowContainer } from '@Atoms/RowContainer';
// import { ORANGE2 } from '@Styles/colors';
// import {
//     GRAY2_BACKGROUND,
//     MANDARIN2_BACKGROUND,
//     ORANGE_UNSELECTED_BACKGROUND,
// } from '@Styles/themes';
import styled, { css } from 'styled-components';

// export const ReportDetailContainer = styled(Container)`
//     padding: 32px 0;
//     height: 100%;
// `;

// export const ReportDetailHeaderContainer = styled(RowContainer)`
//     padding: 0 16px;
//     & > div > span {
//         white-space: nowrap;
//     }
// `;
// // overflow:scroll 관련 컴포넌트의 부모중에 overflow:hidden이 어딘가에는 있어야 height가 %로 지정되었을 때 고정값이 된다.
// export const ReportDetailContentContainer = styled(Container)`
//     height: 100%;
//     padding-top: 32px;
//     overflow: hidden;
//     .swiper {
//         width: 100%;
//         height: 100%;
//         --swiper-theme-color: ${ORANGE2};
//         .swiper-slide {
//             .report-detail-card-flip {
//                 width: 100%;
//                 height: 100%;
//             }
//         }
//         .swiper-pagination {
//         }
//     }
// `;

// export const ReportDetailCardFront = styled(Container)<{ isActive: boolean }>`
//     width: 100%;
//     ${({ isActive }) =>
//         isActive
//             ? css`
//                   height: 86%;
//                   ${ORANGE_UNSELECTED_BACKGROUND}
//               `
//             : css`
//                   height: 70%;
//                   transform: translateY(10%);
//                   ${GRAY2_BACKGROUND}
//               `}
//     justify-content: center;
//     border-radius: 16px;
//     overflow: hidden;
//     transition: 0.2s;
// `;

// export const ReportDetailCardBack = styled(Container)<{ isActive: boolean }>`
//     width: 100%;
//     ${({ isActive }) =>
//         isActive
//             ? css`
//                   height: 86%;
//                   max-height: 86%;
//                   ${MANDARIN2_BACKGROUND}
//                   overflow-y:auto;
//                   overflow-x: hidden;
//               `
//             : css`
//                   height: 70%;
//                   transform: translateY(10%);
//                   ${GRAY2_BACKGROUND}
//                   overflow:hidden;
//               `}
//     border-radius: 16px;
//     justify-content: flex-start;
//     padding: 16px;
// `;
