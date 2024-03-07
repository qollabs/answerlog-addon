import { useState, useEffect, useContext, useRef } from 'react';
import { MainLayout } from '@Organisms/MainLayout';
import { useRouter } from 'next/router';
import {
    LogDetailAnswerContainer,
    LogDetailContainer,
    LogDetailContentContainer,
    LogDetailDiaryContainer,
    LogDetailFrontContainer,
    LogDetailIndexContainer,
    LogDetailLinkContainer,
    LogDetailSubtitleContainer,
    LogDetailTag,
    LogDetailTagContainer,
    LogDetailTitleContainer,
} from './AnswerLogDetail.styled';
import { Text } from '@Atoms/Typography';
import { IQnA } from '@Types/types';
import { useRequest } from '@Hooks/useRequest';
import { LoadingContainer, SpinLoader } from '@Atoms/Loading';
import { useAsyncEffect } from '@Hooks/useAsyncEffect';
import { Gap } from '@Styles/App.styled';
import { Answer } from '@Organisms/Answer';
import { ChatLog } from '@Organisms/ChatLog';
import * as ga from '../../../lib/ga/gtag';
import { AppContext } from '@Pages/_app';
import { useActionOnTouch } from '@Hooks/useActionOnTouch';

export const AnswerLogDetail = () => {
    const { loading, request } = useRequest();
    const { isInputFocused, setIsInputFocused } = useContext(AppContext);
    const router = useRouter();
    const { id: setNum, question_num: questionNum } = router.query;
    const { actionOnTouchEnd } = useActionOnTouch();

    const [windowHeight, setWindowHeight] = useState(0);
    const [targetQnas, setTargetQnas] = useState<IQnA[]>([]);
    const [selectedQnaIndex, setSelectedQnaIndex] = useState(-1);
    const [targetScrollTop, setTargetScrollTop] = useState(0);

    const layoutScrollRef = useRef<HTMLDivElement>(null);
    const logDetailContentScrollRef = useRef<HTMLDivElement>(null);

    // get questions
    useAsyncEffect(async () => {
        if (!setNum) return;
        const resTargetQnas = await request({
            url: `/api/user/questions/${setNum}`,
            method: 'GET',
        });
        if (resTargetQnas) {
            let targetQnasTemp: IQnA[] = resTargetQnas.data;
            targetQnasTemp.sort(
                (a, b) => a.question.question_num - b.question.question_num,
            );
            setTargetQnas(targetQnasTemp);
        }
    }, [setNum]);

    // target question index from query
    useEffect(() => {
        if (!questionNum) return;
        if (targetQnas.length === 0) return;
        setSelectedQnaIndex(Number(questionNum) - 1);
    }, [questionNum, targetQnas]);

    // get window height
    useEffect(() => {
        if (windowHeight !== 0) return;
        setWindowHeight(window.innerHeight);
    }, []);

    // scroll to bottom on focus chat input
    useEffect(() => {
        if (!isInputFocused) return;
        window.addEventListener('resize', () => {
            onResize(targetScrollTop);
        });
        return () => {
            window.removeEventListener('resize', () => {
                onResize(targetScrollTop);
            });
        };
    }, [isInputFocused, windowHeight]);

    // ga event for select qna
    useEffect(() => {
        if (selectedQnaIndex === -1) return;
        ga.event({
            action: 'select_content',
            params: {
                content_type: 'qna',
                content_id: targetQnas[selectedQnaIndex].question._id,
            },
        });
    }, [selectedQnaIndex]);

    const onResize = (scrollTop: number) => {
        layoutScrollRef?.current?.scrollTo(
            0,
            scrollTop + windowHeight - window.innerHeight,
        );
    };

    const onFocusChatInput = () => {
        if (!logDetailContentScrollRef?.current || !layoutScrollRef?.current)
            return;
        const heightDiff =
            layoutScrollRef.current.offsetHeight -
            logDetailContentScrollRef.current.offsetHeight;
        setTargetScrollTop(
            logDetailContentScrollRef.current.scrollTop - heightDiff,
        );
        setIsInputFocused(true);
    };

    const onBlurChatInput = () => {
        setIsInputFocused(false);
    };

    const submitNewChat = async (newChat: string) => {
        const resNewChat = await request({
            url: `/api/user/send_message/${targetQnas[selectedQnaIndex].question._id}`,
            method: 'POST',
            data: {
                message: newChat,
            },
        });
        if (resNewChat) {
            ga.event({
                action: 'send_chat',
                params: {
                    question_id: targetQnas[selectedQnaIndex].question._id,
                },
            });
            let newQnas = [...targetQnas];
            newQnas[selectedQnaIndex].messages.push(resNewChat.data);
            setTargetQnas(newQnas);
            setIsInputFocused(false);
            logDetailContentScrollRef.current?.scrollTo(
                0,
                logDetailContentScrollRef.current.scrollHeight,
            );
        }
    };

    const deleteTargetChat = async (targetChatIndex: number) => {
        const resDelChat = await request({
            url: `/api/user/delete_message/${targetQnas[selectedQnaIndex].question._id}/${targetChatIndex}`,
            method: 'DELETE',
        });
        if (resDelChat) {
            ga.event({
                action: 'delete_chat',
                params: {
                    question_id: targetQnas[selectedQnaIndex].question._id,
                },
            });
            let newQnas = [...targetQnas];
            let targetIndex = newQnas[selectedQnaIndex].messages.findIndex(
                (message) =>
                    message.message_index === resDelChat.data.message_index,
            );
            newQnas[selectedQnaIndex].messages.splice(targetIndex, 1);
            setTargetQnas(newQnas);
        }
    };

    return (
        <MainLayout
            title={`${setNum}번째 앤서록`}
            hideBottomNav={isInputFocused}
            layoutRef={layoutScrollRef}
        >
            {loading || !setNum ? (
                <LoadingContainer>
                    <SpinLoader />
                </LoadingContainer>
            ) : (
                <LogDetailContainer isInputFocused={isInputFocused}>
                    <LogDetailDiaryContainer isInputFocused={isInputFocused}>
                        <LogDetailContentContainer
                            ref={logDetailContentScrollRef}
                            isInputFocused={isInputFocused}
                        >
                            {selectedQnaIndex === -1 ? (
                                <LogDetailFrontContainer>
                                    <LogDetailTitleContainer>
                                        <Text size="h2">{setNum}번째</Text>
                                        <Text size="h2">앤서록</Text>
                                    </LogDetailTitleContainer>
                                    <Gap height="28px" />
                                    <LogDetailSubtitleContainer>
                                        <Text color="gray5">차례</Text>
                                    </LogDetailSubtitleContainer>
                                    <Gap height="24px" />
                                    <LogDetailIndexContainer>
                                        {targetQnas.map((qna, i) => (
                                            <LogDetailLinkContainer
                                                key={qna.question._id}
                                                onClick={() =>
                                                    setSelectedQnaIndex(i)
                                                }
                                                onTouchEnd={(e) =>
                                                    actionOnTouchEnd(e, () =>
                                                        setSelectedQnaIndex(i),
                                                    )
                                                }
                                            >
                                                <Text color="gray5">
                                                    {i + 1}
                                                </Text>
                                                <Gap width="18px" />
                                                <Text underline color="gray5">
                                                    {qna.question.content}
                                                </Text>
                                            </LogDetailLinkContainer>
                                        ))}
                                    </LogDetailIndexContainer>
                                </LogDetailFrontContainer>
                            ) : (
                                <LogDetailAnswerContainer>
                                    <Answer
                                        question={
                                            targetQnas[selectedQnaIndex]
                                                .question
                                        }
                                        myAnswer={
                                            targetQnas[selectedQnaIndex].me
                                        }
                                        linkedUserAnswer={
                                            targetQnas[selectedQnaIndex].linked
                                        }
                                        showCategory
                                    />
                                    <Gap height="8px" />
                                    {targetQnas[selectedQnaIndex].me
                                        .answered_content.length ===
                                    0 ? null : (
                                        <ChatLog
                                            messages={
                                                targetQnas[selectedQnaIndex]
                                                    .messages
                                            }
                                            submitNewChat={submitNewChat}
                                            deleteTargetChat={deleteTargetChat}
                                            onFocusInput={onFocusChatInput}
                                            onBlurInput={onBlurChatInput}
                                        />
                                    )}
                                </LogDetailAnswerContainer>
                            )}
                        </LogDetailContentContainer>
                        {!isInputFocused && (
                            <LogDetailTagContainer>
                                <LogDetailTag
                                    selected={selectedQnaIndex === -1}
                                    onClick={() => setSelectedQnaIndex(-1)}
                                    onTouchEnd={(e) =>
                                        actionOnTouchEnd(e, () =>
                                            setSelectedQnaIndex(-1),
                                        )
                                    }
                                >
                                    <Text size="c1" color="white">
                                        0
                                    </Text>
                                </LogDetailTag>
                                {targetQnas.map((qna, i) => (
                                    <LogDetailTag
                                        key={`${qna.question._id}_tag`}
                                        selected={selectedQnaIndex === i}
                                        onClick={() => setSelectedQnaIndex(i)}
                                        onTouchEnd={(e) =>
                                            actionOnTouchEnd(e, () =>
                                                setSelectedQnaIndex(i),
                                            )
                                        }
                                    >
                                        <Text size="c1" color="white">
                                            {i + 1}
                                        </Text>
                                    </LogDetailTag>
                                ))}
                            </LogDetailTagContainer>
                        )}
                    </LogDetailDiaryContainer>
                </LogDetailContainer>
            )}
        </MainLayout>
    );
};
