import styled from 'styled-components';

import { Container } from '@Atoms/Container';
import {
    GRAY0_BACKGROUND,
    ORANGE2_BACKGROUND,
    TEXT_ELLIPSIS,
} from '@Styles/themes';
import { Box } from '@Atoms/Box';
import { RowContainer } from '@Atoms/RowContainer';
import { Text } from '@Atoms/Typography';
import { GRAY1 } from '@Styles/colors';

export const MypageContainer = styled(Container)`
    padding: 16px;
`;

// export const MypageBirthTextContainer = styled(RowContainer)<{
//     disabled?: boolean;
//     isFocused?: boolean;
// }>`
//     padding: 16px 8px;
//     border: 1px solid ${GRAY2};
//     border-radius: 8px;
//     border-color: ${({ isFocused }) => isFocused && ORANGE2};
//     ${({ disabled }) =>
//         disabled &&
//         css`
//             ${GRAY2_BACKGROUND}
//             opacity: 0.4;
//         `}
// `;

export const MypageInfoErrorText = styled(Text)`
    align-self: start;
`;

export const MypageOrderInfoEmptyBox = styled(Box)`
    padding: 16px 0;
`;

export const MypageOrderInfoContainer = styled(RowContainer)`
    padding: 10px 16px;
    border-radius: 8px;
    ${GRAY0_BACKGROUND}
    margin-bottom:10px;
`;

export const MypageOrderInfoTextContainer = styled(Container)`
    align-items: flex-start;
`;

export const MypageOrderInfoTextRow = styled(RowContainer)`
    display: inline-flex;
    width: fit-content;
    justify-content: flex-start;
    & > span {
        max-width: 180px;
        ${TEXT_ELLIPSIS}
    }
`;

export const MypageOrderInfoImageBox = styled(Box)`
    min-width: 60px;
    height: 60px;
    border-radius: 50%;
    overflow: hidden;
    position: relative;
`;

export const MypageOrderInfoSumupTextBox = styled(Text)`
    display: inline-flex;
    width: 100%;
    justify-content: flex-end;
`;

export const MypageUserSettingTitleBox = styled(Box)`
    width: 100%;
    align-items: flex-start;
`;

export const MypageUserSettingContainer = styled(RowContainer)`
    padding: 16px;
    justify-content: center;
    align-items: flex-end;
    border: 1px solid ${GRAY1};
    border-radius: 8px;
`;

export const MypageCashPointContainer = styled(RowContainer)`
    justify-content: flex-start;
    align-items: center;
`;

export const MypageCashPointIconBox = styled(Box)`
    width: 16px;
    height: 16px;
    border-radius: 100%;
    ${ORANGE2_BACKGROUND}
    justify-content:center;
    align-items: center;
`;

export const MypageEventListContainer = styled(Container)`
    border: 1px solid ${GRAY1};
    border-radius: 8px;
    padding: 16px;
    align-items: flex-start;
    & > div {
        padding: 8px 0;
        border-bottom: 1px solid ${GRAY1};
        &:first-child {
            padding-top: 0;
        }
        &:last-child {
            padding-bottom: 0;
            border-bottom: 0;
        }
    }
`;

export const MypageEventTextContainer = styled(RowContainer)`
    justify-content: flex-start;
    & > span {
        max-width: 90%;
        ${TEXT_ELLIPSIS}
    }
`;

export const MypageCouponEmptyBox = styled(Box)`
    padding: 16px 0;
    width: 100%;
    justify-content: center;
`;

export const MypageCouponContainer = styled(RowContainer)`
    padding: 10px 16px;
    border-radius: 8px;
    ${GRAY0_BACKGROUND}
    margin-bottom:10px;
`;

export const MypageCouponTextContainer = styled(Container)`
    align-items: flex-start;
`;

export const MypageCouponTextRow = styled(RowContainer)`
    display: inline-flex;
    width: fit-content;
    justify-content: flex-start;
    & > span {
        max-width: 180px;
        ${TEXT_ELLIPSIS}
    }
`;

export const MypageCouponImageBox = styled(Box)`
    min-width: 60px;
    height: 60px;
    border-radius: 50%;
    overflow: hidden;
    position: relative;
`;

export const MypageCouponSumupTextBox = styled(Text)`
    display: inline-flex;
    width: 100%;
    justify-content: flex-end;
`;

export const MypageLogoutContainer = styled(Container)`
    padding: 16px;
`;
