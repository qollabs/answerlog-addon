import { useContext } from 'react';
import { ImageBox } from '@Atoms/ImageBox';
import {
    TutorialGuideContainer,
    TutorialLandingAlertContainer,
    TutorialLandingBirthTextContainer,
    TutorialLandingContainer,
    TutorialLandingPersonContainer,
    TutorialLandingRelationContainer,
    TutorialLandingReportContainer,
    TutorialLandingSectionButton,
    TutorialLandingSectionContainer,
    TutorialLandingSectionImageBox,
    TutorialLandingSectionTop,
} from '../Tutorial.styled';
import { Gap } from '@Styles/App.styled';
import { Text } from '@Atoms/Typography';
import PencilImage from '@Images/pencil.png';
import BookStackedImage from '@Images/book_stacked.png';
import ReportImage from '@Images/report.png';
import PresentBalloonImage from '@Images/present_balloon.png';
import CaretRigtIcon from '@Images/icons/caret_right.svg';
import HeartFilledIcon from '@Images/icons/heart_filled.svg';
import CalendarIcon from '@Images/icons/calendar.svg';
import { BLACK, GRAY3, MANDARIN2, ORANGE2 } from '@Styles/colors';
import { AppContext } from '@Pages/_app';
import { CardSection } from '@Molecules/CardSection';
import { RowContainer } from '@Atoms/RowContainer';
import { Container } from '@Atoms/Container';
import { ReactiveSquare } from '@Molecules/ReactiveSquare';
import Image from 'next/image';
import { postpositionSelectorOnly } from '@Functions/postpositionSelector';
import { convertTime, dDayCounter } from '@Functions/convertTime';
import { PageFlipType } from '../Tutorial';
import PointoutOutlined from '@Images/icons/pointout_outlined.svg';
import { useActionOnTouch } from '@Hooks/useActionOnTouch';

interface TutorialLandingProp {
    page: number;
    setPage: (page: number) => void;
    goToNextPage: (page?: PageFlipType) => void;
}

export const TutorialLanding = ({
    page,
    setPage,
    goToNextPage,
}: TutorialLandingProp) => {
    const { myProfileImage, myName, textSizePref } = useContext(AppContext);
    const { actionOnTouchEnd } = useActionOnTouch();

    return (
        <TutorialLandingContainer>
            <TutorialLandingRelationContainer>
                <TutorialLandingPersonContainer>
                    <ImageBox width="70px" height="70px" image={null} border />
                    <Gap height="8px" />
                    <Text>엄마</Text>
                    <Text color="gray4">앤서록</Text>
                </TutorialLandingPersonContainer>
                <Gap width="24px" />
                <HeartFilledIcon width="24px" height="24px" color={ORANGE2} />
                <Gap width="24px" />
                <TutorialLandingPersonContainer>
                    <ImageBox
                        width="70px"
                        height="70px"
                        image={myProfileImage}
                        border
                    />
                    <Gap height="8px" />
                    <Text>나</Text>
                    <Text color="gray4">{myName}</Text>
                </TutorialLandingPersonContainer>
            </TutorialLandingRelationContainer>
            <Gap height="16px" />
            <TutorialLandingAlertContainer
                isFocused={page === 4}
                onClick={() => page === 4 && goToNextPage()}
                onTouchEnd={(e) =>
                    actionOnTouchEnd(e, () => page === 4 && goToNextPage())
                }
            >
                <CardSection deepShadow>
                    <TutorialLandingSectionContainer>
                        0번째 앤서록이 도착했어요
                    </TutorialLandingSectionContainer>
                </CardSection>
                {page === 4 && (
                    <TutorialGuideContainer bottom="-100px">
                        <Text color="white" size="b0">
                            앤서록이 도착했네요
                        </Text>
                        <Text color="white" size="b0">
                            확인해볼까요?
                        </Text>
                    </TutorialGuideContainer>
                )}
                {page === 4 && (
                    <PointoutOutlined
                        color={MANDARIN2}
                        width="24px"
                        height="24px"
                    />
                )}
            </TutorialLandingAlertContainer>
            <Gap height="16px" />
            <RowContainer>
                <Container>
                    <CardSection deepShadow>
                        <ReactiveSquare>
                            <TutorialLandingSectionContainer>
                                <TutorialLandingSectionTop>
                                    <Text>
                                        <Text color="orange2">1번째 </Text>
                                        앤서록
                                    </Text>
                                    <Text>진행중</Text>
                                </TutorialLandingSectionTop>

                                <TutorialLandingSectionButton>
                                    <Text>문답</Text>
                                    <CaretRigtIcon
                                        width="24px"
                                        height="24px"
                                        color={BLACK}
                                    />
                                </TutorialLandingSectionButton>
                                <TutorialLandingSectionImageBox
                                    width="100px"
                                    height="100px"
                                    bottom="0"
                                    right="-24px"
                                >
                                    <Image src={PencilImage} layout="fill" />
                                </TutorialLandingSectionImageBox>
                            </TutorialLandingSectionContainer>
                        </ReactiveSquare>
                    </CardSection>
                    <Gap height="16px" />
                    <CardSection deepShadow>
                        <ReactiveSquare>
                            <TutorialLandingSectionContainer>
                                <TutorialLandingSectionTop>
                                    <Text>
                                        <Text color="orange2">엄마</Text>와 함께
                                    </Text>
                                    <Text>쌓은 이야기들</Text>
                                </TutorialLandingSectionTop>
                                <TutorialLandingSectionButton>
                                    <Text>답변 모음</Text>
                                    <CaretRigtIcon
                                        width="24px"
                                        height="24px"
                                        color={BLACK}
                                    />
                                </TutorialLandingSectionButton>
                                <TutorialLandingSectionImageBox
                                    width="100px"
                                    height="100px"
                                    bottom="0"
                                    right="-42px"
                                >
                                    <Image
                                        src={BookStackedImage}
                                        layout="fill"
                                    />
                                </TutorialLandingSectionImageBox>
                            </TutorialLandingSectionContainer>
                        </ReactiveSquare>
                    </CardSection>
                </Container>
                <Gap width="16px" />
                <CardSection deepShadow height="100%">
                    <TutorialLandingSectionContainer>
                        <TutorialLandingSectionTop>
                            <Text>
                                <Text color="orange2">또래</Text>
                                {postpositionSelectorOnly('또래', '은는')}{' '}
                                이렇게
                            </Text>
                            <Text>답했어요</Text>
                            <Gap height="16px" />
                            <TutorialLandingReportContainer
                                textSizePref={textSizePref}
                            >
                                <Text>1 닭다리</Text>
                                <Text>68%</Text>
                            </TutorialLandingReportContainer>
                            <TutorialLandingReportContainer
                                textSizePref={textSizePref}
                            >
                                <Text>2 닭가슴살</Text>
                                <Text>19%</Text>
                            </TutorialLandingReportContainer>
                            <TutorialLandingReportContainer
                                textSizePref={textSizePref}
                            >
                                <Text>3 닭날개</Text>
                                <Text>13%</Text>
                            </TutorialLandingReportContainer>
                        </TutorialLandingSectionTop>

                        <TutorialLandingSectionButton>
                            <Text>리포트</Text>
                            <CaretRigtIcon
                                width="24px"
                                height="24px"
                                color={BLACK}
                            />
                        </TutorialLandingSectionButton>
                        <TutorialLandingSectionImageBox
                            width="100px"
                            height="100px"
                            bottom="4px"
                            right="-20px"
                        >
                            <Image src={ReportImage} layout="fill" />
                        </TutorialLandingSectionImageBox>
                    </TutorialLandingSectionContainer>
                </CardSection>
            </RowContainer>
            <Gap height="16px" />
            <CardSection deepShadow>
                {' '}
                <TutorialLandingSectionContainer>
                    <TutorialLandingSectionTop>
                        <Text>새롭게 추천되는</Text>
                        <Text>
                            <Text color="orange2">5개의</Text> 우리{' '}
                            <Text color="orange2">맞춤 선물</Text>
                        </Text>
                    </TutorialLandingSectionTop>
                    <Gap height="16px" />
                    <TutorialLandingBirthTextContainer>
                        <CalendarIcon
                            width="24px"
                            height="24px"
                            color={GRAY3}
                        />
                        <Gap width="8px" />
                        <Text color="gray3">
                            {convertTime(
                                '1962-11-19T00:00:00',
                                'onlyMonthDate',
                            )}
                        </Text>
                    </TutorialLandingBirthTextContainer>
                    <Text color="gray5">
                        엄마생신
                        <Text color="gray3">까지</Text>{' '}
                        {dDayCounter('1962-11-19T00:00:00', 'right-next')}일
                    </Text>
                    <Gap height="16px" />
                    <TutorialLandingSectionButton>
                        <Text>앤서록 몰</Text>
                        <CaretRigtIcon
                            width="24px"
                            height="24px"
                            color={BLACK}
                        />
                    </TutorialLandingSectionButton>
                    <TutorialLandingSectionImageBox
                        width="100px"
                        height="100px"
                        bottom="-8px"
                        right="-20px"
                    >
                        <Image src={PresentBalloonImage} layout="fill" />
                    </TutorialLandingSectionImageBox>
                </TutorialLandingSectionContainer>
            </CardSection>
        </TutorialLandingContainer>
    );
};
