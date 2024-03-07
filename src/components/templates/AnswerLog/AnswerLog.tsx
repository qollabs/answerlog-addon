import { useState, useEffect, useContext } from 'react';
import { MainLayout } from '@Organisms/MainLayout';
import {
    AnswerLogBook,
    AnswerLogBookContainer,
    AnswerLogContainer,
    AnswerLogRowContainer,
    AnswerLogShelf,
    AnswerLogBookCover,
    AnswerLogBookGaugeContainer,
    AnswerLogGaugeBox,
    AnswerLogBookIncompleteContainer,
} from './AnswerLog.styled';
import { AppContext } from '@Pages/_app';
import { useRequest } from '@Hooks/useRequest';
import { useAsyncEffect } from '@Hooks/useAsyncEffect';
import { IQnA } from '@Types/types';
import { Text } from '@Atoms/Typography';
import { Gap } from '@Styles/App.styled';
import { useRouter } from 'next/router';
import { LoadingContainer, SpinLoader } from '@Atoms/Loading';
import * as ga from '../../../lib/ga/gtag';
import { useActionOnTouch } from '@Hooks/useActionOnTouch';

export const AnswerLog = () => {
    const router = useRouter();
    const { recentLinkedUser } = useContext(AppContext);
    const { request, loading } = useRequest();
    const { actionOnTouchEnd } = useActionOnTouch();

    const [answeredQnas, setAnsweredQnas] = useState<IQnA[]>([]);
    const [shelves, setShelves] = useState<IQnA[][][]>([]);

    // get questions
    useAsyncEffect(async () => {
        const resAnswered = await request({
            url: '/api/user/answered-questions',
            method: 'GET',
        });
        if (resAnswered) {
            console.log(resAnswered.data);
            setAnsweredQnas(resAnswered.data);
        }
    }, []);

    // put questions into each book and shelf
    useEffect(() => {
        if (answeredQnas.length === 0) return;
        // console.log(answeredQnas);
        const setLength = Math.max(
            ...answeredQnas.map((qna, i) => qna.set_num),
        );
        let qnaSets: IQnA[][] = [];
        for (let i = setLength; i > 0; i--) {
            let qnaSet = answeredQnas.filter((qna) => qna.set_num === i);
            qnaSet.sort(
                (a, b) => b.question.question_num - a.question.question_num,
            );
            qnaSets.push(qnaSet);
        }
        let numberOfShelves = Math.ceil(qnaSets.length / 2);
        let shelvesTemp: IQnA[][][] = [];
        for (let i = 0; i < numberOfShelves; i++) {
            let qnasOnShelf = qnaSets.slice(i * 2, (i + 1) * 2);
            shelvesTemp.push(qnasOnShelf);
        }
        setShelves(shelvesTemp);
        console.log(shelvesTemp);
    }, [answeredQnas]);

    const incompleteSetFinder = (qnaSet: IQnA[]) => {
        let judgement = qnaSet.some(
            (qna) =>
                qna.me.answered_content.length === 0 ||
                qna.linked.answered_content.length === 0,
        );

        return judgement;
    };

    const goToDetail = (setNum: number) => {
        ga.event({
            action: 'select_content',
            params: {
                content_type: 'book',
                content_id: setNum,
            },
        });
        router.push(`/answer-log/${setNum}`);
    };

    return (
        <MainLayout hideBackButton title="답변 모음">
            {loading ? (
                <LoadingContainer>
                    <SpinLoader />
                </LoadingContainer>
            ) : (
                <AnswerLogContainer>
                    {shelves.map((shelf, i) => (
                        <AnswerLogRowContainer key={i}>
                            <AnswerLogBookContainer>
                                {shelf.map((book, j) => (
                                    <AnswerLogBook
                                        key={`${i}book${j}`}
                                        incompleted={incompleteSetFinder(book)}
                                        onClick={() =>
                                            goToDetail(book[0].set_num)
                                        }
                                        onTouchEnd={(e) =>
                                            actionOnTouchEnd(e, () =>
                                                goToDetail(book[0].set_num),
                                            )
                                        }
                                    >
                                        <AnswerLogBookCover>
                                            {incompleteSetFinder(book) ? (
                                                <AnswerLogBookIncompleteContainer>
                                                    <AnswerLogBookGaugeContainer>
                                                        {book.map(
                                                            (gauge, k) => (
                                                                <AnswerLogGaugeBox
                                                                    key={`you${gauge.question._id}`}
                                                                    answered={
                                                                        gauge
                                                                            .linked
                                                                            .answered_content
                                                                            .length >
                                                                        0
                                                                    }
                                                                />
                                                            ),
                                                        )}
                                                        <Text
                                                            size="c1"
                                                            color="orange2"
                                                        >
                                                            {
                                                                recentLinkedUser.relation
                                                            }
                                                        </Text>
                                                    </AnswerLogBookGaugeContainer>
                                                    <Gap width="4px" />
                                                    <AnswerLogBookGaugeContainer>
                                                        {book.map(
                                                            (gauge, k) => (
                                                                <AnswerLogGaugeBox
                                                                    key={`me${gauge.question._id}`}
                                                                    answered={
                                                                        gauge.me
                                                                            .answered_content
                                                                            .length >
                                                                        0
                                                                    }
                                                                />
                                                            ),
                                                        )}
                                                        <Text
                                                            size="c1"
                                                            color="orange2"
                                                        >
                                                            나
                                                        </Text>
                                                    </AnswerLogBookGaugeContainer>
                                                </AnswerLogBookIncompleteContainer>
                                            ) : (
                                                <Text
                                                    textAlign="center"
                                                    color="white"
                                                    size="b2"
                                                >
                                                    우리의
                                                    <br />
                                                    {book[0].question.set_id}
                                                    번째
                                                    <br />
                                                    앤서록
                                                </Text>
                                            )}
                                        </AnswerLogBookCover>
                                    </AnswerLogBook>
                                ))}
                            </AnswerLogBookContainer>
                            <AnswerLogShelf />
                        </AnswerLogRowContainer>
                    ))}
                </AnswerLogContainer>
            )}
        </MainLayout>
    );
};
