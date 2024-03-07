import {
    CorporationType,
    CouponType,
    GiftDetailInfoType,
    IAddress,
    IGift,
    IOrderInfo,
    IPayment,
    IQnA,
    IRecommendedGift,
    IReportDetail,
    IUser,
    LinkedUserType,
    QuestionMessageType,
    RecentLinkedUserType,
    SellerType,
    ShipmentInfoType,
    UserSettingType,
} from '@Types/types';

export const dummyUserSetting: UserSettingType = {
    font_preference: 0,
    linked_oauth: {
        kakao: {
            kakao_id: null,
        },
        apple: {
            apple_id: null,
        },
    },
};
export const dummyLinkedUser: LinkedUserType = {
    invite_status: 0,
    id: null,
    user_link_id: '',
    name: null,
    birth_date: null,
    country_code: null,
    phone_number: null,
    profile_image_url: null,
    relation: '',
    linked_at: null,
};

export const dummyRecentLinkedUser: RecentLinkedUserType = {
    id: null,
    user_link_id: '',
    name: null,
    birth_date: null,
    country_code: null,
    phone_number: null,
    profile_image_url: null,
    relation: '',
    linked_at: null,
};

export const dummyUser: IUser = {
    id: '',
    name: ' ',
    birth_date: ' ',
    country_code: ' ',
    phone_number: ' ',
    gender: 0,
    profile_image_url: null,
    linked_users: [],
    recent_linked_user: dummyRecentLinkedUser,
    user_setting: dummyUserSetting,
    done_onboarding: false,
    alert: [],
    point: [],
    coupon: [],
};

export const dummyMessage: QuestionMessageType = {
    sender: '',
    message_index: -1,
    content: '',
    sent_at: '',
    deleted_at: null,
};

export const dummyQna: IQnA = {
    question: {
        _id: '',
        type: 0,
        category: 0,
        topic: 0,
        sub_topic: [],
        content: '',
        options: [],
        set_id: 0,
        question_num: 0,
        version_id: 1,
        created_at: '2022-12-28T14:17:21.595000',
        updated_at: '2022-12-28T14:17:21.595000',
        deleted_at: null,
        target_relation: [],
    },
    me: {
        answered_content: ['닭다리'],
        entertainments: [],
        answered_at: '2023-09-18T13:21:18.189000',
    },
    linked: {
        answered_content: ['닭다리'],
        entertainments: [],
        answered_at: '2023-09-18T13:21:18.189000',
    },
    arrived_at: '2023-09-07T15:34:46.869000',
    set_num: 1,
    messages: [
        {
            sender: '64f9e8e708ba2c613feb678e',
            message_index: 0,
            content: 'test',
            sent_at: '2023-09-18T13:31:50.138000',
            deleted_at: null,
        },
    ],
};

export const dummyReportDetail: IReportDetail = {
    answers: [],
    question_category: 0,
    question_title: '',
    question_options: ['', ''],
    question_type: 2,
    user_answer: [],
    like_count: 0,
};

export const dummyAddress: IAddress = {
    address_id: '',
    name: null,
    receiver: '홍길동',
    postal_code: 12345,
    main_address: '전라남도 장성군 황령면 홍길동로 431 홍길동 테마파크',
    sub_address: '1관 경비실',
    country_code: '82',
    phone_number: '01012345678',
    sub_country_code: null,
    sub_phone_number: null,
    email: 'hong@gildong.com',
    message: '',
    default: false,
};
export const dummyAddress2: IAddress = {
    address_id: 'dummy2',
    name: '본가',
    receiver: '윤경미',
    postal_code: 12345,
    main_address: '전라남도 영암군 삼호읍 녹색로 822',
    sub_address: '',
    country_code: '82',
    phone_number: '01044245191',
    sub_country_code: '82',
    sub_phone_number: '01044245151',
    email: 'email@mail.com',
    message: '부재시 연락주세요',
    default: true,
};

export const dummyOrderInfo: IOrderInfo = {
    _id: '',
    order_id: '',
    user_id: '',
    user_name: '',
    // total price는 포인트 금액 포함한 모든 금액이다.
    total_price: 0,
    used_point: 0,
    used_point_id: [],
    address: dummyAddress,
    order_date: '',
    payment_date: '',
    paymentKey: '',
    method: '',
    provider: '', //phone provider 확인
    deliver_info: [],
    cancel_info: {
        // 0 : 해당사항 없음 1:진행중 2:실패 3:완료
        process: 0,
        cancel_date: null,
        cancel_reason: null,
    },
};

export const dummyPaymentResult: IPayment = {
    orderName: null,
    method: null,
    totalAmount: null,
    status: null,
    requestedAt: null,
    approvedAt: null,
    card: null,
    virtualAccount: null,
    mobilePhone: null,
    receipt: null,
    easyPay: null,
    failure: null,
    cashReceipt: null,
    discount: null,
};

export const dummyCoupon: CouponType = {
    coupon_id: '',
    title: '',
    image_url: '',
    place: '',
    options: [],
    deployed_at: '',
    expired_at: '',
    is_used: false,
    used_at: null,
};

export const dummyShipmentInfo: ShipmentInfoType = {
    location: ' ',
    courier: ' ',
    bundled: false,
    fee: 0,
    free_threshold: 0,
    additional_fee: 0,
    additional_fee_jeju: 0,
    return_exchange_info: {
        location: ' ',
        courier: ' ',
        return_fee: 0,
        exchange_fee: 0,
        duration: 0,
        rejection_reason: [],
    },
};

export const dummyCorporation: CorporationType = {
    _id: ' ',
    name: ' ',
    store_type: 0,
    shipment_info: dummyShipmentInfo,
    after_service: {
        phone_number: ' ',
        guide: ' ',
    },
    created_at: '',
    updated_at: null,
    deleted_at: null,
};

export const dummySeller: SellerType = {
    _id: ' ',
    brand: ' ',
    brand_code: ' ',
    corporation: dummyCorporation,
    created_at: '',
    updated_at: null,
    deleted_at: null,
};

export const dummyDetailInfo: GiftDetailInfoType = {
    detail_image: [],
    manufacturer: '',
    manufactured_date: '',
    expiration_date: '',
    seller: {
        _id: 'string',
        brand: 'string',
        brand_code: '',
        corporation: dummyCorporation,
        created_at: '',
        updated_at: null,
        deleted_at: null,
    },
};

export const dummyGift: IGift = {
    _id: '',
    revision_id: null,
    type: 0,
    thumbnail_url: '',
    image_url: [],
    title: '',
    description: '',
    link: '',
    price: 0,
    retail_price: 0,
    discount_rate: 0,
    tags: [],
    options: [],
    detail_info: {
        detail_image: [''],
        manufacturer: '',
        seller: dummySeller,
        manufactured_date: null,
        expiration_date: null,
    },
    created_at: '',
    updated_at: null,
    deleted_at: null,
};

export const dummyRecommendedGift: IRecommendedGift = {
    gift: {
        _id: '',
        revision_id: null,
        type: 0,
        thumbnail_url: '',
        image_url: [],
        title: '',
        description: '',
        link: '',
        price: 0,
        retail_price: 0,
        discount_rate: 0,
        tags: [],
        options: [],
        detail_info: {
            detail_image: [],
            manufacturer: '',
            seller: dummySeller,
            manufactured_date: null,
            expiration_date: null,
        },
        created_at: '',
        updated_at: null,
        deleted_at: null,
    },
    interested: false,
};
