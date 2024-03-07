import { BottomNav } from '@Organisms/BottomNav';
import { TopNav } from '@Organisms/TopNav';
import { MouseEventHandler, RefObject, useContext } from 'react';
import { MainLayoutContainer, MainLayoutWrapper } from './MainLayout.styled';
import { AppContext } from '@Pages/_app';

interface MainLayoutProp {
    children?: React.ReactNode;
    title?: string;
    showLogo?: boolean;
    goBackHandler?: () => void;
    hideBackButton?: boolean;
    hideBottomNav?: boolean;
    hideTopNav?: boolean;
    whiteBackground?: boolean;
    hideActionIcons?: boolean;
    subNav?: JSX.Element;
    layoutRef?: RefObject<HTMLDivElement>;
}

export const MainLayout = ({
    children,
    title,
    showLogo,
    goBackHandler,
    hideBackButton,
    hideBottomNav,
    hideTopNav,
    whiteBackground,
    hideActionIcons,
    subNav,
    layoutRef,
}: MainLayoutProp) => {
    const { isInputFocused } = useContext(AppContext);
    return (
        <MainLayoutWrapper>
            {!hideTopNav && (
                <TopNav
                    title={title}
                    showLogo={showLogo}
                    goBackHandler={goBackHandler}
                    hideBackButton={hideBackButton}
                    hideActionIcons={hideActionIcons}
                    whiteBackground={whiteBackground}
                    subNav={subNav}
                />
            )}
            <MainLayoutContainer
                whiteBackground={whiteBackground}
                ref={layoutRef}
            >
                {children}
            </MainLayoutContainer>
            {!hideBottomNav && !isInputFocused && <BottomNav />}
        </MainLayoutWrapper>
    );
};
