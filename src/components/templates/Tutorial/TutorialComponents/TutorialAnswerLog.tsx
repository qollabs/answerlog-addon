import { useState, useEffect } from 'react';
import { IQnA } from '@Types/types';
import { Text } from '@Atoms/Typography';
import {
    TutorialAnswerLogBook,
    TutorialAnswerLogBookContainer,
    TutorialAnswerLogBookCover,
    TutorialAnswerLogBookGaugeContainer,
    TutorialAnswerLogBookIncompleteContainer,
    TutorialAnswerLogContainer,
    TutorialAnswerLogGaugeBox,
    TutorialAnswerLogRowContainer,
    TutorialAnswerLogShelf,
    TutorialGuideContainer,
} from '../Tutorial.styled';
import { Gap } from '@Styles/App.styled';
import { tutorialAnsweredQnas, tutorialQnas } from './TutorialContants';
import { PageFlipType } from '../Tutorial';
import PointoutOutlined from '@Images/icons/pointout_outlined.svg';
import { WHITE } from '@Styles/colors';
import { useActionOnTouch } from '@Hooks/useActionOnTouch';

interface TutorialAnswerLogProp {
    page: number;
    setPage: (page: number) => void;
    goToNextPage: (page?: PageFlipType) => void;
}

export const TutorialAnswerLog = ({
    page,
    setPage,
    goToNextPage,
}: TutorialAnswerLogProp) => {
    const { actionOnTouchEnd } = useActionOnTouch();

    const [answeredQnas, setAnsweredQnas] = useState<IQnA[]>(tutorialQnas);
    const [shelves, setShelves] = useState<IQnA[][][]>([]);

    useEffect(() => {
        if (answeredQnas.length === 0) return;
        const setLength = answeredQnas[0].question.set_id;
        let qnaSets: IQnA[][] = [];
        for (let i = setLength; i > 0; i--) {
            let currentSetStart = answeredQnas.findIndex(
                (qna) => qna.set_num === i,
            );
            let nextSetStart = answeredQnas.findIndex(
                (qna) => qna.set_num === i - 1,
            );
            if (currentSetStart >= 0) {
                let qnaSet =
                    nextSetStart >= 0
                        ? answeredQnas.slice(currentSetStart, nextSetStart)
                        : answeredQnas.slice(currentSetStart);
                qnaSets.push(qnaSet);
            }
        }
        let numberOfShelves = Math.ceil(qnaSets.length / 2);
        let shelvesTemp: IQnA[][][] = [];
        for (let i = 0; i < numberOfShelves; i++) {
            let qnasOnShelf = qnaSets.slice(i * 2, (i + 1) * 2);
            shelvesTemp.push(qnasOnShelf);
        }
        setShelves(shelvesTemp);
    }, [answeredQnas]);

    const incompleteSetFinder = (qnaSet: IQnA[]) => {
        let judgement = qnaSet.some(
            (qna) =>
                qna.me.answered_content === null ||
                qna.linked.answered_content === null,
        );

        return judgement;
    };

    useEffect(() => {
        if (page === 20) {
            setAnsweredQnas([...tutorialQnas, ...tutorialAnsweredQnas]);
        }
    }, [page]);

    return (
        <TutorialAnswerLogContainer>
            {shelves.map((shelf, i) => (
                <TutorialAnswerLogRowContainer key={i}>
                    {page === 20 && (
                        <TutorialGuideContainer bottom="-100px">
                            <Text color="white" size="b0">
                                연습용 책을 한 권<br />
                                만들어 드렸어요
                                <br />책 내용을 살펴볼게요
                            </Text>
                        </TutorialGuideContainer>
                    )}
                    <TutorialAnswerLogBookContainer isFocused={page === 20}>
                        {shelf.map((book, j) => (
                            <TutorialAnswerLogBook
                                key={`${i}book${j}`}
                                incompleted={incompleteSetFinder(book)}
                                onClick={() =>
                                    i === shelves.length - 1 &&
                                    j === shelf.length - 1 &&
                                    goToNextPage()
                                }
                                onTouchEnd={(e) =>
                                    actionOnTouchEnd(
                                        e,
                                        () =>
                                            i === shelves.length - 1 &&
                                            j === shelf.length - 1 &&
                                            goToNextPage(),
                                    )
                                }
                            >
                                <TutorialAnswerLogBookCover>
                                    {incompleteSetFinder(book) ? (
                                        <TutorialAnswerLogBookIncompleteContainer>
                                            <TutorialAnswerLogBookGaugeContainer>
                                                {book.map((gauge, k) => (
                                                    <TutorialAnswerLogGaugeBox
                                                        key={`you${gauge.question._id}`}
                                                        answered={
                                                            gauge.linked
                                                                .answered_content !==
                                                            null
                                                        }
                                                    />
                                                ))}
                                                <Text size="c1" color="orange2">
                                                    엄마
                                                </Text>
                                            </TutorialAnswerLogBookGaugeContainer>
                                            <Gap width="4px" />
                                            <TutorialAnswerLogBookGaugeContainer>
                                                {book.map((gauge, k) => (
                                                    <TutorialAnswerLogGaugeBox
                                                        key={`me${gauge.question._id}`}
                                                        answered={
                                                            gauge.me
                                                                .answered_content !==
                                                            null
                                                        }
                                                    />
                                                ))}
                                                <Text size="c1" color="orange2">
                                                    나
                                                </Text>
                                            </TutorialAnswerLogBookGaugeContainer>
                                        </TutorialAnswerLogBookIncompleteContainer>
                                    ) : (
                                        <Text
                                            textAlign="center"
                                            color="white"
                                            size="b2"
                                        >
                                            우리의
                                            <br />
                                            0 번째
                                            <br />
                                            앤서록
                                        </Text>
                                    )}
                                </TutorialAnswerLogBookCover>

                                {page === 20 && (
                                    <PointoutOutlined
                                        color={WHITE}
                                        width="24px"
                                        height="24px"
                                    />
                                )}
                            </TutorialAnswerLogBook>
                        ))}
                    </TutorialAnswerLogBookContainer>
                    <TutorialAnswerLogShelf />
                </TutorialAnswerLogRowContainer>
            ))}
        </TutorialAnswerLogContainer>
    );
};
