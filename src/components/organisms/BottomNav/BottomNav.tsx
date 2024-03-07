import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

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
import { BottomNavButton, BottomNavWrapper } from './BottomNav.styled';
import { Gap } from '@Styles/App.styled';
import { ORANGE2 } from '@Styles/colors';

export const BottomNav = () => {
    const router = useRouter();
    const [currentMenu, setCurrentMenu] = useState<string>('');

    useEffect(() => {
        setCurrentMenu(router.pathname.split('/')[1]);
    }, []);

    return (
        <BottomNavWrapper>
            <BottomNavButton
                onClick={() => router.push('/landing')}
                active={currentMenu === 'landing'}
            >
                {currentMenu === 'landing' ? (
                    <HomeFilledIcon width="24" height="24" />
                ) : (
                    <HomeIcon width="24" height="24" />
                )}
                <Gap height="4px" />홈
            </BottomNavButton>
            <BottomNavButton
                onClick={() => router.push('/qna')}
                active={currentMenu === 'qna'}
            >
                {currentMenu === 'qna' ? (
                    <ChatFilledIcon width="24" height="24" />
                ) : (
                    <ChatIcon width="24" height="24" />
                )}
                <Gap height="4px" />
                문답
            </BottomNavButton>
            <BottomNavButton
                onClick={() => router.push('/answer-log')}
                active={currentMenu === 'answer-log'}
            >
                {currentMenu === 'answer-log' ? (
                    <BookOpenFilledIcon width="24" height="24" />
                ) : (
                    <BookOpenIcon width="24" height="24" />
                )}
                <Gap height="4px" />
                답변 모음
            </BottomNavButton>
            <BottomNavButton
                onClick={() => router.push('/report')}
                active={currentMenu === 'report'}
            >
                {currentMenu === 'report' ? (
                    <ReportFilledIcon width="24" height="24" />
                ) : (
                    <ReportIcon width="24" height="24" />
                )}
                <Gap height="4px" />
                리포트
            </BottomNavButton>
            <BottomNavButton
                onClick={() => router.push('/mall')}
                active={currentMenu === 'mall'}
            >
                {currentMenu === 'mall' ? (
                    <GiftFilledIcon width="24" height="24" />
                ) : (
                    <GiftIcon width="24" height="24" />
                )}
                <Gap height="4px" />
                앤서록 몰
            </BottomNavButton>
        </BottomNavWrapper>
    );
};
