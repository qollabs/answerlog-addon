import React, { useState, useContext, useEffect } from 'react';
import Image from 'next/image';
import { MainLayout } from '@Organisms/MainLayout';
import { useRouter } from 'next/router';
import { AppContext } from '@Pages/_app';
import {
    LandingAlertContainer,
    LandingAlertContentContainer,
    LandingAlertIconBox,
    LandingAlertTextContainer,
    LandingBirthTextContainer,
    LandingContainer,
    LandingPersonContainer,
    LandingRelationContainer,
    LandingReportChoiceContainer,
    LandingReportSubjectiveContainer,
    LandingSectionButton,
    LandingSectionContainer,
    LandingSectionImageBox,
    LandingSectionTop,
} from './Landing.styled';
import { CardSection } from '@Molecules/CardSection';
import { Gap } from '@Styles/App.styled';
import { Text } from '@Atoms/Typography';
import { ImageBox } from '@Atoms/ImageBox';
import PencilImage from '@Images/pencil.png';
import BookStackedImage from '@Images/book_stacked.png';
import ReportImage from '@Images/report.png';
import PresentBalloonImage from '@Images/present_balloon.png';
import CaretRightIcon from '@Images/icons/caret_right.svg';
import HeartFilledIcon from '@Images/icons/heart_filled.svg';
import CalendarIcon from '@Images/icons/calendar.svg';
import { BLACK, GRAY3, ORANGE2, ORANGE3 } from '@Styles/colors';
import { RowContainer } from '@Atoms/RowContainer';
import { Container } from '@Atoms/Container';
import { useAsyncEffect } from '@Hooks/useAsyncEffect';
import { useRequest } from '@Hooks/useRequest';
import {
    AlertType,
    AnswerStatisticType,
    IReport,
    IReportData,
    IReportDetail,
} from '@Types/types';
import { ReactiveSquare } from '@Molecules/ReactiveSquare';
import {
    postpositionSelector,
    postpositionSelectorOnly,
} from '@Functions/postpositionSelector';
import { politeWordSelector } from '@Functions/politeWordSelector';
import { LoadingContainer, SpinLoader } from '@Atoms/Loading';
import {
    ageCalculator,
    convertTime,
    dDayCounter,
} from '@Functions/convertTime';
import * as ga from '../../../lib/ga/gtag';
import { AlertTypePicker } from '@Functions/categoryPicker';
import { useActionOnTouch } from '@Hooks/useActionOnTouch';
import { reportDataOrganizer } from '@Functions/statisticDataOrganizer';
import { percentageCalculator } from '@Functions/percentageCalculator';

export const Landing = () => {
    const { request, loading } = useRequest();
    const router = useRouter();
    const {
        myName,
        myProfileImage,
        myBirth,
        textSizePref,
        recentLinkedUser,
        alerts,
    } = useContext(AppContext);
    const { actionOnTouchEnd } = useActionOnTouch();

    const [relatedAlerts, setRelatedAlerts] = useState<AlertType[]>([]);
    const [questionSetNum, setQuestionSetNum] = useState(0);
    const [questionSetDone, setQuestionSetDone] = useState(false);
    const [recentReport, setRecentReport] = useState<IReportDetail | null>(
        null,
    );
    const [subjectiveRandomIndex, setSubjectiveRandomIndex] = useState(0);

    // get qna data
    useAsyncEffect(async () => {
        const resQna = await request({
            url: '/api/user/questions',
            method: 'GET',
        });
        if (resQna) {
            setQuestionSetNum(resQna.data.questions[0].set_num);
            setQuestionSetDone(
                resQna.data.questions[4].me.answered_content.length > 0 &&
                    resQna.data.questions[4].linked.answered_content.length > 0,
            );
        }
    }, []);

    // get recent report
    useAsyncEffect(async () => {
        if (!myBirth) return;
        const resReport = await request({
            url: '/api/report',
            method: 'GET',
        });
        if (resReport) {
            let reportsTemp: IReport[] = resReport.data;
            reportsTemp = reportsTemp.filter(
                (report) => report.answered_at !== null,
            );
            let recentReportId =
                reportsTemp[reportsTemp.length - 1].question_id;
            const resRecentReport = await request({
                url: `/api/report/${recentReportId}`,
                method: 'GET',
            });
            if (resRecentReport) {
                let recentReportTemp: IReportDetail = resRecentReport.data;
                let myAge = ageCalculator(myBirth);
                recentReportTemp.answers = recentReportTemp.answers.filter(
                    (answer) => {
                        let userAge = answer.user.age;
                        if (myAge < 40) return userAge < 40;
                        else if (myAge > 39 && myAge < 60)
                            return userAge > 39 && userAge < 60;
                        else if (myAge > 59 && myAge < 80)
                            return userAge > 59 && userAge < 80;
                        else return userAge > 79;
                    },
                );
                if (recentReportTemp.question_type < 2) {
                    recentReportTemp.answers = recentReportTemp.answers.filter(
                        (answer) =>
                            !answer.answer_content.some((content) =>
                                RegExp(/^https\S{1,}qollabs\S{1,}mp3$/).test(
                                    content,
                                ),
                            ),
                    );
                }

                // type 2 3 척도형 객관식 또는 복수형일 경우 그 외 선택지를 없앤다.
                if (
                    recentReportTemp.question_type === 2 ||
                    recentReportTemp.question_type === 3
                ) {
                    recentReportTemp.answers = recentReportTemp.answers.filter(
                        (answer) =>
                            answer.answer_content.every(
                                (content) =>
                                    recentReportTemp.question_options?.includes(
                                        content,
                                    ),
                            ),
                    );
                }

                setSubjectiveRandomIndex(
                    Math.floor(Math.random() * recentReportTemp.answers.length),
                );
                setRecentReport(recentReportTemp);
            }
        }
    }, [myBirth]);

    // distribute alerts

    useEffect(() => {
        if (!alerts || !recentLinkedUser) return;
        let relatedAlertsTemp: AlertType[] = [...alerts].filter(
            (alert) => alert.related_user_id === recentLinkedUser.id,
        );
        relatedAlertsTemp.sort(
            (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
        );
        setRelatedAlerts(relatedAlertsTemp.slice(0, 3));
    }, [alerts]);

    const getPercentageForReport = (
        report: IReportDetail,
        questionOption: string,
    ) => {
        if (report.question_type < 2 || !report.question_options) return;
        let statisticData = reportDataOrganizer(
            report.answers,
            report.question_options,
        );
        if (report.question_type === 2 || report.question_type === 3) {
            statisticData = statisticData.filter(
                (datum) => datum.answer !== '그 외',
            );
        }
        let targetData: AnswerStatisticType | undefined;
        let allCount = 0;
        statisticData.forEach((datum, index) => {
            allCount += datum.count;
            if (datum.answer === questionOption) {
                targetData = datum;
            }
        });
        return targetData
            ? percentageCalculator(targetData.count, allCount)
            : 0;
    };
    return (
        <MainLayout title="홈" hideBackButton>
            {loading ? (
                <LoadingContainer>
                    <SpinLoader />
                </LoadingContainer>
            ) : (
                <LandingContainer>
                    <LandingRelationContainer>
                        <LandingPersonContainer>
                            <ImageBox
                                width="70px"
                                height="70px"
                                image={recentLinkedUser.profile_image_url}
                                border
                            />
                            <Gap height="8px" />
                            <Text textAlign="center">
                                {recentLinkedUser.relation}
                            </Text>
                            <Text color="gray4" textAlign="center">
                                {recentLinkedUser.name}
                            </Text>
                        </LandingPersonContainer>
                        <Gap width="24px" />
                        <HeartFilledIcon
                            width="24px"
                            height="24px"
                            color={ORANGE2}
                        />
                        <Gap width="24px" />
                        <LandingPersonContainer>
                            <ImageBox
                                width="70px"
                                height="70px"
                                image={myProfileImage}
                                border
                            />
                            <Gap height="8px" />
                            <Text>나</Text>
                            <Text color="gray4">{myName}</Text>
                        </LandingPersonContainer>
                    </LandingRelationContainer>
                    <Gap height="16px" />
                    <CardSection
                        deepShadow
                        onClickCardSection={() => {
                            window.location.href = `/push?prevPage=${router.pathname}`;
                        }}
                    >
                        {relatedAlerts.length > 0 ? (
                            relatedAlerts.map((alert, i) => (
                                <LandingAlertContainer>
                                    <LandingAlertContentContainer>
                                        <LandingAlertIconBox>
                                            {AlertTypePicker(
                                                alert.type,
                                                '24px',
                                                ORANGE3,
                                            )}
                                        </LandingAlertIconBox>
                                        <Gap width="12px" />
                                        <LandingAlertTextContainer>
                                            <Text>{alert.content}</Text>
                                            <Text size="c1" color="gray4">
                                                {convertTime(
                                                    alert.date,
                                                    'dotDate',
                                                )}
                                            </Text>
                                        </LandingAlertTextContainer>
                                    </LandingAlertContentContainer>
                                </LandingAlertContainer>
                            ))
                        ) : (
                            <Text>새로운 소식이 없어요</Text>
                        )}
                    </CardSection>
                    <Gap height="16px" />
                    <RowContainer>
                        <Container>
                            <CardSection deepShadow>
                                <ReactiveSquare>
                                    <LandingSectionContainer>
                                        {questionSetDone ? (
                                            <LandingSectionTop>
                                                <Text>
                                                    <Text color="orange2">
                                                        {questionSetNum}번째{' '}
                                                    </Text>
                                                    앤서록
                                                </Text>
                                                <Text>완료</Text>
                                            </LandingSectionTop>
                                        ) : (
                                            <LandingSectionTop>
                                                <Text>
                                                    <Text color="orange2">
                                                        {questionSetNum}번째{' '}
                                                    </Text>
                                                    앤서록
                                                </Text>
                                                <Text>진행중</Text>
                                            </LandingSectionTop>
                                        )}

                                        <LandingSectionButton
                                            onClick={() => router.push('/qna')}
                                            onTouchEnd={(e) =>
                                                actionOnTouchEnd(e, () =>
                                                    router.push('/qna'),
                                                )
                                            }
                                        >
                                            <Text>문답</Text>
                                            <CaretRightIcon
                                                width="24px"
                                                height="24px"
                                                color={BLACK}
                                            />
                                        </LandingSectionButton>
                                        <LandingSectionImageBox
                                            width="100px"
                                            height="100px"
                                            bottom="0"
                                            right="-24px"
                                        >
                                            <Image
                                                src={PencilImage}
                                                layout="fill"
                                            />
                                        </LandingSectionImageBox>
                                    </LandingSectionContainer>
                                </ReactiveSquare>
                            </CardSection>
                            <Gap height="16px" />
                            <CardSection deepShadow>
                                <ReactiveSquare>
                                    <LandingSectionContainer>
                                        <LandingSectionTop>
                                            <Text>
                                                <Text color="orange2">
                                                    {recentLinkedUser.relation}
                                                </Text>
                                                {postpositionSelectorOnly(
                                                    recentLinkedUser.relation,
                                                    '과와',
                                                )}{' '}
                                                함께
                                            </Text>
                                            <Text>쌓은 이야기들</Text>
                                        </LandingSectionTop>
                                        <LandingSectionButton
                                            onClick={() =>
                                                router.push('/answer-log')
                                            }
                                            onTouchEnd={(e) =>
                                                actionOnTouchEnd(e, () =>
                                                    router.push('/answer-log'),
                                                )
                                            }
                                        >
                                            <Text>답변 모음</Text>
                                            <CaretRightIcon
                                                width="24px"
                                                height="24px"
                                                color={BLACK}
                                            />
                                        </LandingSectionButton>
                                        <LandingSectionImageBox
                                            width="100px"
                                            height="100px"
                                            bottom="0"
                                            right="-42px"
                                        >
                                            <Image
                                                src={BookStackedImage}
                                                layout="fill"
                                            />
                                        </LandingSectionImageBox>
                                    </LandingSectionContainer>
                                </ReactiveSquare>
                            </CardSection>
                        </Container>
                        <Gap width="16px" />
                        <CardSection deepShadow height="100%">
                            <LandingSectionContainer>
                                {recentReport ? (
                                    <LandingSectionTop>
                                        <Text>
                                            <Text color="orange2">또래</Text>
                                            {postpositionSelectorOnly(
                                                '또래',
                                                '은는',
                                            )}{' '}
                                            이렇게
                                        </Text>
                                        <Text>답했어요</Text>
                                        <Gap height="16px" />

                                        {recentReport.question_type < 2 ? (
                                            <LandingReportSubjectiveContainer>
                                                <Text size="b2">
                                                    {
                                                        recentReport.answers[
                                                            subjectiveRandomIndex
                                                        ].answer_content[0]
                                                    }
                                                </Text>
                                                <Gap height="4px" />
                                                <Text size="c1">
                                                    -{' '}
                                                    {
                                                        recentReport.answers[
                                                            subjectiveRandomIndex
                                                        ].user.age
                                                    }
                                                    세,{' '}
                                                    {
                                                        recentReport.answers[
                                                            subjectiveRandomIndex
                                                        ].user.relation
                                                    }
                                                </Text>
                                            </LandingReportSubjectiveContainer>
                                        ) : (
                                            recentReport.question_options?.map(
                                                (option, i) => (
                                                    <LandingReportChoiceContainer
                                                        key={`report-subjective-${i}`}
                                                    >
                                                        <Text size="b2">
                                                            {i + 1} {option}
                                                        </Text>
                                                        <Text size="b2">
                                                            {getPercentageForReport(
                                                                recentReport,
                                                                option,
                                                            )}
                                                            %
                                                        </Text>
                                                    </LandingReportChoiceContainer>
                                                ),
                                            )
                                        )}
                                    </LandingSectionTop>
                                ) : (
                                    <LandingSectionTop>
                                        <Text>아직 리포트가 없어요</Text>
                                    </LandingSectionTop>
                                )}

                                <LandingSectionButton
                                    onClick={() => router.push('/report')}
                                    onTouchEnd={(e) =>
                                        actionOnTouchEnd(e, () =>
                                            router.push('/report'),
                                        )
                                    }
                                >
                                    <Text>리포트</Text>
                                    <CaretRightIcon
                                        width="24px"
                                        height="24px"
                                        color={BLACK}
                                    />
                                </LandingSectionButton>
                                <LandingSectionImageBox
                                    width="100px"
                                    height="100px"
                                    bottom="4px"
                                    right="-20px"
                                >
                                    <Image src={ReportImage} layout="fill" />
                                </LandingSectionImageBox>
                            </LandingSectionContainer>
                        </CardSection>
                    </RowContainer>
                    <Gap height="16px" />
                    <CardSection deepShadow>
                        {' '}
                        <LandingSectionContainer>
                            <LandingSectionTop>
                                <Text>새롭게 추천되는</Text>
                                <Text>
                                    <Text color="orange2">5개의</Text> 우리{' '}
                                    <Text color="orange2">맞춤 선물</Text>
                                </Text>
                            </LandingSectionTop>
                            <Gap height="16px" />
                            {recentLinkedUser.birth_date && (
                                <>
                                    <LandingBirthTextContainer>
                                        <CalendarIcon
                                            width="24px"
                                            height="24px"
                                            color={GRAY3}
                                        />
                                        <Gap width="8px" />
                                        <Text color="gray3">
                                            {convertTime(
                                                recentLinkedUser.birth_date as string,
                                                'onlyMonthDate',
                                            )}
                                        </Text>
                                    </LandingBirthTextContainer>
                                    <LandingBirthTextContainer>
                                        {dDayCounter(
                                            recentLinkedUser.birth_date as string,
                                            'right-next',
                                        ) !== 0 ? (
                                            <Text color="gray5">
                                                {`${
                                                    recentLinkedUser.relation
                                                } ${politeWordSelector(
                                                    recentLinkedUser.relation,
                                                    '생신',
                                                )}`}
                                                <Text color="gray3">까지</Text>{' '}
                                                {dDayCounter(
                                                    recentLinkedUser.birth_date as string,
                                                    'right-next',
                                                )}
                                                일
                                            </Text>
                                        ) : (
                                            <Text>{`오늘이 ${
                                                recentLinkedUser.relation
                                            } ${postpositionSelector(
                                                politeWordSelector(
                                                    recentLinkedUser.relation,
                                                    '생신',
                                                ),
                                                '이에요',
                                            )}!`}</Text>
                                        )}
                                    </LandingBirthTextContainer>
                                </>
                            )}
                            <Gap height="16px" />
                            <LandingSectionButton
                                onClick={() => router.push('/mall')}
                                onTouchEnd={(e) =>
                                    actionOnTouchEnd(e, () =>
                                        router.push('/mall'),
                                    )
                                }
                            >
                                <Text>앤서록 몰</Text>
                                <CaretRightIcon
                                    width="24px"
                                    height="24px"
                                    color={BLACK}
                                />
                            </LandingSectionButton>
                            <LandingSectionImageBox
                                width="100px"
                                height="100px"
                                bottom="-8px"
                                right="-20px"
                            >
                                <Image
                                    src={PresentBalloonImage}
                                    layout="fill"
                                />
                            </LandingSectionImageBox>
                        </LandingSectionContainer>
                    </CardSection>
                </LandingContainer>
            )}
        </MainLayout>
    );
};
