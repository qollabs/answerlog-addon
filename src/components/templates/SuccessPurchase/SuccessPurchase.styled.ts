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
import { WHITE_BACKGROUND } from '@Styles/themes';
import { TextSizePrefType } from '@Types/types';
import styled, { css, keyframes } from 'styled-components';

export const SuccessContainer = styled(Container)``;

export const SuccessSectionContainer = styled(Container)`
    ${WHITE_BACKGROUND}
    padding: 22px 16px;
`;

export const SuccessSectionTitleBox = styled(Box)`
    width: 100%;
    justify-content: flex-start;
    padding-bottom: 20px;
    border-bottom: 2px solid ${ORANGE2};
`;

export const SuccessContentsContainer = styled(Container)`
    padding-top: 16px;
`;

export const SuccessItemContainer = styled(RowContainer)`
    padding: 16px 0;
    border-top: 1px solid ${GRAY1};
    &:first-child {
        border: 0;
    }
    box-sizing: content-box;
`;

export const SuccessItemImageBox = styled(Box)`
    min-width: 88px;
    height: 88px;
    border-radius: 28px;
    overflow: hidden;
    position: relative;
    border: 1px solid ${GRAY2};
`;

export const SuccessItemRightContainer = styled(Container)`
    height: 100%;
    justify-content: space-between;
    align-items: flex-end;
`;
export const SuccessItemInfoContainer = styled(Container)`
    align-items: flex-end;
    & > span {
        display: inline-block;
        max-width: 256px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        & > span > span {
            display: inline-block;
            max-width: 160px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
    }
`;

export const SuccessPaymentRowContainer = styled(RowContainer)`
    margin-bottom: 8px;
    align-items: flex-start;
    &:last-child {
        margin: 0;
    }
    & > span:first-child {
        flex: 4;
    }
    & > span:last-child {
        flex: 6;
    }
`;

export const SuccessDeliveryRowContainer = styled(RowContainer)`
    margin-bottom: 8px;
    align-items: flex-start;
    &:last-child {
        margin: 0;
    }
    & > span {
    }
    & > span:first-child {
        flex: 4;
    }
    & > span:last-child {
        flex: 6;
    }
`;

export const SuccessButtonContainer = styled(RowContainer)`
    ${WHITE_BACKGROUND}
    padding:16px;
    position: sticky;
    bottom: 0;
    left: 0;
`;

export const SuccessModalContainer = styled(Container)`
    padding: 16px;
    span {
        text-align: center;
    }
`;

export const SuccessModalButtonContainer = styled(RowContainer)``;
