import { Container } from '@Atoms/Container';
import { RowContainer } from '@Atoms/RowContainer';
import { ORANGE2 } from '@Styles/colors';
import { ORANGE2_BACKGROUND } from '@Styles/themes';
import styled, { css } from 'styled-components';

export const AudioPlayerContainer = styled(Container)``;

export const AudioPlayerOriginalAudio = styled.audio`
    display: none;
`;

export const AudioPlayerSubContainer = styled(RowContainer)<{
    isOnRecording?: boolean;
}>`
    padding: 0 8px 0 4px;
    ${({ isOnRecording }) =>
        isOnRecording &&
        css`
            justify-content: flex-end;
        `}
`;

export const AudioPlayerControllerContainer = styled(RowContainer)`
    width: fit-content;
    height: auto;
    justify-content: flex-start;
`;

export const AudioPlayerButton = styled.div`
    width: 24px;
    height: 24px;
    position: relative;
`;

export const AudioPlayerTimeContainer = styled(RowContainer)`
    width: fit-content;
`;
