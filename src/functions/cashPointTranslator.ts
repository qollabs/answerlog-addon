import { PointType } from '@Types/types';

export const totalCashPoint = (points: PointType[]) => {
    let total = 0;
    let today = new Date();
    points.forEach((each, index) => {
        let expiredDate = new Date(each.expired_at);
        if (today.getTime() - expiredDate.getTime() >= 0) return;
        total += each.remaining_amount;
    });
    return total;
};
