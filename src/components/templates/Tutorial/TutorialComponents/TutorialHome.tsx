import { useState, useContext } from 'react';
import SmileOutlined from '@Images/icons/smile_outlined.svg';
import PointoutOutlined from '@Images/icons/pointout_outlined.svg';
import UserAddFilled from '@Images/icons/user_add_filled.svg';
import {
    TutorialGuideContainer,
    TutorialHomeContainer,
    TutorialHomeContentContainer,
    TutorialHomeEditContainer,
    TutorialHomePersonContainer,
    TutorialHomePersonImageBox,
    TutorialHomePersonTextContainer,
    TutorialHomeTitleBox,
} from '../Tutorial.styled';
import { Text } from '@Atoms/Typography';
import Image from 'next/image';
import { BLACK, GRAY4, MANDARIN2, WHITE } from '@Styles/colors';
import { Gap } from '@Styles/App.styled';
import { AppContext } from '@Pages/_app';
import { PageFlipType } from '../Tutorial';
import { Container } from '@Atoms/Container';
import { useActionOnTouch } from '@Hooks/useActionOnTouch';

interface TutorialHomeProp {
    page: number;
    setPage: (page: number) => void;
    goToNextPage: (page?: PageFlipType) => void;
}

export const TutorialHome = ({
    page,
    setPage,
    goToNextPage,
}: TutorialHomeProp) => {
    const { myName, myProfileImage } = useContext(AppContext);
    const { actionOnTouchEnd } = useActionOnTouch();

    return (
        <TutorialHomeContainer>
            <TutorialHomeEditContainer>
                <Text color="gray4" underline>
                    편집하기
                </Text>
            </TutorialHomeEditContainer>
            <TutorialHomeTitleBox>
                <Text size="b0">앤서록을 함께 할 가족을 선택해 주세요</Text>
            </TutorialHomeTitleBox>
            <TutorialHomeContentContainer>
                {page === 2 && (
                    <TutorialGuideContainer top="360px" left="0" right="0">
                        <Text color="white" size="b0">
                            앤서록을 함께 할<br /> 가족을 선택해 볼게요
                        </Text>
                        <Text color="white" size="b0">
                            &#39;엄마&#39;를 선택해주세요
                        </Text>
                    </TutorialGuideContainer>
                )}
                {/* {page === 30 && (
                    <TutorialGuideContainer top="360px" left="0" right="0">
                        <Text color="white" size="b0">
                            마이페이지는
                            <br />
                            나의 프로필을 누르면
                            <br />
                            이용할 수 있어요
                        </Text>
                        <Gap height="16px" />
                        <Container>
                            <Text color="white" size="b2">
                                터치하여 계속
                            </Text>
                        </Container>
                        <PointoutOutlined
                            color={WHITE}
                            width="24px"
                            height="24px"
                        />
                    </TutorialGuideContainer>
                )} */}
                {page === 31 && (
                    <TutorialGuideContainer top="20px" left="0" right="0">
                        <Text color="white" size="b0">
                            여기서 언제든
                            <br />
                            다시 연습해볼 수 있어요
                        </Text>
                        <Gap height="16px" />
                        <Container>
                            <Text color="yellow2" size="b2">
                                터치하여 종료
                            </Text>
                        </Container>
                        <PointoutOutlined
                            color={WHITE}
                            width="24px"
                            height="24px"
                        />
                    </TutorialGuideContainer>
                )}
                {/* <TutorialHomePersonContainer isFocused={page === 30}>
                    <TutorialHomePersonImageBox>
                        {myProfileImage ? (
                            <Image
                                src={myProfileImage}
                                layout="fill"
                                objectFit="cover"
                            />
                        ) : (
                            <SmileOutlined color={BLACK} />
                        )}
                    </TutorialHomePersonImageBox>
                    <Gap height="8px" />
                    <TutorialHomePersonTextContainer>
                        <Text>나</Text>
                        <Text color="gray4">{myName}</Text>
                    </TutorialHomePersonTextContainer>
                </TutorialHomePersonContainer> */}
                <TutorialHomePersonContainer
                    isFocused={page === 2}
                    onClick={() => page === 2 && goToNextPage()}
                    onTouchEnd={(e) =>
                        actionOnTouchEnd(e, () => page === 2 && goToNextPage())
                    }
                >
                    <TutorialHomePersonImageBox>
                        <SmileOutlined color={BLACK} />
                    </TutorialHomePersonImageBox>
                    <Gap height="8px" />
                    <TutorialHomePersonTextContainer>
                        <Text>엄마</Text>
                        <Text color="gray4">앤서록</Text>
                    </TutorialHomePersonTextContainer>
                    {page === 2 && (
                        <PointoutOutlined
                            color={MANDARIN2}
                            width="24px"
                            height="24px"
                        />
                    )}
                </TutorialHomePersonContainer>
                <TutorialHomePersonContainer isFocused={page === 31}>
                    <TutorialHomePersonImageBox background={GRAY4}>
                        <PointoutOutlined
                            color={BLACK}
                            width="50px"
                            height="52px"
                        />
                    </TutorialHomePersonImageBox>
                    <Gap height="8px" />
                    <TutorialHomePersonTextContainer>
                        <Text>연습해보기</Text>
                        <Text color="gray4">앤서록 봇</Text>
                    </TutorialHomePersonTextContainer>
                </TutorialHomePersonContainer>
                <TutorialHomePersonContainer>
                    <TutorialHomePersonImageBox transparent>
                        <UserAddFilled color={BLACK} />
                    </TutorialHomePersonImageBox>
                    <Gap height="8px" />
                    <TutorialHomePersonTextContainer>
                        <Text>가족 추가 연결</Text>
                        <Gap height="21px" />
                    </TutorialHomePersonTextContainer>
                </TutorialHomePersonContainer>
            </TutorialHomeContentContainer>
        </TutorialHomeContainer>
    );
};
