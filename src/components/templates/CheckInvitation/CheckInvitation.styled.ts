import { Container } from '@Atoms/Container';
import { RowContainer } from '@Atoms/RowContainer';
import styled, { keyframes } from 'styled-components';

export const CheckInvContainer = styled(Container)`
    justify-content: space-between;
    height: 100%;
    padding: 16px;
`;

export const CheckInvEmptyContainer = styled(Container)`
    justify-content: center;
    align-items: center;
    padding: 16px;
`;

const Shake = keyframes`
    40% {transform: rotate(0turn)}
    50% {transform: rotate(0.015turn)}
    60% {transform: rotate(-0.015turn)}
    70% {transform: rotate(0turn)}
`;

export const CheckInvShakingBox = styled.div`
    animation: ${Shake} 3s ease-in-out infinite;
`;

const Shimmer = keyframes`
    65% {transform: translateX(100%);}
    100% {transform: translateX(100%);}
`;

export const CheckInvImageBox = styled.div`
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

export const CheckInvButtonContainer = styled(Container)``;

export const CheckInvModalButtonContainer = styled(RowContainer)``;
