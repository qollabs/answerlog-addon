import styled, { css, keyframes } from 'styled-components';

import { RowContainer } from '@Atoms/RowContainer';
import { Box } from '@Atoms/Box';
import { ORANGE2_BACKGROUND } from '@Styles/themes';

export const DotLoaderSizeTypeArray = ['large', 'medium', 'small'] as const;
export type DotLoaderSizeType = (typeof DotLoaderSizeTypeArray)[number];

export const DotLoaderContainer = styled(RowContainer)<{
    size: DotLoaderSizeType;
}>`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: rgba(243, 119, 77, 0.15); // orange2 + 0.15a
    ${({ size }) => handleDotLoaderSizeType(size)}
`;

const BigAndSmall = keyframes`
  0% {
    width: 100%;
    height: 100%;  
  }
  10% {
    width: 100%;
    height: 100%;  
  }
  35% {
    width: 0%;
    height: 0%;
  }
  65% {
    width: 0%;
    height: 0%;
  }
  90% {
    width: 100%;
    height: 100%;  
  }
  100% {
    width: 100%;
    height: 100%;  
  }
`;

export const LoadingDotBox = styled(Box)`
    justify-content: center;
    align-items: center;
`;

export const LoadingDot = styled.div<{ delay: number }>`
    width: 100%;
    height: 100%;
    border-radius: 50%;
    ${ORANGE2_BACKGROUND}
    animation: ${BigAndSmall} 1.5s infinite;
    animation-delay: ${({ delay }) => delay}s;
`;

const handleDotLoaderSizeType = (size: DotLoaderSizeType) => {
    switch (size) {
        case 'small':
            return css`
                width: 24px;
                height: 24px;
                padding: 4px;
                div {
                    width: 4px;
                    height: 4px;
                }
            `;
        case 'medium':
            return css`
                width: 32px;
                height: 32px;
                padding: 5px;
                div {
                    width: 4px;
                    height: 4px;
                }
            `;
        case 'large':
        default:
            return css`
                width: 40px;
                height: 40px;
                padding: 6px;
                div {
                    width: 6px;
                    height: 6px;
                }
            `;
    }
};
