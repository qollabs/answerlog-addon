import Image from 'next/image';
import { useAsyncEffect } from '@Hooks/useAsyncEffect';
import { BaseModal } from '@Molecules/BaseModal';
import { MainLayout } from '@Organisms/MainLayout';
import { useRouter } from 'next/router';
import {
    useState,
    useEffect,
    useContext,
    ChangeEvent,
    useRef,
    useCallback,
} from 'react';
import {
    PurchaseContainer,
    PurchaseSumupContentsContainer,
    PurchaseSubmitBox,
    PurchaseGiftContainer,
    PurchaseGiftImageBox,
    PurchaseGiftRightContainer,
    PurchaseGiftInfoContaier,
    PurchaseGiftCaretContainer,
    PurchaseSumupTitleContainer,
    PurchaseSumupCaretContainer,
    PurcahseSumupDetailContainer,
    PurchaseSumupDetailRowContainer,
    PurchaseAgreementContainer,
    PurchaseAgreementMainContainer,
    PurchaseAgreementSubContainer,
    PurchaseModalContainer,
    PurchaseGiftSoldoutContainer,
    PurchasePointContainer,
    PurchasePointIconBox,
} from './Purchase.styled';
import { Gap } from '@Styles/App.styled';
import { Button } from '@Atoms/Button';
import { Text } from '@Atoms/Typography';
import {
    IAddress,
    IIncartGiftSelected,
    IOrderInfo,
    UpdateCartReqType,
} from '@Types/types';
import { Divider } from '@Atoms/Divider';
import { useRequest } from '@Hooks/useRequest';
import { AppContext } from '@Pages/_app';
import CaretDown from '@Images/icons/caret_down.svg';
import CaretUp from '@Images/icons/caret_up.svg';
import BasketImage from '@Images/basket.png';
import { BLACK, GRAY3 } from '@Styles/colors';
import { CheckBox } from '@Atoms/CheckBox';
import { CheckBoxValue } from '@Atoms/CheckBox/CheckBox';
import { Box } from '@Atoms/Box';
import { convertTime } from '@Functions/convertTime';
import { nanoid } from 'nanoid';
import {
    loadPaymentWidget,
    PaymentWidgetInstance,
    ANONYMOUS,
} from '@tosspayments/payment-widget-sdk';
import {
    giftPriceWithOptions,
    totalQuantityPrice,
    totalShipmentFee,
} from '@Functions/paymentCalculator';
import { LoadingContainer, SpinLoader } from '@Atoms/Loading';
import * as ga from '../../../lib/ga/gtag';
import { TextField } from '@Atoms/TextField';
import { totalCashPoint } from '@Functions/cashPointTranslator';
import { dummyAddress } from '@Constants/dummyObjects';
import { useActionOnTouch } from '@Hooks/useActionOnTouch';
import { WideSection } from '@Molecules/WideSection';
import { AddressSelector } from '@Organisms/AddressSelector';
import { useFlutter } from '@Hooks/useFlutter';

interface ReqOrderType {
    order_id: string;
    total_price: number;
    used_point: number;
    address: IAddress;
}

export const Purchase = () => {
    const router = useRouter();
    const { loading, request } = useRequest();
    const {
        textSizePref,
        myPhoneNumber,
        myName,
        myDatabaseId,
        myCashPoints,
        isInputFocused,
    } = useContext(AppContext);
    const { openExternalBrowser } = useFlutter();

    const [showStockChangeModal, setShowStockChangeModal] = useState(false);
    const [orderName, setOrderName] = useState('');
    const [savedAddresses, setSavedAddresses] = useState<IAddress[]>([]);
    const [selectedGifts, setSelectedGifts] = useState<IIncartGiftSelected[]>(
        [],
    );
    const [activeSelectedGifts, setActiveSelectedGifts] = useState<
        IIncartGiftSelected[]
    >([]);
    const [showMoreGifts, setShowMorGifts] = useState(false);
    const [showDetailPrice, setShowDetailPrice] = useState(false);
    const [checkedAgreements, setCheckedAgreements] = useState<CheckBoxValue[]>(
        [],
    );
    const [cashPointToBeUsed, setCashPointToBeUsed] = useState(0);
    const [cashPointAvailable, setCashPointAvailable] = useState(0);
    const [checkedAgreementsAll, setCheckedAgreementsAll] = useState<
        CheckBoxValue[]
    >([0, 1, 2]);
    const [finalAddress, setFinalAddress] = useState<IAddress>(dummyAddress);
    const [finalPrice, setFinalPrice] = useState<number>(0);
    const [disableSubmitButton, setDisableSubmitButton] = useState(true);

    const paymentWidgetRef = useRef<PaymentWidgetInstance | null>(null);
    const paymentMethodWidgetRef = useRef<ReturnType<
        PaymentWidgetInstance['renderPaymentMethods']
    > | null>(null);

    // get saved addresses
    useAsyncEffect(async () => {
        const resAddress = await request({
            url: `/api/user/address`,
            method: 'GET',
        });
        if (resAddress) {
            setSavedAddresses(resAddress.data);
        }
    }, []);

    // get selected gifts
    useAsyncEffect(async () => {
        const resGift = await request({
            url: `/api/user/selected_cart`,
            method: 'GET',
        });
        if (resGift) {
            setSelectedGifts(resGift.data);
        }
    }, []);

    // detect stock change
    useAsyncEffect(async () => {
        // after data has been fully received
        let changeDetector = false;
        if (selectedGifts.length > 0) {
            let selectedGiftsTemp = [...selectedGifts];
            selectedGiftsTemp.forEach((gift, index) => {
                if (gift.amount > gift.stock_amount) {
                    gift.amount = gift.stock_amount;
                    setShowStockChangeModal(true);
                    changeDetector = true;
                }
            });
            if (changeDetector) {
                let reqFitStock: UpdateCartReqType[] = [];
                selectedGiftsTemp.forEach((gift, index) => {
                    let reqObject = {
                        id: gift.item._id,
                        options: gift.current_options,
                        num: gift.amount,
                    };
                    reqFitStock.push(reqObject);
                });

                const resFitStock = await request({
                    url: `/api/user/update_cart`,
                    method: 'PUT',
                    data: reqFitStock,
                });
                if (resFitStock) {
                    let selectedGiftsTempTwo = resFitStock.data.filter(
                        (gift: IIncartGiftSelected, index: number) =>
                            gift.selected === true,
                    );
                    setSelectedGifts(selectedGiftsTempTwo);
                }
            }
        }
    }, [selectedGifts]);

    // orderName
    useEffect(() => {
        let orderNameTemp =
            selectedGifts.length === 1
                ? `${selectedGifts[0]?.item.title}`
                : `${selectedGifts[0]?.item.title} 외 ${
                      selectedGifts.length - 1
                  }건`;
        setOrderName(orderNameTemp);
    }, [selectedGifts]);

    // show and hide more gifts
    useEffect(() => {
        if (selectedGifts.length > 0) {
            if (!showMoreGifts) {
                let selectedGiftsTemp = [selectedGifts[0]];
                setActiveSelectedGifts(selectedGiftsTemp);
            } else {
                setActiveSelectedGifts(selectedGifts);
            }
        }
    }, [showMoreGifts, selectedGifts]);

    // set available cash point
    useEffect(() => {
        if (!myCashPoints) return;
        if (
            totalQuantityPrice(selectedGifts).price >
            totalCashPoint(myCashPoints)
        ) {
            setCashPointAvailable(totalCashPoint(myCashPoints));
        } else {
            setCashPointAvailable(totalQuantityPrice(selectedGifts).price);
        }
    }, [myCashPoints, selectedGifts]);

    // set finalPrice
    useEffect(() => {
        let totalGiftPrice = totalQuantityPrice(selectedGifts).price;
        let totalShipmentPrice = totalShipmentFee(
            selectedGifts,
            finalAddress.postal_code,
        );
        if (totalGiftPrice > 0) {
            setFinalPrice(
                totalGiftPrice + totalShipmentPrice - cashPointToBeUsed,
            );
        } else {
            setFinalPrice(0);
        }
    }, [selectedGifts, finalAddress, cashPointToBeUsed]);

    // control submit button
    useEffect(() => {
        let judgementAddress =
            finalAddress.receiver === '' ||
            finalAddress.main_address === '' ||
            finalAddress.phone_number === '';
        let judgementAgreement =
            checkedAgreements.length < checkedAgreementsAll.length;
        let judgementPrice = finalPrice <= 0 && cashPointToBeUsed === 0;

        let judgement =
            judgementAddress || judgementAgreement || judgementPrice;
        setDisableSubmitButton(judgement);
    }, [finalAddress, finalPrice, checkedAgreements, selectedGifts]);

    // update totalPrice into toss widget

    useEffect(() => {
        const paymentMethodsWidget = paymentMethodWidgetRef.current;

        if (paymentMethodsWidget == null) {
            return;
        }
        paymentMethodsWidget.updateAmount(
            finalPrice,
            paymentMethodsWidget.UPDATE_REASON.COUPON,
        );
    }, [finalPrice]);

    // activate tosspayment widget

    const tossWidgetActivateRef = useCallback(
        async (node: HTMLDivElement) => {
            if (!myDatabaseId) return;
            if (node !== null || node !== undefined) {
                const clientKey = process.env
                    .NEXT_PUBLIC_TOSS_PAYMENTS_CLIENT_KEY as string;
                const customerKey = myDatabaseId;

                const paymentWidget = await loadPaymentWidget(
                    clientKey,
                    customerKey,
                );
                if (paymentWidget) {
                    // 결제방법 UI
                    const paymentMethodWidget =
                        paymentWidget.renderPaymentMethods('#payment-widget', {
                            value: finalPrice,
                            currency: 'KRW',
                            country: 'KR',
                        });

                    // 이용약관 동의 UI
                    paymentWidget.renderAgreement('#agreement');

                    paymentWidgetRef.current = paymentWidget;
                    paymentMethodWidgetRef.current = paymentMethodWidget;
                }

                // 결제 금액 업데이트
            }
        },
        [myDatabaseId, finalPrice],
    );

    const deleteOneAddress = async (addressId: string) => {
        // 나중에 다시 만들어야 함!
        // const delAddressRes = await request({
        //     url: '/api/user/delete_address',
        //     method: 'PUT',
        //     data: { address_id: addressId },
        // });
        // if (delAddressRes) {
        //     let defaultAddress = delAddressRes.data.filter(
        //         (address: IAddress) => address.default === true,
        //     );
        //     let otherAddresses = delAddressRes.data.filter(
        //         (address: IAddress) => address.default === false,
        //     );
        //     let savedAddressesTemp = [...defaultAddress, ...otherAddresses];
        //     setSavedAddresses([...savedAddressesTemp]);
        //     setActiveSavedAddresses([...savedAddressesTemp]);
        //     let savedMessagesTemp: string[] = [];
        //     savedAddressesTemp.forEach((address: IAddress, index: number) => {
        //         savedMessagesTemp.push(address.message);
        //         if (address.default === true) {
        //             setSelectedSavedAddress(address.address_id);
        //         }
        //     });
        //     setSavedMessages(savedMessagesTemp);
        // }
    };

    const onChangeCashPointToBeUsed = (e: ChangeEvent<HTMLInputElement>) => {
        let value = Number(e.target.value.replace(/[^0-9]/g, ''));
        if (value > cashPointAvailable) {
            value = cashPointAvailable;
        }
        setCashPointToBeUsed(value);
    };

    // toss
    const purchaseConfirm = async () => {
        const paymentWidget = paymentWidgetRef?.current;
        const paymentMethodWidget = paymentMethodWidgetRef?.current;

        // 결제 수단
        const selectedPaymentMethod =
            paymentMethodWidget?.getSelectedPaymentMethod();

        // 필수 이용약관 동의 여부
        const paymentAgreement = paymentWidget?.renderAgreement('#agreement');
        const orderId = convertTime(new Date(), 'yymmdd') + nanoid(6);

        if (paymentAgreement?.getAgreementStatus().agreedRequiredTerms) {
            try {
                ga.event({
                    action: 'add_payment_info',
                    params: {
                        currency: 'KRW',
                        value: totalQuantityPrice(selectedGifts).price,
                        payment_type: selectedPaymentMethod?.method,
                        items: selectedGifts.map((gift) => {
                            return {
                                item_id: gift.item._id,
                                item_name: gift.item.title,
                                item_brand: gift.item.detail_info.manufacturer,
                                price: gift.item.discount_rate
                                    ? gift.item.retail_price
                                    : gift.item.price,
                                discount: gift.item.discount_rate
                                    ? gift.item.retail_price - gift.item.price
                                    : 0,
                                quantity: gift.amount,
                            };
                        }),
                    },
                });
                ga.event({
                    action: 'add_shipping_info',
                    params: {
                        currency: 'KRW',
                        value: totalQuantityPrice(selectedGifts).price,
                        items: selectedGifts.map((gift) => {
                            return {
                                item_id: gift.item._id,
                                item_name: gift.item.title,
                                item_brand: gift.item.detail_info.manufacturer,
                                price: gift.item.discount_rate
                                    ? gift.item.retail_price
                                    : gift.item.price,
                                discount: gift.item.discount_rate
                                    ? gift.item.retail_price - gift.item.price
                                    : 0,
                                quantity: gift.amount,
                            };
                        }),
                    },
                });

                const orderData: ReqOrderType = {
                    order_id: orderId,
                    total_price: finalPrice + cashPointToBeUsed,
                    used_point: cashPointToBeUsed,
                    address: finalAddress,
                };

                const orderRes = await request({
                    url: `/api/order`,
                    method: 'POST',
                    data: orderData,
                });

                if (orderRes) {
                    console.log('post success');
                    console.log(orderRes.data);
                    if (finalPrice === 0) {
                        const orderInfo: IOrderInfo = orderRes.data;
                        const {
                            paymentKey,
                            order_id: orderId,
                            total_price: totalPrice,
                        } = orderInfo;
                        // order객체 그대로 들어옴
                        window.location.href = `/success-purchase?paymentType=ALLCOUPON&orderId=${orderId}&paymentKey=${paymentKey}&amount=0`;
                    } else {
                        await paymentWidget?.requestPayment({
                            orderId: orderId,
                            orderName: orderName,
                            customerName: myName,
                            customerEmail: finalAddress.email,
                            successUrl: `${window.location.origin}/success-purchase`,
                            failUrl: `${window.location.origin}/fail-purchase`,
                        });
                    }
                }
            } catch (error) {
                // 결제 모듈 띄우고 진행하다가 취소한 경우
                const orderCancelRes = await request({
                    url: `/api/order/${orderId}`,
                    method: 'DELETE',
                });
                if (orderCancelRes) {
                    console.log('cancel success');
                }
            }
        } else {
            console.log('이용 약관에 동의해주세요 관련 팝업');
        }
    };

    return (
        <MainLayout hideBottomNav>
            {loading && selectedGifts.length === 0 ? (
                <LoadingContainer>
                    <SpinLoader />
                </LoadingContainer>
            ) : (
                <PurchaseContainer>
                    <WideSection title="배송 정보">
                        <AddressSelector
                            savedAddresses={savedAddresses}
                            setFinalAddress={setFinalAddress}
                        />
                    </WideSection>
                    <Gap height="22px" />
                    <WideSection title="주문 상품 정보">
                        {activeSelectedGifts.map((gift, index) => (
                            <PurchaseGiftContainer key={gift.item._id}>
                                {gift.amount === 0 && (
                                    <PurchaseGiftSoldoutContainer>
                                        <Text size="h2">품절되었어요</Text>
                                        <Gap height="8px" />
                                        <Text textAlign="center">
                                            결제시 해당 상품은 제외되며
                                            <br />
                                            총 상픔 금액에 따라
                                            <br />
                                            결제가 진행되지 않을 수 있습니다
                                        </Text>
                                    </PurchaseGiftSoldoutContainer>
                                )}
                                <PurchaseGiftImageBox>
                                    <Image
                                        src={gift.item.image_url[0]}
                                        alt=""
                                        layout="fill"
                                    />
                                </PurchaseGiftImageBox>
                                <Gap width="8px" />
                                <PurchaseGiftRightContainer>
                                    <PurchaseGiftInfoContaier>
                                        <Text color="gray3">
                                            {gift.item.detail_info.seller.brand}
                                        </Text>
                                        <Text size="h2">{gift.item.title}</Text>
                                        <Text size="h2">
                                            {giftPriceWithOptions(
                                                gift,
                                            ).toLocaleString()}
                                            원
                                        </Text>
                                    </PurchaseGiftInfoContaier>
                                    <Text>
                                        {gift.current_options.length > 0 && (
                                            <Text>
                                                옵션 :{' '}
                                                {gift.current_options.map(
                                                    (option, i) => (
                                                        <Text>
                                                            [
                                                            {option.option_name}
                                                            ]
                                                            {
                                                                option
                                                                    .option_detail
                                                                    .option_value
                                                            }
                                                        </Text>
                                                    ),
                                                )}{' '}
                                                /{' '}
                                            </Text>
                                        )}
                                        {gift.amount}개
                                    </Text>
                                </PurchaseGiftRightContainer>
                            </PurchaseGiftContainer>
                        ))}
                        {selectedGifts.length > 1 && !showMoreGifts && (
                            <PurchaseGiftCaretContainer
                                onClick={() => setShowMorGifts(true)}
                            >
                                <Text size="b2">
                                    총{' '}
                                    <Text color="orange2" size="b2">
                                        {selectedGifts.length}건
                                    </Text>{' '}
                                    전체보기
                                </Text>
                                <Gap width="16px" />
                                <CaretDown color={BLACK} />
                            </PurchaseGiftCaretContainer>
                        )}
                        {selectedGifts.length > 1 && showMoreGifts && (
                            <PurchaseGiftCaretContainer
                                onClick={() => setShowMorGifts(false)}
                            >
                                <Text size="b2">
                                    총{' '}
                                    <Text color="orange2" size="b2">
                                        {selectedGifts.length}건
                                    </Text>{' '}
                                    전체보기 닫기
                                </Text>
                                <Gap width="16px" />
                                <CaretUp color={BLACK} />
                            </PurchaseGiftCaretContainer>
                        )}
                    </WideSection>
                    <Gap height="22px" />
                    <WideSection title="포인트 사용">
                        <PurchasePointContainer>
                            <TextField
                                isNumeric
                                value={cashPointToBeUsed.toLocaleString()}
                                onChange={onChangeCashPointToBeUsed}
                                disabled={cashPointAvailable === 0}
                            />
                            <Gap width="8px" />
                            <Button
                                width="200px"
                                onClickButton={() =>
                                    setCashPointToBeUsed(cashPointAvailable)
                                }
                                disabled={
                                    cashPointAvailable === cashPointToBeUsed
                                }
                            >
                                모두 사용
                            </Button>
                        </PurchasePointContainer>
                        <Gap height="8px" />
                        <PurchasePointContainer>
                            <Text>사용 가능&nbsp;</Text>
                            <Text>{cashPointAvailable.toLocaleString()}</Text>
                            <Text>&nbsp;&#47;&nbsp;</Text>
                            <Text color="gray4">보유&nbsp;</Text>
                            <Text color="gray4">
                                {totalCashPoint(myCashPoints).toLocaleString()}
                            </Text>
                        </PurchasePointContainer>
                        <Gap height="4px" />
                        <PurchasePointContainer>
                            <PurchasePointIconBox>
                                <Text color="white" size="c1">
                                    !
                                </Text>
                            </PurchasePointIconBox>
                            <Gap width="8px" />
                            <Text size="c1">
                                포인트는 배송비를 제외한 상품 금액에 사용할 수
                                있어요
                            </Text>
                        </PurchasePointContainer>
                    </WideSection>
                    <Gap height="22px" />
                    <WideSection>
                        <PurchaseSumupTitleContainer>
                            <Text size="h2">결제 금액</Text>
                            {!showDetailPrice ? (
                                <PurchaseSumupCaretContainer
                                    onClick={() => setShowDetailPrice(true)}
                                >
                                    <Text size="h1" color="orange2">
                                        {finalPrice.toLocaleString()}원
                                    </Text>
                                    <Gap width="15px" />
                                    <CaretDown />
                                </PurchaseSumupCaretContainer>
                            ) : (
                                <PurchaseSumupCaretContainer
                                    onClick={() => setShowDetailPrice(false)}
                                >
                                    <Text size="h1" color="orange2">
                                        {finalPrice.toLocaleString()}원
                                    </Text>
                                    <Gap width="16px" />
                                    <CaretUp color={GRAY3} />
                                </PurchaseSumupCaretContainer>
                            )}
                        </PurchaseSumupTitleContainer>
                        <PurchaseSumupContentsContainer>
                            {showDetailPrice && (
                                <PurcahseSumupDetailContainer>
                                    <PurchaseSumupDetailRowContainer>
                                        <Text size="b2" color="gray5">
                                            총 상품 금액
                                        </Text>
                                        <Text size="b2" color="gray5">
                                            {totalQuantityPrice(
                                                selectedGifts,
                                            ).price.toLocaleString()}
                                            원
                                        </Text>
                                    </PurchaseSumupDetailRowContainer>
                                    <Gap width="6px" />
                                    <PurchaseSumupDetailRowContainer>
                                        <Text size="b2" color="gray5">
                                            총 배송비
                                        </Text>
                                        <Text size="b2" color="gray5">
                                            {totalShipmentFee(
                                                selectedGifts,
                                                finalAddress.postal_code,
                                            ).toLocaleString()}
                                            원
                                        </Text>
                                    </PurchaseSumupDetailRowContainer>
                                    <Gap width="6px" />
                                    <PurchaseSumupDetailRowContainer>
                                        <Text size="b2" color="gray5">
                                            포인트 사용
                                        </Text>
                                        <Text size="b2" color="gray5">
                                            {(-cashPointToBeUsed).toLocaleString()}
                                            원
                                        </Text>
                                    </PurchaseSumupDetailRowContainer>
                                    <Gap height="16px" />
                                    <PurchaseSumupDetailRowContainer>
                                        <Text>총 결제 금액</Text>
                                        <Text>
                                            {finalPrice.toLocaleString()}원
                                        </Text>
                                    </PurchaseSumupDetailRowContainer>
                                    <Gap height="32px" />
                                </PurcahseSumupDetailContainer>
                            )}

                            <PurchaseAgreementContainer>
                                <PurchaseAgreementMainContainer>
                                    <Box>
                                        <CheckBox
                                            value="all"
                                            checkedSet={checkedAgreements}
                                            setCheckedSet={setCheckedAgreements}
                                            isAll
                                            allOptions={checkedAgreementsAll}
                                            noBackground
                                        />
                                    </Box>
                                    <Text size="b2">
                                        주문 내용을 확인했으며, 아래 내용에 모두
                                        동의합니다.
                                    </Text>
                                </PurchaseAgreementMainContainer>
                                <Divider />
                                <Gap height="16px" />
                                <PurchaseAgreementSubContainer>
                                    <Box>
                                        <CheckBox
                                            value={checkedAgreementsAll[0]}
                                            checkedSet={checkedAgreements}
                                            setCheckedSet={setCheckedAgreements}
                                            noBackground
                                        />
                                    </Box>
                                    <Text color="gray3" size="b2">
                                        (필수) 개인정보 수집/이용 동의{' '}
                                        <Text
                                            color="gray3"
                                            size="b2"
                                            textDecoration="underline"
                                            onClick={() =>
                                                openExternalBrowser(
                                                    'https://pages.tosspayments.com/terms/privacy/consent1',
                                                )
                                            }
                                        >
                                            보기
                                        </Text>
                                    </Text>
                                </PurchaseAgreementSubContainer>
                                <Gap height="4px" />
                                <PurchaseAgreementSubContainer>
                                    <Box>
                                        <CheckBox
                                            value={checkedAgreementsAll[1]}
                                            checkedSet={checkedAgreements}
                                            setCheckedSet={setCheckedAgreements}
                                            noBackground
                                        />
                                    </Box>
                                    <Text color="gray3" size="b2">
                                        (필수) 개인정보 제3자 제공 동의{' '}
                                        <Text
                                            color="gray3"
                                            size="b2"
                                            textDecoration="underline"
                                            onClick={() =>
                                                openExternalBrowser(
                                                    'https://pages.tosspayments.com/terms/privacy/consent2',
                                                )
                                            }
                                        >
                                            보기
                                        </Text>
                                    </Text>
                                </PurchaseAgreementSubContainer>
                                <Gap height="4px" />
                                <PurchaseAgreementSubContainer>
                                    <Box>
                                        <CheckBox
                                            value={checkedAgreementsAll[2]}
                                            checkedSet={checkedAgreements}
                                            setCheckedSet={setCheckedAgreements}
                                            noBackground
                                        />
                                    </Box>
                                    <Text color="gray3" size="b2">
                                        (필수) 결제대행 서비스 이용약관{' '}
                                        <Text
                                            color="gray3"
                                            size="b2"
                                            textDecoration="underline"
                                            onClick={() =>
                                                openExternalBrowser(
                                                    'https://pages.tosspayments.com/terms/user',
                                                )
                                            }
                                        >
                                            보기
                                        </Text>
                                    </Text>
                                </PurchaseAgreementSubContainer>
                            </PurchaseAgreementContainer>
                        </PurchaseSumupContentsContainer>
                        <Gap height="40px" />
                    </WideSection>
                    <Gap height="22px" />
                    <WideSection title="결제 방법">
                        {/* 결제 위젯 */}
                        <div id="payment-widget" style={{ width: '100%' }} />

                        {/* 개인 정보 동의 */}
                        <div id="agreement" style={{ display: 'none' }} />
                        <div ref={tossWidgetActivateRef} />
                    </WideSection>
                    <PurchaseSubmitBox isInputFocused={isInputFocused}>
                        <Button
                            disabled={disableSubmitButton}
                            onClickButton={() => purchaseConfirm()}
                        >
                            결제하기
                        </Button>
                    </PurchaseSubmitBox>
                </PurchaseContainer>
            )}
            <BaseModal
                show={showStockChangeModal}
                onClose={() => setShowStockChangeModal(false)}
                closeOnClickOutside
                customImage={BasketImage}
            >
                <PurchaseModalContainer>
                    <Text size="b1">쇼핑하시는 동안 재고가 바뀌었어요</Text>
                    <Gap height="8px" />
                    <Text size="b2">구매 전 수량을 확인하세요</Text>
                    <Gap height="32px" />
                    <Button
                        height="48px"
                        onClickButton={() => setShowStockChangeModal(false)}
                    >
                        확인하기
                    </Button>
                </PurchaseModalContainer>
            </BaseModal>
        </MainLayout>
    );
};
