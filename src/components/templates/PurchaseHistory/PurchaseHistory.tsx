import { MainLayout } from '@Organisms/MainLayout';
import {
    PurchaseHistoryContainer,
    PurchaseHistoryOrderBodyContainer,
    PurchaseHistoryOrderConatiner,
    PurchaseHistoryOrderHeadContainer,
    PurchaseHistoryOrderImageBox,
    PurchaseHistoryOrderInfoContainer,
} from './PurchaseHistory.styled';
import { Text } from '@Atoms/Typography';
import Image from 'next/image';
import CaretRight from '@Images/icons/caret_right.svg';
import { ORANGE2 } from '@Styles/colors';
import Link from 'next/link';
import { Gap } from '@Styles/App.styled';
import { useState, useContext, useEffect } from 'react';
import { IOrderInfo } from '@Types/types';
import { useAsyncEffect } from '@Hooks/useAsyncEffect';
import { useRequest } from '@Hooks/useRequest';
import { AppContext } from '@Pages/_app';
import { LoadingContainer, SpinLoader } from '@Atoms/Loading';
import { convertTime } from '@Functions/convertTime';
import {
    cancelProcessTranslator,
    deliveryProcessTranslator,
    multipleDeliveryProcess,
} from '@Functions/deliveryProcessTranslator';
import { useRouter } from 'next/router';
import { orderedGiftsArrayMaker } from '@Functions/orderedGiftsArrayMaker';
import { useActionOnTouch } from '@Hooks/useActionOnTouch';

export const PurchaseHistory = () => {
    const router = useRouter();
    const { loading, request } = useRequest();
    const { myDatabaseId, myName } = useContext(AppContext);
    const { actionOnTouchEnd } = useActionOnTouch();

    const [orderInfos, setOrderInfos] = useState<IOrderInfo[]>([]);

    // get user's order list
    useAsyncEffect(async () => {
        const orderInfosRes = await request({
            url: `/api/order/history/${myDatabaseId}`,
            method: 'GET',
        });
        if (orderInfosRes) {
            let orderInfosTemp: IOrderInfo[] = [...orderInfosRes.data];
            // 결제 도중 뒤로가기 등으로 인해 결제 취소를 하지 않아서 order DELETE 요청이 되지 않은 경우, 이틀 후 제거되도록 되어있다. 그런 경우 paymentKey가 ''이라서 이것을 필터링해준다.
            let filteredOrderInfos = orderInfosTemp.filter(
                (info) => info.paymentKey !== '',
            );
            setOrderInfos(filteredOrderInfos.reverse());
        } else {
            console.log('failed to get order infos');
        }
    }, [myDatabaseId]);

    return (
        <MainLayout hideBottomNav title="구매 내역">
            {loading && (
                <LoadingContainer>
                    <SpinLoader />
                </LoadingContainer>
            )}
            {!loading && orderInfos.length === 0 && (
                <LoadingContainer>
                    <Text>아직 구매하신 상품이 없습니다</Text>
                </LoadingContainer>
            )}
            {!loading && orderInfos.length > 0 && (
                <PurchaseHistoryContainer>
                    {orderInfos.map((orderInfo, i) => (
                        <PurchaseHistoryOrderConatiner>
                            <PurchaseHistoryOrderHeadContainer
                                onClick={() =>
                                    router.push(
                                        `/purchase-history/${orderInfo.order_id}`,
                                    )
                                }
                                onTouchEnd={(e) =>
                                    actionOnTouchEnd(e, () =>
                                        router.push(
                                            `/purchase-history/${orderInfo.order_id}`,
                                        ),
                                    )
                                }
                            >
                                <Text size="h2">
                                    {convertTime(
                                        orderInfo.order_date,
                                        'dotDate',
                                    )}
                                </Text>
                                <CaretRight
                                    width="24px"
                                    height="24px"
                                    color={ORANGE2}
                                />
                            </PurchaseHistoryOrderHeadContainer>
                            <PurchaseHistoryOrderBodyContainer>
                                <PurchaseHistoryOrderImageBox>
                                    <Image
                                        src={
                                            orderedGiftsArrayMaker(orderInfo)[0]
                                                .item.image_url[0]
                                        }
                                        alt="image"
                                        layout="fill"
                                    />
                                </PurchaseHistoryOrderImageBox>
                                <Gap width="16px" />
                                <PurchaseHistoryOrderInfoContainer>
                                    <Text>
                                        {orderInfo.cancel_info.process !== 0
                                            ? cancelProcessTranslator(
                                                  orderInfo.cancel_info.process,
                                              )
                                            : deliveryProcessTranslator(
                                                  multipleDeliveryProcess(
                                                      orderInfo,
                                                  ).fastest,
                                              )}
                                    </Text>
                                    <Gap height="6px" />
                                    <Text size="h2">
                                        {orderInfo.total_price.toLocaleString()}{' '}
                                        원
                                    </Text>
                                    <Gap height="6px" />
                                    <Text size="b2" color="gray4">
                                        {
                                            orderedGiftsArrayMaker(orderInfo)[0]
                                                .item.title
                                        }{' '}
                                        {orderedGiftsArrayMaker(orderInfo)
                                            .length > 1 &&
                                            `외 ${
                                                orderedGiftsArrayMaker(
                                                    orderInfo,
                                                ).length
                                            }`}
                                    </Text>
                                </PurchaseHistoryOrderInfoContainer>
                            </PurchaseHistoryOrderBodyContainer>
                        </PurchaseHistoryOrderConatiner>
                    ))}
                </PurchaseHistoryContainer>
            )}
        </MainLayout>
    );
};
