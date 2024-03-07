import { CardSection } from '@Molecules/CardSection';
import {
    TutorialGuideContainer,
    TutorialReportCardContainer,
    TutorialReportCardTextContainer,
    TutorialReportCardWrapper,
    TutorialReportContainer,
} from '../Tutorial.styled';
import { tutorialReports } from './TutorialContants';
import { ImageBox } from '@Atoms/ImageBox';
import { categoryPicker } from '@Functions/categoryPicker';
import { Gap } from '@Styles/App.styled';
import { Text } from '@Atoms/Typography';
import { PageFlipType } from '../Tutorial';
import PointoutOutlined from '@Images/icons/pointout_outlined.svg';
import { MANDARIN2 } from '@Styles/colors';
import { useActionOnTouch } from '@Hooks/useActionOnTouch';

interface TutorialReportProp {
    page: number;
    setPage: (page: number) => void;
    goToNextPage: (page?: PageFlipType) => void;
}

export const TutorialReport = ({
    page,
    setPage,
    goToNextPage,
}: TutorialReportProp) => {
    const { actionOnTouchEnd } = useActionOnTouch();
    return (
        <TutorialReportContainer>
            {tutorialReports.map((report, i) => (
                <TutorialReportCardWrapper
                    isFocused={i === 0 && page === 24}
                    onClick={() => i === 0 && goToNextPage()}
                >
                    {i === 0 && page === 24 && (
                        <TutorialGuideContainer bottom="-140px">
                            <Text size="b0" color="white">
                                리포트에서는
                                <br />
                                다른 사람들은
                                <br />
                                어떤 대답을 했는지
                                <br /> 살펴볼 수 있어요
                            </Text>
                        </TutorialGuideContainer>
                    )}
                    <CardSection key={report.question_id} deepShadow>
                        <TutorialReportCardContainer>
                            <ImageBox
                                width="64px"
                                height="64px"
                                image={
                                    categoryPicker(report.question_category)
                                        .image
                                }
                            />
                            <Gap width="8px" />
                            <TutorialReportCardTextContainer>
                                <Text>{report.question_title}</Text>
                                <Text size="c1">
                                    우리들의 {report.question_set_num}번째
                                    이야기
                                </Text>
                            </TutorialReportCardTextContainer>
                        </TutorialReportCardContainer>
                    </CardSection>
                    {i === 0 && page === 24 && (
                        <PointoutOutlined
                            color={MANDARIN2}
                            width="24px"
                            height="24px"
                        />
                    )}
                </TutorialReportCardWrapper>
            ))}
        </TutorialReportContainer>
    );
};
