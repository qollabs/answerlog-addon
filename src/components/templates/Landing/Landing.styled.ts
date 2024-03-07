import { Box } from '@Atoms/Box';
import { Container } from '@Atoms/Container';
import { RowContainer } from '@Atoms/RowContainer';
import {
    ABSOLUTE_CENTER,
    ORANGE_UNSELECTED_BACKGROUND,
    TEXT_ELLIPSIS,
    TEXT_ELLIPSIS_LINE_CLAMP_3,
} from '@Styles/themes';
import { TextSizePreferenceType, textSizePicker } from '@Styles/fonts';
import styled, { css } from 'styled-components';

export const LandingContainer = styled(Container)`
    padding: 16px;
`;

export const LandingRelationContainer = styled(RowContainer)`
    padding-top: 22px;
    justify-content: center;
`;

export const LandingPersonContainer = styled(Container)`
    width: 80px;
    align-self: flex-start;
    & > span {
        text-align: center;
    }
`;

export const LandingAlertContainer = styled(RowContainer)`
    overflow: hidden;
`;
export const LandingAlertContentContainer = styled(RowContainer)`
    padding: 4px 0;
    margin-bottom: 24px;
    &:last-child {
        margin-bottom: 0;
    }
`;

export const LandingAlertIconBox = styled(Box)`
    width: 56px;
    min-width: 56px;
    height: 56px;
    border-radius: 16px;
    ${ORANGE_UNSELECTED_BACKGROUND}
    position: relative;
    & > svg {
        ${ABSOLUTE_CENTER}
    }
`;

export const LandingAlertTextContainer = styled(Container)`
    height: 56px;
    padding: 4px 0;
    align-items: flex-start;
    justify-content: space-between;
    overflow: hidden;
    & > span {
        max-width: 100%;
        ${TEXT_ELLIPSIS}
    }
`;

export const LandingSectionContainer = styled(Container)`
    align-items: flex-start;
    justify-content: space-between;
    height: 100%;
    position: relative;
`;

export const LandingSectionTop = styled(Container)`
    align-items: flex-start;
    position: relative;
    z-index: 1;
`;

export const LandingSectionButton = styled(RowContainer)`
    justify-content: flex-start;
    position: relative;
    z-index: 1;
`;

export const LandingSectionImageBox = styled(Box)<{
    width: string;
    height: string;
    top?: string;
    bottom?: string;
    left?: string;
    right?: string;
}>`
    position: absolute;
    width: ${({ width }) => width};
    height: ${({ height }) => height};
    ${({ top, bottom, left, right }) => css`
        top: ${top || 'auto'};
        bottom: ${bottom || 'auto'};
        left: ${left || 'auto'};
        right: ${right || 'auto'};
    `}
`;

export const LandingReportSubjectiveContainer = styled(Container)`
    align-items: flex-end;
    padding: 0 16px;

    & > span:first-child {
        ${TEXT_ELLIPSIS_LINE_CLAMP_3}
    }
`;

export const LandingReportChoiceContainer = styled(RowContainer)`
    margin-bottom: 16px;

    & > span:first-child {
        max-width: 70%;
        ${TEXT_ELLIPSIS}
    }
`;

export const LandingBirthTextContainer = styled(RowContainer)`
    justify-content: flex-start;
`;
