import styled, { keyframes } from 'styled-components';

import { Container } from '@Atoms/Container';

export const WaitingContainer = styled(Container)`
    padding: 16px;
`;

export const WaitingContentContainer = styled(Container)`
    margin-bottom: 16px;
`;
const Shimmer = keyframes`
    65% {transform: translateX(100%);}
    100% {transform: translateX(100%);}
`;

export const WaitingIconBox = styled.div`
    position: relative;
    ::after {
        position: absolute;
        content: '';
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 99;
        width: 100%;
        height: 100%;
        border-radius: 40%;
        transform: translateX(-100%);
        background-image: linear-gradient(
            90deg,
            rgba(255, 255, 255, 0) 0,
            rgba(255, 255, 255, 0.3) 40%,
            rgba(255, 255, 255, 0.5) 60%,
            rgba(255, 255, 255, 0)
        );
        animation: ${Shimmer} 4s ease-in-out infinite;
    }
`;
export const WaitingTextContainer = styled(Container)`
    padding: 0px 32px;
    span {
        text-align: center;
    }
`;

export const WaitingTextButton = styled.div`
    cursor: pointer;
`;
export const WaitingButtonContainer = styled(Container)`
    padding: 16px;
`;
