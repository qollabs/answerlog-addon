import { Box } from '@Atoms/Box';
import { Container } from '@Atoms/Container';
import { RowContainer } from '@Atoms/RowContainer';
import { BLACK, GRAY3, ORANGE2, WHITE } from '@Styles/colors';
import {
    GRAY2_BACKGROUND,
    ORANGE2_BACKGROUND,
    TEXT_ELLIPSIS,
    TEXT_HIDDEN,
    WHITE_BACKGROUND,
} from '@Styles/themes';
import styled, { css } from 'styled-components';

export const SelectWrapper = styled(Container)<{ width?: string }>`
    width: ${({ width }) => width || '100%'};
    align-items: flex-start;
    justify-content: flex-start;
`;
export const SelectBox = styled(RowContainer)<{
    disabled?: boolean;
    padding?: string;
}>`
    ${WHITE_BACKGROUND}
    padding: ${({ padding }) => padding || '16px 8px'};
    border: 1px solid ${GRAY3};
    border-radius: 8px;
    & > span {
        ${TEXT_HIDDEN}
    }
    ${({ disabled }) =>
        disabled &&
        css`
            ${GRAY2_BACKGROUND}
            opacity: 0.4;
        `}
`;
export const SelectListBox = styled(Box)<{ isSelected: boolean }>`
    width: 100%;
    padding: 16px;
    border: 1px solid ${GRAY3};
    border-bottom: 0;
    &:last-child {
        border-bottom: 1px solid ${GRAY3};
    }
    &:active {
        ${ORANGE2_BACKGROUND}
        & > span {
            color: ${WHITE};
        }
    }
    & > span {
        color: ${({ isSelected }) => (isSelected ? ORANGE2 : BLACK)};
    }
`;
