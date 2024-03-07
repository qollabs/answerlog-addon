import { IOrderInfo } from '@Types/types';

export const deliveryProcessTranslator = (process: number) => {
    switch (process) {
        case -1:
            return '주문 취소';
        case 0:
            return '입금 확인중';
        case 1:
            return '상품 확인중';
        case 2:
            return '상품 포장중';
        case 3:
            return '배송중';
        case 4:
            return '배송 완료';
        default:
            return '기타';
    }
};
export const multipleDeliveryProcess = (orderInfo: IOrderInfo) => {
    let processes: number[] = [];
    let isCanceled = false;
    orderInfo.deliver_info.forEach((info, index) => {
        processes.push(info.process);
        if (info.process === -1) {
            isCanceled = true;
        }
    });
    let laziest = isCanceled ? -1 : Math.min(...processes);
    let fastest = isCanceled ? -1 : Math.max(...processes);
    return { laziest, fastest };
};

export const deliveryProcessCommentMaker = (process: number) => {
    switch (process) {
        case -1:
            return '주문이 취소되었어요';
        case 0:
            return '입금을 확인중이에요';
        case 1:
            return '상품의 위치를 확인중이에요';
        case 2:
            return '상품을 열심히 포장중이에요';
        case 3:
            return '배송이 시작되었어요';
        case 4:
            return '배송이 완료되었어요';
        default:
            return '기타';
    }
};

export const cancelProcessTranslator = (process: number) => {
    switch (process) {
        case 0:
            return '해당 사항 없음';
        case 1:
            return '취소 진행중';
        case 2:
            return '취소 실패';
        case 3:
            return '취소 완료';
        default:
            return '기타';
    }
};
