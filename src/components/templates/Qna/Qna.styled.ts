import { Box } from '@Atoms/Box';
import { Container } from '@Atoms/Container';
import { RowContainer } from '@Atoms/RowContainer';
import { WHITE } from '@Styles/colors';
import { GRAY1_BACKGROUND, ORANGE2_BACKGROUND } from '@Styles/themes';
import styled, { css } from 'styled-components';

export const QnaContainer = styled(Container)`
    padding: 16px;
    overflow: overlay;
`;

export const QnaTagContainer = styled(RowContainer)`
    justify-content: center;
`;

export const QnaTag = styled(Box)<{ isAnswered: boolean; isCurrent: boolean }>`
    width: 16%;
    height: 48px;
    border-radius: 16px 16px 0 0;
    margin-right: 8px;
    &:last-child {
        margin: 0;
    }
    justify-content: center;
    align-items: center;
    ${({ isAnswered }) => (isAnswered ? ORANGE2_BACKGROUND : GRAY1_BACKGROUND)}
    ${({ isCurrent }) =>
        isCurrent
            ? ORANGE2_BACKGROUND
            : css`
                  opacity: 0.4;
              `}

    & > span {
        color: ${WHITE};
    }
`;

export const QnaAnsweredContentContainer = styled(Container)`
    align-items: flex-start;
`;
