/* eslint-disable */

import Image from 'next/image';
import FinanceImage from '@Images/finance.png';
import CaretDownIcon from '@Images/icons/caret-down.svg';
import { LoadingContainer, SpinLoader } from '@Atoms/Loading';
import { useAsyncEffect } from '@Hooks/useAsyncEffect';
import { useRequest } from '@Hooks/useRequest';
import { MainLayout } from '@Organisms/MainLayout';
import { BankCodeType, IOrderInfo, IOrderedGift, IPayment } from '@Types/types';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { Text, TextBox } from '@Atoms/Typography';
import {
    PHDetailContainer,
    PHDetailContentsContainer,
    PHDetailIconBox,
    PHDetailCancelAlertContainer,
    PHDetailLocationContainer,
    PHDetailOrderIdContainer,
    PHDetailPriceContainer,
    PHDetailProgressBarContainer,
    PHDetailSectionContainer,
    PHDetailSectionTitleContainer,
    PHDetailCancelButtonContainer,
    PHDetailModalButtonContainer,
    PHDetailCancelTextContainer,
    PHDetailGiftContainer,
    PHDetailImageBox,
    PHDetailGiftInfoContainer,
    PHDetailAccountContainer,
    PHDetailBankSelectButton,
    PHDetailBankCodeContainer,
    PHDetailBankCodeBox,
    PHDetailCancelInfoContainer,
    PHDetailCancelInfoRow,
} from './PurchaseHistoryDetail.styled';
import { Gap } from '@Styles/App.styled';
import { formatPhoneNumber } from '@Functions/onChangeInput';
import {
    totalQuantityPrice,
    totalShipmentFee,
} from '@Functions/paymentCalculator';
import Link from 'next/link';
import {
    cancelProcessTranslator,
    deliveryProcessCommentMaker,
    deliveryProcessTranslator,
    multipleDeliveryProcess,
} from '@Functions/deliveryProcessTranslator';
import { ProgressBar } from '@Molecules/ProgressBar/ProgressBar';
import { convertTime } from '@Functions/convertTime';
import { Button } from '@Atoms/Button';
import { BaseModal } from '@Molecules/BaseModal';
import { bankCodeTranslator } from '@Functions/codeTranslator';
import { TextField } from '@Atoms/TextField';
import { useInput } from '@Hooks/useInput';
import { BottomDrawer } from '@Molecules/BottomDrawer';
import { orderedGiftsArrayMaker } from '@Functions/orderedGiftsArrayMaker';
import { dummyOrderInfo, dummyPaymentResult } from '@Constants/dummyObjects';
import * as ga from '../../../lib/ga/gtag';
import { useActionOnTouch } from '@Hooks/useActionOnTouch';
import { useFlutter } from '@Hooks/useFlutter';
import { bankCodes } from '@Constants/globalConstants';

interface ReqCancelType {
    order_id: string;
    cancel_reason: string;
    bank: string;
    account_number: string;
    holder_name: string;
}

export const PurchaseHistoryDetail = () => {
    const router = useRouter();
    const { id: orderId } = router.query;
    const { loading, request } = useRequest();
    const { openExternalBrowser } = useFlutter();

    const [orderInfo, setOrderInfo] = useState<IOrderInfo>(dummyOrderInfo);
    const [totalPrice, setTotalPrice] = useState(0);
    const [shipmentFee, setShipmentFee] = useState(0);
    const [paymentResult, setPaymentResult] =
        useState<IPayment>(dummyPaymentResult);
    const [stateTexts, setStateTexts] = useState<string[]>([]);
    const [refundAccount, onChangeRefundAccount, setRefundAccount] =
        useInput('');
    const [showBankCodeBottomDrawer, setShowBankCodeBottomDrawer] =
        useState(false);
    const [refundBankCode, setRefundBankCode] = useState<BankCodeType | null>(
        null,
    );
    const [refundHolder, onChangeRefundHolder, setRefundHolder] = useInput('');
    const [cancelReason, onChangeCancelReason, setCancelReason] = useInput('');
    const [showOrderCancelModal, setShowOrderCancelModal] = useState(false);

    // get order info
    useAsyncEffect(async () => {
        if (!orderId) return;
        const orderInfoRes = await request({
            url: `/api/order/specific/${orderId}`,
            method: 'GET',
        });
        if (orderInfoRes) {
            let orderInfoTemp: IOrderInfo = orderInfoRes.data;
            setOrderInfo(orderInfoTemp);

            const paymentKey = orderInfoTemp.paymentKey;
            const paymentResultRes = await request({
                url: `/api/order/lookup`,
                method: 'POST',
                data: {
                    paymentKey: paymentKey,
                },
            });
            if (paymentResultRes) {
                setPaymentResult(paymentResultRes.data);
            }
        }
    }, [orderId]);

    // state texts
    useEffect(() => {
        let stateTextsTemp: string[] = [];
        for (let i = 0; i <= 4; i++) {
            stateTextsTemp.push(deliveryProcessTranslator(i));
        }
        setStateTexts(stateTextsTemp);
    }, []);

    // calculate shipment fee on free gift
    useEffect(() => {
        if (orderInfo.total_price === 0) {
            setTotalPrice(0);
            setShipmentFee(0);
        } else {
            setTotalPrice(orderInfo.total_price);
            setShipmentFee(
                totalShipmentFee(
                    orderedGiftsArrayMaker(orderInfo),
                    orderInfo.address.postal_code,
                ),
            );
        }
    }, [orderInfo]);

    const chooseRefundBankCode = (bankCode: BankCodeType) => {
        setRefundBankCode(bankCode);
        setShowBankCodeBottomDrawer(false);
    };

    const disableCancelButton = () => {
        let judgement = false;
        // 가상계좌일 경우 환불 정보 필요
        if (paymentResult.virtualAccount !== null) {
            !(refundAccount && refundBankCode && refundHolder)
                ? (judgement = true)
                : null;
        }
        // 이미 취소된 경우
        if (orderInfo && orderInfo.cancel_info.process !== 0) {
            judgement = true;
        }
        // 입금 확인중인 경우
        if (orderInfo && multipleDeliveryProcess(orderInfo).laziest === 0) {
            judgement = true;
        }
        // 이미 배송중인 경우
        if (orderInfo && multipleDeliveryProcess(orderInfo).fastest >= 3) {
            judgement = true;
        }
        return judgement;
    };

    const cancelOrder = async () => {
        if (!orderInfo) return;
        const reqCancel: ReqCancelType = {
            order_id: orderInfo.order_id,
            cancel_reason: cancelReason,
            bank: refundBankCode || '',
            account_number: refundAccount,
            holder_name: refundHolder,
        };
        const resCancel = await request({
            url: '/api/order/cancel',
            method: 'PUT',
            data: reqCancel,
        });
        if (resCancel) {
            ga.event({
                action: 'refund',
                params: {
                    currency: 'KRW',
                    transaction_id: orderInfo.order_id,
                    value: totalQuantityPrice(orderedGiftsArrayMaker(orderInfo))
                        .price,
                    shipping: totalShipmentFee(
                        orderedGiftsArrayMaker(orderInfo),
                        orderInfo.address.postal_code,
                    ),
                    items: orderedGiftsArrayMaker(orderInfo).map((gift) => {
                        return {
                            item_id: gift.item._id,
                            item_name: gift.item.title,
                            item_brand: gift.item.detail_info.manufacturer,
                            price: gift.item.retail_price
                                ? gift.item.retail_price
                                : gift.item.price,
                            discount: gift.item.retail_price
                                ? gift.item.retail_price - gift.item.price
                                : 0,
                            quantity: gift.amount,
                        };
                    }),
                },
            });
            router.reload();
        } else {
            console.log('failed to cancel the order');
        }
    };
    return (
        <MainLayout hideBottomNav>
            {loading && !orderInfo && (
                <LoadingContainer>
                    <SpinLoader />
                </LoadingContainer>
            )}
            {orderInfo && (
                <PHDetailContainer>
                    <PHDetailSectionContainer>
                        <PHDetailOrderIdContainer>
                            <Text>
                                {convertTime(orderInfo.order_date, 'dotDate')} |
                                주문번호 {orderInfo.order_id}
                            </Text>
                        </PHDetailOrderIdContainer>
                    </PHDetailSectionContainer>
                    <Gap height="16px" />
                    <PHDetailSectionContainer>
                        <PHDetailProgressBarContainer>
                            <ProgressBar
                                value={
                                    orderInfo.cancel_info.process !== 0
                                        ? -1
                                        : multipleDeliveryProcess(orderInfo)
                                              .fastest
                                }
                                max={4}
                                nodeTexts={stateTexts}
                            />
                        </PHDetailProgressBarContainer>
                        <Gap height="32px" />
                        <Text size="h2">
                            {deliveryProcessCommentMaker(
                                orderInfo.cancel_info.process !== 0
                                    ? -1
                                    : multipleDeliveryProcess(orderInfo)
                                          .fastest,
                            )}
                        </Text>
                        {orderInfo.cancel_info.process !== 0 &&
                            orderInfo.cancel_info.cancel_date && (
                                <PHDetailCancelInfoContainer>
                                    <Gap height="16px" />
                                    <PHDetailCancelInfoRow>
                                        <Text>취소 날짜 : </Text>
                                        <Text>
                                            {' '}
                                            {convertTime(
                                                orderInfo.cancel_info
                                                    .cancel_date,
                                                'minute',
                                            )}
                                        </Text>
                                    </PHDetailCancelInfoRow>
                                    <PHDetailCancelInfoRow>
                                        <Text>취소 사유 :</Text>
                                        <Text>
                                            {' '}
                                            {
                                                orderInfo.cancel_info
                                                    ?.cancel_reason
                                            }
                                        </Text>
                                    </PHDetailCancelInfoRow>
                                    <PHDetailCancelInfoRow>
                                        <Text>진행 경과 :</Text>
                                        <Text>
                                            {' '}
                                            {cancelProcessTranslator(
                                                orderInfo.cancel_info.process,
                                            )}
                                        </Text>
                                    </PHDetailCancelInfoRow>
                                </PHDetailCancelInfoContainer>
                            )}
                    </PHDetailSectionContainer>
                    <Gap height="16px" />
                    <PHDetailSectionContainer>
                        <PHDetailSectionTitleContainer>
                            <Text size="h2">상품 정보</Text>
                        </PHDetailSectionTitleContainer>
                        <PHDetailContentsContainer>
                            {orderedGiftsArrayMaker(orderInfo).map(
                                (gift, i) => (
                                    <PHDetailGiftContainer
                                        onClick={() =>
                                            router.push(
                                                `/mall/${gift.item._id}`,
                                            )
                                        }
                                    >
                                        <PHDetailImageBox>
                                            <Image
                                                layout="fill"
                                                src={
                                                    gift.item.thumbnail_url ||
                                                    gift.item.image_url[0]
                                                }
                                            />
                                        </PHDetailImageBox>
                                        <PHDetailGiftInfoContainer>
                                            <Text color="gray4">
                                                {
                                                    gift.item.detail_info.seller
                                                        .brand
                                                }
                                            </Text>
                                            <Text>{gift.item.title}</Text>
                                            {gift.current_options.map(
                                                (option, j) => (
                                                    <Text>
                                                        [{option.option_name}]
                                                        {
                                                            option.option_detail
                                                                .option_value
                                                        }{' '}
                                                        {option.option_detail
                                                            .option_price !==
                                                            0 &&
                                                            `(+ ${option.option_detail.option_price.toLocaleString()} 원)`}
                                                    </Text>
                                                ),
                                            )}
                                            <Text>
                                                {gift.amount} 개 (
                                                {gift.price.toLocaleString()}{' '}
                                                원)
                                            </Text>
                                        </PHDetailGiftInfoContainer>
                                    </PHDetailGiftContainer>
                                ),
                            )}
                        </PHDetailContentsContainer>
                    </PHDetailSectionContainer>
                    <Gap height="16px" />
                    <PHDetailSectionContainer>
                        <PHDetailSectionTitleContainer>
                            <Text size="h2">배송지 정보</Text>
                        </PHDetailSectionTitleContainer>
                        <PHDetailContentsContainer>
                            <PHDetailLocationContainer>
                                <Text size="h3">
                                    {orderInfo.address.receiver}
                                </Text>
                                <Text>
                                    {orderInfo.address.main_address}
                                    <br />
                                    {orderInfo.address.sub_address}
                                </Text>
                                <Text>
                                    {formatPhoneNumber(
                                        orderInfo.address.phone_number,
                                    )}
                                </Text>
                            </PHDetailLocationContainer>
                        </PHDetailContentsContainer>
                    </PHDetailSectionContainer>
                    <Gap height="16px" />
                    <PHDetailSectionContainer>
                        <PHDetailSectionTitleContainer>
                            <Text size="h2">주문 금액</Text>
                        </PHDetailSectionTitleContainer>
                        <PHDetailContentsContainer>
                            <PHDetailPriceContainer>
                                <Text color="gray4">상품금액</Text>
                                <Text color="gray4">
                                    {(
                                        totalPrice - shipmentFee
                                    ).toLocaleString()}{' '}
                                    원
                                </Text>
                            </PHDetailPriceContainer>
                            <PHDetailPriceContainer>
                                <Text color="gray4">배송비</Text>
                                <Text color="gray4">
                                    {shipmentFee.toLocaleString()} 원
                                </Text>
                            </PHDetailPriceContainer>
                            <PHDetailPriceContainer>
                                <Text color="gray4">포인트 사용</Text>
                                <Text color="gray4">
                                    {(-orderInfo.used_point).toLocaleString()}{' '}
                                    원
                                </Text>
                            </PHDetailPriceContainer>
                            <Gap height="32px" />
                            <PHDetailPriceContainer>
                                <Text size="h3">총 결제 금액</Text>
                                <Text size="h3">
                                    {(
                                        orderInfo.total_price -
                                        orderInfo.used_point
                                    ).toLocaleString()}{' '}
                                    원
                                </Text>
                            </PHDetailPriceContainer>
                            {paymentResult.receipt?.url && (
                                <PHDetailPriceContainer>
                                    <Text>영수증</Text>
                                    <Text
                                        color="orange2"
                                        onClick={() =>
                                            paymentResult.receipt
                                                ? openExternalBrowser(
                                                      paymentResult.receipt.url,
                                                  )
                                                : null
                                        }
                                    >
                                        보러가기
                                    </Text>
                                </PHDetailPriceContainer>
                            )}
                        </PHDetailContentsContainer>
                    </PHDetailSectionContainer>
                    <Gap height="16px" />
                    {paymentResult.virtualAccount && (
                        <PHDetailSectionContainer>
                            <PHDetailSectionTitleContainer>
                                <Text size="h2">계좌 정보</Text>
                            </PHDetailSectionTitleContainer>
                            <PHDetailContentsContainer>
                                <Text size="h3">입금 계좌</Text>
                                <Gap height="8px" />
                                <PHDetailAccountContainer>
                                    <Text>계좌 번호</Text>
                                    <Text>
                                        {
                                            paymentResult.virtualAccount
                                                .accountNumber
                                        }
                                    </Text>
                                </PHDetailAccountContainer>
                                <PHDetailAccountContainer>
                                    <Text>은행</Text>
                                    <Text>
                                        {bankCodeTranslator(
                                            paymentResult.virtualAccount
                                                .bankCode,
                                        )}
                                    </Text>
                                </PHDetailAccountContainer>
                                <PHDetailAccountContainer>
                                    <Text>입금자 명</Text>
                                    <Text>
                                        {
                                            paymentResult.virtualAccount
                                                .customerName
                                        }
                                    </Text>
                                </PHDetailAccountContainer>
                                <PHDetailAccountContainer>
                                    <Text>입금 기한</Text>
                                    <Text>
                                        {convertTime(
                                            paymentResult.virtualAccount
                                                .dueDate,
                                            'minute',
                                        )}
                                        {paymentResult.virtualAccount.expired &&
                                            `(만료)`}
                                    </Text>
                                </PHDetailAccountContainer>
                                <Gap height="16px" />
                                <Text size="h3">환불 계좌</Text>
                                <Gap height="4px" />
                                <PHDetailCancelAlertContainer>
                                    <PHDetailIconBox>
                                        <Text color="white" size="c1">
                                            !
                                        </Text>
                                    </PHDetailIconBox>
                                    <Gap width="8px" />
                                    <PHDetailCancelTextContainer>
                                        <Text size="c1">
                                            주문을 취소하시려면 환불 계좌 정보를
                                            입력하세요
                                        </Text>
                                        <Text size="c1">
                                            환불 계좌 정보를 정확하게 입력하시
                                            않으면 환불이 진행되지 않아요
                                        </Text>
                                        <Text size="c1">
                                            계좌이체의 경우, 환불까지 약 2일
                                            소요돼요
                                        </Text>
                                    </PHDetailCancelTextContainer>
                                </PHDetailCancelAlertContainer>
                                <Gap height="8px" />
                                <TextBox>
                                    <Text>계좌 번호</Text>
                                    <TextField
                                        width="100%"
                                        placeholder="'-' 없이 숫자만 입력해주세요"
                                        type="number"
                                        value={refundAccount}
                                        onChange={onChangeRefundAccount}
                                    />
                                </TextBox>
                                <Gap height="4px" />
                                <TextBox>
                                    <Text>은행</Text>
                                    <PHDetailBankSelectButton
                                        onClick={() =>
                                            setShowBankCodeBottomDrawer(true)
                                        }
                                    >
                                        {refundBankCode ? (
                                            <Text>
                                                {bankCodeTranslator(
                                                    refundBankCode,
                                                )}
                                            </Text>
                                        ) : (
                                            <Text color="gray2">
                                                은행을 선택해주세요
                                            </Text>
                                        )}

                                        <CaretDownIcon />
                                    </PHDetailBankSelectButton>
                                </TextBox>
                                <Gap height="4px" />
                                <TextBox>
                                    <Text>예금주 명</Text>
                                    <TextField
                                        width="100%"
                                        placeholder="예금주 명을 입력하세요"
                                        value={refundHolder}
                                        onChange={onChangeRefundHolder}
                                    />
                                </TextBox>
                            </PHDetailContentsContainer>
                        </PHDetailSectionContainer>
                    )}
                    {paymentResult.virtualAccount && <Gap height="16px" />}
                    <PHDetailSectionContainer>
                        <PHDetailSectionTitleContainer>
                            <Text size="h2">문의하기</Text>
                        </PHDetailSectionTitleContainer>
                        <PHDetailContentsContainer>
                            <PHDetailCancelAlertContainer>
                                <PHDetailIconBox>
                                    <Text color="white" size="c1">
                                        !
                                    </Text>
                                </PHDetailIconBox>
                                <Gap width="8px" />
                                <PHDetailCancelTextContainer>
                                    <Text size="c1">
                                        배송중 단계부터는 주문 취소를 할 수
                                        없어요
                                    </Text>
                                    <Text size="c1">
                                        교환, 반품, 변경 등 문의가 필요할 경우
                                        앤서록 카카오톡으로 문의해주세요
                                    </Text>
                                </PHDetailCancelTextContainer>
                            </PHDetailCancelAlertContainer>
                            <Gap height="16px" />
                            <PHDetailCancelButtonContainer>
                                <Button
                                    height="48px"
                                    color="gray"
                                    onClickButton={() =>
                                        openExternalBrowser(
                                            'https://pf.kakao.com/_nxeBrxj/chat',
                                        )
                                    }
                                >
                                    문의하기
                                </Button>
                                <Gap width="8px" />
                                <Button
                                    height="48px"
                                    onClickButton={() =>
                                        setShowOrderCancelModal(true)
                                    }
                                    disabled={disableCancelButton()}
                                >
                                    주문 취소하기
                                </Button>
                                <Gap height="4px" />
                            </PHDetailCancelButtonContainer>
                        </PHDetailContentsContainer>
                    </PHDetailSectionContainer>
                </PHDetailContainer>
            )}
            <BottomDrawer
                show={showBankCodeBottomDrawer}
                closeOnClickOutside
                onClose={() => setShowBankCodeBottomDrawer(false)}
                title="환불 계좌 은행 선택"
            >
                <PHDetailBankCodeContainer>
                    {bankCodes.map((code, i) => (
                        <PHDetailBankCodeBox
                            key={code}
                            chosen={code === refundBankCode}
                            onClick={() => chooseRefundBankCode(code)}
                        >
                            <Text size="b2">
                                {bankCodeTranslator(code).replace(/\(/g, ' (')}
                            </Text>
                        </PHDetailBankCodeBox>
                    ))}
                </PHDetailBankCodeContainer>
            </BottomDrawer>
            <BaseModal
                show={showOrderCancelModal}
                closeOnClickOutside
                onClose={() => setShowOrderCancelModal(false)}
                title="주문 취소"
                customImage={FinanceImage}
            >
                <Text>주문을 취소하시겠어요?</Text>
                <TextField
                    isTextarea
                    width="100%"
                    value={cancelReason}
                    onChangeTextArea={onChangeCancelReason}
                    placeholder={`취소 사유를 알려주세요\n보다 더 나은 상품을 보여드릴게요`}
                />
                <Gap height="32px" />
                <PHDetailModalButtonContainer>
                    <Button
                        onClickButton={() => setShowOrderCancelModal(false)}
                        height="48px"
                        color="gray"
                    >
                        닫기
                    </Button>
                    <Gap width="8px" />
                    <Button height="48px" onClickButton={() => cancelOrder()}>
                        취소하기
                    </Button>
                </PHDetailModalButtonContainer>
            </BaseModal>
        </MainLayout>
    );
};
