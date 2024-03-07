import { Box } from '@Atoms/Box';
import { RowContainer } from '@Atoms/RowContainer';
import { ORANGE2, WHITE, GRAY4, GRAY5 } from '@Styles/colors';
import {
    GRAY0_BACKGROUND,
    GRAY1_BACKGROUND,
    ORANGE2_BACKGROUND,
    TEXT_ELLIPSIS,
} from '@Styles/themes';
import styled, { css } from 'styled-components';

export const MenuSelectorContainer = styled(RowContainer)`
    border-bottom: 2px solid ${ORANGE2};
`;
export const MenuSelectorMenuBox = styled(Box)<{
    selected: boolean;
    numberOfMenus: number;
}>`
    flex-direction: row;
    width: ${({ numberOfMenus }) => `calc(100% / ${numberOfMenus})`};
    height: 56px;
    border-radius: 16px 16px 0 0;
    align-items: center;
    justify-content: center;
    & span {
        ${TEXT_ELLIPSIS}
        max-width: 80%;
    }
    & svg {
        width: 20px;
        height: 20px;
    }
    ${({ selected }) =>
        selected
            ? css`
                  ${ORANGE2_BACKGROUND}
                  & svg {
                      fill: ${WHITE};
                      & * {
                          fill: ${WHITE};
                      }
                  }
              `
            : css`
                  ${GRAY1_BACKGROUND}
                  & svg {
                      fill: ${GRAY5};
                      & * {
                          fill: ${GRAY5};
                      }
                  }
              `}
`;
