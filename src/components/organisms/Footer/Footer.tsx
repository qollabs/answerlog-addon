import { FC } from 'react';

import { Text } from '@Atoms/Typography';
import Logo from '@Images/Logo.svg';
import {
    CompanyBox,
    FooterContainer,
    RightText,
    UnderlinedLink,
} from './Footer.styled';

export const Footer: FC = () => {
    return (
        <FooterContainer>
            <CompanyBox>
                <Logo />
            </CompanyBox>
            <CompanyBox>
                <Text size="c1" color="black">
                    2021 HyperScale All rights reserved
                </Text>
                <RightText size="c1" color="black">
                    <UnderlinedLink href="https://www.google.com/">
                        개인정보처리방침
                    </UnderlinedLink>
                </RightText>
            </CompanyBox>
        </FooterContainer>
    );
};
