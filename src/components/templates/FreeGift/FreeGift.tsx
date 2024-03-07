import { MainLayout } from '@Organisms/MainLayout';
import { useRouter } from 'next/router';
import {
    FreeGiftContainer,
    FreeGiftExclamationIcon,
    FreeGiftGiftCardContainer,
    FreeGiftDetailImageContainer,
    FreeGiftNoRefundContainer,
    FreeGiftSpreadButtonBox,
} from './FreeGift.styled';
import { WideSection } from '@Molecules/WideSection';
import { useContext, useEffect, useState } from 'react';
import { MenuSelector } from '@Molecules/MenuSelector';
import { Gap } from '@Styles/App.styled';
import {
    IAddress,
    IGift,
    IOrderInfo,
    SelectedGiftOptionType,
} from '@Types/types';
import {
    dummyAddress,
    dummyAddress2,
    dummyGift,
} from '@Constants/dummyObjects';
import { useAsyncEffect } from '@Hooks/useAsyncEffect';
import { useRequest } from '@Hooks/useRequest';
import { AppContext } from '@Pages/_app';
import { GiftCard } from '@Organisms/GiftCard';
import { Button } from '@Atoms/Button';
import { Text } from '@Atoms/Typography';
import { WHITE } from '@Styles/colors';
import { LoadingContainer, SpinLoader } from '@Atoms/Loading';
import { BaseModal } from '@Molecules/BaseModal';
import Image from 'next/image';
import { AddressSelector } from '@Organisms/AddressSelector';
import { RadioValue } from '@Atoms/Radio';
import { nanoid } from 'nanoid';
import { convertTime } from '@Functions/convertTime';
import { ResUseCouponType } from '@Templates/Coupon/Coupon';
import { useFlutter } from '@Hooks/useFlutter';
import ExclamationImage from '@Images/exclamation_mandarin.png';

interface ReqOrderType {
    order_id: string;
    total_price: number;
    used_point: number;
    address: IAddress;
    // order_items: {
    //     gift_id: string;
    //     amount: number;
    //     price: number;
    //     current_options: SelectedGiftOptionType[];
    // }[];
}

interface ReqChooseOneTypeEach {
    num: number;
    options: SelectedGiftOptionType[];
}

export const FreeGift = () => {
    const router = useRouter();
    const { request, loading } = useRequest();
    const { gift: giftIdFromQuery, coupon_id: CouponIdFromQuery } =
        router.query;
    const { isInitiated, textSizePref } = useContext(AppContext);
    const { openExternalBrowser } = useFlutter();

    const [freeGifts, setFreeGifts] = useState<IGift[]>([]);
    const [selectedGift, setSelectedGift] = useState<IGift>(dummyGift);
    const [freeGiftTitles, setFreeGiftTitles] = useState<string[]>([]);
    const [selectedGiftTitle, setSelectedGiftTitle] = useState(dummyGift.title);
    const [showDetailInfoModal, setShowDetailInfoModal] = useState(false);
    const [spreadDetailImage, setSpreadDetailImage] = useState(false);
    const [savedAddresses, setSavedAddresses] = useState<IAddress[]>([]);
    const [finalAddress, setFinalAddress] = useState<IAddress>(dummyAddress);
    const [disableOrderButton, setDisableOrderButton] = useState(false);
    const [showInvalidCouponModal, setShowInvalidCouponModal] = useState(false);

    // get gifts from url query
    useAsyncEffect(async () => {
        if (!giftIdFromQuery || giftIdFromQuery.length === 0) return;
        let giftIds: string[] = [];
        if (typeof giftIdFromQuery === 'string') {
            giftIds = [giftIdFromQuery];
        } else {
            giftIds = giftIdFromQuery;
        }
        let freeGiftsTemp: IGift[] = [];
        let freeGiftTitlesTemp: string[] = [];
        const resGifts = await Promise.all(
            giftIds.map((giftId, index) =>
                request({
                    url: `/api/gift/${giftId}`,
                    method: 'GET',
                }),
            ),
        );
        resGifts.forEach((res, index) => {
            if (!res) return;
            const gift: IGift = res.data;
            if (index === 0) {
                setSelectedGift(gift);
                setSelectedGiftTitle(gift.title);
            }
            freeGiftsTemp.push(gift);
            freeGiftTitlesTemp.push(gift.title);
        });
        setFreeGifts(freeGiftsTemp);
        setFreeGiftTitles(freeGiftTitlesTemp);
    }, [giftIdFromQuery]);

    // get saved addresses
    useAsyncEffect(async () => {
        const resAddress = await request({
            url: `/api/user/address`,
            method: 'GET',
        });
        if (resAddress) {
            // console.log(resAddress.data);
            setSavedAddresses(resAddress.data);
        }
    }, []);

    // change selectedGift when menu selector clicked
    useEffect(() => {
        if (freeGifts.length !== freeGiftTitles.length) return;
        let selectedGiftTemp = freeGifts.find(
            (gift) => gift.title === selectedGiftTitle,
        );
        if (selectedGiftTemp) {
            setSelectedGift(selectedGiftTemp);
        }
    }, [selectedGiftTitle]);

    // unspread detail image
    useEffect(() => {
        if (!showDetailInfoModal) setSpreadDetailImage(false);
    }, [showDetailInfoModal]);

    // disable order button
    useEffect(() => {
        setDisableOrderButton(
            !selectedGift._id ||
                !finalAddress.receiver ||
                !finalAddress.postal_code ||
                !finalAddress.main_address ||
                !finalAddress.country_code ||
                !finalAddress.phone_number ||
                !finalAddress.email,
        );
    }, [selectedGift, finalAddress]);

    const finalOrder = async () => {
        console.log(finalAddress);
        const reqChooseOne: ReqChooseOneTypeEach[] = [
            // 나중에 옵션 있는 상품도 사은품으로 나오면 바꿔야 함
            {
                num: 1,
                options: [],
            },
        ];
        const resChooseOne = await request({
            url: `/api/user/${selectedGift._id}/direct_purchase`,
            method: 'POST',
            data: reqChooseOne,
        });
        if (resChooseOne) {
            const orderId = convertTime(new Date(), 'yymmdd') + nanoid(6);
            const reqOrder: ReqOrderType = {
                order_id: orderId,
                total_price: 0,
                used_point: 0,
                address: finalAddress,
            };
            const resOrder = await request({
                url: `api/order`,
                method: 'POST',
                data: reqOrder,
            });

            if (resOrder) {
                const resUseCoupon = await request({
                    url: `/api/user/use_coupon`,
                    method: 'PUT',
                    data: {
                        coupon_id: CouponIdFromQuery,
                        // 임시로 1234
                        password: '1234',
                    },
                });
                if (resUseCoupon) {
                    const resUse: ResUseCouponType = resUseCoupon.data;
                    if (!resUse.is_failed) {
                        const orderInfo: IOrderInfo = resOrder.data;
                        const {
                            paymentKey,
                            order_id: orderId,
                            total_price: totalPaidPrice,
                        } = orderInfo;
                        window.location.href = `/success-purchase?paymentType=ALLCOUPON&orderId=${orderId}&paymentKey=${paymentKey}&amount=0`;
                    } else {
                        switch (resUse.failure_reason) {
                            case 'INVALID COUPON ID':
                            default:
                                console.log('invalid information');
                                break;
                            case 'WRONG COUPON PASSWORD':
                                console.log('invalid information');
                                break;
                            case 'EXPIRED COUPON':
                                // 만기되면 막아놔서 괜찮다.
                                console.log('invalid information');
                                break;
                        }
                        const resOrderCancel = await request({
                            url: `/api/order/${orderId}`,
                            method: 'DELETE',
                        });
                        setShowInvalidCouponModal(true);
                    }
                } else {
                    // 기타 오류
                    console.log('invalid information');
                    const resOrderCancel = await request({
                        url: `/api/order/${orderId}`,
                        method: 'DELETE',
                    });
                    setShowInvalidCouponModal(true);
                }
            }
        }
    };

    return (
        <MainLayout title="사은품 배송" hideBottomNav>
            {!isInitiated || loading ? (
                <LoadingContainer>
                    <SpinLoader />
                </LoadingContainer>
            ) : (
                <FreeGiftContainer>
                    <WideSection title="상품 선택">
                        <MenuSelector
                            menus={freeGiftTitles}
                            selectedMenu={selectedGiftTitle}
                            setSelectedMenu={setSelectedGiftTitle}
                        />
                        <Gap height="16px" />
                        <FreeGiftGiftCardContainer>
                            <GiftCard gift={selectedGift} showTitle showPrice />
                            <Gap height="16px" />
                            <Button
                                onClickButton={() =>
                                    setShowDetailInfoModal(true)
                                }
                            >
                                상품 상세 정보 보기
                            </Button>
                            <Gap height="16px" />
                            <FreeGiftNoRefundContainer>
                                <FreeGiftExclamationIcon
                                    textSizePref={textSizePref}
                                >
                                    <Text color="white" size="c1">
                                        !
                                    </Text>
                                </FreeGiftExclamationIcon>
                                <Gap width="4px" />
                                <Text size="b2">
                                    주문하신 사은품은 교환/취소가 불가능합니다
                                </Text>
                            </FreeGiftNoRefundContainer>
                        </FreeGiftGiftCardContainer>
                    </WideSection>
                    <Gap height="22px" />
                    <WideSection title="배송 정보">
                        <AddressSelector
                            savedAddresses={savedAddresses}
                            setFinalAddress={setFinalAddress}
                        />
                    </WideSection>
                    <Gap height="22px" />
                    <WideSection>
                        <Button
                            disabled={disableOrderButton}
                            onClickButton={() => finalOrder()}
                        >
                            배송 요청하기
                        </Button>
                    </WideSection>
                </FreeGiftContainer>
            )}
            <BaseModal
                show={showDetailInfoModal}
                hideImage
                buttonText="닫기"
                onClickButton={() => setShowDetailInfoModal(false)}
            >
                <FreeGiftDetailImageContainer spread={spreadDetailImage}>
                    {selectedGift.detail_info.detail_image.map((image, i) => (
                        <img src={image} alt={`상세이미지${i}`} width="100%" />
                    ))}
                    <FreeGiftSpreadButtonBox>
                        {spreadDetailImage ? (
                            <Button
                                height="48px"
                                color="gray"
                                onClickButton={() =>
                                    setSpreadDetailImage(false)
                                }
                            >
                                상품 상세 정보 접기
                            </Button>
                        ) : (
                            <Button
                                height="48px"
                                color="gray"
                                onClickButton={() => setSpreadDetailImage(true)}
                            >
                                상품 상세 정보 펼치기
                            </Button>
                        )}
                    </FreeGiftSpreadButtonBox>
                </FreeGiftDetailImageContainer>
            </BaseModal>
            <BaseModal
                customImage={ExclamationImage}
                show={showInvalidCouponModal}
                buttonText="쿠폰 확인"
                onClickButton={() => router.push('/coupon')}
                button2Text="문의하기"
                button2Color="gray"
                onClickButton2={() =>
                    openExternalBrowser('https://pf.kakao.com/_nxeBrxj/chat')
                }
            >
                <Text>쿠폰 정보에 문제가 있어요</Text>
                <Text>다시 한 번 확인해주세요</Text>
            </BaseModal>
        </MainLayout>
    );
};
