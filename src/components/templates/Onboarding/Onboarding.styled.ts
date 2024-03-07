import { Container } from '@Atoms/Container';
import { RowContainer } from '@Atoms/RowContainer';
import { GRAY1_BACKGROUND } from '@Styles/themes';
import styled, { keyframes, css } from 'styled-components';

export const OnboardingContainer = styled(Container)`
    justify-content: space-between;
    height: 100%;
`;

export const OnboardingHeadContainer = styled(Container)`
    align-items: flex-start;
    padding: 16px 32px;
`;

export const OnboardingContentContainer = styled(Container)`
    justify-content: flex-start;
    flex: 1;
    padding: 16px 40px;
    align-items: flex-start;
`;
export const OnboardingGenderContainer = styled(Container)`
    align-items: flex-start;
`;

export const OnboardingBirthInputContainer = styled(RowContainer)`
    justify-content: flex-start;
`;

export const OnboardingBirthYearContainer = styled(RowContainer)`
    width: 40%;
`;

export const OnboardingBirthMonthContainer = styled(RowContainer)`
    width: 30%;
`;

export const OnboardingBirthDateContainer = styled(RowContainer)`
    width: 30%;
`;

export const OnboardingProfileImageContainer = styled(Container)`
    justify-content: center;
    align-items: center;
`;

export const OnboardingProfileImageDefaultContainer = styled(Container)`
    ${GRAY1_BACKGROUND}
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
`;

export const OnboardingCouponContainer = styled(Container)`
    align-items: center;
`;

export const OnboardingSubmitContainer = styled(Container)`
    justify-content: center;
    align-items: center;
    height: 100%;
`;

export const OnboardingSubmitTextBox = styled(Container)`
    padding-top: 200px;
    span {
        text-align: center;
    }
`;

export const OnboardingLoadingContainer = styled(Container)`
    position: absolute;
`;

const OnboardingLoadingTopStyle = css`
    top: -172px;
    height: 57px;
    width: 160px;
    opacity: 0.6;
`;
const OnboardingLoadingMidStyle = css`
    top: -100px;
    height: 79px;
    width: 220px;
    opacity: 1;
`;
const OnboardingLoadingBottomStyle = css`
    top: 0px;
    height: 92px;
    width: 260px;
    opacity: 0;
`;

const LoadTopToGone = keyframes`
    50% {
        height: 43px;
        width: 120px;
        top: -220px;
        opacity: 0;
    }
    100% {
        height: 43px;
        width: 120px;
        top: -220px;
        opacity: 0;
    }
`;
const LoadMidToTop = keyframes`
    50% {${OnboardingLoadingTopStyle}}
    100% {${OnboardingLoadingTopStyle}}
`;
const LoadBottomToMid = keyframes`
    50% {${OnboardingLoadingMidStyle}}
    100% {${OnboardingLoadingMidStyle}}
`;

const Shimmer = keyframes`
    90% {transform: translateX(100%);}
    100% {transform: translateX(100%);}
`;

export const OnboardingLoadingBox = styled.div`
    position: absolute;
    .image-preview {
        max-width: 100%;
        max-height: 100%;
        position: relative !important;
        object-fit: cover; // Optional
    }
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
        transform: translateX(-100%);
        background-image: linear-gradient(
            90deg,
            rgba(255, 255, 255, 0) 0,
            rgba(255, 255, 255, 0.2) 20%,
            rgba(255, 255, 255, 0.5) 60%,
            rgba(255, 255, 255, 0)
        );
        animation: ${Shimmer} 4s infinite;
    }
`;
export const OnboardingLoadingTop = styled(OnboardingLoadingBox)`
    ${OnboardingLoadingTopStyle}
    animation: ${LoadTopToGone} 5s ease-in-out infinite;
`;
export const OnboardingLoadingMid = styled(OnboardingLoadingBox)`
    ${OnboardingLoadingMidStyle}
    animation: ${LoadMidToTop} 5s ease-in-out infinite;
`;
export const OnboardingLoadingBottom = styled(OnboardingLoadingBox)`
    ${OnboardingLoadingBottomStyle}
    animation: ${LoadBottomToMid} 5s ease-in-out infinite;
`;
