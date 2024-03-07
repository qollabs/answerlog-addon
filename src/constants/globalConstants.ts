import { BankCodeType, GenderType, IQnA } from '@Types/types';
export const bankCodes: BankCodeType[] = [
    '39',
    '34',
    'S8',
    '12',
    'SE',
    'SK',
    'S5',
    'SM',
    '32',
    'S3',
    '45',
    '64',
    'SN',
    'S2',
    '88',
    '48',
    '27',
    '20',
    '71',
    'S0',
    'SJ',
    '50',
    '37',
    '35',
    '90',
    'SQ',
    '89',
    'SB',
    '토스머니',
    '92',
    'ST',
    'SR',
    'SH',
    '81',
    'S9',
    'S6',
    'SG',
    'SA',
    '54',
    'SI',
    '31',
    '03',
    '06',
    'S4',
    '02',
    'SP',
    'SO',
    '11',
    'SL',
    '23',
    '07',
    'SD',
];
export const countryNames: string[] = [
    '대한민국',
    '대만',
    '일본',
    '중국',
    '홍콩',
    '그리스',
    '네덜란드',
    '노르웨이',
    '뉴질랜드',
    '덴마크',
    '독일',
    '라오스',
    '라트비아',
    '러시아',
    '레바논',
    '루마니아',
    '룩셈부르크',
    '리투아니아',
    '마카오',
    '마케도니아',
    '말레이시아',
    '몰타',
    '미국/캐나다',
    '미얀마',
    '바레인',
    '방글라데시',
    '베트남',
    '벨기에',
    '벨라루스',
    '보스니아',
    '불가리아',
    '브루나이',
    '사우디아라비아',
    '세르비아',
    '스웨덴',
    '스위스',
    '스페인',
    '슬로바키아',
    '슬로베니아',
    '싱가포르',
    '아랍에미리트',
    '아르메니아',
    '아일랜드',
    '아제르바이잔',
    '아프가니스탄',
    '알바니아',
    '에스토니아',
    '영국',
    '예맨',
    '오만',
    '오스트리아',
    '요르단',
    '우즈베키스탄',
    '우크라이나',
    '이스라엘',
    '이집트',
    '이탈리아',
    '인도',
    '인도네시아',
    '체코',
    '캄보디아',
    '쿠웨이트',
    '크로아티아',
    '키프로스',
    '키르기스스탄',
    '타지키스탄',
    '태국',
    '튀르키예',
    '투르크메니스탄',
    '파키스탄',
    '파푸아뉴기니',
    '포르투갈',
    '폴란드',
    '프랑스',
    '핀란드',
    '필리핀',
    '헝가리',
    '호주',
];

export const genderOptions: { label: string; value: GenderType }[] = [
    {
        label: '남자',
        value: 'male',
    },
    {
        label: '여자',
        value: 'female',
    },
    {
        label: '그 외',
        value: 'etc',
    },
];

export const questionTypeOptions = [
    { label: '단답형', value: 0 },
    { label: '서술형', value: 1 },
    { label: '단수선택형', value: 2 },
    { label: '복수선택형', value: 3 },
    { label: '혼합형', value: 4 },
];

export const relationTypeOptions = [
    { label: '부모 자녀 관계', value: 0 },
    { label: '배우자 관계', value: 1 },
    // { label: '형제 자매 관계', value: 2 },
    // { label: '친구 관계', value: 3 },
];

export const relationOptions = [
    {
        label: '엄마',
        value: '엄마',
    },
    {
        label: '아빠',
        value: '아빠',
    },
    {
        label: '딸',
        value: '딸',
    },
    {
        label: '아들',
        value: '아들',
    },
];
export const relationLabels = relationOptions.map((option) => option.label);
export const relationValues = relationOptions.map((option) => option.value);

export const testUserIds: string[] = [
    '64fbf509e1b2d0467548a82c', // 레옹님 실서버
    '653fdcbd90fe71a6cec8d626', // 레옹님 테스트서버
    '64fb1623e1b2d0467548a822', // 크리스님 실서버
    '6544fc3c7ea81083f00178f9', // 크리스님 테스트서버
    '64fbd6f5e1b2d0467548a828', // 샘 실서버
    '64f9e8e708ba2c613feb678e', // 샘 테스트서버
    '6509341b22cd03fb5f32045c', // 김팀장님 테스트서버
    '650beb347ff8c2696649004e', // 김팀장님 실서버
    '659f69fb3a928a260c29f7b1', // qa 아이폰 실서버
    '65bb350532684bd9322c69d8', // qa 아이폰 테스트서버
    '64fa867c764e696b141d6eb5', // 윤희님 실서버
    '651a51c5ade7938444058c8a', // 윤희님 테스트서버
    '65898424faedee3167a5c60c', // 존님 실서버
];
interface IQollabs {
    title: string;
    ceo: string;
    companyRegistrationNumber: string;
    address: string;
    phoneNumber: string;
    mailOrderBusinessReportNumber: string;
}

export const qollabs: IQollabs = {
    title: '(주)삶의질연구소',
    ceo: '조기웅',
    companyRegistrationNumber: '696-81-02910',
    address: '대전시 유성구 문지로 193 한국과학기술원 진리관 T-139',
    phoneNumber: '1688-3242',
    mailOrderBusinessReportNumber: '2023-대전유성-0381',
};

export const emailDomains = [
    'gmail.com',
    'naver.com',
    'hanmail.com',
    '직접 입력',
];
