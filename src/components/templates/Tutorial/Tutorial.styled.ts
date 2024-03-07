import { Box } from '@Atoms/Box';
import { Container } from '@Atoms/Container';
import { RowContainer } from '@Atoms/RowContainer';
import { GRAY3, MANDARIN2, ORANGE2, WHITE } from '@Styles/colors';
import {
    Caption1,
    Heading2,
    TextSizePreferenceType,
    textSizePicker,
} from '@Styles/fonts';
import {
    ABSOLUTE_CENTER,
    ABSOLUTE_COVER,
    GRAY0_BACKGROUND,
    GRAY1_BACKGROUND,
    MANDARIN1_BACKGROUND,
    ORANGE2_BACKGROUND,
    TEXT_ELLIPSIS,
    WHITE_BACKGROUND,
    YELLOW1_BACKGROUND,
    ORANGE_UNSELECTED_BACKGROUND,
    GRAY2_BACKGROUND,
    MANDARIN2_BACKGROUND,
    YELLOW3_BACKGROUND,
} from '@Styles/themes';
import styled, { css } from 'styled-components';

export const TutorialCoverContainer = styled(RowContainer)<{
    isInteractive: boolean;
}>`
    ${ABSOLUTE_COVER}
    padding:16px;
    padding-top: 80px;
    background-color: rgba(0, 0, 0, 0.6);
    z-index: 777;
    align-items: flex-start;
    justify-content: space-between;
    & > span,
    & > div {
        display: flex;
        padding: 8px;
        box-sizing: content-box;
        background-color: rgba(255, 255, 255, 0.3);
        pointer-events: auto;
        position: relative;
        z-index: 999;
    }
    ${({ isInteractive }) =>
        isInteractive &&
        css`
            pointer-events: none;
        `}
`;

export const TutorialCoverSignoutContainer = styled(RowContainer)`
    width: fit-content;
    pointer-events: auto;
`;

export const TutorialGuideContainer = styled(Container)<{
    full?: boolean;
    top?: string;
    bottom?: string;
    left?: string;
    right?: string;
    isActivated?: boolean;
}>`
    position: absolute;
    width: 100vw;
    padding: 8px;
    ${({ top, bottom, left, right }) => css`
        top: ${top || 'auto'};
        bottom: ${bottom || 'auto'};
        left: ${left || 'auto'};
        right: ${right || 'auto'};
    `}
    ${({ full }) =>
        full &&
        css`
            top: 160px;
        `}
    align-items:center;
    justify-content: center;
    z-index: 888;
    pointer-events: none;
    ${({ isActivated }) =>
        isActivated &&
        css`
            pointer-events: auto;
        `}
    ${YELLOW3_BACKGROUND}
    & > svg {
        position: absolute;
        bottom: 8px;
        right: 8px;
    }
`;
// TutorialLayout start

export const TutorialLayoutWrapper = styled(Container)`
    justify-content: space-between;
    height: 100%;
`;

export const TutorialLayoutContainer = styled(Container)<{
    whiteBackground?: boolean;
}>`
    justify-content: flex-start;
    flex: 1;
    overflow: overlay;
    ${({ whiteBackground }) =>
        whiteBackground ? WHITE_BACKGROUND : YELLOW1_BACKGROUND}
`;

export const TutorialTopNavWrapper = styled(Container)<{
    whiteBackground?: boolean;
    page?: number;
}>`
    position: relative;
    box-shadow: 0px 10px 10px rgba(0, 0, 0, 0.03);
    ${({ whiteBackground }) =>
        whiteBackground ? WHITE_BACKGROUND : YELLOW1_BACKGROUND}
    ${({ page }) =>
        (page === 3 || page === 5) &&
        css`
            z-index: 888;
        `}
`;

export const TutorialTopNavMainContainer = styled(RowContainer)`
    padding: 16px;
    min-height: 72px;
    height: 72px;
`;

export const TutorialTopNavTitleBox = styled(Box)`
    align-items: center;
    ${Heading2}
`;

export const TutorialTopNavIconContainer = styled(RowContainer)<{
    page?: number;
}>`
    width: fit-content;
    & > button {
        margin-right: 16px;
        &:last-child {
            margin-right: 0;
        }
        ${({ page }) =>
            page === 28 &&
            css`
                &.tutorial-layout-home {
                    position: relative;
                    z-index: 888;
                    ${WHITE_BACKGROUND}
                }
            `}
        ${({ page }) =>
            page === 29 &&
            css`
                &.tutorial-layout-alert {
                    position: relative;
                    z-index: 888;
                    ${WHITE_BACKGROUND}
                }
            `}${({ page }) =>
            page === 30 &&
            css`
                &.tutorial-layout-mypage {
                    position: relative;
                    z-index: 888;
                    ${WHITE_BACKGROUND}
                }
            `}
    }
`;

export const TutorialTopNavButton = styled.button<{ active: boolean }>`
    display: flex;
    flex-direction: column;
    width: fit-content;
    align-items: center;
    ${({ active }) =>
        !active &&
        css`
            opacity: 0;
            pointer-events: none;
        `}
`;

export const TutorialBottomNavWrapper = styled(RowContainer)`
    justify-content: space-around;
    height: 80px;
    padding-bottom: 16px;
    ${WHITE_BACKGROUND}
    box-shadow: 0px -10px 10px rgba(0, 0, 0, 0.05);
    position: relative;
`;

export const TutorialBottomNavButton = styled.div<{
    active?: boolean;
    isFocused?: boolean;
}>`
    cursor: pointer;
    display: flex;
    flex: 1 0 auto;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 64px;
    height: 64px;
    ${Caption1}
    color: ${({ active }) => (active ? ORANGE2 : GRAY3)};
    svg {
        path {
            fill: ${({ active }) => (active ? ORANGE2 : GRAY3)};
        }
    }
    svg:last-child {
        position: absolute;
        top: 4px;
        right: 4px;
        path {
            fill: ${MANDARIN2};
        }
    }
    position: relative;
    ${({ isFocused }) =>
        isFocused &&
        css`
            z-index: 888;
            background-color: white;
        `}
`;

// TutorialLayout end

// TutorialHome start

export const TutorialHomeContainer = styled(Container)`
    padding: 16px;
    position: relative;
`;
export const TutorialHomeEditContainer = styled(RowContainer)`
    height: 20px;
    justify-content: flex-end;
    padding-bottom: 16px;
    box-sizing: content-box;
    position: relative;
    & > span {
        position: absolute;
        top: 0;
        right: 0;
        z-index: 3;
    }
`;

export const TutorialHomeTitleBox = styled(Box)`
    padding-top: 16px;
    width: 100%;
    justify-content: center;
`;
export const TutorialHomeContentContainer = styled(RowContainer)`
    padding: 50px 54px 34px 54px;
    justify-content: space-between;
    flex-wrap: wrap;
`;

export const TutorialHomePersonContainer = styled(Container)<{
    isFocused?: boolean;
}>`
    width: 100px;
    position: relative;
    border-radius: 16px;
    padding: 4px;
    box-sizing: content-box;
    margin-bottom: 50px;
    ${({ isFocused }) =>
        isFocused &&
        css`
            z-index: 888;
            background-color: white;
        `}
    & > svg {
        position: absolute;
        bottom: 8px;
        right: 4px;
    }
`;

export const TutorialHomePersonImageBox = styled(Box)<{
    background?: string;
    transparent?: boolean;
}>`
    ${({ background }) =>
        !background
            ? GRAY0_BACKGROUND
            : css`
                  background-color: ${background};
              `}
    ${({ transparent }) =>
        !transparent
            ? css`
                  box-shadow: 0 4px 10px 4px rgba(0, 0, 0, 0.1);
              `
            : css`
                  background: none;
              `}
    width: 100%;
    padding-bottom: 100%;
    border-radius: 50%;
    position: relative;
    overflow: hidden;
    & > svg {
        ${ABSOLUTE_CENTER}
    }
`;
export const TutorialHomePersonTextContainer = styled(Container)`
    align-items: center;
`;

// TutorialHome end

// TutorialLanding start

export const TutorialLandingContainer = styled(Container)`
    padding: 16px;
`;

export const TutorialLandingRelationContainer = styled(RowContainer)`
    padding-top: 22px;
    justify-content: center;
`;

export const TutorialLandingPersonContainer = styled(Container)`
    width: fit-content;
`;

export const TutorialLandingSectionContainer = styled(Container)`
    align-items: flex-start;
    justify-content: space-between;
    height: 100%;
    position: relative;
`;

export const TutorialLandingAlertContainer = styled(Container)<{
    isFocused?: boolean;
}>`
    position: relative;

    ${({ isFocused }) =>
        isFocused &&
        css`
            z-index: 888;
        `}
    & > svg {
        position: absolute;
        right: 16px;
        top: 50%;
        transform: translateY(-50%);
    }
`;

export const TutorialLandingSectionTop = styled(Container)`
    align-items: flex-start;
    position: relative;
    z-index: 1;
`;

export const TutorialLandingSectionButton = styled(RowContainer)`
    justify-content: flex-start;
    position: relative;
    z-index: 1;
`;

export const TutorialLandingSectionImageBox = styled(Box)<{
    width: string;
    height: string;
    top?: string;
    bottom?: string;
    left?: string;
    right?: string;
}>`
    position: absolute;
    width: ${({ width }) => width};
    height: ${({ height }) => height};
    ${({ top, bottom, left, right }) => css`
        top: ${top || 'auto'};
        bottom: ${bottom || 'auto'};
        left: ${left || 'auto'};
        right: ${right || 'auto'};
    `}
`;

export const TutorialLandingReportContainer = styled(RowContainer)<{
    textSizePref: TextSizePreferenceType;
}>`
    margin-bottom: 16px;
    & span {
        ${({ textSizePref }) => textSizePicker(textSizePref, 'b2')}
    }
    & > span:first-child {
        max-width: 70%;
        ${TEXT_ELLIPSIS}
    }
`;

export const TutorialLandingBirthTextContainer = styled(RowContainer)`
    justify-content: flex-start;
`;

// TutorialLanding end

// TutorialQna start

export const TutorialQnaContainer = styled(Container)<{
    page?: number;
    subPage?: number;
    isAnswered?: boolean;
    isFocused?: boolean;
}>`
    padding: 16px;
    ${({ isFocused }) =>
        isFocused &&
        css`
            position: relative;
            z-index: 888;
        `}
`;

export const TutorialQnaTagContainer = styled(RowContainer)<{
    isFocused?: boolean;
}>`
    justify-content: center;
    position: relative;
    ${({ isFocused }) =>
        isFocused &&
        css`
            z-index: 888;
        `}
`;

export const TutorialQnaTag = styled(Box)<{
    isAnswered: boolean;
    isCurrent: boolean;
}>`
    width: 16%;
    height: 48px;
    border-radius: 16px 16px 0 0;
    margin-right: 8px;
    &:last-child {
        margin: 0;
    }
    justify-content: center;
    align-items: center;
    ${({ isAnswered }) => (isAnswered ? ORANGE2_BACKGROUND : GRAY1_BACKGROUND)}
    ${({ isCurrent }) =>
        isCurrent
            ? ORANGE2_BACKGROUND
            : css`
                  opacity: 0.4;
              `}

    & > span {
        color: ${WHITE};
    }
`;

export const TutorialQnaAnsweredContentContainer = styled(Container)`
    align-items: flex-start;
    height: 100%;
`;

export const TutorialChatContainer = styled(Container)<{ isFocused: boolean }>`
    ${({ isFocused }) =>
        isFocused &&
        css`
            background-color: white;
            border-radius: 18px;
            position: relative;
            z-index: 888;
            overflow: hidden;
            padding: 8px;
        `}
`;

export const TutorialAnswerContainer = styled(Container)<{
    isFocused: boolean;
}>`
    ${({ isFocused }) =>
        isFocused &&
        css`
            position: relative;
            & .answerButton {
                position: relative;
                z-index: 888;
                & svg {
                    display: block !important;
                    position: absolute;
                    top: 50%;
                    right: 16px;
                    transform: translateY(-50%);
                }
            }
        `}
`;

// TutorialQna end

// TutorialAnswerLog start

export const TutorialAnswerLogContainer = styled(Container)`
    padding: 0 16px;
`;

export const TutorialAnswerLogRowContainer = styled(RowContainer)`
    position: relative;
    margin-top: 48px;
    align-items: flex-end;
    height: 156px;
`;

export const TutorialAnswerLogShelf = styled(Container)`
    height: 48px;
    ${WHITE_BACKGROUND}
    box-shadow: 0px -20px 20px 0 rgba(0, 0, 0, 0.07);
    justify-content: flex-end;
    &::after {
        display: block;
        content: '';
        width: 100%;
        height: 16px;
        ${WHITE_BACKGROUND}
        box-shadow: 0px 10px 10px 5px rgba(0, 0, 0, 0.10), 0px -2px 4px 0px rgba(0, 0, 0, 0.05);
    }
`;

export const TutorialAnswerLogBookContainer = styled(RowContainer)<{
    isFocused?: boolean;
}>`
    position: absolute;
    width: 70%;
    left: 50%;
    transform: translateX(-50%);
    bottom: 24px;
    & > div {
        position: relative;
        & > svg {
            position: absolute;
            bottom: 8px;
            right: 8px;
        }
    }
    ${({ isFocused }) =>
        isFocused &&
        css`
            z-index: 888;
            & > div:first-child {
                position: relative;
                pointer-evnets: none;
                &::after {
                    display: block;
                    content: '';
                    ${ABSOLUTE_COVER}
                    background-color:rgba(0,0,0,0.75);
                    pointer-evnets: none;
                }
                & > svg {
                    display: none;
                }
            }
        `}
`;

export const TutorialAnswerLogBook = styled(RowContainer)<{
    incompleted: boolean;
}>`
    width: 98px;
    height: 132px;
    ${({ incompleted }) =>
        incompleted ? MANDARIN1_BACKGROUND : ORANGE2_BACKGROUND}
    box-shadow: 4px 4px 4px 0px rgba(0, 0, 0, 0.10), -4px 4px 4px 0px rgba(0, 0, 0, 0.10);
    justify-content: flex-end;
`;
export const TutorialAnswerLogBookCover = styled(RowContainer)`
    width: 92px;
    height: 132px;
    box-shadow:
        0px -5px 5px 0px rgba(0, 0, 0, 0.03) inset,
        2px 0px 5px 0px rgba(0, 0, 0, 0.07) inset;
    algin-items: center;
    justify-content: center;
`;

export const TutorialAnswerLogBookIncompleteContainer = styled(RowContainer)`
    algin-items: center;
    justify-content: center;
`;

export const TutorialAnswerLogBookGaugeContainer = styled(Container)`
    width: fit-content;
`;

export const TutorialAnswerLogGaugeBox = styled(Box)<{ answered: boolean }>`
    border: 1px solid ${GRAY3};
    border-bottom: 0;
    border-right: 0;
    width: 16px;
    height: 16px;
    margin-bottom: 2px;
    ${({ answered }) => answered && ORANGE2_BACKGROUND}
`;

// TutorialAnswerLog end

// TutorialLogDetail start

export const TutorialLogDetailContainer = styled(Container)`
    height: 100%;
    padding: 44px 0;
    padding-right: 32px;
`;

export const TutorialLogDetailDiaryContainer = styled(RowContainer)`
    height: 100%;
    position: relative;
`;

export const TutorialLogDetailContentContainer = styled(Container)`
    padding: 16px;
    height: 100%;
    overflow-y: scroll;
    box-shadow:
        8px 8px 10px 0px rgba(0, 0, 0, 0.1),
        0px 10px 20px 0px rgba(0, 0, 0, 0.05) inset;
    align-items: flex-start;
    justify-content: flex-start;
    background-color: white;
`;

export const TutorialLogDetailTagContainer = styled(Container)<{
    isFocused: boolean;
}>`
    width: fit-content;
    height: 100%;
    ${({ isFocused }) =>
        isFocused &&
        css`
            position: relative;
            z-index: 888;
            pointer-events: none;
        `}
`;

export const TutorialLogDetailTag = styled(Box)<{ selected: boolean }>`
    width: 32px;
    flex: 1 0 auto;
    padding: 16px 0;
    border-radius: 0 10px 10px 0;
    justify-content: center;
    box-shadow:
        4px 4px 6px 0 rgba(0, 0, 0, 0.1) inset,
        -6px 0 6px 0 rgba(0, 0, 0, 0.1) inset;

    ${ORANGE2_BACKGROUND}
    ${({ selected }) => !selected && 'opacity:0.3;'};
    & > span {
        transform: rotate(0.25turn);
    }
`;

export const TutorialLogDetailFrontContainer = styled(Container)`
    height: 100%;
    padding: 32px 20px 54px 20px;
    position: relative;
`;

export const TutorialLogDetailTitleContainer = styled(Container)`
    align-items: flex-start;
    padding-left: 12px;
`;

export const TutorialLogDetailSubtitleContainer = styled(Container)`
    align-items: flex-end;
    padding-right: 24px;
`;

export const TutorialLogDetailIndexContainer = styled(Container)<{
    isFocused: boolean;
}>`
    padding: 16px 18px;
    flex: 1 0 auto;
    ${GRAY0_BACKGROUND}
    ${({ isFocused }) =>
        isFocused &&
        css`
            position: relative;
            z-index: 888;
            pointer-events: none;
        `}
`;

export const TutorialLogDetailLinkContainer = styled(RowContainer)`
    align-items: flex-start;
    justify-content: flex-start;
    margin-bottom: 40px;
    &:last-child {
        margin: 0;
    }
`;
// TutorialLogDetail end

// TutorialReport start

export const TutorialReportContainer = styled(Container)`
    padding: 16px;
    padding-top: 32px;
    & > div {
        margin-bottom: 16px;
        &:last-child {
            margin-bottom: 0;
        }
    }
`;

export const TutorialReportCardWrapper = styled(Container)<{
    isFocused?: boolean;
}>`
    & > svg {
        position: absolute;
        bottom: 16px;
        right: 16px;
    }
    ${({ isFocused }) =>
        isFocused &&
        css`
            position: relative;
            z-index: 888;
        `}
`;

export const TutorialReportCardContainer = styled(RowContainer)`
    justify-content: flex-start;
`;
export const TutorialReportCardTextContainer = styled(Container)`
    width: 100%;
    height: 100%;
    align-items: flex-start;
    justify-content: space-between;
`;

// TutorialReport end

// TutorialReportDetail start

export const TutorialReportDetailContainer = styled(Container)`
    padding: 32px 0;
    height: 100%;
`;

export const TutorialReportDetailHeaderContainer = styled(RowContainer)`
    padding: 0 16px;
    & > div > span {
        white-space: nowrap;
    }
`;

export const TutorialReportDetailContentContainer = styled(Container)<{
    isFocused?: boolean;
}>`
    height: 100%;
    padding-top: 32px;
    ${({ isFocused }) =>
        isFocused
            ? css`
                  position: relative;
                  z-index: 888;
                  pointer-events: auto;
              `
            : css`
                  pointer-events: none;
              `}
    .swiper {
        width: 100%;
        height: 100%;
        --swiper-theme-color: ${ORANGE2};
        .swiper-slide {
        }
        .swiper-pagination {
            opacity: 0.2;
        }
    }
`;

export const TutorialReportDetailCardFront = styled(Container)<{
    isActive: boolean;
}>`
    width: 100%;
    ${({ isActive }) =>
        isActive
            ? css`
                  height: 86%;
                  ${ORANGE_UNSELECTED_BACKGROUND}
              `
            : css`
                  height: 70%;
                  transform: translateY(10%);
                  ${GRAY2_BACKGROUND}
              `}
    justify-content: center;
    border-radius: 16px;
    overflow: hidden;
    transition: 0.2s;
`;

export const TutorialReportDetailCardBack = styled(Container)<{
    isActive: boolean;
}>`
    width: 100%;
    ${({ isActive }) =>
        isActive
            ? css`
                  height: 86%;
                  ${MANDARIN2_BACKGROUND}
                  overflow:auto;
              `
            : css`
                  height: 70%;
                  transform: translateY(10%);
                  ${GRAY2_BACKGROUND}
                  overflow:hidden;
              `}
    border-radius: 16px;
    justify-content: flex-start;
    padding: 16px;
`;

// TutorialReportDetail end

// TutorialMall start

export const TutorialMallNavContainer = styled(RowContainer)``;

export const TutorialMallMenuButton = styled.div<{ selected?: boolean }>`
    width: 28%;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 12px 0;
    opacity: 0.4;
    ${({ selected }) =>
        selected &&
        css`
            box-shadow: 0 4px 0px -2px ${ORANGE2};
            color: ${ORANGE2};
            opacity: 1;
        `};
`;

export const TutorialMallContainer = styled(Container)`
    height: 100%;
`;

export const TutorialMallRecommendedContainer = styled(Container)`
    height: 100%;
    & > .swiper {
        width: 100%;
        height: 100%;
        --swiper-theme-color: ${ORANGE2};
        .swiper-slide {
            padding: 16px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
        }
        .swiper-pagination {
        }
    }
`;

export const TutorialMallRecommendedPriceContainer = styled(RowContainer)`
    width: fit-content;
`;

export const TutorialMallRecommendedImageSlideContainer = styled(Container)`
    border-radius: 16px;
    overflow: hidden;
    height: 100%;
    & > .swiper {
        width: 100%;
        height: 100%;
        --swiper-theme-color: ${ORANGE2};
        .swiper-slide {
        }
        .swiper-pagination {
        }
    }
`;

export const TutorialMallRecommendedTagContainer = styled(RowContainer)`
    justify-content: flex-start;
    width: 80%;
    flex-wrap: wrap;
    & > div {
        margin-right: 4px;
    }
`;

// TutorialMall end
