import { Box } from '@Atoms/Box';
import { Container } from '@Atoms/Container';
import { RowContainer } from '@Atoms/RowContainer';
import {
    GRAY0_BACKGROUND,
    ORANGE2_BACKGROUND,
    ORANGE_UNSELECTED_BACKGROUND,
} from '@Styles/themes';
import styled, { css } from 'styled-components';

export const LogDetailContainer = styled(Container)<{
    isInputFocused: boolean;
}>`
    height: 100%;
    ${({ isInputFocused }) =>
        !isInputFocused &&
        css`
            padding: 44px 0;
            padding-right: 32px;
        `}
`;

export const LogDetailDiaryContainer = styled(RowContainer)<{
    isInputFocused: boolean;
}>`
    ${({ isInputFocused }) =>
        !isInputFocused &&
        css`
            height: 100%;
        `}
`;

export const LogDetailContentContainer = styled(Container)<{
    isInputFocused: boolean;
}>`
    padding: 16px;
    height: 100%;
    ${({ isInputFocused }) =>
        isInputFocused
            ? css`
                  overflow: visible;
                  height: fit-content;
                  padding-bottom: 40px;
              `
            : css`
                  overflow-y: scroll;
              `}
    box-shadow:
        8px 8px 10px 0px rgba(0, 0, 0, 0.1),
        0px 10px 20px 0px rgba(0, 0, 0, 0.05) inset;
    align-items: flex-start;
    justify-content: flex-start;
    background-color: white;
`;

export const LogDetailTagContainer = styled(Container)`
    width: fit-content;
    height: 100%;
`;

export const LogDetailTag = styled(Box)<{ selected: boolean }>`
    width: 32px;
    flex: 1 0 auto;
    padding: 16px 0;
    border-radius: 0 10px 10px 0;
    justify-content: center;
    box-shadow:
        4px 4px 6px 0 rgba(0, 0, 0, 0.1) inset,
        -6px 0 6px 0 rgba(0, 0, 0, 0.1) inset;

    ${ORANGE2_BACKGROUND}
    ${({ selected }) =>
        !selected &&
        css`
            ${ORANGE_UNSELECTED_BACKGROUND}
            box-shadow:
        4px 4px 6px 0 rgba(0, 0, 0, 0.05) inset,
        -6px 0 6px 0 rgba(0, 0, 0, 0.05) inset;
        `};
    & > span {
        transform: rotate(0.25turn);
    }
`;

export const LogDetailFrontContainer = styled(Container)`
    height: 100%;
    padding: 32px 20px 54px 20px;
`;

export const LogDetailTitleContainer = styled(Container)`
    align-items: flex-start;
    padding-left: 12px;
`;

export const LogDetailSubtitleContainer = styled(Container)`
    align-items: flex-end;
    padding-right: 24px;
`;

export const LogDetailIndexContainer = styled(Container)`
    padding: 16px 18px;
    flex: 1 0 auto;
    ${GRAY0_BACKGROUND}
`;

export const LogDetailLinkContainer = styled(RowContainer)`
    align-items: flex-start;
    justify-content: flex-start;
    margin-bottom: 40px;
    &:last-child {
        margin: 0;
    }
`;

export const LogDetailAnswerContainer = styled(Container)`
    flex: 1 0 auto;
`;
