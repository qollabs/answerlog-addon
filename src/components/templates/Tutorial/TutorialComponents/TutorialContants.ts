import { SortedDataType } from '@Templates/ReportDetail/ReportDetail';
import { IQnA, IRecommendedGift, IReport, IReportDetail } from '@Types/types';

export const interactivePages = [
    2, 4, 7, 10, 12, 14, 16, 18, 20, 23, 24, 25, 26,
];

export const tutorialQnas: IQnA[] = [
    {
        question: {
            _id: 'tutorial-question-1',
            type: 2,
            category: 0,
            topic: 0,
            sub_topic: [],
            content: '우리 가족은 서로 대화가 잘 통한다',
            options: [
                '매우 아니다',
                '조금 아니다',
                '보통이다',
                '조금 그렇다',
                '매우 그렇다',
            ],
            set_id: 2,
            question_num: 2,
            version_id: 1,
            created_at: '2022-12-28T14:17:21.595000',
            updated_at: '2022-12-28T14:17:21.595000',
            deleted_at: null,
            target_relation: [],
        },
        me: {
            answered_content: [],
            entertainments: [],
            answered_at: null,
        },
        linked: {
            answered_content: ['매우 그렇다'],
            entertainments: [],
            answered_at: '2023-09-07T15:34:46.869000',
        },
        arrived_at: '2023-09-07T15:34:46.869000',
        set_num: 2,
        messages: [
            {
                sender: 'random-id',
                message_index: 0,
                content: '우리 가족 화이팅!',
                sent_at: '2023-09-07T15:34:46.869000',
                deleted_at: null,
            },
            {
                sender: 'random-id',
                message_index: 1,
                content: '네가 어떻게 생각하는지 궁금하다',
                sent_at: '2023-09-07T15:34:46.869000',
                deleted_at: null,
            },
        ],
    },
    {
        question: {
            _id: 'tutorial-question-2',
            type: 3,
            category: 0,
            topic: 0,
            sub_topic: [],
            content: '좋아하는 음식의 종류는 무엇인가요?',
            options: ['한식', '중식', '양식', '일식'],
            set_id: 2,
            question_num: 2,
            version_id: 1,
            created_at: '2022-12-28T14:17:21.595000',
            updated_at: '2022-12-28T14:17:21.595000',
            deleted_at: null,
            target_relation: [],
        },
        me: {
            answered_content: [],
            entertainments: [],
            answered_at: null,
        },
        linked: {
            answered_content: [],
            entertainments: [],
            answered_at: null,
        },
        arrived_at: '2023-09-07T15:34:46.869000',
        set_num: 2,
        messages: [],
    },
    {
        question: {
            _id: 'tutorial-question-3',
            type: 4,
            category: 0,
            topic: 0,
            sub_topic: [],
            content: '요즘 관심 있는 분야는 무엇인가요?',
            options: ['사회/정치', '연예', '자기개발', '건강'],
            set_id: 2,
            question_num: 3,
            version_id: 1,
            created_at: '2022-12-28T14:17:21.595000',
            updated_at: '2022-12-28T14:17:21.595000',
            deleted_at: null,
            target_relation: [],
        },
        me: {
            answered_content: [],
            entertainments: [],
            answered_at: null,
        },
        linked: {
            answered_content: [],
            entertainments: [],
            answered_at: null,
        },
        arrived_at: '2023-09-07T15:34:46.869000',
        set_num: 2,
        messages: [],
    },
    {
        question: {
            _id: 'tutorial-question-4',
            type: 0,
            category: 0,
            topic: 0,
            sub_topic: [],
            content: '요즘 즐겨 하는 취미는 무엇인가요?',
            options: null,
            set_id: 2,
            question_num: 4,
            version_id: 1,
            created_at: '2022-12-28T14:17:21.595000',
            updated_at: '2022-12-28T14:17:21.595000',
            deleted_at: null,
            target_relation: [],
        },
        me: {
            answered_content: [],
            entertainments: [],
            answered_at: null,
        },
        linked: {
            answered_content: [],
            entertainments: [],
            answered_at: null,
        },
        arrived_at: '2023-09-07T15:34:46.869000',
        set_num: 2,
        messages: [],
    },
    {
        question: {
            _id: 'tutorial-question-5',
            type: 1,
            category: 0,
            topic: 0,
            sub_topic: [],
            content:
                '꼭 가보고 싶은 여행지는 어디인가요? 그곳에 왜 가보고 싶나요?',
            options: null,
            set_id: 2,
            question_num: 5,
            version_id: 1,
            created_at: '2022-12-28T14:17:21.595000',
            updated_at: '2022-12-28T14:17:21.595000',
            deleted_at: null,
            target_relation: [],
        },
        me: {
            answered_content: [],
            entertainments: [],
            answered_at: null,
        },
        linked: {
            answered_content: [],
            entertainments: [],
            answered_at: null,
        },
        arrived_at: '2023-09-07T15:34:46.869000',
        set_num: 2,
        messages: [],
    },
];

export const tutorialAnsweredQnas: IQnA[] = [
    {
        question: {
            _id: 'tutorial-question-1-1',
            type: 2,
            category: 0,
            topic: 0,
            sub_topic: [],
            content: '우리 가족은 서로 대화가 잘 통한다',
            options: [
                '매우 아니다',
                '조금 아니다',
                '보통이다',
                '조금 그렇다',
                '매우 그렇다',
            ],
            set_id: 1,
            question_num: 2,
            version_id: 1,
            created_at: '2022-12-28T14:17:21.595000',
            updated_at: '2022-12-28T14:17:21.595000',
            deleted_at: null,
            target_relation: [],
        },
        me: {
            answered_content: ['보통이다'],
            entertainments: [],
            answered_at: '022-12-28T14:17:21.595000',
        },
        linked: {
            answered_content: ['보통이다'],
            entertainments: [],
            answered_at: '022-12-28T14:17:21.595000',
        },
        arrived_at: '2023-09-07T15:34:46.869000',
        set_num: 1,
        messages: [],
    },
    {
        question: {
            _id: 'tutorial-question-2-1',
            type: 3,
            category: 0,
            topic: 0,
            sub_topic: [],
            content: '좋아하는 음식의 종류는 무엇인가요?',
            options: ['한식', '중식', '양식', '일식'],
            set_id: 1,
            question_num: 2,
            version_id: 1,
            created_at: '2022-12-28T14:17:21.595000',
            updated_at: '2022-12-28T14:17:21.595000',
            deleted_at: null,
            target_relation: [],
        },
        me: {
            answered_content: ['한식'],
            entertainments: [],
            answered_at: '2022-12-28T14:17:21.595000',
        },
        linked: {
            answered_content: ['한식'],
            entertainments: [],
            answered_at: '2022-12-28T14:17:21.595000',
        },
        arrived_at: '2023-09-07T15:34:46.869000',
        set_num: 1,
        messages: [],
    },
    {
        question: {
            _id: 'tutorial-question-3-1',
            type: 4,
            category: 0,
            topic: 0,
            sub_topic: [],
            content: '요즘 관심 있는 분야는 무엇인가요?',
            options: ['사회/정치', '연예', '자기개발', '건강'],
            set_id: 1,
            question_num: 3,
            version_id: 1,
            created_at: '2022-12-28T14:17:21.595000',
            updated_at: '2022-12-28T14:17:21.595000',
            deleted_at: null,
            target_relation: [],
        },
        me: {
            answered_content: ['사회/정치'],
            entertainments: [],
            answered_at: '2022-12-28T14:17:21.595000',
        },
        linked: {
            answered_content: ['사회/정치'],
            entertainments: [],
            answered_at: '2022-12-28T14:17:21.595000',
        },
        arrived_at: '2023-09-07T15:34:46.869000',
        set_num: 1,
        messages: [],
    },
    {
        question: {
            _id: 'tutorial-question-4',
            type: 0,
            category: 0,
            topic: 0,
            sub_topic: [],
            content: '요즘 즐겨 하는 취미는 무엇인가요?',
            options: null,
            set_id: 1,
            question_num: 4,
            version_id: 1,
            created_at: '2022-12-28T14:17:21.595000',
            updated_at: '2022-12-28T14:17:21.595000',
            deleted_at: null,
            target_relation: [],
        },
        me: {
            answered_content: ['탁구'],
            entertainments: [],
            answered_at: '2022-12-28T14:17:21.595000',
        },
        linked: {
            answered_content: ['탁구'],
            entertainments: [],
            answered_at: '2022-12-28T14:17:21.595000',
        },
        arrived_at: '2023-09-07T15:34:46.869000',
        set_num: 1,
        messages: [],
    },
    {
        question: {
            _id: 'tutorial-question-5-1',
            type: 1,
            category: 0,
            topic: 0,
            sub_topic: [],
            content:
                '꼭 가보고 싶은 여행지는 어디인가요? 그곳에 왜 가보고 싶나요?',
            options: null,
            set_id: 1,
            question_num: 5,
            version_id: 1,
            created_at: '2022-12-28T14:17:21.595000',
            updated_at: '2022-12-28T14:17:21.595000',
            deleted_at: null,
            target_relation: [],
        },
        me: {
            answered_content: ['집에서 쉬고 싶다'],
            entertainments: [],
            answered_at: '2022-12-28T14:17:21.595000',
        },
        linked: {
            answered_content: ['집에서 쉬고 싶다'],
            entertainments: [],
            answered_at: '2022-12-28T14:17:21.595000',
        },
        arrived_at: '2023-09-07T15:34:46.869000',
        set_num: 1,
        messages: [],
    },
];

export const tutorialReports: IReport[] = [
    {
        question_id: '63ac5250db0f215aa32ed440',
        question_set_num: 1,
        question_category: 3,
        question_title: '나는 ㅇㅇㅇ 이 더 좋다',
        answered_at: 'ff',
    },
    {
        question_id: '63ac5223db0f215aa32ed43e',
        question_set_num: 1,
        question_category: 2,
        question_title: '나는 학창시절 ㅇㅇㅇ한 아이 였다',
        answered_at: 'ff',
    },
    {
        question_id: '63ac5236db0f215aa32ed43f',
        question_set_num: 1,
        question_category: 3,
        question_title: '나는 사람을 쉽게',
        answered_at: 'ff',
    },
];
// IReportDetail => any 임시 수정
export const tutorialReportDetail: any = {
    answers: [
        {
            answer_content: '닭다리',
            user: {
                relation: '엄마',
                inverse_relation: '딸',
                age: 31,
                gender: 1,
            },
        },
        {
            answer_content: '닭다리',
            user: {
                relation: '엄마',
                inverse_relation: '딸',
                age: 31,
                gender: 1,
            },
        },
        {
            answer_content: '닭다리',
            user: {
                relation: '엄마',
                inverse_relation: '딸',
                age: 52,
                gender: 0,
            },
        },
        {
            answer_content: '닭날개',
            user: {
                relation: '엄마',
                inverse_relation: '딸',
                age: 41,
                gender: 1,
            },
        },
        {
            answer_content: '닭다리',
            user: {
                relation: '엄마',
                inverse_relation: '딸',
                age: 51,
                gender: 0,
            },
        },
        {
            answer_content: '닭다리',
            user: {
                relation: '엄마',
                inverse_relation: '딸',
                age: 52,
                gender: 0,
            },
        },
        {
            answer_content: '닭다리',
            user: {
                relation: '엄마',
                inverse_relation: '딸',
                age: 29,
                gender: 0,
            },
        },
        {
            answer_content: '닭다리',
            user: {
                relation: '엄마',
                inverse_relation: '딸',
                age: 29,
                gender: 0,
            },
        },
        {
            answer_content: '닭날개',
            user: {
                relation: '엄마',
                inverse_relation: '딸',
                age: 61,
                gender: 1,
            },
        },
        {
            answer_content: '닭다리',
            user: {
                relation: '엄마',
                inverse_relation: '딸',
                age: 31,
                gender: 1,
            },
        },
        {
            answer_content: '닭다리',
            user: {
                relation: '엄마',
                inverse_relation: '딸',
                age: 29,
                gender: 0,
            },
        },
        {
            answer_content: '닭가슴살',
            user: {
                relation: '엄마',
                inverse_relation: '딸',
                age: 57,
                gender: 0,
            },
        },
        {
            answer_content: '닭다리',
            user: {
                relation: '엄마',
                inverse_relation: '딸',
                age: 29,
                gender: 0,
            },
        },
        {
            answer_content: '닭가슴살',
            user: {
                relation: '엄마',
                inverse_relation: '딸',
                age: 58,
                gender: 1,
            },
        },
        {
            answer_content: '닭다리',
            user: {
                relation: '엄마',
                inverse_relation: '딸',
                age: 52,
                gender: 0,
            },
        },
        {
            answer_content: '닭다리',
            user: {
                relation: '엄마',
                inverse_relation: '딸',
                age: 19,
                gender: 0,
            },
        },
        {
            answer_content: '닭다리',
            user: {
                relation: '엄마',
                inverse_relation: '딸',
                age: 31,
                gender: 0,
            },
        },
        {
            answer_content: '닭다리',
            user: {
                relation: '엄마',
                inverse_relation: '딸',
                age: 60,
                gender: 1,
            },
        },
        {
            answer_content: '닭다리',
            user: {
                relation: '엄마',
                inverse_relation: '딸',
                age: 33,
                gender: 1,
            },
        },
        {
            answer_content: '닭가슴살',
            user: {
                relation: '엄마',
                inverse_relation: '딸',
                age: 36,
                gender: 0,
            },
        },
        {
            answer_content: '닭가슴살',
            user: {
                relation: '엄마',
                inverse_relation: '딸',
                age: 24,
                gender: 0,
            },
        },
        {
            answer_content: '닭다리',
            user: {
                relation: '엄마',
                inverse_relation: '딸',
                age: 52,
                gender: 0,
            },
        },
        {
            answer_content: '닭다리',
            user: {
                relation: '엄마',
                inverse_relation: '딸',
                age: 21,
                gender: 0,
            },
        },
        {
            answer_content: '닭가슴살',
            user: {
                relation: '엄마',
                inverse_relation: '딸',
                age: 22,
                gender: 1,
            },
        },
        {
            answer_content: '닭다리',
            user: {
                relation: '엄마',
                inverse_relation: '딸',
                age: 30,
                gender: 0,
            },
        },
        {
            answer_content: '닭날개',
            user: {
                relation: '엄마',
                inverse_relation: '딸',
                age: 58,
                gender: 1,
            },
        },
        {
            answer_content: '닭가슴살',
            user: {
                relation: '엄마',
                inverse_relation: '딸',
                age: 46,
                gender: 0,
            },
        },
        {
            answer_content: '닭다리',
            user: {
                relation: '엄마',
                inverse_relation: '딸',
                age: 24,
                gender: 0,
            },
        },
        {
            answer_content: '닭다리',
            user: {
                relation: '엄마',
                inverse_relation: '딸',
                age: 29,
                gender: 0,
            },
        },
        {
            answer_content: '닭날개',
            user: {
                relation: '엄마',
                inverse_relation: '딸',
                age: 0,
                gender: 0,
            },
        },
        {
            answer_content: '닭날개',
            user: {
                relation: '엄마',
                inverse_relation: '딸',
                age: 35,
                gender: 0,
            },
        },
        {
            answer_content: '닭다리',
            user: {
                relation: '엄마',
                inverse_relation: '딸',
                age: 63,
                gender: 1,
            },
        },
        {
            answer_content: '닭다리',
            user: {
                relation: '엄마',
                inverse_relation: '딸',
                age: 24,
                gender: 0,
            },
        },
        {
            answer_content: '닭날개',
            user: {
                relation: '엄마',
                inverse_relation: '딸',
                age: 1,
                gender: 0,
            },
        },
        {
            answer_content: '닭날개',
            user: {
                relation: '엄마',
                inverse_relation: '딸',
                age: 31,
                gender: 1,
            },
        },
        {
            answer_content: '닭다리',
            user: {
                relation: '엄마',
                inverse_relation: '딸',
                age: 56,
                gender: 1,
            },
        },
        {
            answer_content: '닭다리',
            user: {
                relation: '엄마',
                inverse_relation: '딸',
                age: 31,
                gender: 1,
            },
        },
        {
            answer_content: '닭다리',
            user: {
                relation: '엄마',
                inverse_relation: '딸',
                age: 29,
                gender: 0,
            },
        },
        {
            answer_content: '닭다리',
            user: {
                relation: '엄마',
                inverse_relation: '딸',
                age: 31,
                gender: 1,
            },
        },
        {
            answer_content: '닭다리',
            user: {
                relation: '엄마',
                inverse_relation: '딸',
                age: 31,
                gender: 1,
            },
        },
        {
            answer_content: '닭다리',
            user: {
                relation: '엄마',
                inverse_relation: '딸',
                age: 15,
                gender: 2,
            },
        },
        {
            answer_content: '닭가슴살',
            user: {
                relation: '엄마',
                inverse_relation: '딸',
                age: 44,
                gender: 1,
            },
        },
    ],
    user_answer: '닭다리',
    option_num: 3,
    question_category: 3,
    question_title: '나는 ㅇㅇㅇ 이 더 좋다',
    question_options: ['닭다리', '닭날개', '닭가슴살'],
    like_count: 0,
};
// SortedDataType => any 임시 수정
export const tutorialdataSets: any[] = [
    {
        sort: '전체',
        data: [
            {
                answer_content: '닭다리',
                user: {
                    relation: '엄마',
                    inverse_relation: '딸',
                    age: 31,
                    gender: 1,
                },
            },
            {
                answer_content: '닭다리',
                user: {
                    relation: '엄마',
                    inverse_relation: '딸',
                    age: 31,
                    gender: 1,
                },
            },
            {
                answer_content: '닭다리',
                user: {
                    relation: '엄마',
                    inverse_relation: '딸',
                    age: 52,
                    gender: 0,
                },
            },
            {
                answer_content: '닭날개',
                user: {
                    relation: '엄마',
                    inverse_relation: '딸',
                    age: 41,
                    gender: 1,
                },
            },
            {
                answer_content: '닭다리',
                user: {
                    relation: '엄마',
                    inverse_relation: '딸',
                    age: 51,
                    gender: 0,
                },
            },
            {
                answer_content: '닭다리',
                user: {
                    relation: '엄마',
                    inverse_relation: '딸',
                    age: 52,
                    gender: 0,
                },
            },
            {
                answer_content: '닭다리',
                user: {
                    relation: '엄마',
                    inverse_relation: '딸',
                    age: 29,
                    gender: 0,
                },
            },
            {
                answer_content: '닭다리',
                user: {
                    relation: '엄마',
                    inverse_relation: '딸',
                    age: 29,
                    gender: 0,
                },
            },
            {
                answer_content: '닭날개',
                user: {
                    relation: '엄마',
                    inverse_relation: '딸',
                    age: 61,
                    gender: 1,
                },
            },
            {
                answer_content: '닭다리',
                user: {
                    relation: '엄마',
                    inverse_relation: '딸',
                    age: 31,
                    gender: 1,
                },
            },
            {
                answer_content: '닭다리',
                user: {
                    relation: '엄마',
                    inverse_relation: '딸',
                    age: 29,
                    gender: 0,
                },
            },
            {
                answer_content: '닭가슴살',
                user: {
                    relation: '엄마',
                    inverse_relation: '딸',
                    age: 57,
                    gender: 0,
                },
            },
            {
                answer_content: '닭다리',
                user: {
                    relation: '엄마',
                    inverse_relation: '딸',
                    age: 29,
                    gender: 0,
                },
            },
            {
                answer_content: '닭가슴살',
                user: {
                    relation: '엄마',
                    inverse_relation: '딸',
                    age: 58,
                    gender: 1,
                },
            },
            {
                answer_content: '닭다리',
                user: {
                    relation: '엄마',
                    inverse_relation: '딸',
                    age: 52,
                    gender: 0,
                },
            },
            {
                answer_content: '닭다리',
                user: {
                    relation: '엄마',
                    inverse_relation: '딸',
                    age: 19,
                    gender: 0,
                },
            },
            {
                answer_content: '닭다리',
                user: {
                    relation: '엄마',
                    inverse_relation: '딸',
                    age: 31,
                    gender: 0,
                },
            },
            {
                answer_content: '닭다리',
                user: {
                    relation: '엄마',
                    inverse_relation: '딸',
                    age: 60,
                    gender: 1,
                },
            },
            {
                answer_content: '닭다리',
                user: {
                    relation: '엄마',
                    inverse_relation: '딸',
                    age: 33,
                    gender: 1,
                },
            },
            {
                answer_content: '닭가슴살',
                user: {
                    relation: '엄마',
                    inverse_relation: '딸',
                    age: 36,
                    gender: 0,
                },
            },
            {
                answer_content: '닭가슴살',
                user: {
                    relation: '엄마',
                    inverse_relation: '딸',
                    age: 24,
                    gender: 0,
                },
            },
            {
                answer_content: '닭다리',
                user: {
                    relation: '엄마',
                    inverse_relation: '딸',
                    age: 52,
                    gender: 0,
                },
            },
            {
                answer_content: '닭다리',
                user: {
                    relation: '엄마',
                    inverse_relation: '딸',
                    age: 21,
                    gender: 0,
                },
            },
            {
                answer_content: '닭가슴살',
                user: {
                    relation: '엄마',
                    inverse_relation: '딸',
                    age: 22,
                    gender: 1,
                },
            },
            {
                answer_content: '닭다리',
                user: {
                    relation: '엄마',
                    inverse_relation: '딸',
                    age: 30,
                    gender: 0,
                },
            },
            {
                answer_content: '닭날개',
                user: {
                    relation: '엄마',
                    inverse_relation: '딸',
                    age: 58,
                    gender: 1,
                },
            },
            {
                answer_content: '닭가슴살',
                user: {
                    relation: '엄마',
                    inverse_relation: '딸',
                    age: 46,
                    gender: 0,
                },
            },
            {
                answer_content: '닭다리',
                user: {
                    relation: '엄마',
                    inverse_relation: '딸',
                    age: 24,
                    gender: 0,
                },
            },
            {
                answer_content: '닭다리',
                user: {
                    relation: '엄마',
                    inverse_relation: '딸',
                    age: 29,
                    gender: 0,
                },
            },
            {
                answer_content: '닭날개',
                user: {
                    relation: '엄마',
                    inverse_relation: '딸',
                    age: 0,
                    gender: 0,
                },
            },
            {
                answer_content: '닭날개',
                user: {
                    relation: '엄마',
                    inverse_relation: '딸',
                    age: 35,
                    gender: 0,
                },
            },
            {
                answer_content: '닭다리',
                user: {
                    relation: '엄마',
                    inverse_relation: '딸',
                    age: 63,
                    gender: 1,
                },
            },
            {
                answer_content: '닭다리',
                user: {
                    relation: '엄마',
                    inverse_relation: '딸',
                    age: 24,
                    gender: 0,
                },
            },
            {
                answer_content: '닭날개',
                user: {
                    relation: '엄마',
                    inverse_relation: '딸',
                    age: 1,
                    gender: 0,
                },
            },
            {
                answer_content: '닭날개',
                user: {
                    relation: '엄마',
                    inverse_relation: '딸',
                    age: 31,
                    gender: 1,
                },
            },
            {
                answer_content: '닭다리',
                user: {
                    relation: '엄마',
                    inverse_relation: '딸',
                    age: 56,
                    gender: 1,
                },
            },
            {
                answer_content: '닭다리',
                user: {
                    relation: '엄마',
                    inverse_relation: '딸',
                    age: 31,
                    gender: 1,
                },
            },
            {
                answer_content: '닭다리',
                user: {
                    relation: '엄마',
                    inverse_relation: '딸',
                    age: 29,
                    gender: 0,
                },
            },
            {
                answer_content: '닭다리',
                user: {
                    relation: '엄마',
                    inverse_relation: '딸',
                    age: 31,
                    gender: 1,
                },
            },
            {
                answer_content: '닭다리',
                user: {
                    relation: '엄마',
                    inverse_relation: '딸',
                    age: 31,
                    gender: 1,
                },
            },
            {
                answer_content: '닭다리',
                user: {
                    relation: '엄마',
                    inverse_relation: '딸',
                    age: 15,
                    gender: 2,
                },
            },
            {
                answer_content: '닭가슴살',
                user: {
                    relation: '엄마',
                    inverse_relation: '딸',
                    age: 44,
                    gender: 1,
                },
            },
        ],
    },
    {
        sort: '30대 이하',
        data: [
            {
                answer_content: '닭다리',
                user: {
                    relation: '엄마',
                    inverse_relation: '딸',
                    age: 31,
                    gender: 1,
                },
            },
            {
                answer_content: '닭다리',
                user: {
                    relation: '엄마',
                    inverse_relation: '딸',
                    age: 31,
                    gender: 1,
                },
            },
            {
                answer_content: '닭다리',
                user: {
                    relation: '엄마',
                    inverse_relation: '딸',
                    age: 29,
                    gender: 0,
                },
            },
            {
                answer_content: '닭다리',
                user: {
                    relation: '엄마',
                    inverse_relation: '딸',
                    age: 29,
                    gender: 0,
                },
            },
            {
                answer_content: '닭다리',
                user: {
                    relation: '엄마',
                    inverse_relation: '딸',
                    age: 31,
                    gender: 1,
                },
            },
            {
                answer_content: '닭다리',
                user: {
                    relation: '엄마',
                    inverse_relation: '딸',
                    age: 29,
                    gender: 0,
                },
            },
            {
                answer_content: '닭다리',
                user: {
                    relation: '엄마',
                    inverse_relation: '딸',
                    age: 29,
                    gender: 0,
                },
            },
            {
                answer_content: '닭다리',
                user: {
                    relation: '엄마',
                    inverse_relation: '딸',
                    age: 19,
                    gender: 0,
                },
            },
            {
                answer_content: '닭다리',
                user: {
                    relation: '엄마',
                    inverse_relation: '딸',
                    age: 31,
                    gender: 0,
                },
            },
            {
                answer_content: '닭다리',
                user: {
                    relation: '엄마',
                    inverse_relation: '딸',
                    age: 33,
                    gender: 1,
                },
            },
            {
                answer_content: '닭가슴살',
                user: {
                    relation: '엄마',
                    inverse_relation: '딸',
                    age: 36,
                    gender: 0,
                },
            },
            {
                answer_content: '닭가슴살',
                user: {
                    relation: '엄마',
                    inverse_relation: '딸',
                    age: 24,
                    gender: 0,
                },
            },
            {
                answer_content: '닭다리',
                user: {
                    relation: '엄마',
                    inverse_relation: '딸',
                    age: 21,
                    gender: 0,
                },
            },
            {
                answer_content: '닭가슴살',
                user: {
                    relation: '엄마',
                    inverse_relation: '딸',
                    age: 22,
                    gender: 1,
                },
            },
            {
                answer_content: '닭다리',
                user: {
                    relation: '엄마',
                    inverse_relation: '딸',
                    age: 30,
                    gender: 0,
                },
            },
            {
                answer_content: '닭다리',
                user: {
                    relation: '엄마',
                    inverse_relation: '딸',
                    age: 24,
                    gender: 0,
                },
            },
            {
                answer_content: '닭다리',
                user: {
                    relation: '엄마',
                    inverse_relation: '딸',
                    age: 29,
                    gender: 0,
                },
            },
            {
                answer_content: '닭날개',
                user: {
                    relation: '엄마',
                    inverse_relation: '딸',
                    age: 0,
                    gender: 0,
                },
            },
            {
                answer_content: '닭날개',
                user: {
                    relation: '엄마',
                    inverse_relation: '딸',
                    age: 35,
                    gender: 0,
                },
            },
            {
                answer_content: '닭다리',
                user: {
                    relation: '엄마',
                    inverse_relation: '딸',
                    age: 24,
                    gender: 0,
                },
            },
            {
                answer_content: '닭날개',
                user: {
                    relation: '엄마',
                    inverse_relation: '딸',
                    age: 1,
                    gender: 0,
                },
            },
            {
                answer_content: '닭날개',
                user: {
                    relation: '엄마',
                    inverse_relation: '딸',
                    age: 31,
                    gender: 1,
                },
            },
            {
                answer_content: '닭다리',
                user: {
                    relation: '엄마',
                    inverse_relation: '딸',
                    age: 31,
                    gender: 1,
                },
            },
            {
                answer_content: '닭다리',
                user: {
                    relation: '엄마',
                    inverse_relation: '딸',
                    age: 29,
                    gender: 0,
                },
            },
            {
                answer_content: '닭다리',
                user: {
                    relation: '엄마',
                    inverse_relation: '딸',
                    age: 31,
                    gender: 1,
                },
            },
            {
                answer_content: '닭다리',
                user: {
                    relation: '엄마',
                    inverse_relation: '딸',
                    age: 31,
                    gender: 1,
                },
            },
            {
                answer_content: '닭다리',
                user: {
                    relation: '엄마',
                    inverse_relation: '딸',
                    age: 15,
                    gender: 2,
                },
            },
        ],
    },
    {
        sort: '40대, 50대',
        data: [
            {
                answer_content: '닭다리',
                user: {
                    relation: '엄마',
                    inverse_relation: '딸',
                    age: 52,
                    gender: 0,
                },
            },
            {
                answer_content: '닭날개',
                user: {
                    relation: '엄마',
                    inverse_relation: '딸',
                    age: 41,
                    gender: 1,
                },
            },
            {
                answer_content: '닭다리',
                user: {
                    relation: '엄마',
                    inverse_relation: '딸',
                    age: 51,
                    gender: 0,
                },
            },
            {
                answer_content: '닭다리',
                user: {
                    relation: '엄마',
                    inverse_relation: '딸',
                    age: 52,
                    gender: 0,
                },
            },
            {
                answer_content: '닭가슴살',
                user: {
                    relation: '엄마',
                    inverse_relation: '딸',
                    age: 57,
                    gender: 0,
                },
            },
            {
                answer_content: '닭가슴살',
                user: {
                    relation: '엄마',
                    inverse_relation: '딸',
                    age: 58,
                    gender: 1,
                },
            },
            {
                answer_content: '닭다리',
                user: {
                    relation: '엄마',
                    inverse_relation: '딸',
                    age: 52,
                    gender: 0,
                },
            },
            {
                answer_content: '닭다리',
                user: {
                    relation: '엄마',
                    inverse_relation: '딸',
                    age: 52,
                    gender: 0,
                },
            },
            {
                answer_content: '닭날개',
                user: {
                    relation: '엄마',
                    inverse_relation: '딸',
                    age: 58,
                    gender: 1,
                },
            },
            {
                answer_content: '닭가슴살',
                user: {
                    relation: '엄마',
                    inverse_relation: '딸',
                    age: 46,
                    gender: 0,
                },
            },
            {
                answer_content: '닭다리',
                user: {
                    relation: '엄마',
                    inverse_relation: '딸',
                    age: 56,
                    gender: 1,
                },
            },
            {
                answer_content: '닭가슴살',
                user: {
                    relation: '엄마',
                    inverse_relation: '딸',
                    age: 44,
                    gender: 1,
                },
            },
        ],
    },
    {
        sort: '60, 70대',
        data: [
            {
                answer_content: '닭날개',
                user: {
                    relation: '엄마',
                    inverse_relation: '딸',
                    age: 61,
                    gender: 1,
                },
            },
            {
                answer_content: '닭다리',
                user: {
                    relation: '엄마',
                    inverse_relation: '딸',
                    age: 60,
                    gender: 1,
                },
            },
            {
                answer_content: '닭다리',
                user: {
                    relation: '엄마',
                    inverse_relation: '딸',
                    age: 63,
                    gender: 1,
                },
            },
        ],
    },
    {
        sort: '80대 이상',
        data: [],
    },
];

export const tutorialRecommendedGift: IRecommendedGift = {
    gift: {
        _id: '650a90db7ff8c2696649003f',
        revision_id: null,
        type: 1,
        thumbnail_url:
            'https://qollabs-content-images.s3.ap-northeast-2.amazonaws.com/next-s3-uploads/435d238b-27ad-4f4f-aa8a-0d5c3a55f629/slide01.jpg',
        image_url: [
            'https://qollabs-content-images.s3.ap-northeast-2.amazonaws.com/next-s3-uploads/58b4783f-aafe-4d80-9bfd-1843c493d54d/slide01.jpg',
            'https://qollabs-content-images.s3.ap-northeast-2.amazonaws.com/next-s3-uploads/fb60f75a-03ca-4085-b303-0338ada0215c/slide02.jpg',
        ],
        title: '데일리 안티 헤어로스 트리트먼트 500ml',
        description: '선택이 아닌 필수, 차은우 트리트먼트',
        link: 'https://smartstore.naver.com/qollabs/products/8905619982',
        price: 16400,
        retail_price: 25000,
        discount_rate: 34,
        tags: ['헤어', '트리트먼트', '두피', '모발', '탈모'],
        options: [],
        detail_info: {
            detail_image: [
                'https://qollabs-content-images.s3.ap-northeast-2.amazonaws.com/next-s3-uploads/80e50ffb-71af-4d2c-ba3b-5d9115510191/detail01.jpg',
                'https://qollabs-content-images.s3.ap-northeast-2.amazonaws.com/next-s3-uploads/3fc85ee0-e950-4b1f-b076-385c76a5f023/detail02.jpg',
                'https://qollabs-content-images.s3.ap-northeast-2.amazonaws.com/next-s3-uploads/eeafade5-7f1b-4768-a13b-adfd6d310543/detail03.jpg',
                'https://qollabs-content-images.s3.ap-northeast-2.amazonaws.com/next-s3-uploads/48e142cb-fbb6-4d7b-a1d2-8042d95956f6/detail04.jpg',
            ],
            seller: {
                _id: '650a8f037ff8c26966490035',
                brand: '다슈',
                brand_code: '',
                corporation: {
                    _id: '650a8e937ff8c26966490034',
                    name: '다슈코리아(주)',
                    store_type: 1,
                    shipment_info: {
                        location: '인천광역시 서구 검단로 326번길 35-43',
                        courier: '우체국',
                        bundled: true,
                        fee: 3500,
                        free_threshold: 30000,
                        additional_fee: 0,
                        additional_fee_jeju: 0,
                        return_exchange_info: {
                            location: '인천광역시 서구 검단로 326번길 35-43',
                            courier: '우체국',
                            return_fee: 3500,
                            exchange_fee: 7000,
                            duration: 7,
                            rejection_reason: ['개봉 또는 훼손시'],
                        },
                    },
                    after_service: {
                        phone_number: '010-6469-2526',
                        guide: '앤서록입니다. 제품 사용 중 문의사항이 있으시면 전화 010-6469-2526 또는 sstore.qollabs@gmail.com 으로 1년 365일 연락 부탁드립니다. 정품만 취급합니다.',
                    },
                    created_at: '2023-09-20T04:03:05.766000',
                    updated_at: '2023-09-20T04:03:05.766000',
                    deleted_at: null,
                },
                created_at: '2023-09-20T04:03:05.768000',
                updated_at: '2023-09-20T04:03:05.768000',
                deleted_at: null,
            },
            manufacturer: '서울화장품',
            manufactured_date: null,
            expiration_date: null,
        },
        created_at: '2023-09-20T04:03:05.775000',
        updated_at: '2023-09-20T04:03:05.775000',
        deleted_at: null,
    },
    interested: true,
};
