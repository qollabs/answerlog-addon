import { useAsyncEffect } from '@Hooks/useAsyncEffect';
import { MainLayout } from '@Organisms/MainLayout';
import { useRouter } from 'next/router';
import { Button } from '@Atoms/Button';
import { useRequest } from '@Hooks/useRequest';
import { Text } from '@Atoms/Typography';
import { Gap } from '@Styles/App.styled';
import { FailButtonContainer, FailContainer } from './FailPurchase.styled';
import * as ga from '../../../lib/ga/gtag';

export const FailPurchase = () => {
    const router = useRouter();
    const { code: errorCode, message: errorMessage, orderId } = router.query;

    const { request, loading } = useRequest();

    useAsyncEffect(async () => {
        if (!orderId) return;
        const orderRes = await request({
            url: `/api/order/${orderId}`,
            method: 'DELETE',
        });
        if (orderRes) {
            ga.event({
                action: 'fail_purchase',
                params: {
                    code: errorCode,
                    message: errorMessage,
                    transaction_id: orderId,
                },
            });
        }
    }, [router]);

    return (
        <MainLayout hideBottomNav>
            <FailContainer>
                <Text size="h2">
                    {errorMessage || '결제 도중 오류가 발생하였습니다.'}
                </Text>
                <Gap height="16px" />
                <Text>문제를 확인하신 후 다시 결제를 진행해주세요.</Text>
                <Gap height="16px" />
                <FailButtonContainer>
                    <Button
                        onClickButton={() => router.push('/mall?show=gift')}
                    >
                        장바구니 가기
                    </Button>
                    <Gap width="8px" />
                    <Button onClickButton={() => router.push('/purchase')}>
                        구매 다시하기
                    </Button>
                </FailButtonContainer>
            </FailContainer>
        </MainLayout>
    );
};
