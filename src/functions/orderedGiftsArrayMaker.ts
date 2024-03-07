import { IOrderInfo, IOrderedGift } from '@Types/types';

export const orderedGiftsArrayMaker = (orderInfo: IOrderInfo) => {
    let orderedGifts: IOrderedGift[] = [];
    orderInfo.deliver_info.forEach((info, index) => {
        orderedGifts = orderedGifts.concat(info.order_items);
    });

    return orderedGifts;
};
