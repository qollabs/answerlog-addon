import { LoadingContainer, SpinLoader } from '@Atoms/Loading';
import { useRequest } from '@Hooks/useRequest';
import { MainLayout } from '@Organisms/MainLayout';
import {
    AnswerStatisticType,
    IReportData,
    IReportDetail,
    TouchCoordinateType,
} from '@Types/types';
import {
    ReportDetailCardContainer,
    ReportDetailContainer,
    ReportDetailChoiceContainer,
    ReportDetailSlideContainer,
    ReportDetailSubjectiveAnswerContainer,
    ReportDetailSubjectiveAnswerSquare,
    ReportDetailSubjectiveContainer,
    ReportDetailEmptyContainer,
    ReportDetailSubjectiveLikeContainer,
    ReportDetailTitleContainer,
    ReportDetailCardContentContainer,
    ReportDetailMultipleAnswerContainer,
} from './ReportDetail.styled';
import { useAsyncEffect } from '@Hooks/useAsyncEffect';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useRef, useState } from 'react';
import { dummyReportDetail } from '@Constants/dummyObjects';
import { Text } from '@Atoms/Typography';
import { TextTag } from '@Molecules/TextTag';
import { Gap } from '@Styles/App.styled';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { ImageBox } from '@Atoms/ImageBox';
import { categoryPicker } from '@Functions/categoryPicker';
import { MANDARIN1, WHITE } from '@Styles/colors';
import { reportDataOrganizer } from '@Functions/statisticDataOrganizer';
import { BarGraphHorizontal } from '@Organisms/Graphs';
import { SpeechBubble } from '@Molecules/SpeechBubble';
import { IconButton } from '@Atoms/IconButton';
import HeartFilledIcon from '@Images/icons/heart_filled.svg';
import HeartOutlinedIcon from '@Images/icons/heart_outlined.svg';
import ReloadIcon from '@Images/icons/reload.svg';
import { Button } from '@Atoms/Button';

export interface SortedDataType {
    sort: string;
    data: IReportData[];
}

export const ReportDetail = () => {
    const { request, loading } = useRequest();
    const router = useRouter();
    const { id: questionId } = router.query;

    const [reportDetail, setReportDetail] =
        useState<IReportDetail>(dummyReportDetail);
    const [myAnswer, setMyAnswer] = useState<string[]>([]);
    const [dataSetByAge, setDataSetByAge] = useState<SortedDataType[]>([]);
    const [reportCardSwiper, setReportCardSwiper] = useState<SwiperCore>();
    const [activeSwiperIndex, setActiveSwiperIndex] = useState(0);
    const [isAnswerLongEnough, setIsAnswerLongEnough] = useState(false);
    const [randomIndexes, setRandomIndexes] = useState<number[]>([]);
    const [spreadLongAnswer, setSpreadLongAnswer] = useState(false);
    const [touchStartCoordinate, setTouchStartCoordinate] =
        useState<TouchCoordinateType>({
            x: 0,
            y: 0,
        });

    const answerBoxRefs = useRef<(HTMLDivElement | null)[]>([]);
    const slideContentRefs = useRef<(HTMLDivElement | null)[]>([]);

    // get report data
    useAsyncEffect(async () => {
        if (!questionId) return;
        const resReportDetail = await request({
            url: `/api/report/${questionId}`,
            method: 'GET',
        });
        if (resReportDetail) {
            console.log(resReportDetail.data);
            setReportDetail(resReportDetail.data);
        }
    }, [questionId]);

    // distribute report data
    useEffect(() => {
        let reportDetailTemp: IReportDetail = { ...reportDetail };
        // type 0 1 주관식일 경우 음성 녹음 url로 오는 답변을 없앤다.
        if (reportDetail.question_type < 2) {
            reportDetailTemp.answers = reportDetailTemp.answers.filter(
                (answer) =>
                    !answer.answer_content.some((content) =>
                        RegExp(/^https\S{1,}qollabs\S{1,}mp3$/).test(content),
                    ),
            );
        }

        // type 2 3 척도형 객관식 또는 복수형일 경우 그 외 선택지를 없앤다.
        if (
            reportDetail.question_type === 2 ||
            reportDetail.question_type === 3
        ) {
            reportDetailTemp.answers = reportDetailTemp.answers.filter(
                (answer) =>
                    answer.answer_content.every(
                        (content) =>
                            reportDetailTemp.question_options?.includes(
                                content,
                            ),
                    ),
            );
        }

        setMyAnswer(reportDetailTemp.user_answer);
        const allAges: SortedDataType = {
            sort: '전체',
            data: reportDetailTemp.answers,
        };
        const underThirties: SortedDataType = {
            sort: '30대 이하',
            data: reportDetailTemp.answers.filter(
                (answer) => answer.user.age < 40,
            ),
        };
        const fourtiesFifties: SortedDataType = {
            sort: '40대, 50대',
            data: reportDetailTemp.answers.filter(
                (answer) => answer.user.age > 39 && answer.user.age < 60,
            ),
        };
        const sixtiesSeventies: SortedDataType = {
            sort: '60, 70대',
            data: reportDetailTemp.answers.filter(
                (answer) => answer.user.age > 59 && answer.user.age < 80,
            ),
        };
        const overEighties: SortedDataType = {
            sort: '80대 이상',
            data: reportDetailTemp.answers.filter(
                (answer) => answer.user.age > 79,
            ),
        };
        let dataSetByAgeTemp: SortedDataType[] = [
            allAges,
            underThirties,
            fourtiesFifties,
            sixtiesSeventies,
            overEighties,
        ];
        let randomIndexesTemp: number[] = [];
        dataSetByAgeTemp.forEach((dataSet, index) => {
            randomIndexesTemp.push(
                Math.floor(Math.random() * dataSet.data.length),
            );
        });
        setDataSetByAge(dataSetByAgeTemp);
        setRandomIndexes(randomIndexesTemp);
    }, [reportDetail]);

    // add eventlistener to slideContentRefs
    useEffect(() => {
        if (slideContentRefs.current.length > 0) {
            slideContentRefs.current.forEach((ref, index) => {
                if (!ref) return;
                ref.addEventListener('touchstart', onTouchStartSlide);
                ref.addEventListener('touchmove', onTouchMoveSlide);
            });
        }
        return () => {
            if (slideContentRefs.current.length > 0) {
                slideContentRefs.current.forEach((ref, index) => {
                    if (!ref) return;
                    ref.removeEventListener('touchstart', onTouchStartSlide);
                    ref.removeEventListener('touchmove', onTouchMoveSlide);
                });
            }
        };
    }, [
        slideContentRefs.current.length,
        reportCardSwiper,
        touchStartCoordinate,
        activeSwiperIndex,
    ]);

    // check answer box height
    useEffect(() => {
        if (!reportCardSwiper) return;
        const targetRef = answerBoxRefs.current[activeSwiperIndex];
        if (!targetRef) return;
        let judgement: boolean = targetRef.offsetHeight > 80;
        setIsAnswerLongEnough(judgement);
    }, [randomIndexes, activeSwiperIndex, dataSetByAge]);

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
        const deltaX = Math.abs(touchMove.clientX - touchStartCoordinate.x);
        const deltaY = Math.abs(touchMove.clientY - touchStartCoordinate.y);
        const angle = Math.atan(deltaY / deltaX) * (180 / Math.PI);
        if (deltaX > deltaY) {
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

    const addToslideContentRefs = (
        element: HTMLDivElement | null,
        index: number,
    ) => {
        slideContentRefs.current[index] = element;
    };
    const addToAnswerBoxRefs = (
        element: HTMLDivElement | null,
        index: number,
    ) => {
        answerBoxRefs.current[index] = element;
    };

    const pickRandomAnswerData = (dataSetIndex: number) => {
        let randomIndex: number = Math.floor(
            Math.random() * dataSetByAge[dataSetIndex].data.length,
        );
        let randomIndexesTemp = [...randomIndexes];
        randomIndexesTemp[dataSetIndex] = randomIndex;
        setRandomIndexes(randomIndexesTemp);
    };

    const likeOrUnlike = async (
        userId: string,
        userLinkId: string,
        dataSetIndex: number,
        answerIndex: number,
    ) => {
        const resLike = await request({
            url: `/api/report/${questionId}/like`,
            method: 'PATCH',
            data: { user_id: userId, user_link_id: userLinkId },
            disableLoading: true,
        });

        if (resLike) {
            console.log(resLike.data);
            let dataSetByAgeTemp = [...dataSetByAge];
            let targetData = dataSetByAgeTemp[dataSetIndex].data[answerIndex];
            targetData.like_yn = resLike.data.like_yn;
            targetData.like_count = resLike.data.like_count;
            setDataSetByAge(dataSetByAgeTemp);
        }
    };

    return (
        <MainLayout>
            {loading ? (
                <LoadingContainer>
                    <SpinLoader />
                </LoadingContainer>
            ) : (
                <ReportDetailContainer>
                    <ReportDetailTitleContainer>
                        <Text size="h2">{reportDetail.question_title}</Text>
                        <TextTag category={reportDetail.question_category} />
                    </ReportDetailTitleContainer>
                    <Gap height="32px" />
                    <ReportDetailSlideContainer>
                        <Swiper
                            modules={[Pagination]}
                            pagination
                            onSwiper={setReportCardSwiper}
                            slidesPerView={1.2}
                            centeredSlides
                            spaceBetween={26}
                            onSlideChange={(swiper) => {
                                setActiveSwiperIndex(swiper.activeIndex);
                            }}
                            onAfterInit={(swiper) => {
                                console.log(swiper.activeIndex);
                                setActiveSwiperIndex(swiper.activeIndex);
                            }}
                        >
                            {dataSetByAge.map((dataSet, i) => (
                                <SwiperSlide key={dataSet.sort}>
                                    {({ isActive }) => (
                                        <ReportDetailCardContainer
                                            isActive={isActive}
                                        >
                                            <ImageBox
                                                image={
                                                    categoryPicker(
                                                        reportDetail.question_category,
                                                    ).image
                                                }
                                                backgroundColor={MANDARIN1}
                                            />
                                            <Gap height="16px" />
                                            <Text color="white" size="b0">
                                                {dataSet.sort}
                                            </Text>
                                            <Gap height="16px" />
                                            <ReportDetailCardContentContainer
                                                className="report-detail-card-content"
                                                ref={(element) =>
                                                    addToslideContentRefs(
                                                        element,
                                                        i,
                                                    )
                                                }
                                            >
                                                {/* 데이터 없음 */}
                                                {dataSet.data.length === 0 ? (
                                                    <ReportDetailEmptyContainer>
                                                        <Text
                                                            size="h2"
                                                            textAlign="center"
                                                        >
                                                            아직 다른 분들의
                                                            답변이 없어요
                                                        </Text>
                                                        <Text textAlign="center">
                                                            가족들을 더
                                                            초대해보는건
                                                            어떨까요?
                                                        </Text>
                                                        <Gap height="16px" />
                                                        <Button
                                                            height="48px"
                                                            color="pink"
                                                            onClickButton={() =>
                                                                router.push(
                                                                    '/invite',
                                                                )
                                                            }
                                                        >
                                                            초대하러 가기
                                                        </Button>
                                                    </ReportDetailEmptyContainer>
                                                ) : // 객관식
                                                reportDetail.question_type >
                                                  1 ? (
                                                    <ReportDetailChoiceContainer>
                                                        <BarGraphHorizontal
                                                            data={reportDataOrganizer(
                                                                dataSet.data,
                                                                reportDetail.question_options ||
                                                                    [],
                                                            )}
                                                            focus={myAnswer}
                                                        />
                                                        {reportDetail.question_type ===
                                                            3 && (
                                                            <ReportDetailMultipleAnswerContainer>
                                                                <Gap height="16px" />
                                                                <Text
                                                                    color="white"
                                                                    size="b2"
                                                                >
                                                                    복수 선택이
                                                                    가능한
                                                                    질문이에요
                                                                </Text>
                                                            </ReportDetailMultipleAnswerContainer>
                                                        )}
                                                    </ReportDetailChoiceContainer>
                                                ) : (
                                                    // 주관식
                                                    <ReportDetailSubjectiveContainer>
                                                        <ReportDetailSubjectiveAnswerContainer>
                                                            <ReportDetailSubjectiveAnswerSquare
                                                                ref={(
                                                                    element,
                                                                ) =>
                                                                    addToAnswerBoxRefs(
                                                                        element,
                                                                        i,
                                                                    )
                                                                }
                                                                spread={
                                                                    spreadLongAnswer
                                                                }
                                                            >
                                                                <Text bold>
                                                                    {
                                                                        dataSet
                                                                            .data[
                                                                            randomIndexes[
                                                                                i
                                                                            ]
                                                                        ]
                                                                            .answer_content[0]
                                                                    }
                                                                </Text>
                                                                {isAnswerLongEnough && (
                                                                    <>
                                                                        <IconButton
                                                                            onClickButton={() =>
                                                                                setSpreadLongAnswer(
                                                                                    !spreadLongAnswer,
                                                                                )
                                                                            }
                                                                        >
                                                                            <Gap height="8px" />
                                                                            <Text>
                                                                                {' '}
                                                                                {spreadLongAnswer
                                                                                    ? '접기'
                                                                                    : '더보기'}
                                                                            </Text>
                                                                        </IconButton>
                                                                    </>
                                                                )}
                                                            </ReportDetailSubjectiveAnswerSquare>
                                                            <Gap height="4px" />
                                                            <Text
                                                                color="white"
                                                                size="b2"
                                                            >
                                                                -{' '}
                                                                {
                                                                    dataSet
                                                                        .data[
                                                                        randomIndexes[
                                                                            i
                                                                        ]
                                                                    ].user.age
                                                                }
                                                                세,{' '}
                                                                {
                                                                    dataSet
                                                                        .data[
                                                                        randomIndexes[
                                                                            i
                                                                        ]
                                                                    ].user
                                                                        .relation
                                                                }
                                                            </Text>
                                                        </ReportDetailSubjectiveAnswerContainer>
                                                        <Gap height="24px" />
                                                        <ReportDetailSubjectiveLikeContainer
                                                            onClick={() =>
                                                                likeOrUnlike(
                                                                    dataSet
                                                                        .data[
                                                                        randomIndexes[
                                                                            i
                                                                        ]
                                                                    ].user_id,
                                                                    dataSet
                                                                        .data[
                                                                        randomIndexes[
                                                                            i
                                                                        ]
                                                                    ]
                                                                        .user_link_id,
                                                                    i,
                                                                    randomIndexes[
                                                                        i
                                                                    ],
                                                                )
                                                            }
                                                        >
                                                            {dataSet.data[
                                                                randomIndexes[i]
                                                            ].like_yn ? (
                                                                <HeartFilledIcon
                                                                    width="24px"
                                                                    height="24px"
                                                                    color={
                                                                        WHITE
                                                                    }
                                                                />
                                                            ) : (
                                                                <HeartOutlinedIcon
                                                                    width="24px"
                                                                    height="24px"
                                                                    color={
                                                                        WHITE
                                                                    }
                                                                />
                                                            )}

                                                            <Gap width="4px" />
                                                            <Text color="white">
                                                                {
                                                                    dataSet
                                                                        .data[
                                                                        randomIndexes[
                                                                            i
                                                                        ]
                                                                    ].like_count
                                                                }
                                                                명이 이 답변을
                                                                좋아해요
                                                            </Text>
                                                        </ReportDetailSubjectiveLikeContainer>
                                                        <Gap height="32px" />
                                                        <Button
                                                            onClickButton={() =>
                                                                pickRandomAnswerData(
                                                                    i,
                                                                )
                                                            }
                                                        >
                                                            <ReloadIcon />
                                                            <Gap width="4px" />
                                                            다른 답변 보기
                                                        </Button>
                                                    </ReportDetailSubjectiveContainer>
                                                )}
                                            </ReportDetailCardContentContainer>
                                        </ReportDetailCardContainer>
                                    )}
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </ReportDetailSlideContainer>
                </ReportDetailContainer>
            )}
        </MainLayout>
    );
};
