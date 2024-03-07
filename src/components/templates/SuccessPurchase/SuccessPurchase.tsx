/* eslint-disable */
import Image from 'next/image';
import { useAsyncEffect } from '@Hooks/useAsyncEffect';
import { BaseModal } from '@Molecules/BaseModal';
import { MainLayout } from '@Organisms/MainLayout';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { useRequest } from '@Hooks/useRequest';

import { Buffer } from 'buffer';
import {
    SuccessContainer,
    SuccessSectionContainer,
    SuccessContentsContainer,
    SuccessSectionTitleBox,
    SuccessItemContainer,
    SuccessItemImageBox,
    SuccessItemRightContainer,
    SuccessItemInfoContainer,
    SuccessPaymentRowContainer,
    SuccessDeliveryRowContainer,
    SuccessButtonContainer,
    SuccessModalContainer,
    SuccessModalButtonContainer,
} from './SuccessPurchase.styled';
import { Gap } from '@Styles/App.styled';
import { Text } from '@Atoms/Typography';
import {
    BankCodeType,
    CardCodeType,
    IOrderInfo,
    IPayment,
    PaymentStatusType,
} from '@Types/types';
import { paymentStatusTranslator } from '@Functions/paymentStatusTranslator';
import { totalShipmentFee } from '@Functions/paymentCalculator';
import { Button } from '@Atoms/Button';
import { convertTime } from '@Functions/convertTime';
import {
    bankCodeTranslator,
    cardCodeTranslator,
} from '@Functions/codeTranslator';
import { Container } from '@Atoms/Container';
import Link from 'next/link';
import LifeBuoyImage from '@Images/lifebuoy.png';
import { LoadingContainer, SpinLoader } from '@Atoms/Loading';
import * as ga from '../../../lib/ga/gtag';
import { orderedGiftsArrayMaker } from '@Functions/orderedGiftsArrayMaker';
import { dummyOrderInfo, dummyPaymentResult } from '@Constants/dummyObjects';
import { useFlutter } from '@Hooks/useFlutter';

export const SuccessPurchase = () => {
    const router = useRouter();
    const { paymentType, orderId, paymentKey, amount } = router.query;
    const { request, loading } = useRequest();
    const { openExternalBrowser } = useFlutter();

    const [orderInfo, setOrderInfo] = useState<IOrderInfo>(dummyOrderInfo);
    const [shipmentFee, setShipmentFee] = useState(0);
    const [paymentResult, setPaymentResult] =
        useState<IPayment>(dummyPaymentResult);
    const [showPaymentFailureModal, setShowPaymentFailureModal] =
        useState(false);

    // calculate shipment fee on free gift
    useEffect(() => {
        if (orderInfo.total_price === 0) {
            setShipmentFee(0);
        } else {
            setShipmentFee(
                totalShipmentFee(
                    orderedGiftsArrayMaker(orderInfo),
                    orderInfo.address.postal_code,
                ),
            );
        }
    }, [orderInfo]);

    const goToCart = async () => {
        // 비동기 잘 가는지 확인
        const orderCancelRes = request({
            url: `/api/order/${orderId}`,
            method: 'DELETE',
        });
        setShowPaymentFailureModal(false);
        router.push('/mall?show=cart');
    };

    const askAnswerlog = async () => {
        const orderDeleteRes = request({
            url: `/api/order/${orderId}`,
            method: 'DELETE',
        });
        setShowPaymentFailureModal(false);
        openExternalBrowser('https://pf.kakao.com/_nxeBrxj/chat');
    };

    useAsyncEffect(async () => {
        if (orderId && paymentType && paymentKey && amount) {
            const paymentData = {
                paymentType: paymentType,
                order_id: orderId,
                paymentKey: paymentKey,
                amount: parseInt(amount as string),
                // auth: '',
            };

            const orderRes = await request({
                url: `/api/order/specific/${orderId}`,
                method: 'GET',
            });

            if (orderRes) {
                let orderInfoTemp: IOrderInfo = orderRes.data;
                setOrderInfo(orderInfoTemp);
                ga.event({
                    action: 'purchase',
                    params: {
                        currency: 'KRW',
                        transaction_id: orderId,
                        value:
                            orderInfoTemp.total_price -
                            totalShipmentFee(
                                orderedGiftsArrayMaker(orderInfoTemp),
                                orderInfoTemp.address.postal_code,
                            ),
                        shipping: totalShipmentFee(
                            orderedGiftsArrayMaker(orderInfoTemp),
                            orderInfoTemp.address.postal_code,
                        ),
                        items: orderedGiftsArrayMaker(orderInfoTemp).map(
                            (item) => {
                                return {
                                    item_id: item.item._id,
                                    item_name: item.item.title,
                                    item_brand:
                                        item.item.detail_info.manufacturer,
                                    price: item.item.discount_rate
                                        ? item.item.retail_price
                                        : item.item.price,
                                    discount: item.item.discount_rate
                                        ? item.item.retail_price -
                                          item.item.price
                                        : 0,
                                    quantity: item.amount,
                                };
                            },
                        ),
                    },
                });
                if (
                    orderInfoTemp.total_price - orderInfoTemp.used_point ===
                    paymentData.amount
                ) {
                    // amount === 0, 즉 전액 포인트 또는 쿠폰의 사은품으로 구매했을 경우, 똑같은 approval POST 요청을 이용하지만 toss payment와 연동되는 결제는 시행하지 않는다. payment res 객체는 method와 status, 날짜 관련 제외 모두 null
                    const reqPaymentComplete = {
                        ...paymentData,
                        used_point: orderInfoTemp.used_point,
                    };
                    const paymentCompleteRes = await request({
                        url: `/api/order/approval`,
                        method: 'POST',
                        data: reqPaymentComplete,
                    });
                    if (paymentCompleteRes) {
                        console.log(paymentCompleteRes.data);
                        if (
                            paymentCompleteRes.data.failure != null &&
                            paymentCompleteRes.data.failure.code
                        ) {
                            if (
                                paymentCompleteRes.data.failure.code ===
                                'LACK_OF_STOCK'
                            ) {
                                // 재고처리 해야하는데 안정했네
                                // 재고 부족으로 인한 주문 취소
                                setShowPaymentFailureModal(true);
                            } else {
                                // 새로고침 하거나 나중에 다시 들어왔을 때
                                const paymentLookupRes = await request({
                                    url: `/api/order/lookup`,
                                    method: 'POST',
                                    data: {
                                        paymentKey: paymentData.paymentKey,
                                    },
                                });

                                if (paymentLookupRes) {
                                    console.log(paymentLookupRes.data);
                                    setPaymentResult(paymentLookupRes.data);
                                } else {
                                    // order/lookup 오류로 인한 주문 취소
                                    setShowPaymentFailureModal(true);
                                }
                            }
                        } else {
                            setPaymentResult(paymentCompleteRes.data);
                        }
                    } else {
                        // order/approval Error로 인한 주문 취소
                        setShowPaymentFailureModal(true);
                    }
                } else {
                    // 데이터 불일치로 인한 주문 취소
                    setShowPaymentFailureModal(true);
                }
            }
        }
    }, [router]);

    return (
        <MainLayout hideBottomNav hideBackButton title="구매 완료">
            {loading && (
                <LoadingContainer>
                    <SpinLoader />
                </LoadingContainer>
            )}
            {!loading && (
                <SuccessContainer>
                    <SuccessSectionContainer>
                        <Text size="h2">주문이 완료되었습니다.</Text>
                        <Gap height="8px" />
                        <Text>
                            주문번호 <Text color="orange2">{orderId}</Text>
                        </Text>
                    </SuccessSectionContainer>
                    <Gap height="22px" />
                    <SuccessSectionContainer>
                        <SuccessSectionTitleBox>
                            <Text size="h2">
                                주문 상품 정보 /{' '}
                                <Text size="h2" color="orange2">
                                    {orderedGiftsArrayMaker(orderInfo).length}개
                                </Text>{' '}
                                상품
                            </Text>
                        </SuccessSectionTitleBox>
                        <SuccessContentsContainer>
                            {orderedGiftsArrayMaker(orderInfo).map(
                                (item, index) => (
                                    <SuccessItemContainer>
                                        <SuccessItemImageBox>
                                            <Image
                                                src={item.item.image_url[0]}
                                                alt="thumbnail"
                                                layout="fill"
                                            />
                                        </SuccessItemImageBox>
                                        <SuccessItemRightContainer>
                                            <SuccessItemInfoContainer>
                                                <Text size="h2">
                                                    {item.item.title}
                                                </Text>
                                                <Text>
                                                    {item.current_options
                                                        .length > 0 && (
                                                        <Text>
                                                            옵션 :{' '}
                                                            {item.current_options.map(
                                                                (option, i) => (
                                                                    <Text>
                                                                        [
                                                                        {
                                                                            option.option_name
                                                                        }
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
                                                    {item.amount}개
                                                </Text>
                                            </SuccessItemInfoContainer>
                                            <Text>
                                                {item.price.toLocaleString()} 원
                                            </Text>
                                        </SuccessItemRightContainer>
                                    </SuccessItemContainer>
                                ),
                            )}
                        </SuccessContentsContainer>
                    </SuccessSectionContainer>
                    <Gap height="22px" />
                    <SuccessSectionContainer>
                        <SuccessSectionTitleBox>
                            <Text size="h2">결제 정보</Text>
                        </SuccessSectionTitleBox>
                        <SuccessContentsContainer>
                            <SuccessPaymentRowContainer>
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
                            </SuccessPaymentRowContainer>
                            <SuccessPaymentRowContainer>
                                <Text>결제 방법</Text>
                                <Text>{paymentResult.method}</Text>
                            </SuccessPaymentRowContainer>
                            {paymentResult.method === '카드' && (
                                <Container>
                                    <SuccessPaymentRowContainer>
                                        <Text>카드사</Text>
                                        <Text>
                                            {cardCodeTranslator(
                                                paymentResult.card
                                                    ?.acquirerCode as CardCodeType,
                                            ) ||
                                                cardCodeTranslator(
                                                    paymentResult.card
                                                        ?.issuerCode as CardCodeType,
                                                )}
                                        </Text>
                                    </SuccessPaymentRowContainer>
                                    <SuccessPaymentRowContainer>
                                        <Text>카드 유형</Text>
                                        <Text>
                                            {paymentResult.card?.cardType}
                                        </Text>
                                    </SuccessPaymentRowContainer>
                                    <SuccessPaymentRowContainer>
                                        <Text>할부</Text>
                                        <Text>
                                            {
                                                paymentResult.card
                                                    ?.installmentPlanMonths
                                            }{' '}
                                            개월
                                        </Text>
                                    </SuccessPaymentRowContainer>
                                </Container>
                            )}
                            {paymentResult.method === '휴대폰' && (
                                <Container>
                                    <SuccessPaymentRowContainer>
                                        <Text>결제 번호</Text>
                                        <Text>
                                            {
                                                paymentResult.mobilePhone
                                                    ?.customerMobilePhone
                                            }
                                        </Text>
                                    </SuccessPaymentRowContainer>
                                </Container>
                            )}
                            {paymentResult.method === '간편결제' && (
                                <Container>
                                    <SuccessPaymentRowContainer>
                                        <Text>결제 유형</Text>
                                        <Text>
                                            {paymentResult.easyPay?.provider}
                                        </Text>
                                    </SuccessPaymentRowContainer>
                                    <Gap />
                                </Container>
                            )}
                            {paymentResult.method === '가상계좌' && (
                                <Container>
                                    <SuccessPaymentRowContainer>
                                        <Text>입금 계좌</Text>
                                        <Text>
                                            {
                                                paymentResult.virtualAccount
                                                    ?.accountNumber
                                            }
                                        </Text>
                                    </SuccessPaymentRowContainer>
                                    <SuccessPaymentRowContainer>
                                        <Text>은행</Text>
                                        <Text>
                                            {bankCodeTranslator(
                                                paymentResult.virtualAccount
                                                    ?.bankCode as BankCodeType,
                                            )}
                                        </Text>
                                    </SuccessPaymentRowContainer>
                                    <SuccessPaymentRowContainer>
                                        <Text>입금자 명</Text>
                                        <Text>
                                            {
                                                paymentResult.virtualAccount
                                                    ?.customerName
                                            }
                                        </Text>
                                    </SuccessPaymentRowContainer>
                                    <SuccessPaymentRowContainer>
                                        <Text>입금 기한</Text>
                                        <Text>
                                            {convertTime(
                                                paymentResult.virtualAccount
                                                    ?.dueDate,
                                                'minute',
                                            )}
                                        </Text>
                                    </SuccessPaymentRowContainer>
                                </Container>
                            )}
                            <SuccessPaymentRowContainer>
                                <Text>주문 상태</Text>
                                <Text>
                                    {paymentStatusTranslator(
                                        paymentResult.status as PaymentStatusType,
                                    )}
                                </Text>
                            </SuccessPaymentRowContainer>
                            <SuccessPaymentRowContainer>
                                <Text>주문 접수 일시</Text>
                                <Text>
                                    {convertTime(
                                        paymentResult.requestedAt as string,
                                        'minute',
                                    )}
                                </Text>
                            </SuccessPaymentRowContainer>
                            <SuccessPaymentRowContainer>
                                <Text>총 상품 금액</Text>
                                <Text>
                                    {(
                                        orderInfo.total_price - shipmentFee
                                    ).toLocaleString()}{' '}
                                    원
                                </Text>
                            </SuccessPaymentRowContainer>
                            <SuccessPaymentRowContainer>
                                <Text>배송비</Text>
                                <Text>{shipmentFee.toLocaleString()} 원</Text>
                            </SuccessPaymentRowContainer>
                            <SuccessPaymentRowContainer>
                                <Text>포인트 사용</Text>
                                <Text>
                                    {(-orderInfo.used_point).toLocaleString()}{' '}
                                    원
                                </Text>
                            </SuccessPaymentRowContainer>
                            <SuccessPaymentRowContainer>
                                <Text>결제 금액</Text>
                                <Text>
                                    {(
                                        orderInfo.total_price -
                                        orderInfo.used_point
                                    ).toLocaleString()}{' '}
                                    원
                                </Text>
                            </SuccessPaymentRowContainer>
                            {paymentResult.cashReceipt?.receiptUrl && (
                                <Container>
                                    <SuccessPaymentRowContainer>
                                        <Text>현금 영수증</Text>
                                        <Text>
                                            <Text
                                                color="orange2"
                                                onClick={() =>
                                                    paymentResult.cashReceipt
                                                        ? openExternalBrowser(
                                                              paymentResult
                                                                  .cashReceipt
                                                                  .receiptUrl,
                                                          )
                                                        : null
                                                }
                                            >
                                                보러가기
                                            </Text>
                                        </Text>
                                    </SuccessPaymentRowContainer>
                                </Container>
                            )}
                        </SuccessContentsContainer>
                    </SuccessSectionContainer>
                    <Gap height="22px" />
                    <SuccessSectionContainer>
                        <SuccessSectionTitleBox>
                            <Text size="h2">배송 정보</Text>
                        </SuccessSectionTitleBox>
                        <SuccessContentsContainer>
                            <SuccessDeliveryRowContainer>
                                <Text>받으시는 분</Text>
                                <Text>{orderInfo.address.receiver}</Text>
                            </SuccessDeliveryRowContainer>
                            <SuccessDeliveryRowContainer>
                                <Text>휴대폰 번호</Text>
                                <Text>{orderInfo.address.phone_number}</Text>
                            </SuccessDeliveryRowContainer>
                            <SuccessDeliveryRowContainer>
                                <Text>주소</Text>
                                <Text>
                                    {orderInfo.address.main_address}
                                    <br />
                                    {orderInfo.address.sub_address}
                                </Text>
                            </SuccessDeliveryRowContainer>
                            <SuccessDeliveryRowContainer>
                                <Text>배송 메세지</Text>
                                <Text>{orderInfo.address.message}</Text>
                            </SuccessDeliveryRowContainer>
                        </SuccessContentsContainer>
                    </SuccessSectionContainer>
                    <SuccessButtonContainer>
                        <Button
                            height="48px"
                            color="gray"
                            onClickButton={() => router.push('/')}
                        >
                            돌아가기
                        </Button>
                        <Gap width="8px" />
                        <Button
                            height="48px"
                            onClickButton={() =>
                                router.push('/purchase-history')
                            }
                        >
                            구매내역 확인
                        </Button>
                    </SuccessButtonContainer>
                </SuccessContainer>
            )}
            <BaseModal
                show={showPaymentFailureModal}
                onClose={() => setShowPaymentFailureModal(false)}
                customImage={LifeBuoyImage}
            >
                <SuccessModalContainer>
                    <Text>상품 결제 중 문제가 발생했어요</Text>
                    <Gap height="8px" />
                    <Text size="b2">
                        잠시 후 다시 시도하시거나,
                        <br /> 앤서록에 문의해주세요
                    </Text>
                    <Gap height="32px" />
                    <SuccessModalButtonContainer>
                        <Button
                            onClickButton={goToCart}
                            height="48px"
                            color="gray"
                        >
                            다시 결제하기
                        </Button>
                        <Gap width="8px" />
                        <Button height="48px" onClickButton={askAnswerlog}>
                            문의하기
                        </Button>
                    </SuccessModalButtonContainer>
                </SuccessModalContainer>
            </BaseModal>
        </MainLayout>
    );
};
