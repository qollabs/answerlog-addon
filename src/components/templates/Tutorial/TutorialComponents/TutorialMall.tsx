import { CardSection } from '@Molecules/CardSection';
import {
    TutorialMallContainer,
    TutorialMallMenuButton,
    TutorialMallNavContainer,
    TutorialMallRecommendedImageSlideContainer,
    TutorialMallRecommendedPriceContainer,
    TutorialMallRecommendedTagContainer,
} from '../Tutorial.styled';
import { Text } from '@Atoms/Typography';
import { Gap } from '@Styles/App.styled';
import { RowContainer } from '@Atoms/RowContainer';
import { tutorialRecommendedGift } from './TutorialContants';
import HeartFilledIcon from '@Images/icons/heart_filled.svg';
import HeartOutlinedIcon from '@Images/icons/heart_outlined.svg';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import Image from 'next/image';
import { TextTag } from '@Molecules/TextTag';
import { ORANGE0, ORANGE2 } from '@Styles/colors';
import { IconButton } from '@Atoms/IconButton';
import { Button } from '@Atoms/Button';
import { PageFlipType } from '../Tutorial';

export const TutorialMallNav = () => {
    return (
        <TutorialMallNavContainer>
            <TutorialMallMenuButton selected>
                오늘의 발견
            </TutorialMallMenuButton>
            <TutorialMallMenuButton selected={false}>
                관심 선물(0)
            </TutorialMallMenuButton>
            <TutorialMallMenuButton selected={false}>
                장바구니(0)
            </TutorialMallMenuButton>
        </TutorialMallNavContainer>
    );
};

const TutorialMallRecommended = () => {
    return (
        <CardSection deepShadow height="100%" alignItems="flex-start">
            <Text size="b0">{tutorialRecommendedGift.gift.title}</Text>
            <Gap height="4px" />
            <RowContainer>
                <Text size="b0" color="orange2">
                    {tutorialRecommendedGift.gift.discount_rate > 0 &&
                        `${tutorialRecommendedGift.gift.discount_rate}%`}
                </Text>
                <TutorialMallRecommendedPriceContainer>
                    {tutorialRecommendedGift.gift.discount_rate > 0 && (
                        <Text color="gray4" textDecoration="line-through">
                            {tutorialRecommendedGift.gift.retail_price.toLocaleString()}
                            원
                        </Text>
                    )}
                    <Gap width="8px" />
                    <Text size="b0">
                        {tutorialRecommendedGift.gift.price.toLocaleString()}원
                    </Text>
                </TutorialMallRecommendedPriceContainer>
            </RowContainer>
            <Gap height="8px" />
            <TutorialMallRecommendedImageSlideContainer>
                <Swiper modules={[Pagination]} pagination>
                    {tutorialRecommendedGift.gift.image_url.map((image, j) => (
                        <SwiperSlide key={image}>
                            <Image
                                src={image}
                                layout="fill"
                                objectFit="cover"
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </TutorialMallRecommendedImageSlideContainer>
            <Gap height="4px" />
            <RowContainer>
                <TutorialMallRecommendedTagContainer>
                    {tutorialRecommendedGift.gift.tags.map((tag, k) => (
                        <TextTag
                            key={tag}
                            size="b2"
                            borderRadius="16px"
                            backgroundColor={ORANGE0}
                        >
                            {tag}
                        </TextTag>
                    ))}
                </TutorialMallRecommendedTagContainer>
                {tutorialRecommendedGift.interested ? (
                    <IconButton>
                        <HeartFilledIcon
                            width="30px"
                            height="30px"
                            color={ORANGE2}
                        />
                    </IconButton>
                ) : (
                    <IconButton>
                        <HeartOutlinedIcon
                            width="30px"
                            height="30px"
                            color={ORANGE2}
                        />
                    </IconButton>
                )}
            </RowContainer>
            <Gap height="8px" />
            <Text size="b2" color="gray4">
                {tutorialRecommendedGift.gift.description}
            </Text>
            <Gap height="8px" />
            <RowContainer>
                <Button height="48px" color="gray">
                    관심 없어요
                </Button>
                <Gap width="8px" />
                <Button height="48px">자세히 보기</Button>
            </RowContainer>
        </CardSection>
    );
};

interface TutorialMallProp {
    page: number;
    setPage: (page: number) => void;
    goToNextPage: (page?: PageFlipType) => void;
}

export const TutorialMall = ({
    page,
    setPage,
    goToNextPage,
}: TutorialMallProp) => {
    return (
        <TutorialMallContainer>
            <TutorialMallRecommended />
        </TutorialMallContainer>
    );
};
