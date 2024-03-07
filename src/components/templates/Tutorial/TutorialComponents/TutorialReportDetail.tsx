import { useEffect, useRef, useState } from 'react';
import { Text } from '@Atoms/Typography';
import {
    TutorialGuideContainer,
    TutorialReportDetailCardBack,
    TutorialReportDetailCardFront,
    TutorialReportDetailContainer,
    TutorialReportDetailContentContainer,
    TutorialReportDetailHeaderContainer,
} from '../Tutorial.styled';
import { TextTag } from '@Molecules/TextTag';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import ReactCardFlip from 'react-card-flip';
import { tutorialReportDetail, tutorialdataSets } from './TutorialContants';
import { ImageBox } from '@Atoms/ImageBox';
import { Gap } from '@Styles/App.styled';
import { categoryPicker } from '@Functions/categoryPicker';
import { BarGraphHorizontal, BarGraphSymmetric } from '@Organisms/Graphs';
import {
    AnswerStatisticType,
    IReportData,
    TouchCoordinateType,
} from '@Types/types';
import { PageFlipType } from '../Tutorial';
import PointoutOutlined from '@Images/icons/pointout_outlined.svg';
import { WHITE } from '@Styles/colors';
import { useActionOnTouch } from '@Hooks/useActionOnTouch';

interface TutorialReportDetailProp {
    page: number;
    setPage: (page: number) => void;
    goToNextPage: (page?: PageFlipType) => void;
}

export const TutorialReportDetail = ({
    page,
    setPage,
    goToNextPage,
}: TutorialReportDetailProp) => {
    const { actionOnTouchEnd } = useActionOnTouch();

    const [isFlipped, setIsFlipped] = useState(false);
    const [touchStartCoordinate, setTouchStartCoordinate] =
        useState<TouchCoordinateType>({
            x: 0,
            y: 0,
        });
    const [activeSlideIndex, setActiveSlideIndex] = useState(0);

    const reportDetailSlideTouchRef = useRef<HTMLDivElement>(null);

    // set touch eventListener about scrolling on slide
    useEffect(() => {
        const touchElement = reportDetailSlideTouchRef.current;
        if (touchElement) {
            touchElement.addEventListener('touchstart', onTouchStartSlide);
            touchElement.addEventListener('touchmove', onTouchMoveSlide);
        }

        return () => {
            if (touchElement) {
                touchElement.removeEventListener(
                    'touchstart',
                    onTouchStartSlide,
                );
                touchElement.removeEventListener('touchmove', onTouchMoveSlide);
            }
        };
    }, [touchStartCoordinate, activeSlideIndex, isFlipped]);

    const onTouchStartSlide = (e: TouchEvent) => {
        const touchStart = e.touches[0];
        const touchStartCoordinateTemp: TouchCoordinateType = {
            x: touchStart.clientX,
            y: touchStart.clientY,
        };
        setTouchStartCoordinate(touchStartCoordinateTemp);
    };

    const onTouchMoveSlide = (e: TouchEvent) => {
        const touchMove = e.touches[0];
        const deltaX = touchMove.clientX - touchStartCoordinate.x;
        const deltaY = touchMove.clientY - touchStartCoordinate.y;
        const angle =
            Math.atan(Math.abs(deltaY) / Math.abs(deltaX)) * (180 / Math.PI);
        if (deltaX < 10 && deltaY < 10) {
            // when tapped
            e.preventDefault();
            e.stopPropagation();
        }
        if (Math.abs(deltaX) > Math.abs(deltaY)) {
            // horizontally swiped
            e.preventDefault();
        } else if (angle < 60) {
            // vertically but not dramatically vertically swiped
            e.preventDefault();
        } else {
            // scroll action activated
            e.stopPropagation();
        }
    };

    const statisticDataOrganizer = (
        // IReportData => any 임시 수정
        dataSet: any[],
        options: string[],
    ) => {
        let answerStatistics: AnswerStatisticType[] = [];
        options.forEach((option, i) => {
            let targetData = dataSet.filter(
                (data) => data.answer_content === option,
            );
            let count = targetData.length;
            let answer = option;
            let targetStatistic: AnswerStatisticType = {
                answer,
                count,
            };
            answerStatistics.push(targetStatistic);
        });
        let answerStatisticsSorted = answerStatistics.sort(
            (a, b) => b.count - a.count,
        );
        // 그 외 답변 있는지 체크 후 있으면 삽입
        let etcStatistic: AnswerStatisticType = {
            answer: '그 외',
            count: 0,
        };
        dataSet.forEach((data, i) => {
            let noMatch = options.every(
                (option) => option !== data.answer_content,
            );
            if (noMatch) {
                etcStatistic.count++;
            }
        });
        if (etcStatistic.count > 0) {
            answerStatisticsSorted.push(etcStatistic);
        }

        return answerStatisticsSorted;
    };
    return (
        <TutorialReportDetailContainer>
            <TutorialReportDetailHeaderContainer>
                <Text size="b0">{tutorialReportDetail.question_title}</Text>
                <TextTag category={tutorialReportDetail.question_category} />
            </TutorialReportDetailHeaderContainer>
            <Gap height="64px" />
            <TutorialReportDetailContentContainer isFocused={page === 25}>
                {page === 25 && (
                    <TutorialGuideContainer
                        top="-64px"
                        isActivated
                        onClick={() => goToNextPage()}
                    >
                        <Text color="white" size="b0">
                            카드를 넘겨보며 살펴보세요
                        </Text>
                        <Gap height="16px" />
                        <Text color="white">다음으로 가기</Text>
                        <PointoutOutlined
                            color={WHITE}
                            width="24px"
                            height="24px"
                        />
                    </TutorialGuideContainer>
                )}
                <Swiper
                    modules={[Pagination]}
                    slidesPerView={1.2}
                    pagination
                    spaceBetween={26}
                    centeredSlides
                    touchAngle={30}
                    threshold={20}
                    onSlideChange={(swiper) =>
                        setActiveSlideIndex(swiper.activeIndex)
                    }
                >
                    {tutorialdataSets.map((dataSet, i) => (
                        <SwiperSlide key={dataSet.sort}>
                            {({ isActive }) => (
                                <TutorialReportDetailCardBack
                                    isActive={isActive}
                                    // onClick={
                                    //     isActive
                                    //         ? () => setIsFlipped(false)
                                    //         : () => null
                                    // }
                                    ref={
                                        activeSlideIndex === i
                                            ? reportDetailSlideTouchRef
                                            : null
                                    }
                                >
                                    <ImageBox
                                        width="100px"
                                        height="100px"
                                        image={
                                            categoryPicker(
                                                tutorialReportDetail.question_category,
                                            ).image
                                        }
                                        transparent
                                    />
                                    <Text size="b0" color="white">
                                        {dataSet.sort}
                                    </Text>
                                    <Gap height="32px" />
                                    {tutorialReportDetail.question_options
                                        .length === 2 && (
                                        <BarGraphSymmetric
                                            data={statisticDataOrganizer(
                                                dataSet.data,
                                                tutorialReportDetail.question_options,
                                            )}
                                        />
                                    )}
                                    {tutorialReportDetail.question_options
                                        .length > 2 && (
                                        <BarGraphHorizontal
                                            data={statisticDataOrganizer(
                                                dataSet.data,
                                                tutorialReportDetail.question_options,
                                            )}
                                        />
                                    )}
                                </TutorialReportDetailCardBack>
                            )}
                        </SwiperSlide>
                    ))}
                </Swiper>
            </TutorialReportDetailContentContainer>
        </TutorialReportDetailContainer>
    );
};
