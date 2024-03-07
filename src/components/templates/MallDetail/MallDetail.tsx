/* eslint-disable */

import { useRequest } from '@Hooks/useRequest';
import { useRouter } from 'next/router';
import {
    MallDetailPurchaseButtonContainer,
    MallDetailCheckContainer,
    MallDetailContainer,
    MallDetailDrawerOptionContainer,
    MallDetailDrawerSelectBox,
    MallDetailDrawerSelectContainer,
    MallDetailDrawerSelectedContainer,
    MallDetailInfoContainer,
    MallDetailInfoRow,
    MallDetailMainChip,
    MallDetailMainChipContainer,
    MallDetailMainContainer,
    MallDetailMainContentContainer,
    MallDetailSlideImage,
    MallDetailSlideBox,
    MallDetailMainPriceContainer,
    MallDetailMainTitleContainer,
    MallDetailMenu,
    MallDetailMenuContainer,
    MallDetailModalButtonContainer,
    MallDetailOptionButtonBox,
    MallDetailDetailContainer,
    MallDetailPageImage,
    MallDetailPurchaseContainer,
    MallDetailQuantityContainer,
    MallDetailModalRow,
    MallDetailSumUpContainer,
    MallDetailSumUpInnerContainer,
    MallDetailDetailButtonContainer,
} from './MallDetail.styled';
import { MainLayout } from '@Organisms/MainLayout';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { useState, useEffect } from 'react';
import { Gap } from '@Styles/App.styled';
import { Text } from '@Atoms/Typography';
import HeartOutlinedIcon from '@Images/icons/heart_outlined.svg';
import HeartFilledIcon from '@Images/icons/heart_filled.svg';
import CaretDown from '@Images/icons/caret_down_white.svg';
import CaretUp from '@Images/icons/caret_up_white.svg';
import Bell from '@Images/icons/bell_filled.svg';
import { Button } from '@Atoms/Button';
import { IconButton } from '@Atoms/IconButton';
import { BottomDrawer } from '@Molecules/BottomDrawer';
import { useAsyncEffect } from '@Hooks/useAsyncEffect';
import QuantityPlusIcon from '@Images/icons/quantity_plus.svg';
import QuantityMinusIcon from '@Images/icons/quantity_minus.svg';
import QuantityEraseIcon from '@Images/icons/quantity_erase.svg';
import CheckImage from '@Images/check_mandarin.png';
import AnswerlogLogo from '@Images/answerlog_icon_logo.png';
import {
    CorporationType,
    GiftOptionDetailType,
    GiftOptionType,
    IGiftDetail,
    SelectedGiftOptionType,
    SellerType,
    ShipmentInfoType,
    StockInfoType,
} from '@Types/types';
import { BaseModal } from '@Molecules/BaseModal';
import { LoadingContainer, SpinLoader } from '@Atoms/Loading';
import { stockFinder } from '@Functions/stockFinder';
import { GRAY4, ORANGE2 } from '@Styles/colors';
import { convertTime } from '@Functions/convertTime';
import { Container } from '@Atoms/Container';
import * as ga from '../../../lib/ga/gtag';
import { useActionOnTouch } from '@Hooks/useActionOnTouch';

export type GiftDetailMenu = 'detail-page' | 'gift-information';

export type OptionDrawerTitle = '옵션 선택' | '수량 선택';

interface SelectedOptionType {
    option_name: string;
    option_detail: GiftOptionDetailType | null;
}

interface SelectedGiftType {
    options: SelectedOptionType[];
    num: number;
}

export const MallDetail = () => {
    const tempOption: SelectedGiftOptionType[] = [
        {
            option_name: '수량',
            option_detail: {
                option_value: '60포(2박스)[무료배송](+21000원)',
                option_price: 21000,
            },
        },
        {
            option_name: '색상',
            option_detail: {
                option_value: '빨강',
                option_price: 0,
            },
        },
    ];

    const tempStockInfo: StockInfoType[] = [
        {
            options: [
                {
                    option_name: '수량',
                    option_detail: {
                        option_value: '60포(2박스)(+21000원)',
                        option_price: 21000,
                    },
                },
                {
                    option_name: '색상',
                    option_detail: {
                        option_value: '파랑',
                        option_price: 0,
                    },
                },
            ],
            amount: 0,
            deleted: false,
        },
        {
            options: [
                {
                    option_name: '수량',
                    option_detail: {
                        option_value: '90포(3박스)(+38000원)',
                        option_price: 38000,
                    },
                },
                {
                    option_name: '색상',
                    option_detail: {
                        option_value: '파랑',
                        option_price: 0,
                    },
                },
            ],
            amount: 1,
            deleted: false,
        },
        {
            options: [
                {
                    option_name: '수량',
                    option_detail: {
                        option_value: '60포(2박스)(+21000원)',
                        option_price: 21000,
                    },
                },
                {
                    option_name: '색상',
                    option_detail: {
                        option_value: '빨강',
                        option_price: 0,
                    },
                },
            ],
            amount: 2,
            deleted: false,
        },
        {
            options: [
                {
                    option_name: '수량',
                    option_detail: {
                        option_value: '90포(3박스)(+38000원)',
                        option_price: 38000,
                    },
                },
                {
                    option_name: '색상',
                    option_detail: {
                        option_value: '빨강',
                        option_price: 0,
                    },
                },
            ],
            amount: 3,
            deleted: false,
        },
    ];

    const dummyShipmentInfo: ShipmentInfoType = {
        location: '',
        courier: '',
        bundled: true,
        fee: 0,
        free_threshold: 0,
        additional_fee: 0,
        additional_fee_jeju: 0,
        return_exchange_info: {
            location: '',
            courier: '',
            return_fee: 0,
            exchange_fee: 0,
            duration: 0,
            rejection_reason: [],
        },
    };

    const dummyCorporation: CorporationType = {
        _id: '',
        name: '',
        store_type: 0,
        shipment_info: dummyShipmentInfo,
        after_service: {
            phone_number: '',
            guide: '',
        },
        created_at: '',
        updated_at: null,
        deleted_at: null,
    };

    const dummySeller: SellerType = {
        _id: '',
        brand: '',
        brand_code: '',
        corporation: dummyCorporation,
        created_at: '',
        updated_at: null,
        deleted_at: null,
    };

    const dummyGift: IGiftDetail = {
        _id: '',
        revision_id: '',
        type: 0,
        thumbnail_url: '',
        image_url: [],
        title: 'test',
        description: '',
        link: '',
        price: 0,
        retail_price: 0,
        discount_rate: 0,
        tags: [],
        options: [
            {
                option_name: '수량',
                option_detail: [
                    {
                        option_value: '60포(2박스)(+21000원)',
                        option_price: 21000,
                    },
                    {
                        option_value: '90포(3박스)(+38000원)',
                        option_price: 38000,
                    },
                ],
            },
            {
                option_name: '색상',
                option_detail: [
                    {
                        option_value: '파랑',
                        option_price: 0,
                    },
                    {
                        option_value: '빨강',
                        option_price: 0,
                    },
                ],
            },
        ],
        detail_info: {
            detail_image: [''],
            manufacturer: '',
            manufactured_date: null,
            expiration_date: null,
            seller: dummySeller,
        },
        created_at: '',
        updated_at: null,
        deleted_at: null,
        interested: false,
        stock_info: tempStockInfo,
    };

    const { loading, request, error } = useRequest();
    const router = useRouter();
    const { id: giftId } = router.query;
    const { actionOnTouchEnd } = useActionOnTouch();

    const [gift, setGift] = useState<IGiftDetail>(dummyGift);
    const [seller, setSeller] = useState<SellerType>(dummySeller);
    const [shipmentInfo, setShipmentInfo] =
        useState<ShipmentInfoType>(dummyShipmentInfo);
    const [isThereOptions, setIsThereOptions] = useState(false);
    const [menu, setMenu] = useState<GiftDetailMenu>('detail-page');
    const [spreadDetailPage, setSpreadDetailPage] = useState(false);
    const [showShipmentInfoModal, setShowShipmentInfoModal] = useState(false);
    const [showExchangeInfoModal, setShowExchangeInfoModal] = useState(false);
    const [showASInfoModal, setShowASInfoModal] = useState(false);
    const [openOptionDrawer, setOpenOptionDrawer] = useState(false);
    const [optionDrawerTitle, setOptionDrawerTitle] =
        useState<OptionDrawerTitle>('옵션 선택');
    const [enableSelect, setEnableSelect] = useState<boolean[]>([]);
    const [initEnableSelect, setInitEnableSelect] = useState<boolean[]>([]);
    const [selectedOptions, setSelectedOptions] = useState<
        SelectedOptionType[]
    >([]);
    const [selectedGifts, setSelectedGifts] = useState<SelectedGiftType[]>([]);
    const [totalQuantity, setTotalQuantity] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);
    const [showBookmarkModal, setShowBookmarkModal] = useState(false);
    const [showIncartModal, setShowIncartModal] = useState(false);

    const toggleSelectHandler = (index: number) => {
        let enableSelectTemp = [...enableSelect];
        enableSelectTemp[index] = !enableSelectTemp[index];
        setEnableSelect(enableSelectTemp);
    };
    const showEachStock = (
        targetOptionDetail: GiftOptionDetailType,
        index: number,
    ) => {
        let virtualSelectedOptions: SelectedOptionType[] = [];
        selectedOptions.forEach((option, index) => {
            let objectTemp: SelectedOptionType = {
                option_name: option.option_name,
                option_detail: option.option_detail,
            };
            virtualSelectedOptions.push(objectTemp);
        });
        if (virtualSelectedOptions.length > 0) {
            virtualSelectedOptions[index].option_detail = targetOptionDetail;

            let isAllOptionsSelected = virtualSelectedOptions.every(
                (option) => option.option_detail != null,
            );
            if (isAllOptionsSelected) {
                return stockFinder(
                    gift.stock_info,
                    virtualSelectedOptions as SelectedGiftOptionType[],
                );
            } else {
                // not all selected
                return -1;
            }
        } else {
            // not selected at all
            return -2;
        }
    };

    const selectedOptionHandler = (
        selectedOptionDetail: GiftOptionDetailType,
        index: number,
    ) => {
        let selectedOptionsTemp = [...selectedOptions];
        selectedOptionsTemp[index].option_detail = selectedOptionDetail;
        setSelectedOptions(selectedOptionsTemp);
        toggleSelectHandler(index);
        let isAllOptionsSelected = selectedOptionsTemp.every(
            (option) => option.option_detail != null,
        );
        if (isAllOptionsSelected) {
            selectedGiftsHandler();
        }
    };
    const selectedGiftsHandler = () => {
        let isNotSelectedGift = selectedGifts.every((selectedGift) => {
            return selectedGift.options.some(
                (option, index) =>
                    option.option_detail !=
                    selectedOptions[index].option_detail,
            );
        });
        if (isNotSelectedGift) {
            let selectedOptionsTemp: SelectedOptionType[] = [];
            selectedOptions.forEach((option, index) => {
                selectedOptionsTemp.push({
                    option_name: option.option_name,
                    option_detail: option.option_detail,
                });
            });
            let selectedGiftToBePushed = {
                num: 1,
                options: selectedOptionsTemp,
            };
            let selectedGiftsTemp = [...selectedGifts];
            selectedGiftsTemp.push(selectedGiftToBePushed);
            setSelectedGifts(selectedGiftsTemp);
        }
        let selectedOptionsTemp = [...selectedOptions];
        selectedOptionsTemp.forEach((option, index) => {
            option.option_detail = null;
        });
        setSelectedOptions(selectedOptionsTemp);
        setEnableSelect(initEnableSelect);
    };

    const selectedGiftOptions = (index: number): SelectedGiftOptionType[] => {
        let selectedOptionsTemp: SelectedGiftOptionType[] = [];
        let selectedGiftsTemp = [...selectedGifts];
        if (selectedGiftsTemp[index].options.length > 0) {
            selectedGiftsTemp[index].options.forEach((option, index) => {
                let objectTemp: SelectedGiftOptionType = {
                    option_name: option.option_name,
                    option_detail: option.option_detail as GiftOptionDetailType,
                };
                selectedOptionsTemp.push(objectTemp);
            });
        }

        return selectedOptionsTemp;
    };

    const quantityControl = (control: number, index: number) => {
        let selectedGiftsTemp = [...selectedGifts];
        let stock = stockFinder(gift.stock_info, selectedGiftOptions(index));
        if (control < 0 || stock > selectedGiftsTemp[index].num) {
            selectedGiftsTemp[index].num += control;
            setSelectedGifts(selectedGiftsTemp);
        }
    };

    const quantityControlDelete = (index: number) => {
        if (isThereOptions) {
            let selectedGiftsTemp = [...selectedGifts];
            selectedGiftsTemp.splice(index, 1);
            setSelectedGifts(selectedGiftsTemp);
        }
    };
    const toggleMark = async () => {
        if (!giftId) return;
        const markRes = await request({
            url: `/api/gift/${giftId}/interested`,
            method: 'PUT',
            data: { mark: !gift.interested },
        });
        if (!markRes) return;
        gift.interested = !gift.interested;
        setGift({ ...gift });
        if (gift.interested) {
            ga.event({
                action: 'mark_gift_interested',
                params: {
                    item_id: gift._id,
                    item_name: gift.title,
                },
            });
            setShowBookmarkModal(true);
        } else {
            ga.event({
                action: 'unmark_gift_interested',
                params: {
                    item_id: gift._id,
                    item_name: gift.title,
                },
            });
        }
    };

    // log 'view_item' event
    useEffect(() => {
        if (gift === dummyGift) return;
        ga.event({
            action: 'view_item',
            params: {
                currency: 'KRW',
                value: gift.price,
                items: [
                    {
                        item_id: gift._id,
                        item_name: gift.title,
                        item_brand: gift.detail_info.manufacturer,
                        price: gift.discount_rate
                            ? gift.retail_price
                            : gift.price,
                        discount: gift.discount_rate
                            ? gift.retail_price - gift.price
                            : 0,
                    },
                ],
            },
        });
    }, [gift]);

    const checkBookmarkedGiftDirectly = () => {
        setShowBookmarkModal(false);
        router.push('/mall/?show=interested');
    };

    const sendToCart = async () => {
        if (!giftId) return;
        const sendToCartRes = await request({
            url: `/api/user/${giftId}/insert_cart`,
            method: 'PUT',
            data: selectedGifts,
        });
        if (sendToCartRes) {
            ga.event({
                action: 'add_to_cart',
                params: {
                    currency: 'KRW',
                    value: totalPrice,
                    items: [
                        {
                            item_id: gift._id,
                            item_name: gift.title,
                            item_brand: gift.detail_info.manufacturer,
                            price: gift.discount_rate
                                ? gift.retail_price
                                : gift.price,
                            discount: gift.discount_rate
                                ? gift.retail_price - gift.price
                                : 0,
                            quantity: totalQuantity,
                        },
                    ],
                },
            });
            setOpenOptionDrawer(false);
            setShowIncartModal(true);
        } else {
            console.log(error);
        }
    };
    const keepShopping = () => {
        if (isThereOptions) {
            setSelectedGifts([]);
        } else {
            let selectedGiftToBePushed = [
                {
                    num: 1,
                    options: [],
                },
            ];
            setSelectedGifts(selectedGiftToBePushed);
        }
        setShowIncartModal(false);
    };

    const goToCart = () => {
        setShowIncartModal(false);
        router.push('/mall/?show=cart');
    };

    const purchaseNow = async () => {
        if (!giftId) return;
        const resPurchaseNow = await request({
            url: `/api/user/${giftId}/direct_purchase`,
            method: 'POST',
            data: selectedGifts,
        });
        if (resPurchaseNow) {
            ga.event({
                action: 'begin_checkout',
                params: {
                    currency: 'KRW',
                    value: totalPrice,
                    items: [
                        {
                            item_id: gift._id,
                            item_name: gift.title,
                            item_brand: gift.detail_info.manufacturer,
                            price: gift.discount_rate
                                ? gift.retail_price
                                : gift.price,
                            discount: gift.discount_rate
                                ? gift.retail_price - gift.price
                                : 0,
                            quantity: totalQuantity,
                        },
                    ],
                },
            });
            router.push('/purchase');
        }
    };

    useEffect(() => {
        let totalQuantityTemp = 0;
        let totalPriceTemp = 0;
        selectedGifts.forEach((selectedGift, index) => {
            let optionalPrice = 0;
            selectedGift.options.forEach((option, i) => {
                optionalPrice += option.option_detail?.option_price || 0;
            });
            totalQuantityTemp += selectedGift.num;
            totalPriceTemp +=
                selectedGift.num * ((gift.price || 0) + optionalPrice);
        });
        setTotalQuantity(totalQuantityTemp);
        setTotalPrice(totalPriceTemp);
    }, [selectedGifts]);

    useEffect(() => {
        selectedGifts.length > 0
            ? setOptionDrawerTitle('수량 선택')
            : setOptionDrawerTitle('옵션 선택');
    }, [selectedGifts]);

    // 옵션 지정하기
    useEffect(() => {
        setSeller(gift.detail_info.seller);
        setShipmentInfo(gift.detail_info.seller?.corporation?.shipment_info);
        if (gift.options.length > 0) {
            // 옵션 있는 상품
            setIsThereOptions(true);

            let selectedOptionsTemp: SelectedOptionType[] = [];
            let enableSelectTemp: boolean[] = [];
            gift.options.forEach((option: GiftOptionType, index: number) => {
                let optionTemplate = {
                    option_name: option.option_name,
                    option_detail: null,
                };
                selectedOptionsTemp.push(optionTemplate);
                enableSelectTemp.push(false);
            });
            setSelectedOptions(selectedOptionsTemp);
            setEnableSelect(enableSelectTemp);
            setInitEnableSelect(enableSelectTemp);
        } else {
            // 옵션 없는 상품
            setIsThereOptions(false);
            let selectedGiftToBePushed = [
                {
                    num: 1,
                    options: [],
                },
            ];
            setSelectedGifts(selectedGiftToBePushed);
        }
    }, [gift]);

    useAsyncEffect(async () => {
        if (!giftId) return;
        const giftRes = await request({
            url: `/api/gift/${giftId}`,
            method: 'GET',
        });
        if (giftRes) {
            console.log(giftRes.data);
            let giftTemp: IGiftDetail = { ...giftRes.data };
            giftTemp.stock_info = giftTemp.stock_info.filter(
                (stock) => !stock.deleted,
            );
            setGift(giftTemp);
        }
    }, [giftId]);

    // test용 dummy data
    // useAsyncEffect(async () => {
    //     const giftRes = await request({
    //         url: `/api/gift/${id}`,
    //         method: 'GET',
    //     });
    //     // 옵션 지정하기
    //     if (giftRes) {
    //         setGift(dummyGift);
    //         if (dummyGift.options.length > 0) {
    //             // 옵션 있는 상품
    //             setIsThereOptions(true);

    //             let selectedOptionsTemp: SelectedOptionType[] = [];
    //             let enableSelectTemp: boolean[] = [];
    //             dummyGift.options.forEach(
    //                 (option: GiftOptionType, index: number) => {
    //                     let optionTemplate = {
    //                         option_name: option.option_name,
    //                         option_detail: null,
    //                     };
    //                     selectedOptionsTemp.push(optionTemplate);
    //                     enableSelectTemp.push(false);
    //                 },
    //             );
    //             setSelectedOptions(selectedOptionsTemp);
    //             setEnableSelect(enableSelectTemp);
    //             setInitEnableSelect(enableSelectTemp);

    //             let stocksTemp: number[] = [];
    //             dummyGift.options.forEach(
    //                 (option: GiftOptionType, index: number) => {
    //                     let count = 0;
    //                 },
    //             );
    //         } else {
    //             // 옵션 없는 상품
    //             setIsThereOptions(false);
    //             let selectedGiftToBePushed = [
    //                 {
    //                     num: 1,
    //                     options: [],
    //                 },
    //             ];
    //             setSelectedGifts(selectedGiftToBePushed);
    //         }
    //         let stockSumTemp: number = 0;
    //         dummyGift.stock_info.forEach((info, index) => {
    //             stockSumTemp += info.amount;
    //         });
    //         setStockSum(stockSumTemp);
    //     }
    // }, [id]);

    return (
        <MainLayout hideBottomNav>
            {loading && gift.title === '' ? (
                <LoadingContainer>
                    <SpinLoader />
                </LoadingContainer>
            ) : (
                <MallDetailContainer>
                    <MallDetailMainContainer>
                        <MallDetailMainTitleContainer>
                            <Text size="h1">{gift.title}</Text>
                            <Gap height="8px" />
                            <MallDetailMainPriceContainer>
                                {gift.discount_rate !== 0 && (
                                    <Text
                                        size="h2"
                                        color="gray3"
                                        textDecoration="line-through"
                                    >
                                        {gift.retail_price.toLocaleString()}

                                        <Gap width="8px" />
                                    </Text>
                                )}
                                <Text size="h2">
                                    {gift.price.toLocaleString()} 원
                                </Text>
                                <Gap width="8px" />
                                {gift.discount_rate !== 0 && (
                                    <Text size="h2" color="orange2">
                                        {gift.discount_rate}%
                                    </Text>
                                )}
                            </MallDetailMainPriceContainer>
                        </MallDetailMainTitleContainer>
                        <Gap height="16px" />
                        <MallDetailSlideBox>
                            <Swiper
                                modules={[Pagination]}
                                slidesPerView={1}
                                pagination
                            >
                                {gift.image_url.map((image, index) => (
                                    <SwiperSlide key={image}>
                                        <MallDetailSlideImage
                                            backgroundUrl={image}
                                        />
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </MallDetailSlideBox>
                        <MallDetailMainContentContainer>
                            <MallDetailMainChipContainer>
                                {gift.tags.map((tag, index) => (
                                    <MallDetailMainChip key={tag}>
                                        <Text color="orange2" size="b2">
                                            {tag}
                                        </Text>
                                    </MallDetailMainChip>
                                ))}
                            </MallDetailMainChipContainer>
                            <Gap height="12px" />
                            <Text color="gray4">{gift.description}</Text>
                        </MallDetailMainContentContainer>
                    </MallDetailMainContainer>
                    <Gap height="16px" />
                    <MallDetailMenuContainer>
                        <MallDetailMenu
                            selected={menu === 'detail-page'}
                            onClick={() => setMenu('detail-page')}
                            onTouchEnd={(e) =>
                                actionOnTouchEnd(e, () =>
                                    setMenu('detail-page'),
                                )
                            }
                        >
                            <Text>상세설명</Text>
                        </MallDetailMenu>
                        <MallDetailMenu
                            selected={menu === 'gift-information'}
                            onClick={() => setMenu('gift-information')}
                            onTouchEnd={(e) =>
                                actionOnTouchEnd(e, () =>
                                    setMenu('gift-information'),
                                )
                            }
                        >
                            <Text>상품정보</Text>
                        </MallDetailMenu>
                    </MallDetailMenuContainer>
                    <Gap height="16px" />
                    {menu === 'detail-page' && (
                        <MallDetailDetailContainer
                            spreadDetailPage={spreadDetailPage}
                        >
                            {gift.detail_info.detail_image.map(
                                (image, index) => (
                                    <MallDetailPageImage
                                        key={index}
                                        src={image}
                                        alt={`deatail-image-${index}`}
                                    />
                                ),
                            )}
                            <MallDetailDetailButtonContainer
                                spreadDetailPage={spreadDetailPage}
                            >
                                <Button
                                    height="48px"
                                    onClickButton={() =>
                                        setSpreadDetailPage(!spreadDetailPage)
                                    }
                                    color="gray-border"
                                >
                                    {spreadDetailPage
                                        ? '상품 상세 설명 접기'
                                        : '상품 상세 설명 펼치기'}
                                </Button>
                            </MallDetailDetailButtonContainer>
                        </MallDetailDetailContainer>
                    )}
                    {menu === 'gift-information' && (
                        <MallDetailInfoContainer>
                            <MallDetailInfoRow>
                                <Text color="gray3">상품명</Text>
                                <Text>{gift.title}</Text>
                            </MallDetailInfoRow>
                            <Gap height="10px" />
                            <MallDetailInfoRow>
                                <Text color="gray3">브랜드</Text>
                                <Text>{seller?.brand || ''}</Text>
                            </MallDetailInfoRow>
                            <Gap height="10px" />
                            <MallDetailInfoRow>
                                <Text color="gray3">제조사</Text>
                                <Text>
                                    {gift.detail_info.manufacturer ||
                                        seller?.brand ||
                                        ''}
                                </Text>
                            </MallDetailInfoRow>
                            <Gap height="10px" />
                            <MallDetailInfoRow>
                                <Text color="gray3">제조일자</Text>
                                <Text>
                                    {gift.detail_info.manufactured_date
                                        ? convertTime(
                                              gift.detail_info
                                                  .manufactured_date,
                                              'date',
                                          )
                                        : '상품 상세 설명 참조'}
                                </Text>
                            </MallDetailInfoRow>
                            <Gap height="10px" />
                            <MallDetailInfoRow>
                                <Text color="gray3">유효일자</Text>
                                <Text>
                                    {gift.detail_info.expiration_date
                                        ? convertTime(
                                              gift.detail_info.expiration_date,
                                              'date',
                                          )
                                        : '상품 상세 설명 참조'}
                                </Text>
                            </MallDetailInfoRow>
                            <Gap height="10px" />
                            <MallDetailInfoRow>
                                <Text color="gray3">
                                    상품 정보
                                    <br />
                                    제공 고시
                                </Text>
                                <Text>상품 상세 설명 참조</Text>
                            </MallDetailInfoRow>
                            <Gap height="36px" />
                            <MallDetailInfoRow>
                                <Text color="gray3">배송 정보</Text>
                                <Text
                                    color="orange2"
                                    onClick={() =>
                                        setShowShipmentInfoModal(true)
                                    }
                                    onTouchEnd={(e) =>
                                        actionOnTouchEnd(e, () =>
                                            setShowShipmentInfoModal(true),
                                        )
                                    }
                                >
                                    배송 정보 보기
                                </Text>
                            </MallDetailInfoRow>
                            <Gap height="10px" />
                            <MallDetailInfoRow>
                                <Text color="gray3">교환 및 환불</Text>
                                <Text
                                    color="orange2"
                                    onClick={() =>
                                        setShowExchangeInfoModal(true)
                                    }
                                    onTouchEnd={(e) =>
                                        actionOnTouchEnd(e, () =>
                                            setShowExchangeInfoModal(true),
                                        )
                                    }
                                >
                                    정책 보기
                                </Text>
                            </MallDetailInfoRow>
                            <Gap height="10px" />
                            <MallDetailInfoRow>
                                <Text color="gray3">AS 안내</Text>
                                <Text
                                    color="orange2"
                                    onClick={() => setShowASInfoModal(true)}
                                    onTouchEnd={(e) =>
                                        actionOnTouchEnd(e, () =>
                                            setShowASInfoModal(true),
                                        )
                                    }
                                >
                                    정책 보기
                                </Text>
                            </MallDetailInfoRow>
                        </MallDetailInfoContainer>
                    )}
                    <MallDetailPurchaseButtonContainer>
                        <IconButton width="48px" onClickButton={toggleMark}>
                            {gift.interested ? (
                                <HeartFilledIcon
                                    color={ORANGE2}
                                    width="28px"
                                    height="28px"
                                />
                            ) : (
                                <HeartOutlinedIcon
                                    color={ORANGE2}
                                    width="28px"
                                    height="28px"
                                />
                            )}
                        </IconButton>
                        {stockFinder(gift.stock_info) === 0 ? (
                            <Button height="48px" color="white-border">
                                <Bell color={GRAY4} />
                                <Gap width="8px" />
                                재고가 소진되었어요
                            </Button>
                        ) : (
                            <Button
                                height="48px"
                                onClickButton={() => setOpenOptionDrawer(true)}
                            >
                                구매하기
                            </Button>
                        )}
                    </MallDetailPurchaseButtonContainer>
                </MallDetailContainer>
            )}

            <BottomDrawer
                show={openOptionDrawer}
                onClose={() => setOpenOptionDrawer(false)}
                closeOnClickOutside={true}
                title={optionDrawerTitle}
            >
                {optionDrawerTitle === '옵션 선택' ? (
                    <Text>상품을 선택해주세요</Text>
                ) : null}
                <Gap height="16px" />
                {gift.options.map((option, i) => (
                    <MallDetailDrawerOptionContainer
                        key={`${option.option_name}_${option.option_detail.map(
                            (detail, j) => detail.option_value,
                        )}`}
                        enableSelect={enableSelect[i]}
                    >
                        <MallDetailOptionButtonBox
                            onClick={() => toggleSelectHandler(i)}
                            onTouchEnd={(e) =>
                                actionOnTouchEnd(e, () =>
                                    toggleSelectHandler(i),
                                )
                            }
                        >
                            <Text>
                                {option.option_name}
                                {selectedOptions[i]?.option_detail
                                    ?.option_value &&
                                    ` - ${selectedOptions[i].option_detail?.option_value}`}
                                {selectedOptions[i]?.option_detail
                                    ?.option_price !== (0 || undefined) &&
                                    `(+${selectedOptions[
                                        i
                                    ].option_detail?.option_price.toLocaleString()} 원)`}
                            </Text>
                            {enableSelect[i] ? <CaretUp /> : <CaretDown />}
                        </MallDetailOptionButtonBox>
                        <MallDetailDrawerSelectContainer
                            enableSelect={enableSelect[i]}
                        >
                            {option.option_detail.map((detail, j) =>
                                showEachStock(detail, i) > 0 ? (
                                    <MallDetailDrawerSelectBox
                                        key={`drawer_select_${detail.option_value}`}
                                        onClick={() =>
                                            selectedOptionHandler(detail, i)
                                        }
                                        onTouchEnd={(e) =>
                                            actionOnTouchEnd(e, () =>
                                                selectedOptionHandler(
                                                    detail,
                                                    i,
                                                ),
                                            )
                                        }
                                    >
                                        <Text>
                                            {detail.option_value}
                                            {detail.option_price !== 0 &&
                                                `(+${detail.option_price.toLocaleString()} 원)`}
                                        </Text>
                                    </MallDetailDrawerSelectBox>
                                ) : (
                                    <MallDetailDrawerSelectBox
                                        key={`drawer_select_${detail.option_value}`}
                                    >
                                        <Text color="gray4">
                                            {detail.option_value} (품절)
                                        </Text>
                                    </MallDetailDrawerSelectBox>
                                ),
                            )}
                        </MallDetailDrawerSelectContainer>
                    </MallDetailDrawerOptionContainer>
                ))}
                <Gap height="8px" />
                {selectedGifts.length > 0 &&
                    selectedGifts.map((selectedGift, i) => (
                        <MallDetailDrawerSelectedContainer
                            key={`drawer_selected_${i}`}
                        >
                            <Text>
                                {isThereOptions
                                    ? selectedGift.options.map((option, j) =>
                                          option.option_detail &&
                                          option.option_detail?.option_price !==
                                              0
                                              ? `${option.option_detail
                                                    ?.option_value}(+${option.option_detail?.option_price.toLocaleString()} 원)`
                                              : option.option_detail
                                                    ?.option_value,
                                      )
                                    : '옵션 없음'}
                            </Text>
                            <MallDetailQuantityContainer>
                                {selectedGift.num > 1 ? (
                                    <Button
                                        width="20px"
                                        height="20px"
                                        color="black"
                                        onClickButton={() =>
                                            quantityControl(-1, i)
                                        }
                                    >
                                        <QuantityMinusIcon
                                            width="20px"
                                            height="20px"
                                        />
                                    </Button>
                                ) : (
                                    <Button
                                        width="20px"
                                        height="20px"
                                        color="white"
                                        onClickButton={() =>
                                            quantityControlDelete(i)
                                        }
                                    >
                                        <QuantityEraseIcon
                                            width="14px"
                                            height="14px"
                                        />
                                    </Button>
                                )}
                                <Text>{selectedGift.num}</Text>
                                {stockFinder(
                                    gift.stock_info,
                                    selectedGiftOptions(i),
                                ) > selectedGift.num ? (
                                    <Button
                                        width="20px"
                                        height="20px"
                                        color="white"
                                        onClickButton={() =>
                                            quantityControl(1, i)
                                        }
                                    >
                                        <QuantityPlusIcon
                                            width="20px"
                                            height="20px"
                                        />
                                    </Button>
                                ) : (
                                    <Button
                                        width="20px"
                                        height="20px"
                                        disabled
                                    />
                                )}
                            </MallDetailQuantityContainer>
                        </MallDetailDrawerSelectedContainer>
                    ))}
                <Gap height="16px" />
                <MallDetailSumUpContainer>
                    <MallDetailSumUpInnerContainer>
                        <Text>총 수량</Text>
                        <Gap width="4px" />
                        <Text color="orange2"> {totalQuantity}</Text>
                        <Text>개</Text>
                    </MallDetailSumUpInnerContainer>
                    <MallDetailSumUpInnerContainer>
                        <Text>총 금액 </Text>
                        <Gap width="4px" />
                        <Text color="orange2">
                            {totalPrice.toLocaleString()}원
                        </Text>
                    </MallDetailSumUpInnerContainer>
                </MallDetailSumUpContainer>
                <Gap height="16px" />
                <MallDetailPurchaseContainer>
                    <Button
                        height="48px"
                        color="gray"
                        disabled={totalPrice === 0}
                        onClickButton={sendToCart}
                    >
                        장바구니 담기
                    </Button>
                    <Gap width="8px" />
                    <Button
                        height="48px"
                        disabled={totalPrice === 0}
                        onClickButton={purchaseNow}
                    >
                        바로 구매하기
                    </Button>
                </MallDetailPurchaseContainer>
            </BottomDrawer>
            <BaseModal
                title="배송 정보"
                show={showShipmentInfoModal}
                onClose={() => setShowShipmentInfoModal(false)}
                closeOnClickOutside
                hideImage
            >
                <Container>
                    <MallDetailModalRow>
                        <Text color="gray3">택배사</Text>
                        <Text>{shipmentInfo?.courier}</Text>
                    </MallDetailModalRow>
                    <Gap height="10px" />
                    <MallDetailModalRow>
                        <Text color="gray3">배송비</Text>
                        <Text>
                            {shipmentInfo?.fee.toLocaleString()}원
                            <br />
                            <Text size="b2" color="gray3">
                                *{' '}
                                {shipmentInfo?.free_threshold.toLocaleString()}
                                원 이상 구매시 무료
                            </Text>
                        </Text>
                    </MallDetailModalRow>
                    <Gap height="10px" />
                    <MallDetailModalRow>
                        <Text color="gray3">도서산간지역</Text>
                        {shipmentInfo?.additional_fee ===
                        shipmentInfo?.additional_fee_jeju ? (
                            <Text>
                                {shipmentInfo?.additional_fee.toLocaleString()}
                                원 추가
                            </Text>
                        ) : (
                            <Text>
                                {shipmentInfo?.additional_fee.toLocaleString()}
                                원 추가(제주 :{' '}
                                {shipmentInfo?.additional_fee_jeju.toLocaleString()}
                                원)
                            </Text>
                        )}
                    </MallDetailModalRow>
                    <Gap height="10px" />
                    <MallDetailModalRow>
                        <Text color="gray3">묶음 배송</Text>
                        <Text>
                            {shipmentInfo?.bundled ? '가능' : '묶음배송 불가'}
                        </Text>
                    </MallDetailModalRow>
                </Container>
                <Gap height="32px" />
                <Button
                    height="48px"
                    onClickButton={() => setShowShipmentInfoModal(false)}
                >
                    확인
                </Button>
            </BaseModal>
            <BaseModal
                title="환불 및 교환 정책"
                show={showExchangeInfoModal}
                onClose={() => setShowExchangeInfoModal(false)}
                closeOnClickOutside
                hideImage
            >
                <Container>
                    <MallDetailModalRow>
                        <Text color="gray3">반품 및 교환지</Text>
                        <Text>
                            {shipmentInfo?.return_exchange_info.location}(
                            {shipmentInfo?.return_exchange_info.courier})
                        </Text>
                    </MallDetailModalRow>
                    <Gap height="10px" />
                    <MallDetailModalRow>
                        <Text color="gray3">반품 배송비(편도)</Text>
                        <Text>
                            {shipmentInfo?.return_exchange_info.return_fee.toLocaleString()}
                            원
                        </Text>
                    </MallDetailModalRow>
                    <Gap height="10px" />
                    <MallDetailModalRow>
                        <Text color="gray3">교환 배송비(왕복)</Text>
                        <Text>
                            {shipmentInfo?.return_exchange_info.exchange_fee.toLocaleString()}
                            원
                        </Text>
                    </MallDetailModalRow>
                    <Gap height="10px" />
                    <MallDetailModalRow>
                        <Text color="gray3">기간</Text>
                        <Text>
                            구매 후{' '}
                            {shipmentInfo?.return_exchange_info.duration.toLocaleString()}
                            일
                        </Text>
                    </MallDetailModalRow>
                    <Gap height="10px" />
                    <MallDetailModalRow>
                        <Text color="gray3">불가 사유</Text>
                        <Container>
                            {shipmentInfo?.return_exchange_info.rejection_reason.map(
                                (reason, index) => (
                                    <Text key={reason}>
                                        {reason}
                                        <br />
                                    </Text>
                                ),
                            )}
                        </Container>
                    </MallDetailModalRow>
                </Container>
                <Gap height="32px" />
                <Button
                    height="48px"
                    onClickButton={() => setShowExchangeInfoModal(false)}
                >
                    확인
                </Button>
            </BaseModal>
            <BaseModal
                title="AS 안내"
                show={showASInfoModal}
                onClose={() => setShowASInfoModal(false)}
                closeOnClickOutside
                customImage={AnswerlogLogo}
            >
                <Container>
                    <Text>
                        {seller?.corporation?.after_service?.guide || ''}
                    </Text>
                    <Gap height="32px" />
                    <MallDetailModalButtonContainer>
                        <Button
                            height="48px"
                            color="gray"
                            onClickButton={() =>
                                router.push(
                                    'https://pf.kakao.com/_nxeBrxj/chat',
                                )
                            }
                        >
                            문의하기
                        </Button>
                        <Gap width="8px" />
                        <Button
                            onClickButton={() => setShowASInfoModal(false)}
                            height="48px"
                        >
                            닫기
                        </Button>
                    </MallDetailModalButtonContainer>
                </Container>
            </BaseModal>
            <BaseModal
                show={showBookmarkModal}
                onClose={() => setShowBookmarkModal(false)}
                closeOnClickOutside
                customImage={CheckImage}
            >
                <MallDetailCheckContainer>
                    <Text>&quot;{gift.title}&quot;</Text>
                    <Gap height="8px" />
                    <Text size="b2">상품을 관심 선물에 저장했어요</Text>
                    <Gap height="32px" />
                    <MallDetailModalButtonContainer>
                        <Button
                            onClickButton={() => setShowBookmarkModal(false)}
                            height="48px"
                            color="gray"
                        >
                            닫기
                        </Button>
                        <Gap width="8px" />
                        <Button
                            height="48px"
                            onClickButton={checkBookmarkedGiftDirectly}
                        >
                            확인하기
                        </Button>
                    </MallDetailModalButtonContainer>
                </MallDetailCheckContainer>
            </BaseModal>
            <BaseModal
                show={showIncartModal}
                onClose={() => setShowIncartModal(false)}
                closeOnClickOutside
                customImage={CheckImage}
            >
                <MallDetailCheckContainer>
                    <Text>&quot;{gift.title}&quot;</Text>
                    <Gap height="8px" />
                    <Text size="b2">상품을 장바구니에 저장했어요</Text>
                    <Gap height="32px" />
                    <MallDetailModalButtonContainer>
                        <Button
                            onClickButton={keepShopping}
                            height="48px"
                            color="gray"
                        >
                            계속 쇼핑하기
                        </Button>
                        <Gap width="8px" />
                        <Button height="48px" onClickButton={goToCart}>
                            장바구니 확인
                        </Button>
                    </MallDetailModalButtonContainer>
                </MallDetailCheckContainer>
            </BaseModal>
        </MainLayout>
    );
};
