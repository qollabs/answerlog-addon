import styled, { css } from 'styled-components';

export const AppContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    width: 100vw;
    max-width: 420px;
    height: 100vh;
    height: 100dvh;
    overflow: hidden;
`;

export const Gap = styled.div<{ width?: string; height?: string }>`
    width: ${({ width }) => width};
    min-width: ${({ width }) => width};
    height: ${({ height }) => height};
    min-height: ${({ height }) => height};
`;
