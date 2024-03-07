import { Text } from '@Atoms/Typography';
import {
    TutorialGuideContainer,
    TutorialLogDetailContainer,
    TutorialLogDetailContentContainer,
    TutorialLogDetailDiaryContainer,
    TutorialLogDetailFrontContainer,
    TutorialLogDetailIndexContainer,
    TutorialLogDetailLinkContainer,
    TutorialLogDetailSubtitleContainer,
    TutorialLogDetailTag,
    TutorialLogDetailTagContainer,
    TutorialLogDetailTitleContainer,
} from '../Tutorial.styled';
import { Gap } from '@Styles/App.styled';
import { tutorialAnsweredQnas } from './TutorialContants';
import { PageFlipType } from '../Tutorial';
import PointoutOutlined from '@Images/icons/pointout_outlined.svg';
import { WHITE } from '@Styles/colors';

interface TutorialLogDetailProp {
    page: number;
    setPage: (page: number) => void;
    goToNextPage: (page?: PageFlipType) => void;
}

export const TutorialLogDetail = ({
    page,
    setPage,
    goToNextPage,
}: TutorialLogDetailProp) => {
    return (
        <TutorialLogDetailContainer>
            <TutorialLogDetailDiaryContainer>
                {page === 21 && (
                    <TutorialGuideContainer top="40px">
                        <Text color="white" size="b0">
                            제목을 터치하여
                            <br />각 문답을
                            <br />
                            살펴볼 수 있어요
                        </Text>
                        <Gap height="16px" />
                        <Text color="white">터치하여 계속</Text>
                        <PointoutOutlined
                            color={WHITE}
                            width="24px"
                            height="24px"
                        />
                    </TutorialGuideContainer>
                )}
                {page === 22 && (
                    <TutorialGuideContainer top="240px">
                        <Text color="white" size="b0">
                            우측 탭을 이용해
                            <br />
                            살펴볼 수도 있어요
                        </Text>
                        <Gap height="16px" />
                        <Text color="white">터치하여 계속</Text>
                        <PointoutOutlined
                            color={WHITE}
                            width="24px"
                            height="24px"
                        />
                    </TutorialGuideContainer>
                )}
                <TutorialLogDetailContentContainer>
                    <TutorialLogDetailFrontContainer>
                        <TutorialLogDetailTitleContainer>
                            <Text size="b0">0번째</Text>
                            <Text size="b0">앤서록</Text>
                        </TutorialLogDetailTitleContainer>
                        <Gap height="28px" />
                        <TutorialLogDetailSubtitleContainer>
                            <Text color="gray5">차례</Text>
                        </TutorialLogDetailSubtitleContainer>
                        <Gap height="24px" />
                        <TutorialLogDetailIndexContainer
                            isFocused={page === 21}
                        >
                            {tutorialAnsweredQnas.map((qna, i) => (
                                <TutorialLogDetailLinkContainer
                                    key={qna.question._id}
                                >
                                    <Text color="gray5">{i + 1}</Text>
                                    <Gap width="18px" />
                                    <Text underline color="gray5">
                                        {qna.question.content}
                                    </Text>
                                </TutorialLogDetailLinkContainer>
                            ))}
                        </TutorialLogDetailIndexContainer>
                    </TutorialLogDetailFrontContainer>
                </TutorialLogDetailContentContainer>
                <TutorialLogDetailTagContainer isFocused={page === 22}>
                    <TutorialLogDetailTag selected>
                        <Text size="c1" color="white">
                            0
                        </Text>
                    </TutorialLogDetailTag>
                    {tutorialAnsweredQnas.map((qna, i) => (
                        <TutorialLogDetailTag
                            key={`${qna.question._id}_tag`}
                            selected={false}
                        >
                            <Text size="c1" color="white">
                                {i + 1}
                            </Text>
                        </TutorialLogDetailTag>
                    ))}
                </TutorialLogDetailTagContainer>
            </TutorialLogDetailDiaryContainer>
        </TutorialLogDetailContainer>
    );
};
