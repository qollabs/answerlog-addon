import { PaymentStatusType } from '@Types/types';

export const paymentStatusTranslator = (status: PaymentStatusType | null) => {
    switch (status) {
        case 'READY':
            return '준비중';
        case 'IN_PROGRESS':
            return '결제 진행중';
        case 'WAITING_FOR_DEPOSIT':
            return '입금 대기중';
        case 'DONE':
            return '결제 완료';
        case 'CANCELED':
            return '결제 취소';
        case 'PARTIAL_CANCELED':
            return '부분취소';
        case 'ABORTED':
            return '결제 거부';
        case 'EXPIRED':
            return '결제 기한 초과';
        default:
            return '기타';
    }
};
