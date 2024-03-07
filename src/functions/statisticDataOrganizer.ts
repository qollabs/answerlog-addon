import { AnswerStatisticType, IReportData } from '@Types/types';

export const reportDataOrganizer = (
    dataSet: IReportData[],
    options: string[],
): AnswerStatisticType[] => {
    let answerStatistics: AnswerStatisticType[] = [];
    options.forEach((option, i) => {
        let targetData = dataSet.filter((data) =>
            data.answer_content.includes(option),
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
            (option) => !data.answer_content.includes(option),
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
