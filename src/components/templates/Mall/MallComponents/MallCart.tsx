/* eslint-disable */

import { useState, useEffect } from 'react';
import {
    IIncartGift,
    IncartGiftStockType,
    SelectedGiftOptionType,
    UpdateCartReqType,
} from '@Types/types';
import { MallMenuType } from '../Mall';
import { useRouter } from 'next/router';
import { useRequest } from '@Hooks/useRequest';
import { CheckBox, CheckBoxValue } from '@Atoms/CheckBox/CheckBox';
import { useAsyncEffect } from '@Hooks/useAsyncEffect';
import {
    MallCartBodyContainer,
    MallCartContainer,
    MallCartEmptyContainer,
    MallCartHeaderContainer,
    MallCartItemContainer,
    MallCartItemContentContainer,
    MallCartItemDetailContainer,
    MallCartItemImageBox,
    MallCartItemLeftContainer,
    MallCartItemPurchaseContainer,
    MallCartItemQuantityContainer,
    MallCartItemRightContainer,
    MallCartItemSoldoutButtonContainer,
    MallCartItemSoldoutContainer,
    MallCartModalContainer,
    MallCartSelectedPurchaseBox,
    MallCartSumupContainer,
    MallCartSumupDetailContainer,
    MallCartSumupDetailInnerContainer,
    MallCartSumupTotalContainer,
    MallCartTextBorderBox,
} from '../Mall.styled';
import { Text } from '@Atoms/Typography';
import { Gap } from '@Styles/App.styled';
import { Button } from '@Atoms/Button';
import Image from 'next/image';
import QuantityPlusIcon from '@Images/icons/quantity_plus.svg';
import QuantityMinusIcon from '@Images/icons/quantity_minus.svg';
import QuantityEraseIcon from '@Images/icons/quantity_erase.svg';
import BasketImage from '@Images/basket.png';
import InformImage from '@Images/inform.png';
import { Box } from '@Atoms/Box';
import {
    giftPriceWithOptions,
    totalQuantityPrice,
    totalShipmentFee,
} from '@Functions/paymentCalculator';
import { BaseModal } from '@Molecules/BaseModal';
import { RowContainer } from '@Atoms/RowContainer';
import * as ga from '../../../../lib/ga/gtag';
import { useActionOnTouch } from '@Hooks/useActionOnTouch';

interface MallCartProp {
    incartGifts: IIncartGift[];
    setIncartGifts: (incartGifts: IIncartGift[]) => void;
    setMenu: (menu: MallMenuType) => void;
}

export const MallCart = ({
    incartGifts,
    setIncartGifts,
    setMenu,
}: MallCartProp) => {
    const router = useRouter();
    const { request } = useRequest();
    const { actionOnTouchEnd } = useActionOnTouch();
    const [selectedGifts, setSelectedGifts] = useState<IIncartGift[]>([]);
    const [incartStocks, setIncartStocks] = useState<IncartGiftStockType[]>([]);
    const [showStockChangeModal, setShowStockChangeModal] = useState(false);
    const [checkedGiftsJson, setCheckedGiftsJson] = useState<CheckBoxValue[]>(
        [],
    );
    const [allGiftsJson, setAllGiftsJson] = useState<CheckBoxValue[]>([]);
    const [targetGiftIndex, setTargetGiftIndex] = useState(0);
    const [showRestockModal, setShowRestockModal] = useState(false);

    // save stock data
    useAsyncEffect(async () => {
        const stockRes = await request({
            url: '/api/stock/incart',
            method: 'GET',
        });
        if (!stockRes || stockRes.status !== 200) {
            console.log('stock get error');
        } else {
            setIncartStocks(stockRes.data);
        }
    }, []);

    // detect stock and deleted option change
    useAsyncEffect(async () => {
        let changeDetector = false;
        // after data has been fully received
        if (incartStocks.length === incartGifts.length) {
            let incartGiftsTemp = [...incartGifts];
            incartGiftsTemp.forEach((gift, index) => {
                // 1. 재고가 선택한 수량보다 적을 경우
                if (gift.amount > incartStockFinder(gift)) {
                    gift.amount = incartStockFinder(gift);
                    setShowStockChangeModal(true);
                    changeDetector = true;
                    // 2. 상품이 품절되었을 경우
                    if (incartStockFinder(gift) === 0) {
                        gift.amount = 0;
                        gift.selected = false;
                    }
                }
                // 3. 상품이 삭제되었을 경우
                if (incartDeletedOptionCheck(gift) && gift.amount > 0) {
                    gift.amount = 0;
                    gift.selected = false;
                    setShowStockChangeModal(true);
                    changeDetector = true;
                }
                // 4. 0으로 상품을 유지하다가 재입고가 되었고 해당 옵션이 삭제가 안되었을 경우
                // 이 경우 삭제된 상품이 다시 만들어졌을 때도 포함한다.
                if (
                    gift.amount === 0 &&
                    incartStockFinder(gift) > 0 &&
                    !incartDeletedOptionCheck(gift)
                ) {
                    gift.amount = 1;
                    setShowStockChangeModal(true);
                    changeDetector = true;
                }
            });
            if (changeDetector) {
                let fitStockReq: UpdateCartReqType[] = [];
                incartGiftsTemp.forEach((gift, index) => {
                    let reqObject = {
                        id: gift.item._id,
                        options: gift.current_options,
                        num: gift.amount,
                        selected: gift.selected,
                    };
                    fitStockReq.push(reqObject);
                });

                const fitStockRes = await request({
                    url: `/api/user/update_cart`,
                    method: 'PUT',
                    data: fitStockReq,
                });
                if (!fitStockRes || fitStockRes.status != 200) {
                    console.log('fit stock error');
                } else {
                    setIncartGifts(fitStockRes.data);
                }
            }
        }
    }, [incartStocks]);

    // for selectedGifts
    useEffect(() => {
        let selectedGiftsTemp = incartGifts.filter(
            (gift, index) => gift.selected === true,
        );
        setSelectedGifts(selectedGiftsTemp);
    }, [incartGifts]);

    // for checkbox id
    useEffect(() => {
        let allGiftsJsonTemp: CheckBoxValue[] = [];
        let checkedGiftsJsonTemp: CheckBoxValue[] = [];
        incartGifts.forEach((gift, index) => {
            if (gift.amount > 0 && !incartDeletedOptionCheck(gift)) {
                let giftJson = JSON.stringify(gift);
                allGiftsJsonTemp.push(giftJson);
                if (gift.selected) {
                    checkedGiftsJsonTemp.push(giftJson);
                }
            }
        });
        setAllGiftsJson(allGiftsJsonTemp);
        setCheckedGiftsJson(checkedGiftsJsonTemp);
    }, [incartGifts, incartStocks]);

    const incartStockFinder = (gift: IIncartGift) => {
        let targetStockIdChecked = incartStocks.filter(
            (stock, index) => stock._id === gift.item._id,
        );
        if (targetStockIdChecked.length > 0) {
            let targetStockOptionsChecked = targetStockIdChecked.find(
                (stock, index) =>
                    stock.current_options.every((option, index) => {
                        let sameOptionName: boolean = false;
                        let sameOptionDetail: boolean = false;

                        let targetOption = gift.current_options.find(
                            (option, j) =>
                                option.option_name === option.option_name,
                        );
                        if (targetOption != (null || undefined)) {
                            sameOptionName = true;
                            sameOptionDetail =
                                targetOption.option_detail.option_value ===
                                    option.option_detail.option_value &&
                                targetOption.option_detail.option_price ===
                                    option.option_detail.option_price;
                        }

                        return sameOptionName && sameOptionDetail;
                    }),
            );
            if (targetStockOptionsChecked) {
                return targetStockOptionsChecked.stock_amount;
            } else {
                // error, no match by options
                return -2;
            }
        } else {
            // error, no match by id
            return -1;
        }
    };

    const incartDeletedOptionCheck = (gift: IIncartGift) => {
        let targetStockIdChecked = incartStocks.filter(
            (stock, index) => stock._id === gift.item._id,
        );
        if (targetStockIdChecked.length > 0) {
            let targetStockOptionsChecked = targetStockIdChecked.find(
                (stock, index) =>
                    stock.current_options.every((option, index) => {
                        let sameOptionName: boolean = false;
                        let sameOptionDetail: boolean = false;

                        let targetOption = gift.current_options.find(
                            (option, j) =>
                                option.option_name === option.option_name,
                        );
                        if (targetOption != (null || undefined)) {
                            sameOptionName = true;
                            sameOptionDetail =
                                targetOption.option_detail.option_value ===
                                    option.option_detail.option_value &&
                                targetOption.option_detail.option_price ===
                                    option.option_detail.option_price;
                        }

                        return sameOptionName && sameOptionDetail;
                    }),
            );
            if (targetStockOptionsChecked) {
                return targetStockOptionsChecked.deleted;
            } else {
                // error, no match by options
                return false;
            }
        } else {
            // error, no match by id
            return false;
        }
    };

    const customCheckHandler = async (
        checked: boolean,
        value?: CheckBoxValue,
    ) => {
        if (value === 'all') {
            let checkAllReq: UpdateCartReqType[] = [];
            incartGifts.forEach((incartGift, index) => {
                let reqObject = {
                    id: incartGift.item._id,
                    selected: checked,
                    options: incartGift.current_options,
                };
                checkAllReq.push(reqObject);
            });

            const checkAllRes = await request({
                url: `/api/user/update_cart`,
                method: 'PUT',
                data: checkAllReq,
            });
            if (checkAllRes) {
                let incartGiftsTemp = [...incartGifts];
                incartGiftsTemp.forEach((gift, index) => {
                    gift.selected = checked;
                });
                setIncartGifts(incartGiftsTemp);
            }
        } else {
            let targetId: string = '';
            let targetOptions: SelectedGiftOptionType[] = [];
            if (typeof value === 'string') {
                let targetGift: IIncartGift = JSON.parse(value);
                targetId = targetGift.item._id;
                targetOptions = targetGift.current_options;
            }

            const checkRes = await request({
                url: `/api/user/update_cart`,
                method: 'PUT',
                data: [
                    {
                        id: targetId,
                        selected: checked,
                        options: targetOptions,
                    },
                ],
            });
            if (checkRes) {
                setIncartGifts(checkRes.data);
            }
            if (!checkRes || checkRes?.status != 200) {
                console.log('check system error');
            }
        }
    };
    const quantityControl = async (control: number, index: number) => {
        let incartGiftsTemp = [...incartGifts];
        if (
            control < 0 ||
            incartStockFinder(incartGiftsTemp[index]) >
                incartGiftsTemp[index].amount
        ) {
            incartGiftsTemp[index].amount += control;
            const quantityControlRes = await request({
                url: `/api/user/update_cart`,
                method: 'PUT',
                data: [
                    {
                        id: incartGiftsTemp[index].item._id,
                        num: incartGiftsTemp[index].amount,
                        options: incartGiftsTemp[index].current_options,
                    },
                ],
            });
            if (quantityControlRes) {
                setIncartGifts(incartGiftsTemp);
            }
        }
    };

    const quantityControlDelete = async (index: number) => {
        let incartGiftsTemp = [...incartGifts];
        const quantityControlDeleteRes = await request({
            url: `api/user/${incartGiftsTemp[index].item._id}/delete_cart`,
            method: 'PUT',
            data: { options: incartGiftsTemp[index].current_options },
        });
        if (quantityControlDeleteRes) {
            ga.event({
                action: 'remove_from_cart',
                params: {
                    currency: 'KRW',
                    value: giftPriceWithOptions(incartGiftsTemp[index]),
                    items: [
                        {
                            item_id: incartGiftsTemp[index].item._id,
                            item_name: incartGiftsTemp[index].item.title,
                            item_brand:
                                incartGiftsTemp[index].item.detail_info
                                    .manufacturer,
                            price: incartGiftsTemp[index].item.discount_rate
                                ? incartGiftsTemp[index].item.retail_price
                                : incartGiftsTemp[index].item.price,
                            discount: incartGiftsTemp[index].item.discount_rate
                                ? incartGiftsTemp[index].item.retail_price -
                                  incartGiftsTemp[index].item.price
                                : 0,
                            quantity: 1,
                        },
                    ],
                },
            });
            incartGiftsTemp.splice(index, 1);
            setIncartGifts(incartGiftsTemp);
        }
    };

    const deleteGifts = async () => {
        const delRes = await request({
            url: `/api/user/delete_cart_many`,
            method: 'PUT',
        });
        if (delRes) {
            ga.event({
                action: 'remove_from_cart',
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
            setIncartGifts(delRes.data);
        }
    };
    const purchaseOne = async (targetIndex: number) => {
        let checkOneReq: UpdateCartReqType[] = [];
        incartGifts.forEach((incartGift, index) => {
            let reqObject = {
                id: incartGift.item._id,
                selected: targetIndex === index ? true : false,
                options: incartGift.current_options,
            };
            checkOneReq.push(reqObject);
        });

        const checkOneRes = await request({
            url: `/api/user/update_cart`,
            method: 'PUT',
            data: checkOneReq,
        });
        if (!checkOneRes || checkOneRes.status != 200) {
            console.log('one check error');
        } else {
            ga.event({
                action: 'begin_checkout',
                params: {
                    currency: 'KRW',
                    value: totalQuantityPrice([incartGifts[targetIndex]]).price,
                    items: [
                        {
                            item_id: incartGifts[targetIndex].item._id,
                            item_name: incartGifts[targetIndex].item.title,
                            item_brand:
                                incartGifts[targetIndex].item.detail_info
                                    .manufacturer,
                            price: incartGifts[targetIndex].item.discount_rate
                                ? incartGifts[targetIndex].item.retail_price
                                : incartGifts[targetIndex].item.price,
                            discount: incartGifts[targetIndex].item
                                .discount_rate
                                ? incartGifts[targetIndex].item.retail_price -
                                  incartGifts[targetIndex].item.price
                                : 0,
                            quantity: incartGifts[targetIndex].amount,
                        },
                    ],
                },
            });
            router.push('/purchase');
        }
    };

    const deleteOne = async (gift: IIncartGift) => {
        const delOneRes = await request({
            url: `/api/user/${gift.item._id}/delete_cart`,
            method: 'PUT',
            data: {
                options: gift.current_options,
            },
        });
        if (delOneRes) {
            ga.event({
                action: 'remove_from_cart',
                params: {
                    currency: 'KRW',
                    value: giftPriceWithOptions(gift) * gift.amount,
                    items: [
                        {
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
                        },
                    ],
                },
            });
            setIncartGifts(delOneRes.data);
            // 상품 리스트가 변하였으므로 stock도 재할당
            const stockAgainRes = await request({
                url: '/api/stock/incart',
                method: 'GET',
            });
            if (!stockAgainRes || stockAgainRes.status != 200) {
                console.log('stock get error');
            } else {
                setIncartStocks(stockAgainRes.data);
            }
        }
    };

    const openRestockModal = (index: number) => {
        setTargetGiftIndex(index);
        setShowRestockModal(true);
    };

    // log 'view_cart' event
    useEffect(() => {
        ga.event({
            action: 'view_cart',
            params: {
                currency: 'KRW',
                value: totalQuantityPrice(incartGifts).price,
                items: incartGifts.map((gift) => {
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
    }, [incartGifts]);

    return (
        <MallCartContainer>
            <MallCartHeaderContainer>
                <CheckBox
                    value="all"
                    checkedSet={checkedGiftsJson}
                    setCheckedSet={setCheckedGiftsJson}
                    isAll
                    allOptions={allGiftsJson}
                    width="fit-content"
                    label={`전체선택 (${checkedGiftsJson.length}/${allGiftsJson.length})`}
                    labelSize="c1"
                    noBackground
                    customCheckHandler={customCheckHandler}
                />
                <MallCartTextBorderBox
                    onClick={deleteGifts}
                    onTouchEnd={(e) => actionOnTouchEnd(e, deleteGifts)}
                >
                    <Text size="c1">선택삭제</Text>
                </MallCartTextBorderBox>
            </MallCartHeaderContainer>
            {incartGifts.length === 0 && (
                <MallCartEmptyContainer>
                    <Text size="h2" color="gray4">
                        장바구니에 상품을 담아보세요.
                    </Text>
                    <Gap height="16px" />
                    <Button onClickButton={() => setMenu('recommended')}>
                        쇼핑 계속하기
                    </Button>
                </MallCartEmptyContainer>
            )}
            <MallCartBodyContainer>
                {incartGifts.map((incartGift, index) => (
                    <MallCartItemContainer
                        key={`${incartGift.item._id}${index}`}
                    >
                        {/* 삭제된 상품 */}
                        {incartDeletedOptionCheck(incartGift) && (
                            <MallCartItemSoldoutContainer>
                                <Text size="h2">삭제된 상품이에요</Text>
                                <Gap height="16px" />
                                <MallCartItemSoldoutButtonContainer>
                                    <Button
                                        height="48px"
                                        width="148px"
                                        color="black"
                                        onClickButton={() =>
                                            deleteOne(incartGift)
                                        }
                                    >
                                        삭제하기
                                    </Button>
                                </MallCartItemSoldoutButtonContainer>
                            </MallCartItemSoldoutContainer>
                        )}
                        {/* 품절상품 */}
                        {!incartDeletedOptionCheck(incartGift) &&
                            incartStockFinder(incartGift) === 0 && (
                                <MallCartItemSoldoutContainer>
                                    <Text size="h2">품절되었어요</Text>
                                    <Gap height="16px" />
                                    <MallCartItemSoldoutButtonContainer>
                                        <Button
                                            height="48px"
                                            width="148px"
                                            color="black"
                                            onClickButton={() =>
                                                deleteOne(incartGift)
                                            }
                                        >
                                            삭제하기
                                        </Button>
                                        <Gap width="8px" />
                                        <Button
                                            height="48px"
                                            width="148px"
                                            color="black"
                                            onClickButton={() =>
                                                openRestockModal(index)
                                            }
                                        >
                                            재입고 알림 받기
                                        </Button>
                                    </MallCartItemSoldoutButtonContainer>
                                </MallCartItemSoldoutContainer>
                            )}

                        <Box>
                            {incartStockFinder(incartGift) === 0 ||
                            incartDeletedOptionCheck(incartGift) ? null : (
                                <CheckBox
                                    value={JSON.stringify(incartGift)}
                                    checkedSet={checkedGiftsJson}
                                    setCheckedSet={setCheckedGiftsJson}
                                    noBackground
                                    customCheckHandler={customCheckHandler}
                                />
                            )}
                        </Box>

                        <Gap height="20px" />
                        <MallCartItemContentContainer>
                            <MallCartItemLeftContainer>
                                <MallCartItemImageBox>
                                    <Image
                                        src={incartGift.item.image_url[0]}
                                        alt=""
                                        layout="fill"
                                        objectFit="cover"
                                    />
                                </MallCartItemImageBox>
                                <Gap height="8px" />
                                <MallCartItemQuantityContainer>
                                    {incartGift.amount > 1 ? (
                                        <Button
                                            width="28px"
                                            height="28px"
                                            color="black"
                                            onClickButton={() =>
                                                quantityControl(-1, index)
                                            }
                                        >
                                            <QuantityMinusIcon
                                                width="28px"
                                                height="28px"
                                            />
                                        </Button>
                                    ) : (
                                        <Button
                                            width="28px"
                                            height="28px"
                                            color="white"
                                            onClickButton={() =>
                                                quantityControlDelete(index)
                                            }
                                        >
                                            <QuantityEraseIcon
                                                width="20px"
                                                height="20px"
                                            />
                                        </Button>
                                    )}
                                    <Text>{incartGift.amount}</Text>
                                    {incartStockFinder(incartGift) >
                                    incartGift.amount ? (
                                        <Button
                                            width="28px"
                                            height="28px"
                                            color="white"
                                            onClickButton={() =>
                                                quantityControl(1, index)
                                            }
                                        >
                                            <QuantityPlusIcon
                                                width="28px"
                                                height="28px"
                                            />
                                        </Button>
                                    ) : (
                                        <Button
                                            width="28px"
                                            height="28px"
                                            disabled
                                        />
                                    )}
                                </MallCartItemQuantityContainer>
                            </MallCartItemLeftContainer>
                            <Gap width="8px" />
                            <MallCartItemRightContainer>
                                <MallCartItemDetailContainer>
                                    <Text color="gray3">
                                        {
                                            incartGift.item?.detail_info?.seller
                                                ?.brand
                                        }
                                    </Text>
                                    <Text>{incartGift.item.title}</Text>
                                    <Text>
                                        {giftPriceWithOptions(
                                            incartGift,
                                        ).toLocaleString()}{' '}
                                        원
                                    </Text>
                                    <Gap height="20px" />
                                    {incartGift.current_options.map(
                                        (option, index) => (
                                            <Text>{`[${option.option_name}] ${option.option_detail.option_value}`}</Text>
                                        ),
                                    )}
                                    <Text></Text>
                                </MallCartItemDetailContainer>
                            </MallCartItemRightContainer>
                        </MallCartItemContentContainer>
                        <MallCartItemPurchaseContainer>
                            <Text size="h2">
                                {(
                                    giftPriceWithOptions(incartGift) *
                                    incartGift.amount
                                ).toLocaleString()}{' '}
                                원
                            </Text>
                            <Button
                                width="96px"
                                height="42px"
                                onClickButton={() => {
                                    purchaseOne(index);
                                }}
                            >
                                개별 구매
                            </Button>
                        </MallCartItemPurchaseContainer>
                    </MallCartItemContainer>
                ))}
            </MallCartBodyContainer>
            <MallCartSumupContainer>
                <MallCartSumupDetailContainer>
                    <MallCartSumupDetailInnerContainer>
                        <Text>
                            총 상품금액 (
                            {totalQuantityPrice(selectedGifts).quantity}개)
                        </Text>
                        <Text>
                            <Text size="h2">
                                {totalQuantityPrice(
                                    selectedGifts,
                                ).price.toLocaleString()}
                            </Text>{' '}
                            원
                        </Text>
                    </MallCartSumupDetailInnerContainer>
                    <Gap height="8px" />
                    <MallCartSumupDetailInnerContainer>
                        <Text>총 배송비</Text>
                        <Text>
                            <Text size="h2">
                                {totalQuantityPrice(selectedGifts).price > 0
                                    ? totalShipmentFee(
                                          selectedGifts,
                                      ).toLocaleString()
                                    : 0}
                            </Text>{' '}
                            원
                        </Text>
                    </MallCartSumupDetailInnerContainer>
                    <Text color="gray3" size="c1">
                        * 실제 배송지 입력시{' '}
                        <Text color="orange2" size="c1">
                            도서산간지역 추가비용
                        </Text>
                        이 발생할 수 있습니다.
                    </Text>
                </MallCartSumupDetailContainer>
                <MallCartSumupTotalContainer>
                    <Text size="h2">총 주문금액</Text>
                    <Text>
                        <Text size="h1" color="orange2">
                            {totalQuantityPrice(selectedGifts).price > 0
                                ? (
                                      totalQuantityPrice(selectedGifts).price +
                                      totalShipmentFee(selectedGifts)
                                  ).toLocaleString()
                                : 0}
                        </Text>{' '}
                        원
                    </Text>
                </MallCartSumupTotalContainer>
            </MallCartSumupContainer>
            <MallCartSelectedPurchaseBox>
                <Button
                    onClickButton={() => {
                        ga.event({
                            action: 'begin_checkout',
                            params: {
                                currency: 'KRW',
                                value: totalQuantityPrice(selectedGifts).price,
                                items: selectedGifts.map((gift) => {
                                    return {
                                        item_id: gift.item._id,
                                        item_name: gift.item.title,
                                        item_brand:
                                            gift.item.detail_info.manufacturer,
                                        price: gift.item.discount_rate
                                            ? gift.item.retail_price
                                            : gift.item.price,
                                        discount: gift.item.discount_rate
                                            ? gift.item.retail_price -
                                              gift.item.price
                                            : 0,
                                        quantity: gift.amount,
                                    };
                                }),
                            },
                        });
                        router.push('/purchase');
                    }}
                    disabled={checkedGiftsJson.length === 0}
                >
                    선택상품 구매하기(
                    {totalQuantityPrice(selectedGifts).quantity})
                </Button>
            </MallCartSelectedPurchaseBox>
            <BaseModal
                show={showStockChangeModal}
                onClose={() => setShowStockChangeModal(false)}
                closeOnClickOutside
                customImage={BasketImage}
            >
                <MallCartModalContainer>
                    <Text size="b1">쇼핑하시는 동안 재고가 바뀌었어요</Text>
                    <Gap height="8px" />
                    <Text size="b2">담은 상품의 수량을 확인하세요</Text>
                    <Gap height="32px" />
                    <Button
                        height="48px"
                        onClickButton={() => setShowStockChangeModal(false)}
                    >
                        확인하기
                    </Button>
                </MallCartModalContainer>
            </BaseModal>
            <BaseModal
                show={showRestockModal}
                closeOnClickOutside
                onClose={() => setShowRestockModal(false)}
                customImage={InformImage}
            >
                <MallCartModalContainer>
                    <Text>
                        &quot;{incartGifts[targetGiftIndex]?.item.title}&quot;
                    </Text>
                    <Gap height="8px" />
                    <Text size="b2">
                        상품에 대한 재입고 알림을
                        <br />
                        받으시겠어요?
                        <br />
                        <Text size="c1" color="gray4">
                            아직 공사중인 기능이에요
                        </Text>
                    </Text>
                    <Gap height="32px" />
                    <RowContainer>
                        <Button
                            color="gray"
                            height="48px"
                            onClickButton={() => setShowRestockModal(false)}
                        >
                            취소
                        </Button>
                        <Gap width="8px" />
                        <Button
                            height="48px"
                            onClickButton={() => setShowRestockModal(false)}
                        >
                            받기
                        </Button>
                    </RowContainer>
                </MallCartModalContainer>
            </BaseModal>
        </MallCartContainer>
    );
};
