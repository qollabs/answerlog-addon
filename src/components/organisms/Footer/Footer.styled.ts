import styled from 'styled-components';

import { Box } from '@Atoms/Box';
import { GRAY3_BACKGROUND } from '@Styles/themes';
import { Text } from '@Atoms/Typography';

export const FooterContainer = styled(Box)`
    justify-content: space-between;
    height: fit-content;
    width: 100%;
    padding: 12px 16px;
    ${GRAY3_BACKGROUND}
`;

export const CompanyBox = styled(Box)`
    flex-direction: column;
    justify-content: space-around;
`;

export const TextBox = styled(Box)`
    margin-bottom: 6px;
`;

export const RightText = styled(Text)`
    text-align: right;
`;

export const UnderlinedLink = styled.a``;
