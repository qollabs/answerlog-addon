import { Container } from '@Atoms/Container';
import { RowContainer } from '@Atoms/RowContainer';
import {
    ABSOLUTE_CENTER,
    ABSOLUTE_COVER,
    ORANGE2_BACKGROUND,
    ORANGE_UNSELECTED_BACKGROUND,
} from '@Styles/themes';
import styled, { css } from 'styled-components';

export const ProgressBarContainer = styled(Container)<{
    withoutNode?: boolean;
    nodeTexts?: (string | null)[];
}>`
    position: relative;
    width: 100%;
    padding: ${({ withoutNode, nodeTexts }) =>
        withoutNode || !nodeTexts ? `0` : `16px 36px 40px 36px`};
`;

export const ProgressBarImageContainer = styled(Container)<{
    withoutNode?: boolean;
}>`
    position: relative;
    width: 100%;
    padding: 8px;
`;

export const ProgressBarOuterStick = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    height: 6px;
    position: relative;
    ${ORANGE_UNSELECTED_BACKGROUND}
`;

export const ProgressBarInnerStick = styled.div<{
    value: number;
    max: number;
    isAnimationActivated?: boolean;
}>`
    width: ${({ value, max }) => (value / max) * 100}%;
    height: 6px;
    position: absolute;
    top: 0;
    left: 0;
    ${ORANGE2_BACKGROUND}
    ${({ isAnimationActivated }) =>
        isAnimationActivated &&
        css`
            transition: 1s linear;
        `}
`;

export const ProgressBarCircleContainer = styled(RowContainer)`
    justify-content: space-beteween;
    ${ABSOLUTE_COVER}
    z-index: 1;
    pointer-events: none;
    & span {
        position: absolute;
        top: 24px;
        white-space: nowrap;
    }
`;

export const ProgressBarCircle = styled.div<{ value: number }>`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 16px;
    height: 16px;
    border-radius: 100%;
    ${ORANGE_UNSELECTED_BACKGROUND}
    position: relative;
    & svg {
        ${ABSOLUTE_CENTER}
    }
    & * {
        opacity: 0;
    }
    &:nth-child(${({ value }) => `-n+${value + 1}`}) {
        ${ORANGE2_BACKGROUND}
        & * {
            opacity: 1;
        }
    }
`;

export const ProgressBarCircleAnimation = styled.div<{
    value: number;
    max: number;
    isAnimationActivated?: boolean;
}>`
    width: 16px;
    height: 16px;
    border-radius: 100%;
    ${ORANGE2_BACKGROUND}
    position:absolute;
    ${({ max, value, isAnimationActivated }) => {
        const gauge = (value / max) * 100;
        return css`
            left: ${gauge}%;
            transform: translateX(-${gauge}%);
            transition: ${isAnimationActivated && '1s linear'};
        `;
    }}
`;
