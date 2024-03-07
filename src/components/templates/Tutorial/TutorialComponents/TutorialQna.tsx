import { IQnA, QuestionMessageType } from '@Types/types';
import { useEffect, useState, useContext, useRef, RefObject } from 'react';
import { tutorialQnas } from './TutorialContants';
import {
    TutorialAnswerContainer,
    TutorialChatContainer,
    TutorialGuideContainer,
    TutorialQnaAnsweredContentContainer,
    TutorialQnaContainer,
    TutorialQnaTag,
    TutorialQnaTagContainer,
} from '../Tutorial.styled';
import { Text } from '@Atoms/Typography';
import { CardSection } from '@Molecules/CardSection';
import { convertTime } from '@Functions/convertTime';
import { Question } from '@Organisms/Question';
import { Answer } from '@Organisms/Answer';
import { Gap } from '@Styles/App.styled';
import { ChatLog } from '@Organisms/ChatLog';
import { Container } from '@Atoms/Container';
import { PageFlipType } from '../Tutorial';
import { AppContext } from '@Pages/_app';
import PointoutOutlined from '@Images/icons/pointout_outlined.svg';
import { WHITE } from '@Styles/colors';

interface TutorialQnaProp {
    page: number;
    setPage: (page: number) => void;
    subPage: number;
    setSubPage: (subPage: number) => void;
    goToNextPage: (page?: PageFlipType) => void;
    layoutRef: RefObject<HTMLDivElement>;
}

export const TutorialQna = ({
    page,
    setPage,
    subPage,
    setSubPage,
    goToNextPage,
    layoutRef,
}: TutorialQnaProp) => {
    const { isInputFocused, setIsInputFocused, myDatabaseId } =
        useContext(AppContext);

    const [qnas, setQnas] = useState<IQnA[]>(tutorialQnas);
    const [currentQnaIndex, setCurrentQnaIndex] = useState(0);
    const [isAnswerSelected, setIsAnswerSelected] = useState(false);

    const tutorialQnaScrollRef = useRef<HTMLDivElement>(null);

    // set currentQnaIndex by page
    useEffect(() => {
        switch (page) {
            case 7:
                setCurrentQnaIndex(0);
                break;
            case 9:
                setCurrentQnaIndex(1);
                break;
            case 10:
                setCurrentQnaIndex(1);
                break;
            case 11:
                setCurrentQnaIndex(2);
                break;
            case 12:
                setCurrentQnaIndex(2);
                break;
            case 13:
                setCurrentQnaIndex(3);
                break;
            case 14:
                setCurrentQnaIndex(3);
                break;
            case 15:
                setCurrentQnaIndex(4);
                break;
            case 16:
                setCurrentQnaIndex(4);
                break;
            case 17:
                setCurrentQnaIndex(4);
                break;
            default:
                break;
        }
    }, [page, subPage]);

    // scroll down to show chatting
    useEffect(() => {
        if (!layoutRef?.current) return;
        if (page === 7 && subPage === 2) {
            layoutRef.current.scrollTo(0, layoutRef.current.scrollHeight);
        } else {
            layoutRef.current.scrollTo(0, 0);
        }
    }, [page, subPage]);

    const submitAnswer = (answer: string[]) => {
        let qnasTemp = [...qnas];
        qnasTemp[currentQnaIndex].me.answered_content = answer;
        qnasTemp[currentQnaIndex].me.answered_at = new Date().toISOString();
        setQnas(qnasTemp);
        if (page === 16) {
            goToNextPage();
        } else {
            setSubPage(subPage + 1);
        }
    };

    const goToNextQuestion = () => {
        setIsInputFocused(false);
        if (page === 7 && subPage === 2) return;
        if (currentQnaIndex < 4) {
            goToNextPage();
        }
    };

    const submitNewChat = (newChat: string) => {
        let newQnas = [...qnas];
        if (!myDatabaseId) return;
        let newMessageObject: QuestionMessageType = {
            sender: myDatabaseId,
            message_index: newQnas[currentQnaIndex].messages.length,
            content: newChat,
            sent_at: convertTime(new Date(), 'slashedDate'),
            deleted_at: null,
        };
        newQnas[currentQnaIndex].messages.push(newMessageObject);
        setQnas(newQnas);
    };
    return (
        <TutorialQnaContainer
            isFocused={
                (page === 7 ||
                    page === 10 ||
                    page === 12 ||
                    page === 14 ||
                    page === 16) &&
                subPage === 1
            }
            isAnswered={qnas[currentQnaIndex].me.answered_content.length > 0}
        >
            <TutorialQnaTagContainer isFocused={page === 17}>
                {qnas.map((qna, i) => (
                    <TutorialQnaTag
                        key={qna.question._id}
                        isAnswered={qna.me.answered_content.length > 0}
                        isCurrent={i === currentQnaIndex}
                    >
                        <Text>{i + 1}</Text>
                    </TutorialQnaTag>
                ))}
                {page === 17 && (
                    <TutorialGuideContainer bottom="-140px">
                        <Text color="white" size="b0">
                            탭을 이용하여
                            <br />
                            답변 완료한 문답들을
                            <br />
                            살펴볼 수 있어요
                        </Text>
                        <Gap height="16px" />
                        <Text color="white">터치하여 계속</Text>
                        <PointoutOutlined
                            color={WHITE}
                            width="24px"
                            height="24px"
                        />
                    </TutorialGuideContainer>
                )}
            </TutorialQnaTagContainer>
            <CardSection
                title="0번째 앤서록"
                orangeTitle
                subTitle={convertTime(new Date(), 'dotDate')}
                overflow="visible"
            >
                {page >= 5 && page <= 16 && subPage === 1 ? (
                    <Question
                        question={qnas[currentQnaIndex].question}
                        linkedUserAnswer={qnas[currentQnaIndex].linked}
                        submitAnswer={submitAnswer}
                        isAnswerSelected={isAnswerSelected}
                        setIsAnswerSelected={setIsAnswerSelected}
                    />
                ) : (
                    <TutorialQnaAnsweredContentContainer>
                        <TutorialAnswerContainer
                            isFocused={
                                (page === 7 && subPage === 3) ||
                                (page > 8 && page <= 16 && subPage === 2)
                            }
                        >
                            <Answer
                                question={qnas[currentQnaIndex].question}
                                myAnswer={qnas[currentQnaIndex].me}
                                linkedUserAnswer={qnas[currentQnaIndex].linked}
                                goToNextQuestion={
                                    page < 16 ? goToNextQuestion : undefined
                                }
                            />
                            {((page === 7 && subPage === 3) ||
                                (page > 8 && page <= 15 && subPage >= 2)) && (
                                <TutorialGuideContainer bottom="80px">
                                    <Text color="white" size="b0">
                                        &#39;다음 질문 보기&#39; 버튼을 눌러
                                        <br /> 문답을 계속하실 수 있어요
                                    </Text>
                                </TutorialGuideContainer>
                            )}
                        </TutorialAnswerContainer>
                        <Gap height="16px" />
                        <Text size="h3">대화하기</Text>
                        <Gap height="16px" />
                        <TutorialChatContainer
                            isFocused={page === 7 && subPage === 2}
                        >
                            <ChatLog
                                messages={qnas[currentQnaIndex].messages}
                                submitNewChat={submitNewChat}
                                deleteTargetChat={() =>
                                    console.log('delete chat')
                                }
                                onFocusInput={() => setIsInputFocused(true)}
                                onBlurInput={() => setIsInputFocused(false)}
                                forcedRelation="아빠"
                            />
                        </TutorialChatContainer>
                    </TutorialQnaAnsweredContentContainer>
                )}
            </CardSection>
        </TutorialQnaContainer>
    );
};
