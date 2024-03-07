import { RowContainer } from '@Atoms/RowContainer';
import { GRAY0, ORANGE2 } from '@Styles/colors';
import styled from 'styled-components';

export const TextTagContainer = styled(RowContainer)<{
    backgroundColor?: string;
    borderRadius?: string;
}>`
    padding: 8px;
    width: fit-content;
    min-width: fit-content;
    background-color: ${({ backgroundColor }) => backgroundColor || GRAY0};
    border-radius: ${({ borderRadius }) => borderRadius || '0'};
    overflow: hidden;
    & > span {
        white-space: nowrap;
    }
    & > svg {
        path {
            fill: ${ORANGE2};
        }
    }
`;
