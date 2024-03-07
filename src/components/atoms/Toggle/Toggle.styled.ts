import styled, { css } from 'styled-components';

import { Box } from '@Atoms/Box';
import {
    WHITE_BACKGROUND,
    GRAY3_BACKGROUND,
    ORANGE2_BACKGROUND,
} from '@Styles/themes';

export const RadioButtonContainer = styled(Box)`
    align-items: center;
    margin: 8px 0;
`;

export const Label = styled.label<{ miniSize?: boolean }>`
    position: relative;
    right: 20px;
    width: 48px;
    height: 24px;
    border-radius: 24px;
    border: none;
    cursor: pointer;

    ${(props) =>
        props.miniSize &&
        css`
            width: 36px;
            height: 18px;
            border-radius: 18px;
        `}
`;

export const BaseRadioButton = styled.input<{ miniSize?: boolean }>`
    width: 0;
    height: 0;
    visibility: hidden;
    z-index: -1;
    cursor: pointer;
    border-radius: 50%;
    margin-left: 52px;
    ~ ${Label} {
        ${GRAY3_BACKGROUND}
        &::after {
            content: '';
            display: block;
            border-radius: 50%;
            width: 20px;
            height: 20px;
            margin: 2px;
            ${WHITE_BACKGROUND}

            ${(props) =>
                props.miniSize &&
                css`
                    width: 14px;
                    height: 14px;
                `}
        }
    }

    &:checked + ${Label} {
        ${ORANGE2_BACKGROUND}
        &::after {
            content: '';
            display: block;
            border-radius: 50%;
            width: 20px;
            height: 20px;
            margin: 2px;
            margin-left: 26px;

            ${(props) =>
                props.miniSize &&
                css`
                    width: 14px;
                    height: 14px;
                    margin-left: 20px;
                `}
        }
    }
`;
