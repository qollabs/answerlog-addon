import { Box } from '@Atoms/Box';
import { Container } from '@Atoms/Container';
import { RowContainer } from '@Atoms/RowContainer';
import { GRAY2, GRAY3, GRAY4 } from '@Styles/colors';
import {
    MANDARIN1_BACKGROUND,
    ORANGE1_BACKGROUND,
    ORANGE2_BACKGROUND,
    WHITE_BACKGROUND,
} from '@Styles/themes';
import styled from 'styled-components';

export const AnswerLogContainer = styled(Container)`
    padding: 0 16px;
`;

export const AnswerLogRowContainer = styled(RowContainer)`
    position: relative;
    margin-top: 48px;
    align-items: flex-end;
    height: 156px;
`;

export const AnswerLogShelf = styled(Container)`
    height: 48px;
    ${WHITE_BACKGROUND}
    box-shadow: 0px -20px 20px 0 rgba(0, 0, 0, 0.07);
    justify-content: flex-end;
    &::after {
        display: block;
        content: '';
        width: 100%;
        height: 16px;
        ${WHITE_BACKGROUND}
        box-shadow: 0px 10px 10px 5px rgba(0, 0, 0, 0.10), 0px -2px 4px 0px rgba(0, 0, 0, 0.05);
    }
`;

export const AnswerLogBookContainer = styled(RowContainer)`
    position: absolute;
    width: 70%;
    left: 50%;
    transform: translateX(-50%);
    bottom: 24px;
`;

export const AnswerLogBook = styled(RowContainer)<{ incompleted: boolean }>`
    width: 98px;
    height: 132px;
    ${({ incompleted }) =>
        incompleted ? MANDARIN1_BACKGROUND : ORANGE2_BACKGROUND}
    box-shadow: 4px 4px 4px 0px rgba(0, 0, 0, 0.10), -4px 4px 4px 0px rgba(0, 0, 0, 0.10);
    justify-content: flex-end;
`;
export const AnswerLogBookCover = styled(RowContainer)`
    width: 92px;
    height: 132px;
    box-shadow: 0px -5px 5px 0px rgba(0, 0, 0, 0.03) inset,
        2px 0px 5px 0px rgba(0, 0, 0, 0.07) inset;
    algin-items: center;
    justify-content: center;
`;

export const AnswerLogBookIncompleteContainer = styled(RowContainer)`
    algin-items: center;
    justify-content: center;
`;

export const AnswerLogBookGaugeContainer = styled(Container)`
    width: fit-content;
`;

export const AnswerLogGaugeBox = styled(Box)<{ answered: boolean }>`
    border: 1px solid ${GRAY3};
    border-bottom: 0;
    border-right: 0;
    width: 16px;
    height: 16px;
    margin-bottom: 2px;
    ${({ answered }) => answered && ORANGE2_BACKGROUND}
`;
