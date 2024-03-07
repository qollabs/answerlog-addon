import {
    MouseEventHandler,
    TouchEventHandler,
    ReactNode,
    useEffect,
    useState,
    useContext,
} from 'react';
import Logo from '@Images/answerlog_logo.svg';
import BellFilled from '@Images/icons/bell_filled.svg';
import AppsAddFilled from '@Images/icons/apps_add_filled.svg';
import ArrowLeftIcon from '@Images/icons/arrow_left.svg';
import { IconButton } from '@Atoms/IconButton';
import { useRouter } from 'next/router';
import {
    TopNavIconContainer,
    TopNavTitleBox,
    TopNavMainContainer,
    TopNavWrapper,
    TopNavButton,
} from './TopNav.styled';
import { Gap } from '@Styles/App.styled';
import { GRAY2, ORANGE2 } from '@Styles/colors';
import { Text } from '@Atoms/Typography';
import { ImageBox } from '@Atoms/ImageBox';
import { AppContext } from '@Pages/_app';

interface TopNavProp {
    title?: string;
    showLogo?: boolean;
    goBackHandler?: () => void;
    hideBackButton?: boolean;
    whiteBackground?: boolean;
    hideActionIcons?: boolean;
    subNav?: JSX.Element;
}

export const TopNav = ({
    title,
    showLogo,
    goBackHandler,
    hideBackButton,
    whiteBackground,
    hideActionIcons,
    subNav,
}: TopNavProp) => {
    const { myProfileImage } = useContext(AppContext);
    const router = useRouter();

    const [currentLocation, setCurrentLocation] = useState('');

    // check current location
    useEffect(() => {
        setCurrentLocation(router.pathname);
    }, [router.pathname]);

    return (
        <TopNavWrapper whiteBackground={whiteBackground}>
            <TopNavMainContainer>
                <TopNavTitleBox>
                    {!hideBackButton && (
                        <>
                            <IconButton
                                onClickButton={
                                    goBackHandler || (() => router.back())
                                }
                            >
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
                </TopNavTitleBox>
                {!hideActionIcons && (
                    <TopNavIconContainer>
                        <TopNavButton
                            active={currentLocation !== '/mypage'}
                            onClick={() => router.push('/mypage')}
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
                        </TopNavButton>
                        <TopNavButton
                            active={currentLocation !== '/push'}
                            onClick={() => {
                                window.location.href = `/push?prevPage=${currentLocation}`;
                            }}
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
                        </TopNavButton>
                        <TopNavButton
                            active={currentLocation !== '/'}
                            onClick={() => {
                                window.location.href = '/';
                            }}
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
                        </TopNavButton>
                    </TopNavIconContainer>
                )}
            </TopNavMainContainer>
            {subNav && subNav}
        </TopNavWrapper>
    );
};
