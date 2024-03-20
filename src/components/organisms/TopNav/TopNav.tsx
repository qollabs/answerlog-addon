import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { TopNavContainer } from './TopNav.styled';
import AnswerLogTextLogo from '@Images/logos/answerlog_text.svg';
import { Text } from '@Atoms/Typography';
import { pathnameTranslator } from '@Functions/pathnameTranslator';

export const TopNav = () => {
    const router = useRouter();

    const [currentLocation, setCurrentLocation] = useState('');

    // check current location
    useEffect(() => {
        console.log(router.pathname);
        setCurrentLocation(router.pathname);
    }, [router.pathname]);

    return (
        <TopNavContainer>
            <AnswerLogTextLogo width="128px" />
            <Text size="h2">{pathnameTranslator(currentLocation)}</Text>
        </TopNavContainer>
    );
};
