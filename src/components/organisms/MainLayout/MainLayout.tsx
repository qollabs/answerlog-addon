import { BottomNav } from '@Organisms/BottomNav';
import { TopNav } from '@Organisms/TopNav';
import { MouseEventHandler, RefObject, useContext } from 'react';
import { MainLayoutContainer, MainLayoutWrapper } from './MainLayout.styled';
import { AppContext } from '@Pages/_app';

interface MainLayoutProp {
    children?: React.ReactNode;
}

export const MainLayout = ({ children }: MainLayoutProp) => {
    const { isInputFocused } = useContext(AppContext);
    return (
        <MainLayoutWrapper>
            <TopNav />
            <MainLayoutContainer>{children}</MainLayoutContainer>
            {!isInputFocused && <BottomNav />}
        </MainLayoutWrapper>
    );
};
