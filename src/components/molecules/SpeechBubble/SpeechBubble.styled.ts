import { Box } from '@Atoms/Box';
import { RowContainer } from '@Atoms/RowContainer';
import {
    ABSOLUTE_COVER,
    GRAY0_BACKGROUND,
    MANDARIN1_BACKGROUND,
} from '@Styles/themes';
import styled, { css } from 'styled-components';

export const SpeechBubbleContainer = styled(RowContainer)<{
    isMyBubble?: boolean;
}>`
    margin-bottom: 16px;
    ${({ isMyBubble }) =>
        isMyBubble
            ? css`
                  justify-content: flex-end;
                  & > div {
                      ${MANDARIN1_BACKGROUND}
                  }
              `
            : css`
                  justify-content: flex-end;
                  flex-direction: row-reverse;
                  & > div {
                      ${GRAY0_BACKGROUND}
                  }
              `}
`;

export const SpeechBubbleTextBox = styled(Box)`
    padding: 8px 16px;
    display: inline-block;
    border-radius: 20px;
    position: relative;
    overflow: hidden;
    &:active:after {
        display: block;
        content: '';
        ${ABSOLUTE_COVER}
        background-color:rgba(0,0,0,0.1)
    }
`;
