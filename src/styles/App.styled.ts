import styled, { css } from 'styled-components';

export const AppContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    width: 100vw;
    // max-width: 420px;
    height: 100vh;
    height: 100dvh;
    // max-height: 1050px;
    overflow: hidden;
    // @media (min-height: 1050px) {
    //     margin: 40px;
    //     box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.05);
    // }
`;

export const Gap = styled.div<{ width?: string; height?: string }>`
    width: ${({ width }) => width};
    min-width: ${({ width }) => width};
    height: ${({ height }) => height};
    min-height: ${({ height }) => height};
`;
