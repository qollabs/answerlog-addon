import { useEffect, useState } from 'react';
import { IGift } from '@Types/types';
import {
    MallInterestedContainer,
    MallInterestedEmptyContainer,
    MallInterestedGiftContainer,
    MallInterestedGiftContentContainer,
    MallInterestedGiftTextContainer,
} from '../Mall.styled';
import { ReactiveSquare } from '@Molecules/ReactiveSquare';
import Image from 'next/image';
import HeartFilledIcon from '@Images/icons/heart_filled.svg';
import ExclamationImage from '@Images/exclamation_mandarin.png';
import { Text } from '@Atoms/Typography';
import { Gap } from '@Styles/App.styled';
import { IconButton } from '@Atoms/IconButton';
import { ORANGE2 } from '@Styles/colors';
import { useRouter } from 'next/router';
import { useRequest } from '@Hooks/useRequest';
import { Container } from '@Atoms/Container';
import { BaseModal } from '@Molecules/BaseModal';
import { RowContainer } from '@Atoms/RowContainer';
import { Button } from '@Atoms/Button';
import { MallMenuType } from '../Mall';
import * as ga from '../../../../lib/ga/gtag';
import { useActionOnTouch } from '@Hooks/useActionOnTouch';

interface MallInterestedProp {
    interestedGifts: IGift[];
    setInterestedGifst: (interestedGifts: IGift[]) => void;
    setMenu: (menu: MallMenuType) => void;
}

export const MallInterested = ({
    interestedGifts,
    setInterestedGifst,
    setMenu,
}: MallInterestedProp) => {
    const router = useRouter();
    const { request } = useRequest();
    const { actionOnTouchEnd } = useActionOnTouch();

    const [targetIndex, setTargetIndex] = useState(0);
    const [showDeleteInterestedModal, setShowDeleteInterestedModal] =
        useState(false);

    const beforeDeleteInterested = (targetIndex: number) => {
        setTargetIndex(targetIndex);
        setShowDeleteInterestedModal(true);
    };

    const goToTargetGift = (gift: IGift) => {
        ga.event({
            action: 'select_item',
            params: {
                item_list_name: 'Interest Gifts',
                items: [
                    {
                        item_id: gift._id,
                        item_name: gift.title,
                        item_brand: gift.detail_info.manufacturer,
                        price: gift.discount_rate
                            ? gift.retail_price
                            : gift.price,
                        discount: gift.discount_rate
                            ? gift.retail_price - gift.price
                            : 0,
                    },
                ],
            },
        });
        ga.event({
            action: 'go_gift_detail_page',
            params: {
                item_id: gift._id,
                item_name: gift.title,
            },
        });
        router.push(`/mall/${gift._id}`);
    };

    const deleteInterested = async (targetId: string) => {
        const resMark = await request({
            url: `/api/gift/${targetId}/interested`,
            method: 'PUT',
            data: { mark: false },
        });
        if (resMark) {
            let interestedGiftsTemp = [...interestedGifts];

            ga.event({
                action: 'unmark_gift_interested',
                params: {
                    item_id: targetId,
                    item_name: interestedGiftsTemp.find(
                        (gift) => gift._id === targetId,
                    )?.title,
                },
            });

            interestedGiftsTemp = interestedGiftsTemp.filter(
                (gift) => gift._id !== targetId,
            );
            setTargetIndex(0);
            setInterestedGifst(interestedGiftsTemp);
            setShowDeleteInterestedModal(false);
        }
    };

    useEffect(() => {
        if (interestedGifts.length === 0) return;
        ga.event({
            action: 'view_item_list',
            params: {
                item_list_name: 'Interest Gifts',
                items: interestedGifts.map((gift) => {
                    return {
                        item_id: gift._id,
                        item_name: gift.title,
                        item_brand: gift.detail_info.manufacturer,
                        price: gift.discount_rate
                            ? gift.retail_price
                            : gift.price,
                        discount: gift.discount_rate
                            ? gift.retail_price - gift.price
                            : 0,
                    };
                }),
            },
        });
    }, [interestedGifts]);

    return (
        <MallInterestedContainer>
            {interestedGifts.length === 0 && (
                <MallInterestedEmptyContainer>
                    <Text size="h2" color="gray4">
                        담아둔 선물이 없어요
                    </Text>
                    <Gap height="16px" />
                    <Button onClickButton={() => setMenu('recommended')}>
                        쇼핑 계속하기
                    </Button>
                </MallInterestedEmptyContainer>
            )}
            {interestedGifts.map((gift, i) => (
                <MallInterestedGiftContainer key={gift._id}>
                    <Container
                        onClick={() => goToTargetGift(gift)}
                        onTouchEnd={(e) =>
                            actionOnTouchEnd(e, () => goToTargetGift(gift))
                        }
                    >
                        <ReactiveSquare>
                            <Image
                                src={gift.thumbnail_url}
                                layout="fill"
                                objectFit="cover"
                            />
                        </ReactiveSquare>
                    </Container>
                    <MallInterestedGiftContentContainer>
                        <MallInterestedGiftTextContainer>
                            <Text>
                                {gift.detail_info.seller.brand || '회사명'}
                            </Text>
                            <Gap height="8px" />
                            <Text>{gift.title}</Text>
                            <Gap height="8px" />
                            <Text>{gift.price.toLocaleString()}원</Text>
                        </MallInterestedGiftTextContainer>
                        <IconButton
                            onClickButton={() => beforeDeleteInterested(i)}
                        >
                            <HeartFilledIcon
                                width="26px"
                                height="26px"
                                color={ORANGE2}
                            />
                        </IconButton>
                    </MallInterestedGiftContentContainer>
                </MallInterestedGiftContainer>
            ))}
            {interestedGifts.length > 0 && (
                <BaseModal
                    show={showDeleteInterestedModal}
                    closeOnClickOutside
                    onClose={() => setShowDeleteInterestedModal(false)}
                    customImage={ExclamationImage}
                >
                    <Text>
                        &quot;{interestedGifts[targetIndex].title}&quot;
                    </Text>
                    <Text>
                        상품을 <Text color="orange2">관심 선물</Text>에서
                        제거하시겠어요?
                    </Text>
                    <Gap height="48px" />
                    <RowContainer>
                        <Button
                            color="gray"
                            height="48px"
                            onClickButton={() =>
                                setShowDeleteInterestedModal(false)
                            }
                        >
                            닫기
                        </Button>
                        <Gap width="8px" />
                        <Button
                            height="48px"
                            onClickButton={() =>
                                deleteInterested(
                                    interestedGifts[targetIndex]._id,
                                )
                            }
                        >
                            제거하기
                        </Button>
                    </RowContainer>
                </BaseModal>
            )}
        </MallInterestedContainer>
    );
};
