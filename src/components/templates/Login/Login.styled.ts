import styled from 'styled-components';

import { Container } from '@Atoms/Container';
import { Button } from '@Atoms/Button';
import { WHITE_BACKGROUND } from '@Styles/themes';
import { BLACK, GRAY2 } from '@Styles/colors';
import { RowContainer } from '@Atoms/RowContainer';

export const LoginContainer = styled(Container)`
    justify-content: space-between;
    height: 100%;
`;

export const LoginLogoBox = styled(Container)`
    justify-content: center;
    align-items: center;
    flex: 1;
    position: relative;
    div {
        position: absolute;
    }
`;

export const LoginInnerBox = styled(Container)`
    justify-content: space-between;
    /* gap: 16px; */
    padding: 32px 16px;
`;

export const LoginButton = styled(Button)`
    ${WHITE_BACKGROUND}
    border: 1px solid ${GRAY2};
    span {
        color: ${BLACK};
    }
`;

export const LoginDivider = styled(RowContainer)`
    /* gap: 16px; */
    white-space: nowrap;
    padding: 8px 0px;
`;
