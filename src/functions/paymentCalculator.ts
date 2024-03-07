import { IIncartGift, IIncartGiftSelected, IOrderedGift } from '@Types/types';

export const giftPriceWithOptions = (
    gift: IIncartGift | IOrderedGift | IIncartGiftSelected,
) => {
    let price = gift.item.price;
    let optionPrice = 0;
    gift.current_options.forEach((option, index) => {
        optionPrice += option.option_detail.option_price;
    });

    return price + optionPrice;
};
export const totalQuantityPrice = (
    gifts: IIncartGift[] | IOrderedGift[] | IIncartGiftSelected[],
) => {
    let quantity = 0;
    let price = 0;
    gifts.forEach((gift, index) => {
        quantity += gift.amount;
        price += giftPriceWithOptions(gift) * gift.amount;
    });

    return { quantity, price };
};
export const needAdditionalFee = (postalCode: number) => {
    let isIMA: boolean = false;
    let isJeju: boolean = false;
    // 제주도
    if (63000 <= postalCode && postalCode <= 63644) {
        isIMA = true;
        isJeju = true;
    }
    // 인천 중구 섬지역
    if (22386 <= postalCode && postalCode <= 22388) {
        isIMA = true;
        isJeju = false;
    }
    // 인천 강화 섬지역
    if (23004 <= postalCode && postalCode <= 23010) {
        isIMA = true;
        isJeju = false;
    }
    // 인천 옹진 섬지역1
    if (23100 <= postalCode && postalCode <= 23116) {
        isIMA = true;
        isJeju = false;
    }
    // 인천 옹진 섬지역2
    if (23124 <= postalCode && postalCode <= 23136) {
        isIMA = true;
        isJeju = false;
    }
    // 충남 당진 섬지역
    if (31780 === postalCode) {
        isIMA = true;
        isJeju = false;
    }
    // 충남 태안 섬지역
    if (32133 === postalCode) {
        isIMA = true;
        isJeju = false;
    }
    // 충남 당진 섬지역
    if (33411 === postalCode) {
        isIMA = true;
        isJeju = false;
    }
    // 경북 울릉도 전지역
    if (40200 <= postalCode && postalCode <= 40240) {
        isIMA = true;
        isJeju = false;
    }
    // 부산 강서구 섬지역
    if (46768 <= postalCode && postalCode <= 46771) {
        isIMA = true;
        isJeju = false;
    }
    // 경남 사천 섬지역
    if (52570 <= postalCode && postalCode <= 52571) {
        isIMA = true;
        isJeju = false;
    }
    // 경남 통영 섬지역1
    if (53031 <= postalCode && postalCode <= 53033) {
        isIMA = true;
        isJeju = false;
    }
    // 경남 통영 섬지역2
    if (53089 <= postalCode && postalCode <= 53104) {
        isIMA = true;
        isJeju = false;
    }
    // 경남 통영 섬지역
    if (54000 === postalCode) {
        isIMA = true;
        isJeju = false;
    }
    // 전북 부안 섬지역
    if (56347 <= postalCode && postalCode <= 56349) {
        isIMA = true;
        isJeju = false;
    }
    // 전남 영광 섬지역
    if (57068 <= postalCode && postalCode <= 57069) {
        isIMA = true;
        isJeju = false;
    }
    // 전남 목포 섬지역
    if (58760 <= postalCode && postalCode <= 58762) {
        isIMA = true;
        isJeju = false;
    }
    // 전남 신안 섬지역1
    if (58000 <= postalCode && postalCode <= 58810) {
        isIMA = true;
        isJeju = false;
    }
    // 전남 신안 섬지역2
    if (58816 <= postalCode && postalCode <= 58818) {
        isIMA = true;
        isJeju = false;
    }
    // 전남 신안 섬지역3
    if (58826 === postalCode) {
        isIMA = true;
        isJeju = false;
    }
    // 전남 신안 섬지역4
    if (58828 <= postalCode && postalCode <= 58866) {
        isIMA = true;
        isJeju = false;
    }
    // 전남 진도 섬지역
    if (58953 <= postalCode && postalCode <= 58958) {
        isIMA = true;
        isJeju = false;
    }
    // 전남 완도 섬지역1
    if (59102 <= postalCode && postalCode <= 59103) {
        isIMA = true;
        isJeju = false;
    }
    // 전남 완도 섬지역2
    if (59106 === postalCode) {
        isIMA = true;
        isJeju = false;
    }
    // 전남 완도 섬지역3
    if (59127 === postalCode) {
        isIMA = true;
        isJeju = false;
    }
    // 전남 완도 섬지역4
    if (59129 === postalCode) {
        isIMA = true;
        isJeju = false;
    }
    // 전남 완도 섬지역5
    if (59137 <= postalCode && postalCode <= 59166) {
        isIMA = true;
        isJeju = false;
    }
    // 전남 보성 섬지역
    if (59421 === postalCode) {
        isIMA = true;
        isJeju = false;
    }
    // 전남 고흥 섬지역1
    if (59531 === postalCode) {
        isIMA = true;
        isJeju = false;
    }
    // 전남 고흥 섬지역2
    if (59551 === postalCode) {
        isIMA = true;
        isJeju = false;
    }
    // 전남 고흥 섬지역3
    if (59563 === postalCode) {
        isIMA = true;
        isJeju = false;
    }
    // 전남 고흥 섬지역4
    if (59568 === postalCode) {
        isIMA = true;
        isJeju = false;
    }
    // 전남 여수시 섬지역1
    if (59650 === postalCode) {
        isIMA = true;
        isJeju = false;
    }
    // 전남 여수시 섬지역2
    if (59766 === postalCode) {
        isIMA = true;
        isJeju = false;
    }
    // 전남 여수시 섬지역3
    if (59781 <= postalCode && postalCode <= 59790) {
        isIMA = true;
        isJeju = false;
    }

    return {
        isIMA,
        isJeju,
    };
};

export const totalShipmentFee = (
    gifts: IIncartGift[] | IOrderedGift[] | IIncartGiftSelected[],
    postalCode: number = 11111,
) => {
    const buyingShipmentLocation =
        '경기도 고양시 일산동구 공릉천로 473번길 50, 1동, 2동, 3동(설문동) HNC';
    const buyingShipmentCourier = 'CJ대한통운';
    let shipmentFee = 0;
    interface CorporationGroupType {
        name: string;
        totalPrice: number;
        shipmentFee: number;
        freeThreshold: number;
        additionalFee: number;
        additionalFeeJeju: number;
    }
    let corporationGroups: CorporationGroupType[] = [];
    gifts.forEach((gift, index) => {
        let targetCorporation = gift.item.detail_info.seller.corporation;
        let targetShipmentInfo =
            gift.item.detail_info.seller.corporation.shipment_info;

        // 묶음배송 가능
        if (targetShipmentInfo.bundled) {
            // 사입제품
            if (targetCorporation.store_type === 0) {
                let buyingGroupIndex = corporationGroups.findIndex(
                    (group, index) => group.name === '사입',
                );
                if (buyingGroupIndex != -1) {
                    corporationGroups[buyingGroupIndex].totalPrice +=
                        gift.amount * giftPriceWithOptions(gift);
                } else {
                    let newGroup: CorporationGroupType = {
                        name: '사입',
                        totalPrice: gift.amount * giftPriceWithOptions(gift),
                        shipmentFee: targetShipmentInfo.fee,
                        freeThreshold: targetShipmentInfo.free_threshold,
                        additionalFee: targetShipmentInfo.additional_fee,
                        additionalFeeJeju:
                            targetShipmentInfo.additional_fee_jeju,
                    };
                    corporationGroups.push(newGroup);
                }
                // 입점 혹은 후사입
            } else {
                let isWithBuying =
                    targetShipmentInfo.courier == buyingShipmentCourier &&
                    targetShipmentInfo.location == buyingShipmentLocation;
                // 사입과 물류지/택배사 같을 경우
                if (isWithBuying) {
                    let buyingGroupIndex = corporationGroups.findIndex(
                        (group, index) => group.name === '사입',
                    );
                    if (buyingGroupIndex != -1) {
                        corporationGroups[buyingGroupIndex].totalPrice +=
                            gift.amount * giftPriceWithOptions(gift);
                    } else {
                        let newGroup: CorporationGroupType = {
                            name: '사입',
                            totalPrice:
                                gift.amount * giftPriceWithOptions(gift),
                            shipmentFee: targetShipmentInfo.fee,
                            freeThreshold: targetShipmentInfo.free_threshold,
                            additionalFee: targetShipmentInfo.additional_fee,
                            additionalFeeJeju:
                                targetShipmentInfo.additional_fee_jeju,
                        };
                        corporationGroups.push(newGroup);
                    }
                }
                // 사입과 물류지/택배사 다를 경우
                else {
                    let targetGroupIndex = corporationGroups.findIndex(
                        (group, index) => group.name === targetCorporation.name,
                    );
                    if (targetGroupIndex != -1) {
                        corporationGroups[targetGroupIndex].totalPrice +=
                            gift.amount * giftPriceWithOptions(gift);
                    } else {
                        let newGroup: CorporationGroupType = {
                            name: targetCorporation.name,
                            totalPrice:
                                gift.amount * giftPriceWithOptions(gift),
                            shipmentFee: targetShipmentInfo.fee,
                            freeThreshold: targetShipmentInfo.free_threshold,
                            additionalFee: targetShipmentInfo.additional_fee,
                            additionalFeeJeju:
                                targetShipmentInfo.additional_fee_jeju,
                        };
                        corporationGroups.push(newGroup);
                    }
                }
            }

            // 묶음배송 불가능
        } else {
            let notBundledGiftPrice = gift.amount * giftPriceWithOptions(gift);
            if (notBundledGiftPrice >= targetShipmentInfo.free_threshold) {
                shipmentFee += 0;
            } else {
                shipmentFee += targetShipmentInfo.fee;
            }
            if (needAdditionalFee(postalCode).isIMA) {
                needAdditionalFee(postalCode).isJeju
                    ? (shipmentFee += targetShipmentInfo.additional_fee_jeju)
                    : (shipmentFee += targetShipmentInfo.additional_fee);
            }
        }
    });
    corporationGroups.forEach((group, index) => {
        if (group.totalPrice > group.freeThreshold) {
            shipmentFee += 0;
        } else {
            shipmentFee += group.shipmentFee;
        }
        if (needAdditionalFee(postalCode).isIMA) {
            needAdditionalFee(postalCode).isJeju
                ? (shipmentFee += group.additionalFeeJeju)
                : (shipmentFee += group.additionalFee);
        }
    });
    return shipmentFee;
};
