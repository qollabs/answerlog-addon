import {
    MouseEventHandler,
    useState,
    useEffect,
    RefObject,
    useContext,
} from 'react';
import {
    TutorialBottomNavButton,
    TutorialBottomNavWrapper,
    TutorialGuideContainer,
    TutorialLayoutContainer,
    TutorialLayoutWrapper,
    TutorialTopNavButton,
    TutorialTopNavIconContainer,
    TutorialTopNavMainContainer,
    TutorialTopNavTitleBox,
    TutorialTopNavWrapper,
} from '../Tutorial.styled';
import { IconButton } from '@Atoms/IconButton';
import Logo from '@Images/answerlog_logo.svg';
import BellFilled from '@Images/icons/bell_filled.svg';
import AppsAddFilled from '@Images/icons/apps_add_filled.svg';
import ArrowLeftIcon from '@Images/icons/arrow_left.svg';
import HomeIcon from '@Images/icons/house_alt.svg';
import HomeFilledIcon from '@Images/icons/house_alt_filled.svg';
import ChatIcon from '@Images/icons/chat.svg';
import ChatFilledIcon from '@Images/icons/chat_filled.svg';
import ReportIcon from '@Images/icons/file_text.svg';
import ReportFilledIcon from '@Images/icons/file_text_filled.svg';
import GiftIcon from '@Images/icons/gift.svg';
import GiftFilledIcon from '@Images/icons/gift_filled.svg';
import BookOpenIcon from '@Images/icons/book_open.svg';
import BookOpenFilledIcon from '@Images/icons/book_open_filled.svg';
import { Gap } from '@Styles/App.styled';
import { MANDARIN2, ORANGE2, WHITE } from '@Styles/colors';
import { Text } from '@Atoms/Typography';
import { Container } from '@Atoms/Container';
import { PageFlipType } from '../Tutorial';
import PointoutOutlined from '@Images/icons/pointout_outlined.svg';
import { useActionOnTouch } from '@Hooks/useActionOnTouch';
import { ImageBox } from '@Atoms/ImageBox';
import { AppContext } from '@Pages/_app';

interface TutorialTopNavProp {
    title?: string;
    showLogo?: boolean;
    hideBackButton?: boolean;
    whiteBackground?: boolean;
    hideActionIcons?: boolean;
    subNav?: JSX.Element;
    page: number;
    goToNextPage: (page?: PageFlipType) => void;
}

export const TutorialTopNav = ({
    title,
    showLogo,
    hideBackButton,
    whiteBackground,
    hideActionIcons,
    subNav,
    page,
    goToNextPage,
}: TutorialTopNavProp) => {
    const { myProfileImage } = useContext(AppContext);
    const [currentLocation, setCurrentLocation] = useState('');

    // check current location
    useEffect(() => {
        if (page < 3) {
            setCurrentLocation('/');
        } else if (page < 29) {
            setCurrentLocation('');
        } else if (page < 270) {
            setCurrentLocation('/');
        }
    }, [page]);

    return (
        <TutorialTopNavWrapper whiteBackground={whiteBackground} page={page}>
            {page === 3 && (
                <TutorialGuideContainer top="160px">
                    <Text color="white" size="b0">
                        홈에서는
                        <br /> 상대와 나의 활동을
                        <br /> 요약해 볼 수 있어요
                    </Text>
                    <Gap height="16px" />
                    <Text color="white" size="b2">
                        터치하여 계속
                    </Text>
                    <PointoutOutlined
                        color={WHITE}
                        width="24px"
                        height="24px"
                    />
                </TutorialGuideContainer>
            )}
            {page === 5 && (
                <TutorialGuideContainer top="160px">
                    <Text color="white" size="b0">
                        문답에서는
                        <br /> 상대와 같은 질문에 답하며 <br />
                        서로 알아갈 수 있어요
                        <br />
                        답변한 내용은 <br />
                        상대방과 공유되어요
                        <Gap height="8px" />
                        <Text color="yellow2">
                            *연습하기 중 답변한 <br />
                            내용은 공유되지 않아요
                        </Text>
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
            )}
            {page === 28 && (
                <TutorialGuideContainer top="160px">
                    <Text color="white" size="b0">
                        앤서록 이용 중 언제든지
                        <br />
                        상단의 버튼을 활용하여
                        <br />
                        초기화면으로
                        <br />
                        돌아갈 수 있어요
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
            )}
            {page === 29 && (
                <TutorialGuideContainer top="160px">
                    <Text color="white" size="b0">
                        알림은 이곳에서
                        <br />
                        확인할 수 있어요
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
            )}
            {page === 30 && (
                <TutorialGuideContainer top="160px">
                    <Text color="white" size="b0">
                        이곳에서는
                        <br />
                        내 계정과 관련된
                        <br />
                        정보를 확인할 수 있어요
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
            )}
            <TutorialTopNavMainContainer>
                <TutorialTopNavTitleBox>
                    {!hideBackButton && (
                        <>
                            <IconButton>
                                <ArrowLeftIcon width="28" height="28" />
                            </IconButton>
                            <Gap width="8px" />
                        </>
                    )}
                    {showLogo && (
                        <>
                            <Logo width="131" />
                            <Gap width="8px" />
                        </>
                    )}
                    {title}
                </TutorialTopNavTitleBox>
                {!hideActionIcons && (
                    <TutorialTopNavIconContainer page={page}>
                        <TutorialTopNavButton
                            active={currentLocation !== '/mypage'}
                            className="tutorial-layout-mypage"
                        >
                            <ImageBox
                                image={myProfileImage}
                                width="32px"
                                height="32px"
                                border
                                borderThickness="1px"
                            />
                            <Gap height="4px" />
                            <Text color="orange2" size="c1">
                                내 정보
                            </Text>
                        </TutorialTopNavButton>
                        <TutorialTopNavButton
                            active={currentLocation !== '/push'}
                            className="tutorial-layout-alert"
                        >
                            <BellFilled
                                width="32px"
                                height="32px"
                                color={ORANGE2}
                            />
                            <Gap height="4px" />
                            <Text color="orange2" size="c1">
                                알림
                            </Text>
                        </TutorialTopNavButton>
                        <TutorialTopNavButton
                            active={currentLocation !== '/'}
                            onClick={() => page === 28 && goToNextPage()}
                            className="tutorial-layout-home"
                        >
                            <AppsAddFilled
                                width="32px"
                                height="32px"
                                color={ORANGE2}
                            />
                            <Gap height="4px" />
                            <Text color="orange2" size="c1">
                                가족
                            </Text>
                        </TutorialTopNavButton>
                    </TutorialTopNavIconContainer>
                )}
            </TutorialTopNavMainContainer>
            {subNav && subNav}
        </TutorialTopNavWrapper>
    );
};

interface TutorialBottomNavProp {
    page: number;
    goToNextPage: (page?: PageFlipType) => void;
}

export const TutorialBottomNav = ({
    page,
    goToNextPage,
}: TutorialBottomNavProp) => {
    const { actionOnTouchEnd } = useActionOnTouch();
    const [currentMenu, setCurrentMenu] = useState<string>('');

    useEffect(() => {
        if (page >= 3 && page < 5) setCurrentMenu('landing');
        else if (page >= 5 && page < 19) setCurrentMenu('qna');
        else if (page >= 19 && page < 24) setCurrentMenu('answer-log');
        else if (page >= 24 && page < 27) setCurrentMenu('report');
        else if (page >= 27) setCurrentMenu('mall');
    }, [page]);

    return (
        <TutorialBottomNavWrapper>
            <TutorialBottomNavButton active={currentMenu === 'landing'}>
                {currentMenu === 'landing' ? (
                    <HomeFilledIcon width="24" height="24" />
                ) : (
                    <HomeIcon width="24" height="24" />
                )}
                <Gap height="4px" />홈
            </TutorialBottomNavButton>
            <TutorialBottomNavButton active={currentMenu === 'qna'}>
                {currentMenu === 'qna' ? (
                    <ChatFilledIcon width="24" height="24" />
                ) : (
                    <ChatIcon width="24" height="24" />
                )}
                <Gap height="4px" />
                문답
            </TutorialBottomNavButton>
            {page === 18 && (
                <TutorialGuideContainer bottom="100px">
                    <Text color="white" size="b0">
                        작성한 문답은 답변 모음에 쌓여요
                    </Text>
                </TutorialGuideContainer>
            )}
            <TutorialBottomNavButton
                active={currentMenu === 'answer-log'}
                isFocused={page === 18}
                onClick={() => page === 18 && goToNextPage()}
                onTouchEnd={(e) =>
                    actionOnTouchEnd(e, () => page === 18 && goToNextPage())
                }
            >
                {currentMenu === 'answer-log' ? (
                    <BookOpenFilledIcon width="24" height="24" />
                ) : (
                    <BookOpenIcon width="24" height="24" />
                )}
                <Gap height="4px" />
                답변 모음
                {page === 18 && (
                    <PointoutOutlined
                        color={MANDARIN2}
                        width="24px"
                        height="24px"
                    />
                )}
            </TutorialBottomNavButton>
            {page === 23 && (
                <TutorialGuideContainer bottom="100px">
                    <Text color="white" size="b0">
                        리포트 기능을 소개해 드릴게요
                    </Text>
                </TutorialGuideContainer>
            )}
            <TutorialBottomNavButton
                active={currentMenu === 'report'}
                isFocused={page === 23}
                onClick={() => page === 23 && goToNextPage()}
                onTouchEnd={(e) =>
                    actionOnTouchEnd(e, () => page === 23 && goToNextPage())
                }
            >
                {currentMenu === 'report' ? (
                    <ReportFilledIcon width="24" height="24" />
                ) : (
                    <ReportIcon width="24" height="24" />
                )}
                <Gap height="4px" />
                리포트
                {page === 23 && (
                    <PointoutOutlined
                        color={MANDARIN2}
                        width="24px"
                        height="24px"
                    />
                )}
            </TutorialBottomNavButton>
            {page === 26 && (
                <TutorialGuideContainer bottom="100px">
                    <Text color="white" size="b0">
                        앤서록 몰에서는
                        <br />
                        매일 다섯개의 가족 선물을
                        <br />
                        추천드려요
                    </Text>
                </TutorialGuideContainer>
            )}
            <TutorialBottomNavButton
                active={currentMenu === 'mall'}
                isFocused={page === 26}
                onClick={() => page === 26 && goToNextPage()}
                onTouchEnd={(e) =>
                    actionOnTouchEnd(e, () => page === 26 && goToNextPage())
                }
            >
                {currentMenu === 'mall' ? (
                    <GiftFilledIcon width="24" height="24" />
                ) : (
                    <GiftIcon width="24" height="24" />
                )}
                <Gap height="4px" />
                앤서록 몰
                {page === 26 && (
                    <PointoutOutlined
                        color={MANDARIN2}
                        width="24px"
                        height="24px"
                    />
                )}
            </TutorialBottomNavButton>
        </TutorialBottomNavWrapper>
    );
};

interface TutorialLayoutProp {
    children?: React.ReactNode;
    title?: string;
    showLogo?: boolean;
    hideBackButton?: boolean;
    hideBottomNav?: boolean;
    hideTopNav?: boolean;
    whiteBackground?: boolean;
    hideActionIcons?: boolean;
    subNav?: JSX.Element;
    page: number;
    setPage: (page: number) => void;
    subPage: number;
    setSubPage: (subPage: number) => void;
    goToNextPage: (page?: PageFlipType) => void;
    layoutRef?: RefObject<HTMLDivElement>;
}

export const TutorialLayout = ({
    children,
    title,
    showLogo,
    hideBackButton,
    hideBottomNav,
    hideTopNav,
    whiteBackground,
    hideActionIcons,
    subNav,
    page,
    setPage,
    subPage,
    setSubPage,
    goToNextPage,
    layoutRef,
}: TutorialLayoutProp) => {
    const { actionOnTouchEnd } = useActionOnTouch();
    return (
        <TutorialLayoutWrapper>
            {!hideTopNav && (
                <TutorialTopNav
                    title={title}
                    showLogo={showLogo}
                    hideBackButton={hideBackButton}
                    hideActionIcons={hideActionIcons}
                    whiteBackground={whiteBackground}
                    subNav={subNav}
                    page={page}
                    goToNextPage={goToNextPage}
                />
            )}
            <TutorialLayoutContainer
                whiteBackground={whiteBackground}
                ref={layoutRef}
            >
                <Gap height="48px" />
                {page === 1 && (
                    <TutorialGuideContainer full>
                        <Text color="white" size="b0">
                            앤서록에 오신 걸 환영해요 <br />
                            앤서록에 대해 알려드릴게요
                        </Text>
                        <Gap height="16px" />
                        <Text size="b2" color="white">
                            터치하여 계속
                        </Text>
                        <PointoutOutlined
                            color={WHITE}
                            width="24px"
                            height="24px"
                        />
                    </TutorialGuideContainer>
                )}
                {page === 6 && (
                    <TutorialGuideContainer full>
                        <Text color="white" size="b0">
                            질문에 답변해볼까요?
                            <br />
                            원하는 답을 골라주세요
                            <Gap height="8px" />
                            <Text color="yellow2">
                                *답변은 수정할 수 없으니
                                <br /> 신중히 골라주세요 :)
                            </Text>
                        </Text>
                        <Gap height="16px" />
                        <Container>
                            <Text size="b2" color="white">
                                터치하여 계속
                            </Text>
                        </Container>
                        <PointoutOutlined
                            color={WHITE}
                            width="24px"
                            height="24px"
                        />
                    </TutorialGuideContainer>
                )}
                {page === 7 && subPage === 2 && (
                    <TutorialGuideContainer
                        full
                        isActivated
                        onClick={() => goToNextPage('subPage')}
                        onTouchEnd={(e) =>
                            actionOnTouchEnd(e, () => goToNextPage('subPage'))
                        }
                    >
                        <Text color="white" size="b0">
                            답변을 저장하면
                            <br /> 상대방과의 대화를
                            <br /> 시작할 수 있어요
                        </Text>
                        <Gap height="16px" />
                        <Container>
                            <Text color="white">다음으로 계속</Text>
                        </Container>
                        <PointoutOutlined
                            color={WHITE}
                            width="24px"
                            height="24px"
                        />
                    </TutorialGuideContainer>
                )}
                {page === 8 && (
                    <TutorialGuideContainer full>
                        <Text color="white" size="b0">
                            다양한 종류의 문답을
                            <br /> 연습해볼게요!
                        </Text>
                        <Gap height="16px" />
                        <Container>
                            <Text color="white">터치하여 계속</Text>
                        </Container>
                        <PointoutOutlined
                            color={WHITE}
                            width="24px"
                            height="24px"
                        />
                    </TutorialGuideContainer>
                )}
                {page === 9 && (
                    <TutorialGuideContainer full>
                        <Text color="white" size="b0">
                            복수 응답이
                            <br /> 가능한 질문이에요 <br />
                            <Gap height="8px" />
                            해당하는 답변을
                            <br />
                            모두 골라주세요
                        </Text>
                        <Gap height="16px" />
                        <Container>
                            <Text color="white">터치하여 계속</Text>
                        </Container>
                        <PointoutOutlined
                            color={WHITE}
                            width="24px"
                            height="24px"
                        />
                    </TutorialGuideContainer>
                )}
                {page === 11 && subPage === 1 && (
                    <TutorialGuideContainer full>
                        <Text color="white" size="b0">
                            원하는 답변이 없으면
                            <br />
                            추가할 수 있는 질문이에요
                        </Text>
                        <Gap height="16px" />
                        <Container>
                            <Text color="white">터치하여 계속</Text>
                        </Container>
                        <PointoutOutlined
                            color={WHITE}
                            width="24px"
                            height="24px"
                        />
                    </TutorialGuideContainer>
                )}
                {page === 13 && subPage === 1 && (
                    <TutorialGuideContainer full>
                        <Text color="white" size="b0">
                            자유롭게 답변을
                            <br />
                            작성할 수 있는
                            <br />
                            단답형 문답이에요
                            <br />
                            <Gap height="8px" />
                            짧은 답안을
                            <br />
                            작성해보세요
                        </Text>
                        <Gap height="16px" />
                        <Container>
                            <Text color="white">터치하여 계속</Text>
                        </Container>
                        <PointoutOutlined
                            color={WHITE}
                            width="24px"
                            height="24px"
                        />
                    </TutorialGuideContainer>
                )}
                {page === 15 && subPage === 1 && (
                    <TutorialGuideContainer full>
                        <Text color="white" size="b0">
                            서술형 문답이에요
                            <br />
                            자유롭게 작성해보세요
                        </Text>
                        <Gap height="16px" />
                        <Container>
                            <Text color="white">터치하여 계속</Text>
                        </Container>
                        <PointoutOutlined
                            color={WHITE}
                            width="24px"
                            height="24px"
                        />
                    </TutorialGuideContainer>
                )}
                {page === 19 && (
                    <TutorialGuideContainer top="330px">
                        <Text color="white" size="b0">
                            나와 상대방 모두
                            <br />
                            문답을 완료하면
                            <br />
                            답변 모음 책장의
                            <br />
                            책이 완성돼요
                        </Text>
                        <Gap height="16px" />
                        <Container>
                            <Text color="white">터치하여 계속</Text>
                        </Container>
                        <PointoutOutlined
                            color={WHITE}
                            width="24px"
                            height="24px"
                        />
                    </TutorialGuideContainer>
                )}
                {page === 27 && (
                    <TutorialGuideContainer full>
                        <Text color="white" size="b0">
                            맞춤 선물을 구경하고
                            <br />
                            선물해보세요
                        </Text>
                        <Gap height="16px" />
                        <Container>
                            <Text color="white">터치하여 계속</Text>
                        </Container>
                        <PointoutOutlined
                            color={WHITE}
                            width="24px"
                            height="24px"
                        />
                    </TutorialGuideContainer>
                )}
                {children}
            </TutorialLayoutContainer>
            {!hideBottomNav && (
                <TutorialBottomNav page={page} goToNextPage={goToNextPage} />
            )}
        </TutorialLayoutWrapper>
    );
};
