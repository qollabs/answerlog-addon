import { GRAY2 } from '@Styles/colors';
import { GRAY2_BACKGROUND } from '@Styles/themes';
import styled, { css } from 'styled-components';
import { BorderType } from './Divider';

export const BaseDivider = styled.div<{
    margin?: string;
    lineStyle?: BorderType;
}>`
    width: 100%;
    height: 1px;
    margin-top: ${({ margin }) => margin};
    margin-bottom: ${({ margin }) => margin};
    ${({ lineStyle }) =>
        `border-bottom: 1px ${!lineStyle ? 'solid' : lineStyle} ${GRAY2};`}
`;
