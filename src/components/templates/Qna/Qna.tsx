import { useState, useEffect, useContext, useRef } from 'react';
import { MainLayout } from '@Organisms/MainLayout';
import { useRequest } from '@Hooks/useRequest';
import { IQnA } from '@Types/types';
import { useAsyncEffect } from '@Hooks/useAsyncEffect';
import { LoadingContainer, SpinLoader } from '@Atoms/Loading';
import { Text } from '@Atoms/Typography';
import {
    QnaAnsweredContentContainer,
    QnaContainer,
    QnaTag,
    QnaTagContainer,
} from './Qna.styled';
import { CardSection } from '@Molecules/CardSection';
import { convertTime } from '@Functions/convertTime';
import { Answer } from '@Organisms/Answer';
import { Gap } from '@Styles/App.styled';
import { Question } from '@Organisms/Question';
import { BaseModal } from '@Molecules/BaseModal';
import { ChatLog } from '@Organisms/ChatLog';
import PicturesImage from '@Images/pictures.png';
import { AppContext } from '@Pages/_app';
import { politeWordSelector } from '@Functions/politeWordSelector';
import * as ga from '../../../lib/ga/gtag';
import { useActionOnTouch } from '@Hooks/useActionOnTouch';
import { useFlutter } from '@Hooks/useFlutter';

interface ResQnaType {
    questions: IQnA[];
    in_period: boolean;
    in_period_next_date: string | null;
    trigger_interval: number;
}

export const Qna = () => {
    const { request, loading } = useRequest();
    const { recentLinkedUser, isInputFocused, setIsInputFocused } =
        useContext(AppContext);
    const { actionOnTouchEnd } = useActionOnTouch();
    const { openExternalBrowser } = useFlutter();

    const [windowHeight, setWindowHeight] = useState(0);
    const [qnas, setQnas] = useState<IQnA[]>([]);
    const [qnaSetNum, setQnaSetNum] = useState(0);
    const [currentQnaIndex, setCurrentQnaIndex] = useState(0);
    const [inPeriod, setInPeriod] = useState(false);
    const [inPeriodNextDate, setInPeriodNextDate] = useState<string | null>(
        null,
    );
    const [bothAnswered, setBothAnswered] = useState(false);
    const [triggerInterval, setTriggerInterval] = useState(0);
    const [showQuestionSetDoneModal, setShowQuestionSetDoneModal] =
        useState(false);

    const qnaScrollRef = useRef<HTMLDivElement>(null);

    type timeDiffOptionType = 'date' | 'hour' | 'minute' | 'second';

    // convert time period as a given unit
    const timeDiff = (
        dateA: Date | string,
        dateB: Date | string,
        mode: timeDiffOptionType,
    ) => {
        const A = new Date(dateA);
        const B = new Date(dateB);
        const time = A.getTime() - B.getTime();
        switch (mode) {
            case 'date':
                return parseInt((time / (24 * 60 * 60 * 1000)).toFixed(), 10);
            case 'hour':
                return parseInt((time / (60 * 60 * 1000)).toFixed(), 10);
            case 'minute':
                return parseInt((time / (60 * 1000)).toFixed(), 10);
            case 'second':
                return parseInt((time / 1000).toFixed(), 10);
            default:
                console.log('invalid mode');
        }
    };

    // get qnas
    useAsyncEffect(async () => {
        const resQnas = await request({
            url: '/api/user/questions',
            method: 'GET',
        });
        if (resQnas) {
            const resQnasTemp: ResQnaType = resQnas.data;
            const {
                questions,
                in_period,
                in_period_next_date,
                trigger_interval,
            } = resQnasTemp;
            const questionsSorted = questions.sort(
                (a, b) => a.question.question_num - b.question.question_num,
            );
            let currentQnaIndexTemp = questionsSorted.findIndex(
                (question: IQnA) => question.me.answered_content.length === 0,
            );
            if (currentQnaIndexTemp < 0) {
                currentQnaIndexTemp = 4;
            }
            if (
                questionsSorted[currentQnaIndexTemp].me.answered_content
                    .length !== 0 &&
                questionsSorted[currentQnaIndexTemp].linked.answered_content
                    .length !== 0
            ) {
                setBothAnswered(true);
            }
            setQnas(questionsSorted);
            setQnaSetNum(questionsSorted[0].set_num);
            setCurrentQnaIndex(currentQnaIndexTemp);
            setInPeriod(in_period);
            setInPeriodNextDate(in_period_next_date);
            setTriggerInterval(trigger_interval);
        }
    }, []);

    // get window height
    useEffect(() => {
        if (windowHeight !== 0) return;
        setWindowHeight(window.innerHeight);
    }, []);

    // scroll to bottom on focus chat input
    useEffect(() => {
        if (!isInputFocused) return;
        if (!qnaScrollRef?.current) return;
        const targetScrollTop = qnaScrollRef.current.scrollTop;
        window.addEventListener('resize', () => {
            onResize(targetScrollTop);
        });
        return () => {
            window.removeEventListener('resize', () => {
                onResize(targetScrollTop);
            });
        };
    }, [isInputFocused, windowHeight]);

    const onResize = (scrollTop: number) => {
        qnaScrollRef?.current?.scrollTo(
            0,
            scrollTop + windowHeight - window.innerHeight,
        );
    };

    const changeFocusedQuestion = (targetQnaIndex: number) => {
        if (
            targetQnaIndex > 0 &&
            qnas[targetQnaIndex - 1].me.answered_content.length === 0
        )
            return;
        setCurrentQnaIndex(targetQnaIndex);
    };

    const submitAnswer = async (answer: string[]) => {
        const resSubmitAnswer = await request({
            url: `/api/question/${qnas[currentQnaIndex].question._id}/answer`,
            method: 'POST',
            data: {
                answered_content: answer,
            },
        });
        if (resSubmitAnswer) {
            const currentTime = new Date();
            ga.event({
                action: 'save_answer',
                params: {
                    question_id: qnas[currentQnaIndex].question._id,
                    arrive_time: convertTime(
                        qnas[currentQnaIndex].arrived_at,
                        'second',
                    ),
                    answer_time: convertTime(currentTime, 'second'),
                    response_time: timeDiff(
                        currentTime,
                        qnas[currentQnaIndex].arrived_at,
                        'hour',
                    ),
                    question_content: qnas[currentQnaIndex].question.content,
                    answer_content: answer,
                },
            });
            const resSubmitAnswerTemp: IQnA = resSubmitAnswer.data;
            let qnasTemp = [...qnas];
            qnasTemp[currentQnaIndex] = resSubmitAnswerTemp;
            setQnas(qnasTemp);
            if (
                resSubmitAnswerTemp.me.answered_content.length > 0 &&
                resSubmitAnswerTemp.linked.answered_content.length > 0
            ) {
                setBothAnswered(true);
            } else {
                setBothAnswered(false);
            }
            if (currentQnaIndex === 4) {
                setShowQuestionSetDoneModal(true);
            }
        }
        setIsInputFocused(false);
    };

    const goToNextQuestion = () => {
        if (currentQnaIndex === 4) {
            setCurrentQnaIndex(0);
        } else {
            setCurrentQnaIndex(currentQnaIndex + 1);
        }
    };

    const onFocusChatInput = () => {
        setIsInputFocused(true);
    };

    const onBlurChatInput = () => {
        setIsInputFocused(false);
    };

    const submitNewChat = async (newChat: string) => {
        const resNewChat = await request({
            url: `/api/user/send_message/${qnas[currentQnaIndex].question._id}`,
            method: 'POST',
            data: {
                message: newChat,
            },
        });
        if (resNewChat) {
            ga.event({
                action: 'send_chat',
                params: {
                    question_id: qnas[currentQnaIndex].question._id,
                },
            });
            let newQnas = [...qnas];
            newQnas[currentQnaIndex].messages.push(resNewChat.data);
            setQnas(newQnas);
        }
    };

    const deleteTargetChat = async (targetChatIndex: number) => {
        const resDelChat = await request({
            url: `/api/user/delete_message/${qnas[currentQnaIndex].question._id}/${targetChatIndex}`,
            method: 'DELETE',
        });
        if (resDelChat) {
            ga.event({
                action: 'delete_chat',
                params: {
                    question_id: qnas[currentQnaIndex].question._id,
                },
            });
            let qnasTemp = [...qnas];
            let targetIndex = qnasTemp[currentQnaIndex].messages.findIndex(
                (message) =>
                    message.message_index === resDelChat.data.message_index,
            );
            qnasTemp[currentQnaIndex].messages.splice(targetIndex, 1);
            setQnas(qnasTemp);
        }
    };

    const closeQuestionSetDoneModal = () => {
        setShowQuestionSetDoneModal(false);
    };

    // logging event when user open the question which needs to be answered
    useEffect(() => {
        if (qnas.length === 0) return;
        if (qnas[currentQnaIndex].me.answered_content.length === 0)
            ga.event({
                action: 'open_current_question',
                params: {
                    question_id: qnas[currentQnaIndex].question._id,
                },
            });
    }, [currentQnaIndex, qnas]);

    return (
        <MainLayout title="문답" hideBackButton hideBottomNav={isInputFocused}>
            {loading && (
                <LoadingContainer>
                    <SpinLoader />
                </LoadingContainer>
            )}
            {!loading && qnas.length === 0 && (
                <LoadingContainer>
                    <Text>지금은 답변할 질문이 없습니다.</Text>
                </LoadingContainer>
            )}
            {!loading && qnas.length > 0 && (
                <QnaContainer ref={qnaScrollRef}>
                    <QnaTagContainer>
                        {qnas.map((qna, i) => (
                            <QnaTag
                                key={qna.question._id}
                                isAnswered={qna.me.answered_content.length > 0}
                                isCurrent={i === currentQnaIndex}
                                onClick={() => changeFocusedQuestion(i)}
                                onTouchEnd={(e) =>
                                    actionOnTouchEnd(e, () =>
                                        changeFocusedQuestion(i),
                                    )
                                }
                            >
                                <Text>{i + 1}</Text>
                            </QnaTag>
                        ))}
                    </QnaTagContainer>
                    <CardSection
                        title={`${qnaSetNum}번째 앤서록`}
                        orangeTitle
                        subTitle={convertTime(
                            qnas[currentQnaIndex].arrived_at,
                            'dotDate',
                        )}
                        overflow="visible"
                    >
                        {qnas[currentQnaIndex].me.answered_content.length ===
                        0 ? (
                            <Question
                                question={qnas[currentQnaIndex].question}
                                linkedUserAnswer={qnas[currentQnaIndex].linked}
                                submitAnswer={submitAnswer}
                            />
                        ) : (
                            <QnaAnsweredContentContainer>
                                <Answer
                                    question={qnas[currentQnaIndex].question}
                                    myAnswer={qnas[currentQnaIndex].me}
                                    linkedUserAnswer={
                                        qnas[currentQnaIndex].linked
                                    }
                                    goToNextQuestion={goToNextQuestion}
                                />
                                <Gap height="16px" />
                                <Text size="h3">대화하기</Text>
                                <Gap height="16px" />
                                <ChatLog
                                    messages={qnas[currentQnaIndex].messages}
                                    submitNewChat={submitNewChat}
                                    deleteTargetChat={deleteTargetChat}
                                    onFocusInput={onFocusChatInput}
                                    onBlurInput={onBlurChatInput}
                                />
                            </QnaAnsweredContentContainer>
                        )}
                    </CardSection>
                </QnaContainer>
            )}
            <BaseModal
                show={showQuestionSetDoneModal}
                closeOnClickOutside
                onClose={() => closeQuestionSetDoneModal()}
                customImage={PicturesImage}
                buttonText="닫기"
                buttonColor="mandarin"
                onClickButton={() => setShowQuestionSetDoneModal(false)}
            >
                <Text>이번 질문에 모두 답변하셨습니다!</Text>
                {!bothAnswered && (
                    <Text textAlign="center">
                        {recentLinkedUser.relation}
                        {politeWordSelector(
                            recentLinkedUser.relation,
                            '께서',
                        )}{' '}
                        답변을 끝내
                        {politeWordSelector(recentLinkedUser.relation)}면
                        알려드릴게요
                    </Text>
                )}
                {inPeriod && inPeriodNextDate && bothAnswered && (
                    <Text textAlign="center">
                        다음 질문은
                        <Text color="orange2">
                            {convertTime(inPeriodNextDate, 'date')} 12:45
                        </Text>
                        에 보내드릴게요!
                    </Text>
                )}
                {!inPeriod && bothAnswered && (
                    <Text textAlign="center">
                        다음 질문은
                        <Text color="orange2">내일 12:45</Text>에 보내드릴게요!
                    </Text>
                )}
            </BaseModal>
        </MainLayout>
    );
};
