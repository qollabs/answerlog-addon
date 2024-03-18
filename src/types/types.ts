declare global {
    interface Window {
        flutter_inappwebview: {
            callHandler: (
                name: string,
                action: { code: string; value: any },
            ) => Promise<any>;
        };
        BootpayRNWebView: any;
        Kakao: any;
    }
}

enum InviteStatusEnum {
    Denied = 0,
    Accepted = 2,
    Deleted = 3,
} //0:승락안됨 2: 승락됨 3:차단(삭제)됨

export interface LinkedUserType {
    id: string | null;
    invite_status: InviteStatusEnum;
    user_link_id: string;
    name: string | null;
    birth_date: string | null;
    country_code: string | null;
    phone_number: string | null;
    profile_image_url: string | null;
    relation: string;
    linked_at: string | null;
}
export interface RecentLinkedUserType
    extends Omit<LinkedUserType, 'invite_status'> {}

export interface UserSettingType {
    font_preference: number;
    linked_oauth: {
        kakao: {
            kakao_id: string | null;
        };
        apple: {
            apple_id: string | null;
        };
    };
}

export interface AlertType {
    type: number;
    related_user_id: string;
    question_id: string;
    date: string;
    content: string;
    link: string;
    // 해당 객체가 채팅 관련일 경우, 확인하지 않은 채팅의 갯수를 표기, 답변/문답모음에 들어가면 0이 되며 0이되면 채팅관련 새로운 객체를 생성함. 프론트에서는 사용하지 않음
    not_read_count: number;
}

export interface PointType {
    point_id: string;
    total_amount: number;
    remaining_amount: number;
    deployed_at: string;
    expired_at: string;
}

export interface CouponType {
    coupon_id: string;
    title: string;
    image_url: string | null;
    place: string;
    options: string[];
    linked_gifts: string[];
    is_used: boolean;
    deployed_at: string;
    expired_at: string;
    used_at: string | null;
}

export interface IUser {
    id: string;
    name: string;
    birth_date: string;
    country_code: string;
    phone_number: string;
    gender: number;
    profile_image_url: string | null;
    linked_users: LinkedUserType[];
    recent_linked_user: RecentLinkedUserType | null;
    user_setting: UserSettingType;
    done_onboarding: boolean;
    alert: AlertType[];
    point: PointType[];
    coupon: CouponType[];
}

export interface ImageType {
    name: string;
    file?: File;
    previewURL: string | ArrayBuffer | null;
}

export interface AudioType {
    name: string;
    file?: File;
    previewURL: string | ArrayBuffer | null;
}

export type Optional<T> = T | undefined;

export type TextSizePrefType = 'v0' | 'v1' | 'v2';

export type TextSizePrefBeforeLoginType = TextSizePrefType | 'none';

export type GenderType = 'male' | 'female' | 'etc';

export type CountryCodeType =
    | '82'
    | '1'
    | '886'
    | '81'
    | '86'
    | '65'
    | '852'
    | '62'
    | '60'
    | '63'
    | '66'
    | '673'
    | '84'
    | '856'
    | '95'
    | '855'
    | '853'
    | '880'
    | '91'
    | '92'
    | '966'
    | '971'
    | '374'
    | '994'
    | '93'
    | '355'
    | '967'
    | '968'
    | '962'
    | '998'
    | '380'
    | '972'
    | '20'
    | '965'
    | '996'
    | '992'
    | '90'
    | '993'
    | '64'
    | '61'
    | '675'
    | '30'
    | '31'
    | '47'
    | '45'
    | '49'
    | '371'
    | '7'
    | '961'
    | '40'
    | '352'
    | '370'
    | '389'
    | '356'
    | '973'
    | '32'
    | '375'
    | '387'
    | '359'
    | '381'
    | '46'
    | '41'
    | '34'
    | '421'
    | '386'
    | '353'
    | '372'
    | '44'
    | '43'
    | '39'
    | '420'
    | '385'
    | '357'
    | '351'
    | '48'
    | '33'
    | '358'
    | '36';

enum QuestionTypeEnum {
    SubjectiveShort,
    SubjectiveLong,
    ScoreLevel, // 0,25,50,75,100 중 택1
    ChoiceMultiple, // 1개 선택 또는 기타 선택 불가능
    ChoiceSingle, // 기타 선택 가능
    ScoreLinear, // 0~100
}

export interface IQuestion {
    _id: string;
    set_id: number;
    version_id: number;
    question_num: number;
    category: number;
    topic: number;
    sub_topic: number[];
    type: QuestionTypeEnum; //0 : 단답형 1 : 서술형 2: 단수선택형 3:복수선택형 4  : 혼합형
    // 0 : 주관식단답형 1 : 주관식서술형 2 : 점수척도형 3 : 객관식복수형 4 : 객관식단수형 5 : 점수수치형
    content: string;
    options: string[] | null;
    target_relation: number[];
    created_at: string;
    updated_at: string | null;
    deleted_at: string | null;
}

export interface IQuestionAnswered {
    answered_at: string | null;
    arrived_at: string;
    question: IQuestion;
}

export interface IAnswer {
    answered_at: string | null;
    answered_content: string[];
}

export interface QuestionMessageType {
    sender: string;
    message_index: number;
    content: string;
    sent_at: string;
    deleted_at: string | null;
}

export interface IQnA {
    question: IQuestion;
    linked: IAnswer;
    me: IAnswer;
    arrived_at: string;
    set_num: number;
    messages: QuestionMessageType[];
}

export interface IRecContent {
    _id: string;
    type: number;
    title: string;
    link: string;
    description: string;
    image_url: string;
    created_at: string;
    updated_at?: string;
    deleted_at?: string;
}

export interface ILinkedUser {
    id: string;
    profile_image_url: string;
    relation: string;
    name: string;
}

export interface GiftOptionDetailType {
    option_value: string;
    option_price: number;
}

export interface GiftOptionType {
    option_name: string;
    option_detail: GiftOptionDetailType[];
}

export interface SelectedGiftOptionType {
    option_name: string;
    option_detail: GiftOptionDetailType;
}

export interface ShipmentInfoType {
    location: string;
    courier: string;
    bundled: boolean;
    fee: number;
    free_threshold: number;
    additional_fee: number;
    additional_fee_jeju: number;
    return_exchange_info: {
        location: string;
        courier: string;
        return_fee: number;
        exchange_fee: number;
        duration: number;
        rejection_reason: string[];
    };
}

export interface CorporationType {
    _id: string;
    name: string;
    store_type: number;
    shipment_info: ShipmentInfoType;
    after_service: {
        phone_number: string;
        guide: string;
    };
    created_at: string;
    updated_at: string | null;
    deleted_at: string | null;
}

export interface SellerType {
    _id: string;
    brand: string;
    brand_code: string | null;
    corporation: CorporationType;
    created_at: string;
    updated_at: string | null;
    deleted_at: string | null;
}

export interface GiftDetailInfoType {
    detail_image: string[];
    manufacturer: string;
    seller: SellerType;
    manufactured_date: string | null;
    expiration_date: string | null;
}

export interface IGift {
    _id: string;
    revision_id: string | null;
    type: number;
    thumbnail_url: string;
    image_url: string[];
    title: string;
    description: string;
    link: string;
    price: number;
    retail_price: number;
    discount_rate: number;
    tags: string[];
    options: GiftOptionType[];
    detail_info: GiftDetailInfoType;
    created_at: string;
    updated_at: string | null;
    deleted_at: string | null;
}
export interface StockInfoType {
    options: SelectedGiftOptionType[];
    amount: number;
    deleted: boolean;
}
export interface IGiftDetail extends IGift {
    interested: boolean;
    stock_info: StockInfoType[];
}

export interface IRecommendedGift {
    gift: IGift;
    interested: boolean;
}

export interface IncartGiftStockType {
    _id: string;
    current_options: SelectedGiftOptionType[];
    stock_amount: number;
    deleted: boolean;
}

export interface IIncartGift {
    item: IGift;
    amount: number;
    current_options: SelectedGiftOptionType[];
    selected: boolean;
}

export interface IIncartGiftSelected extends IIncartGift {
    stock_amount: number;
}

export interface UpdateCartReqType {
    id: string;
    options: SelectedGiftOptionType[];
    selected?: boolean;
    num?: number;
}

export interface IAddress {
    address_id: string;
    name: string | null;
    receiver: string;
    postal_code: number;
    main_address: string;
    sub_address: string | null;
    country_code: CountryCodeType;
    phone_number: string;
    sub_country_code: CountryCodeType | null;
    sub_phone_number: string | null;
    message: string;
    default: boolean;
    email: string;
}

export type PaymentMethodType =
    | '카드'
    | '가상계좌'
    | '간편결제'
    | '휴대폰'
    | '전액포인트';

export type PaymentStatusType =
    | 'READY'
    | 'IN_PROGRESS'
    | 'WAITING_FOR_DEPOSIT'
    | 'DONE'
    | 'CANCELED'
    | 'PARTIAL_CANCELED'
    | 'ABORTED'
    | 'EXPIRED';

export type CardCodeType =
    | '3K'
    | '46'
    | '71'
    | '30'
    | '31'
    | '51'
    | '38'
    | '41'
    | '62'
    | '36'
    | '33'
    | 'W1'
    | '37'
    | '39'
    | '35'
    | '42'
    | '15'
    | '3A'
    | '24'
    | '21'
    | '61'
    | '11'
    | '91'
    | '34'
    | '6D'
    | '4M'
    | '3C'
    | '7A'
    | '4J'
    | '4V';

export interface PaymentCardType {
    amount: number;
    issuerCode: CardCodeType;
    acquirerCode: CardCodeType | null;
    installmentPlanMonths: number;
    approveNo: string;
    useCardPoint: boolean;
    cardType: '신용' | '체크' | '기프트' | '미확인';
    ownerType: '개인' | '법인' | '미확인';
    acquireStatus:
        | 'READY'
        | 'REQUESTED'
        | 'COMPLETED'
        | 'CANCEL_REQUESTED'
        | 'CANCELED';
    isInterestFree: boolean;
    interestPayer: 'BUYER' | 'CARD_COMPANY' | 'MERCHANT' | null;
}

export type BankCodeType =
    | '39'
    | '34'
    | 'S8'
    | '12'
    | 'SE'
    | 'SK'
    | 'S5'
    | 'SM'
    | '32'
    | 'S3'
    | '45'
    | '64'
    | 'SN'
    | 'S2'
    | '88'
    | '48'
    | '27'
    | '20'
    | '71'
    | 'S0'
    | 'SJ'
    | '50'
    | '37'
    | '35'
    | '90'
    | 'SQ'
    | '89'
    | 'SB'
    | '토스머니'
    | '92'
    | 'ST'
    | 'SR'
    | 'SH'
    | '81'
    | 'S9'
    | 'S6'
    | 'SG'
    | 'SA'
    | '54'
    | 'SI'
    | '31'
    | '03'
    | '06'
    | 'S4'
    | '02'
    | 'SP'
    | 'SO'
    | '11'
    | 'SL'
    | '23'
    | '07'
    | 'SD';

export interface PaymentVirtualAccountType {
    accountType: '일반' | '고정';
    accountNumber: string;
    bankCode: BankCodeType;
    customerName: string;
    dueDate: string;
    refundStatus:
        | 'NONE'
        | 'PENDING'
        | 'FAILED'
        | 'PARTIAL_FAILED'
        | 'COMPLETED';
    expired: boolean;
    settlementStatus: 'INCOMPLETED' | 'COMPLETED';
    refundReceiveAccount: {
        banckCode: string;
        accountNumber: string;
        holderName: string;
    };
}

export interface PaymentMobilePhoneType {
    customerMobilePhone: string;
    settlementStatus: string;
    receiptUrl: string;
}

// export type EasyPayCodeType =
//     | 'TOSSPAY'
//     | 'NAVERPAY'
//     | 'SAMSUNGPAY'
//     | 'APPLEPAY'
//     | 'LPAY'
//     | 'KAKAOPAY'
//     | 'PAYCO'
//     | 'SSG';

export type EasyPayCodeType =
    | '토스페이'
    | '네이버페이'
    | '삼성페이'
    | '애플페이'
    | '엘페이'
    | '카카오페이'
    | '페이코'
    | 'SSG페이';

export interface PaymentEasyPayType {
    provider: EasyPayCodeType;
    ammount: number;
    discountAmount: number;
}

export interface PaymentFailureType {
    code: string;
    message: string;
}

export interface PaymentCashReceiptType {
    type: '소등공제' | '지출증빙' | '미발행';
    receiptKey: string;
    issueNumber: string;
    receiptUrl: string;
    amount: number;
    taxFreeAmount: number;
}

export interface IPayment {
    orderName: string | null;
    method: PaymentMethodType | null;
    totalAmount: number | null;
    status: PaymentStatusType | null;
    requestedAt: string | null;
    approvedAt: string | null;
    card: PaymentCardType | null;
    virtualAccount: PaymentVirtualAccountType | null;
    mobilePhone: PaymentMobilePhoneType | null;
    receipt: { url: string } | null;
    easyPay: PaymentEasyPayType | null;
    failure: PaymentFailureType | null;
    cashReceipt: PaymentCashReceiptType | null;
    discount: { amount: number } | null;
}

export interface IOrderedGift {
    item: IGift;
    amount: number;
    price: number;
    current_options: SelectedGiftOptionType[];
}

export interface DeliverInfoType {
    // -1:주문취소 0:입금확인중 1:상품확인중 2:포장중 3:배송중 4:배송완료
    process: number;
    corporation: {
        collection: string;
        id: string;
    };
    invoice_number: string;
    item: string[];
    completed_at: null | string;
    order_items: IOrderedGift[];
}

export interface IOrderInfo {
    _id: string;
    order_id: string;
    user_id: string;
    user_name: string;
    // total price는 포인트 금액 포함한 모든 금액이다.
    total_price: number;
    used_point: number;
    used_point_id: string[];
    address: IAddress;
    order_date: string;
    payment_date: string;
    paymentKey: string;
    method: string;
    provider: BankCodeType | EasyPayCodeType | string; //phone provider 확인
    deliver_info: DeliverInfoType[];
    cancel_info: {
        // 0 : 해당사항 없음 1:진행중 2:실패 3:완료
        process: number;
        cancel_date: string | null;
        cancel_reason: string | null;
    };
}

export interface IReport {
    question_category: number;
    question_id: string;
    question_set_num: number;
    question_title: string;
    answered_at: string | null;
}

export interface IReportData {
    answer_content: string[];
    like_count: number;
    like_yn: boolean;
    user_id: string;
    user_link_id: string;
    user: {
        age: number;
        gender: number;
        relation: string;
        inverse_relation: string;
    };
}

export interface IReportDetail {
    answers: IReportData[];
    question_type: number;
    question_category: number;
    question_title: string;
    question_options: string[] | null;
    user_answer: string[];
    like_count: number;
}

export interface AnswerStatisticType {
    answer: string;
    count: number;
}

export type WebBrowserType =
    | 'edge'
    | 'edge-chromium'
    | 'opera'
    | 'chrome'
    | 'ie'
    | 'firefox'
    | 'safari'
    | 'other';

export type MobileBrowserType = 'android' | 'ios' | 'other';

export interface TouchCoordinateType {
    x: number;
    y: number;
}
