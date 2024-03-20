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

class QollabsField {
    label: string;
    value: string;

    constructor(label: string, value: string) {
        this.label = label;
        this.value = value;
    }
}

interface IQollabs {
    title: QollabsField;
    ceo: QollabsField;
    companyRegistrationNumber: QollabsField;
    address: QollabsField;
    phoneNumber: QollabsField;
    mailOrderBusinessReportNumber: QollabsField;
    email: QollabsField;
}

export const qollabs: IQollabs = {
    title: new QollabsField('회사명', '(주)삶의질연구소'),
    ceo: new QollabsField('대표자', '조기웅'),
    companyRegistrationNumber: new QollabsField(
        '사업자등록번호',
        '696-81-02910',
    ),
    address: new QollabsField(
        '주소',
        '대전시 유성구 문지로 193 한국과학기술원 진리관 T-139',
    ),
    phoneNumber: new QollabsField('유선번호', '1688-3242'),
    mailOrderBusinessReportNumber: new QollabsField(
        '통신판매업 신고번호',
        '2023-대전유성-0381',
    ),
    email: new QollabsField('이메일', 'info@qollabs.care'),
};

export const emailDomains = [
    'gmail.com',
    'naver.com',
    'hanmail.com',
    '직접 입력',
];
