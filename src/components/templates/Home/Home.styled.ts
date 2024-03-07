import { Box } from '@Atoms/Box';
import { Container } from '@Atoms/Container';
import { RowContainer } from '@Atoms/RowContainer';
import { GRAY1, GRAY4, ORANGE2, ORANGE3 } from '@Styles/colors';
import {
    ABSOLUTE_CENTER,
    ABSOLUTE_COVER,
    GRAY0_BACKGROUND,
} from '@Styles/themes';
import styled, { css } from 'styled-components';

export const HomeContainer = styled(Container)`
    padding: 16px;
    position: relative;
`;
export const HomeEditContainer = styled(RowContainer)`
    height: 20px;
    justify-content: flex-end;
    padding-bottom: 16px;
    box-sizing: content-box;
    position: relative;
    & > span {
        position: absolute;
        top: 0;
        right: 0;
        z-index: 3;
    }
`;

export const HomeEditModeLayer = styled(Box)`
    ${ABSOLUTE_COVER}
    background-color: rgba(0, 0, 0, 0.4);
    z-index: 2;
    pointer-events: none;
`;
export const HomeTitleBox = styled(Box)`
    padding-top: 16px;
    width: 100%;
    justify-content: center;
`;
export const HomeContentContainer = styled(RowContainer)`
    padding: 50px 54px 34px 54px;
    justify-content: space-between;
    flex-wrap: wrap;
`;

export const HomePersonContainer = styled(Container)`
    width: 100px;
    align-self: flex-start;
`;

export const HomePersonImageBox = styled(Box)<{
    background?: string;
    transparent?: boolean;
}>`
    ${({ background }) =>
        !background
            ? GRAY0_BACKGROUND
            : css`
                  background-color: ${background};
              `}
    ${({ transparent }) =>
        !transparent
            ? css`
                  box-shadow: 0 4px 10px 4px rgba(0, 0, 0, 0.1);
              `
            : css`
                  background: none;
              `}
    width: 100%;
    padding-bottom: 100%;
    border-radius: 50%;
    position: relative;
    overflow: hidden;
    & > svg {
        ${ABSOLUTE_CENTER}
    }
`;

export const HomePersonImageBlur = styled(Box)`
    ${ABSOLUTE_COVER}
    z-index: 1;
    background-color: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(10px);
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    & > span {
        text-align: center;
    }
`;

export const HomePersonEditBox = styled(Box)`
    ${ABSOLUTE_COVER}
    z-index: 3;
    & > svg {
        ${ABSOLUTE_CENTER}
    }
`;

export const HomePersonTextContainer = styled(Container)`
    align-items: center;
`;

export const HomeRelationImageContainer = styled(RowContainer)`
    justify-content: center;
`;

export const HomeRelationImageBox = styled(Box)<{ active: boolean }>`
    border-radius: 50%;
    justify-content: center;
    align-items: center;
    ${({ active }) =>
        active
            ? css`
                  width: 100px;
                  height: 100px;
                  border: 2px solid ${ORANGE2};
                  & > span {
                      color: ${ORANGE3};
                  }
              `
            : css`
                  width: 80px;
                  height: 80px;
                  border: 2px solid ${GRAY1};
                  & > span {
                      color: ${GRAY4};
                  }
              `}
`;

export const HomeRelationTitleBox = styled(Container)`
    align-items: center;
`;

export const HomeRelationButtonContainer = styled(Container)`
    & > button {
        margin-bottom: 8px;
        &:last-child {
            margin-bottom: 0;
        }
    }
`;

export const HomeRelationBackButtonContainer = styled(Container)`
    padding-top: 16px;
`;

export const HomeRelationModalInnerContainer = styled(Container)``;
export const HomeRelationModalInnerRow = styled(RowContainer)`
    width: fit-content;
    justify-content: center;
`;
