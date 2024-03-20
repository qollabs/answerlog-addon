import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import HouseOutlinedIcon from '@Images/icons/house_outlined.svg';
import HouseFilledIcon from '@Images/icons/house_filled.svg';
import SecurityOutlinedIcon from '@Images/icons/security_outlined.svg';
import SecurityFilledIcon from '@Images/icons/security_filled.svg';
import BinXOutlinedIcon from '@Images/icons/bin_x_outlined.svg';
import BinXFilledIcon from '@Images/icons/bin_x_filled.svg';

import { BottomNavButton, BottomNavContainer } from './BottomNav.styled';
import { Gap } from '@Styles/App.styled';
import { ORANGE2 } from '@Styles/colors';
import { Text } from '@Atoms/Typography';
import { pathnameTranslator } from '@Functions/pathnameTranslator';

export const BottomNav = () => {
    const router = useRouter();
    const [currentMenu, setCurrentMenu] = useState<string>('');

    useEffect(() => {
        setCurrentMenu(router.pathname.split('/')[1] || 'home');
    }, []);

    return (
        <BottomNavContainer>
            <BottomNavButton
                onClick={() => router.push('/')}
                active={currentMenu === 'home'}
            >
                {currentMenu === 'home' ? (
                    <HouseFilledIcon width="24" height="24" />
                ) : (
                    <HouseOutlinedIcon width="24px" height="24" />
                )}
                <Gap height="4px" />
                <Text size="b2">{pathnameTranslator('home')}</Text>
            </BottomNavButton>
            <BottomNavButton
                onClick={() => router.push('/policy')}
                active={currentMenu === 'policy'}
            >
                {currentMenu === 'policy' ? (
                    <SecurityFilledIcon width="24" height="24" />
                ) : (
                    <SecurityOutlinedIcon width="24" height="24" />
                )}
                <Gap height="4px" />
                <Text size="b2">{pathnameTranslator('policy')}</Text>
            </BottomNavButton>
            <BottomNavButton
                onClick={() => router.push('/withdraw')}
                active={currentMenu === 'withdraw'}
            >
                {currentMenu === 'withdraw' ? (
                    <BinXFilledIcon width="24" height="24" />
                ) : (
                    <BinXOutlinedIcon width="24" height="24" />
                )}
                <Gap height="4px" />
                <Text size="b2">{pathnameTranslator('withdraw')}</Text>
            </BottomNavButton>
        </BottomNavContainer>
    );
};
