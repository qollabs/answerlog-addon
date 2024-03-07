import { useEffect, useState } from 'react';
import { IGift, IRecommendedGift } from '@Types/types';
import { MallRecommendedContainer } from '../Mall.styled';
import { CardSection } from '@Molecules/CardSection';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { Text } from '@Atoms/Typography';
import { Gap } from '@Styles/App.styled';
import { RowContainer } from '@Atoms/RowContainer';
import HeartFilledIcon from '@Images/icons/heart_filled.svg';
import HeartOutlinedIcon from '@Images/icons/heart_outlined.svg';
import { TextTag } from '@Molecules/TextTag';
import { ORANGE0, ORANGE2 } from '@Styles/colors';
import { Button } from '@Atoms/Button';
import { useRouter } from 'next/router';
import { useRequest } from '@Hooks/useRequest';
import { IconButton } from '@Atoms/IconButton';
import { BaseModal } from '@Molecules/BaseModal';
import CheckImage from '@Images/check_mandarin.png';
import { MallMenuType } from '../Mall';
import Image from 'next/image';
import * as ga from '../../../../lib/ga/gtag';
import { dummyRecommendedGift } from '@Constants/dummyObjects';
import { GiftCard } from '@Organisms/GiftCard';

interface MallRecommendedProp {
    recommendedGifts: IRecommendedGift[];
    setRecommendedGifts: (recommendedGifts: IRecommendedGift[]) => void;
    setMenu: (menu: MallMenuType) => void;
    interestedGifts: IGift[];
    setInterestedGifst: (interestedGifts: IGift[]) => void;
}

export const MallRecommended = ({
    recommendedGifts,
    setRecommendedGifts,
    setMenu,
    interestedGifts,
    setInterestedGifst,
}: MallRecommendedProp) => {
    const router = useRouter();
    const { loading, request } = useRequest();
    const [targetGift, setTargetGift] =
        useState<IRecommendedGift>(dummyRecommendedGift);
    const [giftSwiper, setGiftSwiper] = useState<SwiperCore>();
    const [showBookmarkModal, setShowBookmarkModal] = useState<boolean>(false);

    const markInterested = async () => {
        const resMark = await request({
            url: `/api/gift/${targetGift.gift._id}/interested`,
            method: 'PUT',
            data: { mark: !targetGift.interested },
        });
        if (resMark) {
            const targetGiftIndex = giftSwiper?.activeIndex || 0;
            let interestedGiftsTemp = [...interestedGifts];
            if (!targetGift.interested) {
                interestedGiftsTemp.push(targetGift.gift);
            } else {
                interestedGiftsTemp = interestedGiftsTemp.filter(
                    (gift) => gift._id !== targetGift.gift._id,
                );
            }
            let recommendedGiftsTemp = [...recommendedGifts];
            recommendedGiftsTemp[targetGiftIndex].interested =
                !recommendedGiftsTemp[targetGiftIndex].interested;
            setInterestedGifst(interestedGiftsTemp);
            setRecommendedGifts(recommendedGiftsTemp);
            if (targetGift.interested) {
                ga.event({
                    action: 'mark_gift_interested',
                    params: {
                        item_id: recommendedGifts[targetGiftIndex].gift._id,
                        item_name: recommendedGifts[targetGiftIndex].gift.title,
                    },
                });
                setShowBookmarkModal(true);
            } else {
                ga.event({
                    action: 'unmark_gift_interested',
                    params: {
                        item_id: recommendedGifts[targetGiftIndex].gift._id,
                        item_name: recommendedGifts[targetGiftIndex].gift.title,
                    },
                });
            }
        }
    };
    const postNotInterested = async () => {
        const resNotInterested = await request({
            url: `/api/gift/${targetGift.gift._id}/not-interested`,
            method: 'POST',
        });
        if (resNotInterested) {
            ga.event({
                action: 'mark_gift_not_interested',
                params: {
                    item_id: targetGift.gift._id,
                    item_name: targetGift.gift.title,
                },
            });
            giftSwiper?.slideNext();
        }
    };
    const goToMallDetail = () => {
        ga.event({
            action: 'select_item',
            params: {
                item_list_name: 'Recommend Gifts',
                items: [
                    {
                        item_id: targetGift.gift._id,
                        item_name: targetGift.gift.title,
                        item_brand: targetGift.gift.detail_info.manufacturer,
                        price: targetGift.gift.discount_rate
                            ? targetGift.gift.retail_price
                            : targetGift.gift.price,
                        discount: targetGift.gift.discount_rate
                            ? targetGift.gift.retail_price -
                              targetGift.gift.price
                            : 0,
                    },
                ],
            },
        });
        ga.event({
            action: 'go_gift_detail_page',
            params: {
                item_id: targetGift.gift._id,
                item_name: targetGift.gift.title,
            },
        });
        router.push(`/mall/${targetGift.gift._id}`);
    };

    // log 'view_item_list' event
    useEffect(() => {
        if (recommendedGifts.length === 0) return;
        ga.event({
            action: 'view_item_list',
            params: {
                item_list_name: 'Recommend Gifts',
                items: recommendedGifts.map((item) => {
                    return {
                        item_id: item.gift._id,
                        item_name: item.gift.title,
                        item_brand: item.gift.detail_info.manufacturer,
                        price: item.gift.discount_rate
                            ? item.gift.retail_price
                            : item.gift.price,
                        discount: item.gift.discount_rate
                            ? item.gift.retail_price - item.gift.price
                            : 0,
                    };
                }),
            },
        });
    }, [recommendedGifts]);

    return (
        <MallRecommendedContainer>
            {recommendedGifts.length > 0 && (
                <Swiper
                    slidesPerView={1}
                    direction="vertical"
                    onSwiper={setGiftSwiper}
                    onAfterInit={() => {
                        ga.event({
                            action: 'swipe_in_recommend_gift',
                            params: {
                                item_id: recommendedGifts[0].gift._id,
                                item_name: recommendedGifts[0].gift.title,
                            },
                        });
                        setTargetGift(recommendedGifts[0]);
                    }}
                    onSlideChange={(swiper) => {
                        if (recommendedGifts.length > swiper.previousIndex) {
                            let prevGift: IRecommendedGift =
                                recommendedGifts[swiper.previousIndex];
                            ga.event({
                                action: 'swipe_out_recommend_gift',
                                params: {
                                    item_id: prevGift.gift._id,
                                    item_name: prevGift.gift.title,
                                },
                            });
                        }
                        if (recommendedGifts.length > swiper.activeIndex) {
                            let activeGift: IRecommendedGift =
                                recommendedGifts[swiper.activeIndex];
                            ga.event({
                                action: 'swipe_in_recommend_gift',
                                params: {
                                    item_id: activeGift.gift._id,
                                    item_name: activeGift.gift.title,
                                },
                            });
                            setTargetGift(activeGift);
                        }
                    }}
                    onBeforeDestroy={(swiper) => {
                        if (recommendedGifts.length > swiper.activeIndex)
                            ga.event({
                                action: 'swipe_out_recommend_gift',
                                params: {
                                    item_id: targetGift.gift._id,
                                    item_name: targetGift.gift.title,
                                },
                            });
                    }}
                >
                    {recommendedGifts.map((gift, i) => (
                        <SwiperSlide key={gift.gift._id}>
                            <CardSection
                                deepShadow
                                height="100%"
                                alignItems="flex-start"
                            >
                                <GiftCard
                                    gift={gift.gift}
                                    showTitle
                                    showPrice
                                    showReactionButton
                                    onClickReactionButton={markInterested}
                                    reacted={gift.interested}
                                    fullScreen
                                />
                                <Gap height="8px" />
                                <RowContainer>
                                    <Button
                                        height="48px"
                                        color="gray"
                                        onClickButton={() =>
                                            postNotInterested()
                                        }
                                    >
                                        관심 없어요
                                    </Button>
                                    <Gap width="8px" />
                                    <Button
                                        height="48px"
                                        onClickButton={() => goToMallDetail()}
                                    >
                                        자세히 보기
                                    </Button>
                                </RowContainer>
                            </CardSection>
                        </SwiperSlide>
                    ))}
                    <SwiperSlide key="no-matching-gifts">
                        <Text size="h2">맞춤 선물을 찾고 있어요</Text>
                        <Gap height="16px" />
                        <Text color="gray4">하루에 5개씩 추천해드려요</Text>
                    </SwiperSlide>
                </Swiper>
            )}
            {recommendedGifts.length > 0 && (
                <BaseModal
                    show={showBookmarkModal}
                    closeOnClickOutside
                    onClose={() => setShowBookmarkModal(false)}
                    customImage={CheckImage}
                >
                    <Text>&quot;{targetGift.gift.title}&quot;</Text>
                    <Text>
                        상품을 <Text color="orange2">관심 선물</Text>에
                        저장했어요
                    </Text>
                    <Gap height="48px" />
                    <RowContainer>
                        <Button
                            color="gray"
                            height="48px"
                            onClickButton={() => setShowBookmarkModal(false)}
                        >
                            닫기
                        </Button>
                        <Gap width="8px" />
                        <Button
                            height="48px"
                            onClickButton={() => setMenu('interested')}
                        >
                            확인하기
                        </Button>
                    </RowContainer>
                </BaseModal>
            )}
        </MallRecommendedContainer>
    );
};
