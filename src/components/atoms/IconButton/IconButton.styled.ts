import styled from 'styled-components';

export const IconButtonContainer = styled.button<{
    width?: string;
    height?: string;
}>`
    outline: 0px;
    padding: 0px;
    border: none;
    background: none;
    cursor: pointer;
    width: ${({ width }) => width ?? 'fit-content'};
    height: ${({ height }) => height ?? 'fit-content'};

    :disabled {
        opacity: 0.4;
    }
`;
