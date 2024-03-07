import { Box } from '@Atoms/Box';
import { Container } from '@Atoms/Container';
import { ORANGE2 } from '@Styles/colors';
import { WHITE_BACKGROUND } from '@Styles/themes';
import styled from 'styled-components';

export const QrCodeScannerContainer = styled(Container)`
    min-height: 240px;
    justify-content: center;
    align-items: center;
    padding: 4px;
    border: 4px solid ${ORANGE2};
    ${WHITE_BACKGROUND}
`;

export const QrCodeScannerFrame = styled.video`
    width: 100%;
`;

export const QrCodeScannerInactivatedContainer = styled(Container)`
    padding: 12px;
`;
