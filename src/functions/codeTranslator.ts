import {
    BankCodeType,
    CardCodeType,
    CountryCodeType,
    EasyPayCodeType,
    GenderType,
    TextSizePrefType,
} from '@Types/types';

export const cardCodeTranslator = (code: CardCodeType) => {
    switch (code) {
        case '3K':
            return '기업BC';
        case '46':
            return '광주은행';
        case '71':
            return '롯데카드';
        case '30':
            return 'KDB산업은행';
        case '31':
            return 'BC카드';
        case '51':
            return '삼성카드';
        case '38':
            return '새마을금고';
        case '41':
            return '신한카드';
        case '62':
            return '신협';
        case '36':
            return '씨티카드';
        case '33':
            return '우리BC카드';
        case 'W1':
            return '우리카드';
        case '37':
            return '우체국예금보험';
        case '39':
            return '저축은행중앙회';
        case '35':
            return '전북은행';
        case '42':
            return '제주은행';
        case '15':
            return '카카오뱅크';
        case '3A':
            return '케이뱅크';
        case '24':
            return '토스뱅크';
        case '21':
            return '하나카드';
        case '61':
            return '현대카드';
        case '11':
            return 'KB국민카드';
        case '91':
            return 'NH농협카드';
        case '34':
            return 'Sh수협은행';
        case '6D':
            return 'DINERS';
        case '4M':
            return 'MASTER';
        case '3C':
            return 'UNIONPAY';
        case '7A':
            return 'AMEX';
        case '4J':
            return 'JCB';
        case '4V':
            return 'VISA';
        default:
            return '기타'; // 다 아닌경우는 어떡하지?
    }
};

export const bankCodeTranslator = (code: BankCodeType) => {
    switch (code) {
        case '39':
            return '경남은행';
        case '34':
            return '광주은행';
        case 'S8':
            return '교보증권';
        case '12':
            return '지역농축협';
        case 'SE':
            return '대신증권';
        case 'SK':
            return '메리츠증권';
        case 'S5':
            return '미래에셋증권';
        case 'SM':
            return '부국증권';
        case '32':
            return '부산은행';
        case 'S3':
            return '삼성증권';
        case '45':
            return '새마을금고';
        case '64':
            return '산림조합';
        case 'SN':
            return '신영증권';
        case 'S2':
            return '신한금융투자';
        case '88':
            return '신한은행';
        case '48':
            return '신협';
        case '27':
            return '씨티은행';
        case '20':
            return '우리은행';
        case '71':
            return '우체국예금보험';
        case 'S0':
            return '유안타증권';
        case 'SJ':
            return '유진투자증권';
        case '50':
            return '저축은행중앙회';
        case '37':
            return '전북은행';
        case '35':
            return '제주은행';
        case '90':
            return '카카오뱅크';
        case 'SQ':
            return '카카오페이증권';
        case '89':
            return '케이뱅크';
        case 'SB':
            return '키움증권';
        case '토스머니':
            return '토스머니';
        case '92':
            return '토스뱅크';
        case 'ST':
            return '토스증권';
        case 'SR':
            return '펀드온라인코리아(한국포스증권)';
        case 'SH':
            return '하나금융투자';
        case '81':
            return '하나은행';
        case 'S9':
            return '하이투자증권';
        case 'S6':
            return '한국투자증권';
        case 'SG':
            return '한화투자증권';
        case 'SA':
            return '현대차증권';
        case '54':
            return '홍콩상하이은행';
        case 'SI':
            return 'DB금융투자';
        case '31':
            return 'DGB대구은행';
        case '03':
            return 'IBK기업은행';
        case '06':
            return 'KB국민은행';
        case 'S4':
            return 'KB증권';
        case '02':
            return 'KDB산업은행';
        case 'SP':
            return 'KTB투자증권(다올투자증권)';
        case 'SO':
            return 'LIG투자증권';
        case '11':
            return 'NH농협은행';
        case 'SL':
            return 'NH투자증권';
        case '23':
            return 'SC제일은행';
        case '07':
            return 'Sh수협은행';
        case 'SD':
            return 'SK증권';
        default:
            return '기타'; // 다 아닌경우는 어떡하지?
    }
};

// export const easyPayCodeTranslator = (code: EasyPayCodeType) => {
//     switch (code) {
//         case 'TOSSPAY':
//             return '토스페이';
//         case 'NAVERPAY':
//             return '네이버페이';
//         case 'SAMSUNGPAY':
//             return '삼성페이';
//         case 'APPLEPAY':
//             return '애플페이';
//         case 'KAKAOPAY':
//             return '카카오페이';
//         case 'LPAY':
//             return '엘페이';
//         case 'PAYCO':
//             return '페이코';
//         case 'SSG':
//             return 'SSG페이';
//         default:
//             return '기타';
//     }
// };

export const countryCodeTranslator = (code: CountryCodeType) => {
    switch (code) {
        case '82':
            return '대한민국';
        case '1':
            return '미국/캐나다';
        case '886':
            return '대만';
        case '81':
            return '일본';
        case '86':
            return '중국';
        case '65':
            return '싱가포르';
        case '852':
            return '홍콩';
        case '62':
            return '인도네시아';
        case '60':
            return '말레이시아';
        case '63':
            return '필리핀';
        case '66':
            return '태국';
        case '673':
            return '브루나이';
        case '84':
            return '베트남';
        case '856':
            return '라오스';
        case '95':
            return '미얀마';
        case '855':
            return '캄보디아';
        case '853':
            return '마카오';
        case '880':
            return '방글라데시';
        case '91':
            return '인도';
        case '92':
            return '파키스탄';
        case '966':
            return '사우디아라비아';
        case '971':
            return '아랍에미리트';
        case '374':
            return '아르메니아';
        case '994':
            return '아제르바이잔';
        case '93':
            return '아프가니스탄';
        case '355':
            return '알바니아';
        case '967':
            return '예맨';
        case '968':
            return '오만';
        case '962':
            return '요르단';
        case '998':
            return '우즈베키스탄';
        case '380':
            return '우크라이나';
        case '972':
            return '이스라엘';
        case '20':
            return '이집트';
        case '965':
            return '쿠웨이트';
        case '996':
            return '키르기스스탄';
        case '992':
            return '타지키스탄';
        case '90':
            return '튀르키예';
        case '993':
            return '투르크메니스탄';
        case '64':
            return '뉴질랜드';
        case '61':
            return '호주';
        case '675':
            return '파푸아뉴기니';
        case '30':
            return '그리스';
        case '31':
            return '네덜란드';
        case '47':
            return '노르웨이';
        case '45':
            return '덴마크';
        case '49':
            return '독일';
        case '371':
            return '라트비아';
        case '7':
            return '러시아';
        case '961':
            return '레바논';
        case '40':
            return '루마니아';
        case '352':
            return '룩셈부르크';
        case '370':
            return '리투아니아';
        case '389':
            return '마케도니아';
        case '356':
            return '몰타';
        case '973':
            return '바레인';
        case '32':
            return '벨기에';
        case '375':
            return '벨라루스';
        case '387':
            return '보스니아';
        case '359':
            return '불가리아';
        case '381':
            return '세르비아';
        case '46':
            return '스웨덴';
        case '41':
            return '스위스';
        case '34':
            return '스페인';
        case '421':
            return '슬로바키아';
        case '386':
            return '슬로베니아';
        case '353':
            return '아일랜드';
        case '372':
            return '에스토니아';
        case '44':
            return '영국';
        case '43':
            return '오스트리아';
        case '39':
            return '이탈리아';
        case '420':
            return '체코';
        case '385':
            return '크로아티아';
        case '357':
            return '키프로스';
        case '351':
            return '포르투갈';
        case '48':
            return '폴란드';
        case '33':
            return '프랑스';
        case '358':
            return '핀란드';
        case '36':
            return '헝가리';
        default:
            return '기타';
    }
};
export const countryCodeReverseTranslator = (
    country: string,
): CountryCodeType => {
    switch (country) {
        case '대한민국':
            return '82';
        case '미국/캐나다':
            return '1';
        case '대만':
            return '886';
        case '일본':
            return '81';
        case '중국':
            return '86';
        case '싱가포르':
            return '65';
        case '홍콩':
            return '852';
        case '인도네시아':
            return '62';
        case '말레이시아':
            return '60';
        case '필리핀':
            return '63';
        case '태국':
            return '66';
        case '브루나이':
            return '673';
        case '베트남':
            return '84';
        case '라오스':
            return '856';
        case '미얀마':
            return '95';
        case '캄보디아':
            return '855';
        case '마카오':
            return '853';
        case '방글라데시':
            return '880';
        case '인도':
            return '91';
        case '파키스탄':
            return '92';
        case '사우디아라비아':
            return '966';
        case '아랍에미리트':
            return '971';
        case '아르메니아':
            return '374';
        case '아제르바이잔':
            return '994';
        case '아프가니스탄':
            return '93';
        case '알바니아':
            return '355';
        case '예맨':
            return '967';
        case '오만':
            return '968';
        case '요르단':
            return '962';
        case '우즈베키스탄':
            return '998';
        case '우크라이나':
            return '380';
        case '이스라엘':
            return '972';
        case '이집트':
            return '20';
        case '쿠웨이트':
            return '965';
        case '키르기스스탄':
            return '996';
        case '타지키스탄':
            return '992';
        case '튀르키예':
            return '90';
        case '투르크메니스탄':
            return '993';
        case '뉴질랜드':
            return '64';
        case '호주':
            return '61';
        case '파푸아뉴기니':
            return '675';
        case '그리스':
            return '30';
        case '네덜란드':
            return '31';
        case '노르웨이':
            return '47';
        case '덴마크':
            return '45';
        case '독일':
            return '49';
        case '라트비아':
            return '371';
        case '러시아':
            return '7';
        case '레바논':
            return '961';
        case '루마니아':
            return '40';
        case '룩셈부르크':
            return '352';
        case '리투아니아':
            return '370';
        case '마케도니아':
            return '389';
        case '몰타':
            return '356';
        case '바레인':
            return '973';
        case '벨기에':
            return '32';
        case '벨라루스':
            return '375';
        case '보스니아':
            return '387';
        case '불가리아':
            return '359';
        case '세르비아':
            return '381';
        case '스웨덴':
            return '46';
        case '스위스':
            return '41';
        case '스페인':
            return '34';
        case '슬로바키아':
            return '421';
        case '슬로베니아':
            return '386';
        case '아일랜드':
            return '353';
        case '에스토니아':
            return '372';
        case '영국':
            return '44';
        case '오스트리아':
            return '43';
        case '이탈리아':
            return '39';
        case '체코':
            return '420';
        case '크로아티아':
            return '385';
        case '키프로스':
            return '357';
        case '포르투갈':
            return '351';
        case '폴란드':
            return '48';
        case '프랑스':
            return '33';
        case '핀란드':
            return '358';
        case '헝가리':
            return '36';
        default:
            return '82';
    }
};

export const genderCodeTranslator = (code: number): GenderType => {
    switch (code) {
        case 0:
            return 'male';
        case 1:
            return 'female';
        case 2:
            return 'etc';
        default:
            return 'male';
    }
};
export const genderCodeReverseTranslator = (gender: GenderType): number => {
    switch (gender) {
        case 'male':
            return 0;
        case 'female':
            return 1;
        case 'etc':
            return 2;
        default:
            return 0;
    }
};

export const textSizePrefCodeTranslator = (code: number): TextSizePrefType => {
    switch (code) {
        case 0:
            return 'v0';
        case 1:
            return 'v1';
        case 2:
            return 'v2';
        default:
            return 'v1';
    }
};

export const textSizePrefCodeReverseTranslator = (
    textSizePref: TextSizePrefType,
): number => {
    switch (textSizePref) {
        case 'v0':
            return 0;
        case 'v1':
            return 1;
        case 'v2':
            return 2;
        default:
            return 1;
    }
};

// 쿠폰 코드를 직접 입력하는 경우, 쿠폰 코드를 쿠폰의 DB id로 변환시켜주는 작업이 필요하다

export const couponCodeTranslator = (code: string) => {
    switch (code) {
        // 더치톡 제휴쿠폰
        case 'dutchtalk2024':
            return '65c43450a3fa72571ce6b317';
        // return '65b8c66617169b0592698c57';
        default:
            return '';
    }
};

export const qrDataTranslator = (data: string) => {
    const query = data.split('/').slice(-1)[0];
    switch (query) {
        // 더치톡 제휴 qr
        case '1iXKZ':
            return '65c43450a3fa72571ce6b317';
        default:
            return '';
    }
};
